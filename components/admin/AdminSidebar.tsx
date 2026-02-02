"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, FolderOpen, Scale, Newspaper, Settings } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Artigos", href: "/admin/artigos", icon: FileText },
  { name: "Notícias", href: "/admin/noticias", icon: Newspaper },
  { name: "Categorias", href: "/admin/categorias", icon: FolderOpen },
  { name: "Configurações", href: "/admin/configuracoes", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 bg-white border-r hidden lg:block">
      <nav className="p-4 space-y-2">
        <Link href="/" className="flex items-center space-x-2 px-4 py-3 mb-4">
          <Scale className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight">Orpheo Silva</span>
            <span className="text-xs text-muted-foreground">Ver site</span>
          </div>
        </Link>

        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-slate-100 hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
