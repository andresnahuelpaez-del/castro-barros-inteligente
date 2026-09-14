"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Lock,
  MessageSquare,
  ListChecks,
  ChevronDown,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/lib/course-progress";
import type {
  CourseModule,
  ContentBlock,
  QuizQuestion,
} from "@/lib/mock-course-data";
import { VideoPlayer } from "./video-player";
import { LessonContent } from "./lesson-content";
import { LessonQuiz } from "./lesson-quiz";
import { CourseOutline } from "./course-outline";
import { CompletionOverlay, type Completion } from "./completion-overlay";

interface NavRef {
  slug: string;
  title: string;
}

interface LessonViewProps {
  courseSlug: string;
  courseTitle: string;
  lesson: {
    slug: string;
    title: string;
    order: number;
    durationMin: number;
    videoUrl: string | null;
    moduleId: string;
    moduleTitle: string;
  };
  prev: NavRef | null;
  next: NavRef | null;
  modules: CourseModule[];
  content: ContentBlock[];
  quiz: QuizQuestion[];
  passThreshold: number;
}

export function LessonView({
  courseSlug,
  courseTitle,
  lesson,
  prev,
  next,
  modules,
  content,
  quiz,
  passThreshold,
}: LessonViewProps) {
  const {
    hydrated,
    isCompleted,
    isUnlocked,
    isQuizPassed,
    markComplete,
    markQuizPassed,
    completedCount,
    totalLessons,
    coursePercent,
  } = useCourseProgress();

  const [celebration, setCelebration] = useState<Completion | null>(null);
  const [outlineOpen, setOutlineOpen] = useState(false);

  const done = isCompleted(lesson.slug);
  const quizPassed = isQuizPassed(lesson.slug);
  const hasQuiz = quiz.length > 0;
  const canComplete = !hasQuiz || quizPassed;
  const locked = hydrated && !isUnlocked(lesson.slug) && !done;

  const courseHref = `/app/cursos/${courseSlug}`;
  const nextHref = next ? `${courseHref}/leccion/${next.slug}` : courseHref;

  function handleComplete() {
    if (done || !canComplete) return;

    const moduleLessons =
      modules.find((m) => m.id === lesson.moduleId)?.lessons ?? [];
    const moduleWillComplete = moduleLessons.every(
      (l) => l.slug === lesson.slug || isCompleted(l.slug)
    );
    const courseWillComplete = completedCount + 1 >= totalLessons;

    markComplete(lesson.slug);

    if (courseWillComplete) {
      setCelebration({
        type: "course",
        title: courseTitle,
        href: courseHref,
        cta: "Ir a mi certificado",
      });
    } else if (moduleWillComplete) {
      setCelebration({
        type: "module",
        title: `Completaste "${lesson.moduleTitle}"`,
        href: nextHref,
        cta: "Siguiente lección",
      });
    }
  }

  // Pantalla de lección bloqueada (acceso directo por URL)
  if (locked) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background-secondary">
            <Lock className="h-7 w-7 text-foreground-muted" />
          </div>
          <h1 className="mt-5 text-xl font-bold text-white">Lección bloqueada</h1>
          <p className="mt-2 text-sm text-foreground-secondary">
            Para desbloquear esta lección, primero completá las anteriores. El
            curso avanza en orden para que no te pierdas nada.
          </p>
          <Link
            href={courseHref}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-neon-green/30 bg-neon-green/5 px-5 py-3 text-sm font-medium text-neon-green transition-colors hover:bg-neon-green/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al curso
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <CompletionOverlay
        completion={celebration}
        onClose={() => setCelebration(null)}
      />

      {/* Top bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={courseHref}
          className="flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          {courseTitle}
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground-muted">
            {completedCount}/{totalLessons} lecciones
          </span>
          <Progress value={coursePercent} className="h-2 w-24 sm:w-32" />
          <span className="text-xs font-medium text-neon-green">
            {coursePercent}%
          </span>
        </div>
      </div>

      {/* Índice desplegable (mobile) */}
      <div className="mb-4 lg:hidden">
        <button
          onClick={() => setOutlineOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-white"
        >
          <span className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-neon-green" />
            Contenido del curso
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-foreground-muted transition-transform",
              outlineOpen && "rotate-180"
            )}
          />
        </button>
        {outlineOpen && (
          <div className="mt-2 overflow-hidden rounded-xl border border-border bg-card">
            <CourseOutline
              courseSlug={courseSlug}
              modules={modules}
              currentSlug={lesson.slug}
            />
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Contenido principal */}
        <div className="space-y-6">
          <VideoPlayer
            title={lesson.title}
            durationMin={lesson.durationMin}
            videoUrl={lesson.videoUrl}
          />

          {/* Encabezado de la lección */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-background-tertiary text-xs text-foreground-muted"
              >
                {lesson.moduleTitle}
              </Badge>
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs",
                  done
                    ? "bg-neon-green/20 text-neon-green"
                    : "bg-background-tertiary text-foreground-muted"
                )}
              >
                {done ? "Completada" : "En progreso"}
              </Badge>
            </div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              {lesson.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-foreground-muted">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {lesson.durationMin} min
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" />
                Lección {lesson.order}
              </span>
            </div>
          </div>

          <LessonContent blocks={content} lessonTitle={lesson.title} />

          {hasQuiz && (
            <LessonQuiz
              questions={quiz}
              passThreshold={passThreshold}
              alreadyPassed={quizPassed}
              onPass={() => markQuizPassed(lesson.slug)}
            />
          )}

          {/* Barra de completar lección */}
          <div
            className={cn(
              "rounded-2xl border p-5 sm:p-6",
              done
                ? "border-neon-green/30 bg-neon-green/5"
                : "border-border bg-card"
            )}
          >
            {done ? (
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-neon-green" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Lección completada
                    </p>
                    <p className="text-xs text-foreground-muted">
                      Buen trabajo. Podés continuar cuando quieras.
                    </p>
                  </div>
                </div>
                <Link
                  href={nextHref}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-green px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-neon-green/90 sm:w-auto"
                >
                  {next ? "Siguiente lección" : "Finalizar curso"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-center">
                <button
                  onClick={handleComplete}
                  disabled={!canComplete}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors sm:w-auto",
                    canComplete
                      ? "bg-neon-green text-black hover:bg-neon-green/90"
                      : "cursor-not-allowed bg-foreground-muted/10 text-foreground-muted"
                  )}
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Marcar como completada y continuar
                </button>
                {!canComplete && (
                  <p className="text-xs text-foreground-muted">
                    Aprobá el quiz de esta lección para poder completarla.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Comentarios (próximamente) */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-neon-cyan" />
              <h2 className="text-lg font-semibold text-white">
                Preguntas y comentarios
              </h2>
              <span className="ml-auto rounded-full bg-background-tertiary px-2.5 py-1 text-xs font-medium text-foreground-muted">
                Próximamente
              </span>
            </div>
            <div className="rounded-xl border border-border bg-background-secondary p-4 opacity-70">
              <textarea
                disabled
                rows={3}
                placeholder="Escribí tu pregunta o comentario sobre esta lección..."
                className="w-full resize-none rounded-lg border border-border bg-card p-3 text-sm text-foreground-secondary placeholder:text-foreground-muted"
              />
              <div className="mt-3 flex justify-end">
                <span className="rounded-lg bg-neon-green/15 px-4 py-2 text-xs font-medium text-neon-green">
                  Enviar comentario
                </span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-foreground-muted">
              La sección de preguntas y respuestas se habilitará muy pronto.
            </p>
          </div>

          {/* Navegación prev / next */}
          <div className="flex items-center justify-between gap-4 pb-8">
            {prev ? (
              <Link
                href={`${courseHref}/leccion/${prev.slug}`}
                className="group flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground-secondary transition-colors hover:border-foreground-muted hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 transition-colors group-hover:text-neon-green" />
                <span className="hidden max-w-[180px] truncate sm:inline">
                  {prev.title}
                </span>
                <span className="sm:hidden">Anterior</span>
              </Link>
            ) : (
              <div />
            )}

            {done ? (
              <Link
                href={nextHref}
                className="group flex items-center gap-2 rounded-xl border border-neon-green/30 bg-neon-green/5 px-4 py-3 text-sm text-neon-green transition-colors hover:bg-neon-green/10"
              >
                <span className="hidden max-w-[180px] truncate sm:inline">
                  {next ? next.title : "Finalizar curso"}
                </span>
                <span className="sm:hidden">{next ? "Siguiente" : "Finalizar"}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            ) : (
              <div
                className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground-muted/60"
                title="Completá esta lección para continuar"
              >
                <span className="hidden sm:inline">Completá para continuar</span>
                <span className="sm:hidden">Bloqueado</span>
                <Lock className="h-4 w-4 shrink-0" />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="mb-3 text-sm font-semibold text-white">
                Progreso del curso
              </h3>
              <Progress value={coursePercent} className="mb-2 h-2" />
              <p className="text-xs text-foreground-muted">
                {completedCount} de {totalLessons} lecciones completadas
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border p-4">
                <h3 className="text-sm font-semibold text-white">
                  Contenido del curso
                </h3>
              </div>
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                <CourseOutline
                  courseSlug={courseSlug}
                  modules={modules}
                  currentSlug={lesson.slug}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
