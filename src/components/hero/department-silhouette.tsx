"use client";

import { motion } from "framer-motion";

// Silueta real de la Provincia de La Rioja, Argentina
// Extraída del mapa oficial SVG (IGN) y simplificada
const LA_RIOJA_PATH =
  "M 349.6,446.6 L 365.9,371.4 L 372.3,303.5 L 351.3,243.8 L 311.4,206.5 L 307.5,207.3 L 303.9,205.5 L 299.9,204.7 L 296.4,203.2 L 297.8,199.6 L 299.4,196 L 301.6,193.1 L 300.5,190 L 289.1,176.1 L 286,169.3 L 286.7,165.4 L 251.5,144.6 L 208,154.7 L 189,150.3 L 185.2,151.9 L 175.8,156.8 L 174,153.1 L 173,149.8 L 170,147.1 L 167.5,139.3 L 167.9,135.5 L 168.2,132.7 L 160.7,132.4 L 157.4,133.5 L 154,135.4 L 151.1,133.8 L 149,130.6 L 146,128.9 L 142.5,127.8 L 138.8,127.2 L 135.8,126.9 L 135.7,122.9 L 132.3,122.4 L 128.4,121.3 L 125.2,122.3 L 122.4,120.2 L 123.5,116.9 L 124.1,113.8 L 124.6,110.8 L 124.6,107.8 L 123,105.2 L 121.3,103.2 L 118.6,101.8 L 118,98.8 L 75.3,98.1 L 67,101.4 L 66.2,105.5 L 65.4,109.6 L 62.6,112.3 L 61.3,115.9 L 58.1,117.2 L 54.7,118.3 L 53.2,121.8 L 51.2,125.3 L 49.8,128.4 L 49.8,132.5 L 46.9,135.2 L 43.5,137.5 L 39.4,140 L 24.3,153.8 L 25.3,156.8 L 30.5,158.8 L 35.8,159.3 L 40.5,163.2 L 45.3,162.5 L 59.8,180.2 L 62,185.4 L 64,190.7 L 80.5,211.5 L 81.7,217.1 L 84.5,222.5 L 82.9,227.3 L 77.7,229.1 L 77.3,233.9 L 78.2,239.6 L 79.7,243.9 L 78.3,249.6 L 77.1,256.5 L 78.8,260.6 L 74.8,265.1 L 74.2,269.4 L 75,274 L 77.1,277.4 L 82,277.3 L 86.5,274.5 L 91.8,276.5 L 98.1,276.9 L 103.6,275.5 L 108.3,278.5 L 113.4,278.4 L 119.4,279.1 L 124.9,280.5 L 133.4,285.5 L 137.6,287.8 L 140.3,292.2 L 144.6,295.4 L 147.8,299.2 L 152.9,301.4 L 155.4,304.9 L 159.6,309.4 L 163.9,312.7 L 167.1,316.3 L 170.7,319.6 L 175.5,322.2 L 178.7,326 L 182.8,328.7 L 187.2,332.1 L 190.8,337.5 L 194.4,341.4 L 197.4,346.3 L 197.4,350.9 L 200.6,354.8 L 204.7,357.6 L 207.8,361.4 L 212.9,366.1 L 218.2,370.2 L 221.9,374.8 L 225,379.1 L 230.5,384 L 232.8,389.1 L 235.2,393.5 L 237.7,397.8 L 237.4,446.8 L 238.7,452.9 L 240.1,457.6 L 240.6,462.9 L 245.4,468.5 L 250.2,472.8 L 257.8,477.9 L 257.7,483 L 262.1,489.4 L 267.1,492.8 L 271.1,498 L 274.4,501.3 L 278.7,503.4 L 283.1,503.8 L 302,504 L 306.2,502.3 L 310.7,503.1 L 314.7,504.3 L 318.4,503.5 L 322.4,504.2 L 324.8,502.8 L 328.9,500.3 L 332.6,497.8 L 337,497.8 L 341.7,497.8 L 346.2,497.1 L 349.4,466.5 Z";

export function DepartmentSilhouette({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 400 600"
      className={className}
      initial="hidden"
      animate="visible"
      aria-label="Silueta de la Provincia de La Rioja"
    >
      <defs>
        {/* Glow suave — no agresivo */}
        <filter id="silhouette-glow">
          <feGaussianBlur stdDeviation="6" result="blur1" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Glow externo más difuso para halo */}
        <filter id="silhouette-halo">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* Capa 1: Halo difuso de fondo — da profundidad */}
      <motion.path
        d={LA_RIOJA_PATH}
        fill="none"
        stroke="#A855F7"
        strokeWidth="6"
        filter="url(#silhouette-halo)"
        opacity={0.15}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: [0.1, 0.18, 0.1],
            transition: {
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            },
          },
        }}
      />

      {/* Capa 2: Contorno principal con trazo animado */}
      <motion.path
        d={LA_RIOJA_PATH}
        fill="none"
        stroke="#A855F7"
        strokeWidth="2.5"
        strokeLinejoin="round"
        filter="url(#silhouette-glow)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 3, ease: "easeInOut" },
          },
        }}
      />

      {/* Capa 3: Relleno con pulso sutil */}
      <motion.path
        d={LA_RIOJA_PATH}
        fill="rgba(168, 85, 247, 0.03)"
        stroke="none"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: [0, 0.06, 0.02, 0.06],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 3,
              ease: "easeInOut",
            },
          },
        }}
      />

      {/* Capa 4: Segundo contorno más fino — efecto "scan line" que recorre la silueta */}
      <motion.path
        d={LA_RIOJA_PATH}
        fill="none"
        stroke="#C084FC"
        strokeWidth="1"
        strokeDasharray="20 580"
        strokeLinejoin="round"
        opacity={0.4}
        variants={{
          hidden: { strokeDashoffset: 0 },
          visible: {
            strokeDashoffset: [-600, 0],
            transition: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
              delay: 3,
            },
          },
        }}
      />
    </motion.svg>
  );
}
