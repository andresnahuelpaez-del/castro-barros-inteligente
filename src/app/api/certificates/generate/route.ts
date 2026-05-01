import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
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
      { error: "No estas inscrito en este curso" },
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
        error: "Tenes que completar todas las lecciones para obtener el certificado",
        completed: completedIds.size,
        total: allLessonIds.length,
      },
      { status: 400 }
    );
  }

  // Check if certificate already exists
  const { data: existing } = await supabase
    .from("certificates")
    .select("id, verification_hash")
    .eq("user_id", user.id)
    .eq("course_id", courseId)
    .single();

  if (existing) {
    return NextResponse.json({
      message: "Ya tenes el certificado de este curso",
      certificateId: existing.id,
      verificationHash: existing.verification_hash,
    });
  }

  // Generate certificate
  const verificationHash = crypto
    .createHash("sha256")
    .update(`${user.id}-${courseId}-${Date.now()}`)
    .digest("hex");

  const { data: certificate, error: insertError } = await supabase
    .from("certificates")
    .insert({
      user_id: user.id,
      course_id: courseId,
      verification_hash: verificationHash,
      issued_at: new Date().toISOString(),
    })
    .select("id, verification_hash")
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
    verificationHash: certificate.verification_hash,
  });
}
