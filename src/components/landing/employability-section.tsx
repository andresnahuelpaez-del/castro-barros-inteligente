"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  Globe,
  FileText,
  DollarSign,
  ArrowRight,
  Users,
  TrendingUp,
} from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";

const features = [
  {
    icon: Globe,
    title: "Dónde buscar",
    description:
      "Las mejores plataformas para encontrar trabajo freelance, remoto y local. Fiverr, Upwork, LinkedIn y más.",
    color: "#39FF14",
  },
  {
    icon: Briefcase,
    title: "Cómo postularte",
    description:
      "Metodologías probadas para aplicar a empleos, conseguir clientes y ofrecer tus servicios con confianza.",
    color: "#06B6D4",
  },
  {
    icon: FileText,
    title: "CV, portfolio y propuestas",
    description:
      "Armá un perfil profesional que te abra puertas: desde tu CV digital hasta tu carta de presentación.",
    color: "#A855F7",
  },
  {
    icon: DollarSign,
    title: "Cuánto cobrar",
    description:
      "Guía de precios para cada rubro. Aprendé a valorar tu trabajo y negociar con clientes.",
    color: "#F59E0B",
  },
];

export function EmployabilitySection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-neon-cyan mb-3">
              Más que cursos
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Te ayudamos a{" "}
              <span className="text-neon-cyan">conseguir trabajo</span>
            </h2>
            <p className="mt-4 text-foreground-secondary leading-relaxed">
              Aprender es el primer paso, pero no el último. Tenemos una guía
              completa y gratuita para que sepas exactamente cómo convertir lo
              que aprendiste en ingresos reales — ya sea como freelancer,
              empleado remoto o con tu propio emprendimiento.
            </p>

            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-foreground-secondary">
                <Users className="h-4 w-4 text-neon-cyan" />
                <span>Para todos los cursos</span>
              </div>
              <div className="flex items-center gap-2 text-foreground-secondary">
                <TrendingUp className="h-4 w-4 text-neon-cyan" />
                <span>Actualizada constantemente</span>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/empleabilidad">
                <NeonButton variant="outline" size="lg" className="border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/50">
                  Ver la guía completa
                  <ArrowRight className="ml-2 h-4 w-4" />
                </NeonButton>
              </Link>
            </div>
          </motion.div>

          {/* Right: Feature cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-5 transition-all hover:border-border-bright hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon
                    className="h-4 w-4"
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="font-semibold text-white text-sm">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
