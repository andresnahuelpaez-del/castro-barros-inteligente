"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NeonButton } from "@/components/common/neon-button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Clock, Star } from "lucide-react";

interface EnrollDialogProps {
  courseId: string;
  courseTitle: string;
  courseDuration: string;
  courseSlug: string;
  children: React.ReactNode;
}

export function EnrollDialog({
  courseId,
  courseTitle,
  courseDuration,
  courseSlug,
  children,
}: EnrollDialogProps) {
  const [open, setOpen] = useState(false);
  const [hoursPerWeek, setHoursPerWeek] = useState(8);
  const [priorKnowledge, setPriorKnowledge] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleEnroll() {
    if (!accepted) return;
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error: enrollError } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: courseId,
      hours_per_week_target: hoursPerWeek,
      prior_knowledge: priorKnowledge,
      status: "active",
    });

    if (enrollError) {
      if (enrollError.code === "23505") {
        setError("Ya estás inscripto en este curso.");
      } else {
        setError("Error al inscribirte. Intentá de nuevo.");
      }
      setLoading(false);
      return;
    }

    setOpen(false);
    router.push(`/app/cursos/${courseSlug}`);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children as React.ReactElement} />
      <DialogContent className="border-border bg-card sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            Inscribirme a {courseTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Resumen */}
          <div className="rounded-xl border border-border bg-background-tertiary p-4">
            <p className="text-sm text-foreground-secondary">
              <span className="font-medium text-white">{courseTitle}</span>
              <br />
              Duración estimada: {courseDuration} &middot; 100% gratuito &middot;
              Certificación oficial
            </p>
          </div>

          {/* Horas por semana */}
          <div>
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-neon-green" />
              ¿Cuántas horas por semana podés dedicarle?
            </Label>
            <div className="mt-3 px-1">
              <Slider
                value={[hoursPerWeek]}
                onValueChange={(v) => setHoursPerWeek(Array.isArray(v) ? v[0] : v)}
                min={2}
                max={20}
                step={1}
              />
              <div className="mt-2 flex justify-between text-xs text-foreground-muted">
                <span>2 hs</span>
                <span className="text-sm font-medium text-neon-green">
                  {hoursPerWeek} horas/semana
                </span>
                <span>20 hs</span>
              </div>
            </div>
          </div>

          {/* Conocimiento previo */}
          <div>
            <Label className="flex items-center gap-2">
              <Star className="h-4 w-4 text-secondary" />
              Tu nivel de conocimiento previo del tema
            </Label>
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setPriorKnowledge(level)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium transition-all ${
                    priorKnowledge >= level
                      ? "border-secondary bg-secondary/20 text-secondary"
                      : "border-border bg-background-tertiary text-foreground-muted hover:border-border-bright"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <p className="mt-1 text-xs text-foreground-muted">
              1 = ninguno, 5 = avanzado
            </p>
          </div>

          {/* Aceptar terminos */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={accepted}
              onCheckedChange={(v) => setAccepted(v === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-foreground-secondary leading-relaxed cursor-pointer"
            >
              Acepto los términos del programa de capacitación gratuita del
              Departamento Castro Barros y me comprometo a mantener un ritmo de
              estudio constante.
            </label>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <NeonButton
            className="w-full"
            onClick={handleEnroll}
            disabled={!accepted || loading}
          >
            {loading ? "Inscribiendo..." : "Confirmar inscripción"}
            {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
          </NeonButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
