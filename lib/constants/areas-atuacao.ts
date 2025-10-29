/**
 * Configuração das Áreas de Atuação do Escritório
 */

export type TAreaAtuacao = {
  id: string
  titulo: string
  descricao: string
  icone: string
  slug: string
  destaque: boolean
  servicos: string[]
  detalhes?: string
}

export const AREAS_ATUACAO: TAreaAtuacao[] = [
  {
    id: "trabalhista",
    titulo: "Direito Trabalhista",
    slug: "direito-trabalhista",
    destaque: true,
    icone: "Briefcase",
    descricao:
      "Este é um dos nossos serviços mais populares e nossa agenda costuma ficar cheia. Independentemente da sua necessidade jurídica, não se preocupe pois oferecemos todos os recursos e as orientações para que você tenha sucesso.",
    servicos: [
      "Horas extras",
      "Intervalo intrajornada",
      "Acúmulo e desvio de função",
      "Adicional noturno",
      "Insalubridade e Periculosidade",
      "Acidente de trabalho",
      "Rescisão indireta",
      "Demissão sem justa causa",
      "Férias",
      "FGTS",
      "Vínculo de emprego",
      "Cálculo trabalhista",
      "Ações indenizatórias",
      "Assédio moral",
      "Gestante",
      "Estabilidade pré-aposentadoria",
      "Reintegração ao emprego",
      "Descontos no salário",
      "Premiação",
      "PLR",
      "Vale alimentação",
      "Jornada 12x36",
    ],
  },
  {
    id: "civel",
    titulo: "Direito Cível",
    slug: "direito-civel",
    destaque: true,
    icone: "Scale",
    descricao:
      "Decisões jurídicas podem ser difíceis e complicadas, por isso é importante ter uma abordagem fundamentada em informações corretas. Ao contratar nossos serviços, você pode ter a certeza de que estaremos à sua disposição em todas as etapas do processo.",
    servicos: [
      "Contratos",
      "Responsabilidade Civil",
      "Indenizações",
      "Direito de Família",
      "Direito das Sucessões",
      "Direito Imobiliário",
      "Direito do Consumidor",
      "Ações de Cobrança",
      "Usucapião",
      "Inventário e Partilha",
    ],
  },
  {
    id: "criminal",
    titulo: "Direito Criminal",
    slug: "direito-criminal",
    destaque: true,
    icone: "Shield",
    descricao:
      "Ao longo dos anos, nossa equipe adquiriu a experiência e os conhecimentos necessários para tornar esse processo o mais simples possível. Vamos estabelecer objetivos e alinhar expectativas. Se tiver dúvidas, basta entrar em contato conosco.",
    servicos: [
      "Defesa Criminal",
      "Habeas Corpus",
      "Revisão Criminal",
      "Recursos Criminais",
      "Assistência de Acusação",
      "Crimes contra a honra",
      "Crimes patrimoniais",
      "Crimes de trânsito",
      "Violência doméstica",
      "Audiências e Júri",
    ],
  },
  {
    id: "previdenciario",
    titulo: "Direito Previdenciário",
    slug: "direito-previdenciario",
    destaque: false,
    icone: "Users",
    descricao:
      "Assessoria completa em questões previdenciárias, garantindo seus direitos junto ao INSS.",
    servicos: [
      "Aposentadoria por tempo de contribuição",
      "Aposentadoria por idade",
      "Aposentadoria especial",
      "Aposentadoria por invalidez",
      "Auxílio-doença",
      "Auxílio-acidente",
      "Pensão por morte",
      "Revisão de benefícios",
      "Planejamento previdenciário",
      "Recursos administrativos",
    ],
  },
  {
    id: "consumidor",
    titulo: "Direito do Consumidor",
    slug: "direito-consumidor",
    destaque: false,
    icone: "ShoppingCart",
    descricao:
      "Defesa dos direitos do consumidor em relações de consumo, garantindo o cumprimento do Código de Defesa do Consumidor.",
    servicos: [
      "Vícios e defeitos em produtos",
      "Propaganda enganosa",
      "Cobranças indevidas",
      "Negativação indevida",
      "Cancelamento de contratos",
      "Danos morais e materiais",
      "Planos de saúde",
      "Serviços bancários",
      "Compras pela internet",
      "Recall de produtos",
    ],
  },
  {
    id: "empresarial",
    titulo: "Direito Empresarial",
    slug: "direito-empresarial",
    destaque: false,
    icone: "Building",
    descricao:
      "Consultoria jurídica empresarial completa, desde a constituição até a gestão de conflitos societários.",
    servicos: [
      "Constituição de empresas",
      "Contratos empresariais",
      "Recuperação judicial",
      "Falência",
      "Direito societário",
      "Fusões e aquisições",
      "Compliance",
      "Propriedade intelectual",
      "Franchising",
      "Dissolução de sociedade",
    ],
  },
]

// Funções auxiliares
export const obterAreaPorSlug = (slug: string): TAreaAtuacao | undefined => {
  return AREAS_ATUACAO.find((area) => area.slug === slug)
}

export const obterAreasDestaque = (): TAreaAtuacao[] => {
  return AREAS_ATUACAO.filter((area) => area.destaque)
}

export const obterTodasAreas = (): TAreaAtuacao[] => {
  return AREAS_ATUACAO
}

export const obterAreaPorId = (id: string): TAreaAtuacao | undefined => {
  return AREAS_ATUACAO.find((area) => area.id === id)
}

