import { NextResponse } from "next/server"
import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/prisma"
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

    const article = await prisma.article.create({
      data: {
        ...validatedData,
        authorId: session.user.id,
        publishedAt: validatedData.published ? new Date() : null
      }
    })

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

    const articles = await prisma.article.findMany({
      where: published ? { published: true } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true } }
      }
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error("Erro ao buscar artigos:", error)
    return NextResponse.json(
      { error: "Erro ao buscar artigos" },
      { status: 500 }
    )
  }
}
