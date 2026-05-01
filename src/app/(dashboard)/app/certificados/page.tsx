import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Award, Download, ExternalLink, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";
import { NeonButton } from "@/components/common/neon-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mis certificados",
};

export default async function CertificadosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: certificates } = await supabase
    .from("certificates")
    .select("*, courses(title, slug)")
    .eq("user_id", user.id)
    .order("issued_at", { ascending: false });

  const hasCertificates = certificates && certificates.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">Mis certificados</h1>
      <p className="mt-2 text-foreground-secondary">
        {hasCertificates
          ? "Tus certificados emitidos. Podes descargarlos o compartir el link de verificacion."
          : "Todavia no tenes certificados. Completa un curso para obtener el tuyo."}
      </p>

      {hasCertificates ? (
        <div className="mt-8 space-y-4">
          {certificates.map((cert) => {
            const course = cert.courses as unknown as {
              title: string;
              slug: string;
            };
            return (
              <GlassCard
                key={cert.id}
                neonBorder="green"
                hover={false}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10">
                    <Award className="h-6 w-6 text-neon-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-sm text-foreground-muted">
                      Emitido el{" "}
                      {new Date(cert.issued_at).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="mt-1 text-xs text-foreground-muted">
                      Codigo: {cert.hash}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/verificar/${cert.hash}`} target="_blank">
                    <NeonButton variant="outline" size="sm">
                      <ExternalLink className="mr-1.5 h-4 w-4" />
                      Verificar
                    </NeonButton>
                  </Link>
                  {cert.pdf_url && (
                    <a href={cert.pdf_url} download>
                      <NeonButton size="sm">
                        <Download className="mr-1.5 h-4 w-4" />
                        Descargar
                      </NeonButton>
                    </a>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <Award className="mx-auto h-16 w-16 text-foreground-muted" />
          <h2 className="mt-4 text-xl font-semibold text-white">
            Tu primer certificado te espera
          </h2>
          <p className="mx-auto mt-2 max-w-md text-foreground-secondary">
            Completa un curso y recibi tu certificado oficial del Departamento
            Castro Barros con codigo de verificacion publica.
          </p>
          <div className="mt-6">
            <Link href="/cursos">
              <NeonButton size="lg">
                Explorar cursos <ArrowRight className="ml-2 h-5 w-5" />
              </NeonButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
