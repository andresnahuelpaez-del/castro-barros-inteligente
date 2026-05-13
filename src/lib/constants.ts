export const COURSES = [
  {
    slug: "creacion-de-contenido-con-ia",
    title: "Creación de Contenido con IA",
    shortDescription:
      "Aprendé a producir reels, videos para YouTube, podcasts, posts y carruseles usando IA de punta a punta.",
    durationMonths: 4,
    hoursPerWeek: "6-8",
    order: 1,
    icon: "Video",
  },
  {
    slug: "ia-para-tu-trabajo",
    title: "IA para tu Trabajo",
    shortDescription:
      "Dominá tu trabajo diario con IA: Excel, documentos, presentaciones, email, investigación y organización personal.",
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
      "Vendé online con campañas pagas, embudos automatizados y creativos generados por Inteligencia Artificial.",
    durationMonths: 5,
    hoursPerWeek: "8",
    order: 3,
    icon: "Megaphone",
  },
  {
    slug: "gestion-de-negocios-con-ia",
    title: "Gestión de Negocios con IA",
    shortDescription:
      "Ordená y digitalizá tu negocio completo: facturación, stock, finanzas, atención al cliente y automatización.",
    durationMonths: 5,
    hoursPerWeek: "8",
    order: 4,
    icon: "Store",
  },
  {
    slug: "diseno-web-con-ia",
    title: "Diseño Web con IA",
    shortDescription:
      "Creá sitios web profesionales para PyMEs y emprendedores en días, no meses, usando herramientas de IA.",
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
    durationMonths: 4,
    hoursPerWeek: "8",
    order: 6,
    icon: "ShoppingCart",
  },
  {
    slug: "analisis-de-datos-con-ia",
    title: "Análisis de Datos con IA",
    shortDescription:
      "Convertí datos crudos en insights accionables y dashboards profesionales con herramientas de IA.",
    durationMonths: 5,
    hoursPerWeek: "8",
    order: 7,
    icon: "BarChart3",
  },
  {
    slug: "vibe-coding-desarrollo-apps-ia",
    title: "Vibe Coding: Desarrollo de Apps con IA",
    shortDescription:
      "Construí aplicaciones web reales (SaaS, marketplaces, plataformas) usando IA como copiloto principal.",
    durationMonths: 6,
    hoursPerWeek: "10-12",
    order: 8,
    icon: "Code",
  },
  {
    slug: "qa-testing-con-ia",
    title: "QA Testing con IA",
    shortDescription:
      "Aprendé a testear aplicaciones web y mobile con IA: automatización de pruebas, detección de bugs y reportes profesionales para trabajar como QA remoto.",
    durationMonths: 3,
    hoursPerWeek: "8-10",
    order: 9,
    icon: "ShieldCheck",
  },
  {
    slug: "automatizaciones-con-ia-y-no-code",
    title: "Automatizaciones con IA y No-Code",
    shortDescription:
      "Creá flujos automatizados para empresas y clientes usando n8n, Make y herramientas no-code. Vendé servicios de automatización como freelancer.",
    durationMonths: 4,
    hoursPerWeek: "8",
    order: 10,
    icon: "Workflow",
  },
  {
    slug: "ingles-laboral-con-ia",
    title: "Inglés Laboral con IA",
    shortDescription:
      "Aprendé inglés práctico para el trabajo remoto e internacional, usando herramientas de IA para comunicarte con confianza.",
    durationMonths: 3,
    hoursPerWeek: "5-6",
    order: 11,
    icon: "Languages",
  },
];

