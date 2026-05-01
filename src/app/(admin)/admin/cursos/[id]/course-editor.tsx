"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { NeonButton } from "@/components/common/neon-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  title: string;
  description: string | null;
  order: number;
  estimated_hours: number;
  lessons: {
    id: string;
    title: string;
    slug: string;
    order: number;
    video_url: string | null;
    video_duration_sec: number;
  }[];
}

interface CourseEditorProps {
  course: {
    id: string;
    title: string;
    slug: string;
    short_description: string | null;
    long_description: string | null;
    level: string;
    duration_months: number;
    published: boolean;
    category_id: string | null;
    thumbnail_url: string | null;
  };
  modules: Module[];
  categories: { id: string; name: string }[];
}

export function CourseEditor({ course, modules: initialModules, categories }: CourseEditorProps) {
  const router = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  // Course fields
  const [title, setTitle] = useState(course.title);
  const [slug, setSlug] = useState(course.slug);
  const [shortDesc, setShortDesc] = useState(course.short_description || "");
  const [longDesc, setLongDesc] = useState(course.long_description || "");
  const [level, setLevel] = useState(course.level);
  const [duration, setDuration] = useState(course.duration_months);
  const [published, setPublished] = useState(course.published);
  const [categoryId, setCategoryId] = useState(course.category_id || "");

  function toggleModule(moduleId: string) {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setSuccess(false);

    const { error } = await supabase
      .from("courses")
      .update({
        title,
        slug,
        short_description: shortDesc,
        long_description: longDesc,
        level,
        duration_months: duration,
        published,
        category_id: categoryId || null,
      })
      .eq("id", course.id);

    setSaving(false);
    if (!error) {
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  async function addModule() {
    const order = initialModules.length + 1;
    const { data, error } = await supabase
      .from("modules")
      .insert({
        course_id: course.id,
        title: `Modulo ${order}`,
        order,
        estimated_hours: 0,
      })
      .select()
      .single();

    if (!error && data) {
      router.refresh();
    }
  }

  async function deleteModule(moduleId: string) {
    await supabase.from("modules").delete().eq("id", moduleId);
    router.refresh();
  }

  async function addLesson(moduleId: string) {
    const mod = initialModules.find((m) => m.id === moduleId);
    const order = (mod?.lessons?.length || 0) + 1;

    await supabase.from("lessons").insert({
      module_id: moduleId,
      title: `Leccion ${order}`,
      slug: `leccion-${order}-${Date.now()}`,
      order,
      video_duration_sec: 0,
    });

    router.refresh();
  }

  async function deleteLesson(lessonId: string) {
    await supabase.from("lessons").delete().eq("id", lessonId);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      {/* Course info */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Informacion del curso</h2>
          <div className="flex items-center gap-3">
            {success && (
              <span className="text-sm text-neon-green">Guardado</span>
            )}
            <NeonButton size="sm" onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Guardando..." : "Guardar"}
            </NeonButton>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label>Titulo</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Slug (URL)</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Descripcion corta</Label>
            <Textarea
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="mt-1"
              rows={2}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Descripcion larga</Label>
            <Textarea
              value={longDesc}
              onChange={(e) => setLongDesc(e.target.value)}
              className="mt-1"
              rows={5}
            />
          </div>
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
            <Label>Duracion (meses)</Label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="mt-1"
              min={1}
            />
          </div>
          <div>
            <Label>Categoria</Label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background-tertiary px-3 py-2 text-sm text-white"
            >
              <option value="">Sin categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={published}
              onCheckedChange={setPublished}
            />
            <Label>
              {published ? (
                <span className="text-neon-green">Publicado</span>
              ) : (
                <span className="text-foreground-muted">Borrador</span>
              )}
            </Label>
          </div>
        </div>
      </div>

      {/* Modules and lessons */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Modulos y lecciones</h2>
          <NeonButton variant="outline" size="sm" onClick={addModule}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar modulo
          </NeonButton>
        </div>

        {initialModules.length > 0 ? (
          <div className="space-y-3">
            {initialModules.map((mod) => {
              const isExpanded = expandedModules.has(mod.id);
              const lessons = (mod.lessons || []).sort(
                (a, b) => a.order - b.order
              );

              return (
                <div
                  key={mod.id}
                  className="rounded-xl border border-border bg-background-secondary overflow-hidden"
                >
                  {/* Module header */}
                  <div className="flex items-center gap-3 p-4">
                    <GripVertical className="h-4 w-4 text-foreground-muted shrink-0 cursor-grab" />
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="flex items-center gap-2 flex-1 min-w-0 text-left"
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4 text-foreground-muted shrink-0" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-foreground-muted shrink-0" />
                      )}
                      <span className="font-medium text-white truncate">
                        {mod.title}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-background-tertiary text-foreground-muted shrink-0"
                      >
                        {lessons.length} lecciones
                      </Badge>
                    </button>
                    <button
                      onClick={() => deleteModule(mod.id)}
                      className="text-foreground-muted hover:text-destructive transition-colors shrink-0"
                      title="Eliminar modulo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Lessons list */}
                  {isExpanded && (
                    <div className="border-t border-border">
                      {lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center gap-3 border-b border-border px-4 py-3 last:border-b-0"
                        >
                          <GripVertical className="h-3.5 w-3.5 text-foreground-muted shrink-0 cursor-grab" />
                          <span className="text-sm text-foreground-secondary flex-1 truncate">
                            {lesson.title}
                          </span>
                          <span className="text-xs text-foreground-muted shrink-0">
                            {lesson.slug}
                          </span>
                          <button
                            onClick={() => deleteLesson(lesson.id)}
                            className="text-foreground-muted hover:text-destructive transition-colors shrink-0"
                            title="Eliminar leccion"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      <div className="p-3">
                        <button
                          onClick={() => addLesson(mod.id)}
                          className="flex items-center gap-2 text-sm text-foreground-muted hover:text-neon-green transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                          Agregar leccion
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-foreground-muted py-8">
            No hay modulos todavia. Agrega el primero.
          </p>
        )}
      </div>
    </div>
  );
}
