"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Wand2,
  Bot,
  User,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";

const checks = [
  "Datos de contacto",
  "Verbos de accion",
  "Logros con numeros",
  "Palabras clave del rubro",
];

export function CvSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-neon-green/25 bg-card p-6 sm:p-10 lg:p-14"
          style={{
            backgroundImage:
              "radial-gradient(120% 120% at 100% 0%, rgba(57,255,20,0.10), transparent 55%)",
          }}
        >
          {/* Glow decorativo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "rgba(57,255,20,0.25)" }}
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Texto */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-3 py-1 text-xs font-medium text-neon-green">
                <Sparkles className="h-3.5 w-3.5" />
                Nuevo · Gratis con IA
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Mejora tu CV con{" "}
                <span className="text-neon-green text-glow-green">
                  Inteligencia Artificial
                </span>
              </h2>
              <p className="mt-4 text-base text-foreground-secondary leading-relaxed sm:text-lg">
                Subi tu curriculum y la IA lo analiza, te da un puntaje ATS y lo
                reescribe para que pases los filtros de las empresas. Te arma la
                version para postular online y la version para entregar en mano.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background-secondary/60 p-3">
                  <Bot className="mt-0.5 h-5 w-5 shrink-0 text-neon-cyan" />
                  <div>
                    <p className="text-sm font-semibold text-white">Version ATS</p>
                    <p className="text-xs text-foreground-secondary">
                      Para postular online, lista para los filtros automaticos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-border bg-background-secondary/60 p-3">
                  <User className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Version presencial
                    </p>
                    <p className="text-xs text-foreground-secondary">
                      Con diseno y foto, para la entrevista o en mano.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/app/cv">
                  <NeonButton size="lg" className="w-full sm:w-auto">
                    <Wand2 className="mr-2 h-5 w-5" />
                    Mejora tu CV gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </NeonButton>
                </Link>
              </div>
            </div>

            {/* Visual: mock de puntaje */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-border bg-background-secondary/80 p-6 backdrop-blur-sm"
            >
              <div className="text-center">
                <p className="text-xs font-medium text-foreground-secondary">
                  Puntaje ATS
                </p>
                <p className="mt-1 text-6xl font-bold text-neon-green">
                  87<span className="text-2xl text-foreground-muted">/100</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-neon-green">
                  Muy bueno
                </p>
              </div>
              <div className="mt-6 space-y-2.5">
                {checks.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-neon-green" />
                    <span className="text-sm text-foreground-secondary">{c}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
