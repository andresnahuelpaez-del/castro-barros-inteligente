import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { COURSES } from "@/lib/constants";
import {
  MOCK_MODULES,
  ALL_LESSONS,
  QUIZ_PASS_THRESHOLD,
  getLessonContent,
  getLessonQuiz,
} from "@/lib/mock-course-data";
import { LessonView } from "@/components/course/lesson-view";

interface PageProps {
  params: Promise<{ slug: string; lessonSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lessonSlug } = await params;
  const lesson = ALL_LESSONS.find((l) => l.slug === lessonSlug);
  return { title: lesson ? lesson.title : `Lección: ${lessonSlug}` };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lessonSlug } = await params;
  const course = COURSES.find((c) => c.slug === slug);

  const currentIndex = ALL_LESSONS.findIndex((l) => l.slug === lessonSlug);
  const current = currentIndex >= 0 ? ALL_LESSONS[currentIndex] : null;

  if (!current || !course) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href={`/app/cursos/${slug}`}
          className="flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-white"
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

  const prev =
    currentIndex > 0
      ? { slug: ALL_LESSONS[currentIndex - 1].slug, title: ALL_LESSONS[currentIndex - 1].title }
      : null;
  const next =
    currentIndex < ALL_LESSONS.length - 1
      ? { slug: ALL_LESSONS[currentIndex + 1].slug, title: ALL_LESSONS[currentIndex + 1].title }
      : null;

  return (
    <LessonView
      courseSlug={slug}
      courseTitle={course.title}
      lesson={{
        slug: current.slug,
        title: current.title,
        order: current.order,
        durationMin: current.durationMin,
        videoUrl: current.videoUrl,
        moduleId: current.moduleId,
        moduleTitle: current.moduleTitle,
      }}
      prev={prev}
      next={next}
      modules={MOCK_MODULES}
      content={getLessonContent(current)}
      quiz={getLessonQuiz(current)}
      passThreshold={QUIZ_PASS_THRESHOLD}
    />
  );
}
