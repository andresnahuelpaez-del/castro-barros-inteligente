"use client";

import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCourseProgress } from "@/lib/course-progress";
import type { CourseModule } from "@/lib/mock-course-data";

interface CourseOutlineProps {
  courseSlug: string;
  modules: CourseModule[];
  currentSlug?: string;
}

export function CourseOutline({
  courseSlug,
  modules,
  currentSlug,
}: CourseOutlineProps) {
  const { isCompleted, isUnlocked, hydrated } = useCourseProgress();

  return (
    <div className="divide-y divide-border">
      {modules.map((module) => (
        <div key={module.id}>
          <div className="border-b border-border bg-background-secondary px-4 py-2.5">
            <p className="text-xs font-medium text-foreground-muted">
              {module.title}
            </p>
          </div>
          <div className="divide-y divide-border">
            {module.lessons.map((l) => {
              const done = isCompleted(l.slug);
              const isCurrent = l.slug === currentSlug;
              // Antes de hidratar solo la primera lección está desbloqueada; para no
              // mostrar candados de más, tratamos "no hidratado" como accesible.
              const unlocked = !hydrated || isUnlocked(l.slug) || done;

              const inner = (
                <>
                  {done ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-neon-green" />
                  ) : !unlocked ? (
                    <Lock className="h-3.5 w-3.5 shrink-0 text-foreground-muted/60" />
                  ) : isCurrent ? (
                    <PlayCircle className="h-3.5 w-3.5 shrink-0 text-neon-green" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 shrink-0 text-foreground-muted" />
                  )}
                  <span
                    className={cn(
                      "flex-1 truncate",
                      isCurrent
                        ? "font-medium text-neon-green"
                        : !unlocked
                          ? "text-foreground-muted/60"
                          : done
                            ? "text-foreground-muted"
                            : "text-foreground-secondary"
                    )}
                  >
                    {l.title}
                  </span>
                  <span className="shrink-0 text-[10px] text-foreground-muted">
                    {l.durationMin}m
                  </span>
                </>
              );

              const base =
                "flex items-center gap-2.5 px-4 py-2.5 text-xs transition-colors";

              if (!unlocked) {
                return (
                  <div
                    key={l.id}
                    className={cn(base, "cursor-not-allowed opacity-70")}
                    title="Completá la lección anterior para desbloquear"
                  >
                    {inner}
                  </div>
                );
              }

              return (
                <Link
                  key={l.id}
                  href={`/app/cursos/${courseSlug}/leccion/${l.slug}`}
                  className={cn(
                    base,
                    "hover:bg-background-tertiary",
                    isCurrent && "border-l-2 border-l-neon-green bg-neon-green/5"
                  )}
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
