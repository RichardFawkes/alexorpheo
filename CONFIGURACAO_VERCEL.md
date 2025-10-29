# 🚀 Configuração de Variáveis de Ambiente na Vercel

## ✅ **URL Dinâmica - Configuração Automática**

O projeto agora detecta automaticamente a URL correta baseada no ambiente:

- **Desenvolvimento:** `http://localhost:3000`
- **Preview (Vercel):** `https://seu-projeto-git-branch.vercel.app`
- **Produção (Vercel):** `https://seu-dominio.com.br` ou `https://seu-projeto.vercel.app`

## 📋 **Variáveis Obrigatórias na Vercel**

### **1. NextAuth**

```env
NEXTAUTH_SECRET=seu-secret-gerado-aqui
```

**Como gerar o secret:**
```bash
openssl rand -base64 32
```

**NEXTAUTH_URL é OPCIONAL!** O sistema detecta automaticamente via `VERCEL_URL`.

---

### **2. Supabase**

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Onde encontrar:**
1. Acesse: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

---

## 🔧 **Como Adicionar na Vercel**

### **Passo 1: Acessar Configurações**
1. Vá para: https://vercel.com/dashboard
2. Selecione seu projeto
3. Clique em **Settings**
4. Clique em **Environment Variables**

### **Passo 2: Adicionar Variáveis**
Para cada variável:
1. Clique em **Add New**
2. Preencha:
   - **Name:** Nome da variável (ex: `NEXTAUTH_SECRET`)
   - **Value:** Valor da variável
   - **Environment:** Selecione **Production**, **Preview** e **Development**
3. Clique em **Save**

### **Passo 3: Fazer Redeploy**
1. Vá em **Deployments**
2. Clique nos 3 pontinhos do último deploy
3. Clique em **Redeploy**

---

## ✨ **Vantagens da Configuração Dinâmica**

✅ **Não precisa configurar `NEXTAUTH_URL`** - detecta automaticamente  
✅ **Funciona em todos os ambientes** - dev, preview, produção  
✅ **URLs de compartilhamento corretas** - sempre usa a URL atual  
✅ **Sem hardcode** - não precisa alterar código ao mudar domínio  

---

## 🔍 **Verificar se Está Funcionando**

### **Teste 1: Admin Login**
```
https://seu-dominio.com.br/admin
```
Deve redirecionar para `/admin/login` sem erros de localhost.

### **Teste 2: Compartilhamento de Notícias**
```
https://seu-dominio.com.br/noticias/slug-da-noticia
```
Os botões de compartilhar devem usar a URL correta do seu domínio.

---

## 🆘 **Troubleshooting**

### **Problema: Ainda redireciona para localhost**
**Solução:** Faça um redeploy completo após adicionar as variáveis.

### **Problema: Erro de autenticação**
**Solução:** Verifique se `NEXTAUTH_SECRET` está configurado corretamente.

### **Problema: Notícias não aparecem**
**Solução:** Verifique se as variáveis do Supabase estão corretas.

---

## 📝 **Checklist Final**

- [ ] `NEXTAUTH_SECRET` configurado na Vercel
- [ ] `NEXT_PUBLIC_SUPABASE_URL` configurado
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` configurado
- [ ] `SUPABASE_SERVICE_ROLE_KEY` configurado
- [ ] Redeploy feito após adicionar variáveis
- [ ] Teste de login no `/admin` funcionando
- [ ] Notícias aparecendo na home e em `/noticias`

---

**Pronto! Seu site está configurado para funcionar perfeitamente em produção! 🎉**

