/* ============================================================
   Conteúdo editorial
   ------------------------------------------------------------
   Todo o texto do site que não é contato nem navegação, na ordem
   em que aparece na página. Cada bloco é consumido por um único
   componente em src/components/sections.

   Editar texto aqui não exige mexer em componente nenhum. O que
   fica no componente é só o que carrega marcação — os títulos de
   seção, onde um <em> pinta parte da frase de latão.
   ============================================================ */

import {
  DocIcon,
  EstateIcon,
  FamilyIcon,
  ScaleIcon,
  TagIcon,
  YearsIcon,
} from "../icons.jsx";

/* --------------------------------- hero --------------------------------- */

/* Uma frase só, e sobre a conduta: tempo de atuação e áreas já estão
   nos selos logo abaixo, e o kicker já diz de onde. */
export const HERO_LEAD = [
  "Cada caso é analisado de forma individualizada, com orientação clara e estratégia definida a partir das suas particularidades.",
];

/* Dois selos, não três: o terceiro só conseguia repetir o kicker (onde)
   ou a intro das áreas (o tipo de atuação). */
export const HERO_FACTS = [
  { icon: YearsIcon, label: "20+ anos de atuação" },
  { icon: ScaleIcon, label: "Família, imóveis e contratos" },
];

/* ------------------------------- letreiro ------------------------------- */

export const MARQUEE_ITEMS = [
  "Prevenção de litígios",
  "Resolução extrajudicial",
  "Comunicação não-violenta",
  "Atendimento online no mundo todo",
  "Mediação de conflitos",
  "Inventário extrajudicial",
];

/* -------------------------------- perfil -------------------------------- */

/* Aqui ficam as credenciais. O que este bloco dizia sobre áreas, sobre
   analisar cada caso e sobre a condução dos conflitos saiu: as seções de
   Áreas e Método dizem o mesmo logo em seguida, e com mais detalhe. */
export const PROFILE_PARAGRAPHS = [
  "Advogada com mais de 20 anos de atuação no Direito privado. Atendimento presencial em Campinas e região e, de forma online, para clientes em qualquer lugar do mundo.",
  "A orientação é clara e transparente, para que o cliente compreenda sua situação e participe das decisões com segurança.",
  "Incorpora princípios do Direito Sistêmico, buscando soluções juridicamente consistentes e, sempre que possível, sustentáveis.",
];


/* -------------------------------- áreas --------------------------------- */

export const AREAS_INTRO =
  "Atuação consultiva, preventiva e contenciosa, com foco em Direito de Família e Sucessões e Direito Imobiliário, além de outras áreas do Direito privado.";

/** Fecha a lista de áreas: quem não se viu nela tem para onde ir. */
export const AREAS_FOOTER = {
  question: "Não encontrou o que procura?",
  cta: "Fale conosco.",
};

export const AREAS = [
  {
    n: "01",
    icon: FamilyIcon,
    title: "Família e Sucessões",
    desc: "Divórcio, guarda e convivência, alimentos, partilha, inventário judicial e extrajudicial.",
    tags: ["Divórcio", "Guarda", "Inventário", "Partilha"],
  },
  {
    n: "02",
    icon: EstateIcon,
    title: "Direito Imobiliário e Condomínios",
    desc: "Compra e venda, locação, análise documental, regularização de imóveis, distratos, taxas condominiais e assessoria a síndicos e administradoras.",
    tags: ["Compra e venda", "Locação", "Regularização", "Distratos"],
  },
  {
    n: "03",
    icon: DocIcon,
    title: "Direito Civil e Empresarial",
    desc: "Contratos, responsabilidade civil, recuperação de crédito e demandas empresariais.",
    tags: ["Contratos", "Responsabilidade civil", "Recuperação de crédito"],
  },
  {
    n: "04",
    icon: TagIcon,
    title: "Direito do Consumidor",
    desc: "Cobranças indevidas, negativação, vícios de produto e serviço, questões bancárias e outras relações de consumo.",
    tags: ["Cobrança indevida", "Negativação", "Vícios", "Bancos"],
  },
];

/* -------------------------------- método -------------------------------- */

/** Primeiro movimento: entender antes de propor. */
export const METHOD_DIAGNOSIS = [
  "A análise de cada caso considera os fatos, documentos, contexto, relações envolvidas e objetivos do cliente. A partir desse diagnóstico, são avaliados os caminhos possíveis, seus riscos, prazos e consequências.",
  "A estratégia é definida de acordo com as particularidades de cada situação, buscando, quando possível e adequado, uma solução consensual.",
];

/** Segundo movimento: o olhar sistêmico, e o que ele significa na prática. */
export const METHOD_SYSTEMIC = {
  title: "Técnica jurídica com olhar sistêmico.",
  text: "Na condução dos conflitos, adota princípios sistêmicos, ampliando o olhar sobre as relações envolvidas sem afastar a técnica jurídica. Isso significa considerar não apenas a questão jurídica apresentada, mas também as relações e circunstâncias que continuarão existindo depois dela.",
  toolsIntro: "Na prática, o trabalho envolve:",
  tools: [
    "Comunicação Não-Violenta (CNV)",
    "Mediação e negociação estruturada",
    "Análise das relações e movimentos envolvidos",
    "Atuação extrajudicial",
    "Construção de soluções consensuais",
  ],
};

/* ------------------------------- clientes ------------------------------- */

export const TESTIMONIALS = [
  {
    name: "Jamile Pedreira",
    role: "Consultoria contratual",
    text: "Entrei em contato por indicação de uma amiga. Adorei o atendimento, muito atenciosa, prestativa e educada. Resolve tudo rápido. Recomendo para qualquer pessoa.",
  },
  {
    name: "Luiz Henrique Junior",
    role: "Processo de família",
    text: "Dra. Juliana sempre prestativa, muito rápida para resolver os assuntos. Ótima advogada, super recomendo.",
  },
];


/* -------------------------------- contato ------------------------------- */

export const SUBJECTS = [
  "Família e sucessões",
  "Imobiliário ou condomínio",
  "Contrato ou cobrança",
  "Direito do consumidor",
  "Fraude bancária",
  "Outro assunto",
];
