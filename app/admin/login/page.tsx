import { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import { Scale } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login | Painel Administrativo",
  description: "Acesso ao painel administrativo",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Scale className="h-10 w-10 text-primary" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-xl leading-tight">Dr. João Silva</span>
              <span className="text-xs text-muted-foreground">Advocacia</span>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Painel Administrativo
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Faça login para acessar o sistema
          </p>
        </div>

        <LoginForm />

        <div className="text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
}
