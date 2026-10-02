/* ============================================================
   Letreiro — loop contínuo, preso ao scroll e arrastável
   ------------------------------------------------------------
   Como funciona

   O trilho é uma fila de conjuntos idênticos. Em vez de tocar um
   tween de 0 a -50%, o módulo mantém um deslocamento em pixels e
   dá a volta a cada largura de conjunto. Consequências:

   - a emenda nunca aparece, porque não existe "fim" do tween
     para reiniciar;
   - o sentido pode inverter no meio do caminho sem tranco,
     porque o que muda é px/s e não a direção de um tween;
   - o dedo pode assumir o controle e devolver, porque o
     deslocamento é um número que qualquer um pode empurrar.

   Três forças mexem nesse número:

   1. deriva   — velocidade constante para a esquerda, na mesma
                 cadência do letreiro antigo (CYCLE_SECONDS);
   2. scroll   — acoplamento de POSIÇÃO, não de velocidade: cada
                 pixel rolado desloca o letreiro na mesma hora,
                 SCROLL_COUPLING px por px. Descer soma para a
                 esquerda, subir subtrai e o letreiro anda para
                 trás. Como está preso à posição e não a uma
                 estimativa de velocidade, o efeito é imediato,
                 proporcional ao gesto e impossível de não ver;
   3. arrasto  — enquanto o gesto é reconhecido como horizontal,
                 o ponteiro é a única fonte de movimento; ao
                 soltar, a velocidade do gesto vira inércia e
                 decai até a deriva.

   O gesto do dedo é ambíguo no começo: ninguém consegue arrastar
   o letreiro em linha reta, e a faixa fica no meio do caminho de
   quem só quer rolar a página. Por isso o arrasto só é assumido
   depois de DIRECTION_LOCK pixels na horizontal — antes disso o
   letreiro segue rodando e o scroll vertical passa intacto.

   prefers-reduced-motion: o letreiro NÃO recua, e isso é uma decisão
   deliberada da dona do site, não um esquecimento — favor não
   "consertar" reintroduzindo a checagem. As três forças valem nos dois
   modos. O resto de src/motion continua respeitando a preferência
   (parallax, cursor, abertura do hero e revelações), então quem pede
   menos movimento ainda recebe uma página bem mais quieta: o que sobra
   é uma faixa de texto deslizando, sem nada entrando ou saindo da tela.

   O número de conjuntos necessário é medido em tempo de execução:
   com poucos conjuntos, uma tela larga abre um vão na direita no
   pior ponto do ciclo. Quem renderiza recebe a conta por
   `onCopiesNeeded`.
   ============================================================ */

import { gsap, ScrollTrigger } from "./gsap-setup.js";

/* Segundos para o conteúdo percorrer uma repetição inteira quando nada
   interfere. É o ritmo de leitura em repouso — e o do letreiro original. */
const CYCLE_SECONDS = 34;

/* Pixels de letreiro por pixel de scroll. Um swipe de 300px desloca o
   letreiro ~135px: mais de meia palavra, então a ligação com o gesto é
   imediata e óbvia. */
const SCROLL_COUPLING = 0.45;

/* Meia-vida da volta à deriva depois de um arremesso, e da volta da
   deriva quando o leitor para de subir. */
const SPEED_HALF_LIFE = 0.28;

/* Enquanto o leitor rola, a deriva cede — nos dois sentidos.

   A deriva existe para o letreiro não ficar parado, não para competir
   com o gesto. Somada a um scroll para cima, as duas forças apontam
   para lados opostos e se anulam perto de certa velocidade; alternando
   sobe-desce, o sentido cruza esse ponto toda hora e o movimento fica
   piscando. Tratar só a subida, com uma parada curta, trocava um
   problema por outro: cada troca de sentido ganhava um tranco próprio.

   Com a deriva cedendo na proporção de quanto se está rolando, o
   movimento durante o gesto é só o do gesto — para cima volta, para
   baixo acelera, e o quanto é proporcional à velocidade do scroll. Nada
   a cruzar, nada a travar. Parou de rolar, a deriva volta sozinha.

   Velocidade de scroll (px/s) a partir da qual a deriva cede por
   inteiro. Um scroll de leitura já passa disso. */
const SCROLL_FULL = 260;

