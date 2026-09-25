/* ============================================================
   Dados de contato
   ------------------------------------------------------------
   Fonte única: telefone, e-mail e endereço aparecem no header,
   no hero, na seção de contato e no rodapé — todos leem daqui.
   ============================================================ */

export const CONTACT = {
  phone: "(19) 92000-3015",
  phoneHref: "tel:+5519920003015",
  whatsapp: "https://wa.me/5519920003015",
  email: "julianacoltro@adv.oabsp.org.br",
  address:
    "Av. Francisco Glicério, 1326 — Sala 3, Ed. Tabatinga, Conceição, Campinas — SP",
  linkedin: "https://www.linkedin.com/in/juliana-soares-da-costa-298a0522/",
  instagram: "https://www.instagram.com/julianasoaresdacosta.adv/",
};

/** Número da OAB. Vazio esconde a menção onde ela apareceria. */
export const OAB = "";

/** Link de WhatsApp já com a mensagem escrita. */
export const waLink = (texto) =>
  `${CONTACT.whatsapp}?text=${encodeURIComponent(texto)}`;

/** O CTA que se repete pelo site inteiro. */
export const WA_AGENDAR = waLink(
  "Olá, Dra. Juliana. Gostaria de agendar uma consulta para falar sobre o meu caso."
);

/** Busca do endereço no Google Maps. */
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT.address
)}`;
