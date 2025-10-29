"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu, X, Phone, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

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
    { name: "Contato", href: "/contato" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-x-hidden ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-amber-900/20"
          : "bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-transparent backdrop-blur-md"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative">
            <div className="relative h-10 md:h-14 w-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Image
                src="/logo.avif"
                alt="Alex Orpheo - Advocacia"
                width={280}
                height={70}
                className="h-10 md:h-14 w-auto object-contain transition-all duration-500 group-hover:scale-105 relative z-10 drop-shadow-[0_0_15px_rgba(184,134,11,0.3)]"
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
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_0_8px_rgba(251,191,36,0.6)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Button
              asChild
              className="relative group bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 rounded-xl px-6 py-2.5 shadow-lg shadow-amber-600/30 hover:shadow-xl hover:shadow-amber-600/50 transition-all duration-300 overflow-hidden"
            >
              <Link href="/contato" className="flex items-center relative z-10">
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                <Phone className="mr-2 h-4 w-4" />
                Agendar Consulta
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-amber-500/10 border border-amber-500/20 transition-all duration-300"
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
              <div className="py-8 px-4 border-t border-amber-900/20 bg-gradient-to-b from-slate-950/98 to-slate-900/98 backdrop-blur-xl">
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
                        className="group flex items-center justify-between py-4 px-4 rounded-xl text-base font-semibold text-slate-200 hover:text-amber-400 transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-500/10 hover:to-transparent border border-transparent hover:border-amber-500/20"
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
                    className="w-full relative group bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 rounded-xl py-7 text-base font-bold shadow-xl shadow-amber-600/40 hover:shadow-2xl hover:shadow-amber-600/60 transition-all duration-300 overflow-hidden"
                  >
                    <Link href="/contato" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center relative z-10">
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
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
                  className="mt-8 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"
                />

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="mt-6 text-center"
                >
                  <p className="text-xs text-slate-400 mb-1">Atendimento Premium</p>
                  <p className="text-sm text-amber-400 font-semibold">OAB/SP 123.456</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
