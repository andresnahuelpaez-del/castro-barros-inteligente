/**
 * Registro de certificados de DEMO.
 *
 * Fuente única de verdad mientras no esté conectado Supabase. Tanto la página
 * pública de verificación (`/verificar/[hash]`) como la descarga del PDF leen
 * de acá, de modo que los datos siempre coincidan.
 *
 * Cuando se conecte Supabase, reemplazar `getDemoCertificate` por una consulta
 * a la tabla `certificates` por `hash`.
 */

export interface DemoCertificate {
  /** Código público = valor del QR y de la URL de verificación */
  code: string;
  studentName: string;
  courseTitle: string;
  /** slug de curso si existe en COURSES; puede ser null para cursos de demo */
  courseSlug: string | null;
  competency: string;
  /** ISO date */
  issuedAt: string;
  durationMonths: number;
}

export const DEMO_CERTIFICATES: Record<string, DemoCertificate> = {
  "CBI-2026-000137": {
    code: "CBI-2026-000137",
    studentName: "Ledesma Julieta Antonella",
    courseTitle: "Inteligencia Artificial para PyMEs",
    courseSlug: null,
    competency:
      "aplicación profesional de herramientas de Inteligencia Artificial para la automatización de procesos, productividad y gestión de pequeñas y medianas empresas",
    issuedAt: "2026-09-09T00:00:00Z",
    durationMonths: 4,
  },
};

export function getDemoCertificate(code: string): DemoCertificate | null {
  return DEMO_CERTIFICATES[code] ?? null;
}
