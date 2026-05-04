"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/common/neon-button";
import { AuroraBackground } from "@/components/common/aurora-background";
import { ArrowRight, Clock, Wallet, Award } from "lucide-react";

const highlights = [
  { icon: Wallet, text: "100% gratuito" },
  { icon: Clock, text: "Modalidad flexible" },
  { icon: Award, text: "Certificación oficial" },
];

export function CtaSection() {
  return (
    <AuroraBackground intensity="strong" className="py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p
          className="text-xs font-medium uppercase tracking-widest text-neon-green mb-3 sm:text-sm sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          No dejes pasar esta oportunidad
        </motion.p>
        <motion.h2
          className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
        >
          Tu futuro digital{" "}
          <span className="text-neon-green text-glow-green">empieza hoy</span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-2xl text-sm text-foreground-secondary sm:mt-6 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Sumate a los habitantes de Castro Barros que ya están construyendo su
          futuro con Inteligencia Artificial.
        </motion.p>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-8 sm:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
        >
          {highlights.map((h) => (
            <div key={h.text} className="flex items-center gap-2 text-xs text-foreground-secondary sm:text-sm">
              <h.icon className="h-3.5 w-3.5 text-neon-green sm:h-4 sm:w-4" />
              {h.text}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/cursos">
            <NeonButton size="xl" className="w-full sm:w-auto">
              Inscribite gratis
              <ArrowRight className="ml-2 h-5 w-5" />
            </NeonButton>
          </Link>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
