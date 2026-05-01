import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Clock,
  Award,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Reportes",
};

export default async function AdminReportsPage() {
  const supabase = await createClient();

  // Fetch aggregate data
  const [
    { count: totalStudents },
    { count: totalEnrollments },
    { count: totalCertificates },
    { count: completedLessons },
    { data: courseStats },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("enrollments").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("lesson_progress").select("*", { count: "exact", head: true }).not("completed_at", "is", null),
    supabase
      .from("courses")
      .select("id, title, enrollments(id)")
      .eq("published", true)
      .order("title"),
  ]);

  const stats = [
    { label: "Alumnos", value: totalStudents ?? 0, icon: Users },
    { label: "Inscripciones", value: totalEnrollments ?? 0, icon: BookOpen },
    { label: "Lecciones completadas", value: completedLessons ?? 0, icon: TrendingUp },
    { label: "Certificados", value: totalCertificates ?? 0, icon: Award },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Reportes</h1>
      <p className="mt-1 text-foreground-secondary">
        Metricas generales de la plataforma.
      </p>

      {/* Summary stats */}
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

      {/* Enrollments per course */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-neon-green" />
          Inscripciones por curso
        </h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {courseStats && courseStats.length > 0 ? (
            <div className="divide-y divide-border">
              {courseStats.map((course) => {
                const count = (course.enrollments as unknown[])?.length || 0;
                const maxCount = Math.max(
                  ...courseStats.map(
                    (c) => ((c.enrollments as unknown[])?.length || 0)
                  ),
                  1
                );
                const pct = Math.round((count / maxCount) * 100);

                return (
                  <div key={course.id} className="px-5 py-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-white font-medium truncate">
                        {course.title}
                      </span>
                      <span className="text-neon-green font-medium shrink-0 ml-4">
                        {count}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-background-tertiary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-neon-green/60 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center text-foreground-muted">
              No hay cursos publicados aun.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
