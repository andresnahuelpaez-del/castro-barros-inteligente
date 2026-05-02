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
    color: "text-neon-green",
    bg: "bg-neon-green/10",
  },
  {
    icon: Wallet,
    title: "100% gratuito",
    description:
      "Sin costos de inscripcion ni mensualidades. Una iniciativa del Estado provincial para garantizar acceso universal a la educacion digital.",
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    icon: Briefcase,
    title: "Salida laboral real",
    description:
      "Cada curso esta disenado con foco en empleabilidad: empleo, freelance o emprendimiento propio en la economia digital.",
    color: "text-neon-cyan",
    bg: "bg-neon-cyan/10",
  },
  {
    icon: Sparkles,
    title: "Tecnologia de punta",
    description:
      "Aprendes con las mismas herramientas de IA que usan profesionales y empresas lideres en 2026: Claude, ChatGPT, Gemini, Cursor, Figma y mas.",
    color: "text-neon-green",
    bg: "bg-neon-green/10",
  },
];

export function WhySection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-neon-green mb-4">
            Ventajas del programa
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Por que elegir Castro Barros Inteligente<sup>&reg;</sup>?
          </h2>
        </motion.div>

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
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.bg}`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
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
