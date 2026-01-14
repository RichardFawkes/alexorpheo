import { supabaseServer } from "@/lib/supabase/server"
import HeroSection from "@/components/home/HeroSection"
import CarouselNoticias from "@/components/home/CarouselNoticias"
import SectionAreasAtuacao from "@/components/home/SectionAreasAtuacao"
import SectionCTAFinal from "@/components/home/SectionCTAFinal"

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

export default async function Home() {
  const noticias = await obterNoticiasDestaque()

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden -mt-20 md:-mt-24">

      {/* HERO SECTION - Ultra Premium com Parallax */}
      <HeroSection />
{/* NOTÍCIAS */}
      {noticias.length > 0 && <CarouselNoticias noticias={noticias} />}

      {/* ÁREAS DE ATUAÇÃO */}
      <SectionAreasAtuacao />



      {/* CTA FINAL */}
      <SectionCTAFinal />
    </div>
  )
}

