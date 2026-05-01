import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Lock,
  PlayCircle,
  ChevronRight,
  BarChart3,
  Clock,
  Award,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { NeonButton } from "@/components/common/neon-button";
import { CertificateCTA } from "./certificate-cta";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Curso: ${slug}` };
}

export default async function CourseViewPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Buscar el curso
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!course) notFound();

  // Verificar inscripcion
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
    .single();

  if (!enrollment) {
    // No esta inscrito, redirigir a la pagina publica del curso
    redirect(`/cursos/${slug}`);
  }

  // Obtener modulos y lecciones
  const { data: modules } = await supabase
    .from("modules")
    .select("*, lessons(*, lesson_progress(*))")
    .eq("course_id", course.id)
    .order("order", { ascending: true });

  // Obtener progreso de lecciones
  const { data: progressData } = await supabase
    .from("lesson_progress")
    .select("lesson_id, completed_at")
    .eq("user_id", user.id)
    .eq("enrollment_id", enrollment.id);

  const completedLessons = new Set(
    progressData
      ?.filter((p) => p.completed_at)
      .map((p) => p.lesson_id) || []
  );

  // Calcular progreso total
  const totalLessons =
    modules?.reduce((acc, m) => acc + ((m.lessons as unknown[])?.length || 0), 0) || 0;
  const completedCount = completedLessons.size;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isFullyCompleted = totalLessons > 0 && completedCount === totalLessons;

  // Check if certificate already exists
  const { data: existingCert } = isFullyCompleted
    ? await supabase
        .from("certificates")
        .select("id, verification_hash")
        .eq("user_id", user.id)
        .eq("course_id", course.id)
        .single()
    : { data: null };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-4">
        <Link
          href="/app/cursos"
          className="text-sm text-foreground-secondary hover:text-white transition-colors"
        >
          &larr; Mis cursos
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {course.title}
        </h1>
        <p className="mt-2 text-foreground-secondary">
          {course.short_description}
        </p>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted">Progreso general</span>
            <span className="font-medium text-neon-green">
              {progressPercent}% completado
            </span>
          </div>
          <Progress value={progressPercent} className="mt-2 h-3" />
          <div className="mt-2 flex items-center gap-4 text-xs text-foreground-muted">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-neon-green" />
              {completedCount} de {totalLessons} lecciones
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {course.duration_months} meses estimados
            </span>
          </div>
        </div>
      </div>

      {/* Certificate CTA */}
      {isFullyCompleted && (
        <CertificateCTA
          courseId={course.id}
          courseTitle={course.title}
          existingHash={existingCert?.verification_hash || null}
        />
      )}

      {/* Modulos y lecciones */}
      <div className="mt-8 space-y-4">
        {modules && modules.length > 0 ? (
          modules.map((module) => {
            const lessons = (module.lessons || []) as {
              id: string;
              slug: string;
              title: string;
              order: number;
              video_duration_sec: number;
              is_preview: boolean;
            }[];

            const moduleLessonsCompleted = lessons.filter((l) =>
              completedLessons.has(l.id)
            ).length;
            const moduleProgress =
              lessons.length > 0
                ? Math.round(
                    (moduleLessonsCompleted / lessons.length) * 100
                  )
                : 0;

            return (
              <div
                key={module.id}
                className="rounded-2xl border border-border bg-card overflow-hidden"
              >
                {/* Module header */}
                <div className="flex items-center justify-between border-b border-border p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                        moduleProgress === 100
                          ? "bg-neon-green/20 text-neon-green"
                          : "bg-background-tertiary text-foreground-muted"
                      )}
                    >
                      {module.order}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {module.title}
                      </h3>
                      <p className="text-xs text-foreground-muted">
                        {moduleLessonsCompleted}/{lessons.length} lecciones
                        &middot; {module.estimated_hours} hs estimadas
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-xs",
                      moduleProgress === 100
                        ? "bg-neon-green/20 text-neon-green"
                        : "bg-background-tertiary text-foreground-muted"
                    )}
                  >
                    {moduleProgress}%
                  </Badge>
                </div>

                {/* Lessons list */}
                <div className="divide-y divide-border">
                  {lessons
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => {
                      const isCompleted = completedLessons.has(lesson.id);
                      const durationMin = Math.ceil(
                        lesson.video_duration_sec / 60
                      );

                      return (
                        <Link
                          key={lesson.id}
                          href={`/app/cursos/${slug}/leccion/${lesson.slug}`}
                          className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-background-tertiary group"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-neon-green" />
                          ) : (
                            <Circle className="h-5 w-5 shrink-0 text-foreground-muted group-hover:text-white" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "text-sm truncate",
                                isCompleted
                                  ? "text-foreground-secondary"
                                  : "text-white"
                              )}
                            >
                              {lesson.title}
                            </p>
                          </div>
                          {durationMin > 0 && (
                            <span className="text-xs text-foreground-muted shrink-0">
                              {durationMin} min
                            </span>
                          )}
                          <ChevronRight className="h-4 w-4 shrink-0 text-foreground-muted group-hover:text-neon-green transition-colors" />
                        </Link>
                      );
                    })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-foreground-muted" />
            <p className="mt-4 text-foreground-secondary">
              El contenido de este curso se esta preparando. Pronto vas a ver
              los modulos y lecciones aca.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
