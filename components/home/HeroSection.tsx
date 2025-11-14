"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone, Scale, Award, Users, CheckCircle2, Star } from "lucide-react"
import { useRef } from "react"

const diferenciais = [
  { icon: Award, text: "Mais de 15 anos de experiência" },
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
      {/* Background Image com Parallax */}
      <motion.div
        style={{ y: smoothY, scale: smoothScale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
          alt="Escritório de Advocacia"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Gradiente Sofisticado */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/98 via-slate-900/95 to-blue-950/90" />

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        {/* Luxury Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf2412_1px,transparent_1px),linear-gradient(to_bottom,#fbbf2412_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      </motion.div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 z-[1]">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          style={{
            backgroundSize: "200% 200%",
          }}
        />
      </div>

      <motion.div
        style={{ opacity: smoothOpacity }}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="max-w-5xl mx-auto text-center">

          {/* Premium Badge com Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-xl border border-amber-500/40 rounded-full mb-12 shadow-2xl shadow-amber-500/30"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Scale className="w-5 h-5 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
            </motion.div>
            <span className="text-amber-400 text-sm md:text-base font-bold tracking-wider drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">OAB/SP 123.456 • ADVOCACIA PREMIUM</span>
          </motion.div>

          {/* Título Principal com Gradient Animado */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-10 leading-[1.1]"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="block text-white mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">Advocacia de</span>
            <motion.span
              className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: "200% auto",
              }}
            >
              Excelência Absoluta
            </motion.span>
          </motion.h1>

          {/* Subtítulo Elegante */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-slate-300/90 mb-16 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Soluções jurídicas estratégicas de <span className="text-amber-400 font-semibold drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]">alto padrão</span> com atendimento personalizado e resultados extraordinários há mais de 15 anos
          </motion.p>

          {/* CTAs Premium */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                asChild
                size="lg"
                className="relative group from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 transition-all duration-500 overflow-hidden"
              >
                <Link href="/contato" className="flex items-center relative z-10">
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0  from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1
                    }}
                  />
                  <Phone className="mr-3 h-6 w-6" />
                  Agendar Consulta Exclusiva
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="relative group border-2 border-amber-400/50 text-white hover:bg-amber-400/10 backdrop-blur-xl px-10 py-7 text-lg font-bold rounded-xl transition-all duration-500 shadow-xl shadow-amber-500/20"
              >
                <Link href="/sobre" className="flex items-center">
                  Conheça o Escritório
                  <motion.div
                    className="ml-3"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats Premium */}
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
                  y: -12,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                className="group relative flex flex-col items-center gap-4 p-8 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl hover:border-amber-400/60 hover:shadow-amber-500/20 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-600/0 group-hover:from-amber-500/20 group-hover:to-amber-600/10 transition-all duration-500" />

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <item.icon className="w-10 h-10 md:w-12 md:h-12 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]" />
                </motion.div>
                <span className="text-sm md:text-base text-white font-semibold text-center relative z-10 leading-snug">{item.text}</span>
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
              <span className="text-white/70 text-sm font-medium tracking-wider">Descubra mais</span>
              <motion.div
                className="w-7 h-11 border-2 border-amber-400/60 rounded-full flex items-start justify-center p-2 shadow-lg shadow-amber-400/20"
                whileHover={{ scale: 1.1, borderColor: "rgba(251, 191, 36, 0.8)" }}
              >
                <motion.div
                  animate={{ y: [0, 14, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

