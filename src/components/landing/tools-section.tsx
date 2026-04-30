"use client";

import { motion } from "framer-motion";
import { TOOLS_LOGOS } from "@/lib/constants";

export function ToolsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Aprende con las herramientas que usan los profesionales
        </motion.h2>

        <div className="mt-12 grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {TOOLS_LOGOS.map((tool, i) => (
            <motion.div
              key={tool}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background-secondary p-4 transition-all hover:border-border-bright hover:bg-background-tertiary"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              {/* TODO: Reemplazar con logos reales */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-tertiary">
                <span className="text-xs font-bold text-foreground-muted">
                  {tool.charAt(0)}
                </span>
              </div>
              <span className="text-center text-xs text-foreground-secondary">
                {tool}
              </span>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-foreground-muted">
          Las mismas tecnologias que usan empresas y profesionales de primera
          linea en todo el mundo.
        </p>
      </div>
    </section>
  );
}
