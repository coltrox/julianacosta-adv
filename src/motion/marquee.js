/* ============================================================
   Letreiro — loop contínuo, reativo ao scroll e arrastável
   ------------------------------------------------------------
   Como funciona

   O trilho é uma fila de conjuntos idênticos. Em vez de tocar um
   tween de 0 a -50%, o módulo mantém um deslocamento em pixels e
   dá a volta a cada largura de conjunto. Consequências:

   - a emenda nunca aparece, porque não existe "fim" do tween
     para reiniciar;
   - a velocidade pode mudar (ou inverter) no meio do caminho sem
     tranco, porque o que muda é px/s e não a direção de um tween;
   - o dedo pode assumir o controle e devolver, porque o
     deslocamento é um número que qualquer um pode empurrar.

   Três forças mexem nesse número:

   1. repouso  — velocidade constante para a esquerda, na mesma
                 cadência do letreiro antigo (CYCLE_SECONDS);
   2. scroll   — descer acelera, subir inverte o sentido; o
                 empurrão decai sozinho e o letreiro volta ao
                 repouso em curva, não em degrau;
   3. arrasto  — enquanto o ponteiro está pressionado ele é a
                 única fonte de movimento; ao soltar, a velocidade
                 do gesto vira inércia e decai até o repouso.

   O número de conjuntos necessário é medido em tempo de execução:
   com poucos conjuntos, uma tela larga abre um vão na direita no
   pior ponto do ciclo. Quem renderiza recebe a conta por
   `onCopiesNeeded`.
   ============================================================ */

import { gsap, ScrollTrigger } from "./gsap-setup.js";
import { prefersReducedMotion } from "./environment.js";

/* Segundos para o conteúdo percorrer uma repetição inteira quando nada
   interfere. É o ritmo de leitura em repouso — e o do letreiro original. */
const CYCLE_SECONDS = 34;

/* Quanto da velocidade do scroll (px/s) vira velocidade de letreiro.
   Calibrado no gesto real: um clique de roda produz ~670px/s de scroll e
   precisa ser suficiente para inverter o letreiro, não só freá-lo. */
const SCROLL_GAIN = 0.26;

/* Teto do empurrão do scroll, em múltiplos da velocidade de repouso. */
const MAX_SCROLL_BOOST = 9;

/* Teto da inércia ao soltar, em múltiplos da velocidade de repouso. */
const MAX_FLICK_BOOST = 16;

/* Meia-vida do empurrão do scroll: parou de rolar e em ~0,3s o letreiro
   já está claramente voltando ao repouso. */
const BOOST_HALF_LIFE = 0.34;

/* Meia-vida da aproximação ao alvo. É o que transforma a inversão de
   sentido em curva em vez de tranco — e precisa ser bem menor que a
   meia-vida do empurrão, senão um gesto curto acaba antes de o letreiro
   reagir a ele. */
const SPEED_HALF_LIFE = 0.12;

/* Segurou parado mais que isso antes de soltar? Então não foi um
   arremesso: solta sem inércia. */
const FLICK_TIMEOUT = 0.12;

/* Peso da amostra nova na média da velocidade do dedo. */
const FLICK_SMOOTHING = 0.4;

/* Nenhum frame conta como mais de 50ms: aba que volta do segundo plano
   não deve produzir um salto. */
const MAX_FRAME = 1 / 20;

/** Quanto sobra de um valor após `dt` segundos, dada a meia-vida. */
const decay = (halfLife, dt) => Math.pow(0.5, dt / halfLife);

/**
 * Monta o letreiro e devolve a função que o desmonta por inteiro.
 *
 * @param {object}      params
 * @param {HTMLElement} params.band            a faixa (recorta e recebe o gesto)
 * @param {HTMLElement} params.track           a fila de conjuntos, que é deslocada
 * @param {(n: number) => void} [params.onCopiesNeeded]
 *        chamado com quantos conjuntos a tela atual exige
 */
