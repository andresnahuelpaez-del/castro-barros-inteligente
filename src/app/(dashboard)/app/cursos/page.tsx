import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { BookOpen, Clock, ArrowRight, PlayCircle, Pause, CheckCircle2 } from "lucide-react";
import { COURSES, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/constants";
import { GlassCard } from "@/components/common/glass-card";
import { NeonButton } from "@/components/common/neon-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mis cursos",
};

const statusConfig = {
  active: { label: "En progreso", icon: PlayCircle, color: "text-neon-green" },
  paused: { label: "Pausado", icon: Pause, color: "text-yellow-400" },
  completed: { label: "Completado", icon: CheckCircle2, color: "text-neon-cyan" },
};

export default async function MisCursosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Obtener inscripciones del usuario
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*, courses(*)")
    .eq("user_id", user.id)
    .order("last_activity_at", { ascending: false });

  const hasEnrollments = enrollments && enrollments.length > 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Mis cursos</h1>
          <p className="mt-2 text-foreground-secondary">
            {hasEnrollments
              ? "Tus cursos en progreso y completados."
              : "Todavia no te inscribiste a ningun curso."}
          </p>
        </div>
        <Link href="/cursos">
          <NeonButton size="sm">Explorar cursos</NeonButton>
        </Link>
      </div>

      {hasEnrollments ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrollments.map((enrollment) => {
            const course = enrollment.courses as unknown as {
              slug: string;
              title: string;
              level: string;
              duration_months: number;
              short_description: string;
            };
            const status = statusConfig[enrollment.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            // TODO: calcular progreso real con lesson_progress
            const progressPercent = 0;

            return (
              <Link
                key={enrollment.id}
                href={`/app/cursos/${course.slug}`}
              >
                <GlassCard neonBorder="green" className="group h-full">
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      className={cn(
                        "text-xs",
                        LEVEL_COLORS[course.level as keyof typeof LEVEL_COLORS]
                      )}
                      variant="secondary"
                    >
                      {LEVEL_LABELS[course.level as keyof typeof LEVEL_LABELS]}
                    </Badge>
                    <span className={cn("flex items-center gap-1 text-xs font-medium", status.color)}>
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status.label}
                    </span>
                  </div>

                  <h3 className="font-semibold text-white group-hover:text-neon-green transition-colors">
                    {course.title}
                  </h3>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-foreground-muted mb-1">
                      <span>Progreso</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-foreground-muted">
                    <Clock className="h-3.5 w-3.5" />
                    <span>
                      Ultima actividad:{" "}
                      {new Date(enrollment.last_activity_at).toLocaleDateString(
                        "es-AR",
                        { day: "numeric", month: "short" }
                      )}
                    </span>
                  </div>

                  <p className="mt-3 text-sm font-medium text-neon-green opacity-0 transition-opacity group-hover:opacity-100">
                    Continuar &rarr;
                  </p>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <BookOpen className="mx-auto h-16 w-16 text-foreground-muted" />
          <h2 className="mt-4 text-xl font-semibold text-white">
            Empeza tu primer curso
          </h2>
          <p className="mx-auto mt-2 max-w-md text-foreground-secondary">
            Explora nuestros 8 programas profesionales y elegí el que mas se
            adapte a tus objetivos. Todos son 100% gratuitos.
          </p>
          <div className="mt-6">
            <Link href="/cursos">
              <NeonButton size="lg">
                Explorar cursos <ArrowRight className="ml-2 h-5 w-5" />
              </NeonButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
