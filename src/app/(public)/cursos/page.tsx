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
  ShieldCheck,
  Workflow,
  Languages,
} from "lucide-react";
import { COURSES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cursos",
  description:
    "Explorá los 11 cursos de capacitación digital gratuita con IA del Departamento Castro Barros.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Video, Briefcase, Megaphone, Store, Globe, ShoppingCart, BarChart3, Code, ShieldCheck, Workflow, Languages,
};

const courseColors: Record<string, { accent: string; bg: string; border: string }> = {
  "creacion-de-contenido-con-ia": { accent: "#FF6B6B", bg: "bg-[#FF6B6B]/10", border: "border-[#FF6B6B]/20 hover:border-[#FF6B6B]/40" },
  "ia-para-tu-trabajo": { accent: "#39FF14", bg: "bg-neon-green/10", border: "border-neon-green/20 hover:border-neon-green/40" },
  "marketing-digital-con-ia": { accent: "#F59E0B", bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/20 hover:border-[#F59E0B]/40" },
  "gestion-de-negocios-con-ia": { accent: "#A855F7", bg: "bg-[#A855F7]/10", border: "border-[#A855F7]/20 hover:border-[#A855F7]/40" },
  "diseno-web-con-ia": { accent: "#06B6D4", bg: "bg-[#06B6D4]/10", border: "border-[#06B6D4]/20 hover:border-[#06B6D4]/40" },
  "ecommerce-con-ia": { accent: "#10B981", bg: "bg-[#10B981]/10", border: "border-[#10B981]/20 hover:border-[#10B981]/40" },
  "analisis-de-datos-con-ia": { accent: "#3B82F6", bg: "bg-[#3B82F6]/10", border: "border-[#3B82F6]/20 hover:border-[#3B82F6]/40" },
  "vibe-coding-desarrollo-apps-ia": { accent: "#EC4899", bg: "bg-[#EC4899]/10", border: "border-[#EC4899]/20 hover:border-[#EC4899]/40" },
  "qa-testing-con-ia": { accent: "#8B5CF6", bg: "bg-[#8B5CF6]/10", border: "border-[#8B5CF6]/20 hover:border-[#8B5CF6]/40" },
  "automatizaciones-con-ia-y-no-code": { accent: "#F97316", bg: "bg-[#F97316]/10", border: "border-[#F97316]/20 hover:border-[#F97316]/40" },
  "ingles-laboral-con-ia": { accent: "#14B8A6", bg: "bg-[#14B8A6]/10", border: "border-[#14B8A6]/20 hover:border-[#14B8A6]/40" },
};

const defaultColor = { accent: "#39FF14", bg: "bg-neon-green/10", border: "border-border hover:border-border-bright" };

export default function CursosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Nuestros cursos</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
          Diez programas profesionales diseñados para construir tu futuro
          digital. Todos 100% gratuitos y con certificación oficial.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {COURSES.map((course) => {
          const Icon = iconMap[course.icon];
          const colors = courseColors[course.slug] || defaultColor;
          return (
            <Link key={course.slug} href={`/cursos/${course.slug}`}>
              <div
                className={`group relative flex h-full flex-col rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${colors.border}`}
                style={{
                  ["--accent" as string]: colors.accent,
                }}
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-30 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                  }}
                />

                <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg}`}>
                  {Icon && <Icon className="h-5 w-5" style={{ color: colors.accent }} />}
                </div>

                <h2 className="text-[15px] font-semibold leading-snug text-white transition-colors" style={{}}>
                  <span className="group-hover:hidden">{course.title}</span>
                  <span className="hidden group-hover:inline" style={{ color: colors.accent }}>
                    {course.title}
                  </span>
                </h2>

                <p className="mt-2 flex-1 text-xs leading-relaxed text-foreground-secondary">
                  {course.shortDescription}
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-border/50 pt-3 text-[11px] text-foreground-muted">
                  <span>{course.durationMonths} meses</span>
                  <span style={{ color: colors.accent }}>·</span>
                  <span>{course.hoursPerWeek} hs/semana</span>
                </div>

                <p
                  className="mt-3 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: colors.accent }}
                >
                  Ver curso &rarr;
                </p>
              </div>
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
