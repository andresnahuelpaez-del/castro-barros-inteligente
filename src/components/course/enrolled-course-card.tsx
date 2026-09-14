"use client";

import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useStoredProgress } from "@/lib/course-progress";

interface EnrolledCourseCardProps {
  courseSlug: string;
  courseTitle: string;
  shortDescription: string;
  durationMonths: number;
  lessons: { slug: string; title: string }[];
}

export function EnrolledCourseCard({
  courseSlug,
  courseTitle,
  shortDescription,
  durationMonths,
  lessons,
}: EnrolledCourseCardProps) {
  const { completedSet, hydrated } = useStoredProgress(courseSlug);

  const total = lessons.length;
  const completed = lessons.filter((l) => completedSet.has(l.slug)).length;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const nextLesson =
    lessons.find((l) => !completedSet.has(l.slug)) ?? lessons[0] ?? null;

  const started = hydrated && completed > 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs",
                  progress === 100
                    ? "bg-neon-green/20 text-neon-green"
                    : started
                      ? "bg-neon-green/20 text-neon-green"
                      : "bg-background-tertiary text-foreground-muted"
                )}
              >
                {progress === 100
                  ? "Completado"
                  : started
                    ? "En progreso"
                    : "Sin empezar"}
              </Badge>
            </div>
            <Link href={`/app/cursos/${courseSlug}`}>
              <h2 className="text-lg font-bold text-white transition-colors hover:text-neon-green sm:text-xl">
                {courseTitle}
              </h2>
            </Link>
            <p className="mt-1 line-clamp-2 text-sm text-foreground-secondary">
              {shortDescription}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{progress}%</p>
              <p className="text-xs text-foreground-muted">completado</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs text-foreground-muted">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-neon-green" />
              {completed} de {total} lecciones
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {durationMonths} meses estimados
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {nextLesson && (
        <Link
          href={`/app/cursos/${courseSlug}/leccion/${nextLesson.slug}`}
          className="group flex items-center justify-between gap-3 border-t border-border px-5 py-3 text-sm transition-colors hover:bg-background-tertiary sm:px-6"
        >
          <div className="flex min-w-0 items-center gap-2">
            <BookOpen className="h-4 w-4 shrink-0 text-neon-green" />
            <span className="truncate text-foreground-secondary">
              {progress === 100 ? "Repasar" : progress > 0 ? "Continuar" : "Empezar"}
              : <span className="text-white">{nextLesson.title}</span>
            </span>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-foreground-muted transition-colors group-hover:text-neon-green" />
        </Link>
      )}
    </div>
  );
}
