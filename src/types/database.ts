export type Gender = "masculino" | "femenino" | "no_binario" | "prefiero_no_decir";

export type Localidad =
  | "Aminga"
  | "Anillaco"
  | "Anjullon"
  | "Chuquis"
  | "Las Penas"
  | "Pinchas"
  | "San Pedro"
  | "Otra";

export type NivelEducativo =
  | "primario_incompleto"
  | "primario_completo"
  | "secundario_incompleto"
  | "secundario_completo"
  | "terciario_universitario"
  | "posgrado";

export type SituacionLaboral =
  | "estudia"
  | "trabaja"
  | "estudia_y_trabaja"
  | "desempleado"
  | "jubilado"
  | "otro";

export type UserRole = "student" | "tutor" | "admin";

export type CourseLevel = "inicial" | "intermedio" | "avanzado";

export type EnrollmentStatus = "active" | "paused" | "completed";

export type SubmissionStatus = "pending" | "approved" | "rejected" | "needs_revision";

export type DeviceType = "mobile" | "tablet" | "desktop";

export type FileType = "pdf" | "figma" | "zip" | "link" | "image" | "doc" | "video" | "other";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  dni: string | null;
  birthdate: string | null;
  gender: Gender | null;
  localidad: Localidad | null;
  nivel_educativo: NivelEducativo | null;
  situacion_laboral: SituacionLaboral | null;
  motivacion: string | null;
  avatar_url: string | null;
  phone: string | null;
  onboarding_completed: boolean;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  created_at: string;
}

export interface ToolInfo {
  name: string;
  url: string;
  description: string;
  monthly_price_usd?: number;
}

export interface CareerOutcome {
  title: string;
  description: string;
  salary_range: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  short_description: string;
  cover_url: string | null;
  thumbnail_url: string | null;
  category_id: string | null;
  level: CourseLevel;
  duration_months: number;
  estimated_hours: number;
  hours_per_week_recommended: number;
  target_audience: string | null;
  learning_outcomes: string[];
  prerequisites: string | null;
  tools_free: ToolInfo[];
  tools_paid: ToolInfo[];
  career_outcomes: CareerOutcome[];
  final_project_description: string | null;
  is_published: boolean;
  published_at: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Module {
  id: string;
  course_id: string;
  slug: string;
  order: number;
  title: string;
  description: string;
  estimated_hours: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  slug: string;
  order: number;
  title: string;
  description: string;
  video_url: string | null;
  video_duration_sec: number;
  content_md: string | null;
  exercise_md: string | null;
  is_preview: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonResource {
  id: string;
  lesson_id: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: FileType;
  file_size_kb: number | null;
  order: number;
  created_at: string;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  hours_per_week_target: number | null;
  prior_knowledge: number;
  status: EnrollmentStatus;
  target_completion_date: string | null;
  completed_at: string | null;
  last_lesson_id: string | null;
  last_activity_at: string;
  created_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  enrollment_id: string;
  started_at: string;
  completed_at: string | null;
  watch_time_sec: number;
  last_position_sec: number;
  device_type: DeviceType | null;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  type: "multiple_choice" | "true_false" | "short_answer";
  question: string;
  options?: string[];
  correct_answer: string;
  points: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  module_id: string;
  title: string;
  description: string | null;
  passing_score: number;
  questions: QuizQuestion[];
  max_attempts: number;
  created_at: string;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  enrollment_id: string;
  answers: Record<string, string>[];
  score: number;
  passed: boolean;
  attempt_number: number;
  started_at: string;
  submitted_at: string;
}

export interface Assignment {
  id: string;
  module_id: string | null;
  course_id: string;
  title: string;
  instructions_md: string;
  rubric: Record<string, unknown>;
  is_final_project: boolean;
  created_at: string;
}

export interface Submission {
  id: string;
  user_id: string;
  assignment_id: string;
  enrollment_id: string;
  content_md: string | null;
  submission_url: string | null;
  file_url: string | null;
  status: SubmissionStatus;
  grade: number | null;
  feedback: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  submitted_at: string;
  created_at: string;
}

export interface Certificate {
  id: string;
  user_id: string;
  course_id: string;
  enrollment_id: string;
  hash: string;
  pdf_url: string;
  issued_at: string;
  verification_count: number;
  last_verified_at: string | null;
  created_at: string;
}
