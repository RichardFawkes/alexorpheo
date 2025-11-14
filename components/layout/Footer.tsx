import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Linkedin, Instagram, Facebook, ArrowRight, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SITE_CONFIG, obterRedesSociaisAtivas } from "@/lib/constants/site-config"

export default function Footer() {
  const redesSociaisAtivas = obterRedesSociaisAtivas()

  const getIconeRedeSocial = (nome: string) => {
    const icones: Record<string, React.ReactNode> = {
      instagram: <Instagram className="h-5 w-5" />,
      facebook: <Facebook className="h-5 w-5" />,
      linkedin: <Linkedin className="h-5 w-5" />,
      youtube: <Youtube className="h-5 w-5" />,
    }
    return icones[nome] || null
  }

  return (
    <footer className="bg-slate-900 text-slate-200 ">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800 ">
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
                className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <Button className="bg-gradient-to-r from-amber-600 to-amber-700 text-white hover:from-amber-700 hover:to-amber-800 rounded-lg px-8 shadow-lg shadow-amber-600/20">
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
            <Link href="/" className="flex items-center group">
              <div className="relative h-10 w-auto">
                <Image
                  src="/logo.avif"
                  alt="Alex Orpheo - Advocacia"
                  width={200}
                  height={50}
                  className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80 brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {SITE_CONFIG.mensagens.rodape}
            </p>
            <div className="flex space-x-3">
              {redesSociaisAtivas.map((rede) => (
                <a
                  key={rede.nome}
                  href={rede.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-white transition-all duration-300"
                  aria-label={`Visite nosso ${rede.nome}`}
                >
                  {getIconeRedeSocial(rede.nome)}
                </a>
              ))}
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
                    {SITE_CONFIG.contato.endereco.logradouro}<br />
                    {SITE_CONFIG.contato.endereco.bairro} - {SITE_CONFIG.contato.endereco.cidade}/{SITE_CONFIG.contato.endereco.estado}<br />
                    CEP {SITE_CONFIG.contato.endereco.cep}
                  </p>
                </div>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Phone className="h-5 w-5 text-amber-500" />
                </div>
                <a
                  href={`tel:+55${SITE_CONFIG.contato.telefone.principal.replace(/\D/g, '')}`}
                  className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {SITE_CONFIG.contato.telefone.principal}
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                  <Mail className="h-5 w-5 text-amber-500" />
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.contato.email.principal}`}
                  className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {SITE_CONFIG.contato.email.principal}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} {SITE_CONFIG.site.nome}. Todos os direitos reservados.
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
