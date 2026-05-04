import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Shield,
  Download,
  QrCode,
  Award,
  Calendar,
  BookOpen,
  Clock,
  User,
} from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verificar certificado",
  description:
    "Verificación pública de certificados de Castro Barros Inteligente.",
};

interface PageProps {
  params: Promise<{ hash: string }>;
}

// Mock certificate data for demo — when Supabase is connected, this will query the DB
const MOCK_CERTIFICATE = {
  studentName: "María López",
  courseTitle: "IA para tu Trabajo",
  issuedAt: "2026-04-15T00:00:00Z",
  durationMonths: 4,
  code: "CERT-CB-2026-00142",
  status: "valid" as const,
};

export default async function VerificarPage({ params }: PageProps) {
  const { hash } = await params;

  // TODO: Replace with Supabase query when connected
  // For demo, show the mock certificate for any hash
  const certificate = MOCK_CERTIFICATE;
  const isValid = !!certificate;

  if (!isValid) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-8 text-center">
          <XCircle className="mx-auto h-16 w-16 text-destructive" />
          <h1 className="mt-4 text-2xl font-bold text-white">
            Certificado no encontrado
          </h1>
          <p className="mt-2 text-sm text-foreground-secondary">
            El código de verificación{" "}
            <code className="rounded bg-background-tertiary px-2 py-0.5 text-xs text-neon-green">
              {hash}
            </code>{" "}
            no corresponde a ningún certificado emitido por Castro Barros
            Inteligente.
          </p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(certificate.issuedAt).toLocaleDateString(
    "es-AR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Status badge */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-2">
            <Shield className="h-4 w-4 text-neon-green" />
            <span className="text-sm font-medium text-neon-green">
              Certificado verificado
            </span>
          </div>
        </div>

        {/* Main card */}
        <div className="rounded-2xl border border-neon-green/20 bg-card overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-b from-neon-green/5 to-transparent p-6 sm:p-8 text-center border-b border-border">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-neon-green/30 bg-neon-green/10">
                <Award className="h-8 w-8 text-neon-green" />
              </div>
            </div>
            <p className="text-xs font-medium uppercase tracking-widest text-neon-green mb-1">
              Castro Barros Inteligente&reg;
            </p>
            <h1 className="text-xl font-bold text-white sm:text-2xl">
              Certificado Oficial
            </h1>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 space-y-5">
            <div className="flex items-start gap-3">
              <User className="h-4 w-4 text-neon-green mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-foreground-muted">Titular</p>
                <p className="text-base font-semibold text-white">
                  {certificate.studentName}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <BookOpen className="h-4 w-4 text-neon-green mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-foreground-muted">
                  Curso completado
                </p>
                <p className="text-base font-semibold text-white">
                  {certificate.courseTitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-4 w-4 text-neon-green mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-foreground-muted">
                    Fecha de emisión
                  </p>
                  <p className="text-sm font-medium text-white">
                    {formattedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-neon-green mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-foreground-muted">
                    Duración del programa
                  </p>
                  <p className="text-sm font-medium text-white">
                    {certificate.durationMonths} meses
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <QrCode className="h-4 w-4 text-neon-green mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-foreground-muted">
                  Código de verificación
                </p>
                <p className="font-mono text-xs text-foreground-secondary break-all">
                  {hash}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="rounded-xl border border-neon-green/20 bg-neon-green/5 p-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-neon-green shrink-0" />
              <div>
                <p className="text-sm font-medium text-neon-green">
                  Este certificado es auténtico
                </p>
                <p className="text-xs text-foreground-secondary mt-0.5">
                  Emitido oficialmente por el Departamento Castro Barros, La
                  Rioja, Argentina.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-border p-4 sm:p-5 flex flex-col gap-2 sm:flex-row">
            <Link
              href={`/api/certificates/preview?name=${encodeURIComponent(certificate.studentName)}&course=ia-para-tu-trabajo`}
              target="_blank"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neon-green text-black px-4 py-2.5 text-sm font-medium hover:bg-neon-green/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Descargar certificado
            </Link>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-foreground-muted">
          ¿Tenés dudas sobre este certificado?{" "}
          <Link href="/contacto" className="text-neon-green hover:underline">
            Contactanos
          </Link>
        </p>
      </div>
    </div>
  );
}
