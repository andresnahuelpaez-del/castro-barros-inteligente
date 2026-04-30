import type { Metadata } from "next";
import { RegistroForm } from "./registro-form";

export const metadata: Metadata = {
  title: "Registrarse",
};

export default function RegistroPage() {
  return <RegistroForm />;
}
