"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone, Scale, Award, Users, CheckCircle2, Star } from "lucide-react"
import { useRef } from "react"
import { SITE_CONFIG } from "@/lib/constants/site-config"

const diferenciais = [
  { icon: Award, text: `${SITE_CONFIG.site.anosExperiencia}+ anos de experiência` },
  { icon: Users, text: "Atendimento personalizado" },
  { icon: CheckCircle2, text: "Resultados comprovados" },
  { icon: Star, text: "Excelência reconhecida" }
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
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background com Banner Principal */}
      <motion.div
        style={{ y: smoothY, scale: smoothScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/banner.jpeg"
          alt="Orpheo Advocacia - Banner principal"
          fill
          className="object-cover object-center md:object-[60%_50%]"
          priority
        />
        {/* Overlay suave para leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-slate-950/88" />
      </motion.div>

      <motion.div
        style={{ opacity: smoothOpacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge profissional */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-slate-950/70 border border-white/10 rounded-full mb-10 shadow-md"
          >
            <Scale className="w-5 h-5 text-amber-300" />
            <span className="text-sm md:text-base font-semibold text-slate-50">
              <span className="text-amber-300">{SITE_CONFIG.advogado.oab}</span>
              {" • "}
              {SITE_CONFIG.site.anosExperiencia}+ anos de experiência
            </span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="block text-white mb-2">Advocacia de</span>
            <span className="block bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent">
              Excelência Absoluta
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-200/90 mb-14 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Soluções jurídicas estratégicas de{" "}
            <span className="text-amber-300 font-semibold">
              alto padrão
            </span>{" "}
            com atendimento personalizado e {SITE_CONFIG.site.anosExperiencia}+ anos de experiência em São Paulo
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-8 py-6 text-base md:text-lg font-semibold rounded-full shadow-lg transition-colors duration-300"
              >
                <Link href="/contato" className="flex items-center relative z-10">
                  <Phone className="mr-3 h-6 w-6" />
                  Agendar Consulta Exclusiva
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border border-slate-100/40 text-white hover:bg-white/5 px-8 py-6 text-base md:text-lg font-semibold rounded-full transition-colors duration-300"
              >
                <Link href="/sobre" className="flex items-center">
                  Conheça o Escritório
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Diferenciais */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto"
          >
            {diferenciais.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{
                  y: -6,
                  transition: { type: "spring", stiffness: 320, damping: 22 }
                }}
                className="flex flex-col items-center gap-3 p-6 md:p-7 bg-slate-950/75 rounded-2xl border border-white/10 shadow-lg hover:border-amber-400/50 transition-all duration-300 cursor-pointer"
              >
                <item.icon className="w-9 h-9 md:w-10 md:h-10 text-amber-300" />
                <span className="text-sm md:text-base text-slate-50 font-medium text-center leading-snug">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-white/70 text-sm font-medium tracking-wider">Deslize para conhecer mais</span>
              <motion.div
                className="w-7 h-11 border-2 border-white/30 rounded-full flex items-start justify-center p-2 shadow-lg shadow-black/40"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.6)" }}
              >
                <motion.div
                  animate={{ y: [0, 14, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(0,0,0,0.6)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

