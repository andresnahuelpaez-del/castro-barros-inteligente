import type { NextRequest } from "next/server";

/**
 * URL pública canónica para links y QRs (certificados, verificación).
 * Prioriza el dominio de producción para que un QR nunca quede apuntando a
 * localhost o a un preview: NEXT_PUBLIC_APP_URL > dominio de producción de
 * Vercel > origin de la request (fallback local).
 */
export function getPublicBaseUrl(request: NextRequest): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return request.nextUrl.origin;
}
