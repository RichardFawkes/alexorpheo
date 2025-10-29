import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { supabaseServer } from "@/lib/supabase/server"
import { z } from "zod"

const articleSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().min(10),
  coverImage: z.string().optional(),
  categoryId: z.string().optional(),
  published: z.boolean().default(false)
})

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = articleSchema.parse(body)

    const { data: article, error } = await supabaseServer
      .from('Article')
      .insert({
        ...validatedData,
        authorId: session.user.id,
        publishedAt: validatedData.published ? new Date().toISOString() : null
      })
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar artigo:", error)
      return NextResponse.json(
        { error: "Erro ao criar artigo", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar artigo:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Erro ao criar artigo" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published") === "true"

    let query = supabaseServer
      .from('Article')
      .select(`
        *,
        author:User!Article_authorId_fkey(name),
        category:Category(name)
      `)
      .order('createdAt', { ascending: false })

    if (published) {
      query = query.eq('published', true)
    }

    const { data: articles, error } = await query

    if (error) {
      console.error("Erro ao buscar artigos:", error)
      return NextResponse.json(
        { error: "Erro ao buscar artigos" },
        { status: 500 }
      )
    }

    return NextResponse.json(articles || [])
  } catch (error) {
    console.error("Erro ao buscar artigos:", error)
    return NextResponse.json(
      { error: "Erro ao buscar artigos" },
      { status: 500 }
    )
  }
}
