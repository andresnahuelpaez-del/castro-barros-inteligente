"use client";

import { motion } from "framer-motion";
import { GraduationCap, Wallet, Briefcase, Sparkles } from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";

const features = [
  {
    icon: GraduationCap,
    title: "Certificacion oficial",
    description:
      "Cada curso completado te otorga un certificado oficial del Departamento con codigo de verificacion publica en linea, valido para presentar a empleadores.",
  },
  {
    icon: Wallet,
    title: "100% gratuito",
    description:
      "Sin costos de inscripcion ni mensualidades. Una iniciativa del Estado provincial para garantizar acceso universal a la educacion digital.",
  },
  {
    icon: Briefcase,
    title: "Salida laboral real",
    description:
      "Cada curso esta disenado con foco en empleabilidad: empleo, freelance o emprendimiento propio en la economia digital.",
  },
  {
    icon: Sparkles,
    title: "Tecnologia de punta",
    description:
      "Aprendes con las mismas herramientas de IA que usan profesionales y empresas lideres en 2026: Claude, ChatGPT, Gemini, Cursor, Figma y mas.",
  },
];

export function WhySection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Por que elegir Castro Barros Inteligente<sup>&reg;</sup>
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard neonBorder="green" className="h-full">
                <feature.icon className="h-10 w-10 text-neon-green" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
