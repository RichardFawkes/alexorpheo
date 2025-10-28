import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Alex Orpheo - Advocacia de Excelência | Direito com Sofisticação",
  description: "Advocacia premium com excelência incomparável. Soluções jurídicas estratégicas e personalizadas para clientes que exigem o melhor.",
  keywords: ["advogado", "advocacia premium", "direito civil", "direito empresarial", "alex orpheo", "advocacia de elite"],
  authors: [{ name: "Alex Orpheo" }],
  openGraph: {
    title: "Alex Orpheo - Advocacia de Excelência",
    description: "Advocacia premium com excelência incomparável",
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
