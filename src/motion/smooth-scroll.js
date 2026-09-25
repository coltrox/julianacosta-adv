/* ============================================================
   Scroll suave — Lenis
   ------------------------------------------------------------
   Um único loop de frames no site: o rAF do Lenis vive dentro do
   ticker do GSAP, então scroll e animação nunca disputam quadros.

   O módulo guarda a instância viva para que as âncoras e o
   travamento do menu passem pelo mesmo motor de scroll. Se o
   Lenis não estiver de pé, cada função cai no comportamento
   nativo em vez de falhar.
   ============================================================ */

import { gsap, ScrollTrigger } from "./gsap-setup.js";
import Lenis from "@studio-freight/lenis";
import { prefersReducedMotion } from "./environment.js";

/** Deslocamento padrão das âncoras: a altura do header fixo. */
const HEADER_OFFSET = -88;

let lenis = null;

export function initSmoothScroll() {
  // O scroll suave é parte do acabamento do site e vale também em
  // reduced-motion — só que bem mais curto, quase colado no nativo.
  const soft = prefersReducedMotion();

  lenis = new Lenis({
    duration: soft ? 0.5 : 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // No toque, o scroll nativo é mais fluido e não briga com o navegador.
    smoothTouch: false,
    touchMultiplier: 1.7,
    wheelMultiplier: 1,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  // Sem lag smoothing o scrub acompanha a roda sem pular quadros.
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    if (lenis) lenis.destroy();
    lenis = null;
  };
}

/** Navegação por âncora passando pelo Lenis (ou nativa, se ele não existir). */
export function scrollToHash(hash, offset = HEADER_OFFSET) {
  const el = document.querySelector(hash);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, {
      offset,
      duration: prefersReducedMotion() ? 0.7 : 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Congela o scroll enquanto o menu do celular está aberto. */
export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.classList.toggle("lenis-stopped", locked);
  document.body.style.overflow = locked && !lenis ? "hidden" : "";
}
