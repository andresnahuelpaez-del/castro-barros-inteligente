"use client";

import { motion } from "framer-motion";

export function DepartmentSilhouette({ className }: { className?: string }) {
  // TODO: Reemplazar con SVG real del Departamento Castro Barros
  // Este es un placeholder con forma similar al departamento
  return (
    <motion.svg
      viewBox="0 0 400 500"
      className={className}
      initial="hidden"
      animate="visible"
      aria-label="Silueta del Departamento Castro Barros"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d="M 180 40 L 260 60 L 310 120 L 340 200 L 350 280 L 330 360 L 280 420 L 220 460 L 160 450 L 100 410 L 60 340 L 50 260 L 70 180 L 110 110 L 150 60 Z"
        fill="none"
        stroke="#A855F7"
        strokeWidth="2"
        filter="url(#glow)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 2.5, ease: "easeInOut" },
          },
        }}
      />
      <motion.path
        d="M 180 40 L 260 60 L 310 120 L 340 200 L 350 280 L 330 360 L 280 420 L 220 460 L 160 450 L 100 410 L 60 340 L 50 260 L 70 180 L 110 110 L 150 60 Z"
        fill="rgba(168, 85, 247, 0.05)"
        stroke="none"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: [0, 0.08, 0.04, 0.08],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2.5,
            },
          },
        }}
      />
    </motion.svg>
  );
}
