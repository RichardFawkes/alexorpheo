import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FileText } from "lucide-react"
import { supabaseServer } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Artigos | Admin",
}

async function getArticles() {
  try {
    const { data: articles, error } = await supabaseServer
      .from('Article')
      .select(`
        *,
        category:Category(name)
      `)
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Erro ao buscar artigos:', error)
      return []
    }

    return articles || []
  } catch (error) {
    console.error('Erro ao buscar artigos:', error)
    return []
  }
}

export default async function ArtigosAdminPage() {
  const articles = await getArticles()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Artigos</h1>
        <Button asChild>
          <Link href="/admin/artigos/novo">
            <Plus className="h-4 w-4 mr-2" />
            Novo Artigo
          </Link>
        </Button>
      </div>

      {articles.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum artigo criado</h3>
              <p className="text-muted-foreground mb-4">
                Comece criando seu primeiro artigo
              </p>
              <Button asChild>
                <Link href="/admin/artigos/novo">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Primeiro Artigo
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {articles.map((article) => (
            <Card key={article.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{article.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {article.category && <span>{article.category.name}</span>}
                      <span>{article.published ? "Publicado" : "Rascunho"}</span>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/artigos/${article.id}`}>
                      Editar
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              {article.excerpt && (
                <CardContent>
                  <p className="text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
