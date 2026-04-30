"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "subtle" | "medium" | "strong";
}

export function AuroraBackground({
  className,
  intensity = "subtle",
  children,
  ...props
}: AuroraBackgroundProps) {
  const opacityMap = {
    subtle: "opacity-20",
    medium: "opacity-30",
    strong: "opacity-40",
  };

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          opacityMap[intensity]
        )}
        aria-hidden="true"
      >
        <div className="absolute -top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-neon-violet blur-[120px]" />
        <div className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-neon-cyan blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-neon-green blur-[120px]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
