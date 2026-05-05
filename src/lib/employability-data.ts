// Guía de Empleabilidad Digital
// Contenido informativo accesible para cualquier usuario registrado

export interface JobPlatform {
  name: string;
  url: string;
  type: "freelance" | "remoto" | "local" | "red_profesional" | "portfolio";
  description: string;
  bestFor: string;
  tip: string;
}

export interface ApplicationMethod {
  title: string;
  description: string;
  steps: string[];
  proTip: string;
}

export interface ProfileSection {
  title: string;
  description: string;
  items: string[];
}

export const JOB_PLATFORMS: JobPlatform[] = [
  // Freelance internacionales
  {
    name: "Fiverr",
    url: "https://fiverr.com",
    type: "freelance",
    description:
      "La plataforma freelance más grande del mundo. Vos publicás tus servicios (llamados 'gigs') y los clientes te encuentran. Ideal para empezar porque no necesitás buscar clientes: ellos te buscan a vos.",
    bestFor:
      "Diseño web, edición de video, marketing digital, redacción, análisis de datos",
    tip: "Empezá con precios accesibles para conseguir tus primeras reseñas. Las reseñas son tu moneda de confianza en Fiverr.",
  },
  {
    name: "Upwork",
    url: "https://upwork.com",
    type: "freelance",
    description:
      "La plataforma más profesional para freelancers. Acá aplicás a proyectos publicados por empresas de todo el mundo. Los proyectos suelen ser más grandes y mejor pagos que en Fiverr.",
    bestFor:
      "Desarrollo web, análisis de datos, marketing, asistencia virtual, consultoría",
    tip: "Tu propuesta es clave. No copies y pegues: leé bien lo que pide el cliente y explicá por qué vos sos la persona indicada para ese proyecto.",
  },
  {
    name: "Freelancer.com",
    url: "https://freelancer.com",
    type: "freelance",
    description:
      "Similar a Upwork pero con sistema de concursos donde podés demostrar tu trabajo antes de ser contratado. Tiene mucha presencia en Latinoamérica.",
    bestFor: "Diseño, programación, redacción, traducción, data entry",
    tip: "Los concursos son una buena forma de construir portfolio aunque no ganes. Mostrá tu trabajo y los clientes te contactan después.",
  },
  {
    name: "Workana",
    url: "https://workana.com",
    type: "freelance",
    description:
      "La plataforma freelance líder en Latinoamérica. Los clientes son mayormente de habla hispana, lo cual es una ventaja si tu inglés todavía no es fuerte.",
    bestFor:
      "Todos los rubros digitales, especialmente para el mercado hispanohablante",
    tip: "Completá tu perfil al 100%. Los clientes filtran por perfiles completos y con foto profesional.",
  },

  // Trabajo remoto
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    type: "red_profesional",
    description:
      "La red profesional más importante del mundo. No es solo para buscar trabajo: es para construir tu marca profesional, conectar con personas de tu industria y que los reclutadores te encuentren.",
    bestFor: "Todos los rubros. Es obligatorio tener perfil activo.",
    tip: "Publicá contenido sobre lo que aprendés y hacés. Un perfil activo recibe 10 veces más visitas que uno silencioso.",
  },
  {
    name: "Remote OK",
    url: "https://remoteok.com",
    type: "remoto",
    description:
      "Uno de los tableros de empleo remoto más populares del mundo. Publica ofertas de empresas que contratan 100% remoto, muchas abiertas a Latinoamérica.",
    bestFor:
      "Desarrollo, diseño, marketing, customer support, análisis de datos",
    tip: "Filtrá por 'Worldwide' o 'LATAM' para ver las ofertas que aceptan personas de Argentina.",
  },
  {
    name: "We Work Remotely",
    url: "https://weworkremotely.com",
    type: "remoto",
    description:
      "Tablero de empleo remoto con ofertas de empresas tecnológicas de primer nivel. Las ofertas suelen ser de mayor seniority pero también hay junior.",
    bestFor:
      "Desarrollo, diseño, producto, marketing, operaciones",
    tip: "Configurá alertas por email para tu área. Las buenas ofertas se llenan rápido.",
  },
  {
    name: "Contra",
    url: "https://contra.com",
    type: "freelance",
    description:
      "Plataforma moderna de freelancing sin comisiones. Ideal para creativos y profesionales digitales que quieren mostrar su portfolio y conectar con clientes directamente.",
    bestFor:
      "Diseño, desarrollo web, creación de contenido, consultoría",
    tip: "La plataforma es visualmente muy linda. Invertí tiempo en armar un portfolio atractivo ahí.",
  },

  // Argentina / Local
  {
    name: "Bumeran",
    url: "https://bumeran.com.ar",
    type: "local",
    description:
      "El portal de empleo más grande de Argentina. Tiene tanto ofertas presenciales como remotas. Ideal para buscar empleo formal en empresas argentinas.",
    bestFor: "Empleo formal en Argentina, todos los rubros",
    tip: "Actualizá tu CV cada semana. Los algoritmos priorizan perfiles activos.",
  },
  {
    name: "ZonaJobs",
    url: "https://zonajobs.com.ar",
    type: "local",
    description:
      "Otro portal importante de empleo en Argentina. Tiene un buen buscador por área y ubicación.",
    bestFor: "Empleo formal en Argentina",
    tip: "Activá las alertas para tu rubro y revisá el email todos los días.",
  },
  {
    name: "CompuTrabajo",
    url: "https://computrabajo.com.ar",
    type: "local",
    description:
      "Portal de empleo con fuerte presencia en toda Latinoamérica. Muchas ofertas de empresas medianas y grandes.",
    bestFor: "Empleo formal, especialmente administrativo y tecnológico",
    tip: "Aplicá rápido. Las ofertas con muchos postulantes pierden atención del reclutador.",
  },

  // Portfolio
  {
    name: "Behance",
    url: "https://behance.net",
    type: "portfolio",
    description:
      "La plataforma de portfolio de Adobe. Ideal para mostrar trabajos de diseño, web, contenido visual. Los reclutadores buscan talento activamente acá.",
    bestFor: "Diseño web, contenido visual, UI/UX",
    tip: "Subí proyectos con proceso: mostrá no solo el resultado final sino cómo llegaste a él.",
  },
  {
    name: "GitHub",
    url: "https://github.com",
    type: "portfolio",
    description:
      "La plataforma donde vive el código del mundo. Si hacés desarrollo web, tu perfil de GitHub es tu currículum técnico. Los empleadores lo revisan antes de entrevistarte.",
    bestFor: "Desarrollo web, vibe coding, proyectos técnicos",
    tip: "Mantené tu perfil activo con contribuciones regulares. Un perfil con actividad constante dice más que un CV.",
  },
];

