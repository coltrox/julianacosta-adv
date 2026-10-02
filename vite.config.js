import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { ADDRESS, CONTACT, HOURS, SITE_URL } from "./src/data/contact.js";
import { FAQ_ITEMS } from "./src/data/faq.js";

/* ============================================================
   Dados estruturados (JSON-LD)
   ------------------------------------------------------------
   Montados aqui, no build, a partir dos mesmos módulos que a
   página renderiza. Duas razões para não fazer isso no React:

   1. sai estático no HTML, então o Google lê sem depender de
      executar JavaScript;
   2. vem dos dados de verdade, então a resposta que o buscador
      lê é a mesma que o visitante vê — não há como divergir.

   O que de propósito NÃO está aqui: aggregateRating e Review.
   Os depoimentos da página foram coletados pelo próprio
   escritório, e o Google não aceita marcação de avaliação que a
   empresa faz sobre si mesma. Marcar isso arriscaria uma
   penalidade manual em troca de nada.
   ============================================================ */

const NOME = "Juliana Soares da Costa · Advocacia";

const DESCRICAO =
  "Advogada com mais de 20 anos de atuação no Direito privado, " +
  "com foco em Direito de Família e Sucessões e Direito Imobiliário. " +
  "Atendimento presencial em Campinas e região e online para clientes " +
  "em qualquer lugar do mundo.";

/** As áreas que o escritório atende, para `knowsAbout`. */
const ESPECIALIDADES = [
  "Direito de Família",
  "Direito das Sucessões",
  "Inventário",
  "Divórcio",
  "Direito Imobiliário",
  "Direito Condominial",
  "Direito Civil",
  "Direito Empresarial",
  "Direito do Consumidor",
  "Mediação de conflitos",
  "Direito Sistêmico",
];

const dadosEstruturados = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": `${SITE_URL}#escritorio`,
      name: NOME,
      description: DESCRICAO,
      url: SITE_URL,
      image: `${SITE_URL}og.jpg`,
      logo: `${SITE_URL}logo.svg`,
      telephone: CONTACT.phoneE164,
      email: CONTACT.email,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: `${ADDRESS.street}, ${ADDRESS.building}`,
        addressLocality: ADDRESS.city,
        addressRegion: ADDRESS.state,
        addressCountry: ADDRESS.country,
      },
      areaServed: [
        { "@type": "City", name: ADDRESS.city },
        { "@type": "AdministrativeArea", name: "São Paulo" },
        { "@type": "Country", name: "Brasil" },
      ],
      availableLanguage: { "@type": "Language", name: "Portuguese" },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: HOURS.days,
          opens: HOURS.opens,
          closes: HOURS.closes,
        },
      ],
      knowsAbout: ESPECIALIDADES,
      founder: { "@id": `${SITE_URL}#advogada` },
      sameAs: [CONTACT.instagram, CONTACT.linkedin],
    },
    {
      "@type": "Attorney",
      "@id": `${SITE_URL}#advogada`,
      name: "Juliana Soares da Costa",
      jobTitle: "Advogada",
      worksFor: { "@id": `${SITE_URL}#escritorio` },
      knowsAbout: ESPECIALIDADES,
      knowsLanguage: { "@type": "Language", name: "Portuguese" },
      url: SITE_URL,
      sameAs: [CONTACT.instagram, CONTACT.linkedin],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#site`,
      url: SITE_URL,
      name: NOME,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}#escritorio` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#duvidas`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
});

/**
 * Injeta o JSON-LD antes de </head>. `enforce: "post"` garante que o
 * HTML já passou pelas outras transformações.
 */
const jsonLd = () => ({
  name: "json-ld",
  enforce: "post",
  transformIndexHtml(html) {
    const bloco =
      '    <script type="application/ld+json">' +
      JSON.stringify(dadosEstruturados()) +
      "</script>\n";
    return html.replace("</head>", `${bloco}  </head>`);
  },
});

export default defineConfig({
  plugins: [react(), jsonLd()],
});
