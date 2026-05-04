import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { NeonButton } from "@/components/common/neon-button";
import { COURSES, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/constants";
import { MOCK_MODULES } from "@/lib/mock-course-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mis cursos",
};

export default async function MisCursosPage() {
  // Mock: first 3 courses are "enrolled"
  const enrolledCourses = COURSES.slice(0, 3);
  const totalLessons = MOCK_MODULES.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );
  const completedLessons = MOCK_MODULES.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Mis cursos
          </h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            {enrolledCourses.length} cursos en progreso
          </p>
        </div>
        <Link href="/cursos">
          <NeonButton size="sm">
            Explorar más cursos
            <ArrowRight className="ml-2 h-4 w-4" />
          </NeonButton>
        </Link>
      </div>

      {/* Enrolled courses */}
      <div className="mt-8 space-y-4">
        {enrolledCourses.map((course, i) => {
          const progress =
            i === 0
              ? Math.round((completedLessons / totalLessons) * 100)
              : 0;
          const lessonsCompleted = i === 0 ? completedLessons : 0;
          const nextLesson =
            i === 0
              ? MOCK_MODULES.flatMap((m) => m.lessons).find(
                  (l) => !l.completed
                )
              : MOCK_MODULES[0].lessons[0];

          return (
            <div
              key={course.slug}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          LEVEL_COLORS[course.level]
                        )}
                      >
                        {LEVEL_LABELS[course.level]}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          progress > 0
                            ? "bg-neon-green/20 text-neon-green"
                            : "bg-background-tertiary text-foreground-muted"
                        )}
                      >
                        {progress > 0 ? "En progreso" : "Sin empezar"}
                      </Badge>
                    </div>
                    <Link href={`/app/cursos/${course.slug}`}>
                      <h2 className="text-lg font-bold text-white hover:text-neon-green transition-colors sm:text-xl">
                        {course.title}
                      </h2>
                    </Link>
                    <p className="mt-1 text-sm text-foreground-secondary line-clamp-2">
                      {course.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">
                        {progress}%
                      </p>
                      <p className="text-xs text-foreground-muted">
                        completado
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-foreground-muted mb-1.5">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 text-neon-green" />
                      {lessonsCompleted} de {totalLessons} lecciones
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {course.durationMonths} meses estimados
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>

              {/* Continue button */}
              {nextLesson && (
                <Link
                  href={`/app/cursos/${course.slug}/leccion/${nextLesson.slug}`}
                  className="flex items-center justify-between gap-3 border-t border-border px-5 py-3 text-sm hover:bg-background-tertiary transition-colors group sm:px-6"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <BookOpen className="h-4 w-4 text-neon-green shrink-0" />
                    <span className="text-foreground-secondary truncate">
                      Continuar:{" "}
                      <span className="text-white">{nextLesson.title}</span>
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-foreground-muted group-hover:text-neon-green transition-colors shrink-0" />
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Discover more */}
      <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-center sm:p-8">
        <BookOpen className="mx-auto h-10 w-10 text-foreground-muted" />
        <h2 className="mt-4 text-lg font-semibold text-white">
          Descubrí más programas
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-foreground-secondary">
          Tenemos {COURSES.length} programas profesionales disponibles. Explorá
          todos los cursos y elegí el que más se adapte a tus objetivos.
        </p>
        <div className="mt-5">
          <Link href="/cursos">
            <NeonButton size="lg">
              Ver todos los cursos
              <ArrowRight className="ml-2 h-5 w-5" />
            </NeonButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
