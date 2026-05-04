import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  Circle,
  ChevronRight,
  FileText,
  HelpCircle,
  Clock,
  BookOpen,
  Download,
  MessageSquare,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { COURSES } from "@/lib/constants";
import { MOCK_MODULES, MOCK_QUIZ } from "@/lib/mock-course-data";
import { cn } from "@/lib/utils";
import { LessonQuiz } from "./lesson-quiz";

interface PageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lessonSlug } = await params;
  const allLessons = MOCK_MODULES.flatMap((m) => m.lessons);
  const lesson = allLessons.find((l) => l.slug === lessonSlug);
  return { title: lesson ? lesson.title : `Lección: ${lessonSlug}` };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonSlug } = await params;
  const course = COURSES.find((c) => c.slug === slug);

  const allLessons = MOCK_MODULES.flatMap((m) =>
    m.lessons.map((l) => ({
      ...l,
      moduleTitle: m.title,
    }))
  );
  const currentIndex = allLessons.findIndex((l) => l.slug === lessonSlug);
  const lesson = currentIndex >= 0 ? allLessons[currentIndex] : null;
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  const completedCount = allLessons.filter((l) => l.completed).length;
  const progressPercent = Math.round(
    (completedCount / allLessons.length) * 100
  );

  if (!lesson || !course) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={`/app/cursos/${slug}`}
          className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al curso
        </Link>
        <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-foreground-secondary">
            Esta lección no fue encontrada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Top bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <Link
          href={`/app/cursos/${slug}`}
          className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {course.title}
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-xs text-foreground-muted">
            {completedCount}/{allLessons.length} lecciones
          </span>
          <Progress value={progressPercent} className="h-2 w-24 sm:w-32" />
          <span className="text-xs font-medium text-neon-green">
            {progressPercent}%
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main content */}
        <div className="space-y-6">
          {/* Video player placeholder */}
          <div className="relative aspect-video w-full rounded-2xl border border-border bg-card overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background-secondary to-card">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-neon-green/30 bg-neon-green/10 sm:h-24 sm:w-24">
                <PlayCircle className="h-10 w-10 text-neon-green sm:h-12 sm:w-12" />
              </div>
              <p className="mt-4 text-sm font-medium text-white">
                {lesson.title}
              </p>
              <p className="mt-1 text-xs text-foreground-muted">
                {lesson.durationMin} minutos
              </p>
            </div>
            {/* Fake progress bar at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-foreground-muted/10">
              <div
                className="h-full bg-neon-green rounded-r"
                style={{ width: lesson.completed ? "100%" : "35%" }}
              />
            </div>
          </div>

          {/* Lesson header */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge
                variant="secondary"
                className="bg-background-tertiary text-foreground-muted text-xs"
              >
                {lesson.moduleTitle}
              </Badge>
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs",
                  lesson.completed
                    ? "bg-neon-green/20 text-neon-green"
                    : "bg-background-tertiary text-foreground-muted"
                )}
              >
                {lesson.completed ? "Completada" : "En progreso"}
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

          {/* Content area placeholder */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-neon-green" />
              <h2 className="text-lg font-semibold text-white">
                Material de la lección
              </h2>
            </div>
            <div className="space-y-4 text-sm text-foreground-secondary leading-relaxed">
              <div className="h-4 w-full rounded bg-foreground-muted/10" />
              <div className="h-4 w-11/12 rounded bg-foreground-muted/10" />
              <div className="h-4 w-4/5 rounded bg-foreground-muted/10" />
              <div className="h-4 w-full rounded bg-foreground-muted/10" />
              <div className="h-4 w-3/4 rounded bg-foreground-muted/10" />

              {/* Placeholder code block */}
              <div className="rounded-xl bg-background-secondary border border-border p-4 space-y-2">
                <div className="h-3 w-1/3 rounded bg-neon-green/10" />
                <div className="h-3 w-2/3 rounded bg-foreground-muted/10" />
                <div className="h-3 w-1/2 rounded bg-foreground-muted/10" />
                <div className="h-3 w-3/5 rounded bg-neon-green/10" />
              </div>

              <div className="h-4 w-full rounded bg-foreground-muted/10" />
              <div className="h-4 w-5/6 rounded bg-foreground-muted/10" />

              {/* Placeholder image */}
              <div className="aspect-[16/9] w-full rounded-xl bg-background-secondary border border-border flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto h-12 w-12 rounded-lg bg-foreground-muted/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-foreground-muted/40" />
                  </div>
                  <p className="mt-2 text-xs text-foreground-muted">
                    Imagen ilustrativa
                  </p>
                </div>
              </div>

              <div className="h-4 w-full rounded bg-foreground-muted/10" />
              <div className="h-4 w-2/3 rounded bg-foreground-muted/10" />
            </div>

            {/* Downloadable resources */}
            <div className="mt-6 rounded-xl bg-background-secondary border border-border p-4">
              <h3 className="text-sm font-medium text-white mb-3">
                Recursos descargables
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3 rounded-lg bg-card border border-border p-3 text-sm">
                  <Download className="h-4 w-4 text-neon-green shrink-0" />
                  <span className="text-foreground-secondary flex-1 truncate">
                    Guía práctica - {lesson.title}.pdf
                  </span>
                  <span className="text-xs text-foreground-muted shrink-0">
                    2.4 MB
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-card border border-border p-3 text-sm">
                  <Download className="h-4 w-4 text-neon-green shrink-0" />
                  <span className="text-foreground-secondary flex-1 truncate">
                    Plantilla de ejercicios.xlsx
                  </span>
                  <span className="text-xs text-foreground-muted shrink-0">
                    856 KB
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quiz section */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="h-5 w-5 text-secondary" />
              <h2 className="text-lg font-semibold text-white">
                Quiz de la lección
              </h2>
            </div>
            <p className="text-sm text-foreground-secondary mb-6">
              Respondé las preguntas para verificar tu comprensión del material.
              Podés reintentar las veces que necesites.
            </p>
            <LessonQuiz questions={MOCK_QUIZ} />
          </div>

          {/* Comments/questions placeholder */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-5 w-5 text-neon-cyan" />
              <h2 className="text-lg font-semibold text-white">
                Preguntas y comentarios
              </h2>
            </div>
            <div className="rounded-xl bg-background-secondary border border-border p-4">
              <textarea
                disabled
                className="w-full resize-none rounded-lg bg-card border border-border p-3 text-sm text-foreground-secondary placeholder:text-foreground-muted"
                rows={3}
                placeholder="Escribí tu pregunta o comentario sobre esta lección..."
              />
              <div className="mt-3 flex justify-end">
                <button
                  disabled
                  className="rounded-lg bg-neon-green/20 px-4 py-2 text-xs font-medium text-neon-green"
                >
                  Enviar comentario
                </button>
              </div>
            </div>
            <p className="mt-3 text-xs text-foreground-muted text-center">
              La sección de comentarios estará disponible próximamente.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4 pb-8">
            {prevLesson ? (
              <Link
                href={`/app/cursos/${slug}/leccion/${prevLesson.slug}`}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground-secondary hover:text-white hover:border-foreground-muted transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 shrink-0 group-hover:text-neon-green transition-colors" />
                <span className="truncate hidden sm:inline">
                  {prevLesson.title}
                </span>
                <span className="sm:hidden">Anterior</span>
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link
                href={`/app/cursos/${slug}/leccion/${nextLesson.slug}`}
                className="flex items-center gap-2 rounded-xl border border-neon-green/30 bg-neon-green/5 px-4 py-3 text-sm text-neon-green hover:bg-neon-green/10 transition-colors group"
              >
                <span className="truncate hidden sm:inline">
                  {nextLesson.title}
                </span>
                <span className="sm:hidden">Siguiente</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            ) : (
              <Link
                href={`/app/cursos/${slug}`}
                className="flex items-center gap-2 rounded-xl border border-neon-green/30 bg-neon-green/5 px-4 py-3 text-sm text-neon-green hover:bg-neon-green/10 transition-colors"
              >
                Finalizar curso
                <CheckCircle2 className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-4">
            {/* Course progress card */}
            <div className="rounded-2xl border border-border bg-card p-4">
              <h3 className="text-sm font-semibold text-white mb-3">
                Progreso del curso
              </h3>
              <Progress value={progressPercent} className="h-2 mb-2" />
              <p className="text-xs text-foreground-muted">
                {completedCount} de {allLessons.length} lecciones completadas
              </p>
            </div>

            {/* Module navigation */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="text-sm font-semibold text-white">
                  Contenido del curso
                </h3>
              </div>
              <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
                {MOCK_MODULES.map((module) => (
                  <div key={module.id}>
                    <div className="px-4 py-2.5 bg-background-secondary border-b border-border">
                      <p className="text-xs font-medium text-foreground-muted">
                        {module.title}
                      </p>
                    </div>
                    <div className="divide-y divide-border">
                      {module.lessons.map((l) => (
                        <Link
                          key={l.id}
                          href={`/app/cursos/${slug}/leccion/${l.slug}`}
                          className={cn(
                            "flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors hover:bg-background-tertiary",
                            l.slug === lessonSlug
                              ? "bg-neon-green/5 border-l-2 border-l-neon-green"
                              : ""
                          )}
                        >
                          {l.completed ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-neon-green" />
                          ) : l.slug === lessonSlug ? (
                            <PlayCircle className="h-3.5 w-3.5 shrink-0 text-neon-green" />
                          ) : (
                            <Circle className="h-3.5 w-3.5 shrink-0 text-foreground-muted" />
                          )}
                          <span
                            className={cn(
                              "truncate",
                              l.slug === lessonSlug
                                ? "text-neon-green font-medium"
                                : l.completed
                                  ? "text-foreground-muted"
                                  : "text-foreground-secondary"
                            )}
                          >
                            {l.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
