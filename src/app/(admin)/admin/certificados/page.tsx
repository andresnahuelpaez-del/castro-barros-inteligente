import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Award, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { NeonButton } from "@/components/common/neon-button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Certificados",
};

export default async function AdminCertificatesPage() {
  const supabase = await createClient();

  const { data: certificates } = await supabase
    .from("certificates")
    .select(
      "*, courses(title), profiles!certificates_user_id_fkey(full_name, email)"
    )
    .order("issued_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Certificados</h1>
          <p className="mt-1 text-foreground-secondary">
            {certificates?.length || 0} certificados emitidos.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
        {certificates && certificates.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground-muted">
                <th className="px-4 py-3 font-medium">Alumno</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Curso</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Fecha</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Hash</th>
                <th className="px-4 py-3 font-medium">Verificar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {certificates.map((cert) => {
                const profile = cert.profiles as unknown as {
                  full_name: string | null;
                  email: string;
                } | null;
                const course = cert.courses as unknown as {
                  title: string;
                } | null;

                return (
                  <tr key={cert.id} className="text-sm hover:bg-background-tertiary transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">
                        {profile?.full_name || "Sin nombre"}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {profile?.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-foreground-secondary hidden sm:table-cell">
                      {course?.title || "—"}
                    </td>
                    <td className="px-4 py-3 text-foreground-muted text-xs hidden md:table-cell">
                      {new Date(cert.issued_at).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <code className="text-xs text-foreground-muted font-mono">
                        {cert.verification_hash?.slice(0, 12)}...
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`/verificar/${cert.verification_hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-green hover:underline text-xs flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Ver
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <Award className="mx-auto h-12 w-12 text-foreground-muted" />
            <p className="mt-4 text-lg font-medium text-white">
              No hay certificados emitidos
            </p>
            <p className="mt-1 text-sm text-foreground-secondary">
              Los certificados se generan automaticamente cuando un alumno completa un curso.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
