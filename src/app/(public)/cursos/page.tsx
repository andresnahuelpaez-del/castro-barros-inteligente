import type { Metadata } from "next";
import Link from "next/link";
import {
  Video,
  Briefcase,
  Megaphone,
  Store,
  Globe,
  ShoppingCart,
  BarChart3,
  Code,
} from "lucide-react";
import { COURSES, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/constants";
import { GlassCard } from "@/components/common/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Explorá los 8 cursos de capacitación digital gratuita con IA del Departamento Castro Barros.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Video, Briefcase, Megaphone, Store, Globe, ShoppingCart, BarChart3, Code,
};

export default function CursosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Nuestros cursos</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
          Ocho programas profesionales diseñados para construir tu futuro
          digital. Todos 100% gratuitos y con certificación oficial.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {COURSES.map((course) => {
          const Icon = iconMap[course.icon];
          return (
            <Link key={course.slug} href={`/cursos/${course.slug}`}>
              <GlassCard neonBorder="green" className="group h-full">
                <div className="mb-4 flex items-center justify-between">
                  {Icon && <Icon className="h-8 w-8 text-neon-green" />}
                  <Badge
                    className={cn(
                      "text-xs font-medium",
                      LEVEL_COLORS[course.level]
                    )}
                    variant="secondary"
                  >
                    {LEVEL_LABELS[course.level]}
                  </Badge>
                </div>
                <h2 className="text-lg font-semibold text-white group-hover:text-neon-green transition-colors">
                  {course.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {course.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-foreground-muted">
                  <span>{course.durationMonths} meses</span>
                  <span className="text-border-bright">|</span>
                  <span>{course.hoursPerWeek} hs/semana</span>
                </div>
                <p className="mt-4 text-sm font-medium text-neon-green opacity-0 transition-opacity group-hover:opacity-100">
                  Ver curso &rarr;
                </p>
              </GlassCard>
            </Link>
          );
        })}
      </div>

      {/* Banner de empleabilidad */}
      <div className="mt-12">
        <Link href="/registro">
          <div className="group flex flex-col items-center gap-4 rounded-2xl border border-neon-cyan/20 bg-neon-cyan/5 p-8 text-center transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/10 sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-neon-cyan/20">
              <Briefcase className="h-7 w-7 text-neon-cyan" />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-white group-hover:text-neon-cyan-bright transition-colors">
                ¿Querés saber cómo conseguir trabajo online?
              </p>
              <p className="mt-1 text-sm text-foreground-secondary">
                Tenemos una guía completa y gratuita: plataformas dónde buscar,
                cómo postularte, cómo armar tu perfil y cuánto cobrar.
                Registrate para acceder.
              </p>
            </div>
            <span className="text-sm font-medium text-neon-cyan whitespace-nowrap">
              Ver guía &rarr;
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
