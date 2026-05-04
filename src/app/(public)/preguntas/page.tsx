import type { Metadata } from "next";
import { FaqSection } from "@/components/landing/faq-section";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas a las preguntas más comunes sobre Castro Barros Inteligente, la plataforma de capacitación digital gratuita con IA.",
};

export default function PreguntasPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Preguntas frecuentes
        </h1>
        <p className="mt-4 text-lg text-foreground-secondary">
          Todo lo que necesitas saber sobre Castro Barros Inteligente&reg;.
        </p>
      </div>
      <FaqSection />
    </div>
  );
}
