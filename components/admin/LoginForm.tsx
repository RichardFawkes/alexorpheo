"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Scale, ArrowLeft, Lock } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center justify-center p-4 bg-amber-500/10 rounded-full mb-4 ring-1 ring-amber-500/20"
        >
          <Scale className="h-10 w-10 text-amber-500" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold tracking-tight text-slate-100"
        >
          Painel Administrativo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 mt-2"
        >
          Gerencie seu conteúdo com excelência
        </motion.p>
      </div>

      <Card className="border-slate-800 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
        <CardContent className="pt-6 pb-8 px-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300">E-mail Corporativo</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@orpheo.adv.br"
                className="bg-slate-950/50 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-amber-500/50 focus:ring-amber-500/20 transition-all duration-300"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300">Senha</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-slate-950/50 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-amber-500/50 focus:ring-amber-500/20 transition-all duration-300"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-400" />
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Autenticando...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Acessar Painel
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-500 hover:text-amber-500 transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para o site principal
        </Link>
      </motion.div>
    </motion.div>
  );
}
