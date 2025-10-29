-- Script SQL para criar as tabelas no Supabase
-- Execute este script no SQL Editor do Supabase Dashboard
-- https://supabase.com/dashboard/project/nnglymnadwhrskmqqkya/sql/new

-- 1. Criar extensão para gerar UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Criar tabela de Categorias
CREATE TABLE IF NOT EXISTS "Category" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. Criar tabela de Artigos
CREATE TABLE IF NOT EXISTS "Article" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    "coverImage" TEXT,
    published BOOLEAN DEFAULT FALSE,
    "authorId" TEXT NOT NULL,
    "categoryId" UUID,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "publishedAt" TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY ("categoryId") REFERENCES "Category"(id) ON DELETE SET NULL
);

-- 4. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS "Article_published_idx" ON "Article"(published);
CREATE INDEX IF NOT EXISTS "Article_slug_idx" ON "Article"(slug);
CREATE INDEX IF NOT EXISTS "Article_authorId_idx" ON "Article"("authorId");
CREATE INDEX IF NOT EXISTS "Article_categoryId_idx" ON "Article"("categoryId");

-- 5. Criar função para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 6. Criar triggers para atualizar updatedAt
DROP TRIGGER IF EXISTS update_article_updated_at ON "Article";
CREATE TRIGGER update_article_updated_at
    BEFORE UPDATE ON "Article"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_category_updated_at ON "Category";
CREATE TRIGGER update_category_updated_at
    BEFORE UPDATE ON "Category"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. Inserir categorias padrão
INSERT INTO "Category" (name, slug) VALUES
    ('Direito Civil', 'direito-civil'),
    ('Direito Trabalhista', 'direito-trabalhista'),
    ('Direito Empresarial', 'direito-empresarial'),
    ('Direito Imobiliário', 'direito-imobiliario'),
    ('Direito do Consumidor', 'direito-consumidor'),
    ('Direito de Família', 'direito-familia')
ON CONFLICT (slug) DO NOTHING;

-- 8. Habilitar RLS (Row Level Security) - IMPORTANTE!
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Article" ENABLE ROW LEVEL SECURITY;

-- 9. Criar políticas de acesso para Category
-- Permitir leitura pública
CREATE POLICY "Public can read categories"
ON "Category" FOR SELECT
USING (true);

-- Permitir insert/update/delete apenas para usuários autenticados
CREATE POLICY "Authenticated users can insert categories"
ON "Category" FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update categories"
ON "Category" FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete categories"
ON "Category" FOR DELETE
USING (auth.role() = 'authenticated');

-- 10. Criar políticas de acesso para Article
-- Permitir leitura pública apenas de artigos publicados
CREATE POLICY "Public can read published articles"
ON "Article" FOR SELECT
USING (published = true OR auth.role() = 'authenticated');

-- Permitir insert/update/delete apenas para usuários autenticados
CREATE POLICY "Authenticated users can insert articles"
ON "Article" FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update articles"
ON "Article" FOR UPDATE
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete articles"
ON "Article" FOR DELETE
USING (auth.role() = 'authenticated');

-- 11. Criar artigo de exemplo (opcional)
-- Descomente as linhas abaixo se quiser um artigo de exemplo
/*
INSERT INTO "Article" (
    title, 
    slug, 
    excerpt, 
    content, 
    published, 
    "publishedAt", 
    "authorId", 
    "categoryId"
)
SELECT 
    'Bem-vindo ao Blog Jurídico',
    'bem-vindo-ao-blog-juridico',
    'Este é o primeiro artigo do nosso blog. Aqui você encontrará análises e artigos sobre diversos temas jurídicos.',
    '# Bem-vindo ao Blog Jurídico

Este é o primeiro artigo do nosso blog. Aqui você encontrará análises e artigos sobre diversos temas jurídicos.

## Nossa Missão

Compartilhar conhecimento jurídico de forma acessível e clara.

## Temas Abordados

- Direito Civil
- Direito Trabalhista
- Direito Empresarial
- E muito mais!

Fique atento às próximas publicações!',
    true,
    CURRENT_TIMESTAMP,
    (SELECT id FROM auth.users LIMIT 1),
    (SELECT id FROM "Category" WHERE slug = 'direito-civil' LIMIT 1)
WHERE EXISTS (SELECT 1 FROM auth.users LIMIT 1);
*/

-- Pronto! As tabelas foram criadas com sucesso.
-- Agora você pode criar artigos através do painel admin.

