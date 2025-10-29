import Link from "next/link"
import { Scale, Mail, Phone, MapPin, Linkedin, Instagram, Facebook, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Fique por Dentro das Novidades Jurídicas
            </h3>
            <p className="text-slate-400 mb-6">
              Receba artigos, dicas e atualizações sobre direito diretamente no seu e-mail
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-900"
              />
              <Button className="bg-blue-900 text-white hover:bg-blue-800 rounded-lg px-8">
                Inscrever-se
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo e Descrição */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="h-12 w-12 bg-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-800 transition-colors duration-300">
                <Scale className="h-7 w-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-tight text-white">
                  Alex Orpheo
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  OAB/SP 123.456
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Advocacia com excelência, ética e comprometimento absoluto com os melhores resultados para nossos clientes.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-900 hover:text-white transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">Links Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: "Início", href: "/" },
                { name: "Sobre", href: "/sobre" },
                { name: "Áreas de Atuação", href: "/areas-atuacao" },
                { name: "Artigos", href: "/artigos" },
                { name: "Contato", href: "/contato" }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-amber-500 transition-colors text-sm flex items-center group"
                  >
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Áreas de Atuação */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">Áreas de Atuação</h3>
            <ul className="space-y-3 text-sm">
              {[
                "Direito Civil",
                "Direito Empresarial",
                "Direito Trabalhista",
                "Direito do Consumidor",
                "Direito Imobiliário",
                "Direito Previdenciário"
              ].map((area) => (
                <li key={area} className="text-slate-400 hover:text-amber-500 transition-colors cursor-pointer">
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 group">
                <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <MapPin className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Av. Paulista, 1000<br />
                    São Paulo - SP<br />
                    CEP 01310-100
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Phone className="h-5 w-5 text-amber-500" />
                </div>
                <a href="tel:+5511999999999" className="text-sm text-slate-400 hover:text-amber-500 transition-colors">
                  (11) 99999-9999
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="h-5 w-5 text-amber-500" />
                </div>
                <a href="mailto:contato@alexorpheo.adv.br" className="text-sm text-slate-400 hover:text-amber-500 transition-colors">
                  contato@alexorpheo.adv.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} Alex Orpheo - Advocacia. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-slate-400">
              <Link href="/privacidade" className="hover:text-amber-500 transition-colors">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="hover:text-amber-500 transition-colors">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
