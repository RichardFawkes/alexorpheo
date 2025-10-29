# 🚀 Como Visualizar as Melhorias do Site

## Passo a Passo para Rodar o Projeto

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Rodar o Servidor de Desenvolvimento
```bash
npm run dev
```

### 3️⃣ Abrir no Navegador
Acesse: **http://localhost:3000**

---

## 📱 O Que Você Verá

### Página Inicial (/)
✨ **Hero Section Premium**
- Fundo gradiente escuro elegante
- Nome "Alex Orpheo" em destaque com fonte serif
- Badge com OAB/SP
- 2 CTAs: "Agendar Consultoria Gratuita" e "Conhecer o Advogado"
- 3 trust indicators em cards

✨ **Seção Sobre**
- Layout em 2 colunas (imagem + conteúdo)
- Placeholder profissional com ícone da balança
- Biografia destacando experiência
- 4 highlights em cards

✨ **Seção de Valores**
- Fundo escuro com 4 cards
- Ícones em destaque
- Hover effects suaves

✨ **Áreas de Atuação**
- 6 áreas principais em cards
- Tags de especialidades
- Hover com borda dourada

✨ **Depoimentos**
- 3 depoimentos com 5 estrelas
- Avatar com inicial do nome
- Design em cards elegantes

✨ **CTA Final**
- Fundo gradiente escuro
- 2 botões de ação
- Informações de contato

---

## 🎨 Elementos Visuais Principais

### Cores
- **Dourado/Âmbar**: #F59E0B (botões, destaques)
- **Cinza Escuro**: #0F172A (fundos premium)
- **Branco**: Textos e elementos claros

### Fontes
- **Playfair Display**: Títulos e nome (serif)
- **Inter**: Textos e navegação (sans-serif)

### Animações
- Fade in ao rolar a página
- Hover effects em cards e botões
- Scroll indicator animado

---

## 📋 Checklist de Verificação

Ao visualizar o site, verifique:

- [ ] Hero section com gradiente escuro e elementos dourados
- [ ] Animações suaves ao rolar a página
- [ ] Header fixo que muda ao rolar
- [ ] Logo com ícone da balança em gradiente dourado
- [ ] Seção "Sobre" com placeholder de imagem
- [ ] 6 áreas de atuação com tags
- [ ] 3 depoimentos com estrelas
- [ ] Footer completo com newsletter
- [ ] Responsividade em mobile (redimensione a janela)
- [ ] Hover effects em todos os cards e botões

---

## 🔧 Ajustes Personalizados

### Alterar Informações de Contato

**Arquivo**: `app/page.tsx` e `components/layout/Footer.tsx`

Procure por:
- `(11) 99999-9999` → Seu telefone
- `contato@alexorpheo.adv.br` → Seu e-mail
- `OAB/SP 123.456` → Seu número OAB

### Adicionar Foto Real

**Arquivo**: `app/page.tsx` (linha ~180)

Substitua o placeholder por:
```tsx
<Image
  src="/alex-orpheo.jpg"
  alt="Alex Orpheo - Advogado"
  fill
  className="object-cover"
/>
```

### Alterar Cores

**Arquivo**: `tailwind.config.ts`

Modifique as cores primárias se desejar outra paleta.

---

## 📱 Testar Responsividade

### No Navegador
1. Abra as DevTools (F12)
2. Clique no ícone de dispositivo móvel
3. Teste em diferentes tamanhos:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1920px)

### Verificar
- [ ] Menu mobile funciona
- [ ] Cards se reorganizam em colunas
- [ ] Textos são legíveis
- [ ] Botões são clicáveis
- [ ] Imagens se ajustam

---

## 🎯 Próximos Passos

1. **Revisar Conteúdo**: Ajustar textos conforme necessário
2. **Adicionar Fotos**: Substituir placeholders por imagens reais
3. **Testar Links**: Verificar se todos os links funcionam
4. **Otimizar SEO**: Ajustar meta tags conforme necessário
5. **Deploy**: Publicar em produção (Vercel recomendado)

---

## 💡 Dicas

- **Performance**: O site está otimizado, mas adicione imagens em formato WebP
- **Acessibilidade**: Todas as cores têm contraste adequado
- **SEO**: Meta tags já estão configuradas
- **Analytics**: Adicione Google Analytics para tracking

---

## 🆘 Problemas Comuns

### Erro ao instalar dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

### Porta 3000 já em uso
```bash
npm run dev -- -p 3001
```

### Animações não funcionam
Verifique se o Framer Motion está instalado:
```bash
npm install framer-motion
```

---

**Aproveite seu novo site! 🎉**

