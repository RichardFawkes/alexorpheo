"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants/site-config"

export default function WhatsAppButton() {
  const phoneNumber = SITE_CONFIG.contato.telefone.whatsapp
  const message = SITE_CONFIG.mensagens.whatsapp

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  }

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 flex items-center justify-center transition-all duration-300 group"
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 group-hover:rotate-12 transition-transform duration-300" />

      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
    </motion.button>
  )
}

