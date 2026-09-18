"use client";

import { useState } from "react";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  XCircle,
  Target,
  Lightbulb,
  Bot,
  User,
  Upload,
  ClipboardList,
  Loader2,
  Copy,
  Check,
  Mail,
  Wand2,
} from "lucide-react";
import {
  RUBROS,
  analyzeCv,
  type CvAnalysis,
  type CvImprovement,
  type RubroKey,
} from "@/lib/cv-data";
import { GlassCard } from "@/components/common/glass-card";
import { NeonButton } from "@/components/common/neon-button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function scoreColor(score: number): string {
  if (score >= 75) return "text-neon-green";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function scoreLabel(score: number): string {
  if (score >= 75) return "Muy bueno";
  if (score >= 50) return "Mejorable";
  return "Necesita trabajo";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1.5 rounded-lg border border-border bg-background-secondary px-3 py-1.5 text-xs font-medium text-foreground-secondary transition-colors hover:border-neon-green hover:text-neon-green"
    >
      {copied ? (
        <>
          <Check className="h-3.5 w-3.5" /> Copiado
        </>
      ) : (
        <>
          <Copy className="h-3.5 w-3.5" /> Copiar
        </>
      )}
    </button>
  );
}

export function CvOptimizer() {
  const [cvText, setCvText] = useState("");
  const [jobText, setJobText] = useState("");
  const [rubroKey, setRubroKey] = useState<RubroKey>("mineria");
  const [analysis, setAnalysis] = useState<CvAnalysis | null>(null);

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [improving, setImproving] = useState(false);
  const [improveError, setImproveError] = useState("");
  const [improvement, setImprovement] = useState<CvImprovement | null>(null);

  const rubro = RUBROS.find((r) => r.key === rubroKey)!;
  const canAnalyze = cvText.trim().length >= 60;

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/cv/extraer", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "No se pudo leer el archivo.");
      } else {
        setCvText(data.text);
      }
    } catch {
      setUploadError("No se pudo leer el archivo. Proba pegando el texto.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleAnalyze() {
    setAnalysis(analyzeCv(cvText, jobText, rubro));
  }

  async function handleImprove() {
    setImproveError("");
    setImproving(true);
    setImprovement(null);
    try {
      const res = await fetch("/api/cv/mejorar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cvText, jobText, rubro: rubroKey }),
      });
      const data = await res.json();
      if (!res.ok) {
        setImproveError(data.error || "No se pudo mejorar el CV.");
      } else {
        setImprovement(data);
      }
    } catch {
      setImproveError("No se pudo conectar con la IA. Proba de nuevo.");
    } finally {
      setImproving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
        <Badge className="mb-4 bg-neon-green/20 text-neon-green" variant="secondary">
          Gratis
        </Badge>
        <h1 className="flex items-center gap-3 text-3xl font-bold leading-tight sm:text-4xl">
          <Sparkles className="h-8 w-8 text-neon-green" />
          Mejora tu CV
        </h1>
        <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
          Subi tu curriculum y te decimos que tan preparado esta para pasar los
          filtros automaticos (ATS) que usan las empresas. Despues, la IA lo
          reescribe y te arma la carta de presentacion para conseguir empleo en
          La Rioja.
        </p>
      </div>

      {/* Las dos versiones */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <Bot className="h-5 w-5 shrink-0 text-neon-cyan" />
          <div>
            <p className="font-semibold text-white">Version ATS (robot)</p>
            <p className="mt-1 text-sm text-foreground-secondary">
              Para postular online. Un sistema lee tu CV antes que una persona.
              Sin foto, texto plano y con las palabras del aviso.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-5">
          <User className="h-5 w-5 shrink-0 text-secondary" />
          <div>
            <p className="font-semibold text-white">Version presencial</p>
            <p className="mt-1 text-sm text-foreground-secondary">
              Para entregar en mano o en la entrevista. Con foto y buen diseno,
              pensada para el ojo humano.
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="mt-8 space-y-6">
        {/* Rubro */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white">
            <Target className="h-4 w-4 text-neon-green" />
            A que rubro apuntas
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {RUBROS.map((r) => (
              <button
                key={r.key}
                onClick={() => setRubroKey(r.key)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                  rubroKey === r.key
                    ? "border-neon-green bg-neon-green/10 text-neon-green"
                    : "border-border bg-background-secondary text-foreground-secondary hover:border-border-bright hover:text-white"
                )}
              >
                {r.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-foreground-muted">{rubro.description}</p>
        </div>

        {/* CV */}
        <div>
          <div className="flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <FileText className="h-4 w-4 text-neon-green" />
              Tu CV
            </label>
            <label
              className={cn(
                "flex cursor-pointer items-center gap-1.5 text-xs transition-colors",
                uploading
                  ? "text-foreground-muted"
                  : "text-foreground-secondary hover:text-neon-green"
              )}
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              {uploading ? "Leyendo..." : "Subir PDF / Word / TXT"}
              <input
                type="file"
                accept=".txt,.pdf,.docx,text/plain,application/pdf"
                onChange={handleFile}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            rows={10}
            placeholder="Subi tu CV (PDF, Word o TXT) o pega el texto aca: datos de contacto, experiencia, educacion y habilidades."
            className="mt-3 w-full resize-y rounded-xl border border-border bg-background-secondary p-4 text-sm text-white placeholder:text-foreground-muted focus:border-neon-green focus:outline-none"
          />
          {uploadError && (
            <p className="mt-1.5 text-xs text-red-400">{uploadError}</p>
          )}
          <p className="mt-1.5 text-xs text-foreground-muted">
            Aceptamos PDF, Word (.docx) y TXT. Un PDF escaneado (imagen) no se
            puede leer: en ese caso, pega el texto a mano.
          </p>
        </div>

        {/* Aviso */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-white">
            <ClipboardList className="h-4 w-4 text-neon-cyan" />
            Aviso de trabajo <span className="font-normal text-foreground-muted">(opcional)</span>
          </label>
          <textarea
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            rows={5}
            placeholder="Pega el aviso al que queres postularte y adaptamos tu CV y la carta a lo que pide."
            className="mt-3 w-full resize-y rounded-xl border border-border bg-background-secondary p-4 text-sm text-white placeholder:text-foreground-muted focus:border-neon-cyan focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <NeonButton
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            variant="outline"
            className="w-full sm:w-auto"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Analizar (ATS)
          </NeonButton>
          <NeonButton
            onClick={handleImprove}
            disabled={!canAnalyze || improving}
            className="w-full sm:w-auto"
          >
            {improving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mejorando...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Mejorar con IA
              </>
            )}
          </NeonButton>
        </div>
        {!canAnalyze && (
          <p className="text-xs text-foreground-muted">
            Subi o pega al menos unas lineas de tu CV para empezar.
          </p>
        )}
        {improveError && (
          <p className="text-sm text-red-400">{improveError}</p>
        )}
      </div>

      {/* Resultado IA */}
      {improvement && (
        <div className="mt-12 space-y-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <Wand2 className="h-6 w-6 text-neon-green" />
            Tu CV mejorado con IA
          </h2>

          <ResultBlock
            title="Resumen profesional"
            icon={<User className="h-5 w-5 text-neon-green" />}
            text={improvement.resumenProfesional}
          />
          <ResultBlock
            title="CV reescrito (ATS)"
            icon={<Bot className="h-5 w-5 text-neon-cyan" />}
            text={improvement.cvMejorado}
          />
          <ResultBlock
            title="Carta de presentacion"
            icon={<Mail className="h-5 w-5 text-secondary" />}
            text={improvement.cartaPresentacion}
          />

          {improvement.cambiosClave?.length > 0 && (
            <section>
              <h3 className="flex items-center gap-2 text-lg font-bold">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                Que cambiamos
              </h3>
              <div className="mt-3 space-y-2">
                {improvement.cambiosClave.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-neon-green" />
                    <p className="text-sm text-foreground-secondary">{c}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <p className="text-xs text-foreground-muted">
            Revisa siempre el resultado antes de usarlo. La IA puede equivocarse:
            corrobora que todos los datos sean tuyos y verdaderos.
          </p>
        </div>
      )}

      {/* Resultado analisis ATS */}
      {analysis && (
        <div className="mt-12 space-y-8">
          {/* Puntaje */}
          <GlassCard neonBorder="green" hover={false} className="text-center">
            <p className="text-sm font-medium text-foreground-secondary">
              Puntaje ATS
            </p>
            <p className={cn("mt-2 text-6xl font-bold", scoreColor(analysis.score))}>
              {analysis.score}
              <span className="text-2xl text-foreground-muted">/100</span>
            </p>
            <p className={cn("mt-1 font-semibold", scoreColor(analysis.score))}>
              {scoreLabel(analysis.score)}
            </p>
          </GlassCard>

          {/* Checks */}
          <section>
            <h2 className="text-xl font-bold">Que revisamos</h2>
            <div className="mt-4 space-y-3">
              {analysis.checks.map((check) => (
                <div
                  key={check.label}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
                >
                  {check.ok ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-neon-green" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
                  )}
                  <div>
                    <p className="font-medium text-white">{check.label}</p>
                    <p className="mt-0.5 text-sm text-foreground-secondary">
                      {check.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Palabras clave */}
          <section>
            <h2 className="text-xl font-bold">Palabras clave</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-neon-green/20 bg-neon-green/5 p-4">
                <p className="text-sm font-semibold text-neon-green">
                  Presentes ({analysis.matchedKeywords.length})
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {analysis.matchedKeywords.length > 0 ? (
                    analysis.matchedKeywords.map((k) => (
                      <span
                        key={k}
                        className="rounded-md bg-neon-green/10 px-2 py-1 text-xs text-neon-green"
                      >
                        {k}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-foreground-muted">Todavia ninguna.</p>
                  )}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-semibold text-foreground-secondary">
                  Te faltan ({analysis.missingKeywords.length})
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {analysis.missingKeywords.length > 0 ? (
                    analysis.missingKeywords.map((k) => (
                      <span
                        key={k}
                        className="rounded-md bg-background-tertiary px-2 py-1 text-xs text-foreground-secondary"
                      >
                        {k}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-foreground-muted">Ninguna, excelente.</p>
                  )}
                </div>
                <p className="mt-3 text-xs text-foreground-muted">
                  Sumalas solo si son verdad en tu experiencia. Nunca inventes.
                </p>
              </div>
            </div>
          </section>

          {/* Sugerencias */}
          {analysis.suggestions.length > 0 && (
            <section>
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                Como mejorarlo
              </h2>
              <div className="mt-4 space-y-3">
                {analysis.suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-secondary/20 bg-secondary/5 p-4"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/20 text-xs font-bold text-secondary">
                      {i + 1}
                    </span>
                    <p className="text-sm text-foreground-secondary pt-0.5">{s}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function ResultBlock({
  title,
  icon,
  text,
}: {
  title: string;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-semibold text-white">
          {icon}
          {title}
        </h3>
        <CopyButton text={text} />
      </div>
      <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground-secondary">
        {text}
      </pre>
    </div>
  );
}
