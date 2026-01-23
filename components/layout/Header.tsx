"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Phone, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { SITE_CONFIG } from "@/lib/constants/site-config"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "Áreas de Atuação", href: "/areas-atuacao" },
    { name: "Artigos", href: "/artigos" },
    { name: "Notícias", href: "/noticias" },
    { name: "Contato", href: "/contato" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/5 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md shadow-2xl h-16 md:h-20"
          : "bg-transparent backdrop-blur-sm h-20 md:h-24"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 md:h-12 w-48 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo-nova.png"
                alt="Orpheo Advocacia"
                width={200}
                height={80}
                className="h-full w-auto object-contain brightness-[1.1]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors duration-300 rounded-full hover:bg-white/5 group overflow-hidden"
              >
                <span className="relative z-10">{item.name}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-gold-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </Link>
            ))}
            <div className="pl-4 ml-4 border-l border-white/10">
              <Button
                asChild
                className="bg-[#D9B060] hover:bg-[#C5A059] text-slate-950 font-bold rounded-full px-6 shadow-[0_0_15px_rgba(217,176,96,0.4)] hover:shadow-[0_0_25px_rgba(217,176,96,0.6)] transition-all duration-300"
              >
                <Link href="/contato" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>Agendar Consulta</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-gold-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-gold-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
          </button>
        </div>

        {/* Mobile Navigation - Premium 2026 */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
              style={{ height: "calc(100vh - 100%)" }}
            >
              <div className="flex flex-col h-full p-6 overflow-y-auto">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-1 mt-8">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between p-4 rounded-2xl text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="group-hover:translate-x-2 transition-transform duration-300">{item.name}</span>
                        <ChevronRight className="w-5 h-5 text-gold-500 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto mb-24 space-y-6">
                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <Button
                      asChild
                      className="w-full bg-[#D9B060] hover:bg-[#C5A059] text-slate-950 rounded-2xl py-6 text-lg font-bold shadow-[0_0_20px_rgba(217,176,96,0.3)] hover:shadow-[0_0_30px_rgba(217,176,96,0.5)] transition-all duration-300 border border-gold-400/20"
                    >
                      <Link href="/contato" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-3">
                        <Phone className="h-5 w-5" />
                        Agendar Consulta
                      </Link>
                    </Button>
                  </motion.div>

                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="text-center space-y-2"
                  >
                    <div className="w-12 h-1 bg-gold-500/30 mx-auto rounded-full mb-4" />
                    <p className="text-xs text-slate-400 uppercase tracking-widest">Atendimento Premium</p>
                    <p className="text-sm text-gold-400 font-semibold tracking-wider">{SITE_CONFIG.advogado.oab}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
