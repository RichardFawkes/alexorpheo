import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FolderOpen, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | Painel Administrativo",
};

async function getStats() {
  try {
    const [totalArticles, publishedArticles, totalCategories] = await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { published: true } }),
      prisma.category.count(),
    ]);

    return {
      totalArticles,
      publishedArticles,
      draftArticles: totalArticles - publishedArticles,
      totalCategories,
    };
  } catch (error) {
    return {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      totalCategories: 0,
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Bem-vindo ao painel administrativo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Artigos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalArticles}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedArticles} publicados, {stats.draftArticles} rascunhos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artigos Publicados</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.publishedArticles}</div>
            <p className="text-xs text-muted-foreground">
              Visíveis no site
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Total de categorias
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <a
            href="/admin/artigos/novo"
            className="block p-4 border rounded-lg hover:bg-slate-50 transition-colors"
          >
            <p className="font-medium">Criar Novo Artigo</p>
            <p className="text-sm text-muted-foreground">
              Escrever e publicar um novo artigo jurídico
            </p>
          </a>
          <a
            href="/admin/categorias"
            className="block p-4 border rounded-lg hover:bg-slate-50 transition-colors"
          >
            <p className="font-medium">Gerenciar Categorias</p>
            <p className="text-sm text-muted-foreground">
              Adicionar ou editar categorias de artigos
            </p>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
