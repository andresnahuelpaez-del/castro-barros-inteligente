"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Bot,
  User,
  Trophy,
  ArrowRight,
} from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";

export function EntrevistasSection() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-neon-cyan/25 bg-card p-6 sm:p-10 lg:p-14"
          style={{
            backgroundImage:
              "radial-gradient(120% 120% at 0% 0%, rgba(6,182,212,0.10), transparent 55%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ background: "rgba(6,182,212,0.25)" }}
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Visual: mock de chat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="order-2 rounded-2xl border border-border bg-background-secondary/80 p-5 backdrop-blur-sm lg:order-1"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neon-cyan/15 text-xs font-bold text-neon-cyan">
                  S
                </div>
                <div className="max-w-[85%] rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground-secondary">
                  Contame una vez que resolviste un problema difícil en tu
                  trabajo.
                </div>
              </div>
              <div className="mt-3 flex items-start justify-end gap-3">
                <div className="max-w-[85%] rounded-2xl bg-neon-cyan/15 px-4 py-3 text-sm text-white">
                  Cuando bajaron las ventas, propuse vender por redes y subimos
                  un 30% en dos meses.
                </div>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-tertiary">
                  <User className="h-4 w-4 text-foreground-secondary" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-3">
                <Trophy className="h-5 w-5 shrink-0 text-neon-cyan" />
                <p className="text-sm text-foreground-secondary">
                  Puntaje de la entrevista:{" "}
                  <span className="font-bold text-neon-cyan">82/100</span>
                </p>
              </div>
            </motion.div>

            {/* Texto */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-medium text-neon-cyan-bright">
                <MessageSquare className="h-3.5 w-3.5" />
                Nuevo · Gratis con IA
              </div>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                Practicá una{" "}
                <span className="text-neon-cyan">entrevista de trabajo</span>{" "}
                con IA
              </h2>
              <p className="mt-4 text-base text-foreground-secondary leading-relaxed sm:text-lg">
                La IA te entrevista como en la vida real: te hace preguntas,
                repregunta y al final te da un informe con tu puntaje, tus
                fortalezas y cómo mejorar. Practicá las veces que quieras.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  "Preguntas adaptadas a tu rubro y al aviso",
                  "Informe con puntaje y respuestas modelo",
                  "Ideal para primer empleo o con experiencia",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-foreground-secondary"
                  >
                    <Bot className="h-4 w-4 shrink-0 text-neon-cyan" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/app/entrevistas">
                  <NeonButton
                    size="lg"
                    variant="secondary"
                    className="w-full bg-neon-cyan text-black hover:bg-neon-cyan-bright sm:w-auto"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Practicá una entrevista gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </NeonButton>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
