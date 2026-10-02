/* ============================================================
   Dados de contato
   ------------------------------------------------------------
   Fonte única: telefone, e-mail e endereço aparecem no header,
   no hero, na seção de contato e no rodapé — todos leem daqui.
   ============================================================ */

/**
 * Endereço em partes, e não numa linha só, porque o JSON-LD precisa de
 * campos separados (streetAddress, addressLocality, addressRegion) para
 * o Google entender onde o escritório fica. A linha que aparece na
 * página é montada a partir daqui, então as duas não podem divergir.
 */
export const ADDRESS = {
  street: "Av. Francisco Glicério, 1326 — Sala 31",
  building: "Ed. Tabatinga",
  district: "Conceição",
  city: "Campinas",
  state: "SP",
  country: "BR",
};

/** Expediente, para o JSON-LD. A frase na página diz o mesmo em prosa. */
export const HOURS = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "09:00",
  closes: "18:00",
};

export const CONTACT = {
  phone: "(19) 92000-3015",
  phoneHref: "tel:+5519920003015",
  phoneE164: "+5519920003015",
  whatsapp: "https://wa.me/5519920003015",
  email: "julianacoltro@adv.oabsp.org.br",
  address: `${ADDRESS.street}, ${ADDRESS.building}, ${ADDRESS.district}, ${ADDRESS.city} — ${ADDRESS.state}`,
  linkedin: "https://www.linkedin.com/in/juliana-soares-da-costa-298a0522/",
  instagram: "https://www.instagram.com/julianasoaresdacosta.adv/",
};

/** De onde o site é servido. Usado no canonical e nos dados estruturados. */
export const SITE_URL = "https://julianasoaresdacosta.com.br/";

/** Número da OAB. Vazio esconde a menção onde ela apareceria. */
export const OAB = "";

/** Link de WhatsApp já com a mensagem escrita. */
export const waLink = (texto) =>
  `${CONTACT.whatsapp}?text=${encodeURIComponent(texto)}`;

/** O CTA que se repete pelo site inteiro. */
export const WA_AGENDAR = waLink(
  "Olá, Dra. Juliana. Gostaria de agendar uma consulta para falar sobre o meu caso."
);

/** Formulário de avaliação do escritório no perfil do Google. */
export const GOOGLE_REVIEW = "https://g.page/r/Ca-fG-Jf0brhEAE/review";

/** Busca do endereço no Google Maps. */
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  CONTACT.address
)}`;
