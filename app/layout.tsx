import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

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
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
