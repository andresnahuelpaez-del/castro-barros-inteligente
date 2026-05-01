"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { NeonButton } from "@/components/common/neon-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2 } from "lucide-react";

const GENDERS = [
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
  { value: "no_binario", label: "No binario" },
  { value: "prefiero_no_decir", label: "Prefiero no decir" },
];

const LOCALIDADES = [
  "Aminga", "Anillaco", "Anjullon", "Chuquis",
  "Las Penas", "Pinchas", "San Pedro", "Otra",
];

const NIVELES = [
  { value: "primario_incompleto", label: "Primario incompleto" },
  { value: "primario_completo", label: "Primario completo" },
  { value: "secundario_incompleto", label: "Secundario incompleto" },
  { value: "secundario_completo", label: "Secundario completo" },
  { value: "terciario_universitario", label: "Terciario / Universitario" },
  { value: "posgrado", label: "Posgrado" },
];

const SITUACIONES = [
  { value: "estudia", label: "Estudio" },
  { value: "trabaja", label: "Trabajo" },
  { value: "estudia_y_trabaja", label: "Estudio y trabajo" },
  { value: "desempleado", label: "Desempleado/a" },
  { value: "jubilado", label: "Jubilado/a" },
  { value: "otro", label: "Otro" },
];

export function ProfileForm() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [dni, setDni] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [nivelEducativo, setNivelEducativo] = useState("");
  const [situacionLaboral, setSituacionLaboral] = useState("");
  const [phone, setPhone] = useState("");
  const [motivacion, setMotivacion] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setFullName(data.full_name || "");
        setDni(data.dni || "");
        setBirthdate(data.birthdate || "");
        setGender(data.gender || "");
        setLocalidad(data.localidad || "");
        setNivelEducativo(data.nivel_educativo || "");
        setSituacionLaboral(data.situacion_laboral || "");
        setPhone(data.phone || "");
        setMotivacion(data.motivacion || "");
      }
      setLoading(false);
    }
    loadProfile();
  }, [supabase]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("No se pudo verificar tu sesion.");
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName || null,
        dni: dni || null,
        birthdate: birthdate || null,
        gender: gender || null,
        localidad: localidad || null,
        nivel_educativo: nivelEducativo || null,
        situacion_laboral: situacionLaboral || null,
        phone: phone || null,
        motivacion: motivacion || null,
      })
      .eq("id", user.id);

    if (updateError) {
      setError("Error al guardar. Intenta de nuevo.");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8">
        <p className="text-foreground-secondary">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSave}
      className="space-y-8 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      {/* Datos personales */}
      <div>
        <h2 className="text-lg font-semibold text-white">Datos personales</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dni">DNI</Label>
            <Input
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))}
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
          <div>
            <Label htmlFor="phone">Telefono (opcional)</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+54 ..."
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Ubicacion */}
      <div>
        <h2 className="text-lg font-semibold text-white">Ubicacion</h2>
        <div className="mt-4">
          <Label>Localidad</Label>
          <Select value={localidad} onValueChange={(v) => v && setLocalidad(v)}>
            <SelectTrigger className="mt-1 max-w-sm">
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
      </div>

      {/* Contexto */}
      <div>
        <h2 className="text-lg font-semibold text-white">
          Contexto educativo y laboral
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Nivel educativo</Label>
            <Select
              value={nivelEducativo}
              onValueChange={(v) => v && setNivelEducativo(v)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                {NIVELES.map((n) => (
                  <SelectItem key={n.value} value={n.value}>
                    {n.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Situacion laboral</Label>
            <Select
              value={situacionLaboral}
              onValueChange={(v) => v && setSituacionLaboral(v)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                {SITUACIONES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Motivacion */}
      <div>
        <Label htmlFor="motivacion">Motivacion (opcional)</Label>
        <Textarea
          id="motivacion"
          value={motivacion}
          onChange={(e) => setMotivacion(e.target.value)}
          placeholder="Que te motivo a inscribirte?"
          rows={3}
          className="mt-1"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex items-center gap-4">
        <NeonButton type="submit" disabled={saving}>
          {saving ? "Guardando..." : "Guardar cambios"}
        </NeonButton>
        {saved && (
          <span className="flex items-center gap-2 text-sm text-neon-green">
            <CheckCircle2 className="h-4 w-4" />
            Guardado
          </span>
        )}
      </div>
    </form>
  );
}
