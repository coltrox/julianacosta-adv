import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import julianaFoto from "./assets/juliana-foto.jpg";
import {
  AccordIcon,
  ArrowIcon,
  BookIcon,
  CheckIcon,
  ChevronIcon,
  CloseIcon,
  DocIcon,
  EstateIcon,
  FamilyIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  PinIcon,
  ScaleIcon,
  SealIcon,
  StarIcon,
  TagIcon,
  WhatsAppIcon,
  YearsIcon,
} from "./icons.jsx";
import {
  animateDisclosure,
  buildHeaderState,
  buildHeroIntro,
  buildMarquee,
  buildParallax,
  buildProgress,
  buildReveals,
  buildScrollSpy,
  gsap,
  hasFinePointer,
  initSmoothScroll,
  lockScroll,
  prefersReducedMotion,
  ScrollTrigger,
  scrollToHash,
} from "./motion.js";

/* ================================ dados ================================== */

const CONTACT = {
  phone: "(19) 92000-3015",
  phoneHref: "tel:+5519920003015",
  whatsapp: "https://wa.me/5519920003015",
  email: "advogada.julianasoares@hotmail.com",
  address:
    "Av. Francisco Glicério, 1326 — Sala 3, Ed. Tabatinga, Conceição, Campinas — SP",
  linkedin: "https://www.linkedin.com/in/juliana-soares-da-costa-298a0522/",
  instagram: "https://www.instagram.com/julianasoaresdacosta.adv/",
};

const OAB = "";

const wa = (texto) =>
  `${CONTACT.whatsapp}?text=${encodeURIComponent(texto)}`;

const WA_AGENDAR = wa(
  "Olá, Dra. Juliana. Gostaria de agendar uma consulta para falar sobre o meu caso."
);

const NAV_LINKS = [
  { href: "#perfil", label: "Perfil" },
  { href: "#areas", label: "Áreas" },
  { href: "#metodo", label: "Método" },
  { href: "#vozes", label: "Clientes" },
  { href: "#contato", label: "Contato" },
];

const MARQUEE_ITEMS = [
  "Prevenção de litígios",
  "Resolução extrajudicial",
  "Comunicação não-violenta",
  "Atendimento online em todo o Brasil",
  "Mediação de conflitos",
  "Inventário em cartório",
];

const HERO_FACTS = [
  { icon: YearsIcon, label: "20+ anos de atuação" },
  { icon: ScaleIcon, label: "Família, imóveis e contratos" },
  { icon: PinIcon, label: "Campinas e todo o Brasil" },
];

