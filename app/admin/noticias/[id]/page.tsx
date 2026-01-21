import { supabaseServer } from "@/lib/supabase/server"
import MuiNoticiaForm from "@/components/admin/MuiNoticiaForm"
import { notFound } from "next/navigation"

export default async function EditarNoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: noticia, error } = await supabaseServer
    .from('News')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !noticia) {
    notFound()
  }

  // Garantir que tags seja um array
  const formattedNoticia = {
    ...noticia,
    tags: noticia.tags || []
  }

  return <MuiNoticiaForm noticia={formattedNoticia} isEdit />
}
