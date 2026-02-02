import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Share2, Facebook, Twitter, Linkedin, Clock, Tag } from "lucide-react"
import { supabaseServer } from "@/lib/supabase/server"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { obterUrlCompleta } from "@/lib/utils/url"
import ContentFormatter from "@/components/ui/ContentFormatter"

type TParams = Promise<{
  slug: string
}>

async function obterArtigo(slug: string) {
  try {
    const { data, error } = await supabaseServer
      .from('Article')
      .select(`
        *,
        category:Category(name, slug)
      `)
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle()

    if (error) {
      console.error('Erro ao buscar artigo:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Erro ao buscar artigo:', error)
    return null
  }
}

async function obterArtigosRelacionados(categoriaId: string | null, slugAtual: string) {
  try {
    let query = supabaseServer
      .from('Article')
      .select(`
        *,
        category:Category(name, slug)
      `)
      .eq('published', true)
      .neq('slug', slugAtual)
      .limit(3)

    if (categoriaId) {
      query = query.eq('categoryId', categoriaId)
    }

    const { data, error } = await query.order('publishedAt', { ascending: false })

    if (error) {
      console.error('Erro ao buscar artigos relacionados:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Erro ao buscar artigos relacionados:', error)
    return []
  }
}

export async function generateMetadata({ params }: { params: TParams }): Promise<Metadata> {
  const { slug } = await params
  const artigo = await obterArtigo(slug)

  if (!artigo) {
    return {
      title: "Artigo não encontrado",
    }
  }

  return {
    title: `${artigo.title} | Alexorpheo Advocacia`,
    description: artigo.excerpt || artigo.title,
    openGraph: {
      title: artigo.title,
      description: artigo.excerpt || artigo.title,
      url: obterUrlCompleta(`/artigos/${slug}`),
      type: "article",
      images: artigo.coverImage ? [{ url: artigo.coverImage }] : [],
    },
  }
}

export default async function ArtigoPage({ params }: { params: TParams }) {
  const { slug } = await params
  const artigo = await obterArtigo(slug)

  if (!artigo) {
    notFound()
  }

  const artigosRelacionados = await obterArtigosRelacionados(artigo.categoryId, artigo.slug)
  const urlAtual = obterUrlCompleta(`/artigos/${artigo.slug}`)

  return (
    <div className="min-h-screen bg-white">
      {/* Header com Imagem de Fundo (se houver) ou Gradiente */}
      <section className="relative py-20 md:py-28 bg-slate-900 overflow-hidden">
        {artigo.coverImage && (
          <div className="absolute inset-0 z-0">
             <Image
               src={artigo.coverImage}
               alt={artigo.title}
               fill
               className="object-cover opacity-20"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60" />
          </div>
        )}

        {!artigo.coverImage && (
           <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/artigos"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 font-semibold uppercase tracking-wider text-sm group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Voltar para Artigos</span>
            </Link>

            {/* Badges e Data */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              {artigo.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-900/50 border border-blue-500/30 text-blue-200 rounded-full font-medium">
                  <Tag className="w-3 h-3" />
                  {artigo.category.name}
                </span>
              )}
              {artigo.publishedAt && (
                <span className="inline-flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3 h-3" />
                  {format(new Date(artigo.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </span>
              )}
            </div>

            {/* Título */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-serif">
              {artigo.title}
            </h1>

            {/* Resumo */}
            {artigo.excerpt && (
              <p className="text-base md:text-lg text-slate-300 leading-relaxed border-l-4 border-blue-500 pl-6 max-w-3xl">
                {artigo.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
             {/* Compartilhar */}
             <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
                <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Compartilhar:</span>
                <div className="flex gap-2">
                  <ShareButtons url={urlAtual} title={artigo.title} />
                </div>
             </div>

             {/* Conteúdo com formatação inteligente */}
             <ContentFormatter content={artigo.content} />

             {/* Footer do Artigo */}
             <div className="mt-16 pt-8 border-t border-slate-200">
               <p className="text-slate-500 text-sm italic">
                 Publicado por Alexorpheo Advocacia. O conteúdo deste artigo é meramente informativo e não substitui uma consulta jurídica.
               </p>
             </div>
          </div>
        </div>
      </section>

      {/* Artigos Relacionados */}
      {artigosRelacionados.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 font-serif">
                Leia Também
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {artigosRelacionados.map((relacionado) => (
                   <Link
                     key={relacionado.id}
                     href={`/artigos/${relacionado.slug}`}
                     className="group flex flex-col h-full bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden"
                   >
                     {relacionado.coverImage ? (
                       <div className="relative aspect-[16/9] overflow-hidden">
                         <Image
                           src={relacionado.coverImage}
                           alt={relacionado.title}
                           fill
                           className="object-cover group-hover:scale-105 transition-transform duration-500"
                         />
                       </div>
                     ) : (
                       <div className="relative aspect-[16/9] bg-slate-100 flex items-center justify-center">
                          <div className="w-12 h-12 text-slate-300">
                            {/* Icon placeholder */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                          </div>
                       </div>
                     )}

                     <div className="p-6 flex-1 flex flex-col">
                       {relacionado.category && (
                         <span className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                           {relacionado.category.name}
                         </span>
                       )}
                       <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-800 transition-colors">
                         {relacionado.title}
                       </h3>
                       {relacionado.excerpt && (
                         <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                           {relacionado.excerpt}
                         </p>
                       )}
                       <span className="text-sm font-semibold text-blue-700 mt-auto flex items-center gap-1">
                         Ler artigo <ArrowLeft className="w-4 h-4 rotate-180" />
                       </span>
                     </div>
                   </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function ShareButtons({ url, title, vertical = false }: { url: string, title: string, vertical?: boolean }) {
  const baseBtnClass = "flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"

  return (
    <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-4`}>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtnClass} bg-white border-slate-200 text-slate-600 hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white`}
        aria-label="Compartilhar no Facebook"
        title="Compartilhar no Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtnClass} bg-white border-slate-200 text-slate-600 hover:bg-black hover:border-black hover:text-white`}
        aria-label="Compartilhar no Twitter"
        title="Compartilhar no Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseBtnClass} bg-white border-slate-200 text-slate-600 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white`}
        aria-label="Compartilhar no LinkedIn"
        title="Compartilhar no LinkedIn"
      >
        <Linkedin className="w-5 h-5" />
      </a>
    </div>
  )
}
