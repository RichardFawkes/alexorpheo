# 📋 DADOS DO SITE - ALEX ORPHEO ADVOCACIA

Este documento contém todas as informações coletadas do site antigo e os dados que precisam ser preenchidos.

---

## ✅ INFORMAÇÕES JÁ CONFIGURADAS

### 📍 **Endereço**
- **Logradouro:** Av. Juscelino K. de Oliveira, 571
- **Bairro:** Centro
- **Cidade:** Juquitiba
- **Estado:** SP
- **CEP:** 06950-000 *(verificar se está correto)*

### 📱 **Redes Sociais**
- **Instagram:** [@alex_orpheo](https://www.instagram.com/alex_orpheo/)
- **LinkedIn:** [Alex de Melo Orphêo](https://br.linkedin.com/in/alexorpheo)
- **Facebook:** *(URL precisa ser adicionada)*

### 👨‍⚖️ **Informações do Advogado**
- **Nome Completo:** Alex de Melo Orphêo
- **Nome de Exibição:** Alex Orpheo
- **Formação:** Pós-graduado em Trabalho e Processo pelo Mackenzie
- **Título:** Magistrando

---

## ⚠️ DADOS QUE PRECISAM SER PREENCHIDOS

### 🔴 **URGENTE - Editar o arquivo `lib/constants/site-config.ts`**

#### 1. **Número da OAB**
```typescript
oab: "OAB/SP 123.456", // ⚠️ SUBSTITUIR PELO NÚMERO REAL
```

#### 2. **Telefones**
```typescript
telefone: {
  principal: "(11) 99999-9999", // ⚠️ SUBSTITUIR PELO TELEFONE REAL
  whatsapp: "5511999999999",    // ⚠️ SUBSTITUIR (formato: 55 + DDD + número sem espaços)
  secundario: "",                // OPCIONAL
},
```

#### 3. **CEP**
```typescript
cep: "06950-000", // ⚠️ VERIFICAR SE ESTÁ CORRETO
```

#### 4. **URL do Google Maps**
```typescript
googleMapsUrl: "https://maps.google.com/?q=...", // ⚠️ ADICIONAR URL REAL
```
**Como obter:**
1. Acesse [Google Maps](https://maps.google.com)
2. Busque: "Av. Juscelino K. de Oliveira, 571, Juquitiba, SP"
3. Clique em "Compartilhar" → "Copiar link"
4. Cole o link no arquivo

#### 5. **Facebook**
```typescript
facebook: {
  url: "https://www.facebook.com/alexorpheo", // ⚠️ ADICIONAR URL REAL
  usuario: "alexorpheo",
},
```

#### 6. **Ano de Fundação**
```typescript
anoFundacao: 2008, // ⚠️ SUBSTITUIR PELO ANO REAL DE FUNDAÇÃO DO ESCRITÓRIO
```

---

## 📂 ARQUIVOS CRIADOS/ATUALIZADOS

### ✅ **Arquivos de Configuração**
1. **`lib/constants/site-config.ts`** - Configurações centralizadas do site
2. **`lib/constants/areas-atuacao.ts`** - Áreas de atuação e serviços

### ✅ **Componentes Atualizados**
1. **`components/layout/Footer.tsx`** - Rodapé com dados dinâmicos
2. **`components/layout/Header.tsx`** - Cabeçalho com OAB
3. **`components/WhatsAppButton.tsx`** - Botão do WhatsApp
4. **`app/contato/page.tsx`** - Página de contato

---

## 🎯 ÁREAS DE ATUAÇÃO CONFIGURADAS

### ⭐ **Áreas em Destaque:**
1. **Direito Trabalhista** (22 serviços)
   - Horas extras, FGTS, Rescisão, Assédio moral, etc.

2. **Direito Cível**
   - Contratos, Indenizações, Família, Imobiliário, etc.

3. **Direito Criminal**
   - Defesa Criminal, Habeas Corpus, Recursos, etc.

### 📌 **Outras Áreas:**
4. Direito Previdenciário
5. Direito do Consumidor
6. Direito Empresarial

---

## 🔧 COMO EDITAR AS INFORMAÇÕES

### **Passo 1: Abrir o arquivo de configuração**
```bash
code lib/constants/site-config.ts
```

### **Passo 2: Localizar e substituir os valores marcados com `// TODO:`**

Exemplo:
```typescript
// ❌ ANTES
oab: "OAB/SP 123.456", // TODO: Adicionar número real da OAB

// ✅ DEPOIS
oab: "OAB/SP 456.789",
```

### **Passo 3: Salvar o arquivo**
Todas as alterações serão aplicadas automaticamente em todo o site!

---

## 📍 ONDE AS INFORMAÇÕES APARECEM

### **Endereço:**
- ✅ Rodapé (Footer)
- ✅ Página de Contato
- ⏳ Mapa do Google (quando adicionar a URL)

### **Telefone:**
- ✅ Rodapé (Footer)
- ✅ Página de Contato
- ✅ Botão WhatsApp flutuante
- ✅ Links clicáveis (tel:)

### **E-mail:**
- ✅ Rodapé (Footer)
- ✅ Página de Contato
- ✅ Links clicáveis (mailto:)

### **Redes Sociais:**
- ✅ Rodapé (Footer) - Ícones clicáveis
- ⏳ Podem ser adicionadas em outras páginas

### **OAB:**
- ✅ Menu mobile (Header)
- ⏳ Página Sobre
- ⏳ Rodapé

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ **Preencher dados faltantes** em `lib/constants/site-config.ts`
2. ⏳ **Adicionar logo** do escritório (se houver)
3. ⏳ **Configurar envio de e-mails** do formulário de contato
4. ⏳ **Adicionar Google Maps** na página de contato
5. ⏳ **Revisar textos** das páginas Sobre e Áreas de Atuação

---

## 📞 INFORMAÇÕES DE CONTATO ATUAIS

```
📍 Endereço: Av. Juscelino K. de Oliveira, 571 - Centro, Juquitiba/SP
📧 E-mail: contato@alexorpheo.adv.br
📱 Telefone: (PREENCHER)
💬 WhatsApp: (PREENCHER)

🔗 Instagram: @alex_orpheo
🔗 LinkedIn: /in/alexorpheo
🔗 Facebook: (PREENCHER)
```

---

## ⚡ DICA IMPORTANTE

**Todos os dados estão centralizados em um único arquivo!**

Ao editar `lib/constants/site-config.ts`, as mudanças serão refletidas automaticamente em:
- Rodapé
- Header
- Página de Contato
- Botão WhatsApp
- Metadados SEO
- E qualquer outro lugar que use essas informações

**Não é necessário editar múltiplos arquivos!** 🎉

