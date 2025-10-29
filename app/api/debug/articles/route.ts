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

    const published = articles?.filter(a => a.published) || []
    const drafts = articles?.filter(a => !a.published) || []

    return NextResponse.json({
      total: articles?.length || 0,
      published: published.length,
      drafts: drafts.length,
      articles: articles?.map(a => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        published: a.published,
        publishedAt: a.publishedAt,
        createdAt: a.createdAt
      })) || []
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

