import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { supabaseServer } from "@/lib/supabase/server"
import { z } from "zod"
import { revalidatePath } from "next/cache"

const areaSchema = z.object({
  titulo: z.string().min(3, "Título deve ter no mínimo 3 caracteres"),
  slug: z.string().min(3, "Slug deve ter no mínimo 3 caracteres"),
  descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  icone: z.string().min(3, "Ícone inválido"),
  destaque: z.boolean().default(false),
  servicos: z.array(z.string()).default([]),
  detalhes: z.string().optional()
})

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("PracticeArea")
      .select("*")
      .order("destaque", { ascending: false })
      .order("titulo", { ascending: true })

    if (error) {
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
    }

    const body = await request.json()
    const parsed = areaSchema.parse(body)

    const payload = {
      ...parsed,
      servicos: parsed.servicos || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const { data, error } = await supabaseServer
      .from("PracticeArea")
      .insert([payload])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    revalidatePath("/")
    revalidatePath("/areas-atuacao")
    revalidatePath("/admin/areas")
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json({ error: "Erro ao criar área" }, { status: 500 })
  }
}
