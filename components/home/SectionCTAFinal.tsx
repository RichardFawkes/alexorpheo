"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Scale, Phone, Mail } from "lucide-react"

export default function SectionCTAFinal() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br relative overflow-hidden bg-[#002640]">
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
            <Scale className="w-16 h-16 text-[#d9b060] mx-auto mb-6" />

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
  )
}

