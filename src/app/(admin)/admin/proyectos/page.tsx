import type { Metadata } from "next";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin - Proyectos",
};

// TODO: Reactivar queries Supabase cuando se conecte
export default async function AdminProjectsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Proyectos</h1>
      <p className="mt-1 text-foreground-secondary">
        Revisá las entregas de los alumnos.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
        <div className="p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-foreground-muted" />
          <p className="mt-4 text-lg font-medium text-white">
            No hay entregas aún
          </p>
          <p className="mt-1 text-sm text-foreground-secondary">
            Las entregas de proyectos aparecerán acá cuando los alumnos las envíen.
          </p>
        </div>
      </div>
    </div>
  );
}
