import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { generateCertificatePDF } from "@/lib/certificate-pdf";
import { COURSE_COMPETENCIES } from "@/lib/constants";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { courseId } = body;

  if (!courseId) {
    return NextResponse.json(
      { error: "courseId es requerido" },
      { status: 400 }
    );
  }

  // Verify enrollment exists and is active
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("id, course_id")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single();

  if (!enrollment) {
    return NextResponse.json(
      { error: "No estás inscripto en este curso" },
      { status: 403 }
    );
  }

  // Check if all lessons are completed
  const { data: modules } = await supabase
    .from("modules")
    .select("lessons(id)")
    .eq("course_id", courseId);

  const allLessonIds =
    modules?.flatMap((m) =>
      ((m.lessons || []) as { id: string }[]).map((l) => l.id)
    ) || [];

  if (allLessonIds.length === 0) {
    return NextResponse.json(
      { error: "Este curso no tiene lecciones" },
      { status: 400 }
    );
  }

  const { data: completedLessons } = await supabase
    .from("lesson_progress")
    .select("lesson_id")
    .eq("user_id", user.id)
    .eq("enrollment_id", enrollment.id)
    .not("completed_at", "is", null);

  const completedIds = new Set(
    completedLessons?.map((l) => l.lesson_id) || []
  );
  const allCompleted = allLessonIds.every((id) => completedIds.has(id));

  if (!allCompleted) {
    return NextResponse.json(
      {
        error:
          "Tenés que completar todas las lecciones para obtener el certificado",
        completed: completedIds.size,
        total: allLessonIds.length,
      },
      { status: 400 }
    );
  }

  // Check if certificate already exists
  const { data: existing } = await supabase
    .from("certificates")
    .select("id, hash, pdf_url")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single();

  if (existing) {
    return NextResponse.json({
      message: "Ya tenés el certificado de este curso",
      certificateId: existing.id,
      verificationHash: existing.hash,
      pdfUrl: existing.pdf_url,
    });
  }

  // Get course and profile data
  const { data: course } = await supabase
    .from("courses")
    .select("title, slug")
    .eq("id", courseId)
    .single();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const verificationHash = crypto
    .createHash("sha256")
    .update(`${user.id}-${courseId}-${Date.now()}`)
    .digest("hex");

  const courseSlug = course?.slug || "";
  const baseUrl = request.nextUrl.origin;
  const verificationUrl = `${baseUrl}/verificar/${verificationHash}`;

  // Generate the PDF
  const pdfBytes = await generateCertificatePDF({
    studentName: profile?.full_name || "Estudiante",
    courseTitle: course?.title || "Curso",
    competencyDescription:
      COURSE_COMPETENCIES[courseSlug] ||
      "aplicación de herramientas de Inteligencia Artificial en el ámbito profesional",
    issuedDate: new Date().toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    verificationHash,
    verificationUrl,
    certificateCode: `CERT-CB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(5, "0")}`,
  });

  // Upload PDF to Supabase Storage
  const fileName = `${user.id}/${courseSlug}-${verificationHash.slice(0, 8)}.pdf`;
  const { error: uploadError } = await supabase.storage
    .from("certificates")
    .upload(fileName, pdfBytes, {
      contentType: "application/pdf",
      upsert: false,
    });

  let pdfUrl = "";
  if (!uploadError) {
    const { data: publicUrl } = supabase.storage
      .from("certificates")
      .getPublicUrl(fileName);
    pdfUrl = publicUrl.publicUrl;
  }

  // Insert certificate record
  const { data: certificate, error: insertError } = await supabase
    .from("certificates")
    .insert({
      user_id: user.id,
      course_id: courseId,
      enrollment_id: enrollment.id,
      hash: verificationHash,
      pdf_url: pdfUrl,
      issued_at: new Date().toISOString(),
    })
    .select("id, hash")
    .single();

  if (insertError) {
    return NextResponse.json(
      { error: "Error al generar el certificado" },
      { status: 500 }
    );
  }

  // Update enrollment status
  await supabase
    .from("enrollments")
    .update({ status: "completed" })
    .eq("id", enrollment.id);

  return NextResponse.json({
    message: "Certificado generado exitosamente",
    certificateId: certificate.id,
    verificationHash: certificate.hash,
    pdfUrl,
  });
}
