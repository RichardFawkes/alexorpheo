import ReviewsGrid from "@/components/avaliacoes/ReviewsGrid"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Avaliações de Clientes | Alex Orpheo Advogados",
  description: "Veja o que nossos clientes dizem sobre nossos serviços jurídicos. Excelência e compromisso comprovados.",
}

export default function AvaliacoesPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-black text-white py-24 md:py-40 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full blur-[120px] opacity-20 translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-900 rounded-full blur-[100px] opacity-20 -translate-y-1/2 -translate-x-1/2"></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="text-gold-400 uppercase tracking-widest text-sm font-semibold mb-4 block">Depoimentos</span>
            <h1 className="text-4xl md:text-6xl font-serif mb-6">
              Excelência <span className="text-gold-400 italic">Reconhecida</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              A confiança é a base do nosso trabalho. Confira as experiências reais de quem contou com nossa dedicação e expertise jurídica.
            </p>

            <div className="mt-8 flex items-center justify-center gap-2">
               <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-gold-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
               </div>
               <span className="text-white font-medium">5.0 de 5.0 no Google</span>
            </div>
          </div>
       </div>

       {/* Reviews Grid */}
       <div className="container mx-auto px-4 -mt-16 relative z-20">
          <ReviewsGrid />
       </div>

       <div className="container mx-auto px-4 mt-20 text-center">
          <a
            href="https://www.google.com/search?q=alex+orpheo+advogado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-gold-600 transition-colors duration-300 border-b border-transparent hover:border-gold-600 pb-1"
          >
            <span>Ver todas as avaliações no Google</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
       </div>
    </main>
  )
}