/* Meia-vida da entrada e da saída da atividade. Sobe rápido, para a
   deriva sair do caminho já no primeiro quadro do gesto; desce devagar,
   para voltar sem degrau e para aguentar scroll em rajadas — entre duas
   rajadas a atividade não chega a cair, então não há o que piscar. */
const ACTIVITY_IN_HALF_LIFE = 0.05;
const ACTIVITY_OUT_HALF_LIFE = 0.32;

/* O navegador não entrega o scroll de forma contínua: entrega em
   degraus. Medido no celular, 53 de 63 quadros de um gesto vinham com
   delta ZERO, e o resto em saltos de 20px. Aplicado cru, isso serrava o
   letreiro — ele ia 11px com o gesto num quadro e voltava 1px de deriva
   no seguinte, alternando.

   Então o deslocamento do scroll entra numa dívida e é pago em curva,
   uma fração por quadro. Nada se perde, a escada vira rampa, e o preço
   é um atraso de uns dois quadros que ninguém percebe. */
const SCROLL_RELEASE_HALF_LIFE = 0.06;


/* Quantos pixels na horizontal o gesto precisa andar antes de o letreiro
   assumir que é um arrasto. Abaixo disso o gesto ainda pode ser um scroll
   vertical, e quem manda é a página. */
const DIRECTION_LOCK = 8;

