/* ============================================================
   Parallax
   ============================================================ */

import { gsap } from "./gsap-setup.js";
import { isCompact, prefersReducedMotion } from "./environment.js";

/** Deslocamento sutil só no desktop — no celular custa frames e rende pouco. */
export function buildParallax(el, amount = -7) {
  if (!el || prefersReducedMotion() || isCompact()) return;

  gsap.to(el, {
    yPercent: amount,
    ease: "none",
    scrollTrigger: {
      trigger: el.closest("[data-parallax-scope]") || el,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
}
