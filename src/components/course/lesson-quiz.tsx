"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, RotateCcw, HelpCircle, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizQuestion } from "@/lib/mock-course-data";

interface LessonQuizProps {
  questions: QuizQuestion[];
  passThreshold: number; // porcentaje mínimo para aprobar
  alreadyPassed: boolean;
  onPass: () => void;
}

export function LessonQuiz({
  questions,
  passThreshold,
  alreadyPassed,
  onPass,
}: LessonQuizProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const correctCount = questions.filter(
    (q, i) => answers[i] === q.correctIndex
  ).length;
  const scorePercent = Math.round((correctCount / questions.length) * 100);
  const passed = scorePercent >= passThreshold;
  const allAnswered = Object.keys(answers).length === questions.length;

  function handleSelect(qi: number, oi: number) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  }

  function handleSubmit() {
    if (!allAnswered) return;
    setSubmitted(true);
    const ok =
      questions.filter((q, i) => answers[i] === q.correctIndex).length /
        questions.length *
        100 >=
      passThreshold;
    if (ok) onPass();
  }

  function handleRetry() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-1 flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-secondary" />
        <h2 className="text-lg font-semibold text-white">Quiz de la lección</h2>
        {alreadyPassed && (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-neon-green/15 px-2.5 py-1 text-xs font-medium text-neon-green">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Aprobado
          </span>
        )}
      </div>
      <p className="mb-6 text-sm text-foreground-secondary">
        Respondé para verificar tu comprensión. Necesitás {passThreshold}% de
        aciertos para aprobar. Reintentos ilimitados.
      </p>

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
                  styles = "border-neon-green bg-neon-green/10 text-neon-green";
                } else if (submitted && isSelected && !isCorrect) {
                  styles = "border-red-500/50 bg-red-500/10 text-red-400";
                } else if (submitted && isCorrect) {
                  styles =
                    "border-neon-green/30 bg-neon-green/5 text-foreground-secondary";
                } else if (isSelected) {
                  styles = "border-neon-green/50 bg-neon-green/5 text-white";
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
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-neon-green" />
                    )}
                    {submitted && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Resultado / acciones */}
      <div className="mt-6">
        {submitted ? (
          <div className="space-y-4">
            <div
              className={cn(
                "rounded-xl border p-4 text-center",
                passed
                  ? "border-neon-green/30 bg-neon-green/10"
                  : "border-secondary/30 bg-secondary/10"
              )}
            >
              <div className="flex items-center justify-center gap-2">
                {passed && <Award className="h-5 w-5 text-neon-green" />}
                <p
                  className={cn(
                    "text-lg font-bold",
                    passed ? "text-neon-green" : "text-secondary"
                  )}
                >
                  {correctCount}/{questions.length} correctas · {scorePercent}%
                </p>
              </div>
              <p className="mt-1 text-sm text-foreground-secondary">
                {passed
                  ? "Aprobaste el quiz. Ya podés completar la lección."
                  : `Necesitás ${passThreshold}%. Revisá el material y volvé a intentarlo.`}
              </p>
            </div>
            {!passed && (
              <button
                onClick={handleRetry}
                className="mx-auto flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-background-tertiary"
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
                : "cursor-not-allowed bg-foreground-muted/10 text-foreground-muted"
            )}
          >
            {allAnswered
              ? "Verificar respuestas"
              : `Respondé todas las preguntas (${Object.keys(answers).length}/${questions.length})`}
          </button>
        )}
      </div>
    </div>
  );
}
