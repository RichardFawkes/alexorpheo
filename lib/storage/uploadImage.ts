import { createClient } from '@supabase/supabase-js'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadImage(
  file: File,
  bucket: string = 'alexorpheo',
  folder: string = 'images'
): Promise<UploadResult> {
  try {
    console.log('🔍 Iniciando upload...', {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      bucket,
      folder
    })

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!validTypes.includes(file.type)) {
      console.error('❌ Tipo de arquivo inválido:', file.type)
      return { success: false, error: 'Tipo de arquivo inválido' }
    }

    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      console.error('❌ Arquivo muito grande:', file.size)
      return { success: false, error: 'Arquivo muito grande. Máximo: 5MB' }
    }

    const fileExt = file.name.split('.').pop()
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(7)
    const fileName = `${timestamp}-${random}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    console.log('📤 Fazendo upload para:', filePath)

    // Usar Service Role Key para bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('❌ Erro no upload:', error)
      console.error('Detalhes do erro:', JSON.stringify(error, null, 2))
      return { success: false, error: error.message || 'Erro ao fazer upload' }
    }

    console.log('✅ Upload concluído:', data)

    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath)

    console.log('🔗 URL pública gerada:', urlData.publicUrl)

    return { success: true, url: urlData.publicUrl }
  } catch (error: any) {
    console.error('❌ Erro geral no upload:', error)
    console.error('Stack:', error.stack)
    return { success: false, error: error.message || 'Erro ao fazer upload' }
  }
}

export async function deleteImage(url: string, bucket: string = 'alexorpheo') {
  try {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/')
    const filePath = pathParts.slice(pathParts.indexOf(bucket) + 1).join('/')

    // Usar Service Role Key para bypass RLS
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const { error } = await supabaseAdmin.storage.from(bucket).remove([filePath])

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (error) {
    return { success: false, error: 'Erro ao deletar' }
  }
}
