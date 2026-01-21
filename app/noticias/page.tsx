import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Newspaper } from "lucide-react"
import { supabaseServer } from "@/lib/supabase/server"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: "Notícias Jurídicas | Alexorpheo Advocacia",
  description: "Fique por dentro das principais novidades e atualizações do mundo jurídico",
}

async function obterNoticias() {
  try {
    const { data, error } = await supabaseServer
      .from('News')
      .select('*')
      .eq('published', true)
      .order('publishedAt', { ascending: false })

    if (error) {
      console.error('Erro ao buscar notícias:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar notícias:', error)
    return []
  }
}

async function obterCategorias() {
  try {
    const { data, error } = await supabaseServer
      .from('News')
      .select('category')
      .eq('published', true)
      .not('category', 'is', null)

    if (error) {
      console.error('Erro ao buscar categorias:', error)
      return []
    }

    const categorias = [...new Set(data.map(item => item.category).filter(Boolean))]
    return categorias
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    return []
  }
}

export default async function NoticiasPage() {
  const noticias = await obterNoticias()
  const categorias = await obterCategorias()

  return (
    <div className="min-h-screen bg-gold-50">
      {/* Header */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Linhas decorativas */}
        <div className="absolute left-0 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 uppercase tracking-tight">
              INSIGHTS<br />
              <span className="text-gold-500">JURÍDICOS</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
              Fique por dentro das principais atualizações do mundo jurídico
            </p>

            {/* Botão CTA */}
            <div className="mt-10">
              <Link
                href="#noticias"
                className="inline-block px-8 py-4 border-2 border-gold-500 text-gold-600 rounded-full font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-white transition-all duration-300"
              >
                VER TODOS OS INSIGHTS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Linha divisória */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent" />
      </div>

      {/* Lista de Notícias */}
      <section id="noticias" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {noticias.length === 0 ? (
              <div className="text-center py-20">
                <Newspaper className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Nenhum insight encontrado</h3>
                <p className="text-slate-500">
                  Não há insights publicados no momento. Volte em breve!
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {noticias.map((noticia, index) => (
                  <article key={noticia.id} className="group">
                    {/* Data */}
                    {noticia.publishedAt && (
                      <div className="text-gold-600 font-bold text-lg mb-4 uppercase">
                        {new Date(noticia.publishedAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        }).replace('.', '').toUpperCase()}
                      </div>
                    )}

                    {/* Card */}
                    <Link href={`/noticias/${noticia.slug}`}>
                      <div className="relative border border-gold-200 bg-white hover:border-gold-500 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md">
                        {/* Triângulo dourado no canto */}
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-gold-500 border-l-[60px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="p-8 md:p-10">
                          {/* Badges */}
                          <div className="flex flex-wrap gap-3 mb-6">
                            {noticia.category && (
                              <span className="px-4 py-1.5 bg-gold-50 border border-gold-100 text-gold-700 text-sm font-bold uppercase tracking-wider rounded-full">
                                {noticia.category}
                              </span>
                            )}
                            {noticia.tags && noticia.tags.slice(0, 2).map((tag: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-4 py-1.5 bg-slate-100 border border-slate-200 text-slate-600 text-sm font-bold uppercase tracking-wider rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Título */}
                          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-gold-600 transition-colors duration-300 leading-tight">
                            {noticia.title}
                          </h2>

                          {/* Resumo */}
                          {noticia.excerpt && (
                            <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3">
                              {noticia.excerpt}
                            </p>
                          )}

                          {/* Fonte (se houver) */}
                          <p className="text-sm text-slate-500 italic">
                            Fonte: Alexorpheo Advocacia
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/* Linha divisória entre notícias */}
                    {index < noticias.length - 1 && (
                      <div className="mt-12 h-px bg-gradient-to-r from-transparent via-gold-200 to-transparent" />
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

