"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function DiputadoSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Quote className="h-8 w-8 text-neon-green/40 mb-3 sm:h-10 sm:w-10 sm:mb-4" />
            <blockquote className="text-base leading-relaxed text-foreground-secondary sm:text-lg md:text-xl">
              Mi misión es acompañar a cada habitante del Departamento
              Castro Barros en este proceso de transformación, acercando
              herramientas educativas que permitan crecer, adaptarse y construir
              un futuro mejor. Con conocimiento y oportunidades, nuestra
              comunidad puede desarrollar todo su potencial.
            </blockquote>
            <div className="mt-6 flex items-center gap-3 sm:mt-8 sm:gap-4">
              <div className="h-0.5 w-8 bg-neon-green sm:w-12" />
              <p className="text-base font-bold text-neon-green text-glow-green sm:text-lg">
                Estado eficiente, Estado presente!
              </p>
            </div>
            <div className="mt-4 sm:mt-6">
              <p className="text-sm font-semibold text-white sm:text-base">
                Diputado Marcelo Daniel Del Moral
              </p>
              <p className="text-xs text-foreground-muted sm:text-sm">
                Departamento Castro Barros, La Rioja
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="h-56 w-48 rounded-2xl border border-neon-green/20 bg-gradient-to-br from-background-tertiary to-background-secondary flex flex-col items-center justify-center overflow-hidden sm:h-80 sm:w-64">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neon-green/10 border-2 border-neon-green/30 sm:h-24 sm:w-24">
                  <span className="text-xl font-bold text-neon-green sm:text-3xl">
                    MDM
                  </span>
                </div>
                <p className="mt-3 text-xs font-medium text-white sm:mt-4 sm:text-sm">
                  Marcelo Del Moral
                </p>
                <p className="mt-0.5 text-[10px] text-foreground-muted sm:mt-1 sm:text-xs">
                  Diputado Provincial
                </p>
              </div>
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-neon-green/5 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
