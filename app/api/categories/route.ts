import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { supabaseServer } from "@/lib/supabase/server"
import { z } from "zod"

const categorySchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter no mínimo 3 caracteres"),
})

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
    const validatedData = categorySchema.parse(body)

    const { data: category, error } = await supabaseServer
      .from('Category')
      .insert({
        name: validatedData.name,
        slug: validatedData.slug,
      })
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar categoria:", error)
      // Check for unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: "Já existe uma categoria com este slug" },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: "Erro ao criar categoria", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar categoria:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Erro ao criar categoria" },
      { status: 500 }
    )
  }
}
