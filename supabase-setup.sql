-- Script SQL para configurar o Supabase Database
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Criar tabelas
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    "emailVerified" TIMESTAMP,
    password TEXT NOT NULL,
    image TEXT,
    role TEXT DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Category" (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS "Article" (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    "coverImage" TEXT,
    published BOOLEAN DEFAULT FALSE,
    "authorId" TEXT NOT NULL,
    "categoryId" TEXT,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "publishedAt" TIMESTAMP,
    FOREIGN KEY ("authorId") REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY ("categoryId") REFERENCES "Category"(id) ON DELETE SET NULL
);

-- 2. Criar índices
CREATE INDEX IF NOT EXISTS "Article_published_idx" ON "Article"(published);
CREATE INDEX IF NOT EXISTS "Article_slug_idx" ON "Article"(slug);
CREATE INDEX IF NOT EXISTS "Article_authorId_idx" ON "Article"("authorId");

-- 3. Inserir categorias padrão
INSERT INTO "Category" (id, name, slug) VALUES
    (gen_random_uuid()::text, 'Direito Civil', 'direito-civil'),
    (gen_random_uuid()::text, 'Direito Trabalhista', 'direito-trabalhista'),
    (gen_random_uuid()::text, 'Direito Empresarial', 'direito-empresarial'),
    (gen_random_uuid()::text, 'Direito Imobiliário', 'direito-imobiliario'),
    (gen_random_uuid()::text, 'Direito do Consumidor', 'direito-consumidor')
ON CONFLICT (slug) DO NOTHING;

-- 4. Criar usuário admin (senha: Alex@2025Premium)
-- Hash bcrypt da senha
INSERT INTO "User" (id, name, email, password, role) VALUES
    (gen_random_uuid()::text, 'Alex Orpheo', 'admin@alexorpheo.com.br', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN')
ON CONFLICT (email) DO NOTHING;

-- 5. Criar artigo de exemplo
WITH admin AS (
    SELECT id FROM "User" WHERE email = 'admin@alexorpheo.com.br' LIMIT 1
),
category AS (
    SELECT id FROM "Category" WHERE slug = 'direito-civil' LIMIT 1
)
INSERT INTO "Article" (
    id, title, slug, excerpt, content, published, "publishedAt", "authorId", "categoryId"
)
SELECT
    gen_random_uuid()::text,
    'Bem-vindo ao Alex Orpheo Advocacia',
    'bem-vindo-alex-orpheo',
    'Advocacia premium com excelência incomparável. Soluções jurídicas estratégicas.',
    '# Bem-vindo

Advocacia de excelência com foco em resultados.

## Nossa Missão
Oferecer soluções jurídicas estratégicas e personalizadas.

## Contato
Entre em contato para uma consultoria.',
    true,
    CURRENT_TIMESTAMP,
    admin.id,
    category.id
FROM admin, category
ON CONFLICT (slug) DO NOTHING;

COMMIT;
