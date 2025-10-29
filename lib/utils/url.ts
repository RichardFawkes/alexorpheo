export function obterUrlBase(): string {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}

export function obterUrlCompleta(caminho: string): string {
  const base = obterUrlBase()
  const caminhoLimpo = caminho.startsWith('/') ? caminho : `/${caminho}`
  return `${base}${caminhoLimpo}`
}

