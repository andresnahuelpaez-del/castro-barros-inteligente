import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Award,
  Briefcase,
  ArrowRight,
  Compass,
} from "lucide-react";
import { GlassCard } from "@/components/common/glass-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mi panel",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile && !profile.onboarding_completed) {
    redirect("/app/onboarding");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-white">
        Hola{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="mt-2 text-foreground-secondary">
        Bienvenido a tu panel de aprendizaje.
      </p>

      {/* Metricas */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-neon-green" />
            <h3 className="text-sm font-medium text-foreground-secondary">
              Cursos activos
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-neon-green">0</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-foreground-secondary" />
            <h3 className="text-sm font-medium text-foreground-secondary">
              Lecciones completadas
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-foreground-secondary" />
            <h3 className="text-sm font-medium text-foreground-secondary">
              Certificados
            </h3>
          </div>
          <p className="mt-2 text-3xl font-bold text-white">0</p>
        </div>
      </div>

      {/* Accesos rapidos */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/cursos">
          <GlassCard neonBorder="green" className="group flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-green/10">
              <Compass className="h-6 w-6 text-neon-green" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-neon-green transition-colors">
                Explorar cursos
              </p>
              <p className="mt-1 text-sm text-foreground-secondary">
                8 programas profesionales listos para que empieces.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground-muted group-hover:text-neon-green transition-colors" />
          </GlassCard>
        </Link>

        <Link href="/app/empleabilidad">
          <GlassCard neonBorder="cyan" className="group flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/10">
              <Briefcase className="h-6 w-6 text-neon-cyan" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white group-hover:text-neon-cyan-bright transition-colors">
                Guia de empleabilidad
              </p>
              <p className="mt-1 text-sm text-foreground-secondary">
                Como encontrar trabajo online, donde postularte y cuanto cobrar.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 text-foreground-muted group-hover:text-neon-cyan transition-colors" />
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
