/* ============================================================
   O que o dispositivo e o visitante permitem
   ------------------------------------------------------------
   Três perguntas que a camada de movimento faz antes de animar
   qualquer coisa. Todas leem o estado atual na hora da chamada —
   nada de cachear: o visitante pode trocar a preferência ou
   plugar um mouse com o site aberto.
   ============================================================ */

/**
 * "Menos movimento" não quer dizer "tela parada".
 * Quando o visitante pede reduced-motion, o que sai é o movimento grande e
 * autônomo — parallax, letreiro, cursor, scroll sequestrado. O fade de
 * entrada continua: informa que a seção chegou sem deslocar nada na tela.
 */
export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Mouse de verdade (não um dedo): só aí o cursor customizado faz sentido. */
export const hasFinePointer = () =>
  window.matchMedia("(pointer: fine)").matches;

/** Abaixo disso o parallax sai e as durações encurtam. */
export const isCompact = () => window.matchMedia("(max-width: 900px)").matches;
