import type { Metadata } from "next";
import { CvOptimizer } from "./cv-optimizer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mejora tu CV con IA",
  description:
    "Analiza tu curriculum, obtene un puntaje ATS y mejoralo para conseguir empleo en La Rioja. Version robot (ATS) y version presencial.",
};

export default function CvPage() {
  return <CvOptimizer />;
}
