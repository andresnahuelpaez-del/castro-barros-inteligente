// Datos y tipos del Simulador de Entrevistas con IA.
// Reusa los rubros del Optimizador de CV para mantener coherencia.

export type InterviewTypeKey = "general" | "rrhh" | "tecnica";

export interface InterviewType {
  key: InterviewTypeKey;
  label: string;
  description: string;
}

export const INTERVIEW_TYPES: InterviewType[] = [
  {
    key: "general",
    label: "General",
    description: "Las preguntas mas comunes de cualquier entrevista de trabajo.",
  },
  {
    key: "rrhh",
    label: "RRHH / Actitud",
    description: "Trabajo en equipo, motivacion, manejo de conflictos y valores.",
  },
  {
    key: "tecnica",
    label: "Tecnica del rubro",
    description: "Conocimientos y experiencia concretos del rubro que elegiste.",
  },
];

// Un mensaje del chat de la entrevista.
export interface ChatMessage {
  role: "entrevistador" | "candidato";
  text: string;
}

// Informe final de evaluacion (structured output de la IA).
export interface InterviewReport {
  puntaje: number;
  resumen: string;
  fortalezas: string[];
  aMejorar: string[];
  porPregunta: {
    pregunta: string;
    comentario: string;
    respuestaModelo: string;
  }[];
  consejoFinal: string;
}

// Cantidad de preguntas principales antes de cerrar la entrevista.
export const MAX_MAIN_QUESTIONS = 6;
