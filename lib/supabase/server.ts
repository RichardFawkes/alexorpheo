import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Cliente server-side com Service Role (para queries no servidor)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

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