export const COURSE_COMPETENCIES: Record<string, string> = {
  "creacion-de-contenido-con-ia":
    "producción de contenido digital profesional (reels, videos, podcasts, posts y carruseles) utilizando herramientas de Inteligencia Artificial de última generación",
  "ia-para-tu-trabajo":
    "aplicación de Inteligencia Artificial en el entorno laboral: automatización de documentos, presentaciones, email, investigación y organización personal con IA",
  "marketing-digital-con-ia":
    "marketing digital con IA: diseño de campañas pagas, embudos automatizados y creativos generados por Inteligencia Artificial",
  "gestion-de-negocios-con-ia":
    "gestión y digitalización integral de negocios: facturación, stock, finanzas, atención al cliente y automatización con herramientas de IA",
  "diseno-web-con-ia":
    "diseño y desarrollo de sitios web profesionales utilizando herramientas de Inteligencia Artificial para PyMEs y emprendedores",
  "ecommerce-con-ia":
    "implementación y operación de tiendas online con IA: catálogos, pagos, logística y optimización en el ecosistema de e-commerce argentino",
  "analisis-de-datos-con-ia":
    "análisis de datos con IA: transformación de datos crudos en insights accionables y dashboards profesionales",
  "vibe-coding-desarrollo-apps-ia":
    "desarrollo de aplicaciones web reales (SaaS, marketplaces, plataformas) utilizando IA como copiloto de programación",
  "qa-testing-con-ia":
    "testing y aseguramiento de calidad de software con IA: automatización de pruebas funcionales, detección de errores y generación de reportes profesionales de QA",
  "automatizaciones-con-ia-y-no-code":
    "diseño e implementación de flujos de automatización profesionales con herramientas no-code e Inteligencia Artificial para optimizar procesos de negocio y ofrecer servicios a terceros",
  "ingles-laboral-con-ia":
    "comprensión y uso práctico del inglés aplicado al trabajo remoto y digital, incorporando herramientas de Inteligencia Artificial para comunicación profesional en entornos internacionales",
};


export const FAQ_ITEMS = [
  {
    question: "¿Realmente es 100% gratis?",
    answer:
      "¡Sí, totalmente! Castro Barros Inteligente es una iniciativa del Estado provincial. No hay costos de inscripción, mensualidades ni cargos ocultos. Lo único que necesitás es un dispositivo con conexión a internet.",
  },
  {
    question: "¿El certificado tiene validez oficial?",
    answer:
      "Sí. Cada certificado es emitido oficialmente por el Departamento Castro Barros con un código único de verificación pública. Cualquier empleador puede verificar su autenticidad en línea escaneando el código QR o ingresando a la página de verificación.",
  },
  {
    question: "¿Necesito conocimientos previos?",
    answer:
      "Depende del curso. Los de nivel Inicial (como Creación de Contenido con IA o IA para tu Trabajo) no requieren conocimientos previos. Los de nivel Intermedio y Avanzado recomiendan cierta familiaridad con las herramientas básicas que se indican en cada programa.",
  },
  {
    question: "¿Puedo estudiar mientras trabajo o estudio otra cosa?",
    answer:
      "¡Por supuesto! La modalidad es 100% online y flexible. Vos organizás tus horarios de estudio. Cada curso indica las horas semanales recomendadas para que puedas planificar tu ritmo.",
  },
  {
    question: "¿Cuánto tiempo tengo para terminar el curso?",
    answer:
      "Cada curso tiene una duración estimada (entre 4 y 6 meses), pero no hay un plazo máximo estricto. Te recomendamos mantener un ritmo constante para aprovechar al máximo el contenido y llegar a la certificación.",
  },
  {
    question: "¿Qué pasa si no apruebo un quiz?",
    answer:
      "Podés volver a intentarlo las veces que necesites. No hay límite de intentos. Cada quiz te muestra las respuestas correctas y explicaciones para que aprendas de los errores antes de reintentar.",
  },
  {
    question: "¿Necesito una computadora potente?",
    answer:
      "No. La mayoría de los cursos se pueden seguir desde cualquier computadora con navegador web o incluso desde tu celular. Las herramientas que usamos son en su mayoría basadas en la nube y no requieren hardware especial.",
  },
  {
    question: "¿Puedo hacer los cursos desde el celular?",
    answer:
      "Sí. La plataforma está diseñada para funcionar perfecto en celulares y tablets. Podés ver las clases, hacer los quizzes y entregar proyectos desde cualquier dispositivo.",
  },
  {
    question: "¿Quién puede inscribirse?",
    answer:
      "Cualquier persona mayor de 16 años. Si bien la iniciativa está pensada especialmente para habitantes del Departamento Castro Barros, la inscripción está abierta a toda persona interesada.",
  },
  {
    question: "¿Cómo me inscribo?",
    answer:
      "Hacé clic en el botón Inscribite, creá tu cuenta con tu email (o usá tu cuenta de Google), completá tus datos en el formulario de bienvenida, y elegí el curso que más te interese. En menos de 5 minutos ya estás aprendiendo.",
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
  "Canva",
  "Tienda Nube",
  "MercadoPago",
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
  "Las Peñas",
  "Pinchas",
  "San Pedro",
  "Otra",
] as const;
