"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  Clock,
  PlayCircle,
  Lock,
  RotateCcw,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/lib/course-progress";
import type { CourseModule } from "@/lib/mock-course-data";
import { CertificateCTA } from "@/app/(dashboard)/app/cursos/[slug]/certificate-cta";

interface CourseOverviewProps {
  courseSlug: string;
  courseId: string;
  courseTitle: string;
  shortDescription: string;
  durationMonths: number;
  modules: CourseModule[];
}

export function CourseOverview({
  courseSlug,
  courseId,
  courseTitle,
  shortDescription,
  durationMonths,
  modules,
}: CourseOverviewProps) {
  const {
    hydrated,
    isCompleted,
    isUnlocked,
    moduleProgress,
    completedCount,
    totalLessons,
    coursePercent,
    isCourseComplete,
    reset,
  } = useCourseProgress();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/app/cursos"
          className="text-sm text-foreground-secondary transition-colors hover:text-white"
        >
          &larr; Mis cursos
        </Link>
        {hydrated && completedCount > 0 && (
          <button
            onClick={reset}
            className="flex items-center gap-1.5 text-xs text-foreground-muted transition-colors hover:text-white"
            title="Reiniciar el progreso de este curso"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reiniciar progreso
          </button>
        )}
      </div>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="mb-2 flex items-center gap-3">
          <Badge
            variant="secondary"
            className={cn(
              "text-xs",
              isCourseComplete
                ? "bg-neon-green/20 text-neon-green"
                : "bg-background-tertiary text-foreground-muted"
            )}
          >
            {isCourseComplete
              ? "Completado"
              : completedCount > 0
                ? "En progreso"
                : "Sin empezar"}
          </Badge>
        </div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{courseTitle}</h1>
        <p className="mt-2 text-foreground-secondary">{shortDescription}</p>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted">Progreso general</span>
            <span className="font-medium text-neon-green">
              {coursePercent}% completado
            </span>
          </div>
          <Progress value={coursePercent} className="mt-2 h-3" />
          <div className="mt-2 flex items-center gap-4 text-xs text-foreground-muted">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-neon-green" />
              {completedCount} de {totalLessons} lecciones
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {durationMonths} meses estimados
            </span>
          </div>
        </div>
      </div>

      {/* Certificado al completar */}
      {isCourseComplete && (
        <CertificateCTA
          courseId={courseId}
          courseTitle={courseTitle}
          existingHash={null}
        />
      )}

      {/* Módulos */}
      <div className="mt-8 space-y-4">
        {modules.map((module) => {
          const mp = moduleProgress(module.id);
          return (
            <div
              key={module.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center justify-between border-b border-border p-5">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold",
                      mp.isComplete
                        ? "bg-neon-green/20 text-neon-green"
                        : "bg-background-tertiary text-foreground-muted"
                    )}
                  >
                    {mp.isComplete ? <CheckCircle2 className="h-4 w-4" /> : module.order}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{module.title}</h3>
                    <p className="text-xs text-foreground-muted">
                      {mp.completed}/{mp.total} lecciones &middot;{" "}
                      {module.estimatedHours} hs estimadas
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs",
                    mp.isComplete
                      ? "bg-neon-green/20 text-neon-green"
                      : "bg-background-tertiary text-foreground-muted"
                  )}
                >
                  {mp.percent}%
                </Badge>
              </div>

              <div className="divide-y divide-border">
                {module.lessons.map((lesson) => {
                  const done = isCompleted(lesson.slug);
                  const unlocked = !hydrated || isUnlocked(lesson.slug) || done;

                  const inner = (
                    <>
                      {done ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-neon-green" />
                      ) : !unlocked ? (
                        <Lock className="h-5 w-5 shrink-0 text-foreground-muted/60" />
                      ) : (
                        <Circle className="h-5 w-5 shrink-0 text-foreground-muted group-hover:text-white" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "truncate text-sm",
                            !unlocked
                              ? "text-foreground-muted/60"
                              : done
                                ? "text-foreground-secondary"
                                : "text-white"
                          )}
                        >
                          {lesson.title}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-1 text-xs text-foreground-muted">
                        <PlayCircle className="h-3.5 w-3.5" />
                        {lesson.durationMin} min
                      </span>
                      {unlocked ? (
                        <ChevronRight className="h-4 w-4 shrink-0 text-foreground-muted transition-colors group-hover:text-neon-green" />
                      ) : (
                        <span className="h-4 w-4 shrink-0" />
                      )}
                    </>
                  );

                  if (!unlocked) {
                    return (
                      <div
                        key={lesson.id}
                        className="flex cursor-not-allowed items-center gap-4 px-5 py-3 opacity-70"
                        title="Completá la lección anterior para desbloquear"
                      >
                        {inner}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={lesson.id}
                      href={`/app/cursos/${courseSlug}/leccion/${lesson.slug}`}
                      className="group flex items-center gap-4 px-5 py-3 transition-colors hover:bg-background-tertiary"
                    >
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
