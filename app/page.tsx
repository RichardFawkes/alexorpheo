"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Phone, Scale, Award, Users, Clock, Shield, BookOpen, Briefcase, CheckCircle2, Star, Mail } from "lucide-react"

export default function Home() {
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
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">

      {/* HERO SECTION - Com Imagem de Fundo */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image com Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070"
            alt="Escritório de Advocacia"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/70" />
          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.05]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            {/* Badge Profissional */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
            >
              <Scale className="w-4 h-4 text-amber-400" />
              <span className="text-white text-sm font-semibold">OAB/SP 123.456</span>
            </motion.div>

            {/* Título Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Advocacia de <span className="text-amber-400">Excelência</span> e Confiança
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Soluções jurídicas estratégicas com atendimento personalizado e resultados comprovados há mais de 15 anos
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-6 text-base font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <Link href="/contato" className="flex items-center">
                    <Phone className="mr-2 h-5 w-5" />
                    Agendar Consulta Gratuita
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-base font-semibold rounded-lg transition-all duration-300"
                >
                  <Link href="/sobre" className="flex items-center">
                    Conheça o Escritório
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Diferenciais */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {diferenciais.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center gap-2 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300"
                >
                  <item.icon className="w-6 h-6 text-amber-400" />
                  <span className="text-xs md:text-sm text-white font-medium text-center">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ÁREAS DE ATUAÇÃO */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full mb-6"
              >
                <BookOpen className="w-4 h-4 text-blue-900" />
                <span className="text-blue-900 text-sm font-semibold">ÁREAS DE ATUAÇÃO</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 font-serif"
              >
                Expertise Jurídica Completa
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-slate-600 max-w-2xl mx-auto"
              >
                Atuação estratégica em diversas áreas do direito com foco em resultados
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

