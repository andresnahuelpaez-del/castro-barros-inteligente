"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Trophy, ArrowRight, X } from "lucide-react";

export interface Completion {
  type: "module" | "course";
  title: string;
  /** A dónde lleva el botón principal (siguiente lección, o página del curso) */
  href: string;
  cta: string;
}

export function CompletionOverlay({
  completion,
  onClose,
}: {
  completion: Completion | null;
  onClose: () => void;
}) {
  const isCourse = completion?.type === "course";

  return (
    <AnimatePresence>
      {completion && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-neon-green/30 bg-card p-8 text-center glow-green"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-foreground-muted transition-colors hover:text-white"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Partículas neon */}
            {[...Array(10)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-16 h-1.5 w-1.5 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#39FF14" : "#A855F7",
                }}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((i / 10) * Math.PI * 2) * 120,
                  y: Math.sin((i / 10) * Math.PI * 2) * 120,
                  scale: 0,
                }}
                transition={{ duration: 1, delay: 0.15, ease: "easeOut" }}
              />
            ))}

            {/* Ícono */}
            <motion.div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-neon-green bg-neon-green/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.1 }}
            >
              {isCourse ? (
                <Trophy className="h-10 w-10 text-neon-green" />
              ) : (
                <Check className="h-10 w-10 text-neon-green" strokeWidth={3} />
              )}
            </motion.div>

            <p className="mt-5 text-xs font-medium uppercase tracking-widest text-neon-green">
              {isCourse ? "Curso completado" : "Módulo completado"}
            </p>
            <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
              {isCourse
                ? "¡Felicitaciones, terminaste el curso!"
                : completion.title}
            </h3>
            <p className="mt-2 text-sm text-foreground-secondary">
              {isCourse
                ? "Completaste todas las lecciones. Ya podés generar tu certificado oficial."
                : "Buen trabajo. Seguís avanzando, la próxima lección ya está desbloqueada."}
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <Link
                href={completion.href}
                onClick={onClose}
                className="flex items-center justify-center gap-2 rounded-xl bg-neon-green px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-neon-green/90"
              >
                {completion.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={onClose}
                className="rounded-xl px-5 py-2 text-sm text-foreground-muted transition-colors hover:text-white"
              >
                Seguir acá
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
