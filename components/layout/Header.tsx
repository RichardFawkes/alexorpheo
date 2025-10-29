"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Scale, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-hidden ${
        isScrolled
          ? "bg-white shadow-md border-b border-slate-200"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-800 transition-colors duration-300">
              <Scale className="h-5 w-5 md:h-7 md:w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-base md:text-xl leading-tight text-slate-900 group-hover:text-blue-900 transition-colors">
                Alex Orpheo
              </span>
              <span className="text-[10px] md:text-xs text-slate-600 font-medium">
                Advogado • OAB/SP 123.456
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-900 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Button
              asChild
              className="bg-blue-900 text-white hover:bg-blue-800 rounded-lg px-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Link href="/contato">
                <Phone className="mr-2 h-4 w-4" />
                Agendar Consulta
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-900" />
            ) : (
              <Menu className="h-6 w-6 text-slate-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-slate-200 bg-white">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-semibold text-slate-700 hover:text-blue-900 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                asChild
                className="w-full bg-blue-900 text-white hover:bg-blue-800 rounded-lg py-6 shadow-md mt-4"
              >
                <Link href="/contato" onClick={() => setIsMenuOpen(false)}>
                  <Phone className="mr-2 h-4 w-4" />
                  Agendar Consulta
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
