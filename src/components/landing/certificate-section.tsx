"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, QrCode, ExternalLink } from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";

const features = [
  {
    icon: Shield,
    text: "Verificación pública en línea (link permanente)",
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
              Certificación oficial
            </p>
            <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
              Un certificado que{" "}
              <span className="text-neon-green">vale de verdad</span>
            </h2>
            <p className="mt-4 text-sm text-foreground-secondary leading-relaxed sm:text-base">
              Cada certificado emitido por Castro Barros Inteligente&reg; incluye
              un código único de verificación que cualquier empleador puede
              consultar en línea. Es válido, oficial y está respaldado por la
              Provincia de La Rioja.
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
              <Link href="/cursos">
                <NeonButton className="w-full sm:w-auto">Inscribite y obtené el tuyo</NeonButton>
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
            {/* Mockup liviano del certificado - varios apilados (responsive) */}
            <div className="relative w-full max-w-md">
              {/* Cartas de fondo: dan la sensación de varios certificados */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl border border-neon-green/10 bg-card"
                style={{ transform: "rotate(6deg) translate(14px, 14px)" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl border border-neon-green/15 bg-card"
                style={{ transform: "rotate(3deg) translate(7px, 7px)" }}
              />

              <motion.div
                className="relative z-10 overflow-hidden rounded-2xl border border-neon-green/25 bg-card p-5 sm:p-7"
                style={{
                  rotate: -1.5,
                  backgroundImage:
                    "radial-gradient(120% 100% at 0% 0%, rgba(57,255,20,0.06), transparent 55%)",
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {/* Marco interior */}
                <div className="rounded-xl border border-neon-green/15 p-4 sm:p-5">
                  {/* Encabezado */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neon-green/15">
                        <span className="text-[9px] font-bold text-white">
                          CB
                          <span className="text-neon-green">I</span>
                        </span>
                      </div>
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-neon-green sm:text-[10px]">
                        Certificado Oficial
                      </span>
                    </div>
                    <span className="text-[8px] text-foreground-muted sm:text-[9px]">
                      N.&deg; CBI-2026-000142
                    </span>
                  </div>

                  {/* Cuerpo */}
                  <div className="mt-4 text-center sm:mt-5">
                    <p className="text-[8px] uppercase tracking-widest text-foreground-muted sm:text-[9px]">
                      Certifica que
                    </p>
                    <p className="mt-1.5 font-semibold text-white text-base sm:text-lg">
                      Nombre y Apellido
                    </p>
                    <div className="mx-auto mt-1 h-px w-32 bg-neon-green/20" />
                    <p className="mt-3 text-[9px] text-foreground-secondary sm:text-[10px]">
                      completó y aprobó el curso
                    </p>
                    <p className="mt-1 text-xs font-medium text-neon-green sm:text-sm">
                      Minería con Inteligencia Artificial
                    </p>
                    <p className="mt-2 text-[8px] text-foreground-muted sm:text-[9px]">
                      Escuela Online de Oficios Digitales
                      <br />
                      Provincia de La Rioja
                    </p>
                  </div>

                  {/* Pie: firma + QR */}
                  <div className="mt-4 flex items-end justify-between sm:mt-5">
                    <div>
                      <div className="h-px w-16 bg-foreground-muted/30 sm:w-20" />
                      <p className="mt-1 text-[7px] text-foreground-muted sm:text-[8px]">
                        Autoridad certificante
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md border border-neon-green/20 bg-neon-green/5 sm:h-11 sm:w-11">
                        <QrCode className="h-5 w-5 text-neon-green sm:h-7 sm:w-7" />
                      </div>
                      <span className="text-[6px] text-foreground-muted sm:text-[7px]">
                        Verificable online
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sello */}
                <div className="absolute right-4 top-16 hidden h-14 w-14 rotate-[-12deg] items-center justify-center rounded-full border-2 border-neon-green/25 sm:flex">
                  <Shield className="h-6 w-6 text-neon-green/40" />
                </div>
              </motion.div>

              {/* Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-2xl bg-neon-green/5 blur-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