export function createMarqueeLoop({ band, track, onCopiesNeeded }) {
  // Em reduced-motion o letreiro é um bloco de texto parado e centralizado
  // (ver styles/components/marquee.css): nada para montar aqui.
  if (!band || !track || prefersReducedMotion()) return () => {};

  const setX = gsap.quickSetter(track, "x", "px");

  let cycle = 0; // largura de um conjunto, px — o período do loop
  let restSpeed = 0; // px/s em repouso, sempre positivo (é magnitude)
  let offset = 0; // deslocamento aplicado, mantido em (-cycle, 0]
  let speed = 0; // px/s deste frame, com sinal
  let boost = 0; // empurrão do scroll, px/s com sinal
  let running = false;

  let dragId = null; // pointerId do gesto em curso
  let dragPending = 0; // px arrastados ainda não aplicados
  let dragX = 0;
  let dragAt = 0;
  let flick = 0; // px/s estimado do ponteiro

  /* ------------------------------ geometria ----------------------------- */

  /** Traz qualquer deslocamento para dentro de um período do loop. */
  const wrapOffset = (value) =>
    cycle ? -(((-value % cycle) + cycle) % cycle) : 0;

  const measure = () => {
    const width = track.firstElementChild?.getBoundingClientRect().width ?? 0;
    // Fonte ainda carregando, faixa escondida: mede depois, sem zerar nada.
    if (!width) return;

    cycle = width;
    restSpeed = cycle / CYCLE_SECONDS;
    offset = wrapOffset(offset);
    setX(offset);

    // No pior ponto do ciclo o primeiro conjunto está inteiro fora da tela,
    // então são os outros que precisam cobrir a faixa.
    onCopiesNeeded?.(Math.ceil(band.clientWidth / cycle) + 1);
  };

  /* -------------------------------- frame ------------------------------- */

  const frame = (_time, deltaMs) => {
    if (!cycle) return;
    const dt = Math.min(deltaMs / 1000, MAX_FRAME);

    if (dragId !== null) {
      // Ponteiro pressionado: ele é a única fonte de movimento. As posições
      // chegam pelo pointermove e são aplicadas aqui, uma vez por frame.
      if (dragPending) {
        offset = wrapOffset(offset + dragPending);
        dragPending = 0;
        setX(offset);
      }
      return;
    }

    boost *= decay(BOOST_HALF_LIFE, dt);

    // Repouso é sempre para a esquerda; o empurrão soma com sinal e, quando
    // é grande o bastante, vira o sentido.
    const target = -restSpeed + boost;
    speed += (target - speed) * (1 - decay(SPEED_HALF_LIFE, dt));

    offset = wrapOffset(offset + speed * dt);
    setX(offset);
  };

  /* -------------------------------- scroll ------------------------------ */

  const trigger = ScrollTrigger.create({
    trigger: band,
    start: "top bottom",
    end: "bottom top",
    // Fora da tela o letreiro não gasta frame nenhum.
    onToggle: (self) => (self.isActive ? start() : stop()),
    onUpdate: (self) => {
      // getVelocity() é px/s de scroll, positivo descendo. Descer empurra
      // para a esquerda, o mesmo sentido do repouso; subir empurra para a
      // direita com força suficiente para inverter o letreiro.
      const cap = restSpeed * MAX_SCROLL_BOOST;
      boost = gsap.utils.clamp(-cap, cap, -self.getVelocity() * SCROLL_GAIN);
    },
  });

  /* -------------------------------- arrasto ----------------------------- */

  const onPointerDown = (ev) => {
    // Só botão principal do mouse; toque e caneta passam direto.
    if (ev.pointerType === "mouse" && ev.button !== 0) return;
    if (dragId !== null || !cycle) return;

    dragId = ev.pointerId;
    dragX = ev.clientX;
    dragAt = ev.timeStamp;
    dragPending = 0;
    flick = 0;
    speed = 0;
    boost = 0;
    band.classList.add("is-dragging");
  };

  const onPointerMove = (ev) => {
    if (ev.pointerId !== dragId) return;

    const dx = ev.clientX - dragX;
    const dt = (ev.timeStamp - dragAt) / 1000;
    dragX = ev.clientX;
    dragAt = ev.timeStamp;
    dragPending += dx;

    // Média exponencial: um tremor no último milissegundo do gesto não
    // decide a inércia inteira.
    if (dt > 0) flick += (dx / dt - flick) * FLICK_SMOOTHING;
  };

  const onPointerUp = (ev) => {
    if (ev.pointerId !== dragId) return;

    dragId = null;
    band.classList.remove("is-dragging");

    // Arrastou, parou e só então soltou: não era um arremesso.
    const held = (ev.timeStamp - dragAt) / 1000 > FLICK_TIMEOUT;
    const cap = restSpeed * MAX_FLICK_BOOST;

    // A velocidade do gesto entra como estado inicial e o frame a puxa de
    // volta ao repouso — é isso que dá a desaceleração.
    speed = held ? 0 : gsap.utils.clamp(-cap, cap, flick);
    flick = 0;
  };

  /* ------------------------------ ciclo de vida ------------------------- */

  function start() {
    if (running) return;
    running = true;
    gsap.ticker.add(frame);
  }

  function stop() {
    if (!running) return;
    running = false;
    gsap.ticker.remove(frame);
    // Voltou para a tela depois de um scroll longo: começa em repouso, não
    // no empurrão que ficou guardado.
    speed = -restSpeed;
    boost = 0;
  }

  // A faixa recebe o gesto; o resto escuta a janela para que o ponteiro
  // possa sair da faixa (ou da própria janela) sem travar o arrasto.
  band.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);

  // A largura do conjunto muda com a fonte que carrega, com a janela que
  // muda de tamanho e com a chegada de novos conjuntos.
  const observer = new ResizeObserver(measure);
  observer.observe(band);
  observer.observe(track);

  measure();

  // A faixa pode já estar na tela na primeira pintura, antes de existir um
  // scroll que faça o gatilho alternar.
  if (trigger.isActive) start();

  return () => {
    stop();
    observer.disconnect();
    trigger.kill();
    band.classList.remove("is-dragging");
    band.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
  };
}
