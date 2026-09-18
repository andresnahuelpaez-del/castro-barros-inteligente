import { NextRequest, NextResponse } from "next/server";
import {
  renderCertificatePDF,
  renderCertificatePNG,
} from "@/lib/certificate-render";
import { COURSES, COURSE_COMPETENCIES } from "@/lib/constants";
import { getPublicBaseUrl } from "@/lib/site-url";

export const runtime = "nodejs";
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name") || "Maria Lopez";
  const courseSlug = searchParams.get("course") || "gemelos-digitales-con-ia";

  const course = COURSES.find((c) => c.slug === courseSlug);
  // Los parámetros explícitos tienen prioridad (certificados de demo sin slug)
  const courseTitle =
    searchParams.get("title") || course?.title || "Gemelos Digitales con IA";
  const competency =
    searchParams.get("competency") ||
    COURSE_COMPETENCIES[courseSlug] ||
    "aplicación de herramientas de Inteligencia Artificial en el ámbito profesional";

  const certificateCode = searchParams.get("code") || "CERT-CB-2026-00142";
  const verificationHash = certificateCode;
  const baseUrl = getPublicBaseUrl(request);
  const verificationUrl = `${baseUrl}/verificar/${verificationHash}`;

  // format=png|image => descarga como imagen HD; por defecto PDF.
  const format = (searchParams.get("format") || "pdf").toLowerCase();
  const asImage = format === "png" || format === "image" || format === "imagen";
  // download=1 fuerza descarga (attachment) en vez de abrir en el navegador.
  const asDownload = searchParams.get("download") === "1";

  const data = {
    studentName: name,
    courseTitle,
    competencyDescription: competency,
    issuedDate: new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    verificationHash,
    verificationUrl,
    certificateCode,
  };

  try {
    if (asImage) {
      const pngBytes = await renderCertificatePNG(data);
      return new NextResponse(Buffer.from(pngBytes), {
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": `${asDownload ? "attachment" : "inline"}; filename="certificado-${courseSlug}.png"`,
        },
      });
    }

    const pdfBytes = await renderCertificatePDF(data);
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${asDownload ? "attachment" : "inline"}; filename="certificado-${courseSlug}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Error al generar el certificado (preview):", err);
    return new NextResponse("No se pudo generar el certificado.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
