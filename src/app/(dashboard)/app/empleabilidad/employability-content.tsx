"use client";

import { useState } from "react";
import {
  Globe,
  Briefcase,
  MapPin,
  UserCircle,
  ExternalLink,
  ChevronRight,
  Search,
  Rocket,
  FileText,
  Video,
  DollarSign,
  Lightbulb,
  ArrowUpRight,
  Star,
  TrendingUp,
} from "lucide-react";
import {
  JOB_PLATFORMS,
  APPLICATION_METHODS,
  PROFILE_TIPS,
  EMPLOYABILITY_STATS,
} from "@/lib/employability-data";
import { GlassCard } from "@/components/common/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const platformTypeLabels = {
  freelance: "Freelance",
  remoto: "Empleo remoto",
  local: "Argentina",
  red_profesional: "Red profesional",
  portfolio: "Portfolio",
};

const platformTypeColors = {
  freelance: "bg-neon-green/20 text-neon-green",
  remoto: "bg-neon-cyan/20 text-neon-cyan-bright",
  local: "bg-secondary/20 text-neon-violet-bright",
  red_profesional: "bg-yellow-500/20 text-yellow-400",
  portfolio: "bg-pink-500/20 text-pink-400",
};

const platformTypeIcons = {
  freelance: Globe,
  remoto: Briefcase,
  local: MapPin,
  red_profesional: UserCircle,
  portfolio: FileText,
};

const methodIcons = [Search, Rocket, MapPin, Star, Lightbulb];
const tipIcons = [FileText, ChevronRight, Video, DollarSign];

type PlatformFilter = "todos" | "freelance" | "remoto" | "local" | "red_profesional" | "portfolio";

