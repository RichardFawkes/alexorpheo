"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import ImageUpload from "@/components/admin/ImageUpload"
import { ArrowLeft, Loader2, Trash2, Edit, FileText, AlignLeft, Image as ImageIcon, Settings, Save, Link as LinkIcon } from "lucide-react"
import Link from "next/link"

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
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/admin/artigos">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Edit className="h-8 w-8 text-blue-600" />
              Editar Artigo
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Atualize as informações do artigo</p>
          </div>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
          size="lg"
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Excluindo...
            </>
          ) : (
            <>
              <Trash2 className="h-5 w-5 mr-2" />
              Excluir Artigo
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card className="border-t-4 border-t-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle>Informações Básicas</CardTitle>
            </div>
            <CardDescription>Título e identificação do artigo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">Título do Artigo *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value })
                  if (!formData.slug) {
                    setFormData({ ...formData, title: e.target.value, slug: gerarSlug(e.target.value) })
                  }
                }}
                className="h-12 text-lg"
                required
              />
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-base font-semibold">Slug (URL) *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
              <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <LinkIcon className="h-3 w-3" />
                URL: <span className="font-mono text-blue-600">/artigos/{formData.slug || "seu-slug"}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo */}
        <Card className="border-t-4 border-t-purple-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlignLeft className="h-5 w-5 text-purple-600" />
              <CardTitle>Conteúdo</CardTitle>
            </div>
            <CardDescription>Resumo e texto completo do artigo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Resumo */}
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-base font-semibold">Resumo</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                placeholder="Breve descrição do artigo..."
                className="resize-none"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recomendado: 150-200 caracteres para melhor SEO
              </p>
            </div>

            {/* Conteúdo */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-base font-semibold">Conteúdo Completo (Markdown) *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={20}
                required
                placeholder="# Título do Artigo&#10;&#10;Seu conteúdo aqui..."
                className="font-mono text-sm resize-none"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Suporta Markdown: **negrito**, *itálico*, # títulos, listas, links, etc.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Imagem */}
        <Card className="border-t-4 border-t-green-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-green-600" />
              <CardTitle>Imagem de Capa</CardTitle>
            </div>
            <CardDescription>Imagem principal do artigo (opcional)</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={formData.coverImage}
              onChange={(url) => setFormData({ ...formData, coverImage: url })}
            />
          </CardContent>
        </Card>

        {/* Configurações */}
        <Card className="border-t-4 border-t-[#d9b060]">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-[#d9b060]" />
              <CardTitle>Configurações de Publicação</CardTitle>
            </div>
            <CardDescription>Defina o status de publicação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border-2 hover:border-[#d9b060] transition-colors">
              <div className="flex-1">
                <Label htmlFor="published" className="text-base font-semibold cursor-pointer">
                  Publicar artigo
                </Label>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  O artigo ficará visível publicamente no site
                </p>
              </div>
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                className="data-[state=checked]:bg-amber-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border-2 border-dashed">
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isLoading}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
            <Button type="button" variant="outline" size="lg" asChild>
              <Link href="/admin/artigos">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Cancelar
              </Link>
            </Button>
          </div>

          {formData.published && (
            <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Publicado
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

