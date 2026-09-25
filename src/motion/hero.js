/* ============================================================
   Abertura da primeira tela
   ============================================================ */

import { gsap } from "./gsap-setup.js";
import { prefersReducedMotion } from "./environment.js";

export function buildHeroIntro(scope) {
  if (!scope) return null;

  const words = gsap.utils.toArray("[data-word]", scope);
  const bits = gsap.utils.toArray("[data-hero]", scope);
  const portrait = scope.querySelector("[data-portrait-img]");

  // Modo suave: a abertura acontece, mas por opacidade — sem palavra subindo
  // da máscara e sem zoom no retrato.
  const soft = prefersReducedMotion();
  const tl = gsap.timeline({
    defaults: { ease: soft ? "power2.out" : "power3.out" },
  });

  // fromTo em tudo: o estado inicial nasce com a animação e morre com ela.
  // Nada aqui depende de uma regra de CSS escondendo o conteúdo antes.
  if (soft) {
    tl.fromTo(
      words,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.03 }
    );
  } else {
    tl.fromTo(
      words,
      { yPercent: 118 },
      { yPercent: 0, duration: 1.05, stagger: 0.045, ease: "expo.out" }
    );
  }

  tl.fromTo(
    bits,
    { opacity: 0, y: soft ? 0 : 20 },
    {
      opacity: 1,
      y: 0,
      duration: soft ? 0.5 : 0.85,
      stagger: soft ? 0.06 : 0.1,
    },
    soft ? 0.12 : 0.3
  );

  if (portrait) {
    tl.fromTo(
      portrait,
      { scale: soft ? 1.06 : 1.16, opacity: 0 },
      {
        scale: 1.06,
        opacity: 1,
        duration: soft ? 0.6 : 1.5,
        ease: "power2.out",
      },
      soft ? 0 : 0.1
    );
  }

  return tl;
}
