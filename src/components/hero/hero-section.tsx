"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/common/neon-button";
import { DepartmentSilhouette } from "./department-silhouette";
import { Badge } from "@/components/ui/badge";

const metrics = [
  { value: "11", label: "cursos profesionales" },
  { value: "100%", label: "gratuito y online" },
  { value: "IA", label: "en cada programa" },
  { value: "Oficial", label: "certificación válida" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-neon-violet opacity-15 blur-[120px] sm:h-[800px] sm:w-[800px] sm:blur-[150px]" />
        <div className="absolute -right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-neon-cyan opacity-10 blur-[120px] sm:h-[600px] sm:w-[600px] sm:blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-neon-green opacity-10 blur-[120px] sm:h-[500px] sm:w-[500px] sm:blur-[150px]" />
      </div>

      {/* Silhouette background — centrada con el bloque principal */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center -translate-y-[15%] sm:-translate-y-[5%]" aria-hidden="true">
        <DepartmentSilhouette className="h-[550px] w-[440px] opacity-[0.18] sm:h-[650px] sm:w-[520px] sm:opacity-20 lg:h-[780px] lg:w-[620px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 pb-16 text-center sm:px-6 sm:py-20 lg:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-5 border-neon-green/30 bg-neon-green/10 px-3 py-1 text-[10px] leading-tight text-neon-green sm:px-4 sm:py-1.5 sm:text-sm">
            <span className="hidden sm:inline">Programa 100% financiado por la Provincia de La Rioja para todo el país</span>
            <span className="sm:hidden">100% financiado por la Provincia de La Rioja</span>
          </Badge>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Aprendé las habilidades digitales que{" "}
          <span className="text-neon-green text-glow-green">
            están transformando
          </span>{" "}
          el mundo
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-3xl text-base text-foreground-secondary sm:mt-6 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          11 cursos intensivos con Inteligencia Artificial: Programación, Marketing digital, Diseño web, Creación de contenido, Inglés laboral y más.
          <span className="block mt-2 text-neon-green font-medium text-glow-green">
            Inscribite gratis y obtené tu certificación oficial.
          </span>
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link href="/registro" className="w-full sm:w-auto">
            <NeonButton size="lg" className="w-full sm:w-auto">Inscribite gratis &rarr;</NeonButton>
          </Link>
          <Link href="/cursos" className="w-full sm:w-auto">
            <NeonButton variant="outline" size="lg" className="w-full border-neon-green/30 text-neon-green hover:bg-neon-green/10 hover:border-neon-green/50 hover:text-neon-green sm:w-auto">
              Explorá los cursos
            </NeonButton>
          </Link>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-border/50 bg-background/40 backdrop-blur-md px-3 py-3 text-center sm:p-4"
            >
              <div className="text-xl font-bold text-neon-green sm:text-3xl">
                {metric.value}
              </div>
              <div className="mt-0.5 text-xs text-foreground-secondary sm:mt-1 sm:text-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="h-8 w-5 rounded-full border-2 border-foreground-muted/30 flex items-start justify-center p-1">
          <div className="h-2 w-1 rounded-full bg-neon-green" />
        </div>
      </motion.div>
    </section>
  );
}
