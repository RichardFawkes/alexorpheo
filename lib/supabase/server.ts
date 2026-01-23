import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Função helper para criar cliente seguro ou lançar erro explicativo
const createSafeClient = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('⚠️ SUPABASE_SERVICE_ROLE_KEY ou NEXT_PUBLIC_SUPABASE_URL não definidos no servidor.')
    // Retorna um cliente "dummy" que falha graciosamente ou permite que a página carregue sem dados
    // Isso evita que a aplicação quebre inteira apenas por importar este arquivo
    return createClient('https://placeholder.supabase.co', 'placeholder', {
      auth: { autoRefreshToken: false, persistSession: false }
    })
  }
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Cliente server-side com Service Role (para queries no servidor)
export const supabaseServer = createSafeClient()

// Tipos para as tabelas
export type TArticle = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage: string | null
  published: boolean
  authorId: string
  categoryId: string | null
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export type TCategory = {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export type TUser = {
  id: string
  name: string | null
  email: string
  image: string | null
  role: string
}

export type TNews = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  coverImage: string | null
  category: string | null
  tags: string[] | null
  published: boolean
  featured: boolean
  authorId: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