/* Teto da inércia ao soltar, em múltiplos da velocidade de deriva. */
const MAX_FLICK_BOOST = 16;

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
  if (!band || !track) return () => {};

  const setX = gsap.quickSetter(track, "x", "px");

  let cycle = 0; // largura de um conjunto, px — o período do loop
  let driftSpeed = 0; // px/s da deriva, com sinal
  let restSpeed = 0; // px/s da deriva em repouso, sempre positivo
  let offset = 0; // deslocamento aplicado, mantido em (-cycle, 0]
  let lastScroll = null; // posição de scroll no quadro anterior
  let activity = 0; // 0 parado, 1 rolando com gosto — o quanto a deriva cede
  let scrollDebt = 0; // px de scroll que chegaram e ainda não foram pagos
  let running = false;

  let pointerId = null; // ponteiro em observação
  let dragging = false; // o gesto já foi reconhecido como horizontal
  let originX = 0; // onde o gesto começou, para o direction lock
  let originY = 0;
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

    if (dragging) {
      // Gesto horizontal em curso: o ponteiro é a única fonte de movimento.
      // A referência de scroll acompanha sem ser aplicada, senão o letreiro
      // andaria duas vezes ao fim do arrasto.
      lastScroll = window.scrollY;
      if (dragPending) {
        offset = wrapOffset(offset + dragPending);
        dragPending = 0;
        setX(offset);
      }
      return;
    }

    // Lê a posição do scroll do próprio navegador, uma vez por quadro.
    //
    // Nem num callback do ScrollTrigger, nem pelo trigger.scroll(): os
    // dois entregam valor em cache, atualizado quando chega evento de
    // scroll — e eventos chegam em rajadas. Dava quadro com delta e
    // quadro sem, e o letreiro serrava entre "andou com o gesto" e "só a
    // deriva": medido em +11px, −1px, +11px, −1px a cada quadro.
    // window.scrollY está sempre atual na hora do quadro.
    const current = window.scrollY;
    const scrolled = lastScroll === null ? 0 : current - lastScroll;
    lastScroll = current;

    // Descer empurra para a esquerda, subir para a direita. Entra como
    // dívida, não como deslocamento imediato.
    scrollDebt -= scrolled * SCROLL_COUPLING;
    const pago = scrollDebt * (1 - decay(SCROLL_RELEASE_HALF_LIFE, dt));
    scrollDebt -= pago;

    // Quanto se está rolando, sem olhar o sentido: é simétrico de
    // propósito, porque o que atrapalha é a deriva competir com o gesto,
    // e ela compete nos dois sentidos. Medido no que foi pago, que já
    // está suavizado — o delta cru é zero na maioria dos quadros.
    const velGesto = Math.abs(pago / dt) / SCROLL_COUPLING;
    const alvoAtividade = Math.min(1, velGesto / SCROLL_FULL);
    const meiaVida =
      alvoAtividade > activity ? ACTIVITY_IN_HALF_LIFE : ACTIVITY_OUT_HALF_LIFE;
    activity += (alvoAtividade - activity) * (1 - decay(meiaVida, dt));

    // A deriva cede na proporção da atividade. Com o gesto a pleno, ela
    // é zero e só o scroll move o letreiro.
    const alvoDeriva = -restSpeed * (1 - activity);
    driftSpeed += (alvoDeriva - driftSpeed) * (1 - decay(SPEED_HALF_LIFE, dt));

    offset = wrapOffset(offset + driftSpeed * dt + pago);
    setX(offset);
  };

  /* -------------------------------- scroll ------------------------------ */

  const trigger = ScrollTrigger.create({
    trigger: band,
    start: "top bottom",
    end: "bottom top",
    // Fora da tela o letreiro não gasta frame nenhum. O gatilho serve só
    // para isso: quem lê a posição do scroll é o quadro.
    onToggle: (self) => (self.isActive ? start() : stop()),
  });

  /* -------------------------------- arrasto ----------------------------- */

  const onPointerDown = (ev) => {
    // Só botão principal do mouse; toque e caneta passam direto.
    if (ev.pointerType === "mouse" && ev.button !== 0) return;
    if (pointerId !== null || !cycle) return;

    // Observa o gesto, mas não assume nada ainda: pode ser um scroll.
    pointerId = ev.pointerId;
    dragging = false;
    originX = ev.clientX;
    originY = ev.clientY;
    dragPending = 0;
    flick = 0;
  };

  /** Começa a arrastar de verdade, sem perder o trecho já percorrido. */
  const beginDrag = (ev) => {
    dragging = true;
    dragX = ev.clientX;
    dragAt = ev.timeStamp;
    // Os pixels gastos reconhecendo a direção contam: sem isso o letreiro
    // ficaria DIRECTION_LOCK px atrás do dedo pelo resto do gesto.
    dragPending = ev.clientX - originX;
    flick = 0;
    driftSpeed = 0;
    band.classList.add("is-dragging");
  };

  const onPointerMove = (ev) => {
    if (ev.pointerId !== pointerId) return;

    if (!dragging) {
      const dx = ev.clientX - originX;
      const dy = ev.clientY - originY;

      // Gesto que se revelou vertical: é da página, não do letreiro.
      if (Math.abs(dy) > DIRECTION_LOCK && Math.abs(dy) >= Math.abs(dx)) {
        pointerId = null;
        return;
      }
      if (Math.abs(dx) <= DIRECTION_LOCK) return;

      beginDrag(ev);
      return;
    }

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
    if (ev.pointerId !== pointerId) return;

    const wasDragging = dragging;
    pointerId = null;
    dragging = false;
    band.classList.remove("is-dragging");

    // Nunca virou arrasto (foi um toque, ou um scroll): nada a fazer.
    // `pointercancel` é o navegador assumindo o gesto para rolar a página,
    // e aí a inércia seria do gesto dele, não do letreiro.
    if (!wasDragging || ev.type === "pointercancel") {
      flick = 0;
      return;
    }

    // Arrastou, parou e só então soltou: não era um arremesso.
    const held = (ev.timeStamp - dragAt) / 1000 > FLICK_TIMEOUT;
    const cap = restSpeed * MAX_FLICK_BOOST;

    // A velocidade do gesto entra como deriva inicial e o frame a puxa de
    // volta ao repouso — é isso que dá a desaceleração.
    driftSpeed = held ? 0 : gsap.utils.clamp(-cap, cap, flick);
    flick = 0;
  };

  /* ------------------------------ ciclo de vida ------------------------- */

  function start() {
    if (running) return;
    running = true;
    // A referência é recolhida no primeiro quadro: assim o letreiro não
    // herda o scroll que passou enquanto estava fora da tela.
    lastScroll = null;
    gsap.ticker.add(frame);
  }

  function stop() {
    if (!running) return;
    running = false;
    gsap.ticker.remove(frame);
    driftSpeed = -restSpeed;
    // Zerado para o letreiro não herdar, ao voltar para a tela, o scroll
    // que passou enquanto ele estava fora.
    lastScroll = null;
    activity = 0;
    scrollDebt = 0;
  }

  // A faixa recebe o começo do gesto; o resto escuta a janela para que o
  // ponteiro possa sair da faixa (ou da própria janela) sem travar nada.
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
