"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  Target,
  Briefcase,
  ClipboardList,
  Send,
  Loader2,
  Play,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  RotateCcw,
  Trophy,
  User,
} from "lucide-react";
import { RUBROS, type RubroKey } from "@/lib/cv-data";
import {
  INTERVIEW_TYPES,
  type ChatMessage,
  type InterviewReport,
  type InterviewTypeKey,
} from "@/lib/interview-data";
import { GlassCard } from "@/components/common/glass-card";
import { NeonButton } from "@/components/common/neon-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function scoreColor(score: number): string {
  if (score >= 75) return "text-neon-green";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

type Phase = "config" | "chat" | "report";

export function InterviewSimulator() {
  const [phase, setPhase] = useState<Phase>("config");
  const [rubro, setRubro] = useState<RubroKey>("mineria");
  const [tipo, setTipo] = useState<InterviewTypeKey>("general");
  const [puesto, setPuesto] = useState("");
  const [aviso, setAviso] = useState("");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [report, setReport] = useState<InterviewReport | null>(null);
  const [error, setError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const rubroLabel = RUBROS.find((r) => r.key === rubro)!.label;
  const config = { rubro, tipo, puesto, aviso };
  const asked = messages.filter((m) => m.role === "entrevistador").length;
  const closed = messages.length >= 2 && asked >= 6;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function apiCall(action: "responder" | "evaluar", msgs: ChatMessage[]) {
    const res = await fetch("/api/entrevistas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, config, messages: msgs }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error de la IA.");
    return data;
  }

  async function startInterview() {
    setError("");
    setPhase("chat");
    setLoading(true);
    try {
      const data = await apiCall("responder", []);
      setMessages([{ role: "entrevistador", text: data.text }]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function sendAnswer() {
    const text = input.trim();
    if (!text || loading) return;
    setError("");
    const next: ChatMessage[] = [...messages, { role: "candidato", text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const data = await apiCall("responder", next);
      setMessages([...next, { role: "entrevistador", text: data.text }]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function evaluate() {
    setError("");
    setEvaluating(true);
    try {
      const data = await apiCall("evaluar", messages);
      setReport(data);
      setPhase("report");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setEvaluating(false);
    }
  }

  function reset() {
    setPhase("config");
    setMessages([]);
    setInput("");
    setReport(null);
    setError("");
  }

  // ---------------- CONFIG ----------------
  if (phase === "config") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
          <Badge className="mb-4 bg-neon-green/20 text-neon-green" variant="secondary">
            Gratis con IA
          </Badge>
          <h1 className="flex items-center gap-3 text-3xl font-bold sm:text-4xl">
            <MessageSquare className="h-8 w-8 text-neon-green" />
            Simulador de Entrevistas
          </h1>
          <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
            Practica una entrevista de trabajo realista con IA. Te hace preguntas
            como un entrevistador de verdad y al final te da un informe con tu
            puntaje y como mejorar.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <Target className="h-4 w-4 text-neon-green" />
              Rubro
            </label>
            <div className="mt-3 flex flex-wrap gap-2">
              {RUBROS.map((r) => (
                <button
                  key={r.key}
                  onClick={() => setRubro(r.key)}
                  className={cn(
                    "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                    rubro === r.key
                      ? "border-neon-green bg-neon-green/10 text-neon-green"
                      : "border-border bg-background-secondary text-foreground-secondary hover:border-border-bright hover:text-white"
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <ClipboardList className="h-4 w-4 text-neon-cyan" />
              Tipo de entrevista
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {INTERVIEW_TYPES.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTipo(t.key)}
                  className={cn(
                    "rounded-xl border p-4 text-left transition-all",
                    tipo === t.key
                      ? "border-neon-cyan bg-neon-cyan/10"
                      : "border-border bg-background-secondary hover:border-border-bright"
                  )}
                >
                  <p
                    className={cn(
                      "text-sm font-semibold",
                      tipo === t.key ? "text-neon-cyan-bright" : "text-white"
                    )}
                  >
                    {t.label}
                  </p>
                  <p className="mt-1 text-xs text-foreground-secondary">
                    {t.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <Briefcase className="h-4 w-4 text-neon-green" />
              Puesto{" "}
              <span className="font-normal text-foreground-muted">(opcional)</span>
            </label>
            <input
              value={puesto}
              onChange={(e) => setPuesto(e.target.value)}
              placeholder="Ej: Operario de planta, Vendedor, Asistente administrativo"
              className="mt-3 w-full rounded-xl border border-border bg-background-secondary p-4 text-sm text-white placeholder:text-foreground-muted focus:border-neon-green focus:outline-none"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <ClipboardList className="h-4 w-4 text-neon-cyan" />
              Aviso de trabajo{" "}
              <span className="font-normal text-foreground-muted">(opcional)</span>
            </label>
            <textarea
              value={aviso}
              onChange={(e) => setAviso(e.target.value)}
              rows={4}
              placeholder="Pega el aviso y las preguntas se adaptan a lo que pide."
              className="mt-3 w-full resize-y rounded-xl border border-border bg-background-secondary p-4 text-sm text-white placeholder:text-foreground-muted focus:border-neon-cyan focus:outline-none"
            />
          </div>

          <NeonButton onClick={startInterview} size="lg" className="w-full sm:w-auto">
            <Play className="mr-2 h-5 w-5" />
            Empezar entrevista
          </NeonButton>
          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>
      </div>
    );
  }

  // ---------------- REPORT ----------------
  if (phase === "report" && report) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
          <Trophy className="h-7 w-7 text-neon-green" />
          Tu informe de entrevista
        </h1>

        <GlassCard neonBorder="green" hover={false} className="mt-6 text-center">
          <p className="text-sm font-medium text-foreground-secondary">Puntaje</p>
          <p className={cn("mt-2 text-6xl font-bold", scoreColor(report.puntaje))}>
            {report.puntaje}
            <span className="text-2xl text-foreground-muted">/100</span>
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm text-foreground-secondary">
            {report.resumen}
          </p>
        </GlassCard>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neon-green/20 bg-neon-green/5 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-neon-green">
              <CheckCircle2 className="h-4 w-4" />
              Tus fortalezas
            </p>
            <ul className="mt-3 space-y-2">
              {report.fortalezas.map((f, i) => (
                <li key={i} className="text-sm text-foreground-secondary">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-yellow-400">
              <AlertCircle className="h-4 w-4" />
              Para mejorar
            </p>
            <ul className="mt-3 space-y-2">
              {report.aMejorar.map((f, i) => (
                <li key={i} className="text-sm text-foreground-secondary">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-bold">Repaso pregunta por pregunta</h2>
          <div className="mt-4 space-y-4">
            {report.porPregunta.map((q, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-white">{q.pregunta}</p>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {q.comentario}
                </p>
                <div className="mt-3 rounded-lg border border-neon-green/15 bg-neon-green/5 p-3">
                  <p className="text-xs font-semibold text-neon-green">
                    Como responder mejor
                  </p>
                  <p className="mt-1 text-sm text-foreground-secondary">
                    {q.respuestaModelo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/5 p-6">
          <p className="flex items-center gap-2 font-semibold text-secondary">
            <Lightbulb className="h-5 w-5" />
            Consejo final
          </p>
          <p className="mt-2 text-sm text-foreground-secondary">
            {report.consejoFinal}
          </p>
        </div>

        <div className="mt-8">
          <NeonButton onClick={reset} className="w-full sm:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Practicar de nuevo
          </NeonButton>
        </div>
      </div>
    );
  }

  // ---------------- CHAT ----------------
  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 py-4 sm:px-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-neon-green/15">
            <MessageSquare className="h-5 w-5 text-neon-green" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Entrevista · {rubroLabel}</p>
            <p className="text-xs text-foreground-muted">
              {asked > 0 ? `Pregunta ${asked}` : "Preparando..."}
            </p>
          </div>
        </div>
        <NeonButton
          onClick={evaluate}
          disabled={evaluating || messages.length < 2}
          variant="outline"
          size="sm"
        >
          {evaluating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Evaluando...
            </>
          ) : (
            "Terminar y ver evaluacion"
          )}
        </NeonButton>
      </div>

      {/* Mensajes */}
      <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3",
              m.role === "candidato" ? "justify-end" : "justify-start"
            )}
          >
            {m.role === "entrevistador" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neon-green/15 text-xs font-bold text-neon-green">
                S
              </div>
            )}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                m.role === "candidato"
                  ? "bg-neon-green/15 text-white"
                  : "border border-border bg-card text-foreground-secondary"
              )}
            >
              {m.text}
            </div>
            {m.role === "candidato" && (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-tertiary">
                <User className="h-4 w-4 text-foreground-secondary" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neon-green/15 text-xs font-bold text-neon-green">
              S
            </div>
            <div className="rounded-2xl border border-border bg-card px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-foreground-muted" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

      {/* Input */}
      <div className="mt-4 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendAnswer();
            }
          }}
          rows={1}
          disabled={loading || closed}
          placeholder={closed ? "La entrevista termino. Toca Terminar y ver evaluacion." : "Escribi tu respuesta..."}
          className="max-h-32 flex-1 resize-none rounded-xl border border-border bg-background-secondary p-3 text-sm text-white placeholder:text-foreground-muted focus:border-neon-green focus:outline-none disabled:opacity-60"
        />
        <NeonButton
          onClick={sendAnswer}
          disabled={loading || !input.trim() || closed}
          className="h-11 px-4"
        >
          <Send className="h-4 w-4" />
        </NeonButton>
      </div>
    </div>
  );
}
