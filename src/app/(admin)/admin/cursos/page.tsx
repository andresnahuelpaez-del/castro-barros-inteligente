import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";
import { COURSES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Admin - Cursos",
};

// TODO: Reactivar queries Supabase cuando se conecte
export default async function AdminCoursesPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Cursos</h1>
          <p className="mt-1 text-foreground-secondary">
            Gestioná los cursos de la plataforma.
          </p>
        </div>
        <Link href="/admin/cursos/nuevo">
          <NeonButton size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo curso
          </NeonButton>
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {COURSES.map((course) => (
          <div
            key={course.slug}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-bright"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background-tertiary">
              <BookOpen className="h-6 w-6 text-neon-green" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white truncate">
                {course.title}
              </h3>
              <p className="mt-0.5 text-sm text-foreground-muted truncate">
                {course.shortDescription}
              </p>
              <p className="mt-1 text-xs text-foreground-muted">
                {course.durationMonths} meses &middot; {course.hoursPerWeek} hs/semana
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
