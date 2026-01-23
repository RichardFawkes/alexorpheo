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
          className="object-cover object-[25%_50%] md:object-[60%_50%]"
          priority
        />
        {/* Overlay removido para clarear a imagem */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-slate-950/88" /> */}
      </motion.div>

      <motion.div
        style={{ opacity: smoothOpacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Conteúdo textual removido para visual mais limpo conforme solicitado */}
        </div>
      </motion.div>
    </section>
  )
}

