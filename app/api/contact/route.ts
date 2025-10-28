import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(5),
  message: z.string().min(20),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Aqui você pode implementar o envio de e-mail usando um serviço como:
    // - Nodemailer
    // - SendGrid
    // - Resend
    // - AWS SES
    // etc.

    // Por enquanto, vamos apenas retornar sucesso
    console.log("Contact form submission:", validatedData);

    // Simular envio de email
    // await sendEmail({
    //   to: "contato@joaosilva.adv.br",
    //   from: validatedData.email,
    //   subject: `[Site] ${validatedData.subject}`,
    //   text: `
    //     Nome: ${validatedData.name}
    //     Email: ${validatedData.email}
    //     Telefone: ${validatedData.phone}
    //     Assunto: ${validatedData.subject}
    //     
    //     Mensagem:
    //     ${validatedData.message}
    //   `,
    // });

    return NextResponse.json(
      { message: "Mensagem enviada com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Erro ao processar formulário" },
      { status: 500 }
    );
  }
}
