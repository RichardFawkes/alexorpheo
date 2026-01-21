
import { Metadata } from "next"
import { supabaseServer } from "@/lib/supabase/server"
import MuiCategoriasList from "@/components/admin/MuiCategoriasList"

export const metadata: Metadata = {
  title: "Categorias | Admin",
}

async function obterCategorias() {
  try {
    const { data: categories, error } = await supabaseServer
      .from('Category')
      .select('*, Article(count)')
      .order('name', { ascending: true })

    if (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }

    // Transformar para o formato esperado pelo componente
    // O Supabase retorna Article: [{ count: N }]
    return categories?.map((cat: any) => ({
      ...cat,
      _count: {
        articles: cat.Article?.[0]?.count || 0
      }
    })) || []
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}

export default async function CategoriasAdminPage() {
  const categorias = await obterCategorias()

  // Cast type if necessary, assuming the structure matches
  return <MuiCategoriasList categorias={categorias as any} />
}
