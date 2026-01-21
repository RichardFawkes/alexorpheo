import type { Metadata } from "next";
import "./globals.css";
import PublicLayoutWrapper from "@/components/layout/PublicLayoutWrapper";
import { SITE_CONFIG } from "@/lib/constants/site-config";
import TopLoader from "@/components/ui/TopLoader";

export const metadata: Metadata = { title: `${SITE_CONFIG.site.nome} - Excelência Jurídica em São Paulo`,

  description: `Advocacia de excelência com ${SITE_CONFIG.site.anosExperiencia}+ anos de experiência em São Paulo. Atendimento personalizado e soluções jurídicas estratégicas com foco em Direito do Trabalho.`,
  keywords: [
    "advogado são paulo",
    "orpheo advocacia",
    "advocacia premium",
    "direito civil",
    "direito empresarial",
    "direito trabalhista",
    "direito do consumidor",
    "advogado especialista",
    "consultoria jurídica",
    "escritório de advocacia sp"
  ],
  authors: [{ name: SITE_CONFIG.advogado.nome }],
  openGraph: {
    title: `${SITE_CONFIG.site.nome} - Excelência Jurídica`,
    description: `Advocacia de excelência com atendimento humanizado e resultados comprovados. ${SITE_CONFIG.site.anosExperiencia}+ anos de experiência.`,
    type: "website",
    locale: "pt_BR",
    siteName: SITE_CONFIG.site.nome,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "seu-codigo-google-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <TopLoader />
        <PublicLayoutWrapper>
          {children}
        </PublicLayoutWrapper>
      </body>
    </html>
  );
}
