import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, BookOpen, FileText, Dumbbell } from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";
import { LessonTabs } from "./lesson-tabs";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonSlug } = await params;
  return { title: `Leccion: ${lessonSlug}` };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonSlug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Obtener curso
  const { data: course } = await supabase
    .from("courses")
    .select("id, slug, title")
    .eq("slug", slug)
    .single();
  if (!course) notFound();

  // Verificar inscripcion
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id")
    .eq("user_id", user.id)
    .eq("course_id", course.id)
    .single();
  if (!enrollment) redirect(`/cursos/${slug}`);

  // Obtener la leccion con su modulo
  const { data: lesson } = await supabase
    .from("lessons")
    .select("*, modules!inner(id, title, course_id, order)")
    .eq("slug", lessonSlug)
    .single();

  if (!lesson || (lesson.modules as { course_id: string }).course_id !== course.id) {
    notFound();
  }

  // Obtener progreso de esta leccion
  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("*")
    .eq("user_id", user.id)
    .eq("lesson_id", lesson.id)
    .single();

  // Obtener leccion anterior y siguiente
  const moduleData = lesson.modules as { id: string; order: number };

  const { data: allLessons } = await supabase
    .from("lessons")
    .select("id, slug, order, module_id, modules!inner(order, course_id)")
    .eq("modules.course_id", course.id)
    .order("modules(order)")
    .order("order");

  const sortedLessons = (allLessons || []).sort((a, b) => {
    const aModOrder = (a.modules as unknown as { order: number }).order;
    const bModOrder = (b.modules as unknown as { order: number }).order;
    if (aModOrder !== bModOrder) return aModOrder - bModOrder;
    return a.order - b.order;
  });

  const currentIndex = sortedLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? sortedLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < sortedLessons.length - 1
      ? sortedLessons[currentIndex + 1]
      : null;

  const isCompleted = !!progress?.completed_at;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Navigation */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/app/cursos/${slug}`}
          className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al curso
        </Link>
        {isCompleted && (
          <span className="flex items-center gap-1.5 text-sm text-neon-green">
            <CheckCircle2 className="h-4 w-4" />
            Completada
          </span>
        )}
      </div>

      {/* Lesson header */}
      <div className="mb-6">
        <p className="text-xs text-foreground-muted mb-1">
          {(lesson.modules as { title: string }).title}
        </p>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {lesson.title}
        </h1>
        {lesson.description && (
          <p className="mt-2 text-foreground-secondary">{lesson.description}</p>
        )}
      </div>

      {/* Lesson content tabs */}
      <LessonTabs
        lessonId={lesson.id}
        enrollmentId={enrollment.id}
        videoUrl={lesson.video_url}
        videoDuration={lesson.video_duration_sec}
        contentMd={lesson.content_md}
        exerciseMd={lesson.exercise_md}
        lastPosition={progress?.last_position_sec || 0}
        isCompleted={isCompleted}
      />

      {/* Navigation buttons */}
      <div className="mt-8 flex items-center justify-between">
        {prevLesson ? (
          <Link href={`/app/cursos/${slug}/leccion/${prevLesson.slug}`}>
            <NeonButton variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </NeonButton>
          </Link>
        ) : (
          <div />
        )}
        {nextLesson ? (
          <Link href={`/app/cursos/${slug}/leccion/${nextLesson.slug}`}>
            <NeonButton size="sm">
              Siguiente
              <ArrowRight className="ml-2 h-4 w-4" />
            </NeonButton>
          </Link>
        ) : (
          <Link href={`/app/cursos/${slug}`}>
            <NeonButton size="sm">
              Volver al curso
              <ArrowRight className="ml-2 h-4 w-4" />
            </NeonButton>
          </Link>
        )}
      </div>
    </div>
  );
}
