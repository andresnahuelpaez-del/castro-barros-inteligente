import type { Metadata } from "next";
// Note: keep as RSC, use CSS-only hover effects
import Link from "next/link";
import {
  Briefcase,
  Globe,
  MapPin,
  Share2,
  Rocket,
  FileText,
  MessageSquare,
  Video,
  DollarSign,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Users,
} from "lucide-react";
import {
  JOB_PLATFORMS,
  APPLICATION_METHODS,
  PROFILE_TIPS,
  EMPLOYABILITY_STATS,
} from "@/lib/employability-data";
import { NeonButton } from "@/components/common/neon-button";

export const metadata: Metadata = {
  title: "Conseguí Trabajo — Guía de Empleabilidad Digital",
  description:
    "Guía completa para conseguir trabajo online: plataformas, metodologías, CV, portfolio y más. Programa Castro Barros Inteligente.",
};

// Mini logos SVG para cada plataforma
const platformLogos: Record<string, React.ReactNode> = {
  Fiverr: (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <circle cx="12" cy="12" r="10" fill="#1DBF73" fillOpacity="0.15" />
      <text x="12" y="16" textAnchor="middle" fill="#1DBF73" fontSize="12" fontWeight="bold">f</text>
    </svg>
  ),
  Upwork: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#14A800" fillOpacity="0.15" />
      <path d="M7 14c0-2 1.5-3.5 3-4l-1-3c-2.5 1-4 3.5-4 6h2zm5-7l1 3c1.5-.5 3 .5 3 2h2c0-3-2.5-5.5-6-5z" fill="#14A800" />
    </svg>
  ),
  "Freelancer.com": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#29B2FE" fillOpacity="0.15" />
      <path d="M8 8h8l-2 3h-3l-1 2h3l-2 3H8" stroke="#29B2FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Workana: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#24C0A2" fillOpacity="0.15" />
      <path d="M7 9l2.5 6 2.5-4 2.5 4L17 9" stroke="#24C0A2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#0A66C2" fillOpacity="0.15" />
      <path d="M9 16V10.5M9 8.5v-.01M12 16v-3.5c0-1.5 1-2 2-2s1.5.8 1.5 2V16" stroke="#0A66C2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "Remote OK": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FF4742" fillOpacity="0.15" />
      <circle cx="12" cy="12" r="3" stroke="#FF4742" strokeWidth="1.5" />
      <path d="M12 5v2M12 17v2M5 12h2M17 12h2" stroke="#FF4742" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  "We Work Remotely": (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FCD34D" fillOpacity="0.15" />
      <path d="M8 10l4 4 4-4" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Contra: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#E8FF65" fillOpacity="0.15" />
      <path d="M8 12a4 4 0 108 0 4 4 0 00-8 0z" stroke="#C8E600" strokeWidth="1.5" />
    </svg>
  ),
  Bumeran: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#FF6600" fillOpacity="0.15" />
      <path d="M8 15c1-3 3-5 6-5-2 1-3 3-3 5h-3z" fill="#FF6600" fillOpacity="0.6" stroke="#FF6600" strokeWidth="1" />
    </svg>
  ),
  ZonaJobs: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#00A3E0" fillOpacity="0.15" />
      <path d="M8 9h8M8 15h5" stroke="#00A3E0" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  CompuTrabajo: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#1E88E5" fillOpacity="0.15" />
      <rect x="8" y="8" width="8" height="6" rx="1" stroke="#1E88E5" strokeWidth="1.5" />
      <path d="M10 14v2M14 14v2" stroke="#1E88E5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Behance: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="#1769FF" fillOpacity="0.15" />
      <path d="M7 8h3.5a2 2 0 010 4H7V8zM7 12h4a2 2 0 010 4H7v-4z" stroke="#1769FF" strokeWidth="1.2" />
      <path d="M14 10h4M14 14h4" stroke="#1769FF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.1" />
      <path d="M12 6C8.7 6 6 8.7 6 12c0 2.7 1.7 4.9 4 5.7.3.1.4-.1.4-.3v-1c-1.6.4-2-.8-2-.8-.3-.7-.7-.9-.7-.9-.5-.4 0-.4 0-.4.6 0 .9.6.9.6.5.9 1.4.6 1.7.5.1-.4.2-.6.4-.8-1.3-.1-2.7-.7-2.7-2.9 0-.6.2-1.1.6-1.5-.1-.2-.3-.7.1-1.5 0 0 .5-.2 1.6.6.5-.1 1-.2 1.5-.2s1 .1 1.5.2c1.1-.8 1.6-.6 1.6-.6.4.8.2 1.3.1 1.5.4.4.6.9.6 1.5 0 2.2-1.4 2.8-2.7 2.9.2.2.4.6.4 1.1v1.7c0 .2.1.4.4.3 2.3-.8 4-3 4-5.7C18 8.7 15.3 6 12 6z" fill="white" fillOpacity="0.7" />
    </svg>
  ),
};

