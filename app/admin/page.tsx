import { Metadata } from "next";
import { supabaseServer } from "@/lib/supabase/server";
import MuiDashboard from "@/components/admin/MuiDashboard";

export const metadata: Metadata = {
  title: "Dashboard | Painel Administrativo",
};

async function obterEstatisticas() {
  try {
    const [
      { count: totalArtigos },
      { count: artigosPublicados },
      { count: totalCategorias },
      { count: totalNoticias },
      { count: noticiasPublicadas }
    ] = await Promise.all([
      supabaseServer.from('Article').select('*', { count: 'exact', head: true }),
      supabaseServer.from('Article').select('*', { count: 'exact', head: true }).eq('published', true),
      supabaseServer.from('Category').select('*', { count: 'exact', head: true }),
      supabaseServer.from('News').select('*', { count: 'exact', head: true }),
      supabaseServer.from('News').select('*', { count: 'exact', head: true }).eq('published', true),
    ]);

    return {
      totalArtigos: totalArtigos || 0,
      artigosPublicados: artigosPublicados || 0,
      rascunhosArtigos: (totalArtigos || 0) - (artigosPublicados || 0),
      totalCategorias: totalCategorias || 0,
      totalNoticias: totalNoticias || 0,
      noticiasPublicadas: noticiasPublicadas || 0,
      rascunhosNoticias: (totalNoticias || 0) - (noticiasPublicadas || 0),
      totalPublicado: (artigosPublicados || 0) + (noticiasPublicadas || 0),
    };
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return {
      totalArtigos: 0,
      artigosPublicados: 0,
      rascunhosArtigos: 0,
      totalCategorias: 0,
      totalNoticias: 0,
      noticiasPublicadas: 0,
      rascunhosNoticias: 0,
      totalPublicado: 0,
    };
  }
}

export default async function DashboardPage() {
  const stats = await obterEstatisticas();

  return <MuiDashboard stats={stats} />;
}

