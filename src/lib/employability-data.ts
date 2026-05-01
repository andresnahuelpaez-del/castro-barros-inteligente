// Guia de Empleabilidad Digital
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
      "La plataforma freelance mas grande del mundo. Vos publicas tus servicios (llamados 'gigs') y los clientes te encuentran. Ideal para empezar porque no necesitas buscar clientes: ellos te buscan a vos.",
    bestFor:
      "Diseno web, edicion de video, marketing digital, redaccion, analisis de datos",
    tip: "Empeza con precios accesibles para conseguir tus primeras resenas. Las resenas son tu moneda de confianza en Fiverr.",
  },
  {
    name: "Upwork",
    url: "https://upwork.com",
    type: "freelance",
    description:
      "La plataforma mas profesional para freelancers. Aca aplicas a proyectos publicados por empresas de todo el mundo. Los proyectos suelen ser mas grandes y mejor pagos que en Fiverr.",
    bestFor:
      "Desarrollo web, analisis de datos, marketing, asistencia virtual, consultoria",
    tip: "Tu propuesta es clave. No copies y pegues: leé bien lo que pide el cliente y explica por que vos sos la persona indicada para ese proyecto.",
  },
  {
    name: "Freelancer.com",
    url: "https://freelancer.com",
    type: "freelance",
    description:
      "Similar a Upwork pero con sistema de concursos donde podes demostrar tu trabajo antes de ser contratado. Tiene mucha presencia en Latinoamerica.",
    bestFor: "Diseno, programacion, redaccion, traduccion, data entry",
    tip: "Los concursos son una buena forma de construir portfolio aunque no ganes. Mostra tu trabajo y los clientes te contactan despues.",
  },
  {
    name: "Workana",
    url: "https://workana.com",
    type: "freelance",
    description:
      "La plataforma freelance lider en Latinoamerica. Los clientes son mayormente de habla hispana, lo cual es una ventaja si tu ingles todavia no es fuerte.",
    bestFor:
      "Todos los rubros digitales, especialmente para el mercado hispanohablante",
    tip: "Completa tu perfil al 100%. Los clientes filtran por perfiles completos y con foto profesional.",
  },

  // Trabajo remoto
  {
    name: "LinkedIn",
    url: "https://linkedin.com",
    type: "red_profesional",
    description:
      "La red profesional mas importante del mundo. No es solo para buscar trabajo: es para construir tu marca profesional, conectar con personas de tu industria y que los reclutadores te encuentren.",
    bestFor: "Todos los rubros. Es obligatorio tener perfil activo.",
    tip: "Publica contenido sobre lo que aprendes y haces. Un perfil activo recibe 10 veces mas visitas que uno silencioso.",
  },
  {
    name: "Remote OK",
    url: "https://remoteok.com",
    type: "remoto",
    description:
      "Uno de los tableros de empleo remoto mas populares del mundo. Publica ofertas de empresas que contratan 100% remoto, muchas abiertas a Latinoamerica.",
    bestFor:
      "Desarrollo, diseno, marketing, customer support, analisis de datos",
    tip: "Filtra por 'Worldwide' o 'LATAM' para ver las ofertas que aceptan personas de Argentina.",
  },
  {
    name: "We Work Remotely",
    url: "https://weworkremotely.com",
    type: "remoto",
    description:
      "Tablero de empleo remoto con ofertas de empresas tecnologicas de primer nivel. Las ofertas suelen ser de mayor seniority pero tambien hay junior.",
    bestFor:
      "Desarrollo, diseno, producto, marketing, operaciones",
    tip: "Configura alertas por email para tu area. Las buenas ofertas se llenan rapido.",
  },
  {
    name: "Contra",
    url: "https://contra.com",
    type: "freelance",
    description:
      "Plataforma moderna de freelancing sin comisiones. Ideal para creativos y profesionales digitales que quieren mostrar su portfolio y conectar con clientes directamente.",
    bestFor:
      "Diseno, desarrollo web, creacion de contenido, consultoria",
    tip: "La plataforma es visualmente muy linda. Invertí tiempo en armar un portfolio atractivo ahi.",
  },

  // Argentina / Local
  {
    name: "Bumeran",
    url: "https://bumeran.com.ar",
    type: "local",
    description:
      "El portal de empleo mas grande de Argentina. Tiene tanto ofertas presenciales como remotas. Ideal para buscar empleo formal en empresas argentinas.",
    bestFor: "Empleo formal en Argentina, todos los rubros",
    tip: "Actualiza tu CV cada semana. Los algoritmos priorizan perfiles activos.",
  },
  {
    name: "ZonaJobs",
    url: "https://zonajobs.com.ar",
    type: "local",
    description:
      "Otro portal importante de empleo en Argentina. Tiene un buen buscador por area y ubicacion.",
    bestFor: "Empleo formal en Argentina",
    tip: "Activa las alertas para tu rubro y revisa el email todos los dias.",
  },
  {
    name: "CompuTrabajo",
    url: "https://computrabajo.com.ar",
    type: "local",
    description:
      "Portal de empleo con fuerte presencia en toda Latinoamerica. Muchas ofertas de empresas medianas y grandes.",
    bestFor: "Empleo formal, especialmente administrativo y tecnologico",
    tip: "Aplica rapido. Las ofertas con muchos postulantes pierden atencion del reclutador.",
  },

  // Portfolio
  {
    name: "Behance",
    url: "https://behance.net",
    type: "portfolio",
    description:
      "La plataforma de portfolio de Adobe. Ideal para mostrar trabajos de diseno, web, contenido visual. Los reclutadores buscan talento activamente aca.",
    bestFor: "Diseno web, contenido visual, UI/UX",
    tip: "Subi proyectos con proceso: mostra no solo el resultado final sino como llegaste a el.",
  },
  {
    name: "GitHub",
    url: "https://github.com",
    type: "portfolio",
    description:
      "La plataforma donde vive el codigo del mundo. Si haces desarrollo web, tu perfil de GitHub es tu curriculum tecnico. Los empleadores lo revisan antes de entrevistarte.",
    bestFor: "Desarrollo web, vibe coding, proyectos tecnicos",
    tip: "Mantene tu perfil activo con contribuciones regulares. Un perfil con actividad constante dice mas que un CV.",
  },
];

