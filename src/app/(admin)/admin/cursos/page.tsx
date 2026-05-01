import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BookOpen, Plus, Eye, EyeOff, Users, Layers } from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Cursos",
};

export default async function AdminCoursesPage() {
  const supabase = await createClient();

  const { data: courses } = await supabase
    .from("courses")
    .select(
      "*, modules(id), enrollments(id)"
    )
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Cursos</h1>
          <p className="mt-1 text-foreground-secondary">
            Gestiona los cursos de la plataforma.
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
        {courses && courses.length > 0 ? (
          courses.map((course) => {
            const moduleCount = (course.modules as unknown[])?.length || 0;
            const enrollmentCount = (course.enrollments as unknown[])?.length || 0;

            return (
              <div
                key={course.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-border-bright"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-background-tertiary">
                  <BookOpen className="h-6 w-6 text-neon-green" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white truncate">
                      {course.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs shrink-0",
                        course.published
                          ? "bg-neon-green/20 text-neon-green"
                          : "bg-background-tertiary text-foreground-muted"
                      )}
                    >
                      {course.published ? "Publicado" : "Borrador"}
                    </Badge>
                  </div>
                  <p className="mt-0.5 text-sm text-foreground-muted truncate">
                    {course.short_description}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-foreground-muted">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5" />
                      {moduleCount} modulos
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {enrollmentCount} inscritos
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link href={`/admin/cursos/${course.id}`}>
                    <NeonButton variant="outline" size="sm">
                      Editar
                    </NeonButton>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-foreground-muted" />
            <p className="mt-4 text-lg font-medium text-white">
              No hay cursos aun
            </p>
            <p className="mt-1 text-sm text-foreground-secondary">
              Crea tu primer curso para empezar.
            </p>
            <Link href="/admin/cursos/nuevo" className="mt-4 inline-block">
              <NeonButton size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Nuevo curso
              </NeonButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
