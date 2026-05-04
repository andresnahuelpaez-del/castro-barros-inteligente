import type { Metadata } from "next";
import { Settings, Shield, Bell, Database } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Configuración",
};

export default function AdminConfigPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Configuración</h1>
      <p className="mt-1 text-foreground-secondary">
        Ajustes generales de la plataforma.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {[
          {
            icon: Settings,
            title: "General",
            desc: "Nombre del sitio, logo, colores.",
            status: "Próximamente",
          },
          {
            icon: Shield,
            title: "Seguridad",
            desc: "Roles, permisos, sesiones activas.",
            status: "Próximamente",
          },
          {
            icon: Bell,
            title: "Notificaciones",
            desc: "Emails automáticos, plantillas.",
            status: "Próximamente",
          },
          {
            icon: Database,
            title: "Datos",
            desc: "Exportar datos, backup, limpieza.",
            status: "Próximamente",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background-tertiary">
                <item.icon className="h-5 w-5 text-foreground-muted" />
              </div>
              <div>
                <h3 className="font-medium text-white">{item.title}</h3>
                <p className="text-xs text-foreground-muted">{item.desc}</p>
              </div>
            </div>
            <p className="mt-4 text-xs text-foreground-muted italic">
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
