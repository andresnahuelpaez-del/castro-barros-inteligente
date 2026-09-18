import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Calendar,
  Users,
  Award,
  ArrowRight,
  Briefcase,
  Wrench,
  GraduationCap,
  Heart,
  Lightbulb,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Target,
} from "lucide-react";
import { ALL_COURSES, courseAccent } from "@/lib/constants";
import { COURSES_DETAIL } from "@/lib/courses-data";
import { NeonButton } from "@/components/common/neon-button";
import { GlassCard } from "@/components/common/glass-card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = ALL_COURSES.find((c) => c.slug === slug);
  if (!course) return { title: "Curso no encontrado" };
  return {
    title: course.title,
    description: course.shortDescription,
  };
}

export function generateStaticParams() {
  return ALL_COURSES.map((course) => ({ slug: course.slug }));
}

const typeLabels = {
  empleo: "Empleo",
  freelance: "Freelance",
  emprendimiento: "Emprendimiento",
};

const typeColors = {
  empleo: "bg-neon-cyan/20 text-neon-cyan-bright",
  freelance: "bg-neon-green/20 text-neon-green",
  emprendimiento: "bg-secondary/20 text-neon-violet-bright",
};

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = ALL_COURSES.find((c) => c.slug === slug);
  const detail = COURSES_DETAIL[slug];

  if (!course) notFound();

  const accent = courseAccent(slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/cursos"
          className="text-sm text-foreground-secondary hover:text-white transition-colors"
        >
          &larr; Volver a cursos
        </Link>
      </div>

      {/* HEADER */}
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-10"
        style={{
          backgroundImage: `radial-gradient(120% 100% at 100% 0%, ${accent}14, transparent 55%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
        />
        <span className="text-xs text-foreground-muted">
          {course.durationMonths} meses &middot; {course.hoursPerWeek} hs/semana
        </span>

        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {course.title}
        </h1>

        <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
          {detail?.longDescription || course.shortDescription}
        </p>

        {/* Quick stats */}
        <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-4">
          {[
            { icon: Calendar, label: "Duración", value: `${course.durationMonths} meses` },
            { icon: Clock, label: "Dedicación", value: `${course.hoursPerWeek} hs/semana` },
            { icon: Users, label: "Modalidad", value: "100% online" },
            { icon: Award, label: "Certificado", value: "Oficial" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-xl border border-border bg-background-tertiary p-4"
            >
              <stat.icon className="h-5 w-5 shrink-0" style={{ color: accent }} />
              <div>
                <p className="text-xs text-foreground-muted">{stat.label}</p>
                <p className="font-semibold text-sm">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href={`/app/cursos/${slug}`}>
            <NeonButton size="lg" className="w-full sm:w-auto">
              Empezar curso gratis <ArrowRight className="ml-2 h-5 w-5" />
            </NeonButton>
          </Link>
        </div>
      </div>

      {detail && (
        <>
          {/* QUE VAS A APRENDER */}
          <section className="mt-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <GraduationCap className="h-6 w-6" style={{ color: accent }} />
              Qué vas a aprender
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {detail.whatYouLearn.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: accent }} />
                  <span className="text-sm text-foreground-secondary">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* PARA QUIEN + REQUISITOS */}
          <section className="mt-10 grid gap-6 sm:grid-cols-2">
            <GlassCard hover={false}>
              <Target className="h-6 w-6" style={{ color: accent }} />
              <h3 className="mt-3 text-lg font-semibold">Para quién es</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {detail.whoIsItFor}
              </p>
            </GlassCard>
            <GlassCard hover={false}>
              <Lightbulb className="h-6 w-6 text-secondary" />
              <h3 className="mt-3 text-lg font-semibold">Qué necesitás antes</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {detail.prerequisites}
              </p>
            </GlassCard>
          </section>

          {/* SALIDAS LABORALES */}
          <section className="mt-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <Briefcase className="h-6 w-6" style={{ color: accent }} />
              En qué podés trabajar al terminar
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {detail.jobOpportunities.map((job) => (
                <GlassCard key={job.title} className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-white">{job.title}</h3>
                    <Badge
                      className={cn("shrink-0 text-xs font-medium", typeColors[job.type])}
                      variant="secondary"
                    >
                      {typeLabels[job.type]}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <Zap className="h-4 w-4" style={{ color: accent }} />
                    <span className="text-sm font-medium" style={{ color: accent }}>
                      {job.highlight}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                    {job.description}
                  </p>
                </GlassCard>
              ))}
            </div>

            {/* Banner guia de empleabilidad */}
            <Link href="/empleabilidad">
              <div className="mt-6 group flex items-center gap-4 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-5 transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neon-cyan/20">
                  <ArrowUpRight className="h-5 w-5 text-neon-cyan" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white group-hover:text-neon-cyan-bright transition-colors">
                    Aprendé a conseguir estos trabajos
                  </p>
                  <p className="mt-1 text-sm text-foreground-secondary">
                    Guía gratuita: dónde buscar, cómo armar tu CV y cómo postularte.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-foreground-muted group-hover:text-neon-cyan transition-colors" />
              </div>
            </Link>
          </section>

          {/* PROYECTO FINAL */}
          <section className="mt-10">
            <div
              className="rounded-2xl border p-6 sm:p-8"
              style={{ borderColor: `${accent}33`, backgroundColor: `${accent}0d` }}
            >
              <h2 className="flex items-center gap-3 text-2xl font-bold">
                <Award className="h-6 w-6" style={{ color: accent }} />
                Proyecto final
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {detail.finalProject}
              </p>
              <p className="mt-4 text-sm text-foreground-muted">
                Al aprobarlo, recibís tu certificado oficial con código de
                verificación pública.
              </p>
            </div>
          </section>

          {/* MAS DETALLES (colapsable, para no saturar) */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold">Más detalles del curso</h2>
            <Accordion className="mt-4 space-y-3">
              <AccordionItem
                value="herramientas"
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:border-border-bright"
              >
                <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline">
                  <span className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" style={{ color: accent }} />
                    Herramientas que vas a usar
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {detail.freeTools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-lg border border-border bg-background-tertiary px-3 py-1.5 text-xs text-foreground-secondary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    {detail.paidTools.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs text-foreground-muted">
                          De pago (se mencionan, no son obligatorias):
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {detail.paidTools.map((tool) => (
                            <span
                              key={tool}
                              className="rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-xs text-foreground-muted"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="empleadores"
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:border-border-bright"
              >
                <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline">
                  <span className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-secondary" />
                    Lo que más valoran quienes contratan
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {detail.employerValues.map((value) => (
                      <div key={value.trait} className="flex items-start gap-3">
                        <Zap className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                        <div>
                          <h4 className="text-sm font-semibold text-white">
                            {value.trait}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="combina"
                className="rounded-xl border border-border bg-card px-6 data-[state=open]:border-border-bright"
              >
                <AccordionTrigger className="text-left text-base font-medium text-white hover:no-underline">
                  <span className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-neon-cyan" />
                    Combiná con estos cursos
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {detail.complementaryCourses.map((comp) => (
                      <Link key={comp.slug} href={`/cursos/${comp.slug}`}>
                        <div className="group h-full rounded-xl border border-border bg-background-tertiary p-4 transition-colors hover:border-neon-cyan/40">
                          <h3 className="font-semibold text-white group-hover:text-neon-cyan transition-colors">
                            {comp.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                            {comp.reason}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </>
      )}

      {/* CTA FINAL */}
      <section className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Tu futuro empieza con una decisión
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground-secondary leading-relaxed">
          Gratis, 100% online y con certificado oficial de la Provincia de La
          Rioja. Estudiás a tu ritmo, desde el celular o la computadora.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href={`/app/cursos/${slug}`}>
            <NeonButton size="lg">
              Empezar gratis <ArrowRight className="ml-2 h-5 w-5" />
            </NeonButton>
          </Link>
          <Link href="/cursos">
            <NeonButton variant="outline" size="lg">
              Ver otros cursos
            </NeonButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
