"use client"

import { Star } from "lucide-react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Image from "next/image"
import { cn } from "@/lib/utils"
import reviewsData from "@/lib/data/google-reviews.json"

export default function GoogleReviews({ className }: { className?: string }) {
  // Use first 6 reviews for home page
  const reviews = reviewsData.slice(0, 6);

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
                  <div className="p-1 h-full">
                    <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 h-full bg-white">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gold-100 flex-shrink-0">
                            {review.avatar && review.avatar.startsWith('http') ? (
                                <Image 
                                    src={review.avatar} 
                                    alt={review.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gold-700 font-bold text-lg">
                                    {review.name.charAt(0)}
                                </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-900 truncate">{review.name}</p>
                            <p className="text-xs text-slate-500">{review.date}</p>
                          </div>
                          <div className="ml-auto flex-shrink-0">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Google</span>
                          </div>
                        </div>
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                className={cn(
                                    "w-4 h-4", 
                                    i < review.rating ? "text-gold-400 fill-gold-400" : "text-slate-200"
                                )} 
                            />
                          ))}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-4">
                          &quot;{review.text.replace(/<br>/g, " ")}&quot;
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
        </Carousel>
      </div>
    </div>
  )
}