export const APPLICATION_METHODS: ApplicationMethod[] = [
  {
    title: "Postulacion directa en plataformas freelance",
    description:
      "Aplicas a proyectos publicados por clientes. Es la forma mas directa de empezar a generar ingresos. No necesitas experiencia previa: tu portfolio y tu propuesta hablan por vos.",
    steps: [
      "Crea tu perfil completo en 2-3 plataformas (Fiverr + Upwork + Workana es una buena combinacion)",
      "Arma un portfolio con los proyectos que hiciste durante el curso (cuentan como experiencia real)",
      "Lee las ofertas con atencion y aplica solo a las que realmente podes hacer bien",
      "Escriñi una propuesta personalizada para cada proyecto: nada de copiar y pegar",
      "Ofrece un precio competitivo al principio para conseguir tus primeras resenas",
      "Entrega antes del plazo y con calidad. Las primeras 5 resenas definen tu carrera freelance",
    ],
    proTip:
      "No apliques a todo. Es mejor mandar 5 propuestas excelentes que 50 genericas. Los clientes notan cuando alguien leyo de verdad su proyecto.",
  },
  {
    title: "Busqueda de empleo remoto",
    description:
      "Aplicar a puestos de trabajo remoto en empresas de todo el mundo. Puede ser full-time o part-time. Generalmente pagan en dolares y ofrecen estabilidad.",
    steps: [
      "Optimiza tu perfil de LinkedIn (foto profesional, titulo claro, resumen que cuente tu historia)",
      "Configura alertas en Remote OK, We Work Remotely y LinkedIn Jobs",
      "Adapta tu CV para cada postulacion (no uses el mismo para todo)",
      "Practica tu presentacion en ingles si aplicas a empresas internacionales",
      "Prepara un portfolio online (puede ser un simple sitio web con tus mejores trabajos)",
      "Aplica consistentemente: al menos 5 postulaciones por semana",
    ],
    proTip:
      "El 70% de los empleos no se publican. Conecta con personas de tu industria en LinkedIn, comenta sus publicaciones, comparte tu aprendizaje. Muchas oportunidades llegan por recomendacion.",
  },
  {
    title: "Contacto directo con negocios locales",
    description:
      "Ofrecer tus servicios directamente a comercios y emprendedores de tu zona. Es la forma mas rapida de conseguir clientes si sos de Castro Barros o alrededores.",
    steps: [
      "Hace una lista de 20 negocios locales que podrian necesitar tus servicios",
      "Prepara una presentacion simple: que haces, como los ayuda, cuanto cuesta",
      "Visitalos en persona o contactalos por WhatsApp con un mensaje profesional",
      "Ofrece hacer un primer trabajo pequeno gratis o a precio reducido como muestra",
      "Pedi testimonios y referidos a cada cliente satisfecho",
      "Arma un portfolio con los trabajos locales para mostrar a futuros clientes",
    ],
    proTip:
      "Un negocio local que confia en vos te recomienda a 5 mas. El boca a boca sigue siendo la mejor publicidad, especialmente en comunidades chicas.",
  },
  {
    title: "Redes sociales como canal de trabajo",
    description:
      "Usar tu presencia en redes sociales para atraer clientes y oportunidades. No es postularte a un empleo: es construir una reputacion que haga que el trabajo te busque a vos.",
    steps: [
      "Elegi 1-2 redes donde este tu publico (LinkedIn para B2B, Instagram/TikTok para consumidor final)",
      "Publica contenido sobre tu area: tips, procesos, resultados, aprendizajes",
      "Mostra tu trabajo: antes y despues, procesos, resultados de clientes",
      "Interactua genuinamente con otros profesionales de tu rubro",
      "Pone en tu bio que haces y como pueden contactarte",
      "Se constante: 3-5 publicaciones por semana es un buen ritmo para empezar",
    ],
    proTip:
      "No necesitas miles de seguidores. Con 500 seguidores del rubro correcto podes tener mas trabajo del que podes manejar. La calidad del publico importa mas que la cantidad.",
  },
  {
    title: "Creacion de tu propio emprendimiento digital",
    description:
      "En lugar de buscar que alguien te contrate, crear tu propio negocio digital. Puede ser una agencia, un producto digital, una tienda online o un servicio recurrente.",
    steps: [
      "Identifica un problema que puedas resolver con las habilidades del curso",
      "Valida la idea: hablá con al menos 10 personas que tengan ese problema",
      "Arma una oferta simple y clara (que vendes, a quien, a que precio)",
      "Crea presencia online minima: un sitio web simple + redes sociales",
      "Consegui tus primeros 3 clientes (aunque sea a precio reducido)",
      "Iterar: escucha el feedback, mejora tu servicio, subi los precios gradualmente",
    ],
    proTip:
      "El mejor negocio es el que resuelve un problema real. No busques la idea perfecta: busca un problema concreto que puedas resolver hoy con lo que sabes.",
  },
];

