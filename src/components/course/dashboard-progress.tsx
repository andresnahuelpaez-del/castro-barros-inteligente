"use client";

import Link from "next/link";
import {
  ArrowRight,
  PlayCircle,
  Clock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useStoredProgress } from "@/lib/course-progress";

interface LessonLite {
  slug: string;
  title: string;
  durationMin: number;
}

// Métrica "Lecciones X/Y" del primer curso.
export function LessonsStat({
  courseSlug,
  total,
}: {
  courseSlug: string;
  total: number;
}) {
  const { completedSet } = useStoredProgress(courseSlug);
  const completed = completedSet.size;
  return (
    <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
      {completed}
      <span className="text-sm font-normal text-foreground-muted">/{total}</span>
    </p>
  );
}

// Tarjeta "Continuá aprendiendo": lleva a la próxima lección sin completar.
export function ContinueLearningCard({
  courseSlug,
  courseTitle,
  lessons,
}: {
  courseSlug: string;
  courseTitle: string;
  lessons: LessonLite[];
}) {
  const { completedSet } = useStoredProgress(courseSlug);
  const total = lessons.length;
  const completed = lessons.filter((l) => completedSet.has(l.slug)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const nextLesson = lessons.find((l) => !completedSet.has(l.slug)) ?? lessons[0];

  if (!nextLesson) return null;

  const label = percent === 100 ? "Repasar" : percent > 0 ? "Continuá" : "Empezá";

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-lg font-semibold text-white">{label} aprendiendo</h2>
      <Link
        href={`/app/cursos/${courseSlug}/leccion/${nextLesson.slug}`}
        className="group block rounded-2xl border border-neon-green/20 bg-card p-4 transition-colors hover:border-neon-green/40 sm:p-5"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10 sm:h-14 sm:w-14">
            <PlayCircle className="h-6 w-6 text-neon-green sm:h-7 sm:w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-0.5 text-xs text-foreground-muted">{courseTitle}</p>
            <p className="truncate text-sm font-semibold text-white transition-colors group-hover:text-neon-green sm:text-base">
              {nextLesson.title}
            </p>
            <div className="mt-1 flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-foreground-muted">
                <Clock className="h-3 w-3" />
                {nextLesson.durationMin} min
              </span>
              <span className="text-xs text-foreground-muted">
                {completed}/{total} completadas
              </span>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-foreground-muted transition-colors group-hover:text-neon-green" />
        </div>
        <Progress value={percent} className="mt-3 h-1.5" />
      </Link>
    </div>
  );
}

// Tarjeta compacta de curso para la grilla del panel.
export function DashboardCourseCard({
  courseSlug,
  courseTitle,
  shortDescription,
  durationMonths,
  lessons,
}: {
  courseSlug: string;
  courseTitle: string;
  shortDescription: string;
  durationMonths: number;
  lessons: { slug: string }[];
}) {
  const { completedSet, hydrated } = useStoredProgress(courseSlug);
  const total = lessons.length;
  const completed = lessons.filter((l) => completedSet.has(l.slug)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  const status =
    percent === 100 ? "Completado" : hydrated && completed > 0 ? "En progreso" : "Sin empezar";

  return (
    <Link href={`/app/cursos/${courseSlug}`}>
      <div className="group h-full rounded-2xl border border-border bg-card p-4 transition-colors hover:border-foreground-muted/30 sm:p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-neon-green" />
          <span className="text-xs text-foreground-muted">{status}</span>
        </div>
        <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-neon-green sm:text-base">
          {courseTitle}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-foreground-secondary">
          {shortDescription}
        </p>
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between text-xs text-foreground-muted">
            <span>{percent}% completado</span>
            <span>{durationMonths} meses</span>
          </div>
          <Progress value={percent} className="h-1.5" />
        </div>
      </div>
    </Link>
  );
}
