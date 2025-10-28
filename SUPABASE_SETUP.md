# 🚀 Configuração do Supabase

## 📋 Passo a Passo

### 1. **Criar Banco de Dados**

1. Acesse o **Supabase Dashboard**: https://supabase.com/dashboard
2. Vá para seu projeto: **nnglymnadwhrskmqqkya**
3. Clique em **SQL Editor** no menu lateral
4. Copie e cole o conteúdo do arquivo `supabase-setup.sql`
5. Clique em **RUN** para executar o script

**O script vai criar:**
- ✅ Tabelas: User, Category, Article
- ✅ Índices otimizados
- ✅ 5 categorias padrão
- ✅ Usuário admin
- ✅ Artigo de exemplo

---

### 2. **Configurar Storage**

1. No Supabase Dashboard, vá em **Storage**
2. Clique em **Create a new bucket**
3. Configure:
   - **Name:** `articles`
   - **Public bucket:** ✅ Marque como público
   - Click **Create bucket**

4. Configurar políticas de acesso:
   - Clique no bucket `articles`
   - Vá em **Policies**
   - Adicione as seguintes políticas:

**Política 1: Public Read**
```sql
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'articles');
```

**Política 2: Authenticated Upload**
```sql
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'articles');
```

**Política 3: Authenticated Delete**
```sql
CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'articles');
```

---

### 3. **Obter API Keys**

1. Vá em **Settings → API**
2. Copie as seguintes chaves:

**Project URL:**
```
https://nnglymnadwhrskmqqkya.supabase.co
```

**anon/public key:** (já está no .env)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**service_role key:** (copie e adicione no .env)
```
SUPABASE_SERVICE_ROLE_KEY="sua-service-role-key-aqui"
```

---

### 4. **Atualizar .env**

O arquivo `.env` já está configurado com:

```env
DATABASE_URL="postgresql://postgres:TVMhZ2aUTv8J1V1l@db.nnglymnadwhrskmqqkya.supabase.co:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL="https://nnglymnadwhrskmqqkya.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[copie-do-dashboard]"

ADMIN_USER="admin@alexorpheo.com.br"
ADMIN_PASSWORD="Alex@2025Premium"
```

**IMPORTANTE:** Substitua o `NEXT_PUBLIC_SUPABASE_ANON_KEY` pela key real do dashboard!

---

### 5. **Testar Conexão**

```bash
# Instalar dependências
npm install

# Testar conexão com banco
npm run db:push

# Rodar projeto
npm run dev
```

Acesse:
- **Site:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login

**Credenciais:**
- E-mail: `admin@alexorpheo.com.br`
- Senha: `Alex@2025Premium`

---

## 🗂️ Estrutura do Storage

```
articles/
└── images/
    ├── 1234567890-abc123.jpg
    ├── 1234567891-def456.png
    └── ...
```

**URLs das imagens:**
```
https://nnglymnadwhrskmqqkya.supabase.co/storage/v1/object/public/articles/images/nome-arquivo.jpg
```

---

## 🔐 Políticas de Segurança (RLS)

### Tabela User
```sql
-- Apenas admins podem ver users
CREATE POLICY "Admins can view users"
ON "User" FOR SELECT
TO authenticated
USING (auth.uid() IN (SELECT id::uuid FROM "User" WHERE role = 'ADMIN'));
```

### Tabela Article
```sql
-- Todos podem ver artigos publicados
CREATE POLICY "Public can view published articles"
ON "Article" FOR SELECT
TO public
USING (published = true);

-- Admins podem fazer tudo
CREATE POLICY "Admins full access"
ON "Article" FOR ALL
TO authenticated
USING (auth.uid() IN (SELECT id::uuid FROM "User" WHERE role = 'ADMIN'));
```

### Tabela Category
```sql
-- Todos podem ver categorias
CREATE POLICY "Public can view categories"
ON "Category" FOR SELECT
TO public
USING (true);
```

---

## ✅ Checklist

- [ ] Executar `supabase-setup.sql` no SQL Editor
- [ ] Criar bucket `articles` no Storage
- [ ] Configurar políticas do Storage (public read, auth upload/delete)
- [ ] Copiar `anon key` do dashboard para `.env`
- [ ] (Opcional) Copiar `service_role key` para `.env`
- [ ] Rodar `npm install`
- [ ] Testar login admin
- [ ] Criar um artigo de teste com imagem

---

## 🐛 Solução de Problemas

### Erro: "Failed to fetch"
- ✅ Verifique se as keys no `.env` estão corretas
- ✅ Confirme que o bucket `articles` existe e é público

### Erro: "Permission denied"
- ✅ Configure as políticas do Storage (passo 2.4)
- ✅ Verifique se RLS está habilitado

### Erro: "Bucket not found"
- ✅ Crie o bucket `articles` no dashboard
- ✅ Marque como público

### Upload não funciona
- ✅ Verifique tamanho do arquivo (máx 5MB)
- ✅ Verifique formato (JPG, PNG, WEBP, GIF)
- ✅ Confirme que políticas de INSERT estão configuradas

---

## 📚 Recursos

- [Supabase Dashboard](https://supabase.com/dashboard/project/nnglymnadwhrskmqqkya)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)

---

**Projeto:** Alex Orpheo Advocacia  
**Database:** PostgreSQL (Supabase)  
**Storage:** Supabase Storage (S3)  
**Auth:** NextAuth + Supabase

🚀 **Pronto para uso!**
