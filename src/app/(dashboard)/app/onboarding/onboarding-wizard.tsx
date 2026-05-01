"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { NeonButton } from "@/components/common/neon-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GENDERS = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "no_binario", label: "No binario" },
  { value: "prefiero_no_decir", label: "Prefiero no decir" },
];

const LOCALIDADES = [
  "Aminga",
  "Anillaco",
  "Anjullon",
  "Chuquis",
  "Las Penas",
  "Pinchas",
  "San Pedro",
  "Otra",
];

const NIVELES_EDUCATIVOS = [
  { value: "primario_incompleto", label: "Primario incompleto" },
  { value: "primario_completo", label: "Primario completo" },
  { value: "secundario_incompleto", label: "Secundario incompleto" },
  { value: "secundario_completo", label: "Secundario completo" },
  { value: "terciario_universitario", label: "Terciario / Universitario" },
  { value: "posgrado", label: "Posgrado" },
];

const SITUACIONES_LABORALES = [
  { value: "estudia", label: "Estudio" },
  { value: "trabaja", label: "Trabajo" },
  { value: "estudia_y_trabaja", label: "Estudio y trabajo" },
  { value: "desempleado", label: "Desempleado/a" },
  { value: "jubilado", label: "Jubilado/a" },
  { value: "otro", label: "Otro" },
];

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Step 1
  const [fullName, setFullName] = useState("");
  const [dni, setDni] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");

  // Step 2
  const [localidad, setLocalidad] = useState("");

  // Step 3
  const [nivelEducativo, setNivelEducativo] = useState("");
  const [situacionLaboral, setSituacionLaboral] = useState("");

  // Step 4
  const [motivacion, setMotivacion] = useState("");

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  async function handleFinish() {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("No se pudo verificar tu sesion. Intenta recargar la pagina.");
      setLoading(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        dni,
        birthdate: birthdate || null,
        gender: gender || null,
        localidad: localidad || null,
        nivel_educativo: nivelEducativo || null,
        situacion_laboral: situacionLaboral || null,
        motivacion: motivacion || null,
        onboarding_completed: true,
      })
      .eq("id", user.id);

    if (updateError) {
      setError("Error al guardar tus datos. Intenta de nuevo.");
      setLoading(false);
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <div className="mb-6">
        <p className="text-xs text-foreground-muted">
          Paso {step} de {totalSteps}
        </p>
        <Progress value={progress} className="mt-2 h-2" />
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Datos personales</h2>
          <p className="text-sm text-foreground-secondary">
            Necesitamos estos datos para tu certificado oficial.
          </p>
          <div>
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Juan Perez"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dni">DNI</Label>
            <Input
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
              placeholder="12345678"
              maxLength={8}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="birthdate">Fecha de nacimiento</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Genero</Label>
            <Select value={gender} onValueChange={(v) => v && setGender(v)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                {GENDERS.map((g) => (
                  <SelectItem key={g.value} value={g.value}>
                    {g.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <NeonButton
            className="w-full"
            onClick={() => setStep(2)}
            disabled={!fullName || !dni}
          >
            Siguiente
          </NeonButton>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Tu localidad</h2>
          <p className="text-sm text-foreground-secondary">
            En que localidad del Departamento Castro Barros vivis?
          </p>
          <div>
            <Label>Localidad</Label>
            <Select value={localidad} onValueChange={(v) => v && setLocalidad(v)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona tu localidad" />
              </SelectTrigger>
              <SelectContent>
                {LOCALIDADES.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <NeonButton
              variant="outline"
              className="flex-1"
              onClick={() => setStep(1)}
            >
              Anterior
            </NeonButton>
            <NeonButton
              className="flex-1"
              onClick={() => setStep(3)}
              disabled={!localidad}
            >
              Siguiente
            </NeonButton>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            Contexto educativo y laboral
          </h2>
          <div>
            <Label>Nivel educativo mas alto alcanzado</Label>
            <Select value={nivelEducativo} onValueChange={(v) => v && setNivelEducativo(v)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                {NIVELES_EDUCATIVOS.map((n) => (
                  <SelectItem key={n.value} value={n.value}>
                    {n.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Situacion laboral actual</Label>
            <Select
              value={situacionLaboral}
              onValueChange={(v) => v && setSituacionLaboral(v)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                {SITUACIONES_LABORALES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <NeonButton
              variant="outline"
              className="flex-1"
              onClick={() => setStep(2)}
            >
              Anterior
            </NeonButton>
            <NeonButton className="flex-1" onClick={() => setStep(4)}>
              Siguiente
            </NeonButton>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Motivacion</h2>
          <p className="text-sm text-foreground-secondary">
            Opcional pero nos ayuda a mejorar la plataforma.
          </p>
          <div>
            <Label htmlFor="motivacion">
              Que te motivo a inscribirte? (opcional)
            </Label>
            <Textarea
              id="motivacion"
              value={motivacion}
              onChange={(e) => setMotivacion(e.target.value)}
              placeholder="Contanos brevemente..."
              rows={4}
              className="mt-1"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-3">
            <NeonButton
              variant="outline"
              className="flex-1"
              onClick={() => setStep(3)}
            >
              Anterior
            </NeonButton>
            <NeonButton
              className="flex-1"
              onClick={handleFinish}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Finalizar"}
            </NeonButton>
          </div>
        </div>
      )}
    </div>
  );
}
