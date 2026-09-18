import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { RUBROS, type RubroKey } from "@/lib/cv-data";
import {
  INTERVIEW_TYPES,
  MAX_MAIN_QUESTIONS,
  type ChatMessage,
  type InterviewTypeKey,
} from "@/lib/interview-data";

export const runtime = "nodejs";
export const maxDuration = 60;

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const MAX_CHARS = 6000;

interface Config {
  rubro: RubroKey;
  tipo: InterviewTypeKey;
  puesto?: string;
  aviso?: string;
}

const REPORT_SCHEMA = {
  type: "object",
  properties: {
    puntaje: { type: "integer" },
    resumen: { type: "string" },
    fortalezas: { type: "array", items: { type: "string" } },
    aMejorar: { type: "array", items: { type: "string" } },
    porPregunta: {
      type: "array",
      items: {
        type: "object",
        properties: {
          pregunta: { type: "string" },
          comentario: { type: "string" },
          respuestaModelo: { type: "string" },
        },
        required: ["pregunta", "comentario", "respuestaModelo"],
      },
    },
    consejoFinal: { type: "string" },
  },
  required: ["puntaje", "resumen", "fortalezas", "aMejorar", "porPregunta", "consejoFinal"],
};

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "El simulador con IA todavia no esta configurado. Falta la clave gratuita de Gemini (GEMINI_API_KEY).",
      },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const action: "responder" | "evaluar" = body?.action;
  const config: Config = body?.config;
  const messages: ChatMessage[] = Array.isArray(body?.messages) ? body.messages : [];

  const rubro = RUBROS.find((r) => r.key === config?.rubro);
  const tipo = INTERVIEW_TYPES.find((t) => t.key === config?.tipo);
  if (!rubro || !tipo) {
    return NextResponse.json({ error: "Configuracion invalida." }, { status: 400 });
  }

  try {
    if (action === "evaluar") {
      return await evaluar(apiKey, config, rubro.label, messages);
    }
    return await responder(apiKey, config, rubro.label, tipo.description, messages);
  } catch {
    return NextResponse.json(
      { error: "La IA no respondio. Proba de nuevo en un momento." },
      { status: 500 }
    );
  }
}

// --- Turno de entrevista: la IA hace la proxima pregunta ---
async function responder(
  apiKey: string,
  config: Config,
  rubroLabel: string,
  tipoDesc: string,
  messages: ChatMessage[]
) {
  const asked = messages.filter((m) => m.role === "entrevistador").length;
  const contextoAviso = config.aviso?.trim()
    ? `\nAviso al que se postula (adapta las preguntas a esto):\n"""\n${config.aviso.slice(0, MAX_CHARS)}\n"""`
    : "";
  const puesto = config.puesto?.trim() ? ` para el puesto de "${config.puesto.trim()}"` : "";

  const systemInstruction = `Sos Sofia, entrevistadora profesional de Recursos Humanos en La Rioja, Argentina. Estas entrevistando a una persona${puesto} en el rubro "${rubroLabel}". Tipo de entrevista: ${tipoDesc}

Reglas estrictas:
- Hablas en español de Argentina, con voseo, tono cordial y profesional. Sin emojis.
- Haces UNA sola pregunta por mensaje, breve y clara. Nunca listes varias preguntas juntas.
- Si la respuesta de la persona es vaga, corta o sin ejemplos concretos, hace UNA repregunta para que profundice (por ejemplo, pedir un ejemplo real o un numero). No repreguntes mas de una vez el mismo tema.
- Preguntas realistas de una entrevista real: arranca presentandote en una linea y con una primera pregunta simple.
- No evalues ni des feedback durante la entrevista. Solo entrevista.
- Cuando ya hayas hecho alrededor de ${MAX_MAIN_QUESTIONS} preguntas principales, cerra la entrevista: agradece brevemente y avisa que la persona puede tocar "Terminar y ver evaluacion". No hagas mas preguntas despues de cerrar.
- Ya hiciste ${asked} pregunta(s) hasta ahora.${contextoAviso}`;

  const contents =
    messages.length === 0
      ? [{ role: "user", parts: [{ text: "(Comenza la entrevista: presentate en una linea y hace tu primera pregunta.)" }] }]
      : messages.map((m) => ({
          role: m.role === "entrevistador" ? "model" : "user",
          parts: [{ text: m.text.slice(0, MAX_CHARS) }],
        }));

  const res = await callGemini(apiKey, {
    systemInstruction: { parts: [{ text: systemInstruction }] },
    contents,
    generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
  });

  if (!res.ok) return geminiError(res.status);
  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    return NextResponse.json({ error: "La IA no devolvio contenido." }, { status: 502 });
  }
  return NextResponse.json({ text: text.trim() });
}

// --- Evaluacion final: informe estructurado ---
async function evaluar(
  apiKey: string,
  config: Config,
  rubroLabel: string,
  messages: ChatMessage[]
) {
  const transcript = messages
    .map((m) => `${m.role === "entrevistador" ? "ENTREVISTADORA" : "CANDIDATO"}: ${m.text}`)
    .join("\n\n")
    .slice(0, MAX_CHARS * 2);

  const prompt = `Sos una coach de empleo experta en La Rioja, Argentina. Evalua la siguiente entrevista simulada para el rubro "${rubroLabel}".

Se justa pero constructiva. Analiza claridad, seguridad, uso de ejemplos y logros con numeros, actitud y adecuacion al puesto. Español de Argentina con voseo, sin emojis. Nunca inventes datos que el candidato no dijo.

Devolve un JSON con:
- "puntaje": numero entero de 0 a 100.
- "resumen": 2 o 3 lineas con la impresion general.
- "fortalezas": lista de 2 a 4 puntos fuertes reales de esta entrevista.
- "aMejorar": lista de 2 a 4 cosas concretas para mejorar.
- "porPregunta": por cada pregunta importante que hizo la entrevistadora, un objeto con "pregunta", "comentario" (que estuvo bien o mal en la respuesta del candidato) y "respuestaModelo" (un ejemplo breve de como responder mejor).
- "consejoFinal": un consejo motivador y accionable.

ENTREVISTA:
"""
${transcript}
"""`;

  const res = await callGemini(apiKey, {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.3,
      responseMimeType: "application/json",
      responseSchema: REPORT_SCHEMA,
    },
  });

  if (!res.ok) return geminiError(res.status);
  const data = await res.json();
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    return NextResponse.json({ error: "La IA no devolvio la evaluacion." }, { status: 502 });
  }
  return NextResponse.json(JSON.parse(text));
}

function callGemini(apiKey: string, payload: object) {
  return fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
}

function geminiError(status: number) {
  return NextResponse.json(
    {
      error:
        status === 429
          ? "Se alcanzo el limite gratuito de la IA por ahora. Proba de nuevo en un rato."
          : "La IA no respondio. Proba de nuevo en un momento.",
    },
    { status: status === 429 ? 429 : 502 }
  );
}
