import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Award,
  Briefcase,
  ArrowRight,
  Compass,
  Clock,
  TrendingUp,
} from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";
import { Progress } from "@/components/ui/progress";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mi panel",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const [
    { data: profile },
    { data: enrollments },
    { count: completedLessonsCount },
    { count: certificatesCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("enrollments")
      .select("id, status, last_activity_at, courses(id, title, slug, short_description)")
      .eq("user_id", user.id)
      .order("last_activity_at", { ascending: false }),
    supabase
      .from("lesson_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .not("completed_at", "is", null),
    supabase
      .from("certificates")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id),
  ]);

  if (profile && !profile.onboarding_completed) {
    redirect("/app/onboarding");
  }

  const activeEnrollments = enrollments?.filter((e) => e.status === "active") || [];
  const totalEnrollments = enrollments?.length || 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">
        Hola{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="mt-2 text-foreground-secondary">
        Bienvenido a tu panel de aprendizaje.
      </p>

      {/* Metricas */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-neon-green" />
            <h3 className="text-sm font-medium text-foreground-secondary">
              Cursos activos
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-neon-green">
            {activeEnrollments.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-secondary" />
            <h3 className="text-sm font-medium text-foreground-secondary">
              Total inscripciones
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">
            {totalEnrollments}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-neon-cyan" />
            <h3 className="text-sm font-medium text-foreground-secondary">
              Lecciones completadas
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">
            {completedLessonsCount ?? 0}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-secondary" />
            <h3 className="text-sm font-medium text-foreground-secondary">
              Certificados
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">
            {certificatesCount ?? 0}
          </p>
        </div>
      </div>

      {/* Active courses */}
      {activeEnrollments.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Continua aprendiendo
            </h2>
            <Link
              href="/app/cursos"
              className="flex items-center gap-1 text-sm text-foreground-secondary hover:text-white transition-colors"
            >
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {activeEnrollments.slice(0, 4).map((enrollment) => {
              const course = enrollment.courses as unknown as {
                id: string;
                title: string;
                slug: string;
                short_description: string | null;
              } | null;
              if (!course) return null;

              return (
                <Link
                  key={enrollment.id}
                  href={`/app/cursos/${course.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-neon-green/50"
                >
                  <h3 className="font-semibold text-white group-hover:text-neon-green transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted line-clamp-2">
                    {course.short_description}
                  </p>
                  {enrollment.last_activity_at && (
                    <p className="mt-3 flex items-center gap-1 text-xs text-foreground-muted">
                      <Clock className="h-3 w-3" />
                      Ultima actividad:{" "}
                      {new Date(enrollment.last_activity_at).toLocaleDateString(
                        "es-AR",
                        { day: "2-digit", month: "short" }
                      )}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Accesos rapidos */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link href="/cursos">
          <GlassCard neonBorder="green" className="group flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10">
              <Compass className="h-6 w-6 text-neon-green" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-neon-green transition-colors">
                Explorar cursos
              </p>
              <p className="mt-1 text-sm text-foreground-secondary">
                8 programas profesionales listos para que empieces.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground-muted group-hover:text-neon-green transition-colors" />
          </GlassCard>
        </Link>

        <Link href="/app/empleabilidad">
          <GlassCard neonBorder="cyan" className="group flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/10">
              <Briefcase className="h-6 w-6 text-neon-cyan" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-neon-cyan-bright transition-colors">
                Guia de empleabilidad
              </p>
              <p className="mt-1 text-sm text-foreground-secondary">
                Como encontrar trabajo online, donde postularte y cuanto cobrar.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground-muted group-hover:text-neon-cyan transition-colors" />
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
