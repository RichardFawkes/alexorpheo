# 🚀 Guia Rápido de Instalação

## Passos para Rodar o Projeto

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar o Banco de Dados

**Opção A: PostgreSQL Local**

Se você tem PostgreSQL instalado localmente:

```bash
# Edite o .env com suas credenciais
DATABASE_URL="postgresql://usuario:senha@localhost:5432/advogado_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
```

**Opção B: Usar Neon (PostgreSQL Serverless - GRÁTIS)**

1. Crie uma conta em https://neon.tech
2. Crie um novo projeto
3. Copie a connection string
4. Cole no `.env`:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
```

**Gerar chave secreta:**
```bash
openssl rand -base64 32
```

### 3. Inicializar o Banco de Dados

```bash
# Criar as tabelas
npm run db:push

# Popular com dados iniciais (admin + artigo exemplo)
npm run db:seed
```

### 4. Iniciar o Servidor

```bash
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🔐 Login no Painel Admin

Após executar o seed, acesse:

**URL:** http://localhost:3000/admin/login

**Credenciais:**
- E-mail: `admin@joaosilva.adv.br`
- Senha: `admin123`

⚠️ **Importante:** Altere essas credenciais após o primeiro acesso!

---

## 📝 Comandos Úteis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run db:push      # Atualizar banco de dados
npm run db:seed      # Popular com dados iniciais
npm run db:studio    # Abrir interface do Prisma Studio
```

---

## ❓ Problemas Comuns

### Erro: Cannot connect to database

**Solução:** Verifique se:
- O PostgreSQL está rodando
- A DATABASE_URL no `.env` está correta
- O banco de dados existe

### Erro: Prisma Client not generated

**Solução:**
```bash
npm run db:generate
```

### Erro: NEXTAUTH_SECRET is not set

**Solução:**
```bash
# Gere uma chave secreta
openssl rand -base64 32

# Adicione ao .env
NEXTAUTH_SECRET="chave-gerada-aqui"
```

---

## 🌐 Deploy na Vercel

1. Crie conta na Vercel: https://vercel.com
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `DATABASE_URL` (use Neon ou Supabase)
   - `NEXTAUTH_URL` (sua URL de produção)
   - `NEXTAUTH_SECRET` (chave secreta)
4. Deploy automático!

---

## 🎨 Personalização Rápida

### Alterar Nome e OAB do Advogado

Edite estes arquivos:
- `components/layout/Header.tsx` (linha 24)
- `components/layout/Footer.tsx` (linha 15)
- `app/sobre/page.tsx` (linha 23)

### Alterar Informações de Contato

Edite:
- `components/layout/Footer.tsx` (linhas 84-98)
- `app/contato/page.tsx` (linhas 57-103)

### Alterar Cores do Site

Edite `app/globals.css` (linhas 10-23) para mudar as cores:
```css
--primary: 221 83% 53%;  /* Cor principal (azul) */
--secondary: 210 40% 96.1%;  /* Cor secundária (cinza claro) */
```

---

## ✅ O que está funcionando

✅ Página Home completa
✅ Página Sobre
✅ Página Áreas de Atuação
✅ Página Artigos (com suporte a Markdown)
✅ Página Contato com formulário
✅ Painel Admin com login
✅ Dashboard administrativo
✅ Sistema de autenticação NextAuth
✅ Banco de dados com Prisma
✅ Design responsivo

---

## 📚 Próximos Passos

1. **Criar CRUD completo de artigos no admin** (estrutura já criada)
2. **Adicionar upload de imagens** para artigos
3. **Configurar envio de e-mail** no formulário de contato
4. **Adicionar animações** com Framer Motion
5. **Implementar dark mode**

---

## 🆘 Suporte

Consulte o arquivo `README.md` para documentação completa.

Se precisar de ajuda:
1. Verifique se todas as dependências estão instaladas
2. Confirme que o banco de dados está configurado
3. Revise o arquivo `.env`
4. Limpe o cache: `rm -rf .next && npm run dev`

**Bom desenvolvimento! 🚀**
