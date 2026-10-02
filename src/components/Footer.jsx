import { CONTACT, OAB } from "../data/contact.js";
import { NAV_LINKS } from "../data/navigation.js";
import { InstagramIcon, LinkedInIcon } from "../icons.jsx";
import { LogoLockup } from "../logo.jsx";
import AnchorLink from "./ui/AnchorLink.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          {/* Aqui entra o logotipo inteiro, que já traz o nome e
              "ADVOCACIA" desenhados — por isso não há texto ao lado,
              que repetiria o que o desenho diz. O svg é aria-hidden,
              então o nome acessível do link vem do texto escondido. */}
          <AnchorLink href="#topo" className="brand">
            <LogoLockup className="footer-logo" />
            <span className="sr-only">
              Juliana Soares da Costa · Advocacia · voltar ao topo
            </span>
          </AnchorLink>
          <p>
            Advocacia em Campinas e região, com atuação preventiva e
            contenciosa.
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
          <h3 className="footer-col-title">Site</h3>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <AnchorLink href={link.href}>{link.label}</AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h3 className="footer-col-title">Contato</h3>
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
