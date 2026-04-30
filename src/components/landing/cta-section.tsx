"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NeonButton } from "@/components/common/neon-button";
import { AuroraBackground } from "@/components/common/aurora-background";

export function CtaSection() {
  return (
    <AuroraBackground intensity="strong" className="py-32">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Tu futuro digital empieza hoy
        </motion.h2>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg text-foreground-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Sumate a los habitantes de Castro Barros que ya estan construyendo su
          futuro con IA.
        </motion.p>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link href="/registro">
            <NeonButton size="xl">Inscribite gratis &rarr;</NeonButton>
          </Link>
        </motion.div>
      </div>
    </AuroraBackground>
  );
}
