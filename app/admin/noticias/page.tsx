import { Metadata } from "next"
import { supabaseServer } from "@/lib/supabase/server"
import MuiNoticiasList from "@/components/admin/MuiNoticiasList"

export const metadata: Metadata = {
  title: "Notícias | Admin",
}

async function obterNoticias() {
  try {
    const { data: noticias, error } = await supabaseServer
      .from('News')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Erro ao buscar notícias:', error)
      return []
    }

    return noticias || []
  } catch (error) {
    console.error('Erro ao buscar notícias:', error)
    return []
  }
}

export default async function NoticiasAdminPage() {
  const noticias = await obterNoticias()

  return <MuiNoticiasList noticias={noticias} />
}
