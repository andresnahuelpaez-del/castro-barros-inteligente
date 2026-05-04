"use client";

import { motion } from "framer-motion";

interface Tool {
  name: string;
  color: string;
  bg: string;
  border: string;
  logo: React.ReactNode;
}

const tools: Tool[] = [
  {
    name: "Claude",
    color: "text-[#D4A574]",
    bg: "bg-[#D4A574]/10",
    border: "border-[#D4A574]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M16.5 3.5C13 3.5 11 6 11 8.5C11 11 9 13.5 5.5 13.5" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 3.5C11 3.5 13 6 13 8.5C13 11 15 13.5 18.5 13.5" stroke="#D4A574" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="17" r="3.5" stroke="#D4A574" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "ChatGPT",
    color: "text-[#10A37F]",
    bg: "bg-[#10A37F]/10",
    border: "border-[#10A37F]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#10A37F" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8M8 8l8 8M16 8l-8 8" stroke="#10A37F" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Gemini",
    color: "text-[#4285F4]",
    bg: "bg-[#4285F4]/10",
    border: "border-[#4285F4]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M12 2C12 2 4 8 4 14a8 8 0 0016 0c0-6-8-12-8-12z" fill="url(#gemini)" />
        <defs>
          <linearGradient id="gemini" x1="4" y1="2" x2="20" y2="22">
            <stop stopColor="#4285F4" />
            <stop offset="1" stopColor="#A855F7" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Cursor",
    color: "text-white",
    bg: "bg-white/8",
    border: "border-white/15",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M5 3l14 9-6 2-3 7L5 3z" fill="white" fillOpacity="0.9" />
      </svg>
    ),
  },
  {
    name: "v0",
    color: "text-white",
    bg: "bg-white/8",
    border: "border-white/15",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M6 6l6 12 6-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="19" cy="7" r="2.5" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    name: "Lovable",
    color: "text-[#FF6B6B]",
    bg: "bg-[#FF6B6B]/10",
    border: "border-[#FF6B6B]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M12 21C12 21 3 14 3 8.5C3 5.42 5.42 3 8.5 3c1.74 0 3.41.81 4.5 2.09A6.04 6.04 0 0115.5 3C18.58 3 21 5.42 21 8.5 21 14 12 21 12 21z" fill="#FF6B6B" />
      </svg>
    ),
  },
  {
    name: "Figma",
    color: "text-[#A259FF]",
    bg: "bg-[#A259FF]/10",
    border: "border-[#A259FF]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <rect x="6" y="3" width="5" height="6" rx="2.5" fill="#F24E1E" />
        <rect x="13" y="3" width="5" height="6" rx="2.5" fill="#FF7262" />
        <rect x="6" y="9" width="5" height="6" rx="2.5" fill="#A259FF" />
        <circle cx="15.5" cy="12" r="2.5" fill="#1ABCFE" />
        <rect x="6" y="15" width="5" height="6" rx="2.5" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    name: "Canva",
    color: "text-[#00C4CC]",
    bg: "bg-[#00C4CC]/10",
    border: "border-[#00C4CC]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <circle cx="12" cy="12" r="9" fill="#7D2AE8" />
        <path d="M14.5 9.5c-.8-1-2-1.5-3-1.2-1.8.5-2.8 2.8-2.2 5 .5 1.8 2 3 3.5 2.7 1-.2 1.7-1 2-1.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Tienda Nube",
    color: "text-[#2F88FF]",
    bg: "bg-[#2F88FF]/10",
    border: "border-[#2F88FF]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M4 16.5a4 4 0 014-4h.5a5 5 0 019.5-1.5A3.5 3.5 0 0120 14.5a3 3 0 01-1 5.5H7a3 3 0 01-3-3.5z" fill="#2F88FF" />
      </svg>
    ),
  },
  {
    name: "MercadoPago",
    color: "text-[#00BCFF]",
    bg: "bg-[#00BCFF]/10",
    border: "border-[#00BCFF]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="#00BCFF" strokeWidth="1.5" />
        <path d="M3 10h18" stroke="#00BCFF" strokeWidth="1.5" />
        <rect x="6" y="13" width="4" height="2" rx="0.5" fill="#00BCFF" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    color: "text-white",
    bg: "bg-white/8",
    border: "border-white/15",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M12 4L22 20H2L12 4z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    color: "text-[#3ECF8E]",
    bg: "bg-[#3ECF8E]/10",
    border: "border-[#3ECF8E]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M13.5 21c-.3.4-.9.1-.9-.4V13h6.8c.7 0 1.1.8.6 1.3L13.5 21z" fill="#3ECF8E" />
        <path d="M10.5 3c.3-.4.9-.1.9.4V11H4.6c-.7 0-1.1-.8-.6-1.3L10.5 3z" fill="#3ECF8E" fillOpacity="0.6" />
      </svg>
    ),
  },
  {
    name: "CapCut",
    color: "text-white",
    bg: "bg-white/8",
    border: "border-white/15",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
        <path d="M10 8l6 4-6 4V8z" fill="white" />
      </svg>
    ),
  },
  {
    name: "DaVinci",
    color: "text-[#FF6B35]",
    bg: "bg-[#FF6B35]/10",
    border: "border-[#FF6B35]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#FF6B35" strokeWidth="1.5" />
        <path d="M3 9h18" stroke="#FF6B35" strokeWidth="1.5" />
        <rect x="5" y="11" width="6" height="6" rx="1" fill="#FF6B35" fillOpacity="0.4" />
        <rect x="13" y="11" width="6" height="2" rx="0.5" fill="#FF6B35" fillOpacity="0.4" />
        <rect x="13" y="15" width="4" height="2" rx="0.5" fill="#FF6B35" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    name: "ElevenLabs",
    color: "text-[#B4F461]",
    bg: "bg-[#B4F461]/10",
    border: "border-[#B4F461]/20",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <rect x="9" y="4" width="2.5" height="16" rx="1.25" fill="#B4F461" />
        <rect x="13.5" y="4" width="2.5" height="16" rx="1.25" fill="#B4F461" />
      </svg>
    ),
  },
  {
    name: "Notion AI",
    color: "text-white",
    bg: "bg-white/8",
    border: "border-white/15",
    logo: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 sm:h-7 sm:w-7">
        <path d="M5 4h10l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="white" strokeWidth="1.5" />
        <path d="M7 9h6M7 12h8M7 15h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

// Group by category
const categories = [
  { label: "Inteligencia Artificial", items: ["Claude", "ChatGPT", "Gemini"] },
  { label: "Desarrollo", items: ["Cursor", "v0", "Lovable", "Vercel", "Supabase"] },
  { label: "Diseño y Video", items: ["Figma", "Canva", "CapCut", "DaVinci"] },
  { label: "E-commerce", items: ["Tienda Nube", "MercadoPago"] },
  { label: "Productividad", items: ["ElevenLabs", "Notion AI"] },
];

export function ToolsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-neon-green mb-3 sm:mb-4">
            Tecnología de primer nivel
          </p>
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Herramientas profesionales
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-foreground-secondary sm:mt-4 sm:text-base">
            Las mismas tecnologías que usan empresas y profesionales de primera
            línea en todo el mundo.
          </p>
        </motion.div>

        <div className="mt-10 space-y-8 sm:mt-14 sm:space-y-10">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.05 }}
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-foreground-muted sm:mb-4 sm:text-sm">
                {cat.label}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {cat.items.map((name, i) => {
                  const tool = tools.find((t) => t.name === name);
                  if (!tool) return null;
                  return (
                    <motion.div
                      key={tool.name}
                      className={`group flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 hover:scale-[1.03] sm:p-4 ${tool.bg} ${tool.border}`}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/50 sm:h-11 sm:w-11">
                        {tool.logo}
                      </div>
                      <span className={`text-xs font-semibold leading-tight sm:text-sm ${tool.color}`}>
                        {tool.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
