"use client";

import { motion } from "framer-motion";

// Ícono original: mano haciendo la V de la victoria
function VictoryHand({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      {/* dedo índice */}
      <rect x="8" y="2.8" width="2.5" height="8.4" rx="1.25" transform="rotate(-15 9.25 11)" />
      {/* dedo mayor */}
      <rect x="13" y="2.4" width="2.5" height="8.8" rx="1.25" transform="rotate(15 14.25 11)" />
      {/* palma con dedos plegados y pulgar */}
      <path d="M6.4 10.4h10.3c1.05 0 1.85.92 1.72 1.96l-.42 3.3A5.35 5.35 0 0 1 12.72 21h-.86a5.65 5.65 0 0 1-5.57-4.72l-.5-3.2c-.16-1.03.42-2.68 1.61-2.68Z" />
    </svg>
  );
}

// Ítems del slider: el diputado + los mismos avales que aparecen en el certificado
type Item =
  | { kind: "icon"; name: string }
  | { kind: "img"; src: string; alt: string };

const items: Item[] = [
  { kind: "icon", name: "Dip. Marcelo Del Moral" },
  { kind: "img", src: "/avales/edelar.png", alt: "Edelar" },
  { kind: "img", src: "/avales/internet.png", alt: "Internet para Todos" },
  { kind: "img", src: "/avales/banco.png", alt: "Banco Rioja" },
  { kind: "img", src: "/avales/arauco.png", alt: "Parque Arauco La Rioja" },
];

// Se repite para llenar el ancho; se renderiza dos veces para loop continuo (0% a -50%)
const row = [...items, ...items];

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
            className="flex w-max items-center gap-14"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...row, ...row].map((item, i) =>
              item.kind === "icon" ? (
                <div
                  key={`${item.name}-${i}`}
                  className="flex shrink-0 items-center gap-3 px-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-neon-green/30 bg-background-tertiary">
                    <VictoryHand className="h-5 w-5 text-neon-green" />
                  </div>
                  <span className="whitespace-nowrap text-sm font-medium text-foreground-muted">
                    {item.name}
                  </span>
                </div>
              ) : (
                <div
                  key={`${item.alt}-${i}`}
                  className="flex shrink-0 items-center px-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-9 w-auto opacity-70 transition-opacity duration-200 hover:opacity-100 sm:h-10"
                  />
                </div>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
