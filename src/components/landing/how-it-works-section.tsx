"use client";

import { motion } from "framer-motion";
import { UserPlus, BookOpen, Lightbulb, Trophy, Award } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Inscribite gratis",
    description: "Crea tu cuenta en menos de 2 minutos con tu email o Google.",
  },
  {
    icon: BookOpen,
    title: "Elegi tu curso",
    description:
      "Explora los 8 programas disponibles y elegi el que mas se adapte a tus objetivos.",
  },
  {
    icon: Lightbulb,
    title: "Aprende a tu medida",
    description:
      "Videos cortos, lecturas y ejercicios practicos. Organizas tus horarios.",
  },
  {
    icon: Trophy,
    title: "Aproba tu proyecto final",
    description:
      "Aplica todo lo aprendido en un proyecto real que demuestre tus habilidades.",
  },
  {
    icon: Award,
    title: "Recibi tu certificado",
    description:
      "Certificado oficial con codigo de verificacion publica, listo para empleadores.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Como funciona?
        </motion.h2>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div
            className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-neon-green via-secondary to-neon-cyan md:block"
            aria-hidden="true"
          />

          {/* Connecting line (mobile) */}
          <div
            className="absolute bottom-0 left-8 top-0 w-0.5 bg-gradient-to-b from-neon-green via-secondary to-neon-cyan md:hidden"
            aria-hidden="true"
          />

          <div className="grid gap-8 md:grid-cols-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative flex gap-4 md:flex-col md:items-center md:text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-neon-green bg-background glow-green">
                  <step.icon className="h-7 w-7 text-neon-green" />
                </div>
                <div className="pt-1 md:pt-4">
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm text-foreground-secondary">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
