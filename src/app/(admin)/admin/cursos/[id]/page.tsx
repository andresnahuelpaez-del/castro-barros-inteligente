import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return { title: `Admin - Editar curso ${id}` };
}

// TODO: Reactivar queries Supabase cuando se conecte
export default async function AdminCourseEditPage({ params }: PageProps) {
  return (
    <div>
      <Link
        href="/admin/cursos"
        className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-white transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a cursos
      </Link>

      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-foreground-secondary">
          Conectá Supabase para poder editar cursos.
        </p>
      </div>
    </div>
  );
}
