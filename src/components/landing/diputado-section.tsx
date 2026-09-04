"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
            <div className="relative">
              {/* Comilla tipográfica gigante como textura de fondo */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-2 -top-12 select-none font-serif text-[120px] leading-none text-neon-green/10 sm:-top-16 sm:text-[170px]"
              >
                &ldquo;
              </span>
              <blockquote className="relative text-lg font-light leading-relaxed text-foreground/90 sm:text-xl md:text-[1.6rem] md:leading-[1.6]">
                Mi misión es acompañar a cada habitante de la provincia de
                La Rioja en este proceso de{" "}
                <span className="font-normal text-neon-green text-glow-green">
                  transformación digital
                </span>
                , acercando herramientas educativas gratuitas, potenciadas con
                inteligencia artificial y{" "}
                <span className="font-normal text-neon-green text-glow-green">
                  a la altura de las mejores instituciones online del país
                </span>
                , que permitan crecer, adaptarse y construir un futuro mejor.
                Con conocimiento y oportunidades, nuestra comunidad puede
                desarrollar todo su potencial.
              </blockquote>
            </div>
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
              <div className="relative h-72 w-56 overflow-hidden rounded-2xl border border-neon-green/20 bg-gradient-to-br from-background-tertiary to-background-secondary sm:h-96 sm:w-72">
                <Image
                  src="/marcelo-del-moral.jpg"
                  alt="Diputado Marcelo Daniel Del Moral"
                  fill
                  sizes="(max-width: 640px) 224px, 288px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4">
                  <p className="text-xs font-semibold text-white sm:text-sm">
                    Marcelo Del Moral
                  </p>
                  <p className="text-[10px] text-foreground-muted sm:text-xs">
                    Diputado Provincial
                  </p>
                </div>
              </div>
              <div className="absolute -inset-1 -z-10 rounded-2xl bg-neon-green/5 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
