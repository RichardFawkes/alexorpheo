import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import { SITE_CONFIG } from "@/lib/constants/site-config";

export const metadata: Metadata = {
  title: "Contato | Orpheo - Advocacia",
  description: "Entre em contato conosco para agendar uma consulta",
};

export default function ContatoPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Entre em Contato</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Estamos prontos para ouvir você e encontrar a melhor solução para o seu caso
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informações de Contato */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <MapPin className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Endereço</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {SITE_CONFIG.contato.endereco.logradouro}<br />
                    {SITE_CONFIG.contato.endereco.bairro} - {SITE_CONFIG.contato.endereco.cidade}, {SITE_CONFIG.contato.endereco.estado}<br />
                    CEP: {SITE_CONFIG.contato.endereco.cep}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>Telefone</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <a href={`tel:+55${SITE_CONFIG.contato.telefone.principal.replace(/\D/g, '')}`} className="hover:text-primary transition-colors">
                      {SITE_CONFIG.contato.telefone.principal}
                    </a>
                    {SITE_CONFIG.contato.telefone.secundario && SITE_CONFIG.contato.telefone.secundario.trim() !== '' && (
                      <>
                        <br />
                        <a href={`tel:+55${SITE_CONFIG.contato.telefone.secundario.replace(/\D/g, '')}`} className="hover:text-primary transition-colors">
                          {SITE_CONFIG.contato.telefone.secundario}
                        </a>
                      </>
                    )}
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Mail className="h-10 w-10 text-primary mb-3" />
                  <CardTitle>E-mail</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <a href={`mailto:${SITE_CONFIG.contato.email.principal}`} className="hover:text-primary transition-colors">
                      {SITE_CONFIG.contato.email.principal}
                    </a>
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Horário de Atendimento</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {SITE_CONFIG.contato.horarioAtendimento.semana}<br />
                    {SITE_CONFIG.contato.horarioAtendimento.sabado}<br />
                    {SITE_CONFIG.contato.horarioAtendimento.domingo}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Contato */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl uppercase">VAMOS TRABALHAR JUNTOS?</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e entraremos em contato o mais breve possível
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa (Opcional) */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="aspect-video rounded-xl overflow-hidden border shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1983824983193!2d-46.65575368502198!3d-23.561414784685447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1635179876543!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
