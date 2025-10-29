import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"

export async function GET() {
  try {
    const { data: categories, error } = await supabaseServer
      .from('Category')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error("Erro ao buscar categorias:", error)
      return NextResponse.json(
        { error: "Erro ao buscar categorias" },
        { status: 500 }
      )
    }

    return NextResponse.json(categories || [])
  } catch (error) {
    console.error("Erro ao buscar categorias:", error)
    return NextResponse.json(
      { error: "Erro ao buscar categorias" },
      { status: 500 }
    )
  }
}

