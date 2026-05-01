import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { NewCourseForm } from "./new-course-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin - Nuevo curso",
};

export default function AdminNewCoursePage() {
  return (
    <div>
      <Link
        href="/admin/cursos"
        className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a cursos
      </Link>

      <h1 className="text-3xl font-bold text-white mb-8">Crear nuevo curso</h1>

      <NewCourseForm />
    </div>
  );
}
