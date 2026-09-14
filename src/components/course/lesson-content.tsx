import { FileText, Lightbulb, Check, Download } from "lucide-react";
import type { ContentBlock } from "@/lib/mock-course-data";

interface LessonContentProps {
  blocks: ContentBlock[];
  lessonTitle: string;
}

export function LessonContent({ blocks, lessonTitle }: LessonContentProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
      <div className="mb-5 flex items-center gap-2">
        <FileText className="h-5 w-5 text-neon-green" />
        <h2 className="text-lg font-semibold text-white">Material de la lección</h2>
      </div>

      <div className="space-y-5">
        {blocks.map((block, i) => {
          if (block.type === "heading") {
            return (
              <h3
                key={i}
                className="pt-1 text-base font-semibold text-white sm:text-lg"
              >
                {block.text}
              </h3>
            );
          }
          if (block.type === "paragraph") {
            return (
              <p
                key={i}
                className="text-sm leading-relaxed text-foreground-secondary sm:text-[15px]"
              >
                {block.text}
              </p>
            );
          }
          if (block.type === "list") {
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon-green/15">
                      <Check className="h-3 w-3 text-neon-green" />
                    </span>
                    <span className="text-sm leading-relaxed text-foreground-secondary">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            );
          }
          // tip
          return (
            <div
              key={i}
              className="flex gap-3 rounded-xl border border-secondary/25 bg-secondary/5 p-4"
            >
              <Lightbulb className="h-5 w-5 shrink-0 text-secondary" />
              <p className="text-sm leading-relaxed text-foreground-secondary">
                {block.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recursos descargables */}
      <div className="mt-7 rounded-xl border border-border bg-background-secondary p-4">
        <h4 className="mb-3 text-sm font-medium text-white">Recursos descargables</h4>
        <div className="space-y-2">
          {[
            { name: `Guía práctica - ${lessonTitle}.pdf`, size: "2.4 MB" },
            { name: "Plantilla de ejercicios.xlsx", size: "856 KB" },
          ].map((res) => (
            <div
              key={res.name}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-sm"
            >
              <Download className="h-4 w-4 shrink-0 text-neon-green" />
              <span className="flex-1 truncate text-foreground-secondary">
                {res.name}
              </span>
              <span className="shrink-0 text-xs text-foreground-muted">{res.size}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
