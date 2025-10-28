import { supabase } from '../supabaseClient'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadImage(
  file: File,
  bucket: string = 'articles',
  folder: string = 'images'
): Promise<UploadResult> {
  try {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      return { success: false, error: 'Tipo de arquivo inválido' }
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      return { success: false, error: 'Arquivo muito grande. Máximo: 5MB' }
    }

    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const fileName = `${timestamp}-${random}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Erro no upload:', error)
      return { success: false, error: error.message }
    }

    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return { success: true, url: urlData.publicUrl }
  } catch (error) {
    console.error('Erro no upload:', error)
    return { success: false, error: 'Erro ao fazer upload' }
  }
}

export async function deleteImage(url: string, bucket: string = 'articles') {
  try {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    const filePath = pathParts.slice(pathParts.indexOf(bucket) + 1).join('/')

    const { error } = await supabase.storage.from(bucket).remove([filePath])

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Erro ao deletar' }
  }
}
