"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Referencia mínima de cada lección, en orden, para calcular desbloqueo y progreso.
export interface LessonRef {
  slug: string;
  moduleId: string;
  hasQuiz: boolean;
}

interface StoredProgress {
  completed: string[]; // slugs de lecciones completadas
  passed: string[]; // slugs de lecciones con quiz aprobado
}

interface ModuleProgress {
  completed: number;
  total: number;
  percent: number;
  isComplete: boolean;
}

interface CourseProgressValue {
  hydrated: boolean;
  lessons: LessonRef[];
  totalLessons: number;
  completedCount: number;
  coursePercent: number;
  isCourseComplete: boolean;
  isCompleted: (slug: string) => boolean;
  isQuizPassed: (slug: string) => boolean;
  isUnlocked: (slug: string) => boolean;
  markComplete: (slug: string) => void;
  markQuizPassed: (slug: string) => void;
  moduleProgress: (moduleId: string) => ModuleProgress;
  reset: () => void;
}

const CourseProgressContext = createContext<CourseProgressValue | null>(null);

const STORAGE_PREFIX = "cbi:progress:v1:";

export function CourseProgressProvider({
  courseSlug,
  lessons,
  children,
}: {
  courseSlug: string;
  lessons: LessonRef[];
  children: React.ReactNode;
}) {
  const storageKey = STORAGE_PREFIX + courseSlug;
  // Estado inicial vacío: coincide con el render del servidor (evita hydration mismatch).
  const [state, setState] = useState<StoredProgress>({ completed: [], passed: [] });
  const [hydrated, setHydrated] = useState(false);

  // Cargar desde localStorage una vez montado en el cliente.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredProgress;
        setState({
          completed: Array.isArray(parsed.completed) ? parsed.completed : [],
          passed: Array.isArray(parsed.passed) ? parsed.passed : [],
        });
      }
    } catch {
      // localStorage no disponible o dato corrupto: seguimos con estado vacío.
    }
    setHydrated(true);
  }, [storageKey]);

  // Persistir cambios (solo después de hidratar, para no pisar con el estado vacío).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // Ignorar errores de escritura (modo privado, cuota, etc.)
    }
  }, [state, hydrated, storageKey]);

  const completedSet = useMemo(() => new Set(state.completed), [state.completed]);
  const passedSet = useMemo(() => new Set(state.passed), [state.passed]);

  const isCompleted = useCallback(
    (slug: string) => completedSet.has(slug),
    [completedSet]
  );
  const isQuizPassed = useCallback(
    (slug: string) => passedSet.has(slug),
    [passedSet]
  );

  // Desbloqueo secuencial: la primera lección siempre; el resto requiere la anterior completa.
  const isUnlocked = useCallback(
    (slug: string) => {
      const idx = lessons.findIndex((l) => l.slug === slug);
      if (idx <= 0) return true;
      const prev = lessons[idx - 1];
      return completedSet.has(prev.slug);
    },
    [lessons, completedSet]
  );

  const markComplete = useCallback((slug: string) => {
    setState((prev) =>
      prev.completed.includes(slug)
        ? prev
        : { ...prev, completed: [...prev.completed, slug] }
    );
  }, []);

  const markQuizPassed = useCallback((slug: string) => {
    setState((prev) =>
      prev.passed.includes(slug)
        ? prev
        : { ...prev, passed: [...prev.passed, slug] }
    );
  }, []);

  const reset = useCallback(() => {
    setState({ completed: [], passed: [] });
  }, []);

  const moduleProgress = useCallback(
    (moduleId: string): ModuleProgress => {
      const mLessons = lessons.filter((l) => l.moduleId === moduleId);
      const total = mLessons.length;
      const completed = mLessons.filter((l) => completedSet.has(l.slug)).length;
      const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
      return { completed, total, percent, isComplete: total > 0 && completed === total };
    },
    [lessons, completedSet]
  );

  const totalLessons = lessons.length;
  const completedCount = lessons.filter((l) => completedSet.has(l.slug)).length;
  const coursePercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isCourseComplete = totalLessons > 0 && completedCount === totalLessons;

  const value: CourseProgressValue = {
    hydrated,
    lessons,
    totalLessons,
    completedCount,
    coursePercent,
    isCourseComplete,
    isCompleted,
    isQuizPassed,
    isUnlocked,
    markComplete,
    markQuizPassed,
    moduleProgress,
    reset,
  };

  return (
    <CourseProgressContext.Provider value={value}>
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const ctx = useContext(CourseProgressContext);
  if (!ctx) {
    throw new Error(
      "useCourseProgress debe usarse dentro de <CourseProgressProvider>"
    );
  }
  return ctx;
}

// Lectura suelta del progreso de un curso desde localStorage, sin necesidad del
// provider. Útil en listados (Mis cursos, panel) donde cada tarjeta es un curso.
export function useStoredProgress(courseSlug: string) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_PREFIX + courseSlug);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredProgress;
        setCompleted(Array.isArray(parsed.completed) ? parsed.completed : []);
      }
    } catch {
      // ignorar
    }
    setHydrated(true);
  }, [courseSlug]);

  const completedSet = useMemo(() => new Set(completed), [completed]);

  return {
    hydrated,
    completedSet,
    completedCount: completed.length,
    firstIncompleteSlug: (orderedSlugs: string[]) =>
      orderedSlugs.find((s) => !completedSet.has(s)) ?? null,
  };
}