export const PROFILE_TIPS: ProfileSection[] = [
  {
    title: "Tu CV digital",
    description:
      "El CV tradicional sigue siendo importante, pero en el mundo digital necesitas mas. Aca te contamos como armar un perfil completo que te abra puertas.",
    items: [
      "Foto profesional (no selfie, no foto de fiesta): fondo limpio, buena luz, tu cara visible",
      "Titulo claro: en lugar de 'Busco trabajo' pone 'Disenador web especializado en sitios para PyMEs con IA'",
      "Resumen de 3-4 lineas: quien sos, que haces, que resultado das",
      "Incluir el certificado de Castro Barros Inteligente (con el link de verificacion)",
      "Portfolio con 3-5 de tus mejores trabajos (los del curso cuentan)",
      "Datos de contacto claros: email profesional (nada de gatitolindo@hotmail.com)",
    ],
  },
  {
    title: "La propuesta que gana",
    description:
      "Cuando aplicas a un trabajo o proyecto, tu propuesta es lo primero que leen. Tiene que ser corta, clara y mostrar que entendiste lo que necesitan.",
    items: [
      "Empeza mencionando algo especifico del proyecto (demuestra que lo leiste)",
      "Explica brevemente como resolverias el problema",
      "Mostra 1-2 trabajos similares que hayas hecho",
      "Se honesto con los plazos: mejor prometer menos y entregar mas",
      "Cerrá con una pregunta o proximo paso claro",
      "Revisa ortografia y gramatica antes de enviar (la IA te ayuda con esto)",
    ],
  },
  {
    title: "La entrevista online",
    description:
      "Cada vez mas entrevistas son por videollamada. No es lo mismo que en persona, pero los principios son parecidos. Aca van los basicos.",
    items: [
      "Probá tu camara, microfono e internet antes de la llamada",
      "Fondo limpio y ordenado (o usa un fondo virtual neutro)",
      "Vestite como si fueras en persona: no hace falta traje, pero si prolijo",
      "Mirá a la camara cuando hablas (no a la pantalla, a la camara)",
      "Tené a mano tu portfolio y ejemplos de trabajo para compartir pantalla",
      "Prepara 3 preguntas para hacerle al entrevistador (muestra interes genuino)",
    ],
  },
  {
    title: "Precio: cuanto cobrar",
    description:
      "Una de las preguntas mas dificiles cuando empezas. No hay una respuesta unica, pero hay criterios que te ayudan a decidir.",
    items: [
      "Investiga cuanto cobran otros profesionales de tu nivel en las plataformas",
      "Al principio, cobrar un poco menos para construir portfolio y resenas esta bien",
      "Nunca trabajes gratis 'por la exposicion' (salvo que sea estrategico y tu decision)",
      "Subi tus precios gradualmente a medida que tenes mas experiencia y resenas",
      "Cobra por proyecto, no por hora, cuando puedas (te beneficia si sos eficiente con IA)",
      "Tené una tarifa minima: debajo de ese numero, no aceptes (cuidá tu valor profesional)",
    ],
  },
];

export const EMPLOYABILITY_STATS = [
  {
    value: "87%",
    label: "de los freelancers exitosos tardaron menos de 30 dias en conseguir su primer cliente",
  },
  {
    value: "3x",
    label: "mas oportunidades para quienes tienen portfolio online vs. solo CV",
  },
  {
    value: "65%",
    label: "de los empleadores revisan redes sociales antes de contratar",
  },
  {
    value: "2-3",
    label: "habilidades combinadas (ej: diseno + marketing) aumentan significativamente la empleabilidad",
  },
];
