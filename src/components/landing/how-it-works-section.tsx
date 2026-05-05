"use client";

import { motion } from "framer-motion";
import { UserPlus, BookOpen, Lightbulb, Trophy, Award } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Inscribite gratis",
    description: "Creá tu cuenta en menos de 2 minutos con tu email o Google.",
  },
  {
    icon: BookOpen,
    title: "Elegí tu curso",
    description:
      "Explorá los 8 programas y elegí el que más se adapte a tus objetivos.",
  },
  {
    icon: Lightbulb,
    title: "Aprendé a tu ritmo",
    description:
      "Videos, lecturas y ejercicios prácticos. Vos organizás tus horarios.",
  },
  {
    icon: Trophy,
    title: "Aprobá tu proyecto",
    description:
      "Aplicá lo aprendido en un proyecto real que demuestre tus habilidades.",
  },
  {
    icon: Award,
    title: "Recibí tu certificado",
    description:
      "Certificado oficial con código de verificación pública.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            ¿Cómo funciona?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground-secondary sm:mt-4 sm:text-base">
            En 5 pasos simples pasás de cero a profesional certificado.
          </p>
        </motion.div>

        {/* Mobile: vertical timeline */}
        <div className="relative mt-10 sm:mt-16">
          {/* Connecting line (desktop) */}
          <div
            className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-neon-green via-secondary to-neon-cyan md:block"
            aria-hidden="true"
          />

          {/* Connecting line (mobile) */}
          <div
            className="absolute bottom-0 left-[27px] top-0 w-0.5 bg-gradient-to-b from-neon-green via-secondary to-neon-cyan md:hidden"
            aria-hidden="true"
          />

          <div className="grid gap-6 md:grid-cols-5 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                className="relative flex gap-4 md:flex-col md:items-center md:text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Step circle */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border-2 border-neon-green bg-background glow-green md:h-16 md:w-16">
                  <span className="text-[9px] font-bold text-neon-green md:text-[10px]">
                    {i + 1}
                  </span>
                  <step.icon className="h-4 w-4 text-neon-green md:h-5 md:w-5" />
                </div>
                <div className="pt-0.5 md:pt-4">
                  <h3 className="text-sm font-semibold text-white sm:text-base">{step.title}</h3>
                  <p className="mt-1 text-xs text-foreground-secondary leading-relaxed sm:text-sm">
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
