/*
 * CAVALLINI ASSESSORIA — Constants & Asset URLs
 * Centralized data for the entire application
 */

// ─── Asset URLs ─────────────────────────────────────────────
export const ASSETS = {
  // Generated hero backgrounds (compressed WebP)
  heroBg1: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029960001/EJKLd5S4d8nwmwUsXsH3Mz/hero-bg-1-aHrJipszL7MfUk4YnpSKRL.webp",
  heroBg2: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029960001/EJKLd5S4d8nwmwUsXsH3Mz/hero-bg-2-jTuby8AfG93jMA92VwwRA9.webp",
  heroBg3: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029960001/EJKLd5S4d8nwmwUsXsH3Mz/hero-bg-3-SF6naAr2atfQRxAkzg8Lzk.webp",
  aboutBg: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029960001/EJKLd5S4d8nwmwUsXsH3Mz/about-section-bg-6PAfJWyoL365PZhZ8xdwye.webp",

  // Original images (WebP optimized)
  corredorSeguro: "/manus-storage/corredor-seguro_c5b7a5df.webp",
  extintor: "/manus-storage/extintor_09ac19f4.webp",
  placa: "/manus-storage/placa_1_48ca5828.webp",
  trabalhadores: "/manus-storage/trabalhadores_595cd2db.webp",
  avcb: "/manus-storage/avcb_b8632f27.webp",
  assessoriaReuniao: "/manus-storage/assessoria-reuniao_8c0d0665.webp",
  projetos: "/manus-storage/projetos_f4a883ee.webp",
  trabalhadorCostas: "/manus-storage/trabalhador-costas-com-logo_0688fd68.webp",
  tresImgPeb: "/manus-storage/3-img-peb_84c045be.webp",
  logoRedDesktop: "/manus-storage/image-logo-red_86d9fe76.webp",
  logoRedMobile: "/manus-storage/image-logo-red-mobile_64ce4e87.webp",
  extintorSemLogo: "/manus-storage/extintor-image-sem-logo_0d7b21fe.webp",
  grafismo: "/manus-storage/grafismo_cavallini2-removebg-preview_aea09a71.webp",

  // Logos (PNG for transparency)
  logoBrancoC: "/manus-storage/logo-branco-laranja-c_38cd2c40.png",
  logoPretoC: "/manus-storage/logo-preto-laranja-c_5d17b609.png",
  logoBrancoDark: "/manus-storage/logo-branco-laranja-dark_05b55389.png",
  logoCompleta: "/manus-storage/logo-completa_2678bbfc.png",
  logoSemFundo: "/manus-storage/logo-semfundo_73f0f8a1.png",

  // Video
  fireExtinguisherVideo: "/manus-storage/fire-extinguisher_3b11c291.mp4",
} as const;

// ─── Partner Logos ──────────────────────────────────────────
export const PARTNER_LOGOS = [
  { name: "Parceiro 1", src: "/manus-storage/parceiro-1_f08161cb.png" },
  { name: "Parceiro 2", src: "/manus-storage/parceiro-2_c4923d46.png" },
  { name: "Parceiro 3", src: "/manus-storage/parceiro-3_757615aa.png" },
  { name: "Parceiro 4", src: "/manus-storage/parceiro-4_5401ae06.png" },
  { name: "Coco Bambu", src: "/manus-storage/coco-bambu_9a312342.png" },
  { name: "F1", src: "/manus-storage/f1-logo_4f0af060.png" },
  { name: "COP30", src: "/manus-storage/cop30-logo_3e7fc7df.png" },
  { name: "GL Events", src: "/manus-storage/gl-events-logo_c85a7e17.png" },
  { name: "MD", src: "/manus-storage/md-logo_e81ff46d.png" },
  { name: "Goya Perfumaria", src: "/manus-storage/goya-logo_70567333.png" },
  { name: "Pontuall", src: "/manus-storage/pontuall-logo_987ee199.png" },
] as const;

// ─── Navigation Links ───────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Serviços", href: "#solucoes" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
] as const;

