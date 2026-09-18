import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Award,
  Briefcase,
  ArrowRight,
  Compass,
  TrendingUp,
} from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";
import { COURSES } from "@/lib/constants";
import { ALL_LESSONS } from "@/lib/mock-course-data";
import {
  LessonsStat,
  ContinueLearningCard,
  DashboardCourseCard,
} from "@/components/course/dashboard-progress";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mi panel",
};

export default async function DashboardPage() {
  // Mock data for visual demo
  const userName = "Estudiante";
  const enrolledCourses = COURSES.slice(0, 3);
  const totalLessons = ALL_LESSONS.length;
  const firstCourse = enrolledCourses[0];
  const orderedLessons = ALL_LESSONS.map((l) => ({
    slug: l.slug,
    title: l.title,
    durationMin: l.durationMin,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">
        Hola, {userName}
      </h1>
      <p className="mt-2 text-foreground-secondary">
        Bienvenido a tu panel de aprendizaje.
      </p>

      {/* Métricas */}
      <div className="mt-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <BookOpen className="h-4 w-4 text-neon-green sm:h-5 sm:w-5" />
            <h3 className="text-xs font-medium text-foreground-secondary sm:text-sm">
              Cursos activos
            </h3>
          </div>
          <p className="mt-2 text-2xl font-bold text-neon-green sm:text-3xl">
            {enrolledCourses.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <TrendingUp className="h-4 w-4 text-secondary sm:h-5 sm:w-5" />
            <h3 className="text-xs font-medium text-foreground-secondary sm:text-sm">
              Inscripciones
            </h3>
          </div>
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {enrolledCourses.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <CheckCircle2 className="h-4 w-4 text-neon-cyan sm:h-5 sm:w-5" />
            <h3 className="text-xs font-medium text-foreground-secondary sm:text-sm">
              Lecciones
            </h3>
          </div>
          <LessonsStat courseSlug={firstCourse.slug} total={totalLessons} />
        </div>
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <Award className="h-4 w-4 text-secondary sm:h-5 sm:w-5" />
            <h3 className="text-xs font-medium text-foreground-secondary sm:text-sm">
              Certificados
            </h3>
          </div>
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">0</p>
        </div>
      </div>

      {/* Continue learning */}
      <ContinueLearningCard
        courseSlug={firstCourse.slug}
        courseTitle={firstCourse.title}
        lessons={orderedLessons}
      />

      {/* Enrolled courses */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Mis cursos</h2>
          <Link
            href="/app/cursos"
            className="text-sm text-neon-green hover:underline"
          >
            Ver todos
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledCourses.map((course) => (
            <DashboardCourseCard
              key={course.slug}
              courseSlug={course.slug}
              courseTitle={course.title}
              shortDescription={course.shortDescription}
              durationMonths={course.durationMonths}
              lessons={orderedLessons}
            />
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/cursos">
          <GlassCard
            neonBorder="green"
            className="group flex items-center gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10">
              <Compass className="h-6 w-6 text-neon-green" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-neon-green transition-colors">
                Explorar cursos
              </p>
              <p className="mt-1 text-sm text-foreground-secondary">
                9 programas profesionales listos para que empieces.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground-muted group-hover:text-neon-green transition-colors" />
          </GlassCard>
        </Link>

        <Link href="/app/empleabilidad">
          <GlassCard
            neonBorder="cyan"
            className="group flex items-center gap-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/10">
              <Briefcase className="h-6 w-6 text-neon-cyan" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-neon-cyan-bright transition-colors">
                Guía de empleabilidad
              </p>
              <p className="mt-1 text-sm text-foreground-secondary">
                Cómo encontrar trabajo online, dónde postularte y cuánto cobrar.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground-muted group-hover:text-neon-cyan transition-colors" />
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
