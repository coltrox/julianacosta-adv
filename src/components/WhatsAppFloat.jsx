import { WA_AGENDAR } from "../data/contact.js";
import { WhatsAppIcon } from "../icons.jsx";

/** O atalho que acompanha o leitor por toda a página. */
export default function WhatsAppFloat() {
  return (
    <a
      className="wa-float"
      href={WA_AGENDAR}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar uma consulta pelo WhatsApp"
    >
      <WhatsAppIcon size={26} />
      <span className="wa-label">WhatsApp</span>
    </a>
  );
}