export const APPLICATION_METHODS: ApplicationMethod[] = [
  {
    title: "Postulación directa en plataformas freelance",
    description:
      "Aplicás a proyectos publicados por clientes. Es la forma más directa de empezar a generar ingresos. No necesitás experiencia previa: tu portfolio y tu propuesta hablan por vos.",
    steps: [
      "Creá tu perfil completo en 2-3 plataformas (Fiverr + Upwork + Workana es una buena combinación)",
      "Armá un portfolio con los proyectos que hiciste durante el curso (cuentan como experiencia real)",
      "Leé las ofertas con atención y aplicá solo a las que realmente podés hacer bien",
      "Escribí una propuesta personalizada para cada proyecto: nada de copiar y pegar",
      "Ofrecé un precio competitivo al principio para conseguir tus primeras reseñas",
      "Entregá antes del plazo y con calidad. Las primeras 5 reseñas definen tu carrera freelance",
    ],
    proTip:
      "No apliques a todo. Es mejor mandar 5 propuestas excelentes que 50 genéricas. Los clientes notan cuando alguien leyó de verdad su proyecto.",
  },
  {
    title: "Búsqueda de empleo remoto",
    description:
      "Aplicar a puestos de trabajo remoto en empresas de todo el mundo. Puede ser full-time o part-time. Generalmente pagan en dólares y ofrecen estabilidad.",
    steps: [
      "Optimizá tu perfil de LinkedIn (foto profesional, título claro, resumen que cuente tu historia)",
      "Configurá alertas en Remote OK, We Work Remotely y LinkedIn Jobs",
      "Adaptá tu CV para cada postulación (no uses el mismo para todo)",
      "Practicá tu presentación en inglés si aplicás a empresas internacionales",
      "Prepará un portfolio online (puede ser un simple sitio web con tus mejores trabajos)",
      "Aplicá consistentemente: al menos 5 postulaciones por semana",
    ],
    proTip:
      "El 70% de los empleos no se publican. Conectá con personas de tu industria en LinkedIn, comentá sus publicaciones, compartí tu aprendizaje. Muchas oportunidades llegan por recomendación.",
  },
  {
    title: "Contacto directo con negocios locales",
    description:
      "Ofrecer tus servicios directamente a comercios y emprendedores de tu zona. Es la forma más rápida de conseguir clientes si sos de Castro Barros o alrededores.",
    steps: [
      "Hacé una lista de 20 negocios locales que podrían necesitar tus servicios",
      "Prepará una presentación simple: qué hacés, cómo los ayuda, cuánto cuesta",
      "Visitalos en persona o contactalos por WhatsApp con un mensaje profesional",
      "Ofrecé hacer un primer trabajo pequeño gratis o a precio reducido como muestra",
      "Pedí testimonios y referidos a cada cliente satisfecho",
      "Armá un portfolio con los trabajos locales para mostrar a futuros clientes",
    ],
    proTip:
      "Un negocio local que confía en vos te recomienda a 5 más. El boca a boca sigue siendo la mejor publicidad, especialmente en comunidades chicas.",
  },
  {
    title: "Redes sociales como canal de trabajo",
    description:
      "Usar tu presencia en redes sociales para atraer clientes y oportunidades. No es postularte a un empleo: es construir una reputación que haga que el trabajo te busque a vos.",
    steps: [
      "Elegí 1-2 redes donde esté tu público (LinkedIn para B2B, Instagram/TikTok para consumidor final)",
      "Publicá contenido sobre tu área: tips, procesos, resultados, aprendizajes",
      "Mostrá tu trabajo: antes y después, procesos, resultados de clientes",
      "Interactuá genuinamente con otros profesionales de tu rubro",
      "Poné en tu bio qué hacés y cómo pueden contactarte",
      "Sé constante: 3-5 publicaciones por semana es un buen ritmo para empezar",
    ],
    proTip:
      "No necesitás miles de seguidores. Con 500 seguidores del rubro correcto podés tener más trabajo del que podés manejar. La calidad del público importa más que la cantidad.",
  },
  {
    title: "Creación de tu propio emprendimiento digital",
    description:
      "En lugar de buscar que alguien te contrate, crear tu propio negocio digital. Puede ser una agencia, un producto digital, una tienda online o un servicio recurrente.",
    steps: [
      "Identificá un problema que puedas resolver con las habilidades del curso",
      "Validá la idea: hablá con al menos 10 personas que tengan ese problema",
      "Armá una oferta simple y clara (qué vendés, a quién, a qué precio)",
      "Creá presencia online mínima: un sitio web simple + redes sociales",
      "Conseguí tus primeros 3 clientes (aunque sea a precio reducido)",
      "Iterá: escuchá el feedback, mejorá tu servicio, subí los precios gradualmente",
    ],
    proTip:
      "El mejor negocio es el que resuelve un problema real. No busques la idea perfecta: buscá un problema concreto que puedas resolver hoy con lo que sabés.",
  },
];

