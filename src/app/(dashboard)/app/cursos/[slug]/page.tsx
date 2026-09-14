import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COURSES } from "@/lib/constants";
import { MOCK_MODULES } from "@/lib/mock-course-data";
import { CourseOverview } from "@/components/course/course-overview";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  return { title: course ? course.title : `Curso: ${slug}` };
}

export default async function CourseViewPage({ params }: PageProps) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);

  if (!course) notFound();

  return (
    <CourseOverview
      courseSlug={slug}
      courseId={course.slug}
      courseTitle={course.title}
      shortDescription={course.shortDescription}
      durationMonths={course.durationMonths}
      modules={MOCK_MODULES}
    />
  );
}
