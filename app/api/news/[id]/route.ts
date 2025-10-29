import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { supabaseServer } from "@/lib/supabase/server"
import { z } from "zod"

const newsSchema = z.object({
  title: z.string().min(3).optional(),
  slug: z.string().min(3).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10).optional(),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional()
})

// GET - Buscar notícia por ID ou slug
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Tentar buscar por ID primeiro
    let query = supabaseServer
      .from("News")
      .select("*")

    // Se parece com UUID, buscar por ID, senão por slug
    if (id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      query = query.eq("id", id)
    } else {
      query = query.eq("slug", id)
    }

    const { data, error } = await query.single()

    if (error) {
      console.error("Erro ao buscar notícia:", error)
      return NextResponse.json(
        { error: "Notícia não encontrada" },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erro ao buscar notícia:", error)
    return NextResponse.json(
      { error: "Erro ao buscar notícia" },
      { status: 500 }
    )
  }
}

// PUT - Atualizar notícia
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const validatedData = newsSchema.parse(body)

    // Se está publicando agora, adicionar publishedAt
    const updateData: any = { ...validatedData }
    if (validatedData.published) {
      // Buscar notícia atual para ver se já estava publicada
      const { data: currentNews } = await supabaseServer
        .from("News")
        .select("publishedAt")
        .eq("id", id)
        .single()

      if (!currentNews?.publishedAt) {
        updateData.publishedAt = new Date().toISOString()
      }
    } else {
      updateData.publishedAt = null
    }

    const { data, error } = await supabaseServer
      .from("News")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Erro ao atualizar notícia:", error)
      return NextResponse.json(
        { error: error.message || "Erro ao atualizar notícia" },
        { status: 500 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      )
    }

    console.error("Erro ao atualizar notícia:", error)
    return NextResponse.json(
      { error: "Erro ao atualizar notícia" },
      { status: 500 }
    )
  }
}

// DELETE - Deletar notícia
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const { id } = await params
    const { error } = await supabaseServer
      .from("News")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Erro ao deletar notícia:", error)
      return NextResponse.json(
        { error: "Erro ao deletar notícia" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar notícia:", error)
    return NextResponse.json(
      { error: "Erro ao deletar notícia" },
      { status: 500 }
    )
  }
}

