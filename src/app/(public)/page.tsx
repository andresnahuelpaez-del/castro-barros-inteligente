import { AuroraBackground } from "@/components/common/aurora-background";
import { NeonButton } from "@/components/common/neon-button";
import Link from "next/link";

export default function Home() {
  return (
    <AuroraBackground className="min-h-screen flex items-center justify-center" intensity="medium">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
          Aprende las habilidades digitales que estan transformando el mundo
        </h1>
        <p className="mt-6 text-xl text-neon-green text-glow-green sm:text-2xl">
          Cursos intensivos con Inteligencia Artificial: Programacion, Analisis
          de datos, Marketing digital, Diseno web, Creacion de contenido,
          Gestion de negocios, E-commerce y herramientas de productividad.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/cursos">
            <NeonButton size="lg">Explora los cursos →</NeonButton>
          </Link>
          <Link href="/verificar">
            <NeonButton variant="outline" size="lg">
              Conoce el certificado
            </NeonButton>
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "8", label: "cursos disponibles" },
            { value: "100%", label: "gratuito" },
            { value: "Oficial", label: "certificacion" },
            { value: "Online", label: "modalidad flexible" },
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-2xl font-bold text-neon-green sm:text-3xl">
                {metric.value}
              </div>
              <div className="mt-1 text-sm text-foreground-secondary">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
}
