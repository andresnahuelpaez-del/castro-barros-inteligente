import type { Metadata } from "next";
import Link from "next/link";
import {
  Award,
  ArrowRight,
  Download,
  ExternalLink,
  QrCode,
  Shield,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NeonButton } from "@/components/common/neon-button";

export const metadata: Metadata = {
  title: "Mis certificados",
};

export default async function CertificadosPage() {
  // Mock certificate for visual demo
  const mockCertificate = {
    id: "CERT-CB-2026-00142",
    courseTitle: "IA para tu Trabajo",
    issuedAt: "15 de abril de 2026",
    studentName: "Estudiante Demo",
    verificationUrl: "#",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">
        Mis certificados
      </h1>
      <p className="mt-1 text-sm text-foreground-secondary">
        Certificados oficiales emitidos por el Departamento Castro Barros.
      </p>

      {/* Certificate card */}
      <div className="mt-8 space-y-4">
        <div className="rounded-2xl border border-neon-green/20 bg-card overflow-hidden">
          {/* Certificate preview */}
          <div className="relative bg-gradient-to-br from-background-secondary to-card p-6 sm:p-8 border-b border-border">
            <div className="flex flex-col items-center text-center">
              {/* Certificate badge */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-neon-green/30 bg-neon-green/10">
                <Award className="h-8 w-8 text-neon-green" />
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-widest text-neon-green">
                Certificado oficial
              </p>
              <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                {mockCertificate.courseTitle}
              </h2>
              <p className="mt-1 text-sm text-foreground-secondary">
                Otorgado a{" "}
                <span className="text-white font-medium">
                  {mockCertificate.studentName}
                </span>
              </p>
              <p className="mt-1 text-xs text-foreground-muted">
                Emitido el {mockCertificate.issuedAt}
              </p>

              {/* Certificate details */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-neon-green/20 text-neon-green text-xs"
                >
                  <Shield className="mr-1 h-3 w-3" />
                  Verificado
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-background-tertiary text-foreground-muted text-xs"
                >
                  <QrCode className="mr-1 h-3 w-3" />
                  {mockCertificate.id}
                </Badge>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 h-8 w-8 rounded border border-neon-green/10" />
            <div className="absolute top-4 right-4 h-8 w-8 rounded border border-neon-green/10" />
            <div className="absolute bottom-4 left-4 h-8 w-8 rounded border border-neon-green/10" />
            <div className="absolute bottom-4 right-4 h-8 w-8 rounded border border-neon-green/10" />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:p-5">
            <Link
              href="/api/certificates/preview?name=Estudiante+Demo&course=ia-para-tu-trabajo"
              target="_blank"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-neon-green text-black px-4 py-2.5 text-sm font-medium hover:bg-neon-green/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              Descargar PDF
            </Link>
            <Link
              href="/verificar/a1b2c3d4e5f6789012345678abcdef90"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-white hover:bg-background-tertiary transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Verificación pública
            </Link>
            <Link
              href="/api/certificates/preview?name=Estudiante+Demo&course=ia-para-tu-trabajo"
              target="_blank"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-white hover:bg-background-tertiary transition-colors"
            >
              <QrCode className="h-4 w-4" />
              Ver código QR
            </Link>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          ¿Cómo funcionan los certificados?
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon-green/10 text-sm font-bold text-neon-green">
              1
            </div>
            <div>
              <p className="text-sm font-medium text-white">Completá el curso</p>
              <p className="mt-0.5 text-xs text-foreground-secondary">
                Terminá todas las lecciones y aprobá los quizzes.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon-green/10 text-sm font-bold text-neon-green">
              2
            </div>
            <div>
              <p className="text-sm font-medium text-white">Recibí tu certificado</p>
              <p className="mt-0.5 text-xs text-foreground-secondary">
                Se genera automáticamente con un código único de verificación.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-neon-green/10 text-sm font-bold text-neon-green">
              3
            </div>
            <div>
              <p className="text-sm font-medium text-white">Compartilo</p>
              <p className="mt-0.5 text-xs text-foreground-secondary">
                Descargá el PDF o compartí el link de verificación pública.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending certificates */}
      <div className="mt-6 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Cursos en progreso
        </h3>
        <div className="space-y-3">
          {["Creación de Contenido con IA", "Marketing Digital con IA"].map(
            (title) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl bg-background-secondary border border-border p-3"
              >
                <BookOpen className="h-5 w-5 text-foreground-muted shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{title}</p>
                  <p className="text-xs text-foreground-muted">
                    Completá el curso para obtener tu certificado
                  </p>
                </div>
                <CheckCircle2 className="h-4 w-4 text-foreground-muted shrink-0" />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
