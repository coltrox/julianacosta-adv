/* ============================================================
   Acordeão — abre e fecha um painel de FAQ
   ------------------------------------------------------------
   Animar `height` é a exceção à regra de só mexer em transform:
   não existe jeito de revelar altura desconhecida sem ela. Como
   é um painel por vez e só no clique, o custo é aceitável.
   ============================================================ */

import { gsap, ScrollTrigger } from "./gsap-setup.js";
import { prefersReducedMotion } from "./environment.js";

export function animateDisclosure(panel, open) {
  if (!panel) return;

  if (prefersReducedMotion()) {
    gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
    return;
  }

  gsap.killTweensOf(panel);

  if (open) {
    // Mede a altura final e anima de trás para frente, a partir de zero.
    gsap.set(panel, { height: "auto", opacity: 1 });
    gsap.from(panel, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      // A página mudou de altura: os gatilhos precisam reposicionar.
      onComplete: () => ScrollTrigger.refresh(),
    });
  } else {
    gsap.to(panel, {
      height: 0,
      opacity: 0,
      duration: 0.38,
      ease: "power2.inOut",
      onComplete: () => ScrollTrigger.refresh(),
    });
  }
}
