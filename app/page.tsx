import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Users, Award, TrendingUp, Briefcase, Home as HomeIcon, Building2, FileText } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

async function getRecentArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: {
        author: { select: { name: true } },
        category: { select: { name: true } },
      },
    });
    return articles;
  } catch (error) {
    return [];
  }
}

export default async function Home() {
  const recentArticles = await getRecentArticles();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              Advocacia com Excelência e Comprometimento
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Soluções jurídicas estratégicas para proteger seus direitos e interesses com ética e profissionalismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base">
                <Link href="/contato">Agendar Consulta</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-white/10 border-white/20 hover:bg-white/20 text-white">
                <Link href="/sobre">Conheça o Escritório</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Por que escolher nosso escritório?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprometimento com resultados e excelência em cada caso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Experiência Comprovada</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Mais de 15 anos de atuação com casos bem-sucedidos em diversas áreas do direito.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Atendimento Personalizado</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cada cliente recebe atenção dedicada e estratégias personalizadas para seu caso.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Scale className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Ética e Transparência</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Atuação pautada nos mais altos padrões éticos e com total transparência.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Resultados Efetivos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Foco em soluções práticas e eficientes que atendam aos objetivos dos clientes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Áreas de Atuação</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expertise especializada em diversas áreas do direito
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Briefcase, title: "Direito Civil", description: "Contratos, responsabilidade civil, direito de família e sucessões." },
              { icon: Users, title: "Direito Trabalhista", description: "Ações trabalhistas, acordos e consultoria preventiva." },
              { icon: Building2, title: "Direito Empresarial", description: "Constituição de empresas, contratos comerciais e recuperação judicial." },
              { icon: HomeIcon, title: "Direito Imobiliário", description: "Compra e venda, locação, usucapião e regularização de imóveis." },
            ].map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <area.icon className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{area.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link href="/areas-atuacao">Ver todas as áreas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Artigos Recentes */}
      {recentArticles.length > 0 && (
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Artigos Recentes</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Insights e análises sobre temas jurídicos relevantes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">
                      {article.category?.name} • {article.publishedAt && format(new Date(article.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                    </div>
                    <CardTitle className="text-xl hover:text-primary transition-colors">
                      <Link href={`/artigos/${article.slug}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                    <Button asChild variant="link" className="mt-4 px-0">
                      <Link href={`/artigos/${article.slug}`}>
                        Ler mais →
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="outline" size="lg">
                <Link href="/artigos">Ver todos os artigos</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            Precisa de Assistência Jurídica?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Entre em contato e agende uma consulta para discutir seu caso com nossos especialistas.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-base">
            <Link href="/contato">Fale Conosco</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
