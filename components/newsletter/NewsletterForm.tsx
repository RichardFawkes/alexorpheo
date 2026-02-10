"use client"

import { useState } from "react"
import emailjs from "@emailjs/browser"
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EMAILJS_CONFIG } from "@/lib/constants/emailjs"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setStatus("idle")

    try {
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_NEWSLETTER,
        {
          to_email: "contato@alexorpheo.com.br", // Email do admin para receber aviso
          subscriber_email: email,
          message: `Novo assinante de newsletter: ${email}`,
          post_title: "", // Evita erro de variável faltante no template
          post_type: "Newsletter", // Identificador para o template
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      setStatus("success")
      setEmail("")
    } catch (error) {
      console.error("Erro ao enviar newsletter:", error)
      setStatus("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative">
      {status === "success" ? (
        <div className="w-full bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-center justify-center gap-2 text-green-400">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Inscrição realizada com sucesso!</span>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-600 disabled:opacity-50"
              required
            />
            <Button
              type="submit"
              disabled={loading}
              className="text-white bg-[#d9b060] hover:bg-[#c5a059] rounded-lg px-8 shadow-lg shadow-amber-600/20 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Inscrever-se
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
          {status === "error" && (
            <div className="absolute -bottom-8 left-0 text-red-400 text-xs flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Erro ao inscrever. Tente novamente.
            </div>
          )}
        </>
      )}
    </div>
  )
}
