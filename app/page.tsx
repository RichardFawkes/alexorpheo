"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale, Award, Shield, TrendingUp, Briefcase, Building2, Users, ArrowRight, Check, Star, Phone, Mail, MapPin, GraduationCap, FileText, Heart } from "lucide-react"
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

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-6xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 rounded-full mb-8 backdrop-blur-sm"
            >
              <Scale className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-100 tracking-wide">OAB/SP 123.456</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-[1.1] tracking-tight"
            >
              Alex Orpheo
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl text-amber-500 font-serif font-semibold mb-4">
                Advogado Especialista
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto font-light leading-relaxed"
            >
              Excelência jurídica com{" "}
              <span className="text-white font-semibold">atendimento humanizado</span>
              {" "}e soluções estratégicas personalizadas para{" "}
              <span className="text-amber-400">proteger seus direitos</span>
              {" "}e alcançar os melhores resultados
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 text-base px-10 py-7 rounded-full font-semibold shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105"
              >
                <Link href="/contato">
                  <Phone className="mr-2 h-5 w-5" />
                  Agendar Consultoria Gratuita
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-10 py-7 rounded-full font-semibold border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm transition-all duration-300"
              >
                <Link href="/sobre">
                  Conhecer o Advogado
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: Award, text: "+15 anos de experiência", subtext: "Casos de sucesso" },
                { icon: Users, text: "Atendimento Premium", subtext: "Dedicação exclusiva" },
                { icon: Shield, text: "100% Ético", subtext: "Transparência total" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="flex flex-col items-center gap-3 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-amber-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-semibold text-sm">{item.text}</p>
                    <p className="text-slate-400 text-xs mt-1">{item.subtext}</p>
                  </div>
                </motion.div>
              ))}
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
            className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2 cursor-pointer hover:border-amber-500/50 transition-colors"
          >
            <motion.div className="w-1 h-3 bg-amber-500/70 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Sobre Section */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-slate-900/40 z-10" />
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <Scale className="h-24 w-24 mx-auto mb-4 text-amber-500" />
                    <p className="text-2xl font-serif font-bold">Alex Orpheo</p>
                    <p className="text-slate-300 mt-2">Advogado OAB/SP</p>
                  </div>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-slate-900/20 rounded-full blur-3xl" />
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber-600 font-semibold tracking-wider uppercase text-sm">
                Sobre o Advogado
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 text-slate-900">
                Dedicação e Excelência Jurídica
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                <p>
                  Com mais de <strong className="text-slate-900">15 anos de experiência</strong> na advocacia,
                  Alex Orpheo construiu uma carreira sólida baseada em{" "}
                  <strong className="text-slate-900">ética, competência e resultados</strong>.
                </p>
                <p>
                  Especializado em diversas áreas do direito, oferece um atendimento{" "}
                  <strong className="text-slate-900">personalizado e humanizado</strong>,
                  compreendendo as necessidades únicas de cada cliente e desenvolvendo
                  estratégias jurídicas eficazes.
                </p>
                <p>
                  Sua atuação é pautada pela <strong className="text-slate-900">transparência total</strong> e
                  pelo compromisso inabalável com a defesa dos direitos de seus clientes,
                  sempre buscando as melhores soluções jurídicas.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                {[
                  { icon: GraduationCap, title: "Formação Sólida", desc: "Graduação e especializações" },
                  { icon: Award, title: "+15 Anos", desc: "De experiência prática" },
                  { icon: Heart, title: "Atendimento Humano", desc: "Dedicação personalizada" },
                  { icon: FileText, title: "Casos de Sucesso", desc: "Resultados comprovados" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="h-12 w-12 bg-amber-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 rounded-full px-8 shadow-lg"
                >
                  <Link href="/sobre">
                    Saiba Mais Sobre Mim
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-24 md:py-32 bg-slate-900 text-white">
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
              className="text-amber-500 font-semibold tracking-wider uppercase text-sm"
            >
              Diferenciais
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6"
            >
              Por Que Escolher Este Escritório
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-300 text-lg max-w-2xl mx-auto"
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
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800 group">
                  <CardHeader>
                    <div className="h-14 w-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                      <item.icon className="h-7 w-7 text-amber-500" />
                    </div>
                    <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed text-slate-300">
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
      <section className="py-24 md:py-32 bg-gradient-to-b from-slate-50 to-white">
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
              className="text-amber-600 font-semibold tracking-wider uppercase text-sm"
            >
              Expertise Jurídica
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 text-slate-900"
            >
              Áreas de Atuação
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-600 text-lg max-w-2xl mx-auto"
            >
              Soluções jurídicas especializadas e personalizadas para cada necessidade
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {[
              {
                icon: Briefcase,
                title: "Direito Civil",
                desc: "Contratos, responsabilidade civil, direito de família e sucessões",
                items: ["Contratos", "Família", "Sucessões", "Indenizações"]
              },
              {
                icon: Building2,
                title: "Direito Empresarial",
                desc: "Direito societário, contratos empresariais e consultoria",
                items: ["Societário", "Contratos", "Consultoria", "M&A"]
              },
              {
                icon: Scale,
                title: "Direito Trabalhista",
                desc: "Relações de trabalho, rescisões e litígios trabalhistas",
                items: ["Rescisões", "Litígios", "Consultoria", "Acordos"]
              },
              {
                icon: Shield,
                title: "Direito do Consumidor",
                desc: "Defesa dos direitos do consumidor e relações de consumo",
                items: ["Defesa", "Indenizações", "Contratos", "Recalls"]
              },
              {
                icon: FileText,
                title: "Direito Imobiliário",
                desc: "Compra, venda, locação e regularização de imóveis",
                items: ["Compra/Venda", "Locação", "Regularização", "Usucapião"]
              },
              {
                icon: TrendingUp,
                title: "Direito Previdenciário",
                desc: "Aposentadorias, pensões e benefícios previdenciários",
                items: ["Aposentadoria", "Pensões", "Revisões", "Benefícios"]
              }
            ].map((area, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link href="/areas-atuacao">
                  <Card className="group h-full border-2 border-slate-200 hover:border-amber-500 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-600/5 transition-all duration-300" />
                    <CardHeader className="relative">
                      <div className="h-14 w-14 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-amber-500/20 group-hover:scale-110 transition-all duration-300">
                        <area.icon className="h-7 w-7 text-amber-600" />
                      </div>
                      <CardTitle className="text-xl group-hover:text-amber-600 transition-colors font-serif">
                        {area.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="relative">
                      <CardDescription className="text-base text-slate-600 mb-4">
                        {area.desc}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {area.items.map((item, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 bg-slate-100 text-slate-700 rounded-full group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 rounded-full px-10 py-6 shadow-lg"
            >
              <Link href="/areas-atuacao">
                Ver Todas as Áreas de Atuação
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Depoimentos Section */}
      <section className="py-24 md:py-32 bg-white">
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
              className="text-amber-600 font-semibold tracking-wider uppercase text-sm"
            >
              Depoimentos
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-6 text-slate-900"
            >
              O Que Dizem Nossos Clientes
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-slate-600 text-lg max-w-2xl mx-auto"
            >
              A satisfação dos clientes é nossa maior conquista
            </motion.p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Maria Silva",
                role: "Empresária",
                text: "Profissional extremamente competente e dedicado. Resolveu meu caso com maestria e sempre me manteve informada sobre cada etapa do processo.",
                rating: 5
              },
              {
                name: "João Santos",
                role: "Engenheiro",
                text: "Atendimento excepcional! Alex demonstrou profundo conhecimento jurídico e conseguiu um resultado muito além das minhas expectativas.",
                rating: 5
              },
              {
                name: "Ana Costa",
                role: "Comerciante",
                text: "Recomendo de olhos fechados. Ético, transparente e sempre disponível para esclarecer dúvidas. Um verdadeiro parceiro na defesa dos meus direitos.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full border-2 border-slate-100 hover:border-amber-500/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                  <CardHeader>
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                    <CardDescription className="text-base text-slate-700 leading-relaxed italic">
                      "{testimonial.text}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-full mb-8">
              <Phone className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-100">Consultoria Gratuita</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              Pronto para Defender
              <br className="hidden sm:block" />
              <span className="text-amber-500">Seus Direitos?</span>
            </h2>

            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Agende uma consultoria gratuita e descubra como podemos ajudá-lo
              a alcançar os melhores resultados
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 text-base px-10 py-7 rounded-full font-semibold shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105"
              >
                <Link href="/contato">
                  <Phone className="mr-2 h-5 w-5" />
                  Agendar Consultoria Gratuita
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-10 py-7 rounded-full font-semibold border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 backdrop-blur-sm"
              >
                <Link href="tel:+5511999999999">
                  <Phone className="mr-2 h-5 w-5" />
                  (11) 99999-9999
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-8 justify-center text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-amber-500" />
                <span className="text-sm">contato@alexorpheo.adv.br</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-500" />
                <span className="text-sm">São Paulo - SP</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
