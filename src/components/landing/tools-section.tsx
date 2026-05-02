"use client";

import { motion } from "framer-motion";
import { TOOLS_LOGOS } from "@/lib/constants";

const toolColors: Record<string, string> = {
  ChatGPT: "bg-neon-green/15 text-neon-green border-neon-green/20",
  Claude: "bg-secondary/15 text-secondary border-secondary/20",
  Gemini: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/20",
  Cursor: "bg-neon-green/15 text-neon-green border-neon-green/20",
  "v0.dev": "bg-white/10 text-white border-white/20",
  Figma: "bg-secondary/15 text-secondary border-secondary/20",
  Canva: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/20",
  Notion: "bg-white/10 text-white border-white/20",
  "Google Sheets": "bg-neon-green/15 text-neon-green border-neon-green/20",
  Shopify: "bg-neon-green/15 text-neon-green border-neon-green/20",
  WordPress: "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/20",
  "Make.com": "bg-secondary/15 text-secondary border-secondary/20",
  Vercel: "bg-white/10 text-white border-white/20",
  Supabase: "bg-neon-green/15 text-neon-green border-neon-green/20",
  Midjourney: "bg-secondary/15 text-secondary border-secondary/20",
  "ElevenLabs": "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/20",
};

export function ToolsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Herramientas profesionales
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground-secondary sm:mt-4 sm:text-base">
            Las mismas tecnologias que usan empresas y profesionales de primera
            linea en todo el mundo.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:grid-cols-4 sm:gap-4 md:grid-cols-6 lg:grid-cols-8">
          {TOOLS_LOGOS.map((tool, i) => {
            const colors = toolColors[tool] || "bg-background-tertiary text-foreground-muted border-border";
            return (
              <motion.div
                key={tool}
                className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all hover:scale-105 sm:p-4 ${colors}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/40 sm:h-10 sm:w-10">
                  <span className="text-xs font-bold sm:text-sm">
                    {tool.charAt(0)}
                  </span>
                </div>
                <span className="text-center text-[10px] font-medium leading-tight sm:text-xs">
                  {tool}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
