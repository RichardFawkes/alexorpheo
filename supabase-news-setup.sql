-- Script SQL para criar tabela de Notícias no Supabase
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Criar tabela de Notícias
CREATE TABLE IF NOT EXISTS "News" (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    "coverImage" TEXT,
    category TEXT,
    tags TEXT[], -- Array de tags
    published BOOLEAN DEFAULT FALSE,
    featured BOOLEAN DEFAULT FALSE, -- Destaque na home
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "publishedAt" TIMESTAMP WITH TIME ZONE
);

-- 2. Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS "News_published_idx" ON "News"(published);
CREATE INDEX IF NOT EXISTS "News_slug_idx" ON "News"(slug);
CREATE INDEX IF NOT EXISTS "News_category_idx" ON "News"(category);
CREATE INDEX IF NOT EXISTS "News_featured_idx" ON "News"(featured);
CREATE INDEX IF NOT EXISTS "News_publishedAt_idx" ON "News"("publishedAt");

-- 3. Criar função para atualizar updatedAt automaticamente
CREATE OR REPLACE FUNCTION update_news_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Criar trigger para atualizar updatedAt
DROP TRIGGER IF EXISTS update_news_updated_at_trigger ON "News";
CREATE TRIGGER update_news_updated_at_trigger
    BEFORE UPDATE ON "News"
    FOR EACH ROW
    EXECUTE FUNCTION update_news_updated_at();

-- 5. Inserir notícias de exemplo
INSERT INTO "News" (
    title, 
    slug, 
    excerpt, 
    content, 
    category, 
    tags,
    published, 
    featured,
    "publishedAt", 
    "authorId"
)
VALUES
(
    'Nova Lei Trabalhista: O que muda para empresas e trabalhadores',
    'nova-lei-trabalhista-mudancas-2025',
    'Entenda as principais mudanças da nova legislação trabalhista que entra em vigor em 2025 e como isso afeta sua empresa.',
    '<h2>Principais Mudanças</h2><p>A nova legislação trabalhista traz importantes alterações que impactam tanto empresas quanto trabalhadores. Neste artigo, vamos detalhar cada uma dessas mudanças.</p><h3>1. Jornada de Trabalho</h3><p>As novas regras sobre jornada de trabalho flexível permitem maior autonomia para acordos entre empregador e empregado.</p><h3>2. Home Office</h3><p>Regulamentação específica para trabalho remoto, incluindo direitos e deveres de ambas as partes.</p><h3>3. Férias</h3><p>Novas possibilidades de fracionamento de férias e negociação de períodos.</p>',
    'Direito Trabalhista',
    ARRAY['trabalhista', 'legislação', 'empresas', 'direitos'],
    true,
    true,
    CURRENT_TIMESTAMP,
    'admin'
),
(
    'Direitos do Consumidor: Como se proteger em compras online',
    'direitos-consumidor-compras-online',
    'Conheça seus direitos ao fazer compras pela internet e saiba como agir em caso de problemas.',
    '<h2>Seus Direitos nas Compras Online</h2><p>O Código de Defesa do Consumidor garante proteção especial para compras realizadas pela internet.</p><h3>Direito de Arrependimento</h3><p>Você tem até 7 dias para desistir da compra sem precisar justificar.</p><h3>Prazo de Entrega</h3><p>O fornecedor deve cumprir o prazo informado ou oferecer alternativas.</p><h3>Produto Defeituoso</h3><p>Saiba como proceder quando o produto apresenta defeitos.</p>',
    'Direito do Consumidor',
    ARRAY['consumidor', 'e-commerce', 'direitos', 'internet'],
    true,
    true,
    CURRENT_TIMESTAMP,
    'admin'
),
(
    'Planejamento Sucessório: Proteja seu patrimônio familiar',
    'planejamento-sucessorio-patrimonio-familiar',
    'Entenda a importância do planejamento sucessório e como ele pode evitar conflitos familiares no futuro.',
    '<h2>O que é Planejamento Sucessório?</h2><p>O planejamento sucessório é um conjunto de estratégias jurídicas para organizar a transmissão de patrimônio.</p><h3>Benefícios</h3><ul><li>Redução de impostos</li><li>Evita conflitos familiares</li><li>Agiliza processos</li><li>Protege o patrimônio</li></ul><h3>Instrumentos Utilizados</h3><p>Testamento, doação, holding familiar e previdência privada são algumas das ferramentas disponíveis.</p>',
    'Direito Civil',
    ARRAY['sucessão', 'família', 'patrimônio', 'planejamento'],
    true,
    false,
    CURRENT_TIMESTAMP,
    'admin'
)
ON CONFLICT (slug) DO NOTHING;

-- 6. Habilitar RLS (Row Level Security)
ALTER TABLE "News" ENABLE ROW LEVEL SECURITY;

-- 7. Criar políticas de acesso
-- Todos podem ver notícias publicadas
CREATE POLICY "Public can view published news"
ON "News" FOR SELECT
TO public
USING (published = true);

-- Admins podem fazer tudo (ajuste conforme sua autenticação)
CREATE POLICY "Admins full access to news"
ON "News" FOR ALL
TO authenticated
USING (true);

-- 8. Comentários úteis
COMMENT ON TABLE "News" IS 'Tabela de notícias do site';
COMMENT ON COLUMN "News".featured IS 'Define se a notícia aparece em destaque na home';
COMMENT ON COLUMN "News".tags IS 'Array de tags para categorização e busca';

