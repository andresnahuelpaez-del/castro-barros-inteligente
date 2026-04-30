"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";

const features = [
  "Verificacion publica en linea (link permanente)",
  "QR code escaneable para empleadores",
  "Listo para LinkedIn y curriculum",
];

export function CertificateSection() {
  return (
    <section id="certificado" className="bg-background-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold sm:text-4xl">
              Recibiras un certificado de graduacion exitosa
            </h2>
            <p className="mt-4 text-foreground-secondary leading-relaxed">
              Cada certificado emitido por Castro Barros Inteligente&reg; incluye
              un codigo unico de verificacion que cualquier empleador puede
              consultar en linea. Es valido, oficial y esta respaldado por el
              Departamento Castro Barros.
            </p>
            <ul className="mt-6 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neon-green/20">
                    <Check className="h-4 w-4 text-neon-green" />
                  </div>
                  <span className="text-sm text-foreground-secondary">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/cursos">
                <NeonButton>Explora los cursos</NeonButton>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Certificate mockups */}
            <div className="relative h-80 w-full max-w-md">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-xl border border-neon-green/20 bg-background-tertiary glow-green p-6"
                  style={{
                    width: "280px",
                    height: "200px",
                    left: `${i * 30}px`,
                    top: `${i * 25}px`,
                    zIndex: 3 - i,
                    rotate: `${(i - 1) * 3}deg`,
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded bg-neon-green/20" />
                    <span className="text-xs font-bold text-neon-green">
                      Castro Barros Inteligente&reg;
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 w-3/4 rounded bg-border" />
                    <div className="h-2 w-1/2 rounded bg-border" />
                    <div className="h-2 w-2/3 rounded bg-border" />
                  </div>
                  <div className="mt-6 flex items-end justify-between">
                    <div className="h-8 w-8 rounded bg-border" />
                    <div className="h-2 w-20 rounded bg-border" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
