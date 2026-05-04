"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  Award,
  BarChart3,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/cursos", label: "Cursos", icon: BookOpen },
  { href: "/admin/alumnos", label: "Alumnos", icon: Users },
  { href: "/admin/proyectos", label: "Proyectos", icon: FileText },
  { href: "/admin/certificados", label: "Certificados", icon: Award },
  { href: "/admin/reportes", label: "Reportes", icon: BarChart3 },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r border-border bg-background-secondary lg:flex lg:flex-col">
      <div className="p-6">
        <Link href="/admin" className="text-lg font-bold">
          <span className="text-white">CB</span>{" "}
          <span className="text-neon-green text-glow-green">Admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {sidebarLinks.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-neon-green/10 text-neon-green font-medium"
                  : "text-foreground-secondary hover:bg-background-tertiary hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/app"
          className="flex items-center gap-2 text-sm text-foreground-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la app
        </Link>
      </div>
    </aside>
  );
}
