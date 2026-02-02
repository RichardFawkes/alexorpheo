import { supabaseServer } from "@/lib/supabase/server"
import HeroSection from "@/components/home/HeroSection"
import CarouselNoticias from "@/components/home/CarouselNoticias"
import SectionAreasAtuacao from "@/components/home/SectionAreasAtuacao"
import SectionCTAFinal from "@/components/home/SectionCTAFinal"
import GoogleReviews from "@/components/home/GoogleReviews"

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function obterNoticiasDestaque() {
  try {
    const { data, error } = await supabaseServer
      .from("News")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("publishedAt", { ascending: false })
      .limit(6)

    if (error) {
      return []
    }

    return data || []
  } catch (error) {
    return []
  }
}

async function obterConfiguracoes() {
  try {
    const { data } = await supabaseServer
      .from("SiteSettings")
      .select("bannerImage")
      .single()
    return data
  } catch (error) {
    return null
  }
}

export default async function Home() {
  const [noticias, configuracoes] = await Promise.all([
    obterNoticiasDestaque(),
    obterConfiguracoes()
  ])

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden pt-20 md:pt-24">

      {/* HERO SECTION - Ultra Premium com Parallax */}
      <HeroSection bannerImage={configuracoes?.bannerImage} />

      {/* NOTÍCIAS */}
      {noticias.length > 0 && <CarouselNoticias noticias={noticias} />}

      {/* ÁREAS DE ATUAÇÃO */}
      <SectionAreasAtuacao />

      {/* CTA FINAL */}
      <SectionCTAFinal />

      {/* AVALIAÇÕES DO GOOGLE */}
      <GoogleReviews />
    </div>
  )
}

