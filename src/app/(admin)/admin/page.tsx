import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Panel de administracion</h1>
      <p className="mt-2 text-foreground-secondary">
        Metricas y gestion de la plataforma.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Alumnos inscritos", value: "0" },
          { label: "Cursos publicados", value: "0" },
          { label: "Certificados emitidos", value: "0" },
          { label: "Tasa de finalizacion", value: "0%" },
        ].map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="text-sm font-medium text-foreground-secondary">
              {metric.label}
            </h3>
            <p className="mt-2 text-3xl font-bold text-neon-green">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
