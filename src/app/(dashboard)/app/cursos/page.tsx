import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";
import { COURSES } from "@/lib/constants";
import { ALL_LESSONS } from "@/lib/mock-course-data";
import { EnrolledCourseCard } from "@/components/course/enrolled-course-card";

export const metadata: Metadata = {
  title: "Mis cursos",
};

export default async function MisCursosPage() {
  // Mock: primeros 3 cursos "inscriptos"
  const enrolledCourses = COURSES.slice(0, 3);
  const lessons = ALL_LESSONS.map((l) => ({ slug: l.slug, title: l.title }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Mis cursos</h1>
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

      <div className="mt-8 space-y-4">
        {enrolledCourses.map((course) => (
          <EnrolledCourseCard
            key={course.slug}
            courseSlug={course.slug}
            courseTitle={course.title}
            shortDescription={course.shortDescription}
            durationMonths={course.durationMonths}
            lessons={lessons}
          />
        ))}
      </div>

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
