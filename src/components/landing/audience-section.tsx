"use client";

import { motion } from "framer-motion";
import { GraduationCap, Search, ShoppingBag, Building2 } from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";

const profiles = [
  {
    icon: GraduationCap,
    title: "Estudiantes secundarios y terciarios",
    description:
      "Suma habilidades digitales con IA antes de salir al mercado laboral.",
  },
  {
    icon: Search,
    title: "Personas en busqueda laboral",
    description:
      "Reinventa tu carrera con oficios digitales de alta demanda.",
  },
  {
    icon: ShoppingBag,
    title: "Comerciantes y emprendedores",
    description:
      "Digitaliza tu negocio y aumenta tus ventas con Inteligencia Artificial.",
  },
  {
    icon: Building2,
    title: "Empleados publicos y privados",
    description:
      "Moderniza tu trabajo y posicionate mejor profesionalmente.",
  },
];

export function AudienceSection() {
  return (
    <section className="bg-background-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Disenado para vos
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((profile, i) => (
            <motion.div
              key={profile.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard neonBorder="violet" className="h-full text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10">
                  <profile.icon className="h-7 w-7 text-neon-violet-bright" />
                </div>
                <h3 className="mt-4 font-semibold text-white">
                  {profile.title}
                </h3>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {profile.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
