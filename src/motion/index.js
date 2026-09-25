/* ============================================================
   Camada de movimento — API pública
   ------------------------------------------------------------
   Os componentes importam daqui, nunca dos arquivos internos.
   Assim reorganizar src/motion não obriga a mexer em nenhum
   componente.

   Regras que mantêm isso leve:
   1. Só transform e opacity são animados — a única exceção é a
      altura do acordeão, que não tem alternativa;
   2. um único loop de frames no site: o rAF do Lenis vive dentro
      do ticker do GSAP;
   3. revelações usam ScrollTrigger.batch e rodam uma vez só;
   4. parallax, letreiro e cursor saem do ar no celular e em
      reduced-motion, cada um pelo seu próprio motivo.
   ============================================================ */

export { gsap, ScrollTrigger } from "./gsap-setup.js";

export {
  hasFinePointer,
  isCompact,
  prefersReducedMotion,
} from "./environment.js";

export { initSmoothScroll, lockScroll, scrollToHash } from "./smooth-scroll.js";

export { buildReveals } from "./reveals.js";
export { buildHeroIntro } from "./hero.js";
export { buildParallax } from "./parallax.js";
export {
  buildHeaderState,
  buildProgress,
  buildScrollSpy,
} from "./scroll-state.js";
export { createMarqueeLoop } from "./marquee.js";
export { createCursorFollower } from "./cursor.js";
export { animateDisclosure } from "./disclosure.js";
