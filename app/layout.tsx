import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Alex Orpheo - Advogado Especialista | Excelência Jurídica em São Paulo",
  description: "Advocacia de excelência com +15 anos de experiência. Atendimento personalizado e soluções jurídicas estratégicas em Direito Civil, Empresarial, Trabalhista e mais. Agende sua consultoria gratuita.",
  keywords: [
    "advogado são paulo",
    "alex orpheo",
    "advocacia premium",
    "direito civil",
    "direito empresarial",
    "direito trabalhista",
    "direito do consumidor",
    "advogado especialista",
    "consultoria jurídica",
    "escritório de advocacia sp"
  ],
  authors: [{ name: "Alex Orpheo" }],
  openGraph: {
    title: "Alex Orpheo - Advogado Especialista | Excelência Jurídica",
    description: "Advocacia de excelência com atendimento humanizado e resultados comprovados. +15 anos de experiência.",
    type: "website",
    locale: "pt_BR",
    siteName: "Alex Orpheo Advocacia",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
