import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Dr. João Silva - Advocacia | Excelência e Compromisso",
  description: "Advocacia com excelência, ética e comprometimento. Atuação em Direito Civil, Trabalhista, Empresarial e Imobiliário.",
  keywords: ["advogado", "advocacia", "direito civil", "direito trabalhista", "direito empresarial", "São Paulo"],
  authors: [{ name: "Dr. João Silva" }],
  openGraph: {
    title: "Dr. João Silva - Advocacia",
    description: "Advocacia com excelência, ética e comprometimento",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
