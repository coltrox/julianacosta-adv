/* ============================================================
   Camada de movimento — GSAP + Lenis
   ------------------------------------------------------------
   Regras que mantêm isso leve:
   1. Só transform e opacity são animados (nunca top/left/width).
   2. Um único loop de frames: o rAF do Lenis vive dentro do ticker do GSAP.
   3. Revelações usam ScrollTrigger.batch e rodam uma vez só.
   4. Parallax e cursor saem do ar no celular e em reduced-motion.
   ============================================================ */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

gsap.config({ nullTargetWarn: false });
gsap.defaults({ ease: "power3.out", duration: 0.9 });

ScrollTrigger.config({
  // A barra de endereço do iOS mudando de altura não deve recalcular tudo.
  ignoreMobileResize: true,
  limitCallbacks: true,
});

/* ------------------------------ ambiente -------------------------------- */

/**
 * "Menos movimento" não quer dizer "tela parada".
 * Quando o visitante pede reduced-motion, o que sai é o movimento grande e
 * autônomo — parallax, letreiro, cursor, scroll sequestrado. O fade de
 * entrada continua: informa que a seção chegou sem deslocar nada na tela.
 */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Mouse de verdade (não um dedo): só aí o cursor customizado faz sentido. */
export const hasFinePointer = () => window.matchMedia("(pointer: fine)").matches;

/** Abaixo disso o parallax sai e as durações encurtam. */
export const isCompact = () => window.matchMedia("(max-width: 900px)").matches;

/* --------------------------- scroll suave ------------------------------- */

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
export function scrollToHash(hash, offset = -88) {
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

export function lockScroll(locked) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.classList.toggle("lenis-stopped", locked);
  document.body.style.overflow = locked && !lenis ? "hidden" : "";
}

/* ------------------------- revelações ao rolar -------------------------- */

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
        // O deslocamento inicial só existe fora do modo suave (ver index.css),
        // então aqui basta zerar: em reduced-motion nada se move.
        y: 0,
        duration: soft ? 0.45 : isCompact() ? 0.66 : 0.9,
        stagger: soft ? 0.04 : 0.07,
        overwrite: true,
        // Devolve o elemento à pintura normal quando a animação acaba.
        onComplete: () => gsap.set(batch, { willChange: "auto" }),
      }),
  });
}

/* ------------------------ entrada da primeira tela ---------------------- */

export function buildHeroIntro(scope) {
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
    tl.fromTo(words, { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.03 });
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

/* ------------------------------ parallax -------------------------------- */

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

/* ------------------------ barra de progresso ---------------------------- */

/**
 * A barra segue o scroll — não é movimento autônomo, então vale também em
 * reduced-motion.
 */
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

/* -------------------------- header ao rolar ----------------------------- */

export function buildHeaderState(header) {
  if (!header) return;

  ScrollTrigger.create({
    start: 48,
    end: () => ScrollTrigger.maxScroll(window),
    onToggle: (self) => header.classList.toggle("is-stuck", self.isActive),
  });
}

/* ----------------------------- letreiro --------------------------------- */

/**
 * O trilho carrega o conteúdo duplicado; -50% fecha o ciclo sem costura.
 * Fica pausado enquanto a faixa está fora da tela.
 */
export function buildMarquee(band, track) {
  if (!band || !track || prefersReducedMotion()) return;

  const loop = gsap.to(track, {
    xPercent: -50,
    duration: 34,
    ease: "none",
    repeat: -1,
  });

  loop.pause();

  ScrollTrigger.create({
    trigger: band,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
  });
}

/* ------------------------- espião de seção ------------------------------ */

/** Marca no menu a seção em que o leitor está. */
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

  return () => triggers.forEach((t) => t.kill());
}

/* ---------------------------- acordeão ---------------------------------- */

export function animateDisclosure(panel, open) {
  if (!panel) return;

  if (prefersReducedMotion()) {
    gsap.set(panel, { height: open ? "auto" : 0, opacity: open ? 1 : 0 });
    return;
  }

  gsap.killTweensOf(panel);

  if (open) {
    gsap.set(panel, { height: "auto", opacity: 1 });
    gsap.from(panel, {
      height: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
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

export { gsap, ScrollTrigger };
