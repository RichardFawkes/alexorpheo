"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Briefcase, Users, Scale, Shield } from "lucide-react"

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

export default function SectionAreasAtuacao() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a12_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a12_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-full mb-8 shadow-lg"
            >
              <Briefcase className="w-5 h-5 text-blue-900" />
              <span className="text-blue-900 text-sm font-bold tracking-wider">ÁREAS DE ATUAÇÃO</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Expertise Jurídica <span className="text-blue-900">Completa</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
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
                    <h3
                      className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors duration-300"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
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
  )
}

