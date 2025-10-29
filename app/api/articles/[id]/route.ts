import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { supabaseServer } from "@/lib/supabase/server"
import { z } from "zod"

const articleSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10).optional(),
  coverImage: z.string().optional(),
  categoryId: z.string().optional(),
  published: z.boolean().optional()
})

// GET - Buscar um artigo específico
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data: article, error } = await supabaseServer
      .from('Article')
      .select(`
        *,
        category:Category(name, slug)
      `)
      .eq('id', id)
      .single()

    if (error || !article) {
      return NextResponse.json(
        { error: "Artigo não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Erro ao buscar artigo:", error)
    return NextResponse.json(
      { error: "Erro ao buscar artigo" },
      { status: 500 }
    )
  }
}

// PATCH - Atualizar um artigo
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = articleSchema.parse(body)

    // Converter string vazia para null
    const categoryId = validatedData.categoryId && validatedData.categoryId.trim() !== '' 
      ? validatedData.categoryId 
      : null

    // Construir objeto de atualização apenas com campos fornecidos
    const updateData: any = {}
    
    if (validatedData.title !== undefined) updateData.title = validatedData.title
    if (validatedData.slug !== undefined) updateData.slug = validatedData.slug
    if (validatedData.excerpt !== undefined) updateData.excerpt = validatedData.excerpt || null
    if (validatedData.content !== undefined) updateData.content = validatedData.content
    if (validatedData.coverImage !== undefined) updateData.coverImage = validatedData.coverImage || null
    if (validatedData.categoryId !== undefined) updateData.categoryId = categoryId
    if (validatedData.published !== undefined) {
      updateData.published = validatedData.published
      // Se está publicando agora, definir publishedAt
      if (validatedData.published) {
        updateData.publishedAt = new Date().toISOString()
      }
    }

    const { data: article, error } = await supabaseServer
      .from('Article')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error("Erro ao atualizar artigo:", error)
      return NextResponse.json(
        { error: "Erro ao atualizar artigo", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Erro ao atualizar artigo:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Erro ao atualizar artigo" },
      { status: 500 }
    )
  }
}

// DELETE - Excluir um artigo
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const { id } = await params

    const { error } = await supabaseServer
      .from('Article')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Erro ao excluir artigo:", error)
      return NextResponse.json(
        { error: "Erro ao excluir artigo", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao excluir artigo:", error)
    return NextResponse.json(
      { error: "Erro ao excluir artigo" },
      { status: 500 }
    )
  }
}

