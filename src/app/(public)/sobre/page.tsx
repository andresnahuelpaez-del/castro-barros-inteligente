import type { Metadata } from "next";
import { Target, Eye, Users, Handshake } from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce la mision, vision y equipo detras de Castro Barros Inteligente.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Sobre Castro Barros Inteligente<sup>&reg;</sup>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground-secondary">
          Una iniciativa estatal para democratizar la educacion digital en el
          Departamento Castro Barros, La Rioja.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <GlassCard neonBorder="green">
          <Target className="h-10 w-10 text-neon-green" />
          <h2 className="mt-4 text-xl font-bold">Mision</h2>
          <p className="mt-2 text-foreground-secondary leading-relaxed">
            Brindar capacitacion digital profesional, gratuita y certificada a
            cada habitante del Departamento Castro Barros, utilizando
            Inteligencia Artificial como herramienta central de aprendizaje,
            para que puedan acceder a nuevas oportunidades laborales y
            productivas en la economia digital.
          </p>
        </GlassCard>

        <GlassCard neonBorder="violet">
          <Eye className="h-10 w-10 text-neon-violet-bright" />
          <h2 className="mt-4 text-xl font-bold">Vision</h2>
          <p className="mt-2 text-foreground-secondary leading-relaxed">
            Convertir al Departamento Castro Barros en un referente nacional de
            transformacion digital comunitaria, donde cada ciudadano tenga las
            herramientas para competir profesionalmente en el mercado global,
            sin importar su ubicacion geografica ni su punto de partida
            educativo.
          </p>
        </GlassCard>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <GlassCard>
          <Users className="h-10 w-10 text-neon-cyan" />
          <h2 className="mt-4 text-xl font-bold">El equipo</h2>
          <p className="mt-2 text-foreground-secondary leading-relaxed">
            Un equipo interdisciplinario de educadores, tecnologos y
            profesionales comprometidos con el desarrollo de Castro Barros.
            Cada docente fue seleccionado por su experiencia real en la
            industria y su capacidad de transmitir conocimientos de forma
            clara y practica.
          </p>
        </GlassCard>

        <GlassCard>
          <Handshake className="h-10 w-10 text-neon-green" />
          <h2 className="mt-4 text-xl font-bold">Alianzas institucionales</h2>
          <ul className="mt-2 space-y-2 text-foreground-secondary">
            <li>Gobierno de la Provincia de La Rioja</li>
            <li>Ministerio de Educacion de La Rioja</li>
            <li>Diputado Marcelo Daniel Del Moral</li>
            <li>LINE (Lucid Intelligence New Era)</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
