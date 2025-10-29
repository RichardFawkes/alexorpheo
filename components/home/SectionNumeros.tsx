"use client"

import { motion } from "framer-motion"
import { Award, TrendingUp, Target } from "lucide-react"

export default function SectionNumeros() {
  return (
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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Resultados que <span className="text-amber-400">Impressionam</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "15+", label: "Anos de Experiência", icon: Award },
              { number: "1000+", label: "Casos de Sucesso", icon: TrendingUp },
              { number: "98%", label: "Taxa de Êxito", icon: Target },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="relative group"
              >
                <div className="relative p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:border-amber-400/50 transition-all duration-500">
                  <div className="text-center">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/20 rounded-2xl mb-6"
                    >
                      <stat.icon className="w-8 h-8 text-amber-400" />
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.2, type: "spring" }}
                      className="text-6xl md:text-7xl font-bold text-white mb-4"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
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
  )
}

