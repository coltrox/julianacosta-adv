/* ============================================================
   Estado derivado do scroll
   ------------------------------------------------------------
   Três observadores que não animam nada por conta própria: eles
   só traduzem "onde o leitor está" em barra de progresso, header
   grudado e item de menu marcado. Por não serem movimento
   autônomo, valem também em reduced-motion.
   ============================================================ */

import { gsap, ScrollTrigger } from "./gsap-setup.js";

/** A barra fina no topo, presa à posição de scroll da página. */
export function buildProgress(bar) {
  if (!bar) return;

  gsap.fromTo(
    bar,
    { scaleX: 0 },
    {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: () => ScrollTrigger.maxScroll(window),
        scrub: 0.35,
        invalidateOnRefresh: true,
      },
    }
  );
}

/** Marca o header como "grudado" depois dos primeiros pixels de scroll. */
export function buildHeaderState(header) {
  if (!header) return;

  ScrollTrigger.create({
    start: 48,
    end: () => ScrollTrigger.maxScroll(window),
    onToggle: (self) => header.classList.toggle("is-stuck", self.isActive),
  });
}

/**
 * Espião de seção: avisa qual âncora está no meio da tela.
 * Devolve a função que desmonta os gatilhos.
 */
export function buildScrollSpy(ids, onChange) {
  const triggers = ids
    .map((id) => {
      const el = document.querySelector(id);
      if (!el) return null;

      return ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) onChange(id);
        },
      });
    })
    .filter(Boolean);

  return () => triggers.forEach((trigger) => trigger.kill());
}
