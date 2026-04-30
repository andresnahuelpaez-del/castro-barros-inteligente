"use client";

import { motion } from "framer-motion";

const logos = [
  "Ministerio de Educacion La Rioja",
  "Gobierno de La Rioja",
  "Departamento Castro Barros",
  "Dip. Marcelo Daniel Del Moral",
  "LINE",
];

export function LogosCarousel() {
  return (
    <section className="border-y border-border bg-background-secondary py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-medium text-foreground-muted">
          Una iniciativa apoyada por:
        </p>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-16"
            animate={{ x: [0, -1200] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* Double the logos for seamless loop */}
            {[...logos, ...logos, ...logos].map((logo, i) => (
              <div
                key={`${logo}-${i}`}
                className="flex h-12 shrink-0 items-center justify-center px-6"
              >
                {/* TODO: Reemplazar con logos reales en /public/logos */}
                <span className="whitespace-nowrap text-lg font-semibold text-foreground-muted/60">
                  {logo}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
