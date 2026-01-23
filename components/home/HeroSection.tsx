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

export default function HeroSection() {
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
    <section ref={heroRef} className="relative h-[85vh] flex flex-col justify-end overflow-hidden">
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
            src="/banner.jpeg"
            alt="Orpheo Advocacia - Banner principal"
            fill
            className="object-cover object-[25%_50%] md:object-[60%_50%]"
            priority
            quality={100}
          />
        </motion.div>
        {/* Gradiente inferior para integrar com a barra de informações */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
      </motion.div>

      {/* Barra de Informações Premium (Trust Bar) - Design 2026 Compacto */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-20 w-full bg-black/40 backdrop-blur-md border-t border-white/5"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {diferenciais.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-white/5 border border-transparent hover:border-white/5"
              >
                {/* Icon Container with Glow */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-[#D9B060] blur-lg rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:border-[#D9B060]/50 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-[#D9B060]" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col">
                  <h3 className="text-white font-medium text-sm leading-tight mb-0.5 group-hover:text-[#D9B060] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wider font-medium group-hover:text-slate-300 transition-colors duration-300">
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

