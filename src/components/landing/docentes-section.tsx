"use client";

import { motion } from "framer-motion";

const docentes = [
  { name: "Docente 1", role: "Especialista en IA", course: "IA para tu Trabajo", color: "from-neon-green/30 to-neon-green/5" },
  { name: "Docente 2", role: "Content Creator", course: "Creación de Contenido con IA", color: "from-secondary/30 to-secondary/5" },
  { name: "Docente 3", role: "Marketing Digital", course: "Marketing Digital con IA", color: "from-neon-cyan/30 to-neon-cyan/5" },
  { name: "Docente 4", role: "Desarrollador Full Stack", course: "Vibe Coding", color: "from-neon-green/30 to-neon-green/5" },
  { name: "Docente 5", role: "Analista de Datos", course: "Análisis de Datos con IA", color: "from-secondary/30 to-secondary/5" },
  { name: "Docente 6", role: "Diseñador Web", course: "Diseño Web con IA", color: "from-neon-cyan/30 to-neon-cyan/5" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export function DocentesSection() {
  return (
    <section className="bg-background-secondary py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Conocé a tus docentes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground-secondary">
            Profesionales con experiencia real en la industria, comprometidos con
            tu aprendizaje.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docentes.map((docente, i) => (
            <motion.div
              key={docente.name}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-border-bright"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${docente.color} border border-border transition-transform group-hover:scale-105`}>
                <span className="text-lg font-bold text-white">
                  {getInitials(docente.name)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-white">{docente.name}</h3>
                <p className="text-sm text-foreground-secondary">
                  {docente.role}
                </p>
                <p className="mt-1 text-xs text-neon-green">{docente.course}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
