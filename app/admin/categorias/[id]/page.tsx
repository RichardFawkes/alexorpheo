
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { supabaseServer } from "@/lib/supabase/server"
import MuiCategoriaForm from "@/components/admin/MuiCategoriaForm"

export const metadata: Metadata = {
  title: "Editar Categoria | Admin",
}

async function obterCategoria(id: string) {
  try {
    const { data: category, error } = await supabaseServer
      .from('Category')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !category) {
      return null
    }

    return category
  } catch (error) {
    console.error('Erro ao buscar categoria:', error)
    return null
  }
}

export default async function EditarCategoriaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const categoria = await obterCategoria(id)

  if (!categoria) {
    notFound()
  }

  return <MuiCategoriaForm initialData={categoria} />
}
