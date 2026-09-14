"use client";

import { use } from "react";
import { CourseProgressProvider, type LessonRef } from "@/lib/course-progress";
import { MOCK_MODULES } from "@/lib/mock-course-data";

// Envuelve la página del curso y todas sus lecciones con el estado de progreso
// (guardado en el navegador), para que compartan el mismo avance.
export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const lessons: LessonRef[] = MOCK_MODULES.flatMap((m) =>
    m.lessons.map((l) => ({
      slug: l.slug,
      moduleId: m.id,
      hasQuiz: true,
    }))
  );

  return (
    <CourseProgressProvider courseSlug={slug} lessons={lessons}>
      {children}
    </CourseProgressProvider>
  );
}
