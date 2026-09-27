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
  SealIcon,
  TagIcon,
  YearsIcon,
} from "../icons.jsx";

/* --------------------------------- hero --------------------------------- */

/* Uma frase só, e sobre a conduta: tempo de atuação e áreas já estão
   nos selos logo abaixo, e o kicker já diz de onde. */
export const HERO_LEAD = [
  "Cada caso é analisado de forma individualizada, com orientação clara e estratégia definida a partir das suas particularidades.",
];

export const HERO_FACTS = [
  { icon: YearsIcon, label: "20+ anos de atuação" },
  { icon: ScaleIcon, label: "Família, imóveis e contratos" },
  // O kicker acima já diz onde; aqui cabe o que ele não diz.
  { icon: SealIcon, label: "Atuação preventiva e contenciosa" },
];

/* ------------------------------- letreiro ------------------------------- */

export const MARQUEE_ITEMS = [
  "Prevenção de litígios",
  "Resolução extrajudicial",
  "Comunicação não-violenta",
  "Atendimento online no mundo todo",
  "Mediação de conflitos",
  "Inventário em cartório",
];

/* -------------------------------- perfil -------------------------------- */

/* Aqui ficam as credenciais. O que este bloco dizia sobre áreas, sobre
   analisar cada caso e sobre a condução dos conflitos saiu: as seções de
   Áreas e Método dizem o mesmo logo em seguida, e com mais detalhe. */
export const PROFILE_PARAGRAPHS = [
  "Advogada com mais de 20 anos de atuação no Direito privado, com experiência na condução de demandas preventivas e contenciosas. Atendimento presencial em Campinas e região e, de forma online, para clientes em qualquer lugar do mundo.",
  "A orientação é clara e transparente, para que o cliente compreenda sua situação e participe das decisões com segurança.",
  "Incorpora princípios do Direito Sistêmico, buscando soluções juridicamente consistentes e, sempre que possível, sustentáveis.",
];

export const EDUCATION = [
  {
    school: "PUC-Campinas",
    course: "Bacharelado em Direito",
    when: "1994 — 1999",
  },
  {
    school: "Escola Superior de Advocacia — ESA",
    course: "Especialização em Família e Sucessões",
    when: "Pós-graduação",
  },
  {
    school: "Fundação Getulio Vargas — FGV",
    course: "Extensão executiva em Contratos",
    when: "Educação continuada",
  },
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
    desc: "Compra e venda, contratos de locação, análise documental, regularização de imóveis, distratos, cobrança de taxas e assessoria a síndicos e administradoras.",
    tags: ["Compra e venda", "Locação", "Regularização", "Condomínios"],
  },
  {
    n: "03",
    icon: DocIcon,
    title: "Direito Civil e Empresarial",
    desc: "Contratos, responsabilidade civil, cobranças e recuperação de crédito, além de demandas empresariais.",
    tags: ["Contratos", "Responsabilidade civil", "Cobrança", "Empresarial"],
  },
  {
    n: "04",
    icon: TagIcon,
    title: "Direito do Consumidor",
    desc: "Cobranças indevidas, negativação, vícios, contratos bancários e outras relações de consumo.",
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
  toolsIntro: "Na prática, isso pode envolver:",
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

/* --------------------------------- FAQ ---------------------------------- */

export const FAQ_ITEMS = [
  {
    q: "Como funciona o atendimento?",
    a: "O atendimento pode ser presencial, em Campinas e região, ou por videoconferência, para clientes em qualquer lugar do mundo. A primeira conversa é destinada à compreensão da situação e à avaliação dos caminhos jurídicos possíveis. Quando houver necessidade de análise documental mais aprofundada ou de uma atuação específica, isso é explicado ao cliente antes da definição dos próximos passos.",
  },
  {
    q: "O atendimento online tem a mesma validade do presencial?",
    a: "Sim. As reuniões são realizadas por videoconferência e os documentos podem ser assinados digitalmente. A condução de processos judiciais eletrônicos também permite acompanhamento à distância. Para atendimentos relacionados a outras localidades ou jurisdições, são avaliadas previamente as condições específicas do caso.",
  },
  {
    q: "O que é Direito Sistêmico, na prática?",
    a: "É uma abordagem que amplia o olhar sobre o conflito, considerando não apenas a questão jurídica, mas também as relações envolvidas e que poderão permanecer depois da demanda. A técnica jurídica continua sendo a base da atuação, incorporando recursos como comunicação, negociação e mediação quando adequados ao caso.",
  },
  {
    q: "Quanto tempo leva um divórcio ou um inventário?",
    a: "O prazo depende das características de cada caso, da existência ou não de consenso, da documentação disponível e da via adequada. Após a análise inicial, é possível explicar os principais fatores que podem influenciar o tempo de tramitação.",
  },
  {
    q: "Como funcionam os honorários?",
    a: "Os honorários são definidos de acordo com a natureza e a complexidade do trabalho, considerando a extensão da atuação necessária em cada caso. Antes da contratação, o cliente recebe informações claras sobre os serviços, honorários e condições de pagamento.",
  },
  {
    q: "Posso consultar antes de decidir se vou entrar com uma ação?",
    a: "Sim. A consulta pode ser utilizada justamente para compreender a situação, avaliar os caminhos possíveis e conhecer riscos e alternativas antes de tomar uma decisão.",
  },
];

/* -------------------------------- contato ------------------------------- */

export const SUBJECTS = [
  "Família e sucessões",
  "Imobiliário ou condomínio",
  "Contrato ou cobrança",
  "Direito do consumidor",
  "Outro assunto",
];
