# 🚀 Deploy na Vercel - Guia Completo

## ✅ Por que vai funcionar?

O projeto **ESTÁ PRONTO** para deploy na Vercel! O `postinstall` script no `package.json` garante que o Prisma Client será gerado automaticamente durante o build.

---

## 📋 Passo a Passo

### 1. Criar Banco de Dados (PostgreSQL)

**Opção A: Neon (RECOMENDADO - GRÁTIS)** ⭐

1. Acesse: https://neon.tech
2. Crie uma conta (grátis)
3. Clique em **"Create Project"**
4. Escolha uma região (ex: US East)
5. Copie a **Connection String**
   - Exemplo: `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`

**Opção B: Supabase (GRÁTIS)**

1. Acesse: https://supabase.com
2. Crie um projeto
3. Vá em Settings → Database
4. Copie a "Connection String" (modo "Transaction")

**Opção C: Railway**

1. Acesse: https://railway.app
2. New Project → Provision PostgreSQL
3. Copie a DATABASE_URL

---

### 2. Deploy na Vercel

#### 2.1. Fazer Push do Código

Se ainda não fez, certifique-se de que o código está no GitHub:

```bash
git add .
git commit -m "feat: site completo pronto para deploy"
git push origin main
```

#### 2.2. Importar na Vercel

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em **"Add New..." → "Project"**
4. Selecione seu repositório `alexorpheo`
5. Clique em **"Import"**

#### 2.3. Configurar Variáveis de Ambiente

Na tela de configuração do projeto, antes de fazer deploy:

1. Expanda **"Environment Variables"**
2. Adicione as seguintes variáveis:

**DATABASE_URL**
```
postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require
```
*(Cole a connection string do Neon/Supabase)*

**NEXTAUTH_URL**
```
https://seu-site.vercel.app
```
*(Deixe em branco por enquanto, vai atualizar depois)*

**NEXTAUTH_SECRET**
```bash
# Gere uma chave secreta segura
openssl rand -base64 32
```
*(Cole a chave gerada aqui)*

3. Clique em **"Deploy"**

---

### 3. Configurar Banco de Dados

Após o primeiro deploy:

#### 3.1. Atualizar NEXTAUTH_URL

1. Na Vercel, vá em **Settings → Environment Variables**
2. Edite `NEXTAUTH_URL` e coloque sua URL real:
   ```
   https://seu-projeto.vercel.app
   ```
3. Salve e faça **Redeploy**

#### 3.2. Criar Tabelas no Banco

**Opção A: Localmente (RECOMENDADO)**

```bash
# No seu computador, com o DATABASE_URL de produção no .env
npm run db:push
npm run db:seed
```

**Opção B: Via Neon Dashboard**

1. Acesse o Neon Dashboard
2. Vá em "SQL Editor"
3. Execute o schema do Prisma manualmente
   *(não recomendado, use a Opção A)*

---

### 4. Acessar o Site

✅ **Site Público:** `https://seu-projeto.vercel.app`

✅ **Painel Admin:** `https://seu-projeto.vercel.app/admin/login`

**Credenciais padrão (após seed):**
- E-mail: `admin@joaosilva.adv.br`
- Senha: `admin123`

⚠️ **IMPORTANTE:** Altere as credenciais após primeiro acesso!

---

## 🔧 Configurações Avançadas

### Build & Development Settings

A Vercel detecta automaticamente, mas se precisar:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

### Variáveis de Ambiente para Todos os Ambientes

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://seu-projeto.vercel.app
NEXTAUTH_SECRET=sua-chave-secreta-super-segura
```

---

## 🐛 Solução de Problemas

### Erro: "Prisma Client not generated"

**Solução:** O script `postinstall` deve resolver isso automaticamente.

Se não funcionar:
1. Vá em Vercel → Settings → General
2. Em "Build & Development Settings"
3. Adicione em "Install Command":
   ```bash
   npm install && npx prisma generate
   ```

### Erro: "Can't reach database server"

**Solução:** 
1. Verifique se a `DATABASE_URL` está correta
2. Certifique-se de que inclui `?sslmode=require` no final
3. Teste a conexão localmente primeiro

### Erro: "NEXTAUTH_SECRET is not set"

**Solução:**
1. Gere uma nova chave: `openssl rand -base64 32`
2. Adicione em Environment Variables
3. Redeploy

### Erro: "Database table not found"

**Solução:**
Execute localmente com a DATABASE_URL de produção:
```bash
npm run db:push
```

---

## 🔒 Segurança em Produção

### 1. Alterar Senha do Admin

Após primeiro acesso:
1. Faça login no `/admin/login`
2. Crie um novo usuário com senha forte
3. Delete ou altere o usuário padrão

### 2. Atualizar NEXTAUTH_SECRET

Nunca use a mesma secret em dev e produção:
```bash
openssl rand -base64 32
```

### 3. Configurar CORS (se necessário)

Para API routes, adicione em `next.config.ts`:
```typescript
headers: async () => [
  {
    source: '/api/:path*',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: 'https://seudominio.com' },
    ],
  },
]
```

---

## 📊 Monitoramento

### Analytics (Opcional)

Na Vercel, ative:
- **Vercel Analytics** (gratuito)
- **Speed Insights** (gratuito)

### Logs

Acesse logs em tempo real:
1. Vercel Dashboard → Seu Projeto
2. Aba **"Logs"**

---

## 🎯 Checklist Final

Antes de considerar o deploy completo:

- [ ] Banco de dados criado (Neon/Supabase)
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] NEXTAUTH_URL atualizada com URL real
- [ ] Tabelas criadas (`npm run db:push`)
- [ ] Dados seed inseridos (`npm run db:seed`)
- [ ] Site público acessível
- [ ] Login admin funcionando
- [ ] Senha do admin alterada
- [ ] Custom domain configurado (opcional)

---

## 🌐 Custom Domain (Opcional)

Para usar seu próprio domínio:

1. Na Vercel → Settings → Domains
2. Adicione seu domínio: `www.advogadojoaosilva.com.br`
3. Configure os DNS (Vercel vai mostrar as instruções)
4. Atualize `NEXTAUTH_URL` com seu domínio
5. Redeploy

---

## 📈 Próximos Passos

Após deploy:

1. **Testar tudo** - Navegue por todas as páginas
2. **Personalizar conteúdo** - Edite textos, imagens, informações
3. **Criar artigos** - Use o painel admin
4. **SEO** - Adicione Google Analytics, Search Console
5. **Performance** - Otimize imagens
6. **Backup** - Configure backup do banco Neon

---

## ✨ Resumo

**O projeto está 100% pronto para Vercel!**

1. ✅ Build configurado
2. ✅ Prisma vai gerar automaticamente (`postinstall`)
3. ✅ Next.js 16 otimizado
4. ✅ TypeScript sem erros
5. ✅ Todas dependências compatíveis

**Tempo estimado de deploy:** 5-10 minutos

**Custo:** R$ 0,00 (Vercel + Neon grátis)

---

**Dúvidas?** Consulte a documentação oficial:
- Vercel: https://vercel.com/docs
- Neon: https://neon.tech/docs
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs

**Bom deploy! 🚀**