const categoryDescriptions: Record<string, string> = {
  freelance:
    "Trabajás por proyecto para clientes de todo el mundo. Vos elegís tus horarios, tus clientes y cuánto cobrás. Ideal para empezar a generar ingresos rápido.",
  remoto:
    "Empleo en relación de dependencia pero 100% desde tu casa. Generalmente en empresas de tecnología que pagan en dólares. Más estable que el freelance.",
  local:
    "Portales de empleo argentinos para buscar trabajo presencial o remoto en empresas del país. Útil si buscás empleo formal en blanco.",
  red_profesional:
    "Tu perfil profesional online. No es solo para buscar trabajo: es para que el trabajo te encuentre a vos. Obligatorio tener presencia activa.",
  portfolio:
    "Plataformas para mostrar tus trabajos. Los empleadores y clientes quieren ver qué sabés hacer, no solo leer que sabés hacerlo.",
};

const categoryColors: Record<string, string> = {
  freelance: "#39FF14",
  remoto: "#06B6D4",
  local: "#F59E0B",
  red_profesional: "#3B82F6",
  portfolio: "#A855F7",
};

const platformTypeLabels: Record<string, { label: string; icon: React.ReactNode }> = {
  freelance: { label: "Freelance", icon: <Globe className="h-4 w-4" /> },
  remoto: { label: "Empleo remoto", icon: <Briefcase className="h-4 w-4" /> },
  local: { label: "Portales Argentina", icon: <MapPin className="h-4 w-4" /> },
  red_profesional: { label: "Red profesional", icon: <Share2 className="h-4 w-4" /> },
  portfolio: { label: "Portfolio", icon: <FileText className="h-4 w-4" /> },
};

const methodIcons = [Globe, Briefcase, MapPin, Share2, Rocket];
const tipIcons = [FileText, MessageSquare, Video, DollarSign];

