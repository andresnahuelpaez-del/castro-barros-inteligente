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
  ArrowRight,
} from "lucide-react";
import { COURSES, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/constants";
import { GlassCard } from "@/components/common/glass-card";
import { Badge } from "@/components/ui/badge";
import { NeonButton } from "@/components/common/neon-button";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Video,
  Briefcase,
  Megaphone,
  Store,
  Globe,
  ShoppingCart,
  BarChart3,
  Code,
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
            Ocho programas profesionales diseñados para construir tu futuro
            digital. Elegí el que más se adapte a tus objetivos.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {COURSES.map((course, i) => {
            const Icon = iconMap[course.icon];
            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/cursos/${course.slug}`}>
                  <GlassCard neonBorder="green" className="group h-full flex flex-col">
                    <div className="mb-4 flex items-center justify-between">
                      {Icon && (
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-green/10">
                          <Icon className="h-5 w-5 text-neon-green" />
                        </div>
                      )}
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
                    <h3 className="text-lg font-semibold text-white group-hover:text-neon-green transition-colors">
                      {course.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-secondary">
                      {course.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-3 text-xs text-foreground-muted">
                        <span>{course.durationMonths} meses</span>
                        <span className="text-border-bright">|</span>
                        <span>{course.hoursPerWeek} hs/semana</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-foreground-muted group-hover:text-neon-green transition-colors" />
                    </div>
                  </GlassCard>
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
