import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  Calendar,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Clock,
  User,
  Tag,
  ChevronRight,
  Quote
} from "lucide-react"
import { supabaseServer } from "@/lib/supabase/server"
import { obterUrlCompleta } from "@/lib/utils/url"
import SectionCTAFinal from "@/components/home/SectionCTAFinal"

type TParams = Promise<{
  slug: string
}>

async function obterNoticia(slug: string) {
  try {
    const { data, error } = await supabaseServer
      .from('News')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (error || !data) return null
    return data
  } catch (error) {
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

    const { data } = await query.order('publishedAt', { ascending: false })
    return data || []
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: { params: TParams }): Promise<Metadata> {
  const { slug } = await params
  const noticia = await obterNoticia(slug)

  if (!noticia) {
    return { title: "Notícia não encontrada" }
  }

  return {
    title: `${noticia.title} | Alexorpheo Advocacia`,
    description: noticia.excerpt || noticia.title,
    openGraph: {
      title: noticia.title,
      description: noticia.excerpt || noticia.title,
      images: noticia.coverImage ? [noticia.coverImage] : [],
    }
  }
}

function calcularTempoLeitura(conteudo: string): string {
  const palavrasPorMinuto = 200
  const palavras = conteudo.split(/\s+/).length
  const minutos = Math.ceil(palavras / palavrasPorMinuto)
  return `${minutos} min de leitura`
}

export default async function NoticiaPage({ params }: { params: TParams }) {
  const { slug } = await params
  const noticia = await obterNoticia(slug)

  if (!noticia) notFound()

  const noticiasRelacionadas = await obterNoticiasRelacionadas(noticia.category, noticia.slug)
  const urlAtual = obterUrlCompleta(`/noticias/${noticia.slug}`)
  const tempoLeitura = calcularTempoLeitura(noticia.content || "")

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30 selection:text-amber-200">

      {/* --- HERO SECTION --- */}
      <div className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image/Effect */}
        <div className="absolute inset-0 z-0">
          {noticia.coverImage ? (
            <Image
              src={noticia.coverImage}
              alt={noticia.title}
              fill
              className="object-cover opacity-30 blur-sm scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/50 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="max-w-4xl mx-auto text-center">

            {/* Breadcrumb / Back */}
            <Link
              href="/noticias"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors mb-8 text-sm font-medium uppercase tracking-widest group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Voltar para Notícias
            </Link>

            {/* Meta Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {noticia.category && (
                <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                  {noticia.category}
                </span>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/50 border border-slate-700 text-slate-400 text-xs font-medium uppercase tracking-wider rounded-full backdrop-blur-md">
                <Clock className="w-3 h-3" />
                {tempoLeitura}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-lg">
              {noticia.title}
            </h1>

            {/* Meta Info Line */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 border-t border-slate-800/50 pt-6 mt-6 max-w-2xl mx-auto">
              {noticia.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span className="uppercase tracking-wide font-medium">
                    {new Date(noticia.publishedAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-amber-500" />
                <span className="uppercase tracking-wide font-medium">
                  Alex Orpheo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left Column: Content */}
          <article className="lg:w-2/3">

            {/* Excerpt / Lead */}
            {noticia.excerpt && (
              <div className="mb-10 p-6 md:p-8 bg-slate-900/50 border-l-4 border-amber-500 rounded-r-xl">
                <p className="text-xl md:text-2xl text-slate-200 font-light leading-relaxed italic">
                  "{noticia.excerpt}"
                </p>
              </div>
            )}

            {/* Main Image (if exists and not used in hero fully) */}
            {noticia.coverImage && (
              <div className="mb-12 relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
                <Image
                  src={noticia.coverImage}
                  alt={noticia.title}
                  width={1200}
                  height={675}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
              </div>
            )}

            {/* Rich Text Content */}
            <div
              className="prose prose-lg prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-slate-100 prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-slate-800 prose-h2:pb-4
                prose-h3:text-xl prose-h3:text-amber-400 prose-h3:mt-8
                prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-amber-400 prose-a:no-underline hover:prose-a:text-amber-300 hover:prose-a:underline transition-colors
                prose-blockquote:border-l-amber-500 prose-blockquote:bg-slate-900/30 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-400
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:list-disc prose-ul:pl-6 prose-ul:text-slate-300 prose-ul:space-y-2
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-slate-300 prose-ol:space-y-2
                prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-slate-800"
              dangerouslySetInnerHTML={{ __html: noticia.content }}
            />

            {/* Tags Footer */}
            {noticia.tags && noticia.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-800">
                <div className="flex flex-wrap gap-2 items-center">
                  <Tag className="w-4 h-4 text-slate-500 mr-2" />
                  {noticia.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-slate-900 border border-slate-800 text-slate-400 text-sm hover:text-amber-400 hover:border-amber-500/50 transition-colors cursor-default rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Right Column: Sidebar */}
          <aside className="lg:w-1/3 space-y-8">
            <div className="sticky top-24 space-y-8">

              {/* Share Card */}
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-amber-500" />
                  Compartilhar
                </h3>
                <div className="flex gap-2">
                  {[
                    { icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlAtual)}`, label: 'Facebook' },
                    { icon: Twitter, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlAtual)}&text=${encodeURIComponent(noticia.title)}`, label: 'Twitter' },
                    { icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlAtual)}`, label: 'LinkedIn' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 flex items-center justify-center bg-slate-800 hover:bg-amber-500 text-slate-400 hover:text-slate-900 rounded-xl transition-all duration-300 group"
                      aria-label={`Compartilhar no ${social.label}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="relative p-8 rounded-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br transition-transform group-hover:scale-105 duration-500" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />

                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Precisa de orientação jurídica?
                  </h3>
                  <p className="text-amber-100 mb-6 text-sm leading-relaxed">
                    Nossa equipe de especialistas está pronta para analisar o seu caso com a atenção que ele merece.
                  </p>
                  <Link
                    href="/contato"
                    className="inline-flex w-full items-center justify-center px-6 py-3 bg-white text-amber-700 font-bold rounded-xl hover:bg-amber-50 transition-colors shadow-lg"
                  >
                    Fale Conosco
                  </Link>
                </div>
              </div>

              {/* Related News Mini List */}
              {noticiasRelacionadas.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-4">
                    Leia Também
                  </h3>
                  <div className="space-y-6">
                    {noticiasRelacionadas.map((item) => (
                      <Link key={item.id} href={`/noticias/${item.slug}`} className="group block">
                        <div className="flex gap-4">
                          {item.coverImage && (
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={item.coverImage}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <div>
                            <span className="text-xs text-amber-500 font-bold uppercase tracking-wider mb-1 block">
                              {item.category || 'Notícia'}
                            </span>
                            <h4 className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </aside>
        </div>
      </div>

      {/* --- BOTTOM CTA SECTION --- */}
      <SectionCTAFinal />

    </div>
  )
}
