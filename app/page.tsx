"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone, Scale, Award, Users, Clock, Shield, BookOpen, Briefcase, CheckCircle2, Star, Mail, TrendingUp, Target, Zap } from "lucide-react"
import { useRef } from "react"

export default function Home() {
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
  const areasAtuacao = [
    {
      icon: Briefcase,
      title: "Direito Empresarial",
      description: "Consultoria jurídica completa para empresas, contratos e governança corporativa."
    },
    {
      icon: Users,
      title: "Direito Civil",
      description: "Soluções em contratos, responsabilidade civil e direito de família."
    },
    {
      icon: Scale,
      title: "Direito Trabalhista",
      description: "Defesa de direitos trabalhistas e assessoria para empresas."
    },
    {
      icon: Shield,
      title: "Direito do Consumidor",
      description: "Proteção dos seus direitos como consumidor com atuação estratégica."
    }
  ]

  const diferenciais = [
    { icon: Award, text: "Mais de 15 anos de experiência" },
    { icon: Users, text: "Atendimento personalizado" },
    { icon: CheckCircle2, text: "Resultados comprovados" },
    { icon: Star, text: "Excelência reconhecida" }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-x-hidden">

      {/* HERO SECTION - Ultra Premium com Parallax */}
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
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/20 backdrop-blur-xl border border-amber-500/30 rounded-full mb-8 shadow-2xl shadow-amber-500/20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Scale className="w-5 h-5 text-amber-400" />
              </motion.div>
              <span className="text-amber-400 text-sm font-bold tracking-wider">OAB/SP 123.456 • ADVOCACIA PREMIUM</span>
            </motion.div>

            {/* Título Principal com Gradient Animado */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="block text-white mb-2">Advocacia de</span>
              <motion.span
                className="block bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent"
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
              className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Soluções jurídicas estratégicas de <span className="text-amber-400 font-semibold">alto padrão</span> com atendimento personalizado e resultados extraordinários há mais de 15 anos
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
                  className="relative group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 transition-all duration-500 overflow-hidden"
                >
                  <Link href="/contato" className="flex items-center relative z-10">
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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
              className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            >
              {diferenciais.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 17 }
                  }}
                  className="group relative flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl hover:border-amber-400/50 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  {/* Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-600/0 group-hover:from-amber-500/10 group-hover:to-amber-600/10 transition-all duration-500" />

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                  >
                    <item.icon className="w-8 h-8 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                  </motion.div>
                  <span className="text-sm md:text-base text-white font-semibold text-center relative z-10">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-white/60 text-sm font-medium">Descubra mais</span>
                <motion.div
                  className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
                >
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 bg-amber-400 rounded-full"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* NÚMEROS IMPRESSIONANTES */}
      <section className="relative py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Resultados que <span className="text-amber-400">Impressionam</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { number: "15+", label: "Anos de Experiência", icon: Award },
                { number: "1000+", label: "Casos de Sucesso", icon: TrendingUp },
                { number: "98%", label: "Taxa de Êxito", icon: Target },
              ].map((stat, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.2 }} whileHover={{ y: -10, scale: 1.05 }} className="relative group">
                  <div className="relative p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:border-amber-400/50 transition-all duration-500">
                    <div className="text-center">
                      <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }} className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mb-6">
                        <stat.icon className="w-8 h-8 text-amber-400" />
                      </motion.div>
                      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 + index * 0.2, type: "spring" }} className="text-6xl md:text-7xl font-bold text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {stat.number}
                      </motion.div>
                      <p className="text-lg text-slate-300 font-medium">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a12_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a12_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-full mb-8 shadow-lg">
                <Briefcase className="w-5 h-5 text-blue-900" />
                <span className="text-blue-900 text-sm font-bold tracking-wider">ÁREAS DE ATUAÇÃO</span>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-4xl md:text-6xl font-bold text-slate-900 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Expertise Jurídica <span className="text-blue-900">Completa</span>
              </motion.h2>

              <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Soluções jurídicas especializadas e personalizadas para proteger seus direitos com excelência
              </motion.p>
            </div>

            {/* Grid de Áreas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {areasAtuacao.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group p-8 bg-white border border-slate-200 rounded-xl hover:border-blue-900 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center group-hover:from-blue-900 group-hover:to-blue-800 transition-all duration-500 shadow-md"
                    >
                      <area.icon className="w-7 h-7 text-blue-900 group-hover:text-white transition-colors duration-500" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {area.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-12"
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-50 px-8 py-6 text-base font-semibold rounded-lg"
              >
                <Link href="/areas-atuacao" className="flex items-center">
                  Ver Todas as Áreas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-900 to-blue-800 relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Scale className="w-16 h-16 text-amber-400 mx-auto mb-6" />

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">
                Precisa de Assessoria Jurídica?
              </h2>

              <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
                Agende uma consulta gratuita e descubra como podemos ajudar você ou sua empresa
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-slate-50 px-8 py-6 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="/contato" className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Falar com Advogado
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-base font-semibold rounded-lg"
                >
                  <Link href="mailto:contato@alexorpheo.com.br" className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Enviar E-mail
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

