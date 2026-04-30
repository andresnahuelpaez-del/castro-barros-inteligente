import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, Users, Award, ArrowRight } from "lucide-react";
import { COURSES, LEVEL_LABELS, LEVEL_COLORS } from "@/lib/constants";
import { NeonButton } from "@/components/common/neon-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);

  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-4">
        <Link
          href="/cursos"
          className="text-sm text-foreground-secondary hover:text-white"
        >
          &larr; Volver a cursos
        </Link>
      </div>

      <Badge
        className={cn("mb-4 text-xs font-medium", LEVEL_COLORS[course.level])}
        variant="secondary"
      >
        {LEVEL_LABELS[course.level]}
      </Badge>

      <h1 className="text-4xl font-bold sm:text-5xl">{course.title}</h1>
      <p className="mt-4 text-lg text-foreground-secondary">
        {course.shortDescription}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Calendar className="h-5 w-5 text-neon-green" />
          <div>
            <p className="text-xs text-foreground-muted">Duracion</p>
            <p className="font-semibold">{course.durationMonths} meses</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Clock className="h-5 w-5 text-neon-green" />
          <div>
            <p className="text-xs text-foreground-muted">Dedicacion</p>
            <p className="font-semibold">{course.hoursPerWeek} hs/semana</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Users className="h-5 w-5 text-neon-green" />
          <div>
            <p className="text-xs text-foreground-muted">Modalidad</p>
            <p className="font-semibold">100% online</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Award className="h-5 w-5 text-neon-green" />
          <div>
            <p className="text-xs text-foreground-muted">Certificacion</p>
            <p className="font-semibold">Oficial</p>
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-8">
        <h2 className="text-2xl font-bold">Sobre este curso</h2>
        <p className="mt-4 leading-relaxed text-foreground-secondary">
          {course.shortDescription} Este programa esta disenado para que
          cualquier persona pueda adquirir habilidades profesionales reales,
          aplicables de inmediato en el mercado laboral, ya sea como empleado,
          freelancer o emprendedor.
        </p>

        <h3 className="mt-8 text-lg font-semibold">Promesa al alumno</h3>
        <p className="mt-2 text-foreground-secondary">
          Capacitacion digital profesional, gratuita y certificada. Estudias
          desde tu celular o computadora, organizas tus horarios segun tu
          disponibilidad, y al completar el curso obtenes un certificado oficial
          del Departamento Castro Barros con codigo de verificacion publica.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link href="/registro">
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
    </div>
  );
}
