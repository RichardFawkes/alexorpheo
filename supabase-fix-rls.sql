-- Script para corrigir políticas RLS da tabela News
-- Execute este script se as notícias não estiverem aparecendo

-- 1. Remover políticas existentes
DROP POLICY IF EXISTS "Public can view published news" ON "News";
DROP POLICY IF EXISTS "Admins full access to news" ON "News";

-- 2. Criar política mais permissiva para leitura pública
CREATE POLICY "Anyone can view published news"
ON "News" FOR SELECT
USING (published = true);

-- 3. Criar política para usuários autenticados (admin)
CREATE POLICY "Authenticated users full access"
ON "News" FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. Criar política para inserção anônima (caso precise testar)
CREATE POLICY "Service role full access"
ON "News" FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

