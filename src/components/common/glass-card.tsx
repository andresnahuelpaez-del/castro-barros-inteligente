import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  neonBorder?: "green" | "violet" | "cyan" | "none";
}

export function GlassCard({
  className,
  hover = true,
  neonBorder = "none",
  children,
  ...props
}: GlassCardProps) {
  const borderGlow = {
    green: "hover:glow-green",
    violet: "hover:glow-violet",
    cyan: "hover:glow-cyan",
    none: "",
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6",
        hover && "transition-all duration-300 hover:border-border-bright hover:-translate-y-1",
        borderGlow[neonBorder],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
