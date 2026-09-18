import type { Metadata } from "next";
import { InterviewSimulator } from "./interview-simulator";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Simulador de Entrevistas con IA",
  description:
    "Practica una entrevista de trabajo realista con IA y recibi un informe con tu puntaje, fortalezas y como mejorar. Gratis, adaptado a La Rioja.",
};

export default function EntrevistasPage() {
  return <InterviewSimulator />;
}
