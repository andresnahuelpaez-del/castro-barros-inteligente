import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Users,
  BookOpen,
  Award,
  TrendingUp,
  ArrowRight,
  Activity,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Dashboard",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch real metrics
  const [
    { count: totalStudents },
    { count: totalEnrollments },
    { count: totalCertificates },
    { count: totalCourses },
    { data: recentEnrollments },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "student"),
    supabase.from("enrollments").select("*", { count: "exact", head: true }),
    supabase.from("certificates").select("*", { count: "exact", head: true }),
    supabase.from("courses").select("*", { count: "exact", head: true }).eq("published", true),
    supabase
      .from("enrollments")
      .select("id, created_at, courses(title), profiles!enrollments_user_id_fkey(full_name, email)")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const metrics = [
    {
      label: "Alumnos registrados",
      value: totalStudents ?? 0,
      icon: Users,
      href: "/admin/alumnos",
    },
    {
      label: "Inscripciones activas",
      value: totalEnrollments ?? 0,
      icon: TrendingUp,
      href: "/admin/alumnos",
    },
    {
      label: "Cursos publicados",
      value: totalCourses ?? 0,
      icon: BookOpen,
      href: "/admin/cursos",
    },
    {
      label: "Certificados emitidos",
      value: totalCertificates ?? 0,
      icon: Award,
      href: "/admin/certificados",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Panel de administracion</h1>
      <p className="mt-2 text-foreground-secondary">
        Metricas y gestion de la plataforma.
      </p>

      {/* Metrics grid */}
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

      {/* Recent enrollments */}
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
          {recentEnrollments && recentEnrollments.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-xs text-foreground-muted">
                  <th className="px-4 py-3 font-medium">Alumno</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Curso</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentEnrollments.map((enrollment) => {
                  const profile = enrollment.profiles as unknown as {
                    full_name: string | null;
                    email: string;
                  } | null;
                  const course = enrollment.courses as unknown as {
                    title: string;
                  } | null;

                  return (
                    <tr key={enrollment.id} className="text-sm">
                      <td className="px-4 py-3">
                        <p className="text-white">
                          {profile?.full_name || "Sin nombre"}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          {profile?.email}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-foreground-secondary hidden sm:table-cell">
                        {course?.title || "—"}
                      </td>
                      <td className="px-4 py-3 text-foreground-muted hidden md:table-cell">
                        {new Date(enrollment.created_at).toLocaleDateString(
                          "es-AR",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-foreground-muted">
              No hay inscripciones aun.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
