import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseEditor } from "./course-editor";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Admin - Editar curso ${id}` };
}

export default async function AdminCourseEditPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", id)
    .single();

  if (!course) notFound();

  const { data: modules } = await supabase
    .from("modules")
    .select("*, lessons(id, title, slug, order, video_url, video_duration_sec)")
    .eq("course_id", id)
    .order("order", { ascending: true });

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .order("name");

  return (
    <div>
      <Link
        href="/admin/cursos"
        className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a cursos
      </Link>

      <CourseEditor
        course={course}
        modules={modules || []}
        categories={categories || []}
      />
    </div>
  );
}
