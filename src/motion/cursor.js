/* ============================================================
   Cursor seguidor
   ------------------------------------------------------------
   Duas peças: o anel, que chega atrasado, e o ponto, que cola no
   ponteiro. A diferença de duração entre os dois é todo o efeito.

   `quickTo` em vez de `gsap.to` por frame: é a mesma interpolação
   sem alocar um tween novo a cada pointermove.

   Enquanto o seguidor está visível, o documento ganha
   `.has-follower` e o ponteiro do sistema desaparece (ver
   styles/components/cursor.css). Por isso toda saída — mouse que
   sai da janela, aba que perde o foco, componente que desmonta —
   precisa devolver a classe, senão o visitante fica sem cursor.
   ============================================================ */

import { gsap } from "./gsap-setup.js";
import { hasFinePointer } from "./environment.js";

/** O que faz o anel crescer: tudo em que se pode clicar ou digitar. */
const INTERACTIVE = "a, button, input, textarea, select, label, [data-grow]";

const FOLLOWER_CLASS = "has-follower";

/**
 * Liga o cursor seguidor e devolve a função que o desliga.
 * Com dedo em vez de mouse, não liga nada.
 */
export function createCursorFollower(ring, dot) {
  if (!ring || !dot || !hasFinePointer()) return () => {};

  const root = document.documentElement;

  // Fora da tela e invisível: o primeiro pointermove é que traz para cá.
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
  let visible = false;

  const fade = (opacity) =>
    gsap.to([ring, dot], { opacity, duration: 0.15, overwrite: "auto" });

  const onMove = (ev) => {
    ringX(ev.clientX);
    ringY(ev.clientY);
    dotX(ev.clientX);
    dotY(ev.clientY);

    if (!visible) {
      visible = true;
      root.classList.add(FOLLOWER_CLASS);
      fade(1);
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
    visible = false;
    root.classList.remove(FOLLOWER_CLASS);
    fade(0);
  };

  const show = (ev) => {
    root.classList.add(FOLLOWER_CLASS);
    // Reaparece onde o ponteiro está, sem atravessar a tela para chegar lá.
    if (ev?.clientX !== undefined && ev?.clientY !== undefined) {
      gsap.set([ring, dot], { x: ev.clientX, y: ev.clientY });
    }
    visible = true;
    fade(1);
  };

  // Garante que o ponteiro do sistema suma assim que o seguidor existir.
  root.classList.add(FOLLOWER_CLASS);

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
    root.classList.remove(FOLLOWER_CLASS);
    gsap.killTweensOf([ring, dot]);
  };
}
