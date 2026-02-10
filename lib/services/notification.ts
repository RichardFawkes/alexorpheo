import emailjs from "@emailjs/browser"
import { EMAILJS_CONFIG } from "@/lib/constants/emailjs"

export const notifyNewPost = async (title: string, type: 'Artigo' | 'Notícia') => {
  try {
    // Verifica se estamos no browser antes de tentar usar emailjs-com client side
    if (typeof window === 'undefined') return

    await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_NEW_POST,
        {
          to_email: "contato@alexorpheo.com.br", // Admin recebe aviso
          post_title: title,
          post_type: type,
          message: `Novo item publicado: ${type} - ${title}`,
          subscriber_email: "", // Evita erro de variável faltante no template
        },
        EMAILJS_CONFIG.PUBLIC_KEY
    )
    console.log(`Notificação de ${type} enviada com sucesso`)
  } catch (error) {
    console.error("Erro ao enviar notificação:", error)
  }
}
