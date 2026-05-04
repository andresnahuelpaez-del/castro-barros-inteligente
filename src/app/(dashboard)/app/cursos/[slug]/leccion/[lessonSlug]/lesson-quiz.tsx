"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export function LessonQuiz({ questions }: { questions: Question[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctCount = questions.filter(
    (q, i) => answers[i] === q.correctIndex
  ).length;
  const allCorrect = correctCount === questions.length;
  const allAnswered = Object.keys(answers).length === questions.length;

  function handleSelect(questionIndex: number, optionIndex: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  }

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="space-y-6">
      {questions.map((q, qi) => (
        <div key={qi} className="space-y-3">
          <p className="text-sm font-medium text-white">
            {qi + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((option, oi) => {
              const isSelected = answers[qi] === oi;
              const isCorrect = q.correctIndex === oi;

              let styles =
                "border-border bg-background-secondary text-foreground-secondary hover:border-foreground-muted";
              if (submitted && isSelected && isCorrect) {
                styles =
                  "border-neon-green bg-neon-green/10 text-neon-green";
              } else if (submitted && isSelected && !isCorrect) {
                styles =
                  "border-red-500/50 bg-red-500/10 text-red-400";
              } else if (submitted && isCorrect) {
                styles =
                  "border-neon-green/30 bg-neon-green/5 text-foreground-secondary";
              } else if (isSelected) {
                styles =
                  "border-neon-green/50 bg-neon-green/5 text-white";
              }

              return (
                <button
                  key={oi}
                  onClick={() => handleSelect(qi, oi)}
                  disabled={submitted}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                    styles,
                    !submitted && "cursor-pointer"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                      isSelected && !submitted
                        ? "border-neon-green bg-neon-green text-black"
                        : submitted && isSelected && isCorrect
                          ? "border-neon-green bg-neon-green text-black"
                          : submitted && isSelected && !isCorrect
                            ? "border-red-500 bg-red-500 text-white"
                            : "border-foreground-muted/30 text-foreground-muted"
                    )}
                  >
                    {String.fromCharCode(65 + oi)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {submitted && isSelected && isCorrect && (
                    <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0" />
                  )}
                  {submitted && isSelected && !isCorrect && (
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Result / Actions */}
      {submitted ? (
        <div className="space-y-4">
          <div
            className={cn(
              "rounded-xl border p-4 text-center",
              allCorrect
                ? "border-neon-green/30 bg-neon-green/10"
                : "border-secondary/30 bg-secondary/10"
            )}
          >
            <p
              className={cn(
                "text-lg font-bold",
                allCorrect ? "text-neon-green" : "text-secondary"
              )}
            >
              {correctCount}/{questions.length} respuestas correctas
            </p>
            <p className="mt-1 text-sm text-foreground-secondary">
              {allCorrect
                ? "Excelente, aprobaste el quiz de esta lección."
                : "Revisá el material y volvé a intentarlo. No hay límite de intentos."}
            </p>
          </div>
          {!allCorrect && (
            <button
              onClick={handleRetry}
              className="mx-auto flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-white hover:bg-background-tertiary transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Reintentar quiz
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={cn(
            "w-full rounded-xl px-5 py-3 text-sm font-medium transition-colors",
            allAnswered
              ? "bg-neon-green text-black hover:bg-neon-green/90"
              : "bg-foreground-muted/10 text-foreground-muted cursor-not-allowed"
          )}
        >
          {allAnswered
            ? "Verificar respuestas"
            : `Respondé todas las preguntas (${Object.keys(answers).length}/${questions.length})`}
        </button>
      )}
    </div>
  );
}
