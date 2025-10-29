/**
 * Configurações centralizadas do site
 * Todas as informações de contato, redes sociais e dados do escritório
 */

export const SITE_CONFIG = {
  // Informações do Advogado
  advogado: {
    nome: "Alex de Melo Orphêo",
    nomeExibicao: "Alex Orpheo",
    oab: "OAB/SP 123.456", // TODO: Adicionar número real da OAB
    formacao: "Pós-graduado em Trabalho e Processo pelo Mackenzie",
    titulo: "Magistrando",
  },

  // Informações de Contato
  contato: {
    telefone: {
      principal: "(11) 91416-7631",
      whatsapp: "5511914167631", // Formato internacional sem espaços
      secundario: "", // Opcional
    },
    email: {
      principal: "contato@alexorpheo.adv.br",
      atendimento: "atendimento@alexorpheo.adv.br", // Opcional
    },
    endereco: {
      logradouro: "Av. Juscelino K. de Oliveira, 571",
      bairro: "Centro",
      cidade: "Juquitiba",
      estado: "SP",
      cep: "06950-000", // TODO: Verificar CEP correto
      completo: "Av. Juscelino K. de Oliveira, 571 - Centro, Juquitiba/SP",
      googleMapsUrl: "https://maps.google.com/?q=Av.+Juscelino+K.+de+Oliveira,+571,+Juquitiba,+SP", // TODO: Adicionar URL real do Google Maps
    },
    horarioAtendimento: {
      semana: "Segunda a Sexta: 9h às 18h",
      sabado: "Sábado: 9h às 13h",
      domingo: "Domingo: Fechado",
    },
  },

  // Redes Sociais
  redesSociais: {
    instagram: {
      url: "https://www.instagram.com/alex_orpheo/",
      usuario: "@alex_orpheo",
    },
    facebook: {
      url: "https://www.facebook.com/alexorpheo", // TODO: Adicionar URL real do Facebook
      usuario: "alexorpheo",
    },
    linkedin: {
      url: "https://br.linkedin.com/in/alexorpheo",
      usuario: "alexorpheo",
    },
    youtube: {
      url: "", // Opcional
      usuario: "",
    },
    twitter: {
      url: "", // Opcional
      usuario: "",
    },
  },

  // Informações do Site
  site: {
    nome: "Alex Orpheo Advocacia",
    titulo: "Alex Orpheo - Advogado Especialista | Excelência Jurídica",
    descricao: "Advocacia de excelência com atendimento humanizado e resultados comprovados. Especialista em Direito do Trabalho.",
    url: "https://www.alexorpheo.com.br",
    logo: "/logo.avif",
    anoFundacao: 2008, // TODO: Adicionar ano real de fundação
    anosExperiencia: new Date().getFullYear() - 2008, // Calcula automaticamente
  },

  // Mensagens Padrão
  mensagens: {
    whatsapp: "Olá! Gostaria de agendar uma consulta jurídica.",
    rodape: "Advocacia com excelência, ética e comprometimento absoluto com os melhores resultados para nossos clientes.",
  },
} as const

// Tipos TypeScript para autocompletar
export type SiteConfig = typeof SITE_CONFIG

// Funções auxiliares
export const obterTelefoneFormatado = (telefone: string): string => {
  return telefone.replace(/\D/g, "")
}

export const obterEnderecoCompleto = (): string => {
  const { logradouro, bairro, cidade, estado, cep } = SITE_CONFIG.contato.endereco
  return `${logradouro}, ${bairro} - ${cidade}/${estado} - CEP: ${cep}`
}

export const obterRedesSociaisAtivas = () => {
  return Object.entries(SITE_CONFIG.redesSociais)
    .filter(([_, rede]) => rede.url !== "")
    .map(([nome, rede]) => ({ nome, ...rede }))
}

