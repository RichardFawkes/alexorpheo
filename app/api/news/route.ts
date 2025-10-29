import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { supabaseServer } from "@/lib/supabase/server"
import { z } from "zod"

const newsSchema = z.object({
  title: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter no mínimo 3 caracteres"),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Conteúdo deve ter no mínimo 10 caracteres"),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false)
})

// GET - Listar notícias
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")
    const limit = searchParams.get("limit")

    let query = supabaseServer
      .from("News")
      .select("*")
      .order("publishedAt", { ascending: false, nullsFirst: false })
      .order("createdAt", { ascending: false })

    // Filtros
    if (published === "true") {
      query = query.eq("published", true)
    }

    if (featured === "true") {
      query = query.eq("featured", true)
    }

    if (category) {
      query = query.eq("category", category)
    }

    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar notícias:", error)
      return NextResponse.json(
        { error: "Erro ao buscar notícias" },
        { status: 500 }
      )
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Erro ao buscar notícias:", error)
    return NextResponse.json(
      { error: "Erro ao buscar notícias" },
      { status: 500 }
    )
  }
}

// POST - Criar notícia
export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = newsSchema.parse(body)

    const newsData = {
      ...validatedData,
      authorId: session.user.id || session.user.email || "admin",
      publishedAt: validatedData.published ? new Date().toISOString() : null
    }

    const { data, error } = await supabaseServer
      .from("News")
      .insert([newsData])
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar notícia:", error)
      return NextResponse.json(
        { error: error.message || "Erro ao criar notícia" },
        { status: 500 }
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Erro ao criar notícia:", error)
    return NextResponse.json(
      { error: "Erro ao criar notícia" },
      { status: 500 }
    )
  }
}

