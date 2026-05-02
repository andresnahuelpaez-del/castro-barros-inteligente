"use client";

import { cn } from "@/lib/utils";

interface SectionDividerProps {
  color?: "green" | "violet" | "cyan" | "mixed";
  className?: string;
}

export function SectionDivider({ color = "green", className }: SectionDividerProps) {
  const gradients: Record<string, string> = {
    green: "from-transparent via-neon-green/20 to-transparent",
    violet: "from-transparent via-secondary/20 to-transparent",
    cyan: "from-transparent via-neon-cyan/20 to-transparent",
    mixed: "from-neon-green/10 via-secondary/20 to-neon-cyan/10",
  };

  return (
    <div className={cn("mx-auto max-w-5xl px-4", className)}>
      <div className={cn("h-px bg-gradient-to-r", gradients[color])} />
    </div>
  );
}
