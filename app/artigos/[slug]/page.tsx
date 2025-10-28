import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft, Calendar, User, FolderOpen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  });

  if (!article) {
    return {
      title: "Artigo não encontrado",
    };
  }

  return {
    title: `${article.title} | Dr. João Silva - Advocacia`,
    description: article.excerpt || undefined,
  };
}

async function getArticle(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: { slug, published: true },
      include: {
        author: { select: { name: true, image: true } },
        category: { select: { name: true, slug: true } },
      },
    });
    return article;
  } catch (error) {
    return null;
  }
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-50 py-8 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/artigos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para artigos
            </Link>
          </Button>

          <div className="max-w-4xl">
            {article.category && (
              <Link
                href={`/artigos?categoria=${article.category.slug}`}
                className="text-sm font-medium text-primary hover:underline"
              >
                {article.category.name}
              </Link>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6 font-serif">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {article.author?.name && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{article.author.name}</span>
                </div>
              )}
              {article.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {format(new Date(article.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <article className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none prose-slate prose-headings:font-serif prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>

            {/* CTA */}
            <div className="mt-12 p-8 bg-slate-50 rounded-xl border">
              <h3 className="text-2xl font-bold mb-4 font-serif">
                Precisa de assessoria jurídica especializada?
              </h3>
              <p className="text-muted-foreground mb-6">
                Entre em contato conosco para discutir como podemos ajudar em seu caso.
              </p>
              <Button asChild size="lg">
                <Link href="/contato">Agendar Consulta</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
