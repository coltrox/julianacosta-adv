import { useLayoutEffect, useRef, useState } from "react";
import { NAV_LINKS } from "./data/navigation.js";
import {
  buildProgress,
  buildReveals,
  buildScrollSpy,
  gsap,
  initSmoothScroll,
  ScrollTrigger,
} from "./motion/index.js";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";
import Areas from "./components/sections/Areas.jsx";
import Contact from "./components/sections/Contact.jsx";
import Hero from "./components/sections/Hero.jsx";
import Marquee from "./components/sections/Marquee.jsx";
import Methodology from "./components/sections/Methodology.jsx";
import Professional from "./components/sections/Professional.jsx";
import Voices from "./components/sections/Voices.jsx";
import Cursor from "./components/ui/Cursor.jsx";

/**
 * A página inteira. Cada seção cuida das próprias animações; aqui ficam
 * só as que atravessam o documento todo — scroll suave, barra de
 * progresso, revelações e o espião que marca a seção atual no menu.
 */
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
      NAV_LINKS.map((link) => link.href),
      setActive
    );

    // A fonte que chega depois muda a altura do texto e desloca todo mundo:
    // os gatilhos precisam ser recalculados com as medidas finais.
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
