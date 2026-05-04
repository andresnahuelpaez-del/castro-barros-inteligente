"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/common/glass-card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    localidad: "Anillaco",
    course: "IA para tu Trabajo",
    text: "Nunca pensé que a mis 45 años iba a aprender a usar herramientas de IA. Hoy las uso todos los días en mi trabajo y mis compañeros me piden ayuda.",
    color: "bg-neon-green/20 text-neon-green",
  },
  {
    name: "Lucas Herrera",
    localidad: "Aminga",
    course: "Vibe Coding",
    text: "Gracias al curso de desarrollo pude construir mi primera app y ya tengo dos clientes. El certificado me abrió puertas que no imaginaba.",
    color: "bg-secondary/20 text-secondary",
  },
  {
    name: "Ana Belén Torres",
    localidad: "Chuquis",
    course: "Marketing Digital con IA",
    text: "Tenía un kiosco y no sabía cómo promocionarlo online. Ahora manejo las redes con IA y las ventas crecieron un 40% en tres meses.",
    color: "bg-neon-cyan/20 text-neon-cyan",
  },
  {
    name: "Carlos Medina",
    localidad: "San Pedro",
    course: "E-commerce con IA",
    text: "Monté mi tienda online desde cero siguiendo el curso. Ya llevo más de 50 ventas y estoy expandiendo a otras provincias.",
    color: "bg-neon-green/20 text-neon-green",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Historias reales de Castro Barros
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground-secondary">
            Personas de nuestro departamento que ya están transformando su vida
            con habilidades digitales.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-neon-green text-neon-green"
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-foreground-secondary">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${t.color}`}
                  >
                    {getInitials(t.name)}
                  </div>
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
