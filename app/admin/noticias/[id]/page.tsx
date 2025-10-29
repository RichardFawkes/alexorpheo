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
import { ArrowLeft, Loader2, Trash2, Star, Save, Eye, FileText, Image as ImageIcon, Tag, Edit, AlertTriangle } from "lucide-react"
import Link from "next/link"

type TNewsFormData = {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  tags: string[]
  published: boolean
  featured: boolean
}

export default function EditarNoticiaPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [newsId, setNewsId] = useState<string>("")
  const [tagsInput, setTagsInput] = useState<string>("")
  const [formData, setFormData] = useState<TNewsFormData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    tags: [],
    published: false,
    featured: false
  })

  useEffect(() => {
    params.then(({ id }) => {
      setNewsId(id)
      carregarNoticia(id)
    })
  }, [])

  const carregarNoticia = async (id: string) => {
    try {
      const response = await fetch(`/api/news/${id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          coverImage: data.coverImage || "",
          category: data.category || "",
          tags: data.tags || [],
          published: data.published || false,
          featured: data.featured || false
        })
        setTagsInput(data.tags?.join(", ") || "")
      }
    } catch (error) {
      console.error("Erro ao carregar notícia:", error)
    }
  }

  const gerarSlug = (texto: string) => {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      title: value,
      slug: gerarSlug(value)
    }))
  }

  const handleTagsChange = (value: string) => {
    setTagsInput(value)
    const tagsArray = value
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
    setFormData(prev => ({ ...prev, tags: tagsArray }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push("/admin/noticias")
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || "Erro ao atualizar notícia")
      }
    } catch (error) {
      console.error("Erro ao atualizar notícia:", error)
      alert("Erro ao atualizar notícia")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta notícia?")) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/news/${newsId}`, {
        method: "DELETE"
      })

      if (response.ok) {
        router.push("/admin/noticias")
        router.refresh()
      } else {
        alert("Erro ao excluir notícia")
      }
    } catch (error) {
      console.error("Erro ao excluir notícia:", error)
      alert("Erro ao excluir notícia")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="hover:bg-amber-50 hover:border-amber-600">
            <Link href="/admin/noticias">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Edit className="h-8 w-8 text-amber-600" />
              Editar Notícia
            </h1>
            <p className="text-muted-foreground mt-1">Atualize as informações da notícia</p>
          </div>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
          size="lg"
          className="hover:bg-red-700"
        >
          {isDeleting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Excluindo...
            </>
          ) : (
            <>
              <Trash2 className="h-5 w-5 mr-2" />
              Excluir Notícia
            </>
          )}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <Card className="border-t-4 border-t-amber-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-amber-600" />
              <CardTitle>Informações Básicas</CardTitle>
            </div>
            <CardDescription>Título, URL e categorização da notícia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="title" className="text-base font-semibold">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  required
                  className="text-lg h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug" className="text-base font-semibold">Slug (URL) *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  required
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  URL: /noticias/<span className="text-amber-600">{formData.slug || 'slug'}</span>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold">Categoria</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Ex: Direito Trabalhista"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-base font-semibold flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags (separadas por vírgula)
              </Label>
              <Input
                id="tags"
                value={tagsInput}
                onChange={(e) => handleTagsChange(e.target.value)}
                placeholder="Ex: trabalhista, legislação, empresas"
              />
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 p-3 bg-slate-50 rounded-lg dark:bg-slate-900">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-amber-100 text-amber-900 rounded-full text-sm font-medium dark:bg-amber-900/20 dark:text-amber-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo */}
        <Card className="border-t-4 border-t-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <CardTitle>Conteúdo</CardTitle>
            </div>
            <CardDescription>Resumo e texto completo da notícia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-base font-semibold">Resumo</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                rows={3}
                placeholder="Breve resumo que aparecerá nas listagens (opcional)"
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground">
                Recomendado: 150-200 caracteres
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-base font-semibold">Conteúdo Completo *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={20}
                required
                className="resize-none font-serif"
              />
              <p className="text-xs text-muted-foreground">
                Você pode usar HTML para formatação avançada
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Imagem */}
        <Card className="border-t-4 border-t-purple-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-purple-600" />
              <CardTitle>Imagem de Capa</CardTitle>
            </div>
            <CardDescription>Imagem principal que aparecerá na notícia</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              value={formData.coverImage}
              onChange={(url) => setFormData(prev => ({ ...prev, coverImage: url }))}
            />
          </CardContent>
        </Card>

        {/* Configurações de Publicação */}
        <Card className="border-t-4 border-t-green-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              <CardTitle>Configurações de Publicação</CardTitle>
            </div>
            <CardDescription>Controle a visibilidade e destaque da notícia</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-green-500 transition-colors">
              <div className="space-y-0.5">
                <Label htmlFor="published" className="text-base font-semibold cursor-pointer">Publicar Notícia</Label>
                <p className="text-sm text-muted-foreground">
                  A notícia ficará visível publicamente no site
                </p>
              </div>
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 border-2 border-amber-200 rounded-lg bg-amber-50 dark:bg-amber-950/20 hover:border-amber-400 transition-colors">
              <div className="flex items-start gap-3">
                <Star className="h-6 w-6 text-amber-600 mt-0.5" />
                <div className="space-y-0.5">
                  <Label htmlFor="featured" className="text-base font-semibold cursor-pointer">Destaque na Home</Label>
                  <p className="text-sm text-muted-foreground">
                    A notícia aparecerá em destaque no carousel da página inicial
                  </p>
                </div>
              </div>
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
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
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg hover:shadow-xl transition-all"
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
            <Button
              type="button"
              variant="outline"
              size="lg"
              asChild
              className="hover:bg-slate-100"
            >
              <Link href="/admin/noticias">
                <ArrowLeft className="h-4 w-4 mr-2" />
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