// ─── Services Data ──────────────────────────────────────────
export const SERVICES = [
  {
    id: "avcb",
    slug: "avcb",
    number: "01",
    title: "AVCB",
    subtitle: "Auto de Vistoria do Corpo de Bombeiros",
    description: "Conduzimos todo o processo de obtenção e renovação do AVCB, desde a análise inicial até a aprovação final pelo Corpo de Bombeiros. Garantimos conformidade total com as exigências legais.",
    image: "/manus-storage/avcb_b8632f27.webp",
    features: ["Análise técnica do imóvel", "Elaboração de documentação", "Acompanhamento da vistoria", "Emissão e renovação"],
    // Extended content for service detail page
    pageTitle: "Emissão de AVCB com segurança e aprovação garantida.",
    pageDescription: "Na Cavallini Assessoria, conduzimos todo o processo de regularização junto ao Corpo de Bombeiros com rigor técnico e clareza. Eliminamos a burocracia e garantimos que sua estrutura atenda aos mais altos padrões de segurança, cuidando de cada etapa do início ao fim.",
    pageDescription2: "O AVCB é um documento obrigatório que comprova que seu imóvel está em conformidade com as normas de segurança contra incêndio. Sem ele, seu estabelecimento pode ser multado, interditado e perder a cobertura de seguros.",
    deliverableTitle: "O que entregamos",
    deliverables: [
      "Diagnóstico completo e vistoria prévia",
      "Elaboração e aprovação de Projeto Técnico",
      "Execução integral das adequações necessárias",
      "Gestão burocrática até a emissão final",
    ],
  },
  {
    id: "consultoria",
    slug: "consultoria",
    number: "02",
    title: "Consultoria Técnica",
    subtitle: "Diagnóstico e Planejamento Estratégico",
    description: "Assessoria especializada para identificar riscos, propor soluções e garantir que seu estabelecimento esteja em total conformidade com as normas de segurança contra incêndio.",
    image: "/manus-storage/assessoria-reuniao_8c0d0665.webp",
    features: ["Diagnóstico de riscos", "Plano de adequação", "Orientação normativa", "Acompanhamento contínuo"],
    pageTitle: "Consultoria técnica com visão estratégica e rigor normativo.",
    pageDescription: "Nossa consultoria vai além do diagnóstico. Analisamos cada detalhe do seu imóvel, identificamos riscos e propomos soluções práticas e economicamente viáveis para garantir a conformidade total com as normas de segurança contra incêndio.",
    pageDescription2: "Com uma equipe de engenheiros experientes, oferecemos orientação normativa clara e acompanhamento contínuo para que você tenha previsibilidade em cada etapa do processo.",
    deliverableTitle: "O que entregamos",
    deliverables: [
      "Análise completa de riscos e vulnerabilidades",
      "Plano de adequação personalizado",
      "Orientação normativa detalhada",
      "Acompanhamento contínuo até a regularização",
    ],
  },
  {
    id: "projetos",
    slug: "projetos",
    number: "03",
    title: "Projetos de Engenharia",
    subtitle: "Engenharia de Combate a Incêndio",
    description: "Desenvolvimento completo de projetos técnicos de combate a incêndio, incluindo sistemas hidráulicos, alarmes, detecção e todas as especificações exigidas pelas normas vigentes.",
    image: "/manus-storage/projetos_f4a883ee.webp",
    features: ["Projetos hidráulicos", "Sistemas de alarme", "Detecção e supressão", "Aprovação no Corpo de Bombeiros"],
    pageTitle: "Projetos e Execução de Engenharia completa.",
    pageDescription: "Desenvolvemos projetos técnicos completos de combate a incêndio, desde a concepção até a aprovação junto ao Corpo de Bombeiros. Cada projeto é elaborado com precisão e em total conformidade com as normas técnicas vigentes.",
    pageDescription2: "Nossa equipe de engenheiros especializados garante que cada sistema seja dimensionado corretamente, otimizando custos sem comprometer a segurança.",
    deliverableTitle: "O que executamos",
    deliverables: [
      "Projetos hidráulicos de combate a incêndio",
      "Sistemas de detecção e alarme",
      "Dimensionamento de sprinklers e hidrantes",
      "Aprovação e acompanhamento junto ao Corpo de Bombeiros",
    ],
  },
  {
    id: "execucao",
    slug: "execucao-manutencao",
    number: "04",
    title: "Execução e Manutenção",
    subtitle: "Instalação e Manutenção de Sistemas",
    description: "Execução completa de instalações de combate a incêndio e manutenção preventiva e corretiva de todos os sistemas, garantindo funcionamento contínuo e segurança permanente.",
    image: "/manus-storage/trabalhador-costas-com-logo_0688fd68.webp",
    features: ["Instalação de sistemas", "Hidrantes e sprinklers", "Manutenção preventiva", "Manutenção corretiva"],
    pageTitle: "Execução e Manutenção com excelência operacional.",
    pageDescription: "Realizamos a execução completa de instalações de combate a incêndio, desde hidrantes e sprinklers até sistemas de alarme e detecção. Nossa equipe técnica garante que cada instalação seja feita com precisão e qualidade.",
    pageDescription2: "Além da instalação, oferecemos manutenção preventiva e corretiva para garantir que todos os sistemas estejam sempre em perfeito funcionamento, protegendo vidas e patrimônios.",
    deliverableTitle: "Nossas Frentes Operacionais",
    deliverables: [
      "Instalação completa de sistemas hidráulicos",
      "Montagem de hidrantes, sprinklers e bombas",
      "Manutenção preventiva programada",
      "Manutenção corretiva emergencial 24h",
    ],
  },
] as const;

