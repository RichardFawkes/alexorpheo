"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import reviewsData from "@/lib/data/google-reviews.json"
import { cn } from "@/lib/utils"

export default function ReviewsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviewsData.map((review, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="h-full"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 h-full flex flex-col relative group">
            <div className="absolute top-6 right-8 text-slate-100 group-hover:text-gold-50 transition-colors duration-300">
              <Quote size={40} strokeWidth={1} />
            </div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                {review.avatar ? (
                  <Image 
                    src={review.avatar} 
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-medium">
                    {review.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-slate-900 text-base">{review.name}</h3>
                <p className="text-slate-400 text-xs">{review.date}</p>
              </div>
            </div>

            <div className="flex mb-4 relative z-10">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-4 h-4 mr-0.5",
                    i < review.rating ? "text-gold-400 fill-gold-400" : "text-slate-200"
                  )} 
                />
              ))}
            </div>

            <div className="relative z-10 flex-grow">
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                {review.text.replace(/<br>/g, "\n")}
              </p>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image 
                  src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" 
                  alt="Google" 
                  width={16} 
                  height={16}
                  className="opacity-60 grayscale group-hover:grayscale-0 transition-all duration-300" 
                />
                <span className="text-xs text-slate-400 font-medium">Google Review</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
