import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CheckCircle2, XCircle } from "lucide-react";

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
  const supabase = await createClient();

  const { data: certificate } = await supabase
    .from("certificates")
    .select("*, courses(title, duration_months), profiles!certificates_user_id_fkey(full_name)")
    .eq("verification_hash", hash)
    .single();

  if (!certificate) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-8 text-center">
          <XCircle className="mx-auto h-16 w-16 text-destructive" />
          <h1 className="mt-4 text-2xl font-bold text-white">
            Certificado no encontrado
          </h1>
          <p className="mt-2 text-foreground-secondary">
            El codigo de verificacion{" "}
            <code className="rounded bg-background-tertiary px-2 py-0.5 text-xs text-neon-green">
              {hash}
            </code>{" "}
            no corresponde a ningun certificado emitido por Castro Barros Inteligente.
          </p>
        </div>
      </div>
    );
  }

  const profile = certificate.profiles as unknown as { full_name: string | null } | null;
  const course = certificate.courses as unknown as { title: string; duration_months: number } | null;

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-neon-green/30 bg-card p-8 text-center glow-green">
        <CheckCircle2 className="mx-auto h-16 w-16 text-neon-green" />
        <h1 className="mt-4 text-2xl font-bold text-white">
          Certificado verificado
        </h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Este certificado es autentico y fue emitido por Castro Barros Inteligente.
        </p>

        <div className="mt-6 space-y-4 text-left">
          <div>
            <p className="text-xs text-foreground-muted">Titular</p>
            <p className="font-semibold text-white">
              {profile?.full_name || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Curso completado</p>
            <p className="font-semibold text-white">
              {course?.title || "—"}
            </p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Fecha de emision</p>
            <p className="font-semibold text-white">
              {new Date(certificate.issued_at).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Duracion del curso</p>
            <p className="font-semibold text-white">
              {course?.duration_months || "—"} meses
            </p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Estado</p>
            <p className="font-semibold text-neon-green">Valido</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Codigo de verificacion</p>
            <p className="font-mono text-xs text-foreground-muted break-all">
              {hash}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
