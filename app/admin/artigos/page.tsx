import { Metadata } from "next"
import { supabaseServer } from "@/lib/supabase/server"
import MuiArtigosList from "@/components/admin/MuiArtigosList"

export const metadata: Metadata = {
  title: "Artigos | Admin",
}

async function obterArtigos() {
  try {
    const { data: articles, error } = await supabaseServer
      .from('Article')
      .select(`
        *,
        category:Category(id, name, slug)
      `)
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Erro ao buscar artigos:', error)
      return []
    }

    return articles || []
  } catch (error) {
    console.error('Erro ao buscar artigos:', error)
    return []
  }
}

export default async function ArtigosAdminPage() {
  const artigos = await obterArtigos()

  return <MuiArtigosList artigos={artigos} />
}
