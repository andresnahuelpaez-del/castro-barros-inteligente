// Datos extendidos de cada curso para la página de detalle
// Esto no es contenido de lecciones — es información pública del curso

export interface JobOpportunity {
  title: string;
  type: "empleo" | "freelance" | "emprendimiento";
  highlight: string;
  description: string;
}

export interface ComplementaryCourse {
  slug: string;
  title: string;
  reason: string;
}

export interface EmployerValue {
  trait: string;
  description: string;
}

export interface CourseDetail {
  slug: string;
  longDescription: string;
  whatYouLearn: string[];
  whoIsItFor: string;
  prerequisites: string;
  jobOpportunities: JobOpportunity[];
  complementaryCourses: ComplementaryCourse[];
  employerValues: EmployerValue[];
  freeTools: string[];
  paidTools: string[];
  finalProject: string;
}

export const COURSES_DETAIL: Record<string, CourseDetail> = {
  "crea-tu-empresa-de-servicios-digitales": {
    slug: "crea-tu-empresa-de-servicios-digitales",
    longDescription:
      "Aprender una habilidad digital es la mitad del camino; la otra mitad es saber convertirla en un negocio. Este curso extra te enseña, paso a paso y en lenguaje simple, cómo armar tu propia empresa de servicios digitales: definir qué servicios ofrecés, ponerles precio, conseguir tus primeros clientes y crecer hasta trabajar con empresas de todo el país e incluso del exterior. No necesitás título ni conocimientos previos de negocios: se explica todo desde cero, pensado para alguien de La Rioja que quiere generar sus propios ingresos. Es el complemento ideal de cualquier curso de la plataforma.",
    whatYouLearn: [
      "Qué es una empresa de servicios digitales y qué podés ofrecer",
      "Cómo elegir tu servicio y tu nicho según lo que ya sabés hacer",
      "Cómo ponerle precio a tu trabajo (por hora, por proyecto o por abono)",
      "Cómo conseguir tus primeros clientes: local, provincial, nacional e internacional",
      "Cómo presentar tu servicio: propuesta, portfolio y presencia online",
      "Cómo cobrar dentro y fuera del país (MercadoPago, transferencias, cobros del exterior)",
      "Primeros pasos para formalizarte (monotributo) y organizar tus finanzas",
      "Cómo atender clientes, organizar tu tiempo y hacer crecer tu marca",
    ],
    whoIsItFor:
      "Para cualquier persona que ya tenga (o esté aprendiendo) una habilidad digital y quiera dejar de depender de un solo empleo para generar ingresos propios. Ideal para quienes quieren emprender desde La Rioja y venderle servicios al resto del país o del mundo, sin importar dónde vivan.",
    prerequisites:
      "Ninguno. No hace falta saber de negocios ni tener experiencia previa. Ayuda estar haciendo alguno de los otros cursos para tener un servicio concreto que ofrecer, pero no es obligatorio.",
    jobOpportunities: [
      {
        title: "Tu propia empresa de servicios digitales",
        type: "emprendimiento",
        highlight: "Ingresos propios · Desde tu casa",
        description:
          "Ofrecé servicios (diseño, marketing, automatización, desarrollo, datos y más) con tu marca, eligiendo tus clientes y tus horarios.",
      },
      {
        title: "Freelancer para clientes de todo el mundo",
        type: "freelance",
        highlight: "Cobrás en pesos o en dólares",
        description:
          "Trabajá de forma remota para empresas de otras provincias o del exterior, aprovechando la ventaja de cobrar en moneda extranjera.",
      },
      {
        title: "Agencia digital local",
        type: "emprendimiento",
        highlight: "Escalable · Sumás gente",
        description:
          "Empezá solo y crecé hasta armar un equipo que le da servicios a comercios, PyMEs y organismos de La Rioja y la región.",
      },
    ],
    complementaryCourses: [
      {
        slug: "marketing-y-creacion-de-contenido-con-ia",
        title: "Marketing y Creación de Contenido con IA",
        reason:
          "Para conseguir clientes necesitás mostrarte. Marketing te da las herramientas para atraer y vender tus servicios.",
      },
      {
        slug: "automatizacion-y-agentes-con-ia",
        title: "Automatización y Agentes con IA",
        reason:
          "Uno de los servicios más demandados y mejor pagos. Combinado con este curso, tenés servicio para vender y negocio para venderlo.",
      },
    ],
    employerValues: [
      {
        trait: "Iniciativa",
        description:
          "Animarse a ofrecer, a escribirle a un cliente y a cerrar un trato. El que emprende no espera a que le den permiso: propone.",
      },
      {
        trait: "Cumplimiento y confianza",
        description:
          "Entregar a tiempo y hacer lo que se prometió. La mayoría de los clientes de servicios digitales vuelven y recomiendan por eso.",
      },
      {
        trait: "Comunicación clara",
        description:
          "Explicar qué hacés, cuánto cuesta y qué va a recibir el cliente, sin vueltas. Es lo que separa a un profesional de un improvisado.",
      },
    ],
    freeTools: [
      "Claude.ai",
      "ChatGPT",
      "Canva",
      "Google Workspace",
      "MercadoPago",
      "WhatsApp Business",
      "Notion",
      "LinkedIn",
    ],
    paidTools: ["Payoneer / Wise (cobros del exterior)", "Dominio y hosting propios"],
    finalProject:
      "Armás el plan completo de tu empresa de servicios digitales: qué servicio ofrecés, a qué clientes, con qué precios, una propuesta lista para enviar y un plan concreto para conseguir tus primeros tres clientes. Salís del curso con tu negocio listo para arrancar.",
  },
  "gemelos-digitales-con-ia": {
    slug: "gemelos-digitales-con-ia",
    longDescription:
      "Un gemelo digital es una réplica virtual y viva de algo real —una mina, un campo, una planta o un comercio— que se alimenta de datos para funcionar en la computadora. En este curso aprendés a construir y usar esa réplica para simular escenarios, probar cambios sin riesgo, anticipar fallas y optimizar la operación antes de tocar un solo equipo. Es una de las tecnologías de mayor crecimiento de la industria 4.0 y una puerta directa a los sectores productivos de La Rioja. Todo se dicta 100% online: cuando un tema toca sensores o electrónica, se explica su lógica para que se entienda, sin necesidad de manejar hardware.",
    whatYouLearn: [
      "Qué es un gemelo digital y para qué sirve en la industria real",
      "El rol de los datos y los sensores IoT, a nivel conceptual",
      "Cómo simular y optimizar un proceso con Inteligencia Artificial",
      "Mantenimiento predictivo: anticipar fallas antes de que ocurran",
      "Modelado de impacto ambiental (uso del agua, colas y residuos)",
      "Integración con flotas y equipos autónomos",
      "Armado de tableros para decidir en tiempo real",
      "Casos aplicados en minería, agro, energía e industria",
    ],
    whoIsItFor:
      "Para quienes quieren entrar a la industria 4.0 y a los sectores productivos de La Rioja sin ser ingenieros: personas curiosas por la tecnología, los datos y los procesos, que buscan un perfil moderno y bien pago sin tener que manejar maquinaria.",
    prerequisites:
      "Manejo básico de computadora e internet. No se necesita experiencia técnica previa: se explica todo desde cero, con enfoque conceptual y práctico.",
    jobOpportunities: [
      {
        title: "Asistente de operaciones 4.0",
        type: "empleo",
        highlight: "Sector estratégico · La Rioja",
        description:
          "Apoyar la digitalización de operaciones en minería, energía o industria, trabajando con datos, simulaciones y tableros.",
      },
      {
        title: "Analista de procesos y simulación",
        type: "empleo",
        highlight: "Perfil escaso · Muy valorado",
        description:
          "Modelar procesos productivos, correr simulaciones y proponer mejoras basadas en datos para empresas del sector.",
      },
      {
        title: "Soporte de proyectos de digitalización",
        type: "freelance",
        highlight: "Demanda creciente · Local y remoto",
        description:
          "Acompañar a empresas e industrias que están incorporando gemelos digitales, IoT y monitoreo inteligente.",
      },
    ],
    complementaryCourses: [
      {
        slug: "mineria-con-ia",
        title: "Minería con IA",
        reason:
          "El gemelo digital es la herramienta; Minería con IA te da la salida laboral concreta en el sector que es motor de La Rioja.",
      },
      {
        slug: "analisis-de-datos-con-ia",
        title: "Análisis de Datos con IA",
        reason:
          "Un gemelo digital vive de datos. Saber analizarlos e interpretarlos potencia enormemente tu perfil.",
      },
    ],
    employerValues: [
      {
        trait: "Pensamiento de procesos",
        description:
          "Entender cómo funciona una operación de punta a punta y detectar dónde se puede mejorar. Es lo que hace útil a un gemelo digital.",
      },
      {
        trait: "Rigurosidad con los datos",
        description:
          "Un modelo se basa en datos: verificar, cruzar información y no asumir nada sin comprobarlo es clave para que las decisiones sean confiables.",
      },
      {
        trait: "Curiosidad técnica",
        description:
          "Ganas de entender cómo funcionan las cosas y de aprender herramientas nuevas. En un sector que se digitaliza rápido, eso vale oro.",
      },
    ],
    freeTools: [
      "Claude.ai",
      "ChatGPT",
      "Gemini",
      "Google Sheets",
      "Looker Studio",
      "Google Colab",
      "Tinkercad / simuladores web",
      "NotebookLM",
    ],
    paidTools: ["Azure Digital Twins (nivel demo)", "Power BI Pro"],
    finalProject:
      "Construir el gemelo digital simplificado de un proceso real o simulado (una mina, un campo, una planta o un comercio): modelar el proceso, cargar datos, simular un cambio y presentar conclusiones con un tablero.",
  },

  "mineria-con-ia": {
    slug: "mineria-con-ia",
    longDescription:
      "La minería moderna tiene una enorme capa digital, y ahí es donde entra el talento formado: monitorear, analizar y decidir con datos, todo desde la computadora y sin manejar maquinaria. En este curso aprendés cómo la Inteligencia Artificial hace que la operación sea más segura, más eficiente y más cuidadosa con el ambiente, en un sector que es motor económico de La Rioja. Se enseña solo la capa digital y de datos; lo mecánico o de campo se menciona para que se entienda, pero la práctica con equipos es materia aparte.",
    whatYouLearn: [
      "Monitoreo de procesos y de planta en tiempo real",
      "Visión por computadora para seguridad (riesgos, protección y fatiga)",
      "Cámaras térmicas para anticipar fallas de equipos",
      "Drones e imágenes satelitales para exploración y control de taludes y presas",
      "Estimación de recursos y planificación minera con IA",
      "Mantenimiento predictivo aplicado al sector",
      "Gestión del agua y la energía con datos",
      "Monitoreo ambiental y licencia social",
    ],
    whoIsItFor:
      "Para habitantes de La Rioja que quieren insertarse en el sector minero desde la parte digital, y para quienes ya trabajan en el rubro y quieren sumar habilidades de datos e IA. No hace falta experiencia técnica previa.",
    prerequisites:
      "Manejo básico de computadora e internet. Ideal (no obligatorio) haber hecho Gemelos Digitales o Análisis de Datos.",
    jobOpportunities: [
      {
        title: "Asistente de monitoreo y operaciones mineras",
        type: "empleo",
        highlight: "Motor de La Rioja · Sector en crecimiento",
        description:
          "Trabajar en el monitoreo digital de procesos, seguridad y ambiente en empresas mineras y sus proveedoras.",
      },
      {
        title: "Analista de datos del sector",
        type: "empleo",
        highlight: "Perfil buscado · Bien remunerado",
        description:
          "Interpretar datos de operación, generar reportes y apoyar decisiones en proyectos de litio y minerales estratégicos.",
      },
      {
        title: "Soporte de seguridad y medio ambiente con IA",
        type: "freelance",
        highlight: "Demanda creciente · Local",
        description:
          "Colaborar con empresas del sector en monitoreo ambiental, visión por computadora y cumplimiento con apoyo de IA.",
      },
    ],
    complementaryCourses: [
      {
        slug: "gemelos-digitales-con-ia",
        title: "Gemelos Digitales con IA",
        reason:
          "Gemelos digitales es la herramienta transversal que potencia todo lo que aprendés en minería.",
      },
      {
        slug: "analisis-de-datos-con-ia",
        title: "Análisis de Datos con IA",
        reason:
          "La minería genera muchísimos datos. Saber analizarlos te convierte en un perfil clave del sector.",
      },
    ],
    employerValues: [
      {
        trait: "Cultura de seguridad",
        description:
          "En minería, la seguridad es lo primero. Se valora enormemente a quien piensa en el riesgo y en el cuidado de las personas.",
      },
      {
        trait: "Responsabilidad ambiental",
        description:
          "El sector necesita gente comprometida con el monitoreo y el cuidado del ambiente. Es parte central del trabajo.",
      },
      {
        trait: "Precisión y atención al detalle",
        description:
          "Los datos de operación deben ser exactos. Verificar y reportar con rigor es lo que genera confianza.",
      },
    ],
    freeTools: [
      "Claude.ai",
      "ChatGPT",
      "Gemini",
      "Google Earth Engine (nivel demo)",
      "QGIS",
      "Google Sheets",
      "Looker Studio",
      "Roboflow (visión por computadora, gratis)",
    ],
    paidTools: ["Power BI Pro", "Plataformas de monitoreo del sector"],
    finalProject:
      "Realizar un caso aplicado del sector: analizar un set de datos de operación (o imágenes satelitales), detectar un riesgo o una oportunidad de mejora y presentar un informe con recomendaciones.",
  },

  "programacion-y-desarrollo-con-ia": {
    slug: "programacion-y-desarrollo-con-ia",
    longDescription:
      "Creá aplicaciones, sitios web y automatismos usando Inteligencia Artificial, aunque nunca hayas programado. Es la nueva forma de desarrollar: le decís a la IA qué querés lograr y lo construís junto a ella, paso a paso, hasta publicarlo. Con herramientas como Cursor, v0, Lovable y Bolt, vas a pasar de cero a construir productos digitales reales, aprendiendo a guiar, corregir y publicar lo que hacés.",
    whatYouLearn: [
      "Fundamentos de la lógica de programación",
      "Herramientas de desarrollo asistido por IA (Cursor, Copilot)",
      "Creación de sitios web y apps sin escribir código complejo (v0, Lovable, Bolt)",
      "Diseño de interfaz (UX) de lo que construís",
      "Bases de datos y backend con Supabase",
      "Integración de funcionalidades: autenticación, pagos, APIs de IA",
      "Publicación y puesta en marcha de proyectos (Vercel)",
      "Cómo guiar y corregir a la IA para construir productos que funcionan",
    ],
    whoIsItFor:
      "Para personas ambiciosas que quieren aprender a crear software y productos digitales, la habilidad mejor paga del mercado. No necesitás saber programar de antes, pero sí ganas de dedicarle tiempo. Es el curso más largo y exigente, y el que abre las mejores oportunidades.",
    prerequisites:
      "Ganas de aprender y dedicación real (10-12 horas por semana). Manejo fluido de computadora. No se requiere experiencia en programación.",
    jobOpportunities: [
      {
        title: "Desarrollador junior asistido por IA",
        type: "empleo",
        highlight: "El perfil más buscado · Remoto global",
        description:
          "Construir y mantener aplicaciones web en startups y empresas. Uno de los puestos mejor pagos del mercado digital.",
      },
      {
        title: "Creador de webs y apps freelance",
        type: "freelance",
        highlight: "Alta demanda · Proyectos globales",
        description:
          "Crear sitios, landing pages y MVPs para emprendedores y PyMEs que necesitan presencia digital o validar ideas.",
      },
      {
        title: "Creador de tu propio producto (SaaS)",
        type: "emprendimiento",
        highlight: "Ingreso recurrente · Sin techo",
        description:
          "Construir tu propio software como servicio y venderlo a clientes recurrentes. El sueño de muchos desarrolladores.",
      },
    ],
    complementaryCourses: [
      {
        slug: "diseno-digital-con-ia",
        title: "Diseño Digital con IA",
        reason:
          "Saber diseñar además de programar te vuelve un perfil completo: productos que funcionan y se ven increíbles.",
      },
      {
        slug: "automatizacion-y-agentes-con-ia",
        title: "Automatización y Agentes con IA",
        reason:
          "Sumar automatización y agentes de IA a tus desarrollos multiplica el valor de lo que podés ofrecer.",
      },
    ],
    employerValues: [
      {
        trait: "Resolución de problemas",
        description:
          "Programar es resolver problemas todo el día. Se valora a quien ante un error lo investiga y prueba soluciones en lugar de frustrarse.",
      },
      {
        trait: "Aprender rápido",
        description:
          "La tecnología cambia cada semana. Poder aprender cosas nuevas rápido y aplicarlas vale más que saberlo todo de memoria.",
      },
      {
        trait: "Comunicación clara",
        description:
          "Saber explicar qué hiciste y por qué. Los mejores desarrolladores son los que el resto del equipo entiende.",
      },
      {
        trait: "Responsabilidad con el código",
        description:
          "Escribir con orden, probar antes de entregar y hacerse cargo cuando algo falla. La confianza se construye con cada entrega.",
      },
    ],
    freeTools: [
      "VS Code",
      "Cursor (gratis)",
      "GitHub Copilot Free",
      "Claude.ai",
      "ChatGPT",
      "v0 (gratis)",
      "Lovable (gratis)",
      "Bolt.new (gratis)",
      "Supabase (gratis)",
      "Vercel (gratis)",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    paidTools: ["Cursor Pro", "Claude Pro", "Claude Code"],
    finalProject:
      "Desarrollar y publicar una aplicación web funcional con IA integrada, lista para conseguir sus primeros usuarios reales.",
  },

  "pymes-y-negocios-con-ia": {
    slug: "pymes-y-negocios-con-ia",
    longDescription:
      "Usá la Inteligencia Artificial para hacer crecer un negocio propio o para ordenar y potenciar un emprendimiento: desde vender online hasta automatizar la atención al cliente, controlar las finanzas y ganar tiempo todos los días. Este curso está pensado para la realidad argentina —facturación con ARCA, medios de pago locales, WhatsApp— y sirve tanto para tu propio negocio como para ofrecer servicios de gestión a comercios de tu zona.",
    whatYouLearn: [
      "Automatización de tareas repetitivas del negocio",
      "Atención al cliente con IA y WhatsApp Business",
      "Venta online y tienda propia (Tienda Nube, Mercado Libre)",
      "Cobros digitales: MercadoPago, Modo, transferencias",
      "Facturación electrónica con ARCA",
      "Finanzas básicas y control de ingresos y gastos",
      "Organización y productividad diaria con IA",
      "Cómo ofrecer estos servicios de gestión a otros comercios",
    ],
    whoIsItFor:
      "Para dueños de comercios y emprendedores que quieren profesionalizar su negocio, y para quienes quieren generar ingresos ayudando a PyMEs y comercios locales a ordenarse y digitalizarse.",
    prerequisites:
      "Tener un negocio o idea de emprendimiento (o querer gestionar negocios de otros). Manejo básico de celular o computadora.",
    jobOpportunities: [
      {
        title: "Emprendedor digital",
        type: "emprendimiento",
        highlight: "Tu propio negocio · Sin techo",
        description:
          "Aplicar todo lo aprendido a tu propio emprendimiento para que sea más rentable, ordenado y escalable.",
      },
      {
        title: "Encargado de PyME con IA",
        type: "empleo",
        highlight: "Muy solicitado · Comercios y PyMEs",
        description:
          "Llevar la operación diaria de un comercio o PyME con herramientas digitales: ventas, atención, facturación, stock.",
      },
      {
        title: "Asistente de negocios / digitalización",
        type: "freelance",
        highlight: "Demanda constante · Local y remoto",
        description:
          "Ayudar a comercios a pasar de la gestión manual a la digital: facturación, cobros, atención y automatización.",
      },
    ],
    complementaryCourses: [
      {
        slug: "marketing-y-creacion-de-contenido-con-ia",
        title: "Marketing y Creación de Contenido con IA",
        reason:
          "Gestionar el negocio es una parte; saber conseguir clientes y vender es la otra. Juntas son imbatibles.",
      },
      {
        slug: "automatizacion-y-agentes-con-ia",
        title: "Automatización y Agentes con IA",
        reason:
          "Automatizar la atención y los procesos del negocio te ahorra horas y te permite ofrecer más servicios.",
      },
    ],
    employerValues: [
      {
        trait: "Responsabilidad con la información",
        description:
          "Cuando manejás plata, facturas y datos de un negocio, la confianza es todo: ser puntual, honesto y cuidadoso.",
      },
      {
        trait: "Resolución de problemas",
        description:
          "Los negocios tienen problemas todos los días. Se valora saber resolverlos con calma y eficiencia.",
      },
      {
        trait: "Trato amable con clientes",
        description:
          "Escuchar, responder con paciencia y hacer sentir bien atendida a la gente. Un negocio crece con buenos clientes.",
      },
    ],
    freeTools: [
      "Portal ARCA",
      "MercadoPago",
      "WhatsApp Business",
      "Tienda Nube",
      "Mercado Libre",
      "Claude.ai",
      "ChatGPT",
      "Gemini",
      "Google Sheets",
      "Notion (gratis)",
    ],
    paidTools: ["Tienda Nube (plan pago)", "Herramientas de gestión del rubro"],
    finalProject:
      "Presentar un plan de digitalización aplicado a un negocio real o simulado: venta online, cobros, facturación ARCA y al menos un proceso automatizado con IA.",
  },

  "practica-juridica-con-ia": {
    slug: "practica-juridica-con-ia",
    longDescription:
      "Aplicá la Inteligencia Artificial al trabajo legal para redactar, investigar y organizar mucho más rápido, con más precisión y menos tareas tediosas. Este curso está pensado para estudios jurídicos, escribanías, organismos públicos y áreas legales que quieren incorporar IA de forma útil y, sobre todo, responsable: sin perder rigor ni criterio profesional.",
    whatYouLearn: [
      "Herramientas de IA aplicadas al trabajo jurídico",
      "Redacción asistida de escritos y documentos legales",
      "Análisis de documentos extensos con IA",
      "Búsqueda e interpretación de jurisprudencia",
      "Organización y seguimiento de casos",
      "Automatización de tareas administrativas del estudio",
      "Uso ético, responsable y con control humano",
      "Límites y riesgos de la IA en lo legal (verificación de fuentes)",
    ],
    whoIsItFor:
      "Para abogados, escribanos, procuradores, estudiantes de Derecho y personal administrativo de áreas legales que quieren trabajar más rápido y mejor con IA, manteniendo el criterio y la responsabilidad profesional.",
    prerequisites:
      "Estar vinculado al ámbito jurídico o administrativo-legal (o querer trabajar en él). Manejo básico de computadora.",
    jobOpportunities: [
      {
        title: "Asistente jurídico digital",
        type: "empleo",
        highlight: "Nicho especializado · Estudios y organismos",
        description:
          "Apoyar a estudios jurídicos y áreas legales con redacción asistida, análisis de documentos y organización de casos.",
      },
      {
        title: "Apoyo administrativo-legal con IA",
        type: "freelance",
        highlight: "Demanda creciente · Flexible",
        description:
          "Ofrecer servicios de redacción, organización documental y automatización a estudios y profesionales del Derecho.",
      },
    ],
    complementaryCourses: [
      {
        slug: "automatizacion-y-agentes-con-ia",
        title: "Automatización y Agentes con IA",
        reason:
          "Automatizar plazos, seguimientos y documentación potencia enormemente el trabajo de un estudio jurídico.",
      },
      {
        slug: "pymes-y-negocios-con-ia",
        title: "PyMEs y Negocios con IA",
        reason:
          "Un estudio también es un negocio: gestionar clientes, cobros y organización lo hace más rentable.",
      },
    ],
    employerValues: [
      {
        trait: "Rigor y verificación",
        description:
          "La IA puede equivocarse o inventar. Verificar cada fuente y cada cita es innegociable en lo legal.",
      },
      {
        trait: "Confidencialidad",
        description:
          "El trabajo legal maneja información sensible. Cuidar la privacidad y usar las herramientas con criterio es fundamental.",
      },
      {
        trait: "Ética profesional",
        description:
          "La IA es una ayuda, no un reemplazo del criterio del profesional. Usarla de forma responsable es lo que se valora.",
      },
    ],
    freeTools: [
      "Claude.ai",
      "ChatGPT",
      "Gemini",
      "NotebookLM",
      "Perplexity",
      "Google Workspace",
    ],
    paidTools: ["Claude Pro", "Herramientas legales con IA del mercado"],
    finalProject:
      "Resolver un caso práctico: redactar un escrito con asistencia de IA, analizar un documento extenso y organizar la información del caso, documentando el control humano y la verificación de fuentes.",
  },

  "automatizacion-y-agentes-con-ia": {
    slug: "automatizacion-y-agentes-con-ia",
    longDescription:
      "Automatizá tareas repetitivas y creá «agentes» de IA que trabajan solos —responden mensajes, cargan datos, hacen seguimientos— para empresas y comercios que pagan por ese tiempo ahorrado. La diferencia clave de este curso: no vas a automatizar solo tu negocio, vas a aprender a vender automatizaciones como servicio. Es uno de los oficios digitales de mayor demanda del momento, y podés cobrarlo en dólares.",
    whatYouLearn: [
      "Fundamentos de automatización y lógica de flujos",
      "Automatización sin código conectando apps entre sí (Make, n8n)",
      "Creación de agentes de IA que ejecutan tareas solos",
      "Chatbots que responden sobre los datos de un negocio (RAG)",
      "Integración de APIs de IA (Claude, GPT) en los flujos",
      "Automatización de atención al cliente, ventas y administración",
      "Integración de múltiples herramientas y plataformas",
      "Cómo vender servicios de automatización: propuestas, precios y entrega",
    ],
    whoIsItFor:
      "Para quienes quieren ofrecer servicios digitales de alto valor sin programar de forma tradicional. Ideal para emprendedores, freelancers y profesionales que quieren generar ingresos resolviendo problemas reales con tecnología.",
    prerequisites:
      "Manejo básico de computadora. Recomendable haber hecho PyMEs y Negocios o IA aplicada al trabajo.",
    jobOpportunities: [
      {
        title: "Automatizador freelance",
        type: "freelance",
        highlight: "Alto valor por proyecto · Freelance global",
        description:
          "Las empresas pagan muy bien por automatizar sus procesos. Un solo flujo bien armado tiene alto valor según su complejidad.",
      },
      {
        title: "Constructor de bots y asistentes",
        type: "freelance",
        highlight: "Nicho en auge · Freelance premium",
        description:
          "Crear chatbots y agentes de IA a medida para comercios, PyMEs y agencias que quieren atender y vender mejor.",
      },
      {
        title: "Consultor de procesos / No-Code",
        type: "empleo",
        highlight: "Perfil buscado · Empresas y agencias",
        description:
          "Optimizar operaciones internas y de clientes conectando herramientas y automatizando tareas repetitivas.",
      },
    ],
    complementaryCourses: [
      {
        slug: "pymes-y-negocios-con-ia",
        title: "PyMEs y Negocios con IA",
        reason:
          "Entender los procesos de un negocio te permite identificar qué automatizar y vender soluciones más completas.",
      },
      {
        slug: "programacion-y-desarrollo-con-ia",
        title: "Programación y Desarrollo con IA",
        reason:
          "Sumar desarrollo a la automatización te abre proyectos más grandes y mejor pagos.",
      },
    ],
    employerValues: [
      {
        trait: "Pensamiento sistémico",
        description:
          "Mapear procesos completos y encontrar dónde se puede automatizar. Es la base de una buena solución.",
      },
      {
        trait: "Integración de herramientas",
        description:
          "Conectar múltiples plataformas en flujos coherentes y confiables que no se rompan.",
      },
      {
        trait: "Orientación al cliente",
        description:
          "Entender el problema real del negocio y entregar una solución que le ahorre tiempo o plata de verdad.",
      },
    ],
    freeTools: [
      "Make (plan gratuito)",
      "n8n (gratis / self-hosted)",
      "Claude.ai",
      "ChatGPT",
      "Google Sheets",
      "Notion (gratis)",
      "WhatsApp Business API (sandbox)",
    ],
    paidTools: ["Make Pro", "n8n Cloud", "Claude Pro"],
    finalProject:
      "Diseñar, construir y documentar un sistema de automatización completo para un caso real o simulado —incluyendo un agente o chatbot— junto con una propuesta comercial lista para presentar a un cliente.",
  },

  "analisis-de-datos-con-ia": {
    slug: "analisis-de-datos-con-ia",
    longDescription:
      "Convertí montañas de datos en decisiones claras, con ayuda de la Inteligencia Artificial y sin necesidad de saber estadística avanzada ni programar. En este curso aprendés a ordenar, interpretar y presentar información para que cualquiera la entienda: crear tableros, gráficos e informes que ayudan a empresas, comercios y organizaciones a tomar mejores decisiones.",
    whatYouLearn: [
      "Ordenar, limpiar y organizar datos con IA, Excel y Sheets",
      "Crear tableros interactivos (Looker Studio, Metabase)",
      "Usar IA conversacional para analizar información",
      "Visualizar datos de forma clara y profesional",
      "Identificar tendencias y patrones en datos de negocio",
      "Consultas básicas a bases de datos (SQL introductorio)",
      "Generar informes que se entienden",
      "Presentar hallazgos y recomendaciones",
    ],
    whoIsItFor:
      "Para personas con gusto por los números y el orden. No hace falta ser experto en matemáticas, pero sí tener curiosidad por entender qué dicen los datos. Ideal para quienes buscan un perfil profesional muy demandado.",
    prerequisites:
      "Manejo básico de Excel o Google Sheets. Recomendable haber hecho un curso introductorio de IA aplicada.",
    jobOpportunities: [
      {
        title: "Analista de datos junior",
        type: "empleo",
        highlight: "Perfil escaso · Muy valorado",
        description:
          "Analizar datos de ventas, clientes y operaciones, y generar reportes para la toma de decisiones.",
      },
      {
        title: "Asistente de inteligencia de negocios",
        type: "empleo",
        highlight: "Alta demanda global · Remoto",
        description:
          "Apoyar el área de BI de empresas preparando datos y creando visualizaciones y tableros.",
      },
      {
        title: "Soporte de reportes / dashboards freelance",
        type: "freelance",
        highlight: "Proyectos puntuales · Buen margen",
        description:
          "Crear tableros de control para PyMEs y comercios que quieren visualizar sus métricas clave.",
      },
    ],
    complementaryCourses: [
      {
        slug: "pymes-y-negocios-con-ia",
        title: "PyMEs y Negocios con IA",
        reason:
          "Entender el negocio le da sentido a los datos: sabés qué medir y para qué.",
      },
      {
        slug: "marketing-y-creacion-de-contenido-con-ia",
        title: "Marketing y Creación de Contenido con IA",
        reason:
          "El marketing genera muchísimos datos. Saber analizarlos te vuelve un perfil muy valioso.",
      },
    ],
    employerValues: [
      {
        trait: "Pensamiento crítico",
        description:
          "No alcanza con mostrar números: se valora preguntarse 'por qué pasa esto' y 'qué deberíamos hacer'.",
      },
      {
        trait: "Claridad para comunicar",
        description:
          "Traducir gráficos y números en lenguaje simple que cualquiera entienda es clave.",
      },
      {
        trait: "Rigurosidad",
        description:
          "Verificar, cruzar información y no asumir nada sin comprobarlo. Un error en los datos lleva a malas decisiones.",
      },
    ],
    freeTools: [
      "Google Sheets + Gemini",
      "Looker Studio",
      "Excel Online",
      "ChatGPT",
      "Claude.ai",
      "Metabase (open source)",
      "Google Colab",
      "NotebookLM",
    ],
    paidTools: ["Power BI Pro", "Microsoft Copilot 365 Excel"],
    finalProject:
      "Crear un tablero real para un comercio o PyME (con datos reales o simulados), con hallazgos documentados y recomendaciones accionables.",
  },

  "marketing-y-creacion-de-contenido-con-ia": {
    slug: "marketing-y-creacion-de-contenido-con-ia",
    longDescription:
      "Aprendé a conseguir clientes y vender online: creá contenido que atrae y armá campañas simples, todo con ayuda de la Inteligencia Artificial. Es un punto de partida claro para manejar las redes y la publicidad de una marca o negocio, sin necesidad de ser experto. La creación de las piezas visuales (imágenes y video) la profundiza el curso de Diseño Digital; acá el foco está en la estrategia, el contenido y las campañas.",
    whatYouLearn: [
      "Estrategia simple: público, oferta y embudo (atraer y convertir)",
      "Planificación de contenido para redes con IA (ideas, textos y guiones)",
      "Copywriting persuasivo con IA para redes, anuncios y mensajes",
      "Publicidad básica en Meta y Google con campañas asistidas por IA",
      "Email y WhatsApp para vender y fidelizar",
      "Manejo de redes sociales y calendario de contenido",
      "Métricas básicas para saber si funciona",
      "Cómo ofrecer estos servicios a marcas y comercios",
    ],
    whoIsItFor:
      "Para emprendedores que quieren vender más, futuros community managers y personas que quieren trabajar gestionando redes y publicidad para negocios. Si te interesa el mundo de las ventas digitales, este curso es para vos.",
    prerequisites:
      "Saber usar redes sociales a nivel básico. No se requiere experiencia previa.",
    jobOpportunities: [
      {
        title: "Community manager",
        type: "empleo",
        highlight: "Demanda constante · Remoto",
        description:
          "Gestionar las redes de marcas y comercios: contenido, calendario, respuestas y resultados medibles.",
      },
      {
        title: "Gestor de redes y campañas freelance",
        type: "freelance",
        highlight: "Muy solicitado · Flexible",
        description:
          "Manejar la presencia digital y la publicidad de varios clientes, optimizando presupuesto y resultados.",
      },
      {
        title: "Creador de contenido / UGC",
        type: "emprendimiento",
        highlight: "Economía de creadores · En expansión",
        description:
          "Producir contenido para marcas (UGC) o monetizar cuentas propias con estrategia de crecimiento.",
      },
      {
        title: "Marketing para PyMEs",
        type: "freelance",
        highlight: "Ideal para empezar · Local y remoto",
        description:
          "Ayudar a negocios locales a conseguir clientes online con campañas simples y contenido efectivo.",
      },
    ],
    complementaryCourses: [
      {
        slug: "diseno-digital-con-ia",
        title: "Diseño Digital con IA",
        reason:
          "El marketing necesita piezas visuales. Saber crearlas (imágenes y video) multiplica tu valor y tus ingresos.",
      },
      {
        slug: "pymes-y-negocios-con-ia",
        title: "PyMEs y Negocios con IA",
        reason:
          "Entender el negocio hace que tu marketing venda de verdad, no solo que sume likes.",
      },
    ],
    employerValues: [
      {
        trait: "Orientación a resultados",
        description:
          "En marketing los números hablan: se valora demostrar con datos que tu trabajo genera clientes, no solo likes.",
      },
      {
        trait: "Iniciativa y autonomía",
        description:
          "Proponer ideas, probar cosas nuevas y ajustar rápido cuando algo no funciona.",
      },
      {
        trait: "Empatía con el cliente",
        description:
          "Entender qué necesita y qué le preocupa a la persona que va a comprar. Eso hace la diferencia entre un anuncio que vende y uno que se ignora.",
      },
    ],
    freeTools: [
      "Meta Ads Manager",
      "Google Ads",
      "Claude.ai",
      "ChatGPT",
      "Gemini",
      "Canva (gratis)",
      "CapCut",
      "Brevo (gratis)",
      "Google Analytics 4",
      "Metricool (gratis)",
    ],
    paidTools: ["Meta / Google Ads (presupuesto)", "Metricool Pro"],
    finalProject:
      "Planificar y lanzar una campaña real o simulada para una marca o negocio: estrategia, contenido, una campaña de ads con presupuesto acotado y análisis de resultados.",
  },

  "diseno-digital-con-ia": {
    slug: "diseno-digital-con-ia",
    longDescription:
      "Creá las piezas visuales que toda marca y negocio necesita —logos, identidad, imágenes y también edición de video con IA para redes— produciendo más rápido y con mejor calidad, aunque no vengas del mundo del diseño. Es uno de los oficios digitales de entrada más demandados: con IA, la barrera para empezar es más baja que nunca, y el trabajo se cobra bien y de forma remota.",
    whatYouLearn: [
      "Fundamentos del diseño y de la identidad de marca",
      "Creación de logos y paletas de color",
      "Generación y edición de imágenes con IA (retoque, quitar y cambiar fondos)",
      "Edición de video con IA (cortes, subtítulos y formatos verticales para Reels/Shorts)",
      "Piezas para redes sociales (posts, historias, portadas)",
      "Diseño de landing pages y pantallas (UX/UI)",
      "Herramientas: Canva, Figma y modelos de imagen y video con IA",
      "Exportación y entrega profesional a clientes",
    ],
    whoIsItFor:
      "Para personas con gusto por lo visual que quieren generar ingresos creando contenido gráfico y audiovisual. No necesitás experiencia: las herramientas de IA hacen gran parte del trabajo pesado.",
    prerequisites:
      "Saber navegar internet y usar aplicaciones básicas. Interés por lo visual. No se requiere experiencia en diseño.",
    jobOpportunities: [
      {
        title: "Diseñador gráfico freelance",
        type: "freelance",
        highlight: "Alta demanda · Freelance global",
        description:
          "Crear logos, identidad y piezas para marcas, comercios y emprendedores. Uno de los servicios más pedidos.",
      },
      {
        title: "Editor de video / creador de contenido audiovisual",
        type: "freelance",
        highlight: "Economía de contenido · Muy demandado",
        description:
          "Editar Reels, Shorts y videos para creadores, marcas y agencias. De los trabajos remotos mejor pagos de entrada.",
      },
      {
        title: "Diseñador UX/UI junior",
        type: "empleo",
        highlight: "Perfil buscado · Startups y agencias",
        description:
          "Diseñar landing pages y pantallas de apps y sitios, cuidando la experiencia del usuario.",
      },
      {
        title: "Servicios de diseño para PyMEs",
        type: "freelance",
        highlight: "Ideal para empezar · Local y remoto",
        description:
          "Ofrecer diseño y contenido visual a negocios locales que necesitan mejorar su imagen y sus redes.",
      },
    ],
    complementaryCourses: [
      {
        slug: "marketing-y-creacion-de-contenido-con-ia",
        title: "Marketing y Creación de Contenido con IA",
        reason:
          "Diseñar las piezas Y saber la estrategia para difundirlas te permite ofrecer el servicio completo.",
      },
      {
        slug: "programacion-y-desarrollo-con-ia",
        title: "Programación y Desarrollo con IA",
        reason:
          "Sumar desarrollo al diseño te vuelve un perfil completo: podés diseñar y construir sitios y apps.",
      },
    ],
    employerValues: [
      {
        trait: "Ojo para el detalle visual",
        description:
          "La estética y la coherencia importan. Se valora a quien cuida cada detalle de una pieza.",
      },
      {
        trait: "Velocidad de entrega",
        description:
          "Con IA se puede producir rápido. Entregar bien y a tiempo es lo que fideliza clientes.",
      },
      {
        trait: "Escuchar al cliente",
        description:
          "Traducir ideas vagas en diseño concreto. Saber preguntar lo correcto es una habilidad clave.",
      },
    ],
    freeTools: [
      "Canva (gratis)",
      "Figma (gratis)",
      "CapCut",
      "Photoroom (gratis)",
      "Krea AI",
      "Leonardo.ai",
      "Bing Image Creator",
      "Claude.ai",
      "ChatGPT",
    ],
    paidTools: ["Canva Pro", "Midjourney", "Adobe (opcional)", "CapCut Pro"],
    finalProject:
      "Armar un mini-portafolio: la identidad visual completa de una marca (logo, paleta y piezas para redes) más un video corto editado con IA, listo para mostrar a clientes.",
  },
};
