"use client"

import { Metadata } from "next";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Award, Briefcase, GraduationCap, Scale, Target, Users, Heart, Shield, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/constants/site-config";
import { Button } from "@/components/ui/button";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function SobrePage() {
  return (
    <div className="flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <Image
            src="/banner.jpeg"
            alt="Escritório de Advocacia"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className=" text-white inline-block mb-6 px-4 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-full backdrop-blur-sm">
              <span className="text-gold-400 text-white text-sm font-semibold tracking-wider uppercase">{SITE_CONFIG.advogado.oab}</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 font-serif text-white tracking-tight">
              {SITE_CONFIG.advogado.nome}
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-300 mb-4 font-light">
              {SITE_CONFIG.advogado.formacao}
            </motion.p>

            <motion.p variants={fadeInUp} className="text-lg text-gold-400 font-medium mb-12 uppercase tracking-widest">
              {SITE_CONFIG.advogado.titulo}
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <CheckCircle className="h-5 w-5 text-gold-500" />
                <span>{SITE_CONFIG.site.anosExperiencia}+ anos de experiência</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <CheckCircle className="h-5 w-5 text-gold-500" />
                <span>Especialista em Direito do Trabalho</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <CheckCircle className="h-5 w-5 text-gold-500" />
                <span>Atendimento em {SITE_CONFIG.contato.endereco.cidade}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 sticky top-24"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gold-500 rounded-2xl rotate-3 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                  <Image
                    src="/foto-advogado.png"
                    alt={SITE_CONFIG.advogado.nome}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 hidden md:block">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-slate-900 font-serif mb-1">{SITE_CONFIG.site.anosExperiencia}+</div>
                    <div className="text-sm text-slate-500 font-medium uppercase tracking-wider">Anos de<br />Experiência</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content Column */}
            <div className="lg:col-span-7 lg:pl-12 space-y-10">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-8 font-serif text-slate-900 leading-tight">
                  Um Novo Conceito em <span className="text-gold-600 italic">Advocacia Moderna</span>
                </motion.h2>

                <motion.div variants={fadeInUp} className="prose prose-lg prose-slate text-slate-600 leading-relaxed space-y-6">
                  <p>
                    <strong className="text-slate-900">Orpheo Advocacia</strong> redefine a consultoria jurídica ao unir tradição e inovação. Nossa equipe multidisciplinar não apenas resolve problemas, mas antecipa cenários para oferecer segurança jurídica integral aos nossos clientes.
                  </p>
                  <p>
                    Acreditamos que a advocacia moderna exige mais do que conhecimento técnico; exige <span className="text-gold-600 font-medium">agilidade, clareza e estratégia</span>. Atuamos tanto no contencioso quanto na consultoria preventiva, sempre focados na eficiência e na redução de riscos.
                  </p>
                  <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-gold-500 my-8">
                    <p className="italic text-slate-700 m-0">
                      "Nossa missão é transformar a complexidade jurídica em soluções claras e resultados efetivos para empresas e indivíduos."
                    </p>
                  </div>
                  <p>
                    Com destaque no <strong>Direito do Trabalho</strong>, protegemos direitos fundamentais e auxiliamos empresas na gestão humanizada e legal de suas equipes. Nossa atuação se estende à assessoria empresarial completa, garantindo sustentabilidade jurídica para o seu negócio.
                  </p>
                </motion.div>
              </motion.div>

              {/* Credentials Cards */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
              >
                <motion.div variants={fadeInUp} className="group p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-gold-200 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Formação Acadêmica</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{SITE_CONFIG.advogado.formacao}</p>
                </motion.div>

                <motion.div variants={fadeInUp} className="group p-6 bg-slate-50 rounded-xl border border-slate-100 hover:border-gold-200 hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Award className="h-6 w-6 text-gold-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Qualificação</h3>
                  <p className="text-slate-600 text-sm">{SITE_CONFIG.advogado.titulo}</p>
                  <p className="text-slate-400 text-xs mt-1 font-mono">{SITE_CONFIG.advogado.oab}</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentials Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')] bg-cover bg-center opacity-5 fixed-background"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold-400 text-sm font-bold tracking-widest uppercase mb-4 block"
            >
              Nossos Pilares
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold mb-6 font-serif"
            >
              Por que escolher a <span className="text-gold-400">Orpheo Advocacia?</span>
            </motion.h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Scale, title: "Ética e Integridade", desc: "Transparência absoluta em todas as etapas do processo jurídico." },
              { icon: Target, title: "Foco em Resultados", desc: "Estratégias personalizadas para maximizar as chances de êxito." },
              { icon: Heart, title: "Atendimento Humanizado", desc: "Acolhimento e escuta ativa para entender suas reais necessidades." },
              { icon: Shield, title: "Segurança Jurídica", desc: "Proteção patrimonial e pessoal através de medidas preventivas." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-gold-500/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-slate-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold-500 transition-colors duration-300">
                  <item.icon className="h-7 w-7 text-gold-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-100 font-serif">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expertise Summary */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-slate-900">
                Excelência em Diversas Áreas
              </h2>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Nossa atuação é pautada pela especialização contínua. Cada área do direito possui particularidades que exigem conhecimento profundo e atualização constante.
              </p>
              <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8">
                <a href="/areas-atuacao" className="flex items-center">
                  Conhecer todas as áreas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-6"
            >
              {[
                { title: "Direito Trabalhista", desc: "Defesa dos direitos do trabalhador e compliance trabalhista para empresas.", icon: Briefcase },
                { title: "Direito Cível", desc: "Soluções para conflitos civis, contratos e responsabilidade civil.", icon: Scale },
                { title: "Direito Criminal", desc: "Defesa técnica especializada em processos criminais e inquéritos.", icon: Shield }
              ].map((area, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                >
                  <div className="shrink-0 w-12 h-12 bg-gold-50 rounded-full flex items-center justify-center">
                    <area.icon className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{area.title}</h3>
                    <p className="text-slate-600 text-sm">{area.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gold-500 to-gold-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-8 font-serif"
          >
            Vamos conversar sobre o seu caso?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-gold-600 hover:bg-slate-50 border-0 text-lg px-8 py-6 h-auto rounded-xl shadow-xl"
            >
              <a
                href={`https://wa.me/${SITE_CONFIG.contato.telefone.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.mensagens.whatsapp)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Users className="h-5 w-5 mr-2" />
                Agendar Consulta
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-white  hover:bg-white/10 text-lg px-8 py-6 h-auto rounded-xl"
            >
              <a href="/contato">
                Enviar E-mail
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
