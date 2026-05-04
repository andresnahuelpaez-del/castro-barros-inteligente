import type { Metadata } from "next";
import { Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin - Certificados",
};

// TODO: Reactivar queries Supabase cuando se conecte
export default async function AdminCertificatesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Certificados</h1>
      <p className="mt-1 text-foreground-secondary">
        0 certificados emitidos.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-12 text-center">
          <Award className="mx-auto h-12 w-12 text-foreground-muted" />
          <p className="mt-4 text-lg font-medium text-white">
            No hay certificados emitidos
          </p>
          <p className="mt-1 text-sm text-foreground-secondary">
            Los certificados se generan automáticamente cuando un alumno completa un curso.
          </p>
        </div>
      </div>
    </div>
  );
}
