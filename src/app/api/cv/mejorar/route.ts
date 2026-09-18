import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { RUBROS, type RubroKey } from "@/lib/cv-data";

export const runtime = "nodejs";
export const maxDuration = 60;

// Reescritura de CV con IA usando el tier gratuito de Google Gemini.
// Costo cero para la plataforma mientras se use dentro del cupo gratis.
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const MAX_CHARS = 8000;

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    resumenProfesional: { type: "string" },
    cvMejorado: { type: "string" },
    cartaPresentacion: { type: "string" },
    cambiosClave: { type: "array", items: { type: "string" } },
  },
  required: ["resumenProfesional", "cvMejorado", "cartaPresentacion", "cambiosClave"],
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
          "La reescritura con IA todavia no esta configurada. Falta la clave gratuita de Gemini (GEMINI_API_KEY).",
      },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const cvText: string = (body?.cvText || "").toString().slice(0, MAX_CHARS);
  const jobText: string = (body?.jobText || "").toString().slice(0, MAX_CHARS);
  const rubroKey: RubroKey = body?.rubro;
  const rubro = RUBROS.find((r) => r.key === rubroKey);

  if (cvText.trim().length < 60) {
    return NextResponse.json(
      { error: "El CV es demasiado corto para reescribir." },
      { status: 400 }
    );
  }

  const prompt = buildPrompt(cvText, jobText, rubro?.label ?? "general", rubro?.keywords ?? []);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.4,
            responseMimeType: "application/json",
            responseSchema: RESPONSE_SCHEMA,
          },
        }),
      }
    );

    if (!res.ok) {
      const status = res.status === 429 ? 429 : 502;
      return NextResponse.json(
        {
          error:
            res.status === 429
              ? "Se alcanzo el limite gratuito de la IA por ahora. Proba de nuevo en un rato."
              : "La IA no respondio. Proba de nuevo en un momento.",
        },
        { status }
      );
    }

    const data = await res.json();
    const text: string | undefined =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return NextResponse.json(
        { error: "La IA no devolvio contenido. Proba de nuevo." },
        { status: 502 }
      );
    }

    const improvement = JSON.parse(text);
    return NextResponse.json(improvement);
  } catch {
    return NextResponse.json(
      { error: "No se pudo mejorar el CV. Proba de nuevo en un momento." },
      { status: 500 }
    );
  }
}

function buildPrompt(
  cvText: string,
  jobText: string,
  rubroLabel: string,
  keywords: string[]
): string {
  return `Sos un experto en reclutamiento y redaccion de CV para el mercado laboral de La Rioja, Argentina.
Trabajas con una persona que apunta al rubro: ${rubroLabel}.

Tu tarea: reescribir y mejorar el CV de abajo para que:
- Pase los filtros automaticos (ATS): una sola columna, titulos de seccion estandar (Datos de contacto, Resumen, Experiencia, Educacion, Habilidades), texto plano sin tablas.
- Use verbos de accion y logros concretos.
- Incluya palabras clave del rubro cuando sean verdad segun la experiencia de la persona. Palabras clave utiles del rubro: ${keywords.join(", ")}.

REGLAS IMPORTANTES:
- NUNCA inventes datos, titulos, empleos ni resultados que no esten en el CV original. Si algo falta, no lo agregues.
- Usa español de Argentina (voseo cuando corresponda), tono profesional.
- No uses emojis.
- Si el CV tiene numeros o resultados, resaltalos; si no los tiene, no los inventes.

Devolve un JSON con estos campos:
- "resumenProfesional": 2 a 3 lineas de resumen profesional para el encabezado del CV.
- "cvMejorado": el CV completo reescrito en texto plano, con secciones claras, listo para pegar.
- "cartaPresentacion": una carta de presentacion breve (1 parrafo o dos) para postular.
- "cambiosClave": lista de 3 a 6 mejoras concretas que hiciste, en frases cortas.

${jobText.trim() ? `AVISO DE TRABAJO al que quiere postularse (adapta el CV y la carta a esto):\n"""\n${jobText}\n"""\n` : ""}
CV ORIGINAL:
"""
${cvText}
"""`;
}
