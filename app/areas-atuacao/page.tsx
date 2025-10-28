import { Metadata } from "next";
import { Briefcase, Users, Building2, Home as HomeIcon, Landmark, FileText, Shield, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Áreas de Atuação | Dr. João Silva - Advocacia",
  description: "Conheça as áreas de atuação do escritório e nossa expertise jurídica",
};

const areas = [
  {
    icon: Briefcase,
    title: "Direito Civil",
    description: "Atuação completa em todas as vertentes do Direito Civil, desde contratos até questões de responsabilidade civil.",
    services: [
      "Contratos e obrigações",
      "Responsabilidade civil",
      "Direito de família e sucessões",
      "Indenizações e danos morais",
      "Inventários e testamentos",
      "Usucapião",
    ],
  },
  {
    icon: Users,
    title: "Direito Trabalhista",
    description: "Defesa de direitos trabalhistas e assessoria completa para empresas e empregados.",
    services: [
      "Ações trabalhistas",
      "Rescisões contratuais",
      "Acordos trabalhistas",
      "Consultoria preventiva",
      "Defesa em audiências",
      "Regularização trabalhista",
    ],
  },
  {
    icon: Building2,
    title: "Direito Empresarial",
    description: "Assessoria jurídica estratégica para empresas de todos os portes e segmentos.",
    services: [
      "Constituição de empresas",
      "Contratos comerciais",
      "Recuperação judicial",
      "Fusões e aquisições (M&A)",
      "Governança corporativa",
      "Propriedade intelectual",
    ],
  },
  {
    icon: HomeIcon,
    title: "Direito Imobiliário",
    description: "Soluções jurídicas para todas as questões relacionadas a imóveis e propriedades.",
    services: [
      "Compra e venda de imóveis",
      "Contratos de locação",
      "Usucapião",
      "Regularização de imóveis",
      "Despejo e ações possessórias",
      "Incorporações imobiliárias",
    ],
  },
  {
    icon: Landmark,
    title: "Direito Tributário",
    description: "Planejamento tributário e defesa em questões fiscais.",
    services: [
      "Planejamento tributário",
      "Defesas administrativas",
      "Ações de repetição de indébito",
      "Consultoria fiscal",
      "Recuperação de créditos tributários",
      "Regularização fiscal",
    ],
  },
  {
    icon: FileText,
    title: "Direito Contratual",
    description: "Elaboração, revisão e negociação de contratos de todas as naturezas.",
    services: [
      "Elaboração de contratos",
      "Revisão contratual",
      "Negociação de termos",
      "Contratos internacionais",
      "Due diligence",
      "Resolução de conflitos contratuais",
    ],
  },
  {
    icon: Shield,
    title: "Direito do Consumidor",
    description: "Defesa dos direitos dos consumidores em todas as esferas.",
    services: [
      "Ações contra fornecedores",
      "Indenizações por danos",
      "Revisão de contratos",
      "Defesa em cobranças indevidas",
      "Recall de produtos",
      "Práticas abusivas",
    ],
  },
  {
    icon: TrendingUp,
    title: "Direito Bancário",
    description: "Assessoria especializada em questões bancárias e financeiras.",
    services: [
      "Revisão de contratos bancários",
      "Renegociação de dívidas",
      "Ações contra instituições financeiras",
      "Defesa do superendividamento",
      "Tarifas bancárias",
      "Consórcios e financiamentos",
    ],
  },
];

export default function AreasAtuacaoPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Áreas de Atuação</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Expertise especializada em diversas áreas do direito para atender suas necessidades
          </p>
        </div>
      </section>

      {/* Áreas */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {areas.map((area, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <area.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-2xl">{area.title}</CardTitle>
                  <CardDescription className="text-base">{area.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3 text-sm text-foreground">Serviços oferecidos:</h4>
                  <ul className="space-y-2">
                    {area.services.map((service, idx) => (
                      <li key={idx} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-primary mr-2">•</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            Precisa de Assistência Jurídica Especializada?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e descubra como podemos ajudar a resolver sua questão jurídica.
          </p>
          <Button asChild size="lg">
            <Link href="/contato">Agendar Consulta</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
