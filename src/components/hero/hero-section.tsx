"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/common/neon-button";
import { DepartmentSilhouette } from "./department-silhouette";

const metrics = [
  { value: "8", label: "cursos disponibles" },
  { value: "100%", label: "gratuito" },
  { value: "Oficial", label: "certificacion" },
  { value: "Online", label: "modalidad flexible" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-neon-violet opacity-15 blur-[150px]" />
        <div className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-neon-cyan opacity-10 blur-[150px]" />
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-neon-green opacity-10 blur-[150px]" />
      </div>

      {/* Silhouette background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <DepartmentSilhouette className="h-[500px] w-[400px] opacity-40 sm:h-[600px] sm:w-[480px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Aprende las habilidades digitales que estan transformando el mundo
        </motion.h1>

        <motion.p
          className="mx-auto mt-6 max-w-3xl text-lg text-neon-green text-glow-green sm:text-xl md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Cursos intensivos con Inteligencia Artificial: Programacion, Analisis
          de datos, Marketing digital, Diseno web, Creacion de contenido,
          Gestion de negocios, E-commerce y herramientas de productividad.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/cursos">
            <NeonButton size="lg">Explora los cursos &rarr;</NeonButton>
          </Link>
          <Link href="#certificado">
            <NeonButton variant="outline" size="lg">
              Conoce el certificado
            </NeonButton>
          </Link>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-2xl font-bold text-neon-green sm:text-3xl">
                {metric.value}
              </div>
              <div className="mt-1 text-sm text-foreground-secondary">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
