import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BadgeCheck,
  XCircle,
  ShieldCheck,
  Download,
  Award,
  Calendar,
  BookOpen,
  Clock,
  Hash,
  MapPin,
} from "lucide-react";
import { getDemoCertificate } from "@/lib/certificates-demo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verificar certificado",
  description:
    "Verificación pública y oficial de certificados de Castro Barros Inteligente.",
};

interface PageProps {
  params: Promise<{ hash: string }>;
}

// Avales oficiales — logos en public/avales
const AVALES = [
  { src: "/avales/edelar.png", alt: "Edelar" },
  { src: "/avales/internet.png", alt: "Internet para Todos" },
  { src: "/avales/banco.png", alt: "Banco Rioja" },
  { src: "/avales/arauco.png", alt: "Parque Arauco La Rioja" },
];

export default async function VerificarPage({ params }: PageProps) {
  const { hash } = await params;

  // TODO: reemplazar por consulta a Supabase por hash cuando esté conectado
  const certificate = getDemoCertificate(hash);

  if (!certificate) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-destructive/30 bg-card p-8 text-center">
          <XCircle className="mx-auto h-16 w-16 text-destructive" />
          <h1 className="mt-4 text-2xl font-bold text-white">
            Certificado no encontrado
          </h1>
          <p className="mt-2 text-sm text-foreground-secondary">
            El código{" "}
            <code className="rounded bg-background-tertiary px-2 py-0.5 text-xs text-neon-green">
              {hash}
            </code>{" "}
            no corresponde a ningún certificado emitido por Castro Barros
            Inteligente.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block text-sm text-neon-green hover:underline"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(certificate.issuedAt).toLocaleDateString(
    "es-AR",
    { day: "2-digit", month: "long", year: "numeric" }
  );

  return (
    <div className="relative overflow-hidden">
      {/* Fondo con glows neon, en línea con el certificado */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 520px at 50% -10%, rgba(57,255,20,0.10), transparent 60%), radial-gradient(700px 520px at 88% 110%, rgba(168,85,247,0.12), transparent 60%), radial-gradient(600px 460px at 6% 100%, rgba(6,182,212,0.07), transparent 60%)",
        }}
      />

      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center px-4 py-12 sm:py-16">
        {/* Badge de estado */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-green/30 bg-neon-green/10 px-4 py-2 glow-green">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-green opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
          </span>
          <span className="text-sm font-medium text-neon-green">
            Certificado verificado
          </span>
        </div>

        {/* Tarjeta principal */}
        <div className="w-full overflow-hidden rounded-3xl border border-neon-green/25 bg-card/80 glass shadow-[0_0_60px_rgba(57,255,20,0.08)]">
          {/* Encabezado */}
          <div className="relative border-b border-border bg-gradient-to-b from-neon-green/[0.07] to-transparent p-6 text-center sm:p-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-neon-green/30 bg-neon-green/10 glow-green">
              <Award className="h-8 w-8 text-neon-green" />
            </div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-neon-green">
              Castro Barros Inteligente&reg;
            </p>
            <h1 className="text-balance text-lg font-bold text-white sm:text-2xl">
              Certificado de Formación Profesional
            </h1>
            <p className="mt-1 text-xs text-foreground-muted">
              Programa de Capacitación Digital con Inteligencia Artificial
            </p>
          </div>

          {/* Titular + curso */}
          <div className="space-y-6 p-6 sm:p-8">
            <div className="text-center">
              <p className="text-[11px] uppercase tracking-widest text-foreground-muted">
                Se certifica a
              </p>
              <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {certificate.studentName}
              </p>
              <div className="mx-auto mt-3 h-px w-32 bg-gradient-to-r from-transparent via-neon-green/60 to-transparent" />
            </div>

            <div className="rounded-2xl border border-border bg-background-secondary/60 p-5">
              <div className="flex items-start gap-3">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-neon-green" />
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-foreground-muted">
                    Curso completado
                  </p>
                  <p className="text-lg font-semibold text-neon-green text-glow-green">
                    {certificate.courseTitle}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground-secondary">
                    Demostrando competencias en {certificate.competency}.
                  </p>
                </div>
              </div>
            </div>

            {/* Metadatos */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              <Meta
                icon={<Calendar className="h-4 w-4 text-neon-green" />}
                label="Fecha de emisión"
                value={formattedDate}
              />
              <Meta
                icon={<Clock className="h-4 w-4 text-neon-green" />}
                label="Duración del programa"
                value={`${certificate.durationMonths} meses`}
              />
              <Meta
                icon={<Hash className="h-4 w-4 text-neon-green" />}
                label="Código de verificación"
                value={hash}
                mono
              />
              <Meta
                icon={<MapPin className="h-4 w-4 text-neon-green" />}
                label="Emisor"
                value="Depto. Castro Barros, La Rioja"
              />
            </div>

            {/* Estado de autenticidad */}
            <div className="flex items-center gap-3 rounded-2xl border border-neon-green/25 bg-neon-green/[0.06] p-4">
              <BadgeCheck className="h-6 w-6 shrink-0 text-neon-green" />
              <div>
                <p className="text-sm font-semibold text-neon-green">
                  Este certificado es auténtico y de emisión oficial
                </p>
                <p className="mt-0.5 text-xs text-foreground-secondary">
                  Registrado en la base oficial del Departamento Castro Barros,
                  La Rioja, Argentina.
                </p>
              </div>
            </div>

            {/* Autoridad certificante */}
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-background-secondary/60 p-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-neon-green/20">
                <Image
                  src="/marcelo-del-moral.jpg"
                  alt="Diputado Marcelo Daniel Del Moral"
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-foreground-muted">
                  Autoridad certificante
                </p>
                <p className="text-base font-semibold text-white">
                  Marcelo Daniel Del Moral
                </p>
                <p className="text-xs text-foreground-secondary">
                  Diputado Provincial &middot; La Rioja
                </p>
              </div>
            </div>

            {/* Avales */}
            <div>
              <p className="mb-3 text-center text-[11px] uppercase tracking-[0.25em] text-foreground-muted">
                Con el aval y acompañamiento de
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 rounded-2xl border border-neon-green/20 bg-white/[0.03] px-5 py-5">
                {AVALES.map((a) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={a.src}
                    src={a.src}
                    alt={a.alt}
                    className="h-8 w-auto opacity-90 sm:h-9"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Acciones */}
          <div className="border-t border-border p-4 sm:p-5">
            <Link
              href={`/api/certificates/preview?name=${encodeURIComponent(
                certificate.studentName
              )}&title=${encodeURIComponent(
                certificate.courseTitle
              )}&competency=${encodeURIComponent(
                certificate.competency
              )}&code=${encodeURIComponent(certificate.code)}`}
              target="_blank"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-neon-green px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-neon-green/90"
            >
              <Download className="h-4 w-4" />
              Descargar certificado (PDF)
            </Link>
          </div>
        </div>

        {/* Pie */}
        <div className="mt-6 flex items-center gap-2 text-xs text-foreground-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-neon-green" />
          <span>
            Verificación pública permanente ·{" "}
            <Link href="/contacto" className="text-neon-green hover:underline">
              Reportar un problema
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

function Meta({
  icon,
  label,
  value,
  mono,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 bg-card p-4">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-widest text-foreground-muted">
          {label}
        </p>
        <p
          className={`text-sm font-medium text-white ${
            mono ? "break-all font-mono text-xs" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
