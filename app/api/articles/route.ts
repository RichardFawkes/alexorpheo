import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { supabaseServer } from "@/lib/supabase/server"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const articleSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().min(5),
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

    // Converter string vazia para null
    const categoryId = validatedData.categoryId && validatedData.categoryId.trim() !== ''
      ? validatedData.categoryId
      : null

    const { data: article, error } = await supabaseServer
      .from('Article')
      .insert({
        title: validatedData.title,
        slug: validatedData.slug,
        excerpt: validatedData.excerpt || null,
        content: validatedData.content,
        coverImage: validatedData.coverImage || null,
        published: validatedData.published,
        categoryId: categoryId,
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

    revalidatePath("/")
    revalidatePath("/artigos")
    revalidatePath(`/artigos/${article.slug}`)
    revalidatePath("/admin/artigos")

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
    const slug = searchParams.get("slug")

    let query = supabaseServer
      .from('Article')
      .select(`
        *,
        category:Category(name, slug)
      `)
      .order('createdAt', { ascending: false })

    if (published) {
      query = query.eq('published', true)
    }

    if (slug) {
      query = query.eq('slug', slug)
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
