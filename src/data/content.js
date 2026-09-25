/* ============================================================
   Conteúdo editorial
   ------------------------------------------------------------
   Todo o texto do site que não é contato nem navegação, na ordem
   em que aparece na página. Cada bloco é consumido por um único
   componente em src/components/sections.

   Editar texto aqui não exige mexer em componente nenhum.
   ============================================================ */

import {
  AccordIcon,
  DocIcon,
  EstateIcon,
  FamilyIcon,
  PinIcon,
  ScaleIcon,
  SealIcon,
  TagIcon,
  YearsIcon,
} from "../icons.jsx";

/* --------------------------------- hero --------------------------------- */

export const HERO_FACTS = [
  { icon: YearsIcon, label: "20+ anos de atuação" },
  { icon: ScaleIcon, label: "Família, imóveis e contratos" },
  { icon: PinIcon, label: "Campinas e todo o Brasil" },
];

/* ------------------------------- letreiro ------------------------------- */

export const MARQUEE_ITEMS = [
  "Prevenção de litígios",
  "Resolução extrajudicial",
  "Comunicação não-violenta",
  "Atendimento online em todo o Brasil",
  "Mediação de conflitos",
  "Inventário em cartório",
];

/* -------------------------------- perfil -------------------------------- */

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

export const AREAS = [
  {
    n: "01",
    icon: FamilyIcon,
    title: "Família e sucessões",
    desc: "Divórcio, guarda e convivência, alimentos, partilha, inventário judicial e em cartório. Conduzido com firmeza técnica e cuidado com quem está do outro lado da mesa.",
    tags: ["Divórcio", "Guarda", "Inventário", "Partilha"],
  },
  {
    n: "02",
    icon: EstateIcon,
    title: "Imobiliário e condomínios",
    desc: "Compra e venda com análise de documentação, regularização de matrícula, distratos, locações, cobrança de taxas e assessoria permanente a síndicos e administradoras.",
    tags: ["Compra e venda", "Regularização", "Locação", "Assembleias"],
  },
  {
    n: "03",
    icon: DocIcon,
    title: "Civil e empresarial",
    desc: "Redação e revisão de contratos, responsabilidade civil, cobrança e recuperação de crédito, além da estruturação societária de pequenas e médias empresas.",
    tags: ["Contratos", "Cobrança", "Societário", "Indenizações"],
  },
  {
    n: "04",
    icon: TagIcon,
    title: "Direito do consumidor",
    desc: "Defesa em cobranças indevidas, negativação irregular, vícios de produto e serviço, planos de saúde e contratos bancários, com foco em reparação efetiva.",
    tags: ["Cobrança indevida", "Planos de saúde", "Bancos", "Vícios"],
  },
];

/* -------------------------------- método -------------------------------- */

export const METHOD_TOOLS = [
  "Comunicação Não-Violenta (CNV)",
  "Análise de movimentos essenciais",
  "Mediação e negociação estruturada",
  "Via extrajudicial como primeira opção",
];

export const METHOD_PILLARS = [
  {
    icon: AccordIcon,
    title: "Pacificação",
    desc: "Tratar a raiz do conflito, e não só o pedido da petição. Isso preserva relações que vão continuar existindo depois do processo.",
  },
  {
    icon: SealIcon,
    title: "Acordos que duram",
    desc: "Composição construída com as duas partes de acordo tende a ser cumprida — e não volta ao Judiciário seis meses depois.",
  },
];

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
    q: "Como funciona o atendimento online?",
    a: "As reuniões acontecem por videoconferência e os documentos são assinados digitalmente. Como o processo judicial brasileiro é eletrônico, o acompanhamento à distância tem a mesma eficácia do presencial — inclusive para quem mora fora de São Paulo.",
  },
  {
    q: "O que é Direito Sistêmico, na prática?",
    a: "É olhar o conflito considerando todas as pessoas afetadas por ele, não só quem assina a petição. Na prática isso muda a condução: a escuta é mais cuidadosa, a negociação parte dos interesses reais de cada lado e o acordo tende a sair mais rápido e a ser cumprido.",
  },
  {
    q: "Quanto tempo leva um divórcio ou um inventário?",
    a: "Depende da via. Havendo consenso, o cartório resolve em semanas. No Judiciário, com disputa, pode levar de meses a anos. É exatamente por essa diferença que a tentativa de acordo vem primeiro.",
  },
  {
    q: "Como funcionam os honorários?",
    a: "A primeira conversa serve para entender o caso e dimensionar o trabalho. A partir dela você recebe uma proposta por escrito, com valores, forma de pagamento e o que está incluído.",
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
