"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "@/components/admin/ImageUpload"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function NovoArtigoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    categoryId: "",
    published: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push("/admin/artigos")
        router.refresh()
      } else {
        alert("Erro ao criar artigo")
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao criar artigo")
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/artigos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Novo Artigo</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Artigo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value
                  setFormData({
                    ...formData,
                    title,
                    slug: generateSlug(title)
                  })
                }}
                placeholder="Digite o título do artigo"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="slug-do-artigo"
                required
              />
              <p className="text-sm text-muted-foreground">
                URL: /artigos/{formData.slug || "slug-do-artigo"}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Resumo</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Breve resumo do artigo (aparece na listagem)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo (Markdown) *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="# Título do Artigo

Escreva o conteúdo em Markdown...

## Subtítulo

Parágrafo com **negrito** e *itálico*."
                rows={15}
                className="font-mono text-sm"
                required
              />
              <p className="text-sm text-muted-foreground">
                Suporta Markdown (títulos, listas, links, etc)
              </p>
            </div>

            <div className="space-y-2">
              <Label>Imagem de Capa</Label>
              <ImageUpload
                value={formData.coverImage}
                onChange={(url) => setFormData({ ...formData, coverImage: url })}
                onRemove={() => setFormData({ ...formData, coverImage: "" })}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="published" className="cursor-pointer">
                Publicar artigo imediatamente
              </Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Criando...
                  </>
                ) : (
                  "Criar Artigo"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/artigos">Cancelar</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
