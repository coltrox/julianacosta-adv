/* ============================================================
   Revelações ao rolar — [data-reveal]
   ============================================================ */

import { gsap, ScrollTrigger } from "./gsap-setup.js";
import { isCompact, prefersReducedMotion } from "./environment.js";

/**
 * Anima tudo que tiver [data-reveal] dentro do escopo.
 * Irmãos que entram juntos na tela sobem em cascata, não de uma vez.
 */
export function buildReveals(scope) {
  const targets = gsap.utils.toArray("[data-reveal]", scope);
  if (!targets.length) return;

  const soft = prefersReducedMotion();

  ScrollTrigger.batch(targets, {
    start: "top 88%",
    once: true,
    batchMax: 5,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        // O deslocamento inicial só existe fora do modo suave (ver
        // styles/base/reveal-state.css), então aqui basta zerar: em
        // reduced-motion nada se move.
        y: 0,
        duration: soft ? 0.45 : isCompact() ? 0.66 : 0.9,
        stagger: soft ? 0.04 : 0.07,
        overwrite: true,
        // Devolve o elemento à pintura normal quando a animação acaba.
        onComplete: () => gsap.set(batch, { willChange: "auto" }),
      }),
  });
}
