import Link from "next/link"
import { Scale, Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-white">
                  Dr. João Silva
                </span>
                <span className="text-xs text-slate-400">OAB/SP 123.456</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400">
              Advocacia com excelência, ética e comprometimento com os melhores resultados.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre" className="text-slate-400 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/areas-atuacao" className="text-slate-400 hover:text-white transition-colors">
                  Áreas de Atuação
                </Link>
              </li>
              <li>
                <Link href="/artigos" className="text-slate-400 hover:text-white transition-colors">
                  Artigos
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-slate-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Áreas de Atuação */}
          <div>
            <h3 className="font-semibold text-white mb-4">Áreas de Atuação</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-slate-400">Direito Civil</li>
              <li className="text-slate-400">Direito Trabalhista</li>
              <li className="text-slate-400">Direito Empresarial</li>
              <li className="text-slate-400">Direito Imobiliário</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">
                  Av. Paulista, 1000 - São Paulo, SP
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-slate-400">(11) 98765-4321</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-slate-400">contato@joaosilva.adv.br</span>
              </li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Dr. João Silva - Advocacia. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
