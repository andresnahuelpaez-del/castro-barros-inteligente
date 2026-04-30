import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/app");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r border-border bg-background-secondary lg:block">
        <div className="p-6">
          <h2 className="text-lg font-bold">
            <span className="text-white">CB</span>{" "}
            <span className="text-neon-green">Admin</span>
          </h2>
        </div>
        <nav className="space-y-1 px-3">
          {[
            { href: "/admin", label: "Dashboard" },
            { href: "/admin/cursos", label: "Cursos" },
            { href: "/admin/alumnos", label: "Alumnos" },
            { href: "/admin/proyectos", label: "Proyectos" },
            { href: "/admin/certificados", label: "Certificados" },
            { href: "/admin/reportes", label: "Reportes" },
            { href: "/admin/configuracion", label: "Configuracion" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm text-foreground-secondary transition-colors hover:bg-background-tertiary hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}
