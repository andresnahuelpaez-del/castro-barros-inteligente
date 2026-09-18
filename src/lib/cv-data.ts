// Datos y logica del Optimizador de CV (Fase 1, 100% client-side, sin costo).
// La reescritura con IA (Fase 2) se suma despues sobre esta misma base.

export type RubroKey =
  | "mineria"
  | "energia"
  | "agro"
  | "comercio"
  | "admin_publica"
  | "turismo"
  | "tecnologia";

export interface Rubro {
  key: RubroKey;
  label: string;
  description: string;
  // Palabras clave que un CV de este rubro en La Rioja deberia contemplar.
  keywords: string[];
}

export const RUBROS: Rubro[] = [
  {
    key: "mineria",
    label: "Mineria",
    description: "Litio, exploracion, operaciones y medio ambiente en La Rioja.",
    keywords: [
      "seguridad e higiene",
      "medio ambiente",
      "operaciones",
      "geologia",
      "litio",
      "perforacion",
      "logistica",
      "mantenimiento",
      "control de calidad",
      "normas iso",
      "trabajo en altura",
      "planta",
    ],
  },
  {
    key: "energia",
    label: "Energia renovable",
    description: "Parques solares y eolicos del oeste riojano.",
    keywords: [
      "energia solar",
      "paneles fotovoltaicos",
      "mantenimiento electrico",
      "instalacion",
      "eolica",
      "eficiencia energetica",
      "monitoreo",
      "seguridad electrica",
      "obra",
      "puesta en marcha",
    ],
  },
  {
    key: "agro",
    label: "Agro y vitivinicola",
    description: "Vinedos, olivos, nogales y produccion regional.",
    keywords: [
      "produccion",
      "riego",
      "cosecha",
      "bodega",
      "control de plagas",
      "maquinaria agricola",
      "trazabilidad",
      "buenas practicas agricolas",
      "poda",
      "enologia",
      "logistica",
    ],
  },
  {
    key: "comercio",
    label: "Comercio y ventas",
    description: "Atencion al cliente, ventas y administracion de comercios.",
    keywords: [
      "atencion al cliente",
      "ventas",
      "caja",
      "stock",
      "facturacion",
      "manejo de redes",
      "objetivos de venta",
      "posventa",
      "reposicion",
      "excel",
    ],
  },
  {
    key: "admin_publica",
    label: "Administracion",
    description: "Gestion administrativa, publica y privada.",
    keywords: [
      "gestion administrativa",
      "expedientes",
      "office",
      "excel",
      "redaccion",
      "archivo",
      "atencion al publico",
      "planillas",
      "organizacion",
      "digitalizacion",
    ],
  },
  {
    key: "turismo",
    label: "Turismo y hoteleria",
    description: "Turismo, gastronomia y hoteleria de la provincia.",
    keywords: [
      "atencion al cliente",
      "recepcion",
      "gastronomia",
      "guia de turismo",
      "reservas",
      "idiomas",
      "eventos",
      "hospitalidad",
      "manejo de caja",
    ],
  },
  {
    key: "tecnologia",
    label: "Tecnologia e IA",
    description: "Programacion, datos, marketing digital e inteligencia artificial.",
    keywords: [
      "inteligencia artificial",
      "programacion",
      "datos",
      "marketing digital",
      "diseno",
      "automatizacion",
      "gestion de proyectos",
      "ingles tecnico",
      "portfolio",
      "git",
    ],
  },
];

// Verbos de accion recomendados para describir logros (evitar "encargado de").
export const ACTION_VERBS = [
  "logre",
  "aumente",
  "reduje",
  "coordine",
  "implemente",
  "gestione",
  "lidere",
  "desarrolle",
  "optimice",
  "atendi",
  "organice",
  "capacite",
  "supervise",
  "mejore",
  "resolvi",
  "diseñe",
  "disene",
  "vendi",
  "entregue",
  "controle",
];

// Secciones que un ATS espera encontrar.
export const EXPECTED_SECTIONS = [
  { label: "Datos de contacto", patterns: ["@", "tel", "cel", "email", "correo"] },
  { label: "Experiencia", patterns: ["experiencia", "laboral", "trabajo", "empleo"] },
  { label: "Educacion", patterns: ["educacion", "formacion", "estudios", "secundario", "terciario", "titulo"] },
  { label: "Habilidades", patterns: ["habilidades", "conocimientos", "skills", "aptitudes"] },
];

export interface CvCheck {
  label: string;
  ok: boolean;
  detail: string;
}

