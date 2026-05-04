import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronRight,
  Clock,
  Award,
  PlayCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { COURSES } from "@/lib/constants";
import { MOCK_MODULES } from "@/lib/mock-course-data";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  return { title: course ? course.title : `Curso: ${slug}` };
}

export default async function CourseViewPage({ params }: PageProps) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);

  if (!course) notFound();

  const totalLessons = MOCK_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = MOCK_MODULES.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-4">
        <Link
          href="/app/cursos"
          className="text-sm text-foreground-secondary hover:text-white transition-colors"
        >
          &larr; Mis cursos
        </Link>
      </div>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="secondary" className="bg-neon-green/20 text-neon-green text-xs">
            En progreso
          </Badge>
        </div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {course.title}
        </h1>
        <p className="mt-2 text-foreground-secondary">
          {course.shortDescription}
        </p>

        {/* Progress */}
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
              {course.durationMonths} meses estimados
            </span>
          </div>
        </div>
      </div>

      {/* Módulos y lecciones */}
      <div className="mt-8 space-y-4">
        {MOCK_MODULES.map((module) => {
          const moduleLessonsCompleted = module.lessons.filter((l) => l.completed).length;
          const moduleProgress =
            module.lessons.length > 0
              ? Math.round((moduleLessonsCompleted / module.lessons.length) * 100)
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
                      {moduleLessonsCompleted}/{module.lessons.length} lecciones
                      &middot; {module.estimatedHours} hs estimadas
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
                {module.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/app/cursos/${slug}/leccion/${lesson.slug}`}
                    className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-background-tertiary group"
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-neon-green" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-foreground-muted group-hover:text-white" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm truncate",
                          lesson.completed
                            ? "text-foreground-secondary"
                            : "text-white"
                        )}
                      >
                        {lesson.title}
                      </p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-foreground-muted shrink-0">
                      <PlayCircle className="h-3.5 w-3.5" />
                      {lesson.durationMin} min
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-foreground-muted group-hover:text-neon-green transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
