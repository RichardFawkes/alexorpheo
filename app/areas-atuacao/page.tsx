import { Metadata } from "next";
import { Briefcase, Users, Building2, ShoppingCart, Scale, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AREAS_ATUACAO } from "@/lib/constants/areas-atuacao";
import { SITE_CONFIG } from "@/lib/constants/site-config";

export const metadata: Metadata = {
  title: `Áreas de Atuação | ${SITE_CONFIG.advogado.nomeExibicao} - Advocacia`,
  description: `Conheça as áreas de atuação do escritório ${SITE_CONFIG.site.nome}. Especialistas em Direito Trabalhista, Cível e Criminal.`,
};

// Mapeamento de ícones
const iconeMap: Record<string, any> = {
  Briefcase,
  Scale,
  Shield,
  Users,
  ShoppingCart,
  Building: Building2,
};



export default function AreasAtuacaoPage() {
  const areasDestaque = AREAS_ATUACAO.filter((area) => area.destaque);
  const outrasAreas = AREAS_ATUACAO.filter((area) => !area.destaque);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full">
              <span className="text-amber-400 text-sm font-semibold">NOSSAS ESPECIALIDADES</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              Áreas de Atuação
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Expertise especializada em diversas áreas do direito para defender seus direitos com excelência
            </p>
          </div>
        </div>
      </section>

      {/* Áreas em Destaque */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif text-slate-900">
              Áreas Principais
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Especialização focada nas áreas mais demandadas, com atendimento de excelência
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {areasDestaque.map((area) => {
              const IconComponent = iconeMap[area.icone] || Briefcase;
              return (
                <Card key={area.id} className="border-2 border-slate-100 hover:border-amber-200 hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="h-16 w-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3">{area.titulo}</CardTitle>
                    <CardDescription className="text-base text-slate-600 leading-relaxed">
                      {area.descricao}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-bold mb-4 text-sm text-slate-900 uppercase tracking-wide">
                      Serviços Oferecidos:
                    </h4>
                    <ul className="space-y-2.5 max-h-64 overflow-y-auto pr-2">
                      {area.servicos.map((servico, idx) => (
                        <li key={idx} className="flex items-start text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{servico}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Outras Áreas */}
      {outrasAreas.length > 0 && (
        <section className="py-20 md:py-28 bg-[#FF5733] from-slate-50 via-white to-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif text-slate-900">
                Outras Áreas de Atuação
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Atendimento completo em diversas áreas do direito
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {outrasAreas.map((area) => {
                const IconComponent = iconeMap[area.icone] || Briefcase;
                return (
                  <Card key={area.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 ">
                    <CardHeader>
                      <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl mb-2">{area.titulo}</CardTitle>
                      <CardDescription className="text-sm text-slate-600">
                        {area.descricao}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {area.servicos.slice(0, 5).map((servico, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-600">
                            <span className="text-blue-500 mr-2">•</span>
                            <span>{servico}</span>
                          </li>
                        ))}
                        {area.servicos.length > 5 && (
                          <li className="text-sm text-slate-400 italic">
                            + {area.servicos.length - 5} outros serviços
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070')] bg-cover bg-center opacity-5"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            Precisa de Assistência Jurídica Especializada?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como podemos ajudar a resolver sua questão jurídica com excelência e dedicação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.contato.telefone.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.mensagens.whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Falar no WhatsApp
            </a>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Link href="/contato">Agendar Consulta</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
