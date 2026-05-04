import type { Metadata } from "next";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin - Alumnos",
};

// TODO: Reactivar queries Supabase cuando se conecte
export default async function AdminStudentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Alumnos</h1>
      <p className="mt-1 text-foreground-secondary">
        0 alumnos registrados en la plataforma.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-foreground-muted" />
          <p className="mt-4 text-lg font-medium text-white">
            No hay alumnos registrados
          </p>
          <p className="mt-1 text-sm text-foreground-secondary">
            Los alumnos aparecerán acá cuando se registren en la plataforma.
          </p>
        </div>
      </div>
    </div>
  );
}
