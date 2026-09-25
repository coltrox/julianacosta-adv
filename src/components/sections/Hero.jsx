import { useLayoutEffect, useRef } from "react";
import julianaFoto from "../../assets/juliana-foto.jpg";
import { CONTACT, OAB, WA_AGENDAR } from "../../data/contact.js";
import { HERO_FACTS } from "../../data/content.js";
import { PhoneIcon, WhatsAppIcon } from "../../icons.jsx";
import { buildHeroIntro, buildParallax, gsap } from "../../motion/index.js";
import Kicker from "../ui/Kicker.jsx";
import MaskedWords from "../ui/MaskedWords.jsx";

/** Deslocamento do retrato no parallax, em % da própria altura. */
const PORTRAIT_PARALLAX = -6;

export default function Hero() {
  const rootRef = useRef(null);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      buildHeroIntro(rootRef.current);
      buildParallax(imgRef.current, PORTRAIT_PARALLAX);
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
