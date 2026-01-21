
import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { supabaseServer } from "@/lib/supabase/server"
import { z } from "zod"

const categorySchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
  slug: z.string().min(3, "Slug deve ter no mínimo 3 caracteres").optional(),
})

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
    const validatedData = categorySchema.parse(body)

    const updateData: any = {}
    if (validatedData.name) updateData.name = validatedData.name
    if (validatedData.slug) updateData.slug = validatedData.slug

    const { data: category, error } = await supabaseServer
      .from('Category')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error("Erro ao atualizar categoria:", error)
      return NextResponse.json(
        { error: "Erro ao atualizar categoria", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: "Erro ao atualizar categoria" },
      { status: 500 }
    )
  }
}

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
      .from('Category')
      .delete()
      .eq('id', id)

    if (error) {
      console.error("Erro ao deletar categoria:", error)
      return NextResponse.json(
        { error: "Erro ao deletar categoria", details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erro ao deletar categoria:", error)
    return NextResponse.json(
      { error: "Erro ao deletar categoria" },
      { status: 500 }
    )
  }
}
