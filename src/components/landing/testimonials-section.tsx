"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/common/glass-card";

const testimonials = [
  {
    name: "Maria Gonzalez",
    localidad: "Anillaco",
    course: "IA para tu Trabajo",
    text: "Nunca pense que a mis 45 anos iba a aprender a usar herramientas de IA. Hoy las uso todos los dias en mi trabajo y mis companeros me piden ayuda.",
  },
  {
    name: "Lucas Herrera",
    localidad: "Aminga",
    course: "Vibe Coding",
    text: "Gracias al curso de desarrollo pude construir mi primera app y ya tengo dos clientes. El certificado me abrio puertas que no imaginaba.",
  },
  {
    name: "Ana Belen Torres",
    localidad: "Chuquis",
    course: "Marketing Digital con IA",
    text: "Tenia un kiosco y no sabia como promocionarlo online. Ahora manejo las redes con IA y las ventas crecieron un 40% en tres meses.",
  },
  {
    name: "Carlos Medina",
    localidad: "San Pedro",
    course: "E-commerce con IA",
    text: "Monte mi tienda online desde cero siguiendo el curso. Ya llevo mas de 50 ventas y estoy expandiendo a otras provincias.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Historias reales de Castro Barros
        </motion.h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full">
                <p className="text-sm leading-relaxed text-foreground-secondary">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {/* Placeholder avatar */}
                  <div className="h-10 w-10 rounded-full bg-background-tertiary border border-border" />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-foreground-muted">
                      {t.localidad} &middot; {t.course}
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
