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
  "creacion-de-contenido-con-ia": {
    slug: "creacion-de-contenido-con-ia",
    longDescription:
      "Este curso te lleva de cero a profesional en la creación de contenido digital usando Inteligencia Artificial. Vas a aprender a producir videos cortos, reels, contenido para YouTube, podcasts, carruseles y posts para redes sociales, todo con herramientas de IA que hacen el trabajo pesado por vos. No necesitás experiencia previa ni equipos caros: con tu celular y estas herramientas, ya podés empezar.",
    whatYouLearn: [
      "Crear guiones y copys con IA para cualquier formato",
      "Editar videos profesionales con CapCut y DaVinci Resolve",
      "Generar voces, música y efectos de sonido con IA",
      "Crear imágenes y thumbnails atractivos con IA",
      "Planificar calendarios de contenido para redes sociales",
      "Grabar y editar podcasts completos",
      "Optimizar contenido para cada plataforma (Instagram, TikTok, YouTube)",
      "Construir una marca personal o para clientes",
    ],
    whoIsItFor:
      "Para cualquier persona que quiera crear contenido digital, sin importar la edad ni la experiencia. Si alguna vez quisiste tener tu canal, tu cuenta profesional o trabajar creando contenido para otros, este curso es para vos.",
    prerequisites:
      "Ninguno. Solo necesitás un celular o computadora con internet. Te enseñamos todo desde el principio.",
    jobOpportunities: [
      {
        title: "Editor de video freelance",
        type: "freelance",
        highlight: "Alta demanda · Freelance global",
        description:
          "Editar reels, videos cortos y contenido para marcas y creadores. Uno de los trabajos más demandados en plataformas freelance.",
      },
      {
        title: "Community manager con IA",
        type: "empleo",
        highlight: "Crecimiento acelerado · Remoto",
        description:
          "Gestionar las redes sociales de empresas y emprendedores, creando contenido, respondiendo consultas y analizando métricas.",
      },
      {
        title: "Creador de contenido propio",
        type: "emprendimiento",
        highlight: "Sin límite de clientes · Flexible",
        description:
          "Monetizar tu propio canal o cuenta con sponsorships, afiliados y productos digitales.",
      },
      {
        title: "Productor de podcasts",
        type: "freelance",
        highlight: "Mercado en expansión · Creativo",
        description:
          "Grabar, editar y publicar podcasts para profesionales, empresas o medios que quieren tener presencia en audio.",
      },
    ],
    complementaryCourses: [
      {
        slug: "marketing-digital-con-ia",
        title: "Marketing Digital con IA",
        reason:
          "Aprender a crear contenido es el primer paso. Combinándolo con marketing digital, vas a saber cómo promocionarlo, llegar a más gente y convertir seguidores en clientes.",
      },
      {
        slug: "ecommerce-con-ia",
        title: "E-commerce con IA",
        reason:
          "Si creás contenido y además sabés vender online, podés montar tu propia tienda de productos digitales, cursos o servicios creativos.",
      },
    ],
    employerValues: [
      {
        trait: "Creatividad con criterio",
        description:
          "No se trata de hacer cosas raras. Las empresas valoran a alguien que proponga ideas frescas pero alineadas con la marca y el objetivo del negocio.",
      },
      {
        trait: "Constancia y cumplimiento",
        description:
          "Entregar contenido en tiempo y forma, todas las semanas, es lo que diferencia a un profesional de un aficionado. Los clientes necesitan alguien confiable.",
      },
      {
        trait: "Capacidad de adaptación",
        description:
          "Las plataformas cambian, los formatos evolucionan. Quien se actualiza rápido y no le tiene miedo a lo nuevo es siempre más valioso para cualquier equipo.",
      },
      {
        trait: "Buena comunicación",
        description:
          "Saber escuchar lo que el cliente necesita, preguntar cuando algo no queda claro y explicar tus ideas con claridad. Esto vale más que cualquier herramienta técnica.",
      },
    ],
    freeTools: [
      "Claude.ai",
      "ChatGPT",
      "Gemini",
      "CapCut",
      "DaVinci Resolve",
      "ElevenLabs (gratis)",
      "Suno (gratis)",
      "Krea AI",
      "Bing Image Creator",
      "Leonardo.ai",
      "OpusClip (gratis)",
    ],
    paidTools: ["HeyGen", "Descript", "Midjourney", "Runway Gen-3"],
    finalProject:
      "Crear tu propia cuenta o canal con al menos 30 piezas de contenido publicadas, más 3 trabajos reales para clientes (pueden ser conocidos o pequeños negocios locales).",
  },

  "ia-para-tu-trabajo": {
    slug: "ia-para-tu-trabajo",
    longDescription:
      "Este es el curso más universal de la plataforma. No importa si sos empleado, profesional independiente, docente, administrativo o estudiante: acá vas a aprender a usar Inteligencia Artificial para hacer mejor y más rápido todo lo que ya hacés en tu trabajo. Desde escribir emails profesionales hasta analizar documentos complejos, crear presentaciones y organizar tu vida productiva.",
    whatYouLearn: [
      "Usar Claude, ChatGPT y Gemini como asistentes profesionales",
      "Automatizar tareas repetitivas con IA",
      "Crear documentos, informes y presentaciones con IA",
      "Analizar datos en Excel y Google Sheets con IA",
      "Escribir emails profesionales en segundos",
      "Investigar y resumir información compleja",
      "Transcribir reuniones y generar actas automáticas",
      "Organizar proyectos y tareas con herramientas de IA",
    ],
    whoIsItFor:
      "Para cualquier persona que use una computadora o celular en su trabajo. Empleados públicos, privados, profesionales independientes, docentes, administrativos, comerciantes, estudiantes. Si trabajás, este curso te hace mejor en lo que hacés.",
    prerequisites:
      "Saber usar una computadora o celular a nivel básico (navegar internet, usar email). Nada más.",
    jobOpportunities: [
      {
        title: "Asistente virtual con IA",
        type: "freelance",
        highlight: "Muy buscado · Todas las industrias",
        description:
          "Ayudar a profesionales y empresas a gestionar su día a día usando herramientas de IA: emails, agendas, documentos, investigaciones.",
      },
      {
        title: "Consultor de transformación digital",
        type: "freelance",
        highlight: "Alta demanda · 100% remoto",
        description:
          "Asesorar a PyMEs y comercios locales sobre cómo incorporar IA en sus procesos diarios para ahorrar tiempo y dinero.",
      },
      {
        title: "Capacitador interno de IA",
        type: "empleo",
        highlight: "Crecimiento rápido · Empresas tech",
        description:
          "Enseñar a otros empleados de tu empresa a usar herramientas de IA, convirtiéndote en referente dentro de tu organización.",
      },
      {
        title: "Mejor desempeño en tu empleo actual",
        type: "empleo",
        highlight: "Diferenciación profesional · Cualquier rubro",
        description:
          "No necesitás cambiar de trabajo. Usando IA vas a hacer más en menos tiempo, lo que te posiciona para ascensos y mejores condiciones.",
      },
    ],
    complementaryCourses: [
      {
        slug: "gestion-de-negocios-con-ia",
        title: "Gestión de Negocios con IA",
        reason:
          "Si ya dominás IA para tu trabajo, el siguiente paso natural es aprender a digitalizar un negocio completo: facturación, finanzas, clientes.",
      },
      {
        slug: "analisis-de-datos-con-ia",
        title: "Análisis de Datos con IA",
        reason:
          "Saber analizar datos te convierte en alguien indispensable en cualquier empresa. Combina perfecto con las habilidades de productividad.",
      },
    ],
    employerValues: [
      {
        trait: "Proactividad",
        description:
          "Las empresas valoran a la persona que no espera instrucciones para todo, sino que identifica problemas y propone soluciones antes de que se los pidan.",
      },
      {
        trait: "Organización y eficiencia",
        description:
          "Cumplir plazos, mantener el orden en los proyectos y hacer buen uso del tiempo. La IA te ayuda con esto, pero la actitud tiene que ser tuya.",
      },
      {
        trait: "Ganas de aprender",
        description:
          "El mundo laboral cambia rápido. Los empleadores buscan gente que se mantenga actualizada por voluntad propia, no porque se lo obliguen.",
      },
      {
        trait: "Trabajo en equipo",
        description:
          "Saber colaborar, compartir información y ayudar a los compañeros. Una persona que mejora al equipo completo siempre tiene lugar.",
      },
    ],
    freeTools: [
      "Claude.ai",
      "ChatGPT",
      "Gemini",
      "NotebookLM",
      "Perplexity",
      "Notion AI (gratis)",
      "Microsoft Copilot Web",
      "Otter.ai (gratis)",
      "Gamma (gratis)",
      "Google Workspace",
    ],
    paidTools: ["Microsoft Copilot 365", "Superhuman AI"],
    finalProject:
      "Documentar un caso real de transformación con IA en tu trabajo o negocio actual, con métricas de mejora: cuánto tiempo ahorraste, qué procesos mejoraste, qué resultados obtuviste.",
  },

  "marketing-digital-con-ia": {
    slug: "marketing-digital-con-ia",
    longDescription:
      "Aprendé a vender online de verdad. Este curso te enseña a crear campañas publicitarias en Meta, Google y TikTok, diseñar embudos de venta automatizados, escribir copys que convierten y generar creativos profesionales con IA. Todo con foco en resultados medibles: cuánto invertís, cuánto vendés, cuánto ganás.",
    whatYouLearn: [
      "Crear y optimizar campañas en Meta Ads, Google Ads y TikTok Ads",
      "Diseñar embudos de venta automatizados con email marketing",
      "Escribir copys persuasivos con IA",
      "Generar creativos publicitarios (imágenes y videos) con IA",
      "Analizar métricas: CPA, ROAS, ROI, CTR",
      "Configurar Google Analytics 4 y Microsoft Clarity",
      "Automatizar procesos con n8n y Make",
      "Optimizar SEO con herramientas de IA",
    ],
    whoIsItFor:
      "Para emprendedores que quieren vender más, futuros agencieros de marketing, gente que quiere trabajar gestionando publicidad online para empresas. Si te interesa el mundo de las ventas digitales, este curso es para vos.",
    prerequisites:
      "Saber usar redes sociales a nivel básico. Recomendable (no obligatorio) haber hecho primero IA para tu Trabajo.",
    jobOpportunities: [
      {
        title: "Performance marketer freelance",
        type: "freelance",
        highlight: "Muy solicitado · Freelance o agencia",
        description:
          "Gestionar campañas publicitarias para clientes, optimizando presupuesto y resultados. Altamente demandado por PyMEs.",
      },
      {
        title: "Community manager senior",
        type: "empleo",
        highlight: "Demanda constante · Remoto global",
        description:
          "Gestionar redes sociales con enfoque estratégico, no solo publicar contenido sino generar resultados medibles.",
      },
      {
        title: "Dueño de agencia de marketing",
        type: "emprendimiento",
        highlight: "Alto valor · Empresas y startups",
        description:
          "Armar tu propia agencia gestionando clientes de distintos rubros. Con IA podés dar servicio profesional siendo una persona sola.",
      },
      {
        title: "Especialista en email marketing",
        type: "freelance",
        highlight: "Ideal para empezar · Flexible",
        description:
          "Diseñar y automatizar secuencias de email que generan ventas. Un servicio muy valorado por tiendas online y SaaS.",
      },
    ],
    complementaryCourses: [
      {
        slug: "creacion-de-contenido-con-ia",
        title: "Creación de Contenido con IA",
        reason:
          "El marketing necesita contenido. Si además de saber hacer campañas también sabés crear los videos, imágenes y copys, tu valor se multiplica.",
      },
      {
        slug: "ecommerce-con-ia",
        title: "E-commerce con IA",
        reason:
          "Marketing + E-commerce es la combinación perfecta. Podés montar tiendas y además saber cómo llevarles tráfico y ventas.",
      },
    ],
    employerValues: [
      {
        trait: "Orientación a resultados",
        description:
          "En marketing, los números hablan. Las empresas buscan a alguien que pueda demostrar con datos que su trabajo genera ventas, no solo likes.",
      },
      {
        trait: "Pensamiento analítico",
        description:
          "Saber leer métricas, identificar qué funciona y qué no, y tomar decisiones basadas en datos. No hace falta ser matemático, pero sí curioso con los números.",
      },
      {
        trait: "Iniciativa y autonomía",
        description:
          "Un buen marketer no espera que le digan qué hacer. Propone ideas, prueba cosas nuevas y ajusta rápido cuando algo no funciona.",
      },
      {
        trait: "Empatía con el cliente",
        description:
          "Entender qué necesita, qué siente y qué le preocupa a la persona que va a comprar. Eso es lo que hace la diferencia entre un anuncio que vende y uno que se ignora.",
      },
    ],
    freeTools: [
      "Meta Ads Manager",
      "Google Ads",
      "TikTok Ads",
      "Claude.ai",
      "ChatGPT",
      "Gemini",
      "Brevo (gratis)",
      "MailerLite (gratis)",
      "Google Analytics 4",
      "Microsoft Clarity",
      "Google Search Console",
      "n8n",
      "Make (gratis)",
    ],
    paidTools: ["Surfer SEO", "Frase", "Klaviyo", "Creatify"],
    finalProject:
      "Lanzar una campaña publicitaria real con USD 50-100 de presupuesto, documentando todo el proceso: estrategia, creativos, segmentación, métricas y resultados.",
  },

  "gestion-de-negocios-con-ia": {
    slug: "gestion-de-negocios-con-ia",
    longDescription:
      "Si tenés un comercio, un emprendimiento o trabajás de forma independiente, este curso te enseña a poner todo en orden usando tecnología. Vas a aprender a facturar electrónicamente con ARCA (actualizado a la normativa 2026), llevar las cuentas, gestionar stock, atender clientes con IA y digitalizar todos los procesos de tu negocio. Diseñado especialmente para la realidad argentina.",
    whatYouLearn: [
      "Facturación electrónica con ARCA (RG 5824/2026)",
      "Contabilidad básica y gestión financiera con planillas",
      "Control de stock e inventario digitalizado",
      "Atención al cliente con WhatsApp Business e IA",
      "Cobros digitales con MercadoPago, Modo y Ualá Bis",
      "Automatización de tareas administrativas",
      "Formalización de negocios y monotributo",
      "Marketing básico para comercios locales",
    ],
    whoIsItFor:
      "Para dueños de comercios (kioscos, almacenes, peluquerías, restaurantes), profesionales independientes, emprendedores y cualquier persona que quiera aprender a gestionar un negocio de forma profesional y digital.",
    prerequisites:
      "Tener un negocio o idea de emprendimiento (o querer trabajar gestionando negocios de otros). Manejo básico de celular o computadora.",
    jobOpportunities: [
      {
        title: "Consultor de digitalización para comercios",
        type: "freelance",
        highlight: "Creciente demanda · Freelance local y remoto",
        description:
          "Ayudar a comercios locales a pasar de la gestión manual a la digital: facturación, cobros, stock, clientes.",
      },
      {
        title: "Asistente administrativo digital",
        type: "empleo",
        highlight: "Muy solicitado · 100% remoto",
        description:
          "Llevar la administración de empresas usando herramientas digitales y IA: facturación, cobranzas, reportes.",
      },
      {
        title: "Tu propio negocio profesionalizado",
        type: "emprendimiento",
        highlight: "Tu propio negocio · Sin límites",
        description:
          "Aplicar todo lo aprendido a tu propio emprendimiento para que sea más rentable, ordenado y escalable.",
      },
      {
        title: "Bookkeeper / Asistente contable",
        type: "freelance",
        highlight: "Demanda constante · Freelance o empleo",
        description:
          "Llevar los libros contables básicos de PyMEs y comercios, incluyendo facturación ARCA y conciliación bancaria.",
      },
    ],
    complementaryCourses: [
      {
        slug: "ecommerce-con-ia",
        title: "E-commerce con IA",
        reason:
          "Si ya sabés gestionar un negocio, el paso natural es venderlo online. Aprendé a montar tu tienda digital y expandir tus ventas más allá del local físico.",
      },
      {
        slug: "ia-para-tu-trabajo",
        title: "IA para tu Trabajo",
        reason:
          "Complementá la gestión de negocios con herramientas de productividad general: documentos, presentaciones, emails profesionales.",
      },
    ],
    employerValues: [
      {
        trait: "Responsabilidad y compromiso",
        description:
          "Cuando manejás plata, facturas y datos de un negocio, la confianza es todo. Ser puntual, honesto y cuidadoso con la información es lo que más valoran.",
      },
      {
        trait: "Atención al detalle",
        description:
          "Un número mal cargado puede generar problemas serios. La gente que revisa su trabajo, que chequea dos veces, siempre es más valorada.",
      },
      {
        trait: "Resolución de problemas",
        description:
          "Los negocios tienen problemas todos los días. Lo que se valora no es que no haya problemas, sino saber resolverlos con calma y eficiencia.",
      },
      {
        trait: "Trato amable con clientes",
        description:
          "Saber tratar a las personas, escuchar sus necesidades y responder con paciencia. Un negocio crece cuando sus clientes se sienten bien atendidos.",
      },
    ],
    freeTools: [
      "Portal ARCA",
      "Facturador móvil ARCA",
      "Mi Argentina",
      "MercadoPago",
      "Google Workspace",
      "WhatsApp Business",
      "Claude.ai",
      "ChatGPT",
      "Gemini",
      "Excel / Google Sheets",
      "Xubio (gratis)",
      "Notion (gratis)",
    ],
    paidTools: ["Tango Software", "Holded"],
    finalProject:
      "Presentar un plan de digitalización completo aplicado a un negocio real: facturación ARCA configurada, sistema de stock, cobros digitales, y al menos un proceso automatizado con IA.",
  },

  "diseno-web-con-ia": {
    slug: "diseno-web-con-ia",
    longDescription:
      "Aprendé a crear sitios web profesionales para clientes reales en días, no meses. Usando herramientas de IA como v0, Lovable, Bolt y Cursor, vas a diseñar y construir webs que se ven increíbles y funcionan perfecto, sin necesitar años de estudio en programación. Este curso te convierte en la persona que las PyMEs y emprendedores necesitan para tener presencia online.",
    whatYouLearn: [
      "Diseñar interfaces profesionales con Figma",
      "Generar sitios web completos con v0, Lovable y Bolt",
      "Personalizar y ajustar código con Cursor e IA",
      "Crear landing pages que convierten",
      "Optimizar sitios para celulares (responsive design)",
      "Publicar sitios en Vercel, Netlify o Cloudflare Pages",
      "Configurar dominios y hosting",
      "Fundamentos de UX/UI para sitios que funcionan",
    ],
    whoIsItFor:
      "Para personas con gusto por lo visual y el diseño, que quieran generar ingresos creando sitios web. No necesitás saber programar: las herramientas de IA hacen gran parte del código. Si te gusta crear cosas lindas y útiles, este curso es perfecto.",
    prerequisites:
      "Saber navegar internet y usar aplicaciones básicas. Recomendable tener interés por el diseño y lo visual. No se necesita experiencia en programación.",
    jobOpportunities: [
      {
        title: "Diseñador web freelance",
        type: "freelance",
        highlight: "Proyectos rápidos · Freelance ideal",
        description:
          "Crear sitios web para PyMEs, emprendedores y profesionales. Con IA podés entregar un sitio profesional en pocos días.",
      },
      {
        title: "Diseñador web junior en agencia",
        type: "empleo",
        highlight: "Muy buscado · Agencias y startups",
        description:
          "Trabajar en agencias de diseño o marketing, creando sitios para múltiples clientes con herramientas modernas.",
      },
      {
        title: "Creador de plantillas web",
        type: "emprendimiento",
        highlight: "Ingreso recurrente · Escalable",
        description:
          "Diseñar y vender templates reutilizables en marketplaces. Ingresos que pueden volverse pasivos con el tiempo.",
      },
      {
        title: "Especialista en landing pages",
        type: "freelance",
        highlight: "Fácil entrada · Alta rotación de proyectos",
        description:
          "Crear páginas de aterrizaje optimizadas para conversiones. Muy demandado por negocios que hacen publicidad online.",
      },
    ],
    complementaryCourses: [
      {
        slug: "vibe-coding-desarrollo-apps-ia",
        title: "Vibe Coding: Desarrollo de Apps con IA",
        reason:
          "Si ya sabés diseñar sitios, dar el salto a aplicaciones web completas te abre un mercado con mucho mayor potencial de ingresos.",
      },
      {
        slug: "marketing-digital-con-ia",
        title: "Marketing Digital con IA",
        reason:
          "Saber diseñar un sitio Y saber cómo llevarle tráfico y ventas es una combinación ganadora. Podés ofrecer el servicio completo.",
      },
    ],
    employerValues: [
      {
        trait: "Ojo para el detalle visual",
        description:
          "Un píxel de diferencia puede cambiar la impresión de un sitio. Las empresas valoran a quien cuida la estética y la coherencia visual.",
      },
      {
        trait: "Velocidad de entrega",
        description:
          "En el mundo web, rápido vale más que perfecto. Un profesional que entrega un buen sitio en una semana vale más que uno que tarda tres meses.",
      },
      {
        trait: "Capacidad de escuchar al cliente",
        description:
          "El cliente muchas veces no sabe explicar lo que quiere. Saber hacer las preguntas correctas y traducir ideas vagas en diseño concreto es una habilidad clave.",
      },
      {
        trait: "Autonomía para resolver problemas",
        description:
          "Cuando algo no funciona como esperabas, buscar la solución por tu cuenta (con IA, documentación, comunidades) en lugar de trabarte y esperar.",
      },
    ],
    freeTools: [
      "v0 by Vercel (gratis)",
      "Lovable (gratis)",
      "Bolt.new (gratis)",
      "Figma (gratis)",
      "VS Code",
      "Cursor (gratis)",
      "GitHub Copilot Free",
      "Vercel (gratis)",
      "Netlify (gratis)",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    paidTools: ["Cursor Pro", "Claude Pro", "Framer", "Webflow"],
    finalProject:
      "Entregar 3 sitios web reales publicados en internet para clientes reales (pueden ser negocios locales, conocidos o proyectos personales).",
  },

  "ecommerce-con-ia": {
    slug: "ecommerce-con-ia",
    longDescription:
      "Aprendé a montar y operar tiendas online en el ecosistema argentino. Desde elegir la plataforma correcta hasta gestionar envíos, cobros con MercadoPago, facturación con ARCA y atención al cliente con IA. Este curso está pensado para la realidad argentina: plataformas locales, medios de pago nacionales, logística del país y regulaciones vigentes.",
    whatYouLearn: [
      "Montar tiendas en Tienda Nube, MercadoShops y Empretienda",
      "Publicar y optimizar productos en Mercado Libre",
      "Configurar cobros con MercadoPago, Modo y Ualá Bis",
      "Gestionar logística con Andreani, OCA y MercadoEnvíos",
      "Crear fotos y descripciones de productos con IA",
      "Facturación electrónica para e-commerce con ARCA",
      "Atención al cliente automatizada con WhatsApp e IA",
      "Analizar métricas de ventas y optimizar tu tienda",
    ],
    whoIsItFor:
      "Para cualquier persona que quiera vender productos online, ya sea con marca propia, revendiendo o gestionando tiendas para otros. También para comerciantes que quieran expandir su negocio físico al mundo digital.",
    prerequisites:
      "Tener un producto o servicio para vender (o querer aprender para gestionar tiendas de otros). Manejo básico de computadora o celular.",
    jobOpportunities: [
      {
        title: "Gestor de tiendas online",
        type: "freelance",
        highlight: "Alta demanda · Freelance flexible",
        description:
          "Administrar tiendas online de clientes: carga de productos, gestión de pedidos, atención al cliente, reportes.",
      },
      {
        title: "Tu propia tienda online",
        type: "emprendimiento",
        highlight: "Tu propio negocio · Sin techo",
        description:
          "Montar tu marca y vender tus propios productos o servicios en internet, con toda la operación profesionalizada.",
      },
      {
        title: "Consultor de digitalización comercial",
        type: "freelance",
        highlight: "Creciente demanda · Local y remoto",
        description:
          "Ayudar a comercios físicos a dar el salto al mundo online: elegir plataforma, configurar todo y capacitar al equipo.",
      },
      {
        title: "Asistente de e-commerce",
        type: "empleo",
        highlight: "Muy solicitado · Empresas en crecimiento",
        description:
          "Trabajar en empresas que venden online, gestionando el día a día de la operación: pedidos, stock, envíos, devoluciones.",
      },
    ],
    complementaryCourses: [
      {
        slug: "marketing-digital-con-ia",
        title: "Marketing Digital con IA",
        reason:
          "Tener la tienda es solo la mitad. Saber cómo llevarle clientes con publicidad paga y estrategia digital es lo que genera ventas reales.",
      },
      {
        slug: "gestion-de-negocios-con-ia",
        title: "Gestión de Negocios con IA",
        reason:
          "Para que tu e-commerce sea rentable necesitás saber gestionar: finanzas, stock, facturación. Este curso te da esa base.",
      },
    ],
    employerValues: [
      {
        trait: "Orden y método",
        description:
          "El e-commerce tiene muchas partes móviles: stock, pedidos, envíos, pagos. Ser ordenado y metódico es fundamental para que nada se pierda.",
      },
      {
        trait: "Orientación al cliente",
        description:
          "El cliente online no puede tocar el producto. Necesita confianza, buenas fotos, descripciones claras y respuestas rápidas. Quien entiende eso, vende más.",
      },
      {
        trait: "Capacidad de análisis",
        description:
          "Saber leer los números de tu tienda: qué se vende, qué no, de dónde vienen los clientes, cuánto cuesta cada venta. Los datos son tu brújula.",
      },
      {
        trait: "Perseverancia",
        description:
          "Las primeras ventas llevan su tiempo, y eso es normal. Quien mantiene la constancia, ajusta lo que no funciona y sigue adelante, es quien termina teniendo éxito.",
      },
    ],
    freeTools: [
      "Tienda Nube",
      "MercadoShops",
      "Mercado Libre",
      "Empretienda",
      "MercadoPago",
      "WhatsApp Business",
      "Photoroom (gratis)",
      "Pebblely (gratis)",
      "Canva (gratis)",
      "Brevo (gratis)",
      "Doppler (gratis)",
    ],
    paidTools: ["Tienda Nube (plan pago)", "Shopify (exportación)"],
    finalProject:
      "Tener una tienda online operativa con al menos 10 ventas reales completadas, facturación ARCA configurada y un proceso de envío funcionando.",
  },

  "analisis-de-datos-con-ia": {
    slug: "analisis-de-datos-con-ia",
    longDescription:
      "Aprendé a convertir números y datos crudos en información útil para tomar mejores decisiones. Este curso te enseña a crear dashboards profesionales, analizar tendencias, automatizar reportes y presentar resultados de forma clara y visual. No necesitás ser matemático: la IA te ayuda con los cálculos y vos te enfocás en entender qué significan los datos y qué hacer con ellos.",
    whatYouLearn: [
      "Limpiar, organizar y preparar datos con Excel, Sheets y IA",
      "Crear dashboards interactivos con Looker Studio y Metabase",
      "Analizar datos con Python y Google Colab (asistido por IA)",
      "Usar SQL básico para consultar bases de datos",
      "Generar reportes automáticos con IA",
      "Visualizar datos de forma clara y profesional",
      "Identificar tendencias y patrones en datos de negocios",
      "Presentar insights y recomendaciones a clientes",
    ],
    whoIsItFor:
      "Para personas con gusto por los números y el orden. No necesitás ser experto en matemáticas, pero sí tener curiosidad por entender qué dicen los datos. Ideal para quienes quieren un perfil profesional altamente demandado.",
    prerequisites:
      "Manejo básico de Excel o Google Sheets. Recomendable haber cursado IA para tu Trabajo.",
    jobOpportunities: [
      {
        title: "Analista de datos junior",
        type: "empleo",
        highlight: "Perfil escaso · Muy valorado",
        description:
          "Trabajar en empresas analizando datos de ventas, clientes, operaciones y generando reportes para la toma de decisiones.",
      },
      {
        title: "Freelance de dashboards",
        type: "freelance",
        highlight: "Proyectos puntuales · Buen margen",
        description:
          "Crear tableros de control personalizados para PyMEs y comercios que quieren visualizar sus métricas clave.",
      },
      {
        title: "Asistente de Business Intelligence",
        type: "empleo",
        highlight: "Alta demanda global · Remoto",
        description:
          "Apoyar al área de BI de empresas medianas y grandes, preparando datos y generando visualizaciones.",
      },
      {
        title: "Consultor de datos para PyMEs",
        type: "freelance",
        highlight: "Entrada directa al mundo tech",
        description:
          "Ayudar a negocios locales a entender sus números: qué productos rinden más, dónde pierden plata, cómo optimizar.",
      },
    ],
    complementaryCourses: [
      {
        slug: "ia-para-tu-trabajo",
        title: "IA para tu Trabajo",
        reason:
          "Las habilidades generales de productividad con IA potencian enormemente tu capacidad de análisis. Complementa perfecto.",
      },
      {
        slug: "marketing-digital-con-ia",
        title: "Marketing Digital con IA",
        reason:
          "El marketing genera muchos datos. Saber analizarlos te convierte en un perfil muy valioso: el marketer que entiende números.",
      },
    ],
    employerValues: [
      {
        trait: "Pensamiento crítico",
        description:
          "No alcanza con mostrar números. Lo que se valora es la capacidad de preguntarse 'por qué pasa esto' y 'qué deberíamos hacer al respecto'.",
      },
      {
        trait: "Claridad para comunicar",
        description:
          "Los datos no sirven de nada si no podés explicarlos de forma simple. Saber traducir gráficos y números en lenguaje que cualquiera entienda es clave.",
      },
      {
        trait: "Rigurosidad",
        description:
          "Un error en los datos puede llevar a malas decisiones. Las empresas buscan gente que verifique, que cruce información y que no asuma nada sin comprobarlo.",
      },
      {
        trait: "Curiosidad",
        description:
          "Los mejores analistas son los que miran un reporte y se preguntan '¿qué más puedo descubrir acá?'. La curiosidad es el motor del buen análisis.",
      },
    ],
    freeTools: [
      "Google Sheets + Gemini",
      "Looker Studio",
      "Excel Online",
      "PostgreSQL / Supabase (gratis)",
      "ChatGPT con Code Interpreter",
      "Claude.ai",
      "Python + Jupyter",
      "Google Colab",
      "Metabase (open source)",
      "NotebookLM",
    ],
    paidTools: ["Power BI Pro", "Tableau", "Microsoft Copilot 365 Excel"],
    finalProject:
      "Crear un dashboard real para un comercio local o PyME, con datos reales, insights documentados y recomendaciones accionables.",
  },

  "vibe-coding-desarrollo-apps-ia": {
    slug: "vibe-coding-desarrollo-apps-ia",
    longDescription:
      "Este es el curso más exigente y el de mayor potencial de ingresos de toda la plataforma. Vas a aprender a construir aplicaciones web reales — el tipo de software que usan empresas y usuarios todos los días — usando IA como tu copiloto principal. No necesitás ser programador de antes: la IA escribe gran parte del código, pero vos aprendés a guiarla, corregirla y construir productos que funcionan.",
    whatYouLearn: [
      "Construir aplicaciones web con Next.js, React y TypeScript",
      "Usar Cursor, Claude y GitHub Copilot como copilotos de código",
      "Diseñar bases de datos con Supabase",
      "Crear interfaces modernas con Tailwind CSS y shadcn/ui",
      "Generar MVPs completos con v0, Lovable y Bolt",
      "Autenticación, pagos y funcionalidades avanzadas",
      "Deployar aplicaciones en producción con Vercel",
      "Integrar APIs de IA en tus aplicaciones",
    ],
    whoIsItFor:
      "Para personas ambiciosas que quieren aprender la habilidad mejor paga del mercado digital. No necesitás saber programar de antes, pero sí tener ganas de dedicarle tiempo y esfuerzo. Es el curso más largo y exigente, pero también el que abre las mejores oportunidades.",
    prerequisites:
      "Ganas de aprender y dedicación real (10-12 horas por semana). Recomendable haber hecho Diseño Web con IA primero, pero no obligatorio.",
    jobOpportunities: [
      {
        title: "Desarrollador junior en startups",
        type: "empleo",
        highlight: "El perfil más buscado · Remoto global",
        description:
          "Trabajar en startups construyendo y manteniendo aplicaciones web. Uno de los puestos mejor pagos del mercado digital.",
      },
      {
        title: "Freelance de MVPs",
        type: "freelance",
        highlight: "Alto valor · Proyectos globales",
        description:
          "Construir prototipos funcionales (MVPs) para emprendedores y empresas que quieren validar ideas de negocio.",
      },
      {
        title: "Creador de tu propio SaaS",
        type: "emprendimiento",
        highlight: "Tu propio producto · Ingreso recurrente",
        description:
          "Construir tu propio producto digital (software como servicio) y venderlo a clientes recurrentes. El sueño de muchos devs.",
      },
      {
        title: "Desarrollador de herramientas con IA",
        type: "freelance",
        highlight: "Nicho en auge · Freelance premium",
        description:
          "Crear aplicaciones que integran IA para resolver problemas específicos de empresas. Un nicho en pleno crecimiento.",
      },
    ],
    complementaryCourses: [
      {
        slug: "diseno-web-con-ia",
        title: "Diseño Web con IA",
        reason:
          "Tener buen ojo para el diseño además de saber programar te convierte en un perfil completo. Podés entregar productos que no solo funcionan sino que se ven increíbles.",
      },
      {
        slug: "analisis-de-datos-con-ia",
        title: "Análisis de Datos con IA",
        reason:
          "Saber construir apps Y analizar datos es una combinación muy poderosa. Podés crear dashboards, herramientas de BI y productos data-driven.",
      },
    ],
    employerValues: [
      {
        trait: "Resolución de problemas",
        description:
          "Programar es resolver problemas todo el día. Las empresas buscan a alguien que ante un error no se frustre sino que lo investigue, pruebe soluciones y lo resuelva.",
      },
      {
        trait: "Capacidad de aprender rápido",
        description:
          "La tecnología cambia cada semana. Lo que se valora no es saber todo, sino poder aprender cosas nuevas rápido y aplicarlas. La IA te ayuda, pero la actitud es tuya.",
      },
      {
        trait: "Comunicación clara",
        description:
          "Saber explicar qué hiciste, por qué lo hiciste así y qué falta hacer. Los mejores desarrolladores son los que el resto del equipo entiende.",
      },
      {
        trait: "Responsabilidad con el código",
        description:
          "Escribir código limpio, probarlo antes de enviarlo y hacerse cargo cuando algo falla. La confianza se construye con cada entrega bien hecha.",
      },
    ],
    freeTools: [
      "VS Code",
      "GitHub Copilot Free",
      "Claude.ai",
      "ChatGPT",
      "Bolt.new (gratis)",
      "v0 (gratis)",
      "Lovable (gratis)",
      "Replit (gratis)",
      "Supabase (gratis)",
      "Vercel (gratis)",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Git + GitHub",
    ],
    paidTools: ["Claude Pro", "Cursor Pro", "Claude Code Max"],
    finalProject:
      "Construir un SaaS funcional con IA integrada, deployado en producción y listo para conseguir tus primeros usuarios reales.",
  },

  "qa-testing-con-ia": {
    slug: "qa-testing-con-ia",
    longDescription:
      "El testing es la puerta de entrada más rápida al mundo tech. Mientras todos aprenden a programar, las empresas buscan desesperadamente gente que sepa encontrar errores antes de que lleguen a los usuarios. En este curso vas a aprender a testear aplicaciones web y mobile usando IA como tu copiloto: desde pruebas manuales profesionales hasta automatización con herramientas modernas. Vas a salir con un portfolio de bugs reportados, casos de prueba reales y la capacidad de conseguir tu primer trabajo remoto como QA Junior.",
    whatYouLearn: [
      "Fundamentos de testing: tipos de prueba, ciclo de vida del bug y metodologías",
      "Testing manual profesional: casos de prueba, matrices de cobertura y reportes",
      "Automatización de pruebas con Playwright y asistencia de IA",
      "Testing de APIs con Postman y validación automatizada",
      "Uso de IA para generar casos de prueba, analizar logs y detectar patrones de error",
      "Testing de accesibilidad, performance y seguridad básica",
      "Gestión de bugs con Jira/Linear y comunicación efectiva con desarrolladores",
      "Armado de portfolio QA y preparación para entrevistas técnicas",
    ],
    whoIsItFor:
      "Para quienes quieren entrar al mundo tech con una ruta directa al empleo. Ideal si te gusta la atención al detalle, encontrar errores y tenés pensamiento analítico. No necesitás saber programar.",
    prerequisites:
      "Manejo básico de computadora y navegador. Recomendado haber completado 'IA para tu Trabajo'. No se requiere experiencia en programación.",
    jobOpportunities: [
      {
        title: "QA Tester Junior remoto",
        type: "empleo" as const,
        highlight: "Puerta de entrada al mundo tech · Remoto",
        description:
          "Empresas de todo el mundo contratan QA Juniors remotos. Es uno de los roles tech con menor barrera de entrada y mayor demanda.",
      },
      {
        title: "QA Freelance en plataformas",
        type: "freelance" as const,
        highlight: "Demanda constante · Proyectos flexibles",
        description:
          "Plataformas como Testlio, uTest y Upwork tienen demanda constante de testers freelance para proyectos puntuales.",
      },
      {
        title: "QA Automation Junior",
        type: "empleo" as const,
        highlight: "Crecimiento profesional rápido · Remoto",
        description:
          "Con las bases de automatización del curso, podés evolucionar rápido a roles de QA Automation con mejores salarios.",
      },
    ],
    complementaryCourses: [
      {
        slug: "vibe-coding-desarrollo-apps-ia",
        title: "Vibe Coding: Desarrollo de Apps con IA",
        reason:
          "Entender cómo se construyen las apps te hace un tester mucho más efectivo y valioso para cualquier equipo.",
      },
      {
        slug: "ia-para-tu-trabajo",
        title: "IA para tu Trabajo",
        reason:
          "Dominar las herramientas de IA base te permite automatizar reportes, documentación y análisis de bugs.",
      },
    ],
    employerValues: [
      {
        trait: "Atención al detalle",
        description: "Capacidad de encontrar errores que otros pasan por alto.",
      },
      {
        trait: "Comunicación técnica",
        description: "Reportes de bugs claros, reproducibles y accionables.",
      },
      {
        trait: "Automatización con IA",
        description: "Uso de herramientas modernas para multiplicar la cobertura de pruebas.",
      },
    ],
    freeTools: [
      "Playwright (gratis)",
      "Postman (gratis)",
      "Claude (gratis)",
      "ChatGPT (gratis)",
      "Chrome DevTools",
      "Linear (gratis)",
      "GitHub",
    ],
    paidTools: ["Claude Pro", "BrowserStack"],
    finalProject:
      "Realizar un audit completo de QA sobre una aplicación web real: plan de pruebas, ejecución manual y automatizada, reporte profesional de bugs y propuesta de mejoras — listo para presentar como portfolio.",
  },

  "automatizaciones-con-ia-y-no-code": {
    slug: "automatizaciones-con-ia-y-no-code",
    longDescription:
      "Las empresas pierden miles de horas en tareas repetitivas que se pueden automatizar en minutos. Este curso te enseña a construir flujos de automatización profesionales usando n8n, Make y herramientas no-code, integrando modelos de IA para crear soluciones inteligentes. La diferencia clave: no vas a automatizar solo tu negocio, vas a aprender a vender automatizaciones como servicio a otros. Empresas de todo el mundo pagan muy bien por flujos que vos vas a poder armar en horas.",
    whatYouLearn: [
      "Fundamentos de automatización: triggers, acciones, flujos y lógica condicional",
      "n8n desde cero: instalación, nodos, workflows complejos y deploy",
      "Make (ex Integromat): escenarios avanzados e integraciones con 500+ apps",
      "Integración de APIs de IA (Claude, GPT, Whisper) en flujos automatizados",
      "Automatización de email marketing, CRM, facturación y atención al cliente",
      "Construcción de chatbots y asistentes con IA sin código",
      "Bubble y herramientas no-code para crear interfaces de usuario",
      "Cómo vender servicios de automatización: pricing, propuestas y delivery",
    ],
    whoIsItFor:
      "Para quienes quieren ofrecer servicios digitales de alto valor sin programar. Ideal para emprendedores, freelancers y profesionales que quieren generar ingresos en dólares resolviendo problemas reales con tecnología.",
    prerequisites:
      "Manejo básico de computadora. Recomendado haber completado 'IA para tu Trabajo' o 'Gestión de Negocios con IA'.",
    jobOpportunities: [
      {
        title: "Freelance de automatizaciones",
        type: "freelance" as const,
        highlight: "Alto valor por proyecto · Freelance global",
        description:
          "Empresas pagan muy bien por automatizar sus procesos. Un solo flujo bien armado tiene alto valor en el mercado según la complejidad.",
      },
      {
        title: "Consultor de automatización / No-Code",
        type: "empleo" as const,
        highlight: "Perfil muy buscado · Empresas tech",
        description:
          "Agencias y empresas tech buscan especialistas en automatización para optimizar operaciones internas y de clientes.",
      },
      {
        title: "Emprendimiento de servicios digitales",
        type: "emprendimiento" as const,
        highlight: "Tu propia agencia · Escalable",
        description:
          "Montá tu propia agencia de automatización ofreciendo soluciones a PyMEs y startups de toda Latinoamérica y el mundo.",
      },
    ],
    complementaryCourses: [
      {
        slug: "gestion-de-negocios-con-ia",
        title: "Gestión de Negocios con IA",
        reason:
          "Entender los procesos de negocio te permite identificar qué automatizar y vender soluciones más completas.",
      },
      {
        slug: "marketing-digital-con-ia",
        title: "Marketing Digital con IA",
        reason:
          "Muchas automatizaciones de alto valor están en marketing: email sequences, lead scoring, reportes automáticos.",
      },
    ],
    employerValues: [
      {
        trait: "Pensamiento sistémico",
        description: "Capacidad de mapear procesos completos y encontrar oportunidades de automatización.",
      },
      {
        trait: "Integración de herramientas",
        description: "Conectar múltiples plataformas en flujos coherentes y confiables.",
      },
      {
        trait: "IA aplicada",
        description: "Integrar modelos de lenguaje en flujos de trabajo para crear soluciones inteligentes.",
      },
    ],
    freeTools: [
      "n8n (gratis / self-hosted)",
      "Make (plan gratuito)",
      "Claude (gratis)",
      "ChatGPT (gratis)",
      "Bubble (plan gratuito)",
      "Notion (gratis)",
      "Google Sheets",
    ],
    paidTools: ["n8n Cloud", "Make Pro", "Claude Pro"],
    finalProject:
      "Diseñar, construir y documentar un sistema de automatización completo para un caso de negocio real: desde el relevamiento del proceso hasta el deploy, incluyendo una propuesta comercial profesional lista para presentar a un cliente.",
  },
};
