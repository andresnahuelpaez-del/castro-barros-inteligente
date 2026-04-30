import type { Metadata } from "next";
import { CheckCircle2, Download } from "lucide-react";
import { NeonButton } from "@/components/common/neon-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verificar certificado",
  description: "Verificacion publica de certificados de Castro Barros Inteligente.",
};

interface PageProps {
  params: Promise<{ hash: string }>;
}

export default async function VerificarPage({ params }: PageProps) {
  const { hash } = await params;

  // TODO: Buscar el certificado en Supabase por hash
  // Por ahora mostramos un placeholder
  const certificate = null as null | {
    fullName: string;
    courseName: string;
    issuedAt: string;
    duration: string;
  };

  if (!certificate) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">
            Certificado no encontrado
          </h1>
          <p className="mt-2 text-foreground-secondary">
            El codigo de verificacion <code className="text-neon-green">{hash}</code>{" "}
            no corresponde a ningun certificado emitido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-neon-green/30 bg-card p-8 text-center glow-green">
        <CheckCircle2 className="mx-auto h-16 w-16 text-neon-green" />
        <h1 className="mt-4 text-2xl font-bold text-white">
          Certificado verificado
        </h1>

        <div className="mt-6 space-y-4 text-left">
          <div>
            <p className="text-xs text-foreground-muted">Titular</p>
            <p className="font-semibold text-white">{certificate.fullName}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Curso completado</p>
            <p className="font-semibold text-white">{certificate.courseName}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Fecha de emision</p>
            <p className="font-semibold text-white">{certificate.issuedAt}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Duracion del curso</p>
            <p className="font-semibold text-white">{certificate.duration}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Estado</p>
            <p className="font-semibold text-neon-green">Valido</p>
          </div>
        </div>

        <div className="mt-8">
          <NeonButton>
            <Download className="mr-2 h-4 w-4" />
            Descargar PDF
          </NeonButton>
        </div>
      </div>
    </div>
  );
}
