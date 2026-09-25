/* ============================================================
   Configuração global do GSAP
   ------------------------------------------------------------
   Importar este módulo é o que garante o ScrollTrigger registrado.
   Todo o resto de src/motion pega o gsap daqui — nunca do pacote
   direto — para que a configuração não dependa de quem importou
   primeiro.
   ============================================================ */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.config({ nullTargetWarn: false });
gsap.defaults({ ease: "power3.out", duration: 0.9 });

ScrollTrigger.config({
  // A barra de endereço do iOS mudando de altura não deve recalcular tudo.
  ignoreMobileResize: true,
  limitCallbacks: true,
});

export { gsap, ScrollTrigger };
