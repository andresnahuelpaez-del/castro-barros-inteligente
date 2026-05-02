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
    tag: "Futuro profesional",
  },
  {
    icon: Search,
    title: "Personas en busqueda laboral",
    description:
      "Reinventa tu carrera con oficios digitales de alta demanda.",
    tag: "Nueva oportunidad",
  },
  {
    icon: ShoppingBag,
    title: "Comerciantes y emprendedores",
    description:
      "Digitaliza tu negocio y aumenta tus ventas con Inteligencia Artificial.",
    tag: "Mas ventas",
  },
  {
    icon: Building2,
    title: "Empleados publicos y privados",
    description:
      "Moderniza tu trabajo y posicionate mejor profesionalmente.",
    tag: "Crecimiento",
  },
];

export function AudienceSection() {
  return (
    <section className="bg-background-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-secondary mb-4">
            Para todos los perfiles
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Disenado para vos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground-secondary">
            No importa tu edad, tu experiencia o tu ocupacion. Hay un curso
            pensado para lo que necesitas.
          </p>
        </motion.div>

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
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 border border-secondary/20">
                  <profile.icon className="h-7 w-7 text-neon-violet-bright" />
                </div>
                <span className="mt-4 inline-block rounded-full bg-secondary/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-secondary">
                  {profile.tag}
                </span>
                <h3 className="mt-3 font-semibold text-white">
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
