"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import ImageUpload from "@/components/admin/ImageUpload"
import { ArrowLeft, Loader2, Trash2 } from "lucide-react"
import Link from "next/link"
import { supabaseServer } from "@/lib/supabase/server"

type TArticleFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  categoryId: string
  published: boolean
}

export default function EditarArtigoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [articleId, setArticleId] = useState<string>("")
  const [formData, setFormData] = useState<TArticleFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categoryId: "",
    published: false
  })

  useEffect(() => {
    params.then(({ id }) => {
      setArticleId(id)
      carregarArtigo(id)
    })
  }, [])

  const carregarArtigo = async (id: string) => {
    try {
      const response = await fetch(`/api/articles/${id}`)
      if (response.ok) {
        const article = await response.json()
        setFormData({
          title: article.title || "",
          slug: article.slug || "",
          excerpt: article.excerpt || "",
          content: article.content || "",
          coverImage: article.coverImage || "",
          categoryId: article.categoryId || "",
          published: article.published || false
        })
      } else {
        alert("Erro ao carregar artigo")
        router.push("/admin/artigos")
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao carregar artigo")
      router.push("/admin/artigos")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const dataToSend = {
        ...formData,
        categoryId: formData.categoryId || undefined,
        excerpt: formData.excerpt || undefined,
        coverImage: formData.coverImage || undefined
      }

      const response = await fetch(`/api/articles/${articleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend)
      })

      if (response.ok) {
        router.push("/admin/artigos")
        router.refresh()
      } else {
        const errorData = await response.json()
        console.error("Erro ao atualizar artigo:", errorData)
        alert(`Erro ao atualizar artigo: ${errorData.details || errorData.error}`)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao atualizar artigo")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.")) {
      return
    }

    setIsDeleting(true)

    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        router.push("/admin/artigos")
        router.refresh()
      } else {
        const errorData = await response.json()
        alert(`Erro ao excluir artigo: ${errorData.details || errorData.error}`)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao excluir artigo")
    } finally {
      setIsDeleting(false)
    }
  }

  const gerarSlug = (titulo: string) => {
    return titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/admin/artigos">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Editar Artigo</h1>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Excluindo...
            </>
          ) : (
            <>
              <Trash2 className="h-4 w-4 mr-2" />
              Excluir
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações do Artigo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value })
                  if (!formData.slug) {
                    setFormData({ ...formData, title: e.target.value, slug: gerarSlug(e.target.value) })
                  }
                }}
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL) *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
              <p className="text-sm text-muted-foreground">
                URL amigável: /artigos/{formData.slug || "seu-slug"}
              </p>
            </div>

            {/* Resumo */}
            <div className="space-y-2">
              <Label htmlFor="excerpt">Resumo</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                placeholder="Breve descrição do artigo..."
              />
            </div>

            {/* Conteúdo */}
            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo (Markdown) *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={15}
                required
                placeholder="# Título do Artigo&#10;&#10;Seu conteúdo aqui..."
              />
              <p className="text-sm text-muted-foreground">
                Suporta Markdown: **negrito**, *itálico*, # títulos, etc.
              </p>
            </div>

            {/* Imagem de Capa */}
            <div className="space-y-2">
              <Label>Imagem de Capa</Label>
              <ImageUpload
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
              />
            </div>

            {/* Publicado */}
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="published" className="cursor-pointer">
                Publicar artigo
              </Label>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar Alterações"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/artigos">Cancelar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

