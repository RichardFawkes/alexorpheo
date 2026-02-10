"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { Award, Users, CheckCircle2, Star, Scale } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants/site-config"

const diferenciais = [
  {
    icon: Award,
    title: "Excelência e Tradição",
    desc: `${SITE_CONFIG.site.anosExperiencia}+ anos de experiência jurídica`
  },
  {
    icon: Users,
    title: "Atendimento Personalizado",
    desc: "Foco total nas necessidades do cliente"
  },
  {
    icon: CheckCircle2,
    title: "Resultados Comprovados",
    desc: "Histórico de sucesso em casos complexos"
  },
  {
    icon: Star,
    title: "Advocacia Premium",
    desc: "Alto padrão técnico e estratégico"
  }
]

export default function HeroSection({ bannerImage }: { bannerImage?: string | null }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2])

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })


  return (
    <section ref={heroRef} className="relative h-[92dvh] md:h-[85vh] flex flex-col justify-end overflow-hidden">
      {/* Background com Banner Principal */}
      <motion.div
        style={{ y: smoothY, scale: smoothScale }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.15, filter: "blur(15px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1
          }}
          className="relative w-full h-full"
        >
          <Image
            src={bannerImage || "/banner.png"}
            alt="Orpheo Advocacia - Banner principal"
            fill
            className="object-cover object-[35%_35%] md:object-[60%_50%]"
            priority
            quality={100}
            sizes="100vw"
            unoptimized
          />
        </motion.div>
        {/* Gradiente inferior para integrar com a barra de informações */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      </motion.div>

      {/* Barra de Informações Premium (Trust Bar) - Design 2026 Imersivo */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-20 w-full"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {diferenciais.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-slate-950/60 backdrop-blur-sm rounded-xl border border-white/10 transition-all duration-300 hover:bg-slate-900/80 hover:border-[#D9B060]/30"
              >
                {/* Icon Container with Glow */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-[#D9B060] blur-2xl rounded-full opacity-20 group-hover:opacity-50 transition-opacity duration-500 scale-150" />
                  <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="w-6 h-6 md:w-8 md:h-8 text-[#D9B060] drop-shadow-[0_0_15px_rgba(217,176,96,0.5)]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-white font-medium text-sm md:text-base leading-tight mb-0.5 md:mb-1 group-hover:text-[#D9B060] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs uppercase tracking-wider font-medium opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

