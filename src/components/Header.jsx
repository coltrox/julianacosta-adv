import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CONTACT, WA_AGENDAR } from "../data/contact.js";
import { NAV_LINKS } from "../data/navigation.js";
import {
  ArrowIcon,
  CloseIcon,
  InstagramIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  ScaleIcon,
  WhatsAppIcon,
} from "../icons.jsx";
import {
  buildHeaderState,
  gsap,
  lockScroll,
  prefersReducedMotion,
} from "../motion/index.js";
import AnchorLink from "./ui/AnchorLink.jsx";

/** Barra fixa no topo, com o menu em painel no celular. */
export default function Header({ active }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const panelRef = useRef(null);

  // Painel aberto: trava o scroll da página e escalona a entrada dos itens.
  useEffect(() => {
    lockScroll(open);
    if (!open || !panelRef.current) return;

    const items = panelRef.current.querySelectorAll("[data-menu-item]");
    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(
      items,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.055, delay: 0.06 }
    );
  }, [open]);

  useEffect(() => {
    const onKey = (ev) => ev.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      // Desmontou com o menu aberto: não deixa a página travada.
      lockScroll(false);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => buildHeaderState(headerRef.current));
    return () => ctx.revert();
  }, []);

  return (
    <header className={`site-header ${open ? "is-open" : ""}`} ref={headerRef}>
      <div className="container header-inner">
        <AnchorLink href="#topo" className="brand" aria-label="Início">
          <span className="brand-mark">
            <ScaleIcon size={20} />
          </span>
          <span className="brand-name">
            <strong>Juliana Costa</strong>
            <small>Advocacia</small>
          </span>
        </AnchorLink>

        <nav className="nav-desktop" aria-label="Seções do site">
          {NAV_LINKS.map((link) => (
            <AnchorLink
              key={link.href}
              href={link.href}
              className={active === link.href ? "is-active" : ""}
              aria-current={active === link.href ? "true" : undefined}
            >
              {link.label}
            </AnchorLink>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="btn btn-primary btn-sm header-cta"
            href={WA_AGENDAR}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsAppIcon size={16} /> Agendar consulta
          </a>
          <button
            className="nav-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      <div
        className="menu-mobile"
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
      >
        <nav aria-label="Seções do site">
          {NAV_LINKS.map((link) => (
            <AnchorLink
              key={link.href}
              href={link.href}
              data-menu-item
              onNavigate={() => setOpen(false)}
            >
              <span>{link.label}</span>
              <ArrowIcon size={18} />
            </AnchorLink>
          ))}
        </nav>
        <div className="menu-mobile-foot" data-menu-item>
          <a href={CONTACT.phoneHref}>
            <PhoneIcon size={16} /> {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`}>
            <MailIcon size={16} /> E-mail
          </a>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer">
            <InstagramIcon size={16} /> Instagram
          </a>
        </div>
      </div>
    </header>
  );
}
