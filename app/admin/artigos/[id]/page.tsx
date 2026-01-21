import { supabaseServer } from "@/lib/supabase/server"
import MuiArtigoForm from "@/components/admin/MuiArtigoForm"
import { notFound } from "next/navigation"

export default async function EditarArtigoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: artigo, error } = await supabaseServer
    .from('Article')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !artigo) {
    notFound()
  }

  return <MuiArtigoForm artigo={artigo} isEdit />
}