export default function EmpleabilidadPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-neon-green mb-3">
          Tu futuro profesional empieza acá
        </p>
        <h1 className="text-3xl font-bold sm:text-5xl">
          Conseguí trabajo con lo que aprendiste
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground-secondary">
          No alcanza con aprender — hay que saber cómo conseguir oportunidades.
          Esta guía te enseña dónde buscar trabajo, cómo postularte, cómo armar
          tu perfil profesional y cuánto cobrar.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {EMPLOYABILITY_STATS.map((stat) => (
          <div
            key={stat.value}
            className="rounded-xl border border-border bg-card p-4 text-center"
          >
            <div className="text-2xl font-bold text-neon-green sm:text-3xl">
              {stat.value}
            </div>
            <p className="mt-1 text-xs text-foreground-secondary leading-snug">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════ */}
      {/* SECCIÓN 1: Dónde buscar */}
      {/* ═══════════════════════════════════ */}
      <section className="mt-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Dónde buscar trabajo
          </h2>
          <p className="mt-2 text-foreground-secondary">
            Las mejores plataformas para encontrar oportunidades, organizadas
            por tipo. Cada una tiene su estilo — elegí las que mejor se adapten
            a tu perfil.
          </p>
        </div>

        {(["freelance", "remoto", "local", "red_profesional", "portfolio"] as const).map(
          (type) => {
            const platforms = JOB_PLATFORMS.filter((p) => p.type === type);
            if (platforms.length === 0) return null;
            const typeInfo = platformTypeLabels[type];
            const color = categoryColors[type];
            const description = categoryDescriptions[type];
            return (
              <div key={type} className="mb-12">
                {/* Category header */}
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <span style={{ color }}>{typeInfo.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold" style={{ color }}>
                      {typeInfo.label}
                    </h3>
                  </div>
                  <div
                    className="hidden sm:block h-px flex-1"
                    style={{ backgroundColor: `${color}20` }}
                  />
                </div>
                <p className="mb-5 text-sm text-foreground-secondary leading-relaxed max-w-3xl">
                  {description}
                </p>

                {/* Platform cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {platforms.map((platform) => (
                    <div
                      key={platform.name}
                      className="group rounded-xl border border-border/50 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-border-bright"
                    >
                      {/* Platform header with logo */}
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${color}10` }}
                        >
                          {platformLogos[platform.name] || (
                            <Globe className="h-4 w-4" style={{ color }} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm">
                            {platform.name}
                          </h4>
                        </div>
                        <a
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-7 w-7 items-center justify-center rounded-md text-foreground-muted hover:text-white transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>

                      <p className="text-xs text-foreground-secondary leading-relaxed">
                        {platform.description}
                      </p>

                      <p className="mt-3 text-[11px] text-foreground-muted">
                        <span className="font-medium text-foreground-secondary">
                          Ideal para:
                        </span>{" "}
                        {platform.bestFor}
                      </p>

                      <div
                        className="mt-3 flex items-start gap-2 rounded-lg p-2.5"
                        style={{
                          backgroundColor: `${color}08`,
                          borderLeft: `2px solid ${color}30`,
                        }}
                      >
                        <Lightbulb
                          className="h-3 w-3 shrink-0 mt-0.5"
                          style={{ color }}
                        />
                        <p className="text-[11px] text-foreground-secondary leading-relaxed">
                          {platform.tip}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECCIÓN 2: Cómo buscar */}
      {/* ═══════════════════════════════════ */}
      <section className="mt-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Cómo buscar oportunidades
          </h2>
          <p className="mt-2 text-foreground-secondary">
            Cinco metodologías probadas para conseguir trabajo o clientes. No son
            excluyentes — combiná las que mejor te funcionen.
          </p>
        </div>

        <div className="space-y-6">
          {APPLICATION_METHODS.map((method, i) => {
            const Icon = methodIcons[i];
            return (
              <div
                key={method.title}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-green/10">
                    <Icon className="h-5 w-5 text-neon-green" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {method.title}
                    </h3>
                    <p className="mt-2 text-sm text-foreground-secondary leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {method.steps.map((step, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-neon-green/70" />
                      <p className="text-sm text-foreground-secondary leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-start gap-2 rounded-lg bg-[#A855F7]/5 border border-[#A855F7]/15 p-4">
                  <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-[#A855F7]" />
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    <span className="font-medium text-[#A855F7]">
                      Pro tip:
                    </span>{" "}
                    {method.proTip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════ */}
      {/* SECCIÓN 3: Tu perfil profesional */}
      {/* ═══════════════════════════════════ */}
      <section className="mt-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Armá tu perfil profesional
          </h2>
          <p className="mt-2 text-foreground-secondary">
            Tu CV, tu propuesta, tu entrevista y tus precios. Todo lo que
            necesitás para presentarte como un profesional, aunque estés
            empezando.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {PROFILE_TIPS.map((section, i) => {
            const Icon = tipIcons[i];
            return (
              <div
                key={section.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#06B6D4]/10">
                    <Icon className="h-4 w-4 text-[#06B6D4]" />
                  </div>
                  <h3 className="font-semibold text-white">{section.title}</h3>
                </div>
                <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
                  {section.description}
                </p>
                <ul className="space-y-2.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#06B6D4]/70" />
                      <span className="text-xs text-foreground-secondary leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA final */}
      <section className="mt-16 rounded-2xl border border-neon-green/20 bg-neon-green/5 p-8 sm:p-12 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          El primer paso es <span className="text-neon-green">capacitarte</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground-secondary">
          Todo lo que leíste en esta guía lo vas a poner en práctica dentro de
          nuestros cursos. Cada programa incluye actividades de empleabilidad,
          armado de portfolio y preparación profesional.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link href="/registro">
            <NeonButton size="lg">
              Inscribite gratis <ArrowRight className="ml-2 h-5 w-5" />
            </NeonButton>
          </Link>
          <Link href="/cursos">
            <NeonButton variant="outline" size="lg">
              Ver los cursos
            </NeonButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
