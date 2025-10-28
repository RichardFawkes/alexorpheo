"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Award, Shield, TrendingUp, Briefcase, Building2, Users, ArrowRight, Check, Star } from "lucide-react"
import { motion } from "framer-motion"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-secondary/95 to-secondary/90">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8"
            >
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-white">Advocacia de Excelência</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight"
            >
              Alex Orpheo
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 max-w-3xl mx-auto font-light"
            >
              Soluções jurídicas estratégicas e personalizadas
              <br className="hidden md:block" />
              para clientes que exigem{" "}
              <span className="text-primary font-semibold">o melhor</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 rounded-full font-semibold shadow-2xl shadow-primary/50"
              >
                <Link href="/contato">
                  Agendar Consultoria
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-8 py-6 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white/10"
              >
                <Link href="/sobre">Conhecer o Escritório</Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-8 justify-center mt-16 text-white/80"
            >
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm">+15 anos de experiência</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm">Atendimento personalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm">Resultados comprovados</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-3 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Valores Section */}
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-primary font-semibold tracking-wider uppercase text-sm"
            >
              Por que escolher
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6"
            >
              Advocacia de Alto Padrão
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Comprometimento absoluto com a excelência e resultados que superam expectativas
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Award,
                title: "Experiência Comprovada",
                description: "Mais de 15 anos de atuação com casos de sucesso nas mais diversas áreas do direito."
              },
              {
                icon: Users,
                title: "Atendimento Premium",
                description: "Cada cliente recebe atenção exclusiva e estratégias personalizadas para seu caso."
              },
              {
                icon: Shield,
                title: "Ética e Transparência",
                description: "Atuação pautada nos mais altos padrões éticos e com total transparência."
              },
              {
                icon: TrendingUp,
                title: "Resultados Excepcionais",
                description: "Foco em soluções estratégicas que atendam e superem os objetivos dos clientes."
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                  <CardHeader>
                    <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Áreas de Atuação Preview */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeInUp}
              className="text-primary font-semibold tracking-wider uppercase text-sm"
            >
              Expertise Jurídica
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6"
            >
              Áreas de Atuação
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Soluções especializadas em diversas áreas do direito
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: Briefcase, title: "Direito Civil", desc: "Contratos, responsabilidade civil e sucessões" },
              { icon: Building2, title: "Direito Empresarial", desc: "Societário, contratos e M&A" },
              { icon: Scale, title: "Direito Trabalhista", desc: "Relações de trabalho e litígios" }
            ].map((area, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group h-full border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer bg-card">
                  <CardHeader>
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <area.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {area.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {area.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/areas-atuacao">
                Ver Todas as Áreas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 md:py-32 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Pronto para Defender
              <br className="hidden sm:block" />
              Seus Direitos?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Entre em contato e agende uma consultoria personalizada
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-10 py-6 rounded-full font-semibold shadow-2xl shadow-primary/30"
            >
              <Link href="/contato">
                Falar com Especialista
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
