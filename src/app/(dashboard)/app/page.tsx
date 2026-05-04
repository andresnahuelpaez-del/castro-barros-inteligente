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
  PlayCircle,
  Clock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { GlassCard } from "@/components/common/glass-card";
import { COURSES } from "@/lib/constants";
import { MOCK_MODULES } from "@/lib/mock-course-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mi panel",
};

export default async function DashboardPage() {
  // Mock data for visual demo
  const userName = "Estudiante";
  const enrolledCourses = COURSES.slice(0, 3);
  const totalLessons = MOCK_MODULES.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );
  const completedLessons = MOCK_MODULES.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0
  );

  // Find the next uncompleted lesson
  const nextLesson = MOCK_MODULES.flatMap((m) => m.lessons).find(
    (l) => !l.completed
  );

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
          <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
            {completedLessons}
            <span className="text-sm font-normal text-foreground-muted">
              /{totalLessons}
            </span>
          </p>
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
      {nextLesson && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-white mb-4">
            Continuá aprendiendo
          </h2>
          <Link href={`/app/cursos/${enrolledCourses[0].slug}/leccion/${nextLesson.slug}`}>
            <div className="group rounded-2xl border border-neon-green/20 bg-card p-4 sm:p-5 hover:border-neon-green/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10 sm:h-14 sm:w-14">
                  <PlayCircle className="h-6 w-6 text-neon-green sm:h-7 sm:w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground-muted mb-0.5">
                    {enrolledCourses[0].title}
                  </p>
                  <p className="text-sm font-semibold text-white group-hover:text-neon-green transition-colors truncate sm:text-base">
                    {nextLesson.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-foreground-muted">
                      <Clock className="h-3 w-3" />
                      {nextLesson.durationMin} min
                    </span>
                    <span className="text-xs text-foreground-muted">
                      {completedLessons}/{totalLessons} completadas
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-foreground-muted group-hover:text-neon-green transition-colors" />
              </div>
              <Progress
                value={Math.round((completedLessons / totalLessons) * 100)}
                className="mt-3 h-1.5"
              />
            </div>
          </Link>
        </div>
      )}

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
          {enrolledCourses.map((course, i) => {
            const progress = i === 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            return (
              <Link key={course.slug} href={`/app/cursos/${course.slug}`}>
                <div className="group rounded-2xl border border-border bg-card p-4 sm:p-5 hover:border-foreground-muted/30 transition-colors h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block h-2 w-2 rounded-full bg-neon-green" />
                    <span className="text-xs text-foreground-muted">
                      En progreso
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-neon-green transition-colors sm:text-base">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-xs text-foreground-secondary line-clamp-2">
                    {course.shortDescription}
                  </p>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-foreground-muted mb-1.5">
                      <span>{progress}% completado</span>
                      <span>{course.durationMonths} meses</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                </div>
              </Link>
            );
          })}
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
                8 programas profesionales listos para que empieces.
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
