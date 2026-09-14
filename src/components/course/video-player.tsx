"use client";

import { PlayCircle, Clock, Film } from "lucide-react";

interface VideoPlayerProps {
  title: string;
  durationMin: number;
  videoUrl: string | null;
}

export function VideoPlayer({ title, durationMin, videoUrl }: VideoPlayerProps) {
  // Con URL real (ej. Bunny) mostramos el reproductor embebido.
  if (videoUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black">
        <iframe
          src={videoUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  // Sin video todavía: póster intencional (no un reproductor roto).
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-background-secondary via-card to-background-secondary" />
      {/* Grilla sutil de fondo */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-neon-green/30 bg-neon-green/10 sm:h-24 sm:w-24">
          <PlayCircle className="h-10 w-10 text-neon-green sm:h-12 sm:w-12" />
        </div>
        <p className="mt-4 max-w-md text-sm font-medium text-white sm:text-base">
          {title}
        </p>
        <div className="mt-2 flex items-center gap-3 text-xs text-foreground-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {durationMin} min
          </span>
          <span className="h-1 w-1 rounded-full bg-foreground-muted/40" />
          <span className="flex items-center gap-1">
            <Film className="h-3.5 w-3.5" />
            Video en preparación
          </span>
        </div>
      </div>
    </div>
  );
}
