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
  DollarSign,
  Wrench,
  GraduationCap,
  Heart,
  Lightbulb,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Target,
} from "lucide-react";
import { COURSES, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/constants";
import { COURSES_DETAIL } from "@/lib/courses-data";
import { NeonButton } from "@/components/common/neon-button";
import { GlassCard } from "@/components/common/glass-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) return { title: "Curso no encontrado" };
  return {
    title: course.title,
    description: course.shortDescription,
  };
}

export function generateStaticParams() {
  return COURSES.map((course) => ({ slug: course.slug }));
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
  const course = COURSES.find((c) => c.slug === slug);
  const detail = COURSES_DETAIL[slug];

  if (!course) notFound();

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

      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge
            className={cn(
              "text-xs font-medium",
              LEVEL_COLORS[course.level]
            )}
            variant="secondary"
          >
            {LEVEL_LABELS[course.level]}
          </Badge>
          <span className="text-xs text-foreground-muted">
            {course.durationMonths} meses &middot; {course.hoursPerWeek}{" "}
            hs/semana
          </span>
        </div>

        <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          {course.title}
        </h1>

        <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
          {detail?.longDescription || course.shortDescription}
        </p>

        {/* Quick stats */}
        <div className="mt-8 grid gap-3 grid-cols-2 sm:grid-cols-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background-tertiary p-4">
            <Calendar className="h-5 w-5 shrink-0 text-neon-green" />
            <div>
              <p className="text-xs text-foreground-muted">Duracion</p>
              <p className="font-semibold text-sm">
                {course.durationMonths} meses
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background-tertiary p-4">
            <Clock className="h-5 w-5 shrink-0 text-neon-green" />
            <div>
              <p className="text-xs text-foreground-muted">Dedicacion</p>
              <p className="font-semibold text-sm">
                {course.hoursPerWeek} hs/semana
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background-tertiary p-4">
            <Users className="h-5 w-5 shrink-0 text-neon-green" />
            <div>
              <p className="text-xs text-foreground-muted">Modalidad</p>
              <p className="font-semibold text-sm">100% online</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background-tertiary p-4">
            <Award className="h-5 w-5 shrink-0 text-neon-green" />
            <div>
              <p className="text-xs text-foreground-muted">Certificado</p>
              <p className="font-semibold text-sm">Oficial</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={`/app/cursos/${slug}`}>
            <NeonButton size="lg" className="w-full sm:w-auto">
              Empezar curso gratis <ArrowRight className="ml-2 h-5 w-5" />
            </NeonButton>
          </Link>
        </div>
      </div>

      {detail && (
        <>
          {/* ============================================ */}
          {/* QUE VAS A APRENDER */}
          {/* ============================================ */}
          <section className="mt-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <GraduationCap className="h-6 w-6 text-neon-green" />
              Que vas a aprender
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {detail.whatYouLearn.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-neon-green" />
                  <span className="text-sm text-foreground-secondary">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================ */}
          {/* PARA QUIEN ES + REQUISITOS */}
          {/* ============================================ */}
          <section className="mt-10 grid gap-6 sm:grid-cols-2">
            <GlassCard hover={false}>
              <Target className="h-6 w-6 text-neon-green" />
              <h3 className="mt-3 text-lg font-semibold">Para quien es</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {detail.whoIsItFor}
              </p>
            </GlassCard>
            <GlassCard hover={false}>
              <Lightbulb className="h-6 w-6 text-secondary" />
              <h3 className="mt-3 text-lg font-semibold">
                Que necesitas antes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">
                {detail.prerequisites}
              </p>
            </GlassCard>
          </section>

          {/* ============================================ */}
          {/* SALIDAS LABORALES */}
          {/* ============================================ */}
          <section className="mt-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <Briefcase className="h-6 w-6 text-neon-green" />
              En que podes trabajar al terminar
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Oportunidades reales a las que podes aplicar con las habilidades de
              este curso.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {detail.jobOpportunities.map((job) => (
                <GlassCard key={job.title} neonBorder="green" className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-white">{job.title}</h3>
                    <Badge
                      className={cn(
                        "shrink-0 text-xs font-medium",
                        typeColors[job.type]
                      )}
                      variant="secondary"
                    >
                      {typeLabels[job.type]}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-neon-green" />
                    <span className="text-sm font-medium text-neon-green">
                      {job.salaryRange}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                    {job.description}
                  </p>
                </GlassCard>
              ))}
            </div>

            {/* Banner guia de empleabilidad */}
            <Link href="/cursos">
              <div className="mt-6 group flex items-center gap-4 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-5 transition-all hover:border-neon-cyan/40 hover:bg-neon-cyan/10">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neon-cyan/20">
                  <ArrowUpRight className="h-5 w-5 text-neon-cyan" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white group-hover:text-neon-cyan-bright transition-colors">
                    Aprende a conseguir estos trabajos
                  </p>
                  <p className="mt-1 text-sm text-foreground-secondary">
                    Tenemos una guia completa y gratuita con plataformas,
                    estrategias de postulacion y como armar tu perfil
                    profesional. Registrate para acceder.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-foreground-muted group-hover:text-neon-cyan transition-colors" />
              </div>
            </Link>
          </section>

          {/* ============================================ */}
          {/* LO QUE VALORAN LOS EMPLEADORES */}
          {/* ============================================ */}
          <section className="mt-10">
            <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold">
                <Heart className="h-6 w-6 text-secondary" />
                Lo que mas valoran quienes contratan
              </h2>
              <p className="mt-2 text-sm text-foreground-muted">
                Mas alla de las herramientas, estas son las cualidades que hacen
                que alguien destaque profesionalmente. La buena noticia: todas se
                pueden desarrollar.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {detail.employerValues.map((value) => (
                  <div key={value.trait} className="flex items-start gap-3">
                    <Zap className="mt-1 h-5 w-5 shrink-0 text-secondary" />
                    <div>
                      <h4 className="font-semibold text-white">
                        {value.trait}
                      </h4>
                      <p className="mt-1 text-sm leading-relaxed text-foreground-secondary">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================ */}
          {/* COMBINA CON ESTOS CURSOS */}
          {/* ============================================ */}
          <section className="mt-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <ArrowUpRight className="h-6 w-6 text-neon-cyan" />
              Potencia tu perfil: combina con estos cursos
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Hacer mas de un curso multiplica tus oportunidades. Estas son las
              combinaciones que mas te convienen.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {detail.complementaryCourses.map((comp) => {
                const compCourse = COURSES.find((c) => c.slug === comp.slug);
                return (
                  <Link key={comp.slug} href={`/cursos/${comp.slug}`}>
                    <GlassCard
                      neonBorder="cyan"
                      className="group h-full"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white group-hover:text-neon-cyan transition-colors">
                          {comp.title}
                        </h3>
                        {compCourse && (
                          <Badge
                            className={cn(
                              "text-xs font-medium",
                              LEVEL_COLORS[compCourse.level]
                            )}
                            variant="secondary"
                          >
                            {LEVEL_LABELS[compCourse.level]}
                          </Badge>
                        )}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                        {comp.reason}
                      </p>
                      <p className="mt-3 text-sm font-medium text-neon-cyan opacity-0 transition-opacity group-hover:opacity-100">
                        Ver este curso &rarr;
                      </p>
                    </GlassCard>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ============================================ */}
          {/* HERRAMIENTAS */}
          {/* ============================================ */}
          <section className="mt-10">
            <h2 className="flex items-center gap-3 text-2xl font-bold">
              <Wrench className="h-6 w-6 text-neon-green" />
              Herramientas que vas a usar
            </h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-neon-green">
                  Gratuitas (las que usas durante el curso)
                </h3>
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
              </div>
              {detail.paidTools.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-foreground-muted">
                    De pago (se mencionan, no son obligatorias)
                  </h3>
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
          </section>

          {/* ============================================ */}
          {/* PROYECTO FINAL */}
          {/* ============================================ */}
          <section className="mt-10">
            <div className="rounded-2xl border border-neon-green/20 bg-neon-green/5 p-6 sm:p-8">
              <h2 className="flex items-center gap-3 text-2xl font-bold">
                <Award className="h-6 w-6 text-neon-green" />
                Proyecto final
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground-secondary">
                {detail.finalProject}
              </p>
              <p className="mt-4 text-sm text-foreground-muted">
                Al aprobar el proyecto final y todos los quizzes, recibis tu
                certificado oficial con codigo de verificacion publica.
              </p>
            </div>
          </section>
        </>
      )}

      {/* ============================================ */}
      {/* PROMESA + CTA FINAL */}
      {/* ============================================ */}
      <section className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-10 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">
          Tu futuro empieza con una decision
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-foreground-secondary leading-relaxed">
          Capacitacion digital profesional, gratuita y certificada. Estudias
          desde tu celular o computadora, organizas tus horarios segun tu
          disponibilidad, y al completar el curso obtenes un certificado oficial
          del Departamento Castro Barros con codigo de verificacion publica.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/cursos">
            <NeonButton size="lg">
              Inscribite gratis <ArrowRight className="ml-2 h-5 w-5" />
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
