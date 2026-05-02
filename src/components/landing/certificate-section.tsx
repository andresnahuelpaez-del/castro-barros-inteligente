"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Shield, QrCode, ExternalLink } from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";

const features = [
  {
    icon: Shield,
    text: "Verificacion publica en linea (link permanente)",
  },
  {
    icon: QrCode,
    text: "QR code escaneable para empleadores",
  },
  {
    icon: ExternalLink,
    text: "Listo para LinkedIn y curriculum",
  },
];

export function CertificateSection() {
  return (
    <section id="certificado" className="bg-background-secondary py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-neon-green mb-4">
              Certificacion oficial
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Un certificado que{" "}
              <span className="text-neon-green">vale de verdad</span>
            </h2>
            <p className="mt-4 text-sm text-foreground-secondary leading-relaxed sm:text-base">
              Cada certificado emitido por Castro Barros Inteligente&reg; incluye
              un codigo unico de verificacion que cualquier empleador puede
              consultar en linea. Es valido, oficial y esta respaldado por el
              Departamento Castro Barros.
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neon-green/10 border border-neon-green/20 sm:h-10 sm:w-10">
                    <feature.icon className="h-4 w-4 text-neon-green sm:h-5 sm:w-5" />
                  </div>
                  <span className="text-sm text-foreground-secondary">
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 sm:mt-8">
              <Link href="/registro">
                <NeonButton className="w-full sm:w-auto">Inscribite y obtene el tuyo</NeonButton>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Certificate mockup - responsive */}
            <div className="relative h-64 w-full max-w-sm sm:h-80 sm:max-w-md">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-xl border border-neon-green/20 bg-card p-4 sm:p-6"
                  style={{
                    width: "min(260px, 75vw)",
                    height: "min(180px, 50vw)",
                    left: `${i * 15}px`,
                    top: `${i * 15}px`,
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
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-4 w-4 rounded bg-neon-green/20 flex items-center justify-center sm:h-5 sm:w-5">
                        <Check className="h-2.5 w-2.5 text-neon-green sm:h-3 sm:w-3" />
                      </div>
                      <span className="text-[8px] font-bold text-neon-green sm:text-[10px]">
                        CB Inteligente&reg;
                      </span>
                    </div>
                    <span className="text-[7px] text-foreground-muted sm:text-[8px]">
                      CERTIFICADO
                    </span>
                  </div>
                  {/* Body */}
                  <div className="mt-3 space-y-1.5 sm:mt-5 sm:space-y-2">
                    <div className="h-1.5 w-3/4 rounded bg-foreground-muted/10 sm:h-2" />
                    <div className="h-1.5 w-1/2 rounded bg-foreground-muted/10 sm:h-2" />
                    <div className="h-1.5 w-2/3 rounded bg-foreground-muted/10 sm:h-2" />
                  </div>
                  {/* Footer */}
                  <div className="mt-3 flex items-end justify-between sm:mt-6">
                    <div className="space-y-1">
                      <div className="h-1 w-12 rounded bg-foreground-muted/10 sm:h-1.5 sm:w-16" />
                      <div className="h-1 w-8 rounded bg-foreground-muted/10 sm:h-1.5 sm:w-12" />
                    </div>
                    <div className="h-7 w-7 rounded border border-foreground-muted/10 flex items-center justify-center sm:h-10 sm:w-10">
                      <QrCode className="h-4 w-4 text-foreground-muted/20 sm:h-6 sm:w-6" />
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Glow behind */}
              <div className="absolute inset-0 -z-10 rounded-2xl bg-neon-green/5 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
