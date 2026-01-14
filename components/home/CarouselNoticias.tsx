"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { Calendar, Newspaper } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TNews } from "@/lib/supabase/server"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

type TCarouselNoticiasProps = {
  noticias: TNews[]
}

export default function CarouselNoticias({ noticias }: TCarouselNoticiasProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  if (!mounted || noticias.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-32 bg-gold-50 relative overflow-hidden">
      {/* Linhas decorativas */}
      <div className="absolute left-0 top-20 w-32 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 uppercase tracking-tight"
            >
              INSIGHTS <span className="text-gold-500">JURÍDICOS</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed"
            >
              Fique por dentro das principais atualizações do mundo jurídico
            </motion.p>
          </div>

          {/* Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="pb-16"
            >
              {noticias.map((noticia) => (
                <SwiperSlide key={noticia.id}>
                  <Link href={`/noticias/${noticia.slug}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group h-full"
                    >
                      <div className="relative border border-gold-200 bg-white hover:border-gold-500 transition-all duration-500 overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md">
                        {/* Triângulo dourado no canto */}
                        <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] border-t-gold-500 border-l-[60px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                        <div className="p-6 flex-1 flex flex-col">
                          {/* Data */}
                          {noticia.publishedAt && (
                            <div className="text-gold-600 font-bold text-sm mb-4 uppercase">
                              {new Date(noticia.publishedAt).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              }).replace('.', '').toUpperCase()}
                            </div>
                          )}

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {noticia.category && (
                              <span className="px-3 py-1 bg-gold-50 border border-gold-100 text-gold-700 text-xs font-bold uppercase tracking-wider rounded-full">
                                {noticia.category}
                              </span>
                            )}
                            {noticia.tags && noticia.tags.slice(0, 1).map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Título */}
                          <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-3 group-hover:text-gold-600 transition-colors duration-300 flex-1">
                            {noticia.title}
                          </h3>

                          {/* Resumo */}
                          {noticia.excerpt && (
                            <p className="text-slate-600 line-clamp-2 mb-4 leading-relaxed text-sm">
                              {noticia.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Link para ver todas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/noticias"
              className="inline-block px-8 py-4 border-2 border-gold-500 text-gold-600 rounded-full font-bold uppercase tracking-wider hover:bg-gold-500 hover:text-white transition-all duration-300"
            >
              Ver Todos os Insights
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

