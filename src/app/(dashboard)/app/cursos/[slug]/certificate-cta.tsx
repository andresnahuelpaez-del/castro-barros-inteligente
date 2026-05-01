"use client";

import { useState } from "react";
import Link from "next/link";
import { NeonButton } from "@/components/common/neon-button";
import { Award, ExternalLink, PartyPopper } from "lucide-react";

interface CertificateCTAProps {
  courseId: string;
  courseTitle: string;
  existingHash: string | null;
}

export function CertificateCTA({
  courseId,
  courseTitle,
  existingHash,
}: CertificateCTAProps) {
  const [loading, setLoading] = useState(false);
  const [hash, setHash] = useState(existingHash);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    const res = await fetch("/api/certificates/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Error al generar el certificado");
      setLoading(false);
      return;
    }

    setHash(data.verificationHash);
    setLoading(false);
  }

  return (
    <div className="mt-6 rounded-2xl border border-neon-green/30 bg-card p-6 sm:p-8 text-center glow-green">
      <Award className="mx-auto h-12 w-12 text-neon-green" />
      {hash ? (
        <>
          <h3 className="mt-4 text-xl font-bold text-white">
            Felicitaciones! Completaste {courseTitle}
          </h3>
          <p className="mt-2 text-foreground-secondary">
            Tu certificado fue generado exitosamente.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href={`/verificar/${hash}`} target="_blank">
              <NeonButton size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Ver certificado
              </NeonButton>
            </Link>
            <Link href="/app/certificados">
              <NeonButton variant="outline" size="sm">
                Mis certificados
              </NeonButton>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h3 className="mt-4 text-xl font-bold text-white">
            Completaste todas las lecciones!
          </h3>
          <p className="mt-2 text-foreground-secondary">
            Ya podes generar tu certificado oficial de {courseTitle}.
          </p>
          {error && (
            <p className="mt-3 text-sm text-destructive">{error}</p>
          )}
          <div className="mt-6">
            <NeonButton onClick={handleGenerate} disabled={loading}>
              <Award className="mr-2 h-5 w-5" />
              {loading ? "Generando..." : "Generar mi certificado"}
            </NeonButton>
          </div>
        </>
      )}
    </div>
  );
}
