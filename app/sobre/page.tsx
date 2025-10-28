import { Metadata } from "next";
import { Award, Briefcase, GraduationCap, Scale, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sobre | Dr. João Silva - Advocacia",
  description: "Conheça o Dr. João Silva e sua trajetória profissional na advocacia",
};

export default function SobrePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Sobre o Escritório</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Comprometimento, excelência e ética na defesa dos seus direitos
          </p>
        </div>
      </section>

      {/* Biografia */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-serif">Dr. João Silva</h2>
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                <p>
                  Com mais de 15 anos de experiência na advocacia, o Dr. João Silva consolidou-se como um dos profissionais mais respeitados em seu campo de atuação.
                </p>
                <p>
                  Sua trajetória é marcada por uma dedicação incansável à defesa dos direitos de seus clientes, sempre pautada pelos mais altos padrões éticos e profissionais.
                </p>
                <p>
                  Ao longo de sua carreira, o Dr. João Silva construiu uma reputação sólida baseada em resultados consistentes e um compromisso genuíno com a justiça e a excelência jurídica.
                </p>
                <p>
                  Seu escritório se destaca pelo atendimento personalizado e pela busca constante de soluções inovadoras e eficazes para os desafios jurídicos mais complexos.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <GraduationCap className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Formação Acadêmica</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Graduação em Direito - Universidade de São Paulo (USP)</li>
                    <li>• Pós-graduação em Direito Civil - FGV</li>
                    <li>• Mestrado em Direito Empresarial - PUC-SP</li>
                    <li>• Extensão em Direito Internacional - Harvard Law School</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Reconhecimentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li>• Prêmio Advogado Destaque - OAB/SP (2022)</li>
                    <li>• Certificação em Mediação e Arbitragem</li>
                    <li>• Membro da Comissão de Direito Empresarial da OAB</li>
                    <li>• Palestrante em eventos jurídicos nacionais</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Filosofia */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Filosofia e Valores</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Os princípios que norteiam nossa atuação
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Scale className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Ética e Integridade</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nossa atuação é sempre pautada pelos mais altos padrões éticos, com transparência e honestidade em todas as relações profissionais.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Foco em Resultados</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Trabalhamos incansavelmente para alcançar os melhores resultados possíveis para nossos clientes, com estratégias jurídicas eficazes e personalizadas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">Comprometimento</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Cada caso é tratado com dedicação exclusiva e atenção aos detalhes, garantindo que nossos clientes recebam o melhor serviço jurídico possível.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experiência Profissional */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 font-serif text-center">Experiência Profissional</h2>

          <div className="max-w-3xl mx-auto space-y-8">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold mb-2">Fundador e Sócio Principal</h3>
              <p className="text-muted-foreground mb-2">João Silva Advocacia | 2015 - Presente</p>
              <p className="text-muted-foreground">
                Fundação e gestão do escritório, com atuação em diversas áreas do direito e foco em soluções jurídicas estratégicas para empresas e pessoas físicas.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold mb-2">Advogado Sênior</h3>
              <p className="text-muted-foreground mb-2">Silva & Associados | 2010 - 2015</p>
              <p className="text-muted-foreground">
                Atuação em casos complexos de direito empresarial e civil, com participação em operações de M&A e reestruturações societárias.
              </p>
            </div>

            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-bold mb-2">Advogado Associado</h3>
              <p className="text-muted-foreground mb-2">Escritório Jurídico Paulista | 2008 - 2010</p>
              <p className="text-muted-foreground">
                Início da carreira com foco em direito civil e trabalhista, desenvolvendo expertise em litígios e consultoria jurídica.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