export function EmployabilityContent() {
  const [filter, setFilter] = useState<PlatformFilter>("todos");

  const filteredPlatforms =
    filter === "todos"
      ? JOB_PLATFORMS
      : JOB_PLATFORMS.filter((p) => p.type === filter);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
        <Badge className="mb-4 bg-neon-green/20 text-neon-green" variant="secondary">
          Guia gratuita
        </Badge>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
          Como encontrar trabajo en internet
        </h1>
        <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
          Esta guia te muestra todas las formas reales de generar ingresos con
          las habilidades que aprendes en Castro Barros Inteligente. Plataformas,
          estrategias, como armar tu perfil y como postularte de forma
          efectiva.
        </p>
        <p className="mt-3 text-sm text-foreground-muted">
          No necesitas estar inscrito en ningun curso para leer esta guia.
          Es informacion abierta para todos los usuarios registrados.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {EMPLOYABILITY_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5 text-center"
          >
            <p className="text-3xl font-bold text-neon-green">{stat.value}</p>
            <p className="mt-2 text-xs text-foreground-secondary leading-relaxed">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ============================================ */}
      {/* SECCION 1: DONDE BUSCAR */}
      {/* ============================================ */}
      <section className="mt-12">
        <h2 className="flex items-center gap-3 text-2xl font-bold">
          <Globe className="h-6 w-6 text-neon-green" />
          Donde buscar trabajo online
        </h2>
        <p className="mt-2 text-foreground-secondary">
          Estas son las plataformas mas importantes para encontrar trabajo
          digital, ordenadas por tipo. Cada una tiene su logica y sus ventajas.
        </p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              { key: "todos", label: "Todos" },
              { key: "freelance", label: "Freelance" },
              { key: "remoto", label: "Empleo remoto" },
              { key: "local", label: "Argentina" },
              { key: "red_profesional", label: "Redes profesionales" },
              { key: "portfolio", label: "Portfolio" },
            ] as { key: PlatformFilter; label: string }[]
          ).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                filter === f.key
                  ? "border-neon-green bg-neon-green/10 text-neon-green"
                  : "border-border bg-background-secondary text-foreground-secondary hover:border-border-bright hover:text-white"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Platform cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {filteredPlatforms.map((platform) => {
            const Icon = platformTypeIcons[platform.type];
            return (
              <GlassCard
                key={platform.name}
                neonBorder="green"
                className="h-full"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-neon-green" />
                    <h3 className="font-semibold text-white">{platform.name}</h3>
                  </div>
                  <Badge
                    className={cn(
                      "shrink-0 text-xs",
                      platformTypeColors[platform.type]
                    )}
                    variant="secondary"
                  >
                    {platformTypeLabels[platform.type]}
                  </Badge>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                  {platform.description}
                </p>
                <div className="mt-3">
                  <p className="text-xs text-foreground-muted">
                    <span className="font-medium text-foreground-secondary">
                      Ideal para:
                    </span>{" "}
                    {platform.bestFor}
                  </p>
                </div>
                <div className="mt-3 rounded-lg bg-neon-green/5 border border-neon-green/10 p-3">
                  <p className="text-xs text-neon-green">
                    <span className="font-semibold">Tip:</span> {platform.tip}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCION 2: COMO POSTULARTE */}
      {/* ============================================ */}
      <section className="mt-12">
        <h2 className="flex items-center gap-3 text-2xl font-bold">
          <Rocket className="h-6 w-6 text-neon-cyan" />
          Como postularte (5 caminos distintos)
        </h2>
        <p className="mt-2 text-foreground-secondary">
          No hay una sola forma de conseguir trabajo online. Estos son los 5
          caminos mas efectivos, y podes usar varios al mismo tiempo.
        </p>

        <div className="mt-6 space-y-6">
          {APPLICATION_METHODS.map((method, i) => {
            const Icon = methodIcons[i];
            return (
              <div
                key={method.title}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-cyan/10">
                    <Icon className="h-5 w-5 text-neon-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {method.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                      {method.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {method.steps.map((step, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background-tertiary text-xs font-bold text-foreground-secondary">
                        {j + 1}
                      </span>
                      <p className="text-sm text-foreground-secondary pt-0.5">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-lg bg-secondary/5 border border-secondary/20 p-4">
                  <p className="text-sm text-secondary">
                    <span className="font-semibold">Pro tip:</span>{" "}
                    {method.proTip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCION 3: TU PERFIL PROFESIONAL */}
      {/* ============================================ */}
      <section className="mt-12">
        <h2 className="flex items-center gap-3 text-2xl font-bold">
          <UserCircle className="h-6 w-6 text-secondary" />
          Construi tu perfil profesional
        </h2>
        <p className="mt-2 text-foreground-secondary">
          Antes de postularte a cualquier cosa, asegurate de tener estas bases
          cubiertas. Un buen perfil hace que el trabajo te busque a vos.
        </p>

        <div className="mt-6 space-y-6">
          {PROFILE_TIPS.map((section, i) => {
            const Icon = tipIcons[i];
            return (
              <div
                key={section.title}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-secondary" />
                  <h3 className="text-lg font-semibold text-white">
                    {section.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {section.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm text-foreground-secondary"
                    >
                      <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-neon-green" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================ */}
      {/* SECCION 4: CONSEJO FINAL */}
      {/* ============================================ */}
      <section className="mt-12">
        <div className="rounded-2xl border border-neon-green/20 bg-neon-green/5 p-6 sm:p-10 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Lo mas importante
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground-secondary leading-relaxed">
            No existe un camino perfecto ni una formula magica. Lo que si
            existe es la constancia: aplicar todos los dias, mejorar con cada
            intento y no rendirse despues del primer rechazo. Cada
            profesional exitoso que ves en internet empezo exactamente donde
            estas vos ahora.
          </p>
          <p className="mt-4 text-lg font-semibold text-neon-green text-glow-green">
            El mejor momento para empezar fue ayer. El segundo mejor momento
            es ahora.
          </p>
        </div>
      </section>
    </div>
  );
}
