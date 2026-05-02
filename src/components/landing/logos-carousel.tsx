"use client";

import { motion } from "framer-motion";

const logos = [
  { name: "Ministerio de Educacion", abbr: "ME" },
  { name: "Gobierno de La Rioja", abbr: "GLR" },
  { name: "Departamento Castro Barros", abbr: "CB" },
  { name: "Dip. Marcelo Del Moral", abbr: "MDM" },
  { name: "LINE La Rioja", abbr: "LINE" },
];

export function LogosCarousel() {
  return (
    <section className="border-y border-border bg-background-secondary/50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-foreground-muted">
          Una iniciativa respaldada por
        </p>
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-background-secondary/50 to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-background-secondary/50 to-transparent" />

          <motion.div
            className="flex gap-12"
            animate={{ x: [0, -900] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex shrink-0 items-center gap-3 px-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background-tertiary">
                  <span className="text-xs font-bold text-neon-green">
                    {logo.abbr}
                  </span>
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-foreground-muted">
                  {logo.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
