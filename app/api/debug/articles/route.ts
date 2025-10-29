import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"

// Rota de debug para ver todos os artigos (incluindo não publicados)
export async function GET() {
  try {
    const { data: articles, error } = await supabaseServer
      .from('Article')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      total: articles?.length || 0,
      articles: articles || []
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