export const PROFILE_TIPS: ProfileSection[] = [
  {
    title: "Tu CV digital",
    description:
      "El CV tradicional sigue siendo importante, pero en el mundo digital necesitás más. Acá te contamos cómo armar un perfil completo que te abra puertas.",
    items: [
      "Foto profesional (no selfie, no foto de fiesta): fondo limpio, buena luz, tu cara visible",
      "Título claro: en lugar de 'Busco trabajo' poné 'Diseñador web especializado en sitios para PyMEs con IA'",
      "Resumen de 3-4 líneas: quién sos, qué hacés, qué resultado dás",
      "Incluir el certificado de Castro Barros Inteligente (con el link de verificación)",
      "Portfolio con 3-5 de tus mejores trabajos (los del curso cuentan)",
      "Datos de contacto claros: email profesional (nada de gatitolindo@hotmail.com)",
    ],
  },
  {
    title: "La propuesta que gana",
    description:
      "Cuando aplicás a un trabajo o proyecto, tu propuesta es lo primero que leen. Tiene que ser corta, clara y mostrar que entendiste lo que necesitan.",
    items: [
      "Empezá mencionando algo específico del proyecto (demuestra que lo leíste)",
      "Explicá brevemente cómo resolverías el problema",
      "Mostrá 1-2 trabajos similares que hayas hecho",
      "Sé honesto con los plazos: mejor prometer menos y entregar más",
      "Cerrá con una pregunta o próximo paso claro",
      "Revisá ortografía y gramática antes de enviar (la IA te ayuda con esto)",
    ],
  },
  {
    title: "La entrevista online",
    description:
      "Cada vez más entrevistas son por videollamada. No es lo mismo que en persona, pero los principios son parecidos. Acá van los básicos.",
    items: [
      "Probá tu cámara, micrófono e internet antes de la llamada",
      "Fondo limpio y ordenado (o usá un fondo virtual neutro)",
      "Vestite como si fueras en persona: no hace falta traje, pero sí prolijo",
      "Mirá a la cámara cuando hablás (no a la pantalla, a la cámara)",
      "Tené a mano tu portfolio y ejemplos de trabajo para compartir pantalla",
      "Prepará 3 preguntas para hacerle al entrevistador (muestra interés genuino)",
    ],
  },
  {
    title: "Precio: cuánto cobrar",
    description:
      "Una de las preguntas más difíciles cuando empezás. No hay una respuesta única, pero hay criterios que te ayudan a decidir.",
    items: [
      "Investigá cuánto cobran otros profesionales de tu nivel en las plataformas",
      "Al principio, cobrar un poco menos para construir portfolio y reseñas está bien",
      "Nunca trabajes gratis 'por la exposición' (salvo que sea estratégico y tu decisión)",
      "Subí tus precios gradualmente a medida que tenés más experiencia y reseñas",
      "Cobrá por proyecto, no por hora, cuando puedas (te beneficia si sos eficiente con IA)",
      "Tené una tarifa mínima: debajo de ese número, no aceptes (cuidá tu valor profesional)",
    ],
  },
];

export const EMPLOYABILITY_STATS = [
  {
    value: "87%",
    label: "de los freelancers exitosos tardaron menos de 30 días en conseguir su primer cliente",
  },
  {
    value: "3x",
    label: "más oportunidades para quienes tienen portfolio online vs. solo CV",
  },
  {
    value: "65%",
    label: "de los empleadores revisan redes sociales antes de contratar",
  },
  {
    value: "2-3",
    label: "habilidades combinadas (ej: diseño + marketing) aumentan significativamente la empleabilidad",
  },
];
