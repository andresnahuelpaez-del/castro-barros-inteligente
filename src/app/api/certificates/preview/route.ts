import { NextRequest, NextResponse } from "next/server";
import { generateCertificatePDF } from "@/lib/certificate-pdf";
import { COURSES, COURSE_COMPETENCIES } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name") || "Maria Lopez";
  const courseSlug = searchParams.get("course") || "ia-para-tu-trabajo";

  const course = COURSES.find((c) => c.slug === courseSlug);
  // Los parámetros explícitos tienen prioridad (certificados de demo sin slug)
  const courseTitle =
    searchParams.get("title") || course?.title || "IA para tu Trabajo";
  const competency =
    searchParams.get("competency") ||
    COURSE_COMPETENCIES[courseSlug] ||
    "aplicación de herramientas de Inteligencia Artificial en el ámbito profesional";

  const certificateCode = searchParams.get("code") || "CERT-CB-2026-00142";
  const verificationHash = certificateCode;
  const baseUrl = request.nextUrl.origin;
  const verificationUrl = `${baseUrl}/verificar/${verificationHash}`;

  const pdfBytes = await generateCertificatePDF({
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
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="certificado-${courseSlug}.pdf"`,
    },
  });
}
