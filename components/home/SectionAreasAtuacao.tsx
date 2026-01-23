"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Briefcase, Users, Scale, Shield, ShoppingCart, Building2 } from "lucide-react"
import { AREAS_ATUACAO } from "@/lib/constants/areas-atuacao"

const iconMap: Record<string, any> = {
  Briefcase,
  Users,
  Scale,
  Shield,
  ShoppingCart,
  Building: Building2,
}

export default function SectionAreasAtuacao() {
  // Selecionamos as 6 principais áreas para exibir na home
  const displayAreas = AREAS_ATUACAO.slice(0, 6)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-slate-900/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 text-amber-600 text-sm font-semibold tracking-wider mb-4 border border-amber-500/20">
              NOSSAS EXPERTISES
            </span>
            <h2 
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Atuação Jurídica de <span className="text-amber-600 italic">Excelência</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Combinamos conhecimento técnico aprofundado com uma abordagem estratégica para oferecer soluções jurídicas que protegem seus interesses e garantem seus direitos.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {displayAreas.map((area) => {
            const IconComponent = iconMap[area.icone] || Scale

            return (
              <motion.div
                key={area.id}
                variants={item}
                className="group relative bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-amber-500/30 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300 transform group-hover:scale-110">
                  <IconComponent className="w-24 h-24 text-amber-900" />
                </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <IconComponent className="w-7 h-7 text-slate-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <h3 
                    className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {area.titulo}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                    {area.descricao}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {area.servicos.slice(0, 3).map((servico, idx) => (
                      <span key={idx} className="text-xs py-1 px-2 bg-slate-50 text-slate-600 rounded-md border border-slate-100">
                        {servico}
                      </span>
                    ))}
                    {area.servicos.length > 3 && (
                      <span className="text-xs py-1 px-2 text-slate-400">
                        +{area.servicos.length - 3}
                      </span>
                    )}
                  </div>

                  <Link 
                    href={`/areas-atuacao#${area.slug}`} 
                    className="inline-flex items-center text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors group/link"
                  >
                    Saiba mais
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Button
            asChild
            size="lg"
            className="bg-slate-900 text-white hover:bg-slate-800 px-10 py-6 text-base rounded-full shadow-lg hover:shadow-slate-900/20 transition-all duration-300"
          >
            <Link href="/areas-atuacao">
              Ver Todas as Áreas de Atuação
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
