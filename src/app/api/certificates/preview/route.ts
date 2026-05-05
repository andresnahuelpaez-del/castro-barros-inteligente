import { NextRequest, NextResponse } from "next/server";
import { generateCertificatePDF } from "@/lib/certificate-pdf";
import { COURSES, COURSE_COMPETENCIES } from "@/lib/constants";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get("name") || "Maria Lopez";
  const courseSlug = searchParams.get("course") || "ia-para-tu-trabajo";

  const course = COURSES.find((c) => c.slug === courseSlug);
  const courseTitle = course?.title || "IA para tu Trabajo";
  const competency =
    COURSE_COMPETENCIES[courseSlug] ||
    "aplicación de herramientas de Inteligencia Artificial en el ámbito profesional";

  const verificationHash = "a1b2c3d4e5f6789012345678abcdef90";
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
    certificateCode: "CERT-CB-2026-00142",
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="certificado-${courseSlug}.pdf"`,
    },
  });
}
