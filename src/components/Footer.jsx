import { CONTACT, OAB } from "../data/contact.js";
import { NAV_LINKS } from "../data/navigation.js";
import { InstagramIcon, LinkedInIcon, ScaleIcon } from "../icons.jsx";
import AnchorLink from "./ui/AnchorLink.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <AnchorLink href="#topo" className="brand">
            <span className="brand-mark">
              <ScaleIcon size={20} />
            </span>
            <span className="brand-name">
              <strong>Juliana Costa</strong>
              <small>Advocacia</small>
            </span>
          </AnchorLink>
          <p>
            Advocacia em Campinas e em todo o Brasil, com foco em família e
            sucessões, imobiliário, contratos e consumidor.
          </p>
          <div className="footer-socials">
            <a
              className="footer-social"
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Dra. Juliana"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              className="footer-social"
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn da Dra. Juliana"
            >
              <LinkedInIcon size={18} />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Seções">
          <h4>Site</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <AnchorLink href={link.href}>{link.label}</AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h4>Contato</h4>
          <ul>
            <li>
              <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            </li>
            <li>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
            <li className="plain">Campinas — SP</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>
            © {year} Juliana Soares da Costa
            {OAB ? ` · OAB/SP ${OAB}` : ""}
          </span>
          <span className="footer-legal">
            Conteúdo informativo, nos termos do Código de Ética e Disciplina da
            OAB. Não constitui oferta de resultado nem consulta jurídica.
          </span>
        </div>
      </div>
    </footer>
  );
}
