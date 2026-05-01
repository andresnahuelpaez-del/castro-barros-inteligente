import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Proyectos",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  submitted: { label: "Pendiente", className: "bg-secondary/20 text-secondary" },
  reviewing: { label: "En revision", className: "bg-cyan/20 text-cyan" },
  approved: { label: "Aprobado", className: "bg-neon-green/20 text-neon-green" },
  rejected: { label: "Rechazado", className: "bg-destructive/20 text-destructive" },
};

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data: submissions } = await supabase
    .from("submissions")
    .select(
      "*, assignments(title, courses(title)), profiles!submissions_user_id_fkey(full_name, email)"
    )
    .order("submitted_at", { ascending: false })
    .limit(50);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Proyectos</h1>
      <p className="mt-1 text-foreground-secondary">
        Revisa las entregas de los alumnos.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
        {submissions && submissions.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground-muted">
                <th className="px-4 py-3 font-medium">Alumno</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Proyecto</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Fecha</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {submissions.map((sub) => {
                const profile = sub.profiles as unknown as {
                  full_name: string | null;
                  email: string;
                } | null;
                const assignment = sub.assignments as unknown as {
                  title: string;
                  courses: { title: string } | null;
                } | null;
                const status = statusConfig[sub.status] || statusConfig.submitted;

                return (
                  <tr key={sub.id} className="text-sm hover:bg-background-tertiary transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">
                        {profile?.full_name || "Sin nombre"}
                      </p>
                      <p className="text-xs text-foreground-muted">
                        {profile?.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-foreground-secondary hidden sm:table-cell">
                      <p>{assignment?.title || "—"}</p>
                      <p className="text-xs text-foreground-muted">
                        {assignment?.courses?.title}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-foreground-muted text-xs hidden md:table-cell">
                      {new Date(sub.submitted_at).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="secondary"
                        className={cn("text-xs", status.className)}
                      >
                        {status.label}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-foreground-muted" />
            <p className="mt-4 text-lg font-medium text-white">
              No hay entregas aun
            </p>
            <p className="mt-1 text-sm text-foreground-secondary">
              Las entregas de proyectos apareceran aca cuando los alumnos las envien.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
