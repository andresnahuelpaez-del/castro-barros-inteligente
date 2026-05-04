// Mock data para visualizar la estructura de la plataforma sin Supabase
// TODO: Eliminar cuando se conecte Supabase

export const MOCK_MODULES = [
  {
    id: "m1",
    title: "Módulo 1: Introducción",
    order: 1,
    estimatedHours: 4,
    lessons: [
      { id: "l1", slug: "leccion-1", title: "Lección 1: Bienvenida al curso", order: 1, durationMin: 12, completed: true },
      { id: "l2", slug: "leccion-2", title: "Lección 2: Conceptos fundamentales", order: 2, durationMin: 15, completed: true },
      { id: "l3", slug: "leccion-3", title: "Lección 3: Primeros pasos", order: 3, durationMin: 18, completed: false },
    ],
  },
  {
    id: "m2",
    title: "Módulo 2: Herramientas esenciales",
    order: 2,
    estimatedHours: 6,
    lessons: [
      { id: "l4", slug: "leccion-4", title: "Lección 4: Configuración del entorno", order: 1, durationMin: 20, completed: false },
      { id: "l5", slug: "leccion-5", title: "Lección 5: Herramienta principal", order: 2, durationMin: 18, completed: false },
      { id: "l6", slug: "leccion-6", title: "Lección 6: Práctica guiada", order: 3, durationMin: 25, completed: false },
    ],
  },
  {
    id: "m3",
    title: "Módulo 3: Aplicación práctica",
    order: 3,
    estimatedHours: 8,
    lessons: [
      { id: "l7", slug: "leccion-7", title: "Lección 7: Caso real #1", order: 1, durationMin: 20, completed: false },
      { id: "l8", slug: "leccion-8", title: "Lección 8: Caso real #2", order: 2, durationMin: 22, completed: false },
      { id: "l9", slug: "leccion-9", title: "Lección 9: Ejercicio integrador", order: 3, durationMin: 15, completed: false },
    ],
  },
  {
    id: "m4",
    title: "Módulo 4: Proyecto final",
    order: 4,
    estimatedHours: 6,
    lessons: [
      { id: "l10", slug: "leccion-10", title: "Lección 10: Definí tu proyecto", order: 1, durationMin: 10, completed: false },
      { id: "l11", slug: "leccion-11", title: "Lección 11: Desarrollo guiado", order: 2, durationMin: 30, completed: false },
      { id: "l12", slug: "leccion-12", title: "Lección 12: Entrega y evaluación", order: 3, durationMin: 8, completed: false },
    ],
  },
];

export const MOCK_QUIZ = [
  {
    question: "Pregunta de ejemplo 1",
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correctIndex: 1,
  },
  {
    question: "Pregunta de ejemplo 2",
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correctIndex: 0,
  },
  {
    question: "Pregunta de ejemplo 3",
    options: ["Opción A", "Opción B", "Opción C", "Opción D"],
    correctIndex: 2,
  },
];
