"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  ArrowRight,
} from "lucide-react";
import { COURSES } from "@/lib/constants";
import { NeonButton } from "@/components/common/neon-button";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
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
};

// Cada curso tiene su color accent para diferenciarse visualmente
const courseAccents: Record<
  string,
  { accent: string; bg: string; border: string; glow: string }
> = {
  "creacion-de-contenido-con-ia": {
    accent: "text-[#FF6B6B]",
    bg: "bg-[#FF6B6B]/10",
    border: "border-[#FF6B6B]/20 hover:border-[#FF6B6B]/50",
    glow: "hover:shadow-[0_0_20px_rgba(255,107,107,0.15)]",
  },
  "ia-para-tu-trabajo": {
    accent: "text-neon-green",
    bg: "bg-neon-green/10",
    border: "border-neon-green/20 hover:border-neon-green/50",
    glow: "hover:shadow-[0_0_20px_rgba(57,255,20,0.15)]",
  },
  "marketing-digital-con-ia": {
    accent: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    border: "border-[#F59E0B]/20 hover:border-[#F59E0B]/50",
    glow: "hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
  },
  "gestion-de-negocios-con-ia": {
    accent: "text-[#A855F7]",
    bg: "bg-[#A855F7]/10",
    border: "border-[#A855F7]/20 hover:border-[#A855F7]/50",
    glow: "hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
  },
  "diseno-web-con-ia": {
    accent: "text-[#06B6D4]",
    bg: "bg-[#06B6D4]/10",
    border: "border-[#06B6D4]/20 hover:border-[#06B6D4]/50",
    glow: "hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
  "ecommerce-con-ia": {
    accent: "text-[#10B981]",
    bg: "bg-[#10B981]/10",
    border: "border-[#10B981]/20 hover:border-[#10B981]/50",
    glow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  "analisis-de-datos-con-ia": {
    accent: "text-[#3B82F6]",
    bg: "bg-[#3B82F6]/10",
    border: "border-[#3B82F6]/20 hover:border-[#3B82F6]/50",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  "vibe-coding-desarrollo-apps-ia": {
    accent: "text-[#EC4899]",
    bg: "bg-[#EC4899]/10",
    border: "border-[#EC4899]/20 hover:border-[#EC4899]/50",
    glow: "hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
  },
  "qa-testing-con-ia": {
    accent: "text-[#8B5CF6]",
    bg: "bg-[#8B5CF6]/10",
    border: "border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50",
    glow: "hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]",
  },
  "automatizaciones-con-ia-y-no-code": {
    accent: "text-[#F97316]",
    bg: "bg-[#F97316]/10",
    border: "border-[#F97316]/20 hover:border-[#F97316]/50",
    glow: "hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]",
  },
};

const defaultAccent = {
  accent: "text-neon-green",
  bg: "bg-neon-green/10",
  border: "border-border hover:border-border-bright",
  glow: "",
};

export function CoursesSection() {
  return (
    <section className="bg-background-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-neon-green mb-4">
            Catálogo completo
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">Nuestros cursos</h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground-secondary">
            Diez programas profesionales diseñados para construir tu futuro
            digital. Elegí el que más se adapte a tus objetivos.
          </p>
        </motion.div>

        {/* Grid: 2 columnas en mobile, 3-4 en desktop */}
        <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {COURSES.map((course, i) => {
            const Icon = iconMap[course.icon];
            const colors = courseAccents[course.slug] || defaultAccent;
            const hex = getAccentHex(colors.accent);
            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
              >
                <Link href={`/cursos/${course.slug}`}>
                  <div
                    className={`group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card p-5 transition-all duration-300 hover:-translate-y-1.5 ${colors.border} ${colors.glow}`}
                    style={{
                      backgroundImage: `radial-gradient(125% 90% at 100% 0%, ${hex}14, transparent 55%)`,
                    }}
                  >
                    {/* Baño de color: se intensifica al hover */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        backgroundImage: `radial-gradient(125% 90% at 100% 0%, ${hex}26, transparent 55%)`,
                      }}
                    />

                    {/* Ícono marca de agua: identidad visual de cada curso */}
                    {Icon && (
                      <Icon
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-6 -right-3 h-32 w-32 opacity-[0.06] transition-all duration-500 group-hover:-rotate-6 group-hover:opacity-[0.13]"
                        style={{ color: hex }}
                      />
                    )}

                    {/* Accent line top */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-50 transition-opacity group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${hex}, transparent)`,
                      }}
                    />

                    {/* Icon chip protagonista */}
                    <div
                      className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${hex}2e, ${hex}0d)`,
                        borderColor: `${hex}40`,
                        boxShadow: `0 8px 24px -14px ${hex}`,
                      }}
                    >
                      {Icon && <Icon className="h-6 w-6" style={{ color: hex }} />}
                    </div>

                    {/* Title */}
                    <h3 className="relative z-10 text-[15px] font-semibold leading-snug text-white">
                      <span className="group-hover:hidden">{course.title}</span>
                      <span
                        className="hidden group-hover:inline"
                        style={{ color: hex }}
                      >
                        {course.title}
                      </span>
                    </h3>

                    {/* Description */}
                    <p className="relative z-10 mt-2 flex-1 text-xs leading-relaxed text-foreground-secondary">
                      {course.shortDescription}
                    </p>

                    {/* Footer */}
                    <div className="relative z-10 mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                      <span className="text-[11px] text-foreground-muted">
                        {course.durationMonths} meses · {course.hoursPerWeek} hs/sem
                      </span>
                      <ArrowRight
                        className="h-3.5 w-3.5 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                        style={{ color: hex }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/cursos">
            <NeonButton variant="outline" size="lg">
              Ver todos los cursos
              <ArrowRight className="ml-2 h-4 w-4" />
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function getAccentHex(accentClass: string): string {
  const map: Record<string, string> = {
    "text-[#FF6B6B]": "#FF6B6B",
    "text-neon-green": "#39FF14",
    "text-[#F59E0B]": "#F59E0B",
    "text-[#A855F7]": "#A855F7",
    "text-[#06B6D4]": "#06B6D4",
    "text-[#10B981]": "#10B981",
    "text-[#3B82F6]": "#3B82F6",
    "text-[#EC4899]": "#EC4899",
    "text-[#8B5CF6]": "#8B5CF6",
    "text-[#F97316]": "#F97316",
  };
  return map[accentClass] || "#39FF14";
}
