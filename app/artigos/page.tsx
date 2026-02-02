"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FileText, ArrowRight, Clock, Tag, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type TArticle = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  coverImage: string | null
  publishedAt: string | null
  category: { name: string; slug: string } | null
}

export default function ArtigosPage() {
  const [articles, setArticles] = useState<TArticle[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [articlesRes, categoriesRes] = await Promise.all([
          fetch('/api/articles?published=true'),
          fetch('/api/categories')
        ])

        const articlesData = await articlesRes.json()
        const categoriesData = await categoriesRes.json()

        setArticles(Array.isArray(articlesData) ? articlesData : [])
        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
      } catch (error) {
        console.error('Erro ao carregar dados:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredArticles = selectedCategory
    ? articles.filter(a => a.category?.slug === selectedCategory)
    : articles

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      {/* Hero Profissional */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-slate-950 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >


            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Artigos <span className="text-gold-500">Jurídicos</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              Análises aprofundadas, atualizações legislativas e insights estratégicos
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Categories Filter */}
            {categories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-12 justify-center"
              >
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
                    selectedCategory === null
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  Todos
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
                      selectedCategory === cat.slug
                        ? 'bg-blue-900 text-white shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Articles Grid */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredArticles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <FileText className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">Nenhum artigo encontrado</h3>
                <p className="text-slate-600">Em breve publicaremos novos conteúdos</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.7, ease: "easeOut" }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  >
                    <Link href={`/artigos/${article.slug}`} className="group block h-full">
                      <div className="relative h-full bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-900 hover:shadow-2xl transition-all duration-500">
                        {/* Image */}
                        {article.coverImage ? (
                          <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100">
                            <Image
                              src={article.coverImage}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                          </div>
                        ) : (
                          <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
                            <BookOpen className="w-16 h-16 text-blue-900/20" />
                          </div>
                        )}

                        <div className="p-6">
                          {/* Meta */}
                          <div className="flex items-center gap-4 mb-4 text-sm">
                            {article.category && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 rounded-full border border-blue-200">
                                <Tag className="w-3 h-3" />
                                {article.category.name}
                              </span>
                            )}
                            {article.publishedAt && (
                              <span className="flex items-center gap-1.5 text-slate-500">
                                <Clock className="w-3 h-3" />
                                {format(new Date(article.publishedAt), "dd MMM yyyy", { locale: ptBR })}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 font-serif group-hover:text-blue-900 transition-colors duration-300">
                            {article.title}
                          </h3>

                          {/* Excerpt */}
                          {article.excerpt && (
                            <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                              {article.excerpt}
                            </p>
                          )}

                          {/* Read More */}
                          <div className="flex items-center gap-2 text-blue-900 font-semibold group-hover:gap-4 transition-all duration-300">
                            <span>Ler artigo completo</span>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