// ─── FAQ Data ───────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    category: "Sobre AVCB",
    items: [
      { question: "O que é AVCB?", answer: "O AVCB (Auto de Vistoria do Corpo de Bombeiros) é um documento obrigatório que comprova que um imóvel está de acordo com as normas de segurança contra incêndio exigidas pelo Corpo de Bombeiros." },
      { question: "Quem precisa de AVCB?", answer: "Empresas, comércios, indústrias, condomínios e estabelecimentos em geral precisam do AVCB para funcionar legalmente e garantir a segurança de pessoas e patrimônios." },
      { question: "É obrigatório ter AVCB?", answer: "Sim. O AVCB é exigido por lei e sua ausência pode gerar multas, interdição do imóvel e problemas com seguros." },
      { question: "O AVCB tem validade?", answer: "Sim. O AVCB possui prazo de validade e deve ser renovado periodicamente conforme exigência do Corpo de Bombeiros." },
    ],
  },
  {
    category: "Processo e Prazos",
    items: [
      { question: "Como obter o AVCB?", answer: "O processo inclui análise técnica, elaboração do projeto, execução das adequações exigidas, vistoria do Corpo de Bombeiros e, por fim, a emissão do AVCB." },
      { question: "Quanto tempo demora para tirar o AVCB?", answer: "O prazo varia conforme o tipo e o tamanho do imóvel, podendo levar de algumas semanas até alguns meses, dependendo das adequações necessárias." },
      { question: "Vocês cuidam de todo o processo?", answer: "Sim. A Cavallini Assessoria realiza todas as etapas: consultoria, projeto, execução e acompanhamento até a aprovação final." },
    ],
  },
  {
    category: "Riscos e Serviços",
    items: [
      { question: "Quais os riscos de não ter AVCB?", answer: "A falta de AVCB pode resultar em multas, interdição, perda de cobertura de seguros e riscos à vida em caso de incêndio." },
      { question: "Quais serviços vocês oferecem?", answer: "Oferecemos soluções completas em segurança contra incêndio: Emissão de AVCB, Consultoria técnica, Projetos de combate a incêndio e Execução e instalação de sistemas." },
      { question: "Por que contratar a Cavallini Assessoria?", answer: "Porque oferecemos um serviço completo, com rigor técnico, acompanhamento total do processo e foco na aprovação sem complicações." },
    ],
  },
] as const;

// ─── Contact / Social ───────────────────────────────────────
export const WHATSAPP_URL = "https://wa.me/5511999999999";
export const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os serviços da Cavallini Assessoria.";
