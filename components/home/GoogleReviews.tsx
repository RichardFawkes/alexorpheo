"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"
import localReviews from "@/lib/data/google-reviews.json"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export default function GoogleReviews({ className }: { className?: string }) {
  const [reviews, setReviews] = useState(localReviews.slice(0, 8))

  useEffect(() => {
    let mounted = true
    fetch("/api/google-reviews", { cache: "force-cache" })
      .then(res => res.ok ? res.json() : localReviews)
      .then((data) => {
        if (!mounted) return
        const arr = Array.isArray(data) ? data : localReviews
        setReviews(arr.slice(0, 8))
      })
      .catch(() => {
        if (!mounted) return
        setReviews(localReviews.slice(0, 8))
      })
    return () => { mounted = false }
  }, [])

  return (
    <section className={cn("py-24 bg-slate-50 relative overflow-hidden", className)}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-blue-900/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold tracking-wider mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              GOOGLE REVIEWS
            </span>

            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              A voz de quem <br/>
              <span className="text-gold-600 italic">confia</span> em nós
            </h2>

            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              Histórias reais de sucesso e justiça. A excelência do nosso trabalho refletida na satisfação dos nossos clientes.
            </p>

            <div className="inline-flex items-center bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 gap-4">
              <div className="flex text-gold-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="h-4 w-px bg-slate-200" />
              <span className="text-xl font-bold text-slate-900">5.0</span>
              <span className="text-slate-500 text-sm">
                de 5.0 no Google
              </span>
            </div>
          </motion.div>
        </div>

        <Carousel
          opts={{ align: "start", loop: true, slidesToScroll: 3 }}
          plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
          className="relative"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="h-full"
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full bg-white group rounded-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote className="w-12 h-12 text-gold-500 transform rotate-12" />
                    </div>
                    <CardContent className="p-6 flex flex-col h-full relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 ring-2 ring-white shadow-md flex-shrink-0">
                          {review.avatar && review.avatar.startsWith('http') ? (
                            <Image
                              src={review.avatar}
                              alt={review.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-900 text-gold-400 font-serif font-bold text-lg">
                              {review.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm leading-tight group-hover:text-gold-600 transition-colors line-clamp-1">
                            {review.name}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-2.5 h-2.5",
                                    i < review.rating ? "text-gold-400 fill-gold-400" : "text-slate-200"
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex-grow mb-2">
                        <p className="text-slate-600 text-sm leading-relaxed italic line-clamp-4 group-hover:text-slate-800 transition-colors">
                          &quot;{review.text.replace(/<br>/g, " ")}&quot;
                        </p>
                      </div>
                      <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{review.date}</span>
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            <span className="text-[10px] font-medium text-slate-400">Google</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
