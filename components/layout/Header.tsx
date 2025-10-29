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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-x-hidden ${
        isScrolled
          ? "bg-slate-950/98 backdrop-blur-xl shadow-2xl border-b border-slate-800/50"
          : "bg-slate-950/95 backdrop-blur-lg border-b border-slate-800/30"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative h-10 md:h-12 w-auto">
              <Image
                src="/logo.avif"
                alt="Alex Orpheo - Advocacia"
                width={250}
                height={60}
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-slate-200 hover:text-amber-400 transition-all duration-300 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Button
              asChild
              className="bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 rounded-lg px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link href="/contato" className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                Agendar Consulta
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50 border border-slate-700/50 transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-amber-400" />
            ) : (
              <Menu className="h-6 w-6 text-amber-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Premium */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-8 px-4 border-t border-slate-800/50 bg-slate-950/98 backdrop-blur-xl">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-2 mb-8">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between py-4 px-4 rounded-xl text-base font-semibold text-slate-200 hover:text-amber-400 transition-all duration-300 hover:bg-slate-800/30 border border-transparent hover:border-slate-700/50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 rounded-xl py-7 text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Link href="/contato" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center">
                      <Phone className="mr-2 h-5 w-5" />
                      Agendar Consulta
                    </Link>
                  </Button>
                </motion.div>

                {/* Decorative Line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-8 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"
                />

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="mt-6 text-center"
                >
                  <p className="text-xs text-slate-400 mb-1">Atendimento Premium</p>
                  <p className="text-sm text-amber-400 font-semibold">{SITE_CONFIG.advogado.oab}</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
