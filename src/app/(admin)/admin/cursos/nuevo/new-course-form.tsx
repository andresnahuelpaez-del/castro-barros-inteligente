"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { NeonButton } from "@/components/common/neon-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

export function NewCourseForm() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [level, setLevel] = useState("beginner");
  const [duration, setDuration] = useState(3);

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  async function handleCreate() {
    if (!title.trim() || !slug.trim()) {
      setError("El titulo y slug son obligatorios.");
      return;
    }

    setLoading(true);
    setError(null);

    const { data, error: insertError } = await supabase
      .from("courses")
      .insert({
        title,
        slug,
        short_description: shortDesc || null,
        level,
        duration_months: duration,
        published: false,
      })
      .select("id")
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        setError("Ya existe un curso con ese slug.");
      } else {
        setError("Error al crear el curso. Intenta de nuevo.");
      }
      setLoading(false);
      return;
    }

    router.push(`/admin/cursos/${data.id}`);
  }

  return (
    <div className="max-w-2xl rounded-xl border border-border bg-card p-6 space-y-6">
      <div>
        <Label>Titulo del curso</Label>
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSlug(generateSlug(e.target.value));
          }}
          placeholder="Ej: Marketing Digital con IA"
          className="mt-1"
        />
      </div>

      <div>
        <Label>Slug (URL)</Label>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="marketing-digital-con-ia"
          className="mt-1"
        />
        <p className="mt-1 text-xs text-foreground-muted">
          URL: /cursos/{slug || "..."}
        </p>
      </div>

      <div>
        <Label>Descripcion corta</Label>
        <Textarea
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          placeholder="Una breve descripcion del curso..."
          className="mt-1"
          rows={3}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label>Nivel</Label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-background-tertiary px-3 py-2 text-sm text-white"
          >
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>
        <div>
          <Label>Duracion estimada (meses)</Label>
          <Input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="mt-1"
            min={1}
          />
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <NeonButton
        className="w-full"
        onClick={handleCreate}
        disabled={loading}
      >
        {loading ? "Creando..." : "Crear curso"}
        {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
      </NeonButton>
    </div>
  );
}
