import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft, Newspaper, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { supabaseServer } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { obterUrlCompleta } from "@/lib/utils/url"

type TParams = Promise<{
  slug: string
}>

async function obterNoticia(slug: string) {
  try {
    console.log('🔍 Buscando notícia com slug:', slug)

    const { data, error } = await supabaseServer
      .from('News')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (error) {
      console.error('❌ Erro ao buscar notícia:', error)
      return null
    }

    if (!data) {
      console.log('⚠️ Notícia não encontrada para slug:', slug)
      return null
    }

    console.log('✅ Notícia encontrada:', data.title)
    return data
  } catch (error) {
    console.error('❌ Erro ao buscar notícia:', error)
    return null
  }
}

async function obterNoticiasRelacionadas(categoriaAtual: string | null, slugAtual: string) {
  try {
    let query = supabaseServer
      .from('News')
      .select('*')
      .eq('published', true)
      .neq('slug', slugAtual)
      .limit(3)

    if (categoriaAtual) {
      query = query.eq('category', categoriaAtual)
    }

    const { data, error } = await query.order('publishedAt', { ascending: false })

    if (error) {
      console.error('Erro ao buscar notícias relacionadas:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar notícias relacionadas:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: TParams }): Promise<Metadata> {
  const { slug } = await params
  const noticia = await obterNoticia(slug)

  if (!noticia) {
    return {
      title: "Notícia não encontrada",
    }
  }

  return {
    title: `${noticia.title} | Alexorpheo Advocacia`,
    description: noticia.excerpt || noticia.title,
  }
}

export default async function NoticiaPage({ params }: { params: TParams }) {
  const { slug } = await params
  const noticia = await obterNoticia(slug)

  if (!noticia) {
    notFound()
  }

  const noticiasRelacionadas = await obterNoticiasRelacionadas(noticia.category, noticia.slug)

  const urlAtual = obterUrlCompleta(`/noticias/${noticia.slug}`)

  return (
    <div className="min-h-screen bg-[#1a2332]">
      {/* Header */}
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors mb-8 font-semibold uppercase tracking-wider text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para Notícias</span>
            </Link>

            {/* Data */}
            {noticia.publishedAt && (
              <div className="text-amber-400 font-bold text-xl mb-6 uppercase">
                {new Date(noticia.publishedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                }).replace('.', '').toUpperCase()}
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {noticia.category && (
                <span className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm font-bold uppercase tracking-wider rounded-full">
                  {noticia.category}
                </span>
              )}
              {noticia.tags && noticia.tags.slice(0, 3).map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 text-sm font-bold uppercase tracking-wider rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Título */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight uppercase">
              {noticia.title}
            </h1>

            {/* Resumo */}
            {noticia.excerpt && (
              <p className="text-xl text-slate-300 leading-relaxed border-l-4 border-amber-500 pl-6">
                {noticia.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Linha divisória */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-12" />
      </div>

      {/* Conteúdo */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Card de Conteúdo */}
            <div className="relative border border-slate-700 p-8 md:p-12">
              {/* Triângulo decorativo */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-t-amber-500 border-l-[80px] border-l-transparent" />

              {/* Compartilhar */}
              <div className="flex items-center gap-4 mb-12 pb-8 border-b border-slate-700">
                <span className="text-slate-400 font-semibold flex items-center gap-2 uppercase tracking-wider text-sm">
                  <Share2 className="w-5 h-5" />
                  Compartilhar:
                </span>
                <div className="flex gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlAtual)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-900 transition-all duration-300"
                    aria-label="Compartilhar no Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(urlAtual)}&text=${encodeURIComponent(noticia.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-900 transition-all duration-300"
                    aria-label="Compartilhar no Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlAtual)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-800 border border-slate-700 text-slate-300 hover:bg-amber-500 hover:border-amber-500 hover:text-slate-900 transition-all duration-300"
                    aria-label="Compartilhar no LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Conteúdo HTML */}
              <div
                className="prose prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wide
                  prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-12
                  prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-amber-400
                  prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                  prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-white prose-strong:font-bold
                  prose-ul:text-slate-300 prose-ul:space-y-2
                  prose-ol:text-slate-300 prose-ol:space-y-2
                  prose-li:text-slate-300"
                dangerouslySetInnerHTML={{ __html: noticia.content }}
              />

              {/* Fonte */}
              <div className="mt-12 pt-8 border-t border-slate-700">
                <p className="text-sm text-slate-500 italic">
                  Fonte: Alexorpheo Advocacia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notícias Relacionadas */}
      {noticiasRelacionadas.length > 0 && (
        <section className="py-16 md:py-24 border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 uppercase tracking-tight">
                Notícias <span className="text-amber-400">Relacionadas</span>
              </h2>

              <div className="space-y-8">
                {noticiasRelacionadas.map((relacionada) => (
                  <article key={relacionada.id} className="group">
                    <Link href={`/noticias/${relacionada.slug}`}>
                      <div className="relative border border-slate-700 hover:border-amber-500 transition-all duration-500 overflow-hidden">
                        {/* Triângulo dourado no canto */}
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[50px] border-t-amber-500 border-l-[50px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="p-6 md:p-8">
                          {/* Data */}
                          {relacionada.publishedAt && (
                            <div className="text-amber-400 font-bold text-sm mb-3 uppercase">
                              {new Date(relacionada.publishedAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              }).replace('.', '').toUpperCase()}
                            </div>
                          )}

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {relacionada.category && (
                              <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider rounded-full">
                                {relacionada.category}
                              </span>
                            )}
                          </div>

                          {/* Título */}
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                            {relacionada.title}
                          </h3>

                          {/* Resumo */}
                          {relacionada.excerpt && (
                            <p className="text-slate-400 leading-relaxed line-clamp-2">
                              {relacionada.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/noticias"
                  className="inline-block px-8 py-4 border-2 border-amber-500 text-amber-400 rounded-full font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-slate-900 transition-all duration-300"
                >
                  Ver Todas as Notícias
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

