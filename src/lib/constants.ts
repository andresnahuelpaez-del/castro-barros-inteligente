export const COURSES = [
  {
    slug: "creacion-de-contenido-con-ia",
    title: "Creacion de Contenido con IA",
    shortDescription:
      "Aprende a producir reels, videos para YouTube, podcasts, posts y carruseles usando IA de punta a punta.",
    level: "inicial" as const,
    durationMonths: 4,
    hoursPerWeek: "6-8",
    order: 1,
    icon: "Video",
  },
  {
    slug: "ia-para-tu-trabajo",
    title: "IA para tu Trabajo",
    shortDescription:
      "Domina tu trabajo diario con IA: Excel, documentos, presentaciones, email, investigacion y organizacion personal.",
    level: "inicial" as const,
    durationMonths: 4,
    hoursPerWeek: "6",
    order: 2,
    icon: "Briefcase",
    featured: true,
  },
  {
    slug: "marketing-digital-con-ia",
    title: "Marketing Digital con IA",
    shortDescription:
      "Vende online con campanas pagas, embudos automatizados y creativos generados por Inteligencia Artificial.",
    level: "intermedio" as const,
    durationMonths: 5,
    hoursPerWeek: "8",
    order: 3,
    icon: "Megaphone",
  },
  {
    slug: "gestion-de-negocios-con-ia",
    title: "Gestion de Negocios con IA",
    shortDescription:
      "Ordena y digitaliza tu negocio completo: facturacion ARCA, stock, finanzas, atencion al cliente y automatizacion.",
    level: "intermedio" as const,
    durationMonths: 5,
    hoursPerWeek: "8",
    order: 4,
    icon: "Store",
  },
  {
    slug: "diseno-web-con-ia",
    title: "Diseno Web con IA",
    shortDescription:
      "Crea sitios web profesionales para PyMEs y emprendedores en dias, no meses, usando herramientas de IA.",
    level: "intermedio" as const,
    durationMonths: 5,
    hoursPerWeek: "8-10",
    order: 5,
    icon: "Globe",
  },
  {
    slug: "ecommerce-con-ia",
    title: "E-commerce con IA",
    shortDescription:
      "Monta y opera tiendas online completas con IA, optimizando cada paso en el ecosistema argentino.",
    level: "intermedio" as const,
    durationMonths: 4,
    hoursPerWeek: "8",
    order: 6,
    icon: "ShoppingCart",
  },
  {
    slug: "analisis-de-datos-con-ia",
    title: "Analisis de Datos con IA",
    shortDescription:
      "Convierte datos crudos en insights accionables y dashboards profesionales con herramientas de IA.",
    level: "intermedio" as const,
    durationMonths: 5,
    hoursPerWeek: "8",
    order: 7,
    icon: "BarChart3",
  },
  {
    slug: "vibe-coding-desarrollo-apps-ia",
    title: "Vibe Coding: Desarrollo de Apps con IA",
    shortDescription:
      "Construi aplicaciones web reales (SaaS, marketplaces, plataformas) usando IA como copiloto principal.",
    level: "avanzado" as const,
    durationMonths: 6,
    hoursPerWeek: "10-12",
    order: 8,
    icon: "Code",
  },
];

export const LEVEL_LABELS = {
  inicial: "Inicial",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
} as const;

export const LEVEL_COLORS = {
  inicial: "bg-neon-green/20 text-neon-green",
  intermedio: "bg-secondary/20 text-neon-violet-bright",
  avanzado: "bg-neon-cyan/20 text-neon-cyan-bright",
} as const;

export const FAQ_ITEMS = [
  {
    question: "Realmente es 100% gratis?",
    answer:
      "Si, completamente. Castro Barros Inteligente es una iniciativa del Estado provincial. No hay costos de inscripcion, mensualidades ni cargos ocultos. Lo unico que necesitas es un dispositivo con conexion a internet.",
  },
  {
    question: "El certificado tiene validez oficial?",
    answer:
      "Si. Cada certificado es emitido oficialmente por el Departamento Castro Barros con un codigo unico de verificacion publica. Cualquier empleador puede verificar su autenticidad en linea escaneando el codigo QR o ingresando a la pagina de verificacion.",
  },
  {
    question: "Necesito conocimientos previos?",
    answer:
      "Depende del curso. Los cursos de nivel Inicial (como Creacion de Contenido con IA o IA para tu Trabajo) no requieren conocimientos previos. Los de nivel Intermedio y Avanzado recomiendan cierta familiaridad con las herramientas basicas que se indican en cada programa.",
  },
  {
    question: "Puedo estudiar trabajando o estudiando otra cosa en paralelo?",
    answer:
      "Absolutamente. La modalidad es 100% online y flexible. Vos organizas tus horarios de estudio. Cada curso indica las horas semanales recomendadas para que puedas planificar tu ritmo.",
  },
  {
    question: "Cuanto tiempo tengo para terminar el curso?",
    answer:
      "Cada curso tiene una duracion estimada (entre 4 y 6 meses), pero no hay un plazo maximo estricto. Te recomendamos mantener un ritmo constante para aprovechar al maximo el contenido y llegar a la certificacion.",
  },
  {
    question: "Que pasa si no apruebo un quiz?",
    answer:
      "Podes volver a intentarlo las veces que necesites. No hay limite de intentos. Cada quiz te muestra las respuestas correctas y explicaciones para que aprendas de los errores antes de reintentar.",
  },
  {
    question: "Necesito una computadora potente?",
    answer:
      "No. La mayoria de los cursos se pueden seguir desde cualquier computadora con navegador web o incluso desde tu celular. Las herramientas que usamos son en su mayoria basadas en la nube y no requieren hardware especial.",
  },
  {
    question: "Puedo hacer los cursos desde el celular?",
    answer:
      "Si. La plataforma esta disenada para funcionar perfectamente en celulares y tablets. Podes ver las clases, hacer los quizzes y entregar proyectos desde cualquier dispositivo movil.",
  },
  {
    question: "Quien puede inscribirse?",
    answer:
      "Cualquier persona mayor de 16 anos puede inscribirse. Si bien la iniciativa esta dirigida especialmente a habitantes del Departamento Castro Barros, la inscripcion esta abierta a toda persona interesada.",
  },
  {
    question: "Como me inscribo?",
    answer:
      "Hace clic en el boton Inscribite, crea tu cuenta con tu email (o usa tu cuenta de Google), completa tus datos personales en el formulario de onboarding, y luego elegis el curso que mas te interese. En menos de 5 minutos estas listo para empezar.",
  },
];

export const TOOLS_LOGOS = [
  "Claude",
  "ChatGPT",
  "Gemini",
  "Cursor",
  "v0",
  "Lovable",
  "Figma",
  "Tienda Nube",
  "MercadoPago",
  "ARCA",
  "Vercel",
  "Supabase",
  "CapCut",
  "DaVinci",
  "ElevenLabs",
  "Notion AI",
];

export const LOCALIDADES = [
  "Aminga",
  "Anillaco",
  "Anjullon",
  "Chuquis",
  "Las Penas",
  "Pinchas",
  "San Pedro",
  "Otra",
] as const;