export interface CvAnalysis {
  score: number;
  checks: CvCheck[];
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

// Resultado de la reescritura con IA (Fase 2).
export interface CvImprovement {
  resumenProfesional: string;
  cvMejorado: string;
  cartaPresentacion: string;
  cambiosClave: string[];
}

function normalize(text: string): string {
  // Quita acentos (rango de marcas diacriticas combinantes U+0300-U+036F).
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

// Analisis 100% client-side: sin API, sin costo.
export function analyzeCv(
  cvText: string,
  jobText: string,
  rubro: Rubro
): CvAnalysis {
  const cv = normalize(cvText);
  const words = cv.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const checks: CvCheck[] = [];
  const suggestions: string[] = [];

  // 1. Longitud
  const lengthOk = wordCount >= 150 && wordCount <= 900;
  checks.push({
    label: "Longitud adecuada",
    ok: lengthOk,
    detail: lengthOk
      ? `${wordCount} palabras. Bien.`
      : wordCount < 150
        ? `Solo ${wordCount} palabras. Un CV muy corto parece incompleto.`
        : `${wordCount} palabras. Es largo, trata de que entre en 1 o 2 paginas.`,
  });
  if (!lengthOk && wordCount < 150) {
    suggestions.push("Suma detalle a tu experiencia y formacion: hoy tu CV parece incompleto.");
  }

  // 2. Datos de contacto
  const hasEmail = /@/.test(cv);
  const hasPhone = /(\d[\s-]?){7,}/.test(cvText);
  const contactOk = hasEmail && hasPhone;
  checks.push({
    label: "Datos de contacto",
    ok: contactOk,
    detail: contactOk
      ? "Tenes email y telefono."
      : `Falta ${!hasEmail ? "email" : ""}${!hasEmail && !hasPhone ? " y " : ""}${!hasPhone ? "telefono" : ""}.`,
  });
  if (!contactOk) {
    suggestions.push("Agrega email y telefono visibles arriba de todo. El ATS los busca ahi.");
  }

  // 3. Secciones esperadas
  const foundSections = EXPECTED_SECTIONS.filter((s) =>
    s.patterns.some((p) => cv.includes(normalize(p)))
  );
  const sectionsOk = foundSections.length >= 3;
  const missingSections = EXPECTED_SECTIONS.filter(
    (s) => !foundSections.includes(s)
  ).map((s) => s.label);
  checks.push({
    label: "Secciones estandar",
    ok: sectionsOk,
    detail: sectionsOk
      ? `Detectamos ${foundSections.length} de 4 secciones clave.`
      : `Faltan secciones claras: ${missingSections.join(", ")}.`,
  });
  if (!sectionsOk) {
    suggestions.push(
      `Usa titulos claros de seccion (${missingSections.join(", ")}). El ATS ordena tu CV por esos titulos.`
    );
  }

  // 4. Verbos de accion
  const usedVerbs = ACTION_VERBS.filter((v) => cv.includes(normalize(v)));
  const verbsOk = usedVerbs.length >= 3;
  checks.push({
    label: "Verbos de accion",
    ok: verbsOk,
    detail: verbsOk
      ? `Buen uso de verbos de logro (${usedVerbs.slice(0, 4).join(", ")}...).`
      : "Casi no hay verbos de accion. Suena pasivo.",
  });
  if (!verbsOk) {
    suggestions.push(
      'Empeza cada logro con un verbo: "Coordine...", "Aumente...", "Reduje...". Evita "encargado de".'
    );
  }

  // 5. Logros con numeros
  const hasNumbers = /\d+\s?%|\$\s?\d+|\d+\s?(clientes|ventas|personas|equipos|proyectos)/i.test(
    cvText
  );
  checks.push({
    label: "Logros medibles",
    ok: hasNumbers,
    detail: hasNumbers
      ? "Tenes resultados con numeros. Excelente."
      : "No hay resultados con numeros.",
  });
  if (!hasNumbers) {
    suggestions.push(
      'Cuantifica: en vez de "atendi clientes", pone "atendi +50 clientes por dia".'
    );
  }

  // 6. Match de palabras clave (del aviso si hay, sino del rubro)
  const useJob = jobText.trim().length > 40;
  const keywordSource = useJob ? extractKeywords(jobText) : rubro.keywords;
  const matchedKeywords = keywordSource.filter((k) => cv.includes(normalize(k)));
  const missingKeywords = keywordSource.filter((k) => !cv.includes(normalize(k)));
  const keywordRatio =
    keywordSource.length > 0 ? matchedKeywords.length / keywordSource.length : 1;
  const keywordsOk = keywordRatio >= 0.4;
  checks.push({
    label: useJob ? "Match con el aviso" : `Palabras clave de ${rubro.label}`,
    ok: keywordsOk,
    detail: `${matchedKeywords.length} de ${keywordSource.length} palabras clave presentes.`,
  });
  if (missingKeywords.length > 0) {
    suggestions.push(
      `Suma estas palabras clave si aplican a tu experiencia: ${missingKeywords
        .slice(0, 6)
        .join(", ")}.`
    );
  }

  // Score ponderado
  const passed = checks.filter((c) => c.ok).length;
  const base = (passed / checks.length) * 70;
  const keywordBonus = keywordRatio * 30;
  const score = Math.round(Math.min(100, base + keywordBonus));

  return {
    score,
    checks,
    matchedKeywords,
    missingKeywords,
    suggestions,
  };
}

// Extrae palabras clave candidatas de un aviso de trabajo.
const STOPWORDS = new Set(
  normalize(
    "y o de la el en un una los las que con para por su sus se del al es una este esta como mas mas nos nuestro nuestra sobre entre desde hasta buscamos requisitos tareas ofrecemos empresa puesto vacante zona horario jornada disponibilidad experiencia conocimientos requerimos importante somos ser tener contar area sector"
  ).split(/\s+/)
);

function extractKeywords(jobText: string): string[] {
  const text = normalize(jobText);
  const freq = new Map<string, number>();
  for (const raw of text.split(/[^a-zñ]+/)) {
    if (raw.length < 4 || STOPWORDS.has(raw)) continue;
    freq.set(raw, (freq.get(raw) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([w]) => w);
}
