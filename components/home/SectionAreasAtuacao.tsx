"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Users, Scale, Shield, ShoppingCart, Building2, ChevronRight, Plus } from "lucide-react"
import { AREAS_ATUACAO, TAreaAtuacao } from "@/lib/constants/areas-atuacao"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

const iconMap: Record<string, any> = {
  Briefcase,
  Users,
  Scale,
  Shield,
  ShoppingCart,
  Building: Building2,
}

export default function SectionAreasAtuacao() {
  const [areas, setAreas] = useState<TAreaAtuacao[]>(AREAS_ATUACAO)

  useEffect(() => {
    let mounted = true
    fetch("/api/practice-areas", { cache: "force-cache" })
      .then(res => res.ok ? res.json() : AREAS_ATUACAO)
      .then((data) => {
        if (!mounted) return
        const arr = Array.isArray(data) && data.length ? data : AREAS_ATUACAO
        setAreas(arr)
      })
      .catch(() => {
        if (!mounted) return
        setAreas(AREAS_ATUACAO)
      })
    return () => { mounted = false }
  }, [])

  const displayAreas = areas.slice(0, 6)

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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(217,176,96,0.08)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(30,41,59,0.05)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-12 bg-gold-400/50" />
              <span className="text-gold-600 text-xs font-bold tracking-[0.2em] uppercase">
                Nossas Expertises
              </span>
              <span className="h-px w-12 bg-gold-400/50" />
            </div>

            <h2
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Atuação Jurídica de <span className="text-gold-600 italic">Excelência</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
              Combinamos conhecimento técnico aprofundado com uma abordagem estratégica para oferecer soluções que protegem seus interesses.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {displayAreas.map((area) => {
            const IconComponent = iconMap[area.icone] || Scale
            // Display only first 3 services tags to keep it clean
            const visibleServices = area.servicos.slice(0, 3)
            const remainingCount = Math.max(0, area.servicos.length - 3)

            return (
              <motion.div
                key={area.id}
                variants={item}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group relative bg-white rounded-2xl p-8 lg:p-10 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(217,176,96,0.15)] transition-all duration-500 border border-slate-100 hover:border-gold-200 flex flex-col h-full"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                {/* Floating Large Icon (Watermark) */}
                <div className="absolute top-4 right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-12 pointer-events-none">
                  <IconComponent className="w-32 h-32 text-slate-900" />
                </div>

                {/* Header */}
                <div className="relative z-10 mb-8">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-gold-500/30 group-hover:-translate-y-1">
                    <IconComponent className="w-8 h-8 text-slate-700 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                  </div>

                  <h3
                    className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-gold-700 transition-colors duration-300"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {area.titulo}
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-sm font-light border-l-2 border-gold-200/50 pl-4">
                    {area.descricao}
                  </p>
                </div>

                {/* Tags */}
                <div className="relative z-10 mt-auto space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {visibleServices.map((servico, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 text-xs font-medium text-slate-600 border border-slate-100 group-hover:border-gold-200/50 group-hover:bg-white transition-colors duration-300"
                      >
                        {servico}
                      </span>
                    ))}
                    {remainingCount > 0 && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-50 text-xs font-medium text-gold-600 border border-dashed border-gold-300">
                        <Plus className="w-3 h-3 mr-1" />
                        {remainingCount}
                      </span>
                    )}
                  </div>

                  {/* Action Link */}
                  <div className="pt-6 border-t border-slate-100 group-hover:border-gold-100 transition-colors duration-300">

                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link href="/areas-atuacao">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 border-slate-200 text-slate-600 hover:text-gold-700 hover:border-gold-300 hover:bg-gold-50 transition-all duration-300"
            >
              Ver Todas as Áreas
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
