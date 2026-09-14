// Datos de ejemplo para la experiencia de cursado sin backend.
// El progreso real (completado / quiz aprobado) NO vive acá: lo maneja
// CourseProgressProvider en el navegador. Cuando se conecte Supabase, estos
// datos y el quiz vienen de la base y el resto de la UI no cambia.
// TODO: Eliminar cuando se conecte Supabase.

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "tip"; text: string };

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  order: number;
  durationMin: number;
  videoUrl: string | null;
}

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  estimatedHours: number;
  lessons: Lesson[];
}

// Porcentaje mínimo de respuestas correctas para aprobar un quiz.
export const QUIZ_PASS_THRESHOLD = 70;

export const MOCK_MODULES: CourseModule[] = [
  {
    id: "m1",
    title: "Módulo 1: Introducción",
    order: 1,
    estimatedHours: 4,
    lessons: [
      { id: "l1", slug: "leccion-1", title: "Bienvenida al curso", order: 1, durationMin: 12, videoUrl: null },
      { id: "l2", slug: "leccion-2", title: "Conceptos fundamentales", order: 2, durationMin: 15, videoUrl: null },
      { id: "l3", slug: "leccion-3", title: "Primeros pasos", order: 3, durationMin: 18, videoUrl: null },
    ],
  },
  {
    id: "m2",
    title: "Módulo 2: Herramientas esenciales",
    order: 2,
    estimatedHours: 6,
    lessons: [
      { id: "l4", slug: "leccion-4", title: "Configuración del entorno", order: 1, durationMin: 20, videoUrl: null },
      { id: "l5", slug: "leccion-5", title: "La herramienta principal", order: 2, durationMin: 18, videoUrl: null },
      { id: "l6", slug: "leccion-6", title: "Práctica guiada", order: 3, durationMin: 25, videoUrl: null },
    ],
  },
  {
    id: "m3",
    title: "Módulo 3: Aplicación práctica",
    order: 3,
    estimatedHours: 8,
    lessons: [
      { id: "l7", slug: "leccion-7", title: "Caso real #1", order: 1, durationMin: 20, videoUrl: null },
      { id: "l8", slug: "leccion-8", title: "Caso real #2", order: 2, durationMin: 22, videoUrl: null },
      { id: "l9", slug: "leccion-9", title: "Ejercicio integrador", order: 3, durationMin: 15, videoUrl: null },
    ],
  },
  {
    id: "m4",
    title: "Módulo 4: Proyecto final",
    order: 4,
    estimatedHours: 6,
    lessons: [
      { id: "l10", slug: "leccion-10", title: "Definí tu proyecto", order: 1, durationMin: 10, videoUrl: null },
      { id: "l11", slug: "leccion-11", title: "Desarrollo guiado", order: 2, durationMin: 30, videoUrl: null },
      { id: "l12", slug: "leccion-12", title: "Entrega y evaluación", order: 3, durationMin: 8, videoUrl: null },
    ],
  },
];

// Lista plana ordenada, útil para navegación y cálculo de progreso.
export const ALL_LESSONS = MOCK_MODULES.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
);

// Contenido de ejemplo de una lección. Es genérico a propósito (aún no hay
// contenido real cargado), pero está estructurado como una clase de verdad.
export function getLessonContent(lesson: Lesson): ContentBlock[] {
  return [
    {
      type: "paragraph",
      text: `En esta clase, "${lesson.title}", vamos a ir paso a paso y sin dar nada por sabido. La idea es que al terminar puedas aplicar lo visto en un caso concreto, aunque sea la primera vez que tocás el tema.`,
    },
    { type: "heading", text: "Qué vas a aprender" },
    {
      type: "list",
      items: [
        "Los conceptos clave explicados en palabras simples.",
        "Cómo se usa en una situación real de trabajo.",
        "Los errores más comunes y cómo evitarlos.",
      ],
    },
    { type: "heading", text: "Desarrollo" },
    {
      type: "paragraph",
      text: "Primero repasamos la idea general para tener el mapa completo. Después bajamos a la práctica: seguí el video mientras vas replicando cada paso en tu propia computadora. No hace falta memorizar nada; lo importante es entender el porqué de cada decisión.",
    },
    {
      type: "tip",
      text: "Consejo: pausá el video cada vez que quieras probar algo por tu cuenta. Aprender haciendo rinde mucho más que solo mirar.",
    },
    { type: "heading", text: "Puntos clave para recordar" },
    {
      type: "list",
      items: [
        "Tomate tu tiempo: podés repetir la lección las veces que necesites.",
        "Al final hay un quiz corto para confirmar que quedó claro.",
        "Cuando completes la lección, se desbloquea la siguiente.",
      ],
    },
  ];
}

// Quiz de ejemplo por lección. Genérico pero con respuestas reales.
export function getLessonQuiz(lesson: Lesson): QuizQuestion[] {
  return [
    {
      question: "¿Cuál es la mejor forma de aprovechar esta lección?",
      options: [
        "Mirar el video sin practicar nada",
        "Seguir el video practicando en paralelo y repasar lo que no quede claro",
        "Saltear directamente al quiz",
        "Memorizar todo de una sola vez",
      ],
      correctIndex: 1,
    },
    {
      question: "Si algo no se entiende a la primera, lo recomendable es:",
      options: [
        "Abandonar la lección",
        "Avanzar igual sin entender",
        "Volver a ver la parte que costó, sin apuro",
        "Esperar a que aparezca en el examen",
      ],
      correctIndex: 2,
    },
    {
      question: "¿Qué pasa cuando completás una lección?",
      options: [
        "Se desbloquea la siguiente lección",
        "Se borra tu progreso",
        "Termina el curso automáticamente",
        "No pasa nada",
      ],
      correctIndex: 0,
    },
  ];
}
