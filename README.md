# 🏛️ Site Profissional para Advogado - Dr. João Silva

Site institucional completo com painel administrativo, desenvolvido com Next.js 14+, TypeScript, Tailwind CSS e Prisma.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 14+** com App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** para animações
- **shadcn/ui** para componentes

### Backend
- **Prisma ORM** com PostgreSQL
- **NextAuth.js** para autenticação
- **React Hook Form + Zod** para validações

## 📋 Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- npm ou yarn

## 🔧 Instalação e Configuração

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd alexorpheo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Edite o arquivo `.env` com suas credenciais do PostgreSQL:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/advogado_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
```

**Importante:** Gere uma chave secreta segura para `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 4. Configure o banco de dados

```bash
# Criar as tabelas no banco
npm run db:push

# Popular o banco com dados iniciais
npm run db:seed
```

### 5. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

## 🔐 Credenciais Padrão do Admin

Após executar o seed, use estas credenciais para fazer login no painel administrativo:

- **URL:** http://localhost:3000/admin/login
- **E-mail:** admin@joaosilva.adv.br
- **Senha:** admin123

**⚠️ IMPORTANTE:** Altere estas credenciais em produção!

## 📁 Estrutura do Projeto

```
alexorpheo/
├── app/                      # Rotas e páginas (Next.js App Router)
│   ├── admin/               # Painel administrativo
│   │   ├── artigos/        # CRUD de artigos
│   │   ├── categorias/     # CRUD de categorias
│   │   └── login/          # Página de login
│   ├── api/                # API Routes
│   │   ├── auth/           # Autenticação NextAuth
│   │   └── contact/        # Formulário de contato
│   ├── artigos/            # Páginas públicas de artigos
│   ├── sobre/              # Página sobre
│   ├── areas-atuacao/      # Áreas de atuação
│   ├── contato/            # Página de contato
│   └── layout.tsx          # Layout principal
├── components/             # Componentes React
│   ├── admin/             # Componentes do admin
│   ├── layout/            # Header, Footer
│   └── ui/                # Componentes UI (shadcn)
├── lib/                    # Utilitários e configurações
│   ├── auth/              # Configuração NextAuth
│   ├── prisma.ts          # Cliente Prisma
│   └── utils.ts           # Utilitários gerais
├── prisma/                # Schema e migrations
│   ├── schema.prisma      # Schema do banco
│   └── seed.ts            # Dados iniciais
├── public/                # Arquivos estáticos
└── .env                   # Variáveis de ambiente
```

## 🎨 Páginas Públicas

### 1. **Home** (`/`)
- Hero section com CTA
- Diferenciais do escritório
- Áreas de atuação em destaque
- Artigos recentes
- CTA final

### 2. **Sobre** (`/sobre`)
- Biografia profissional
- Formação acadêmica
- Reconhecimentos
- Filosofia e valores
- Experiência profissional

### 3. **Áreas de Atuação** (`/areas-atuacao`)
- Direito Civil
- Direito Trabalhista
- Direito Empresarial
- Direito Imobiliário
- Direito Tributário
- Direito Contratual
- Direito do Consumidor
- Direito Bancário

### 4. **Artigos** (`/artigos`)
- Listagem de artigos publicados
- Filtro por categoria
- Página individual de artigo com Markdown

### 5. **Contato** (`/contato`)
- Formulário de contato funcional
- Informações de contato
- Mapa de localização

## 🔒 Painel Administrativo

Acesse: `/admin/login`

### Funcionalidades

1. **Dashboard**
   - Estatísticas gerais
   - Ações rápidas

2. **Gerenciamento de Artigos**
   - Criar, editar e excluir artigos
   - Editor Markdown
   - Upload de imagens de capa
   - Sistema de publicação (rascunho/publicado)
   - Categorização

3. **Gerenciamento de Categorias**
   - Criar e editar categorias
   - Slug automático

## 🗄️ Banco de Dados

### Modelos Principais

- **User**: Usuários do sistema (admin)
- **Article**: Artigos jurídicos
- **Category**: Categorias de artigos
- **Account/Session**: Tabelas do NextAuth

### Comandos Úteis

```bash
# Abrir Prisma Studio (GUI para o banco)
npm run db:studio

# Resetar o banco de dados
npx prisma db push --force-reset

# Gerar o Prisma Client
npm run db:generate
```

## 🎨 Customização

### Alterar Informações do Advogado

Edite os seguintes arquivos:

1. **Nome e OAB**
   - `/components/layout/Header.tsx`
   - `/components/layout/Footer.tsx`

2. **Informações de Contato**
   - `/components/layout/Footer.tsx`
   - `/app/contato/page.tsx`

3. **Biografia e Formação**
   - `/app/sobre/page.tsx`

4. **Metadata (SEO)**
   - `/app/layout.tsx`

### Cores e Tema

As cores do site estão definidas em:
- `/app/globals.css` - Variáveis CSS
- `/tailwind.config.ts` - Configuração Tailwind

Paleta atual:
- **Primary**: Azul (#3b82f6)
- **Background**: Branco/Cinza claro
- **Accent**: Tons de cinza

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:
- 📱 Mobile (< 768px)
- 💻 Tablet (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🔒 Segurança

- ✅ Autenticação com NextAuth
- ✅ Senhas com hash bcrypt
- ✅ Proteção de rotas com middleware
- ✅ Validação de formulários com Zod
- ✅ CSRF protection
- ✅ SQL injection prevention (Prisma)

## 🚀 Deploy

### Vercel (Recomendado)

1. Crie uma conta na [Vercel](https://vercel.com)
2. Conecte seu repositório
3. Configure as variáveis de ambiente
4. Deploy automático!

### Variáveis de Ambiente para Produção

```env
DATABASE_URL="seu-postgresql-url-de-producao"
NEXTAUTH_URL="https://seudominio.com"
NEXTAUTH_SECRET="chave-secreta-super-segura"
```

### Banco de Dados em Produção

Recomendações:
- [Neon](https://neon.tech) - PostgreSQL serverless
- [Supabase](https://supabase.com) - PostgreSQL com features extras
- [Railway](https://railway.app) - PostgreSQL managed

## 📝 Scripts Disponíveis

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Verifica código
npm run db:generate  # Gera Prisma Client
npm run db:push      # Atualiza schema do banco
npm run db:seed      # Popula banco com dados iniciais
npm run db:studio    # Abre Prisma Studio
```

## 🆘 Solução de Problemas

### Erro: Cannot find module '@prisma/client'

```bash
npm run db:generate
```

### Erro: Authentication failed

Certifique-se de que:
1. O DATABASE_URL está correto no `.env`
2. O PostgreSQL está rodando
3. O banco de dados foi criado

### Erro: NextAuth configuration

Verifique se:
1. `NEXTAUTH_URL` está correto
2. `NEXTAUTH_SECRET` foi definido

## 📚 Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## 📄 Licença

Este projeto é proprietário e confidencial.

## 👨‍💻 Desenvolvido com

- ❤️ Dedicação
- ☕ Muito café
- 🎯 Foco em qualidade
- ⚡ Performance

---

**Desenvolvido para Dr. João Silva Advocacia**
