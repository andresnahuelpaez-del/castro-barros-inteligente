"use client";

import { motion } from "framer-motion";

export function DiputadoSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="text-lg leading-relaxed text-foreground-secondary md:text-xl">
              &ldquo;Mi mision es acompanar a cada habitante del Departamento
              Castro Barros en este proceso de transformacion, acercando
              herramientas educativas que permitan crecer, adaptarse y construir
              un futuro mejor. Con conocimiento y oportunidades, nuestra
              comunidad puede desarrollar todo su potencial.&rdquo;
            </blockquote>
            <p className="mt-6 text-xl font-bold text-neon-green text-glow-green">
              Estado eficiente, Estado presente!
            </p>
            <p className="mt-4 text-sm font-semibold text-white">
              Diputado Marcelo Daniel Del Moral
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* TODO: Reemplazar con foto real del diputado */}
            <div className="h-80 w-64 rounded-2xl border-2 border-neon-green/20 bg-background-tertiary glow-green flex items-center justify-center">
              <span className="text-sm text-foreground-muted">
                Foto del Diputado
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
