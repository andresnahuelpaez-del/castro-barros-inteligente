import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Users, Search, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Alumnos",
};

export default async function AdminStudentsPage() {
  const supabase = await createClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*, enrollments(id, courses(title), status)")
    .eq("role", "student")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Alumnos</h1>
          <p className="mt-1 text-foreground-secondary">
            {profiles?.length || 0} alumnos registrados en la plataforma.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card overflow-hidden">
        {profiles && profiles.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-left text-xs text-foreground-muted">
                <th className="px-4 py-3 font-medium">Alumno</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Localidad</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Cursos</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Registro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {profiles.map((profile) => {
                const enrollments = (profile.enrollments || []) as unknown as {
                  id: string;
                  status: string;
                  courses: { title: string } | null;
                }[];

                return (
                  <tr key={profile.id} className="text-sm hover:bg-background-tertiary transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">
                        {profile.full_name || "Sin nombre"}
                      </p>
                      <p className="text-xs text-foreground-muted flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {profile.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-foreground-secondary hidden sm:table-cell">
                      {profile.localidad || "—"}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {enrollments.length > 0 ? (
                          enrollments.map((e) => (
                            <Badge
                              key={e.id}
                              variant="secondary"
                              className="text-xs bg-background-tertiary text-foreground-muted"
                            >
                              {e.courses?.title || "—"}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-foreground-muted">
                            Sin cursos
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-foreground-muted text-xs hidden lg:table-cell">
                      {new Date(profile.created_at).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-foreground-muted" />
            <p className="mt-4 text-lg font-medium text-white">
              No hay alumnos registrados
            </p>
            <p className="mt-1 text-sm text-foreground-secondary">
              Los alumnos apareceran aca cuando se registren en la plataforma.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
