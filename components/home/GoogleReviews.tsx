"use client"

import { Star } from "lucide-react"
import { motion } from "framer-motion"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import { cn } from "@/lib/utils"

const reviews = [
  {
    name: "Maria Silva",
    date: "2 semanas atrás",
    rating: 5,
    text: "Excelente atendimento! O Dr. Alex foi muito atencioso e resolveu meu caso com muita agilidade. Recomendo a todos que precisam de um advogado trabalhista competente.",
    avatar: "M"
  },
  {
    name: "João Oliveira",
    date: "1 mês atrás",
    rating: 5,
    text: "Profissionalismo ímpar. A equipe do escritório me deu todo o suporte necessário durante o processo. Transparência e ética definem.",
    avatar: "J"
  },
  {
    name: "Ana Santos",
    date: "2 meses atrás",
    rating: 5,
    text: "Fiquei muito satisfeita com o resultado. O escritório é moderno e o atendimento é humanizado. Me senti acolhida desde a primeira consulta.",
    avatar: "A"
  },
  {
    name: "Carlos Pereira",
    date: "3 meses atrás",
    rating: 5,
    text: "Grande conhecimento jurídico e dedicação. Consegui reverter uma situação complicada graças à competência do Dr. Alex.",
    avatar: "C"
  },
  {
    name: "Fernanda Lima",
    date: "1 semana atrás",
    rating: 5,
    text: "Atendimento rápido e eficiente. Tiraram todas as minhas dúvidas e foram muito transparentes sobre as possibilidades do processo.",
    avatar: "F"
  }
]

export default function GoogleReviews({ className }: { className?: string }) {
  return (
    <div className={cn("w-full py-8", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          className="w-full"
        >
            <CarouselContent className="-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full bg-white">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-700 font-bold text-lg">
                            {review.avatar}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{review.name}</p>
                            <p className="text-xs text-slate-500">{review.date}</p>
                          </div>
                          <div className="ml-auto">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Google</span>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                          ))}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-4">
                          &quot;{review.text}&quot;
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
        </Carousel>
      </div>
    </div>
  )
}
