"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (inView) {
      animate(count, target, { duration: 2, ease: "easeOut" });
    }
  }, [inView, count, target]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${v.toLocaleString("es-AR")}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

const metrics = [
  { target: 1000, prefix: "+", suffix: "", label: "Estudiantes inscritos" },
  { target: 200, prefix: "+", suffix: "", label: "Certificados emitidos" },
  { target: 8, prefix: "", suffix: "", label: "Localidades alcanzadas" },
  { target: 92, prefix: "", suffix: "%", label: "Satisfaccion de alumnos" },
];

export function MetricsSection() {
  return (
    <section className="relative py-20">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-[400px] w-[400px] rounded-full bg-neon-violet blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-neon-green blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border glass-strong p-8 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <div className="text-4xl font-bold text-neon-green sm:text-5xl">
                  <AnimatedCounter
                    target={metric.target}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </div>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
