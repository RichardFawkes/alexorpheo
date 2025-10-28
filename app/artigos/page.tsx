import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Artigos Jurídicos | Dr. João Silva - Advocacia",
  description: "Artigos e análises sobre temas jurídicos relevantes",
};

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      include: {
        author: { select: { name: true } },
        category: { select: { name: true, slug: true } },
      },
    });
    return articles;
  } catch (error) {
    return [];
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
    return categories;
  } catch (error) {
    return [] as Awaited<ReturnType<typeof prisma.category.findMany>>;
  }
}

export default async function ArtigosPage() {
  const articles = await getArticles();
  const categories = await getCategories();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Artigos Jurídicos</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Insights, análises e orientações sobre temas jurídicos relevantes
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar com Categorias */}
            {categories.length > 0 && (
              <aside className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Categorias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <Link
                            href={`/artigos?categoria=${category.slug}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </aside>
            )}

            {/* Lista de Artigos */}
            <div className="lg:col-span-3">
              {articles.length === 0 ? (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Nenhum artigo publicado ainda</h3>
                      <p className="text-muted-foreground">
                        Em breve publicaremos artigos jurídicos relevantes.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {articles.map((article) => (
                    <Card key={article.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          {article.category && (
                            <>
                              <span className="font-medium text-primary">{article.category.name}</span>
                              <span>•</span>
                            </>
                          )}
                          <span>
                            {article.publishedAt &&
                              format(new Date(article.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                          </span>
                          {article.author?.name && (
                            <>
                              <span>•</span>
                              <span>Por {article.author.name}</span>
                            </>
                          )}
                        </div>
                        <CardTitle className="text-2xl hover:text-primary transition-colors">
                          <Link href={`/artigos/${article.slug}`}>{article.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base mb-4">
                          {article.excerpt}
                        </CardDescription>
                        <Button asChild variant="link" className="px-0">
                          <Link href={`/artigos/${article.slug}`}>
                            Ler artigo completo →
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
