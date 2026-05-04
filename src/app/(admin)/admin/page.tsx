import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  ArrowRight,
  Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin - Dashboard",
};

// TODO: Reactivar queries Supabase cuando se conecte
export default async function AdminDashboardPage() {
  const metrics = [
    { label: "Alumnos registrados", value: 0, icon: Users, href: "/admin/alumnos" },
    { label: "Inscripciones activas", value: 0, icon: TrendingUp, href: "/admin/alumnos" },
    { label: "Cursos publicados", value: 8, icon: BookOpen, href: "/admin/cursos" },
    { label: "Certificados emitidos", value: 0, icon: Award, href: "/admin/certificados" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Panel de administración</h1>
      <p className="mt-2 text-foreground-secondary">
        Métricas y gestión de la plataforma.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Link
            key={metric.label}
            href={metric.href}
            className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-neon-green/50"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-foreground-secondary">
                {metric.label}
              </h3>
              <metric.icon className="h-5 w-5 text-foreground-muted group-hover:text-neon-green transition-colors" />
            </div>
            <p className="mt-2 text-3xl font-bold text-neon-green">
              {metric.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-neon-green" />
            Inscripciones recientes
          </h2>
          <Link
            href="/admin/alumnos"
            className="flex items-center gap-1 text-sm text-foreground-secondary hover:text-white transition-colors"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden">
          <div className="p-8 text-center text-foreground-muted">
            No hay inscripciones aún. Conectá Supabase para ver datos reales.
          </div>
        </div>
      </div>
    </div>
  );
}