const EDUCATION = [
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

const AREAS = [
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

const METHOD_PILLARS = [
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

const METHOD_TOOLS = [
  "Comunicação Não-Violenta (CNV)",
  "Análise de movimentos essenciais",
  "Mediação e negociação estruturada",
  "Via extrajudicial como primeira opção",
];

const TESTIMONIALS = [
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

const FAQ_ITEMS = [
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

const SUBJECTS = [
  "Família e sucessões",
  "Imobiliário ou condomínio",
  "Contrato ou cobrança",
  "Direito do consumidor",
  "Outro assunto",
];

/* ============================== utilitários ============================== */

function AnchorLink({ href, children, onNavigate, ...rest }) {
  const handle = (ev) => {
    if (href?.startsWith("#")) {
      ev.preventDefault();
      scrollToHash(href);
      window.history.replaceState(null, "", href);
    }
    onNavigate?.();
  };
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

function MaskedWords({ text, className = "" }) {
  return text.split(" ").map((word, i) => (
    <span className={`mask ${className}`} key={`${word}-${i}`}>
      <span className="mask-i" data-word>
        {word}
      </span>
    </span>
  ));
}

function Kicker({ children, className = "", ...rest }) {
  return (
    <span className={`kicker ${className}`} {...rest}>
      {children}
    </span>
  );
}

/* ================================ cursor ================================= */

function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!hasFinePointer()) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    // Garante que o cursor do sistema suma assim que o componente montar
    document.documentElement.classList.add("has-follower");

    gsap.set([ring, dot], {
      xPercent: -50,
      yPercent: -50,
      x: -100,
      y: -100,
      opacity: 0,
    });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power2.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power2.out" });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    let grown = false;
    let isVisible = false;
    const INTERACTIVE = "a, button, input, textarea, select, label, [data-grow]";

    const onMove = (ev) => {
      ringX(ev.clientX);
      ringY(ev.clientY);
      dotX(ev.clientX);
      dotY(ev.clientY);

      if (!isVisible) {
        isVisible = true;
        document.documentElement.classList.add("has-follower");
        gsap.to([ring, dot], { opacity: 1, duration: 0.15, overwrite: "auto" });
      }

      const over = !!ev.target?.closest?.(INTERACTIVE);
      if (over !== grown) {
        grown = over;
        ring.classList.toggle("is-grown", over);
        gsap.to(ring, {
          scale: over ? 1.6 : 1,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const hide = () => {
      isVisible = false;
      document.documentElement.classList.remove("has-follower");
      gsap.to([ring, dot], { opacity: 0, duration: 0.15, overwrite: "auto" });
    };

    const show = (ev) => {
      document.documentElement.classList.add("has-follower");
      if (ev.clientX !== undefined && ev.clientY !== undefined) {
        gsap.set([ring, dot], { x: ev.clientX, y: ev.clientY });
      }
      isVisible = true;
      gsap.to([ring, dot], { opacity: 1, duration: 0.15, overwrite: "auto" });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);
    window.addEventListener("blur", hide);
    window.addEventListener("focus", show);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      window.removeEventListener("blur", hide);
      window.removeEventListener("focus", show);
      document.documentElement.classList.remove("has-follower");
      gsap.killTweensOf([ring, dot]);
    };
  }, []);

  return (
    <>
      <span className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <span className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}

/* ================================ header ================================= */

function Header({ active }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const panelRef = useRef(null);

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

      <div className="menu-mobile" id="menu-mobile" ref={panelRef} hidden={!open}>
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

/* ================================= hero ================================== */

function Hero() {
  const rootRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      buildHeroIntro(rootRef.current);
      buildParallax(imgRef.current, -6);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="topo" ref={rootRef}>
      <div className="container hero-inner">
        <div className="hero-copy">
          <Kicker className="hero-kicker" data-hero>
            Campinas · SP — e online em todo o Brasil
          </Kicker>

          <h1 className="hero-title">
            <MaskedWords text="Segurança jurídica com" />
            <MaskedWords text="olhar humano." className="mask-accent" />
          </h1>

          <p className="hero-lead measure" data-hero>
            Mais de 20 anos em família e sucessões, imobiliário, contratos e
            consumidor. A prioridade é resolver — por acordo sempre que for
            possível, no processo quando for necessário.
          </p>

          <div className="hero-cta" data-hero>
            <a
              className="btn btn-primary btn-lg"
              href={WA_AGENDAR}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon size={18} /> Agendar uma consulta
            </a>
            <a className="btn btn-quiet btn-lg" href={CONTACT.phoneHref}>
              <PhoneIcon size={18} /> {CONTACT.phone}
            </a>
          </div>

          <ul className="hero-facts" data-hero>
            {HERO_FACTS.map((fact) => {
              const Icon = fact.icon;
              return (
                <li key={fact.label}>
                  <Icon size={17} />
                  {fact.label}
                </li>
              );
            })}
          </ul>
        </div>

        <figure className="hero-portrait" data-parallax-scope data-hero>
          <div className="portrait-frame">
            <img
              src={julianaFoto}
              alt="Dra. Juliana Soares da Costa, advogada, em seu escritório em Campinas"
              ref={imgRef}
              data-portrait-img
              width="900"
              height="1200"
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <figcaption>
            <strong>Dra. Juliana S. da Costa</strong>
            <span>Advogada{OAB ? ` · OAB/SP ${OAB}` : ""}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* =============================== letreiro ================================ */

function Marquee() {
  const bandRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(
      () => buildMarquee(bandRef.current, trackRef.current),
      bandRef
    );
    return () => ctx.revert();
  }, []);

  const run = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="marquee" ref={bandRef} aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {run.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            {item}
            <i className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================ perfil ================================= */

function Professional() {
  return (
    <section className="section" id="perfil">
      <div className="container editorial">
        <div className="editorial-aside">
          <Kicker>A profissional</Kicker>
          <h2 data-reveal>
            Técnica de quem já viu <em>muitos casos</em> — e paciência para ouvir
            o seu.
          </h2>
        </div>

        <div className="editorial-body">
          <p className="lead" data-reveal>
            Advogada inscrita na OAB/SP, com mais de 20 anos dedicados ao Direito
            privado. Atuação em Campinas e, por videoconferência, em todo o
            Brasil — em causas judiciais e em soluções de cartório.
          </p>
          <p data-reveal>
            O trabalho começa sempre pelo diagnóstico honesto: o que é possível,
            o que é improvável, quanto tempo leva e quanto custa. Só depois vem a
            estratégia. Cliente que entende o próprio caso decide melhor e se
            frustra menos.
          </p>

          <ul className="edu-list" data-reveal>
            {EDUCATION.map((item) => (
              <li key={item.school}>
                <span className="edu-icon">
                  <BookIcon size={18} />
                </span>
                <span className="edu-text">
                  <strong>{item.course}</strong>
                  <span>{item.school}</span>
                </span>
                <span className="edu-when">{item.when}</span>
              </li>
            ))}
          </ul>

          <div className="profile-links" data-reveal>
            <a
              className="text-link"
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon size={17} /> Instagram
              <ArrowIcon size={16} />
            </a>
            <a
              className="text-link"
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon size={17} /> LinkedIn
              <ArrowIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================= áreas ================================= */

function Areas() {
  return (
    <section className="section section-alt" id="areas">
      <div className="container">
        <div className="section-head">
          <Kicker>Áreas de atuação</Kicker>
          <h2 data-reveal>Onde eu posso ajudar.</h2>
          <p data-reveal>
            Atuação consultiva, preventiva e contenciosa. Se o seu caso não
            estiver aqui, pergunte: quando não é da minha área, indico um colega
            de confiança.
          </p>
        </div>

        <div className="area-list">
          {AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <article className="area" key={area.title} data-reveal>
                <span className="area-n">{area.n}</span>
                <span className="area-icon">
                  <Icon size={26} />
                </span>
                <div className="area-body">
                  <h3>{area.title}</h3>
                  <p>{area.desc}</p>
                  <ul className="area-tags">
                    {area.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================ método ================================= */

function Methodology() {
  return (
    <section className="section section-dark" id="metodo">
      <div className="container editorial">
        <div className="editorial-aside">
          <Kicker>Método</Kicker>
          <h2 data-reveal>
            Direito Sistêmico: <em>resolver, não prolongar.</em>
          </h2>
        </div>

        <div className="editorial-body">
          <p className="lead" data-reveal>
            Todo conflito acontece dentro de um sistema — uma família, um
            condomínio, uma sociedade — em que as pessoas seguem se afetando
            depois da sentença. Ignorar isso produz vitórias que não resolvem
            nada.
          </p>
          <p data-reveal>
            Por isso a condução dos casos usa ferramentas que vão além da
            petição:
          </p>

          <ul className="tool-list" data-reveal>
            {METHOD_TOOLS.map((tool) => (
              <li key={tool}>
                <CheckIcon size={16} />
                {tool}
              </li>
            ))}
          </ul>

          <div className="pillars">
            {METHOD_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div className="pillar" key={pillar.title} data-reveal>
                  <Icon size={24} />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================ clientes e FAQ ============================= */

function Voices() {
  return (
    <section className="section" id="vozes">
      <div className="container">
        <div className="section-head">
          <Kicker>Clientes</Kicker>
          <h2 data-reveal>Quem já passou por aqui.</h2>
        </div>

        <div className="quote-wall">
          {TESTIMONIALS.map((item) => (
            <figure className="quote" key={item.name} data-reveal>
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <div className="quote-stars" aria-label="Avaliação de 5 estrelas">
                {[0, 1, 2, 3, 4].map((s) => (
                  <StarIcon key={s} size={14} />
                ))}
              </div>
              <blockquote>{item.text}</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <Faq />
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  const panels = useRef([]);

  useEffect(() => {
    panels.current.forEach((panel, i) => animateDisclosure(panel, open === i));
  }, [open]);

  return (
    <div className="faq">
      <div className="faq-head">
        <Kicker>Dúvidas frequentes</Kicker>
        <h2 data-reveal>Antes de ligar.</h2>
      </div>

      <div className="faq-list" data-reveal>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
              <h3>
                <button
                  className="faq-q"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                >
                  <span>{item.q}</span>
                  <ChevronIcon size={20} />
                </button>
              </h3>
              <div
                className="faq-panel"
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                ref={(el) => {
                  panels.current[i] = el;
                }}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================ contato ================================ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]{10,}$/;

function buildWhatsAppText(form) {
  const lines = [
    `Olá, Dra. Juliana. Meu nome é ${form.nome.trim()}.`,
    `Assunto: ${form.assunto}.`,
  ];
  if (form.resumo.trim()) lines.push("", form.resumo.trim());
  lines.push("", `Meu contato: ${form.contato.trim()}`);
  return encodeURIComponent(lines.join("\n"));
}

const EMPTY_FORM = { nome: "", contato: "", assunto: SUBJECTS[0], resumo: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(null);

  const update = (field) => (ev) => {
    const { value } = ev.target;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
  };

  const validate = () => {
    const next = {};
    if (form.nome.trim().length < 2) {
      next.nome = "Escreva seu nome para eu saber como te chamar.";
    }
    const contato = form.contato.trim();
    if (!contato) {
      next.contato = "Preciso de um e-mail ou telefone para responder.";
    } else if (!EMAIL_RE.test(contato) && !PHONE_RE.test(contato)) {
      next.contato = "Confira o e-mail ou o telefone: algo está incompleto.";
    }
    return next;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    const url = `${CONTACT.whatsapp}?text=${buildWhatsAppText(form)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent({ nome: form.nome.trim(), url });
    setForm(EMPTY_FORM);
  };

  return (
    <section className="section section-alt" id="contato">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-form-side" data-reveal>
            <Kicker>Primeiro contato</Kicker>
            <h2>Conte o seu caso.</h2>

            {sent ? (
              <div className="sent" role="status">
                <span className="sent-icon">
                  <CheckIcon size={22} />
                </span>
                <p>
                  <strong>Tudo certo, {sent.nome}.</strong> Abri o WhatsApp com a
                  sua mensagem já escrita — basta enviar.
                </p>
                <p className="sent-alt">
                  Se a janela não abriu,{" "}
                  <a href={sent.url} target="_blank" rel="noreferrer">
                    clique aqui
                  </a>{" "}
                  ou escreva para{" "}
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
                </p>
                <button className="btn btn-quiet" onClick={() => setSent(null)}>
                  Escrever outra mensagem
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="nome">Nome</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    placeholder="Como devo te chamar"
                    value={form.nome}
                    onChange={update("nome")}
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? "erro-nome" : undefined}
                  />
                  {errors.nome && (
                    <span className="field-error" id="erro-nome">
                      {errors.nome}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="contato">E-mail ou telefone</label>
                  <input
                    id="contato"
                    name="contato"
                    type="text"
                    autoComplete="email"
                    placeholder="Para eu conseguir te responder"
                    value={form.contato}
                    onChange={update("contato")}
                    aria-invalid={!!errors.contato}
                    aria-describedby={errors.contato ? "erro-contato" : undefined}
                  />
                  {errors.contato && (
                    <span className="field-error" id="erro-contato">
                      {errors.contato}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="assunto">Assunto</label>
                  <div className="select-wrap">
                    <select
                      id="assunto"
                      name="assunto"
                      value={form.assunto}
                      onChange={update("assunto")}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon size={18} />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="resumo">
                    Resumo <span>(opcional)</span>
                  </label>
                  <textarea
                    id="resumo"
                    name="resumo"
                    rows={4}
                    placeholder="Em poucas linhas, o que está acontecendo"
                    value={form.resumo}
                    onChange={update("resumo")}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  <WhatsAppIcon size={18} /> Enviar pelo WhatsApp
                </button>
                <p className="form-note">
                  A mensagem abre no seu WhatsApp para você revisar antes de
                  enviar. Nada é armazenado neste site.
                </p>
              </form>
            )}
          </div>

          <aside className="contact-info-side" data-reveal>
            <Kicker>Escritório</Kicker>
            <h2>Onde me encontrar.</h2>
            <p className="measure">
              Atendimento presencial em Campinas, com agendamento prévio, e
              consultas por videoconferência para clientes de qualquer cidade.
            </p>

            <ul className="contact-list">
              <li>
                <span className="contact-icon">
                  <WhatsAppIcon size={18} />
                </span>
                <span className="contact-text">
                  <strong>WhatsApp e ligações</strong>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </span>
              </li>
              <li>
                <span className="contact-icon">
                  <MailIcon size={18} />
                </span>
                <span className="contact-text">
                  <strong>E-mail</strong>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </span>
              </li>
              <li>
                <span className="contact-icon">
                  <PinIcon size={18} />
                </span>
                <span className="contact-text">
                  <strong>Endereço</strong>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      CONTACT.address
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {CONTACT.address}
                  </a>
                </span>
              </li>
              <li>
                <span className="contact-icon">
                  <YearsIcon size={18} />
                </span>
                <span className="contact-text">
                  <strong>Horário</strong>
                  <span className="plain">
                    Segunda a sexta, 9h às 18h — retorno em até 1 dia útil
                  </span>
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ================================ rodapé ================================= */

function Footer() {
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

/* =============================== flutuante =============================== */

function WhatsAppFloat() {
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

/* ================================== app ================================== */

export default function App() {
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const [active, setActive] = useState("#topo");

  useLayoutEffect(() => {
    const stopScroll = initSmoothScroll();

    const ctx = gsap.context(() => {
      buildProgress(progressRef.current);
      buildReveals(rootRef.current);
    }, rootRef);

    const stopSpy = buildScrollSpy(
      NAV_LINKS.map((l) => l.href),
      setActive
    );

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      stopSpy();
      ctx.revert();
      stopScroll();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>

      <span className="progress" ref={progressRef} aria-hidden="true" />
      <span className="grain" aria-hidden="true" />
      <Cursor />

      <Header active={active} />

      <main id="conteudo">
        <Hero />
        <Marquee />
        <Professional />
        <Areas />
        <Methodology />
        <Voices />
        <Contact />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}