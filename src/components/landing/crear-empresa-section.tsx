"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Rocket,
  MapPin,
  Globe,
  DollarSign,
  Users,
  ArrowRight,
  Star,
} from "lucide-react";
import { EXTRA_COURSE } from "@/lib/constants";
import { NeonButton } from "@/components/common/neon-button";

const reach = [
  { icon: MapPin, label: "Local y provincial", desc: "Comercios y PyMEs de La Rioja" },
  { icon: Users, label: "Nacional", desc: "Clientes de todo el pais, de forma remota" },
  { icon: Globe, label: "Internacional", desc: "Trabaja para el exterior y cobra en dolares" },
  { icon: DollarSign, label: "Ingresos propios", desc: "Tu marca, tus precios, tus horarios" },
];

export function CrearEmpresaSection() {
  return (
    <section className="bg-background-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-xs font-medium text-neon-violet-bright">
            <Star className="h-3.5 w-3.5" />
            Curso extra · Bonus
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
            No solo consigas trabajo:{" "}
            <span className="text-secondary">creá tu propia empresa</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground-secondary leading-relaxed">
            Un curso aparte que te ensena a transformar lo que aprendiste en un
            negocio propio de servicios digitales, y a conseguir clientes desde
            tu casa: en La Rioja, en todo el pais o en el exterior.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reach.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10">
                <r.icon className="h-5 w-5 text-secondary" />
              </div>
              <p className="mt-4 font-semibold text-white">{r.label}</p>
              <p className="mt-1 text-sm text-foreground-secondary">{r.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center gap-5 rounded-2xl border border-secondary/25 bg-secondary/5 p-6 sm:flex-row sm:p-8"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary/15">
            <Rocket className="h-7 w-7 text-secondary" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-lg font-semibold text-white">
              {EXTRA_COURSE.title}
            </p>
            <p className="mt-1 text-sm text-foreground-secondary">
              {EXTRA_COURSE.durationMonths} meses · {EXTRA_COURSE.hoursPerWeek}{" "}
              hs/semana · 100% online y gratis. Ideal para combinar con cualquier
              otro curso.
            </p>
          </div>
          <Link href={`/cursos/${EXTRA_COURSE.slug}`} className="w-full sm:w-auto">
            <NeonButton
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Ver el curso
              <ArrowRight className="ml-2 h-5 w-5" />
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
