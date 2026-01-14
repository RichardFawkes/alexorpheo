/**
 * Configurações centralizadas do site
 * Todas as informações de contato, redes sociais e dados do escritório
 */

type TSiteConfig = {
  advogado: {
    nome: string
    nomeExibicao: string
    oab: string
    formacao: string
    titulo: string
  }
  contato: {
    telefone: {
      principal: string
      whatsapp: string
      secundario: string
    }
    email: {
      principal: string
      atendimento: string
    }
    endereco: {
      logradouro: string
      bairro: string
      cidade: string
      estado: string
      cep: string
      completo: string
      googleMapsUrl: string
    }
    horarioAtendimento: {
      semana: string
      sabado: string
      domingo: string
    }
  }
  redesSociais: {
    instagram: {
      url: string
      usuario: string
    }
    facebook: {
      url: string
      usuario: string
    }
    linkedin: {
      url: string
      usuario: string
    }
    youtube?: {
      url: string
      usuario: string
    }
    twitter?: {
      url: string
      usuario: string
    }
  }
  site: {
    nome: string
    titulo: string
    descricao: string
    url: string
    logo: string
    anoFundacao: number
    anosExperiencia: number
  }
  mensagens: {
    whatsapp: string
    rodape: string
  }
}

export const SITE_CONFIG: TSiteConfig = {
  // Informações do Advogado
  advogado: {
    nome: "Alex de Melo Orphêo",
    nomeExibicao: "Orpheo Advocacia",
    oab: "OAB/SP 353.918",
    formacao: "Pós-graduado em Trabalho e Processo pela Universidade Presbiteriana Mackenzie (Mackenzie)",
    titulo: "Advogado",
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
      cidade: "São Paulo",
      estado: "SP",
      cep: "06950-000",
      completo: "Av. Juscelino K. de Oliveira, 571 - Centro, São Paulo/SP",
      googleMapsUrl: "https://maps.google.com/?q=Av.+Juscelino+K.+de+Oliveira,+571,+São+Paulo,+SP",
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
    nome: "Orpheo Advocacia",
    titulo: "Orpheo Advocacia - Excelência Jurídica em São Paulo",
    descricao: "Advocacia de excelência com atendimento humanizado e foco em Direito do Trabalho em São Paulo.",
    url: "https://www.alexorpheo.com.br",
    logo: "/logo-nova.png",
    anoFundacao: 2013,
    anosExperiencia: 11,
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
