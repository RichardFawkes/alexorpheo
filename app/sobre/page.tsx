import { Metadata } from "next";
import Image from "next/image";
import { Award, Briefcase, GraduationCap, Scale, Target, Users, Heart, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/constants/site-config";

export const metadata: Metadata = {
  title: `Sobre | ${SITE_CONFIG.advogado.nomeExibicao} - Advocacia`,
  description: `Conheça ${SITE_CONFIG.advogado.nome} e sua trajetória profissional na advocacia. ${SITE_CONFIG.advogado.formacao}.`,
};

export default function SobrePage() {
  return (
    <div className="flex flex-col">
      {/* Hero com Imagem */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95"></div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full">
              <span className="text-gold-400 text-sm font-semibold">{SITE_CONFIG.advogado.oab}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {SITE_CONFIG.advogado.nome}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-4">
              {SITE_CONFIG.advogado.formacao}
            </p>
            <p className="text-lg text-gold-400 font-semibold mb-8">
              {SITE_CONFIG.advogado.titulo}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-gold-500" />
                <span>{SITE_CONFIG.site.anosExperiencia}+ anos de experiência</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-gold-500" />
                <span>Especialista em Direito do Trabalho</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-gold-500" />
                <span>Atendimento em {SITE_CONFIG.contato.endereco.cidade}/{SITE_CONFIG.contato.endereco.estado}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Advogado */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Imagem do Advogado */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-gold-500/20 to-blue-500/20 rounded-2xl blur-2xl"></div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1000"
                    alt={SITE_CONFIG.advogado.nome}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-slate-200">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900">{SITE_CONFIG.site.anosExperiencia}+</div>
                    <div className="text-sm text-slate-600 font-medium">Anos de<br />Experiência</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-slate-900">
                  Um Novo Tipo de Escritório de Advocacia
                </h2>
                <div className="prose prose-lg max-w-none space-y-5 text-slate-600 leading-relaxed">
                  <p>
                    <strong>Orpheo Advocacia</strong> é um escritório dedicado à consultoria, assessoria e serviços jurídicos, formado por uma equipe experiente, multidisciplinar e comprometida com soluções eficientes para seus clientes.
                  </p>
                  <p>
                    Trabalhamos com foco na agilidade, na clareza e na atuação estratégica, buscando sempre a melhor condução dos processos e a rápida resolução das demandas, tanto no Judiciário quanto na esfera consultiva.
                  </p>
                  <p>
                    Nossa <strong>principal área de atuação é o Direito do Trabalho</strong>, abrangendo ações relacionadas a adicional de insalubridade e periculosidade, adicional noturno, indenizações decorrentes de redução da capacidade laborativa, horas extras, intervalos, descontos indevidos, benefícios corporativos, verbas rescisórias, vínculo de emprego, estabilidade gestante, proteção de membros da CIPA, entre outras demandas trabalhistas.
                  </p>
                  <p>
                    Também oferecemos <strong>assessoria empresarial</strong>, auxiliando na organização de escalas de revezamento, planejamento de pagamentos, controle de jornada, análises de justa causa, acordos com a CEF (Caixa Econômica Federal), reestruturação financeira e outras soluções voltadas à área trabalhista corporativa.
                  </p>
                  <p>
                    Somos um escritório moderno, preparado para um mercado em constante transformação, e comprometido em ajudar nossos clientes a enfrentar desafios jurídicos com segurança, transparência e estratégia.
                  </p>
                  <p className="text-slate-700 font-medium">
                    Será um prazer entender suas necessidades e contribuir para a solução do seu caso.
                  </p>
                </div>
              </div>

              {/* Cards de Destaque */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-gold-100 bg-gradient-to-br from-gold-50 to-white">
                  <CardHeader>
                    <GraduationCap className="h-10 w-10 text-gold-600 mb-3" />
                    <CardTitle className="text-lg">Formação Acadêmica</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 font-medium">
                      {SITE_CONFIG.advogado.formacao}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                  <CardHeader>
                    <Award className="h-10 w-10 text-blue-600 mb-3" />
                    <CardTitle className="text-lg">Qualificação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 font-medium">
                      {SITE_CONFIG.advogado.titulo}
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      {SITE_CONFIG.advogado.oab}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 px-4 py-2 bg-gold-100 rounded-full">
              <span className="text-gold-700 text-sm font-semibold">NOSSOS DIFERENCIAIS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif text-slate-900">
              Por que escolher nosso escritório?
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto">
              Combinamos expertise jurídica com atendimento humanizado para oferecer a melhor experiência aos nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Scale className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Ética e Integridade</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600">
                  Atuação pautada pelos mais altos padrões éticos, com transparência e honestidade em todas as relações.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Foco em Resultados</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600">
                  Estratégias jurídicas eficazes e personalizadas para alcançar os melhores resultados possíveis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Atendimento Humanizado</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600">
                  Cada cliente é tratado com respeito, empatia e atenção personalizada às suas necessidades.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 h-16 w-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Experiência Comprovada</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-slate-600">
                  Mais de {SITE_CONFIG.site.anosExperiencia} anos defendendo os direitos de trabalhadores com excelência.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Áreas de Especialização */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-serif text-slate-900">
              Áreas de Especialização
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Atuação focada em Direito do Trabalho, com expertise em diversas áreas jurídicas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-slate-100 hover:border-amber-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6 text-amber-600" />
                </div>
                <CardTitle className="text-xl">Direito Trabalhista</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Especialização principal com atuação em rescisões, horas extras, FGTS, assédio moral, estabilidades e todos os direitos do trabalhador.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Direito Cível</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Atuação em contratos, responsabilidade civil, indenizações, direito de família e outras demandas cíveis.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 border-slate-100 hover:border-red-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Direito Criminal</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Defesa criminal, habeas corpus, recursos e assistência em processos criminais com estratégia e dedicação.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070')] bg-cover bg-center opacity-5"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            Precisa de Orientação Jurídica?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Agende uma consulta e descubra como podemos ajudá-lo a defender seus direitos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.contato.telefone.whatsapp}?text=${encodeURIComponent(SITE_CONFIG.mensagens.whatsapp)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Users className="h-5 w-5 mr-2" />
              Agendar Consulta
            </a>
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-white/20"
            >
              Entre em Contato
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
