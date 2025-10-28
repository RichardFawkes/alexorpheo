import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar usuário admin
  const hashedPassword = await hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@joaosilva.adv.br' },
    update: {},
    create: {
      email: 'admin@joaosilva.adv.br',
      name: 'Dr. João Silva',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Usuário admin criado');

  // Criar categorias
  const categorias = [
    { name: 'Direito Civil', slug: 'direito-civil' },
    { name: 'Direito Trabalhista', slug: 'direito-trabalhista' },
    { name: 'Direito Empresarial', slug: 'direito-empresarial' },
    { name: 'Direito Imobiliário', slug: 'direito-imobiliario' },
    { name: 'Direito do Consumidor', slug: 'direito-consumidor' },
  ];

  for (const cat of categorias) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('✅ Categorias criadas');

  // Criar artigo de exemplo
  const categoria = await prisma.category.findFirst({
    where: { slug: 'direito-civil' },
  });

  if (categoria) {
    await prisma.article.upsert({
      where: { slug: 'entendendo-direito-civil-brasileiro' },
      update: {},
      create: {
        title: 'Entendendo o Direito Civil Brasileiro',
        slug: 'entendendo-direito-civil-brasileiro',
        excerpt: 'Uma introdução completa aos princípios fundamentais do Direito Civil no Brasil e sua aplicação prática.',
        content: `# Entendendo o Direito Civil Brasileiro

O Direito Civil é um dos ramos mais importantes e abrangentes do ordenamento jurídico brasileiro. Ele regula as relações entre particulares, estabelecendo direitos e deveres nas mais diversas situações do cotidiano.

## O que é Direito Civil?

O Direito Civil é o conjunto de normas que regulam as relações jurídicas entre pessoas, sejam elas físicas ou jurídicas, de natureza privada. Está principalmente codificado no Código Civil Brasileiro (Lei 10.406/2002).

## Principais Áreas do Direito Civil

### 1. Direito das Obrigações
Trata das relações jurídicas em que uma pessoa (devedor) deve cumprir uma prestação em favor de outra (credor).

### 2. Direito dos Contratos
Regula os acordos de vontades entre duas ou mais partes, criando direitos e obrigações recíprocas.

### 3. Direito de Família
Disciplina as relações familiares, incluindo casamento, união estável, divórcio, guarda de filhos e pensão alimentícia.

### 4. Direito das Sucessões
Trata da transmissão de bens, direitos e obrigações de uma pessoa falecida aos seus herdeiros.

### 5. Responsabilidade Civil
Estabelece o dever de reparar danos causados a outrem, seja por ato próprio ou de terceiros.

## Princípios Fundamentais

O Direito Civil brasileiro é fundamentado em princípios essenciais como:

- **Autonomia da Vontade**: as pessoas são livres para contratar e estabelecer relações jurídicas.
- **Boa-fé Objetiva**: as partes devem agir com honestidade e lealdade.
- **Função Social**: os direitos devem ser exercidos considerando o bem-estar social.

## Conclusão

Compreender os fundamentos do Direito Civil é essencial para todos os cidadãos, pois suas normas estão presentes em praticamente todos os aspectos da vida em sociedade.

Para questões específicas relacionadas ao Direito Civil, é sempre recomendável consultar um advogado especializado.`,
        published: true,
        publishedAt: new Date(),
        authorId: admin.id,
        categoryId: categoria.id,
      },
    });

    console.log('✅ Artigo de exemplo criado');
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
