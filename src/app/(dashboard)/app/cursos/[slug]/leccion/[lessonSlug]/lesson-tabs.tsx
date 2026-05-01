"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NeonButton } from "@/components/common/neon-button";
import { PlayCircle, BookOpen, Dumbbell, CheckCircle2 } from "lucide-react";

interface LessonTabsProps {
  lessonId: string;
  enrollmentId: string;
  videoUrl: string | null;
  videoDuration: number;
  contentMd: string | null;
  exerciseMd: string | null;
  lastPosition: number;
  isCompleted: boolean;
}

export function LessonTabs({
  lessonId,
  enrollmentId,
  videoUrl,
  videoDuration,
  contentMd,
  exerciseMd,
  lastPosition,
  isCompleted: initialCompleted,
}: LessonTabsProps) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [marking, setMarking] = useState(false);
  const supabase = createClient();

  const markAsCompleted = useCallback(async () => {
    setMarking(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    // Upsert lesson_progress
    await supabase.from("lesson_progress").upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        enrollment_id: enrollmentId,
        completed_at: new Date().toISOString(),
        watch_time_sec: videoDuration,
        last_position_sec: videoDuration,
      },
      { onConflict: "user_id,lesson_id" }
    );

    // Update enrollment last activity
    await supabase
      .from("enrollments")
      .update({
        last_lesson_id: lessonId,
        last_activity_at: new Date().toISOString(),
      })
      .eq("id", enrollmentId);

    setCompleted(true);
    setMarking(false);
  }, [supabase, lessonId, enrollmentId, videoDuration]);

  return (
    <div>
      <Tabs defaultValue={videoUrl ? "video" : "lectura"}>
        <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none p-0 h-auto">
          {videoUrl && (
            <TabsTrigger
              value="video"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm data-[state=active]:border-neon-green data-[state=active]:text-neon-green data-[state=active]:shadow-none"
            >
              <PlayCircle className="mr-2 h-4 w-4" />
              Video
            </TabsTrigger>
          )}
          {contentMd && (
            <TabsTrigger
              value="lectura"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm data-[state=active]:border-neon-green data-[state=active]:text-neon-green data-[state=active]:shadow-none"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Lectura
            </TabsTrigger>
          )}
          {exerciseMd && (
            <TabsTrigger
              value="ejercicio"
              className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm data-[state=active]:border-neon-green data-[state=active]:text-neon-green data-[state=active]:shadow-none"
            >
              <Dumbbell className="mr-2 h-4 w-4" />
              Ejercicio
            </TabsTrigger>
          )}
        </TabsList>

        {videoUrl && (
          <TabsContent value="video" className="mt-6">
            <div className="aspect-video rounded-xl border border-border bg-background-secondary overflow-hidden">
              {/* TODO: Integrar Bunny.net player con tracking */}
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <PlayCircle className="mx-auto h-16 w-16 text-foreground-muted" />
                  <p className="mt-4 text-foreground-secondary">
                    Video player — Bunny.net
                  </p>
                  <p className="mt-1 text-xs text-foreground-muted">
                    Duracion: {Math.ceil(videoDuration / 60)} min
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}

        {contentMd && (
          <TabsContent value="lectura" className="mt-6">
            <div className="prose prose-invert max-w-none rounded-xl border border-border bg-card p-6 sm:p-8">
              {/* TODO: Renderizar markdown con rehype-pretty-code */}
              <div
                className="text-sm leading-relaxed text-foreground-secondary whitespace-pre-wrap"
              >
                {contentMd}
              </div>
            </div>
          </TabsContent>
        )}

        {exerciseMd && (
          <TabsContent value="ejercicio" className="mt-6">
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              <div className="text-sm leading-relaxed text-foreground-secondary whitespace-pre-wrap">
                {exerciseMd}
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>

      {/* Mark as completed */}
      <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-card p-4">
        {completed ? (
          <span className="flex items-center gap-2 text-sm font-medium text-neon-green">
            <CheckCircle2 className="h-5 w-5" />
            Leccion completada
          </span>
        ) : (
          <>
            <p className="text-sm text-foreground-secondary">
              Terminaste con esta leccion?
            </p>
            <NeonButton size="sm" onClick={markAsCompleted} disabled={marking}>
              {marking ? "Guardando..." : "Marcar como completada"}
            </NeonButton>
          </>
        )}
      </div>
    </div>
  );
}
