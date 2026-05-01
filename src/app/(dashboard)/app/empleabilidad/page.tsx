import type { Metadata } from "next";
import { EmployabilityContent } from "./employability-content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Guia de Empleabilidad Digital",
  description:
    "Aprende a encontrar trabajo online: plataformas, estrategias, como postularte y como construir tu perfil profesional.",
};

export default function EmpleabilidadPage() {
  return <EmployabilityContent />;
}
