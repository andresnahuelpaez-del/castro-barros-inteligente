import type { Metadata } from "next";
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Award,
} from "lucide-react";
import { COURSES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Admin - Reportes",
};

// TODO: Reactivar queries Supabase cuando se conecte
export default async function AdminReportsPage() {
  const stats = [
    { label: "Alumnos", value: 0, icon: Users },
    { label: "Inscripciones", value: 0, icon: BookOpen },
    { label: "Lecciones completadas", value: 0, icon: TrendingUp },
    { label: "Certificados", value: 0, icon: Award },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Reportes</h1>
      <p className="mt-1 text-foreground-secondary">
        Métricas generales de la plataforma.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground-secondary">
                {stat.label}
              </span>
              <stat.icon className="h-4 w-4 text-foreground-muted" />
            </div>
            <p className="mt-2 text-2xl font-bold text-neon-green">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-neon-green" />
          Inscripciones por curso
        </h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border">
          {COURSES.map((course) => (
            <div key={course.slug} className="px-5 py-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white font-medium truncate">
                  {course.title}
                </span>
                <span className="text-neon-green font-medium shrink-0 ml-4">
                  0
                </span>
              </div>
              <div className="h-2 rounded-full bg-background-tertiary overflow-hidden">
                <div className="h-full rounded-full bg-neon-green/60" style={{ width: "0%" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
