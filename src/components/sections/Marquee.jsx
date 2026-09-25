import { useLayoutEffect, useRef, useState } from "react";
import { MARQUEE_ITEMS } from "../../data/content.js";
import { createMarqueeLoop } from "../../motion/index.js";

/**
 * Dois conjuntos bastam para a maioria das telas e é com eles que a
 * primeira pintura acontece. Se a tela for larga demais para isso, o
 * loop mede e pede mais — ver createMarqueeLoop.
 */
const MIN_COPIES = 2;

/** A faixa escura de termos, entre o hero e o perfil. */
export default function Marquee() {
  const bandRef = useRef(null);
  const trackRef = useRef(null);
  const [copies, setCopies] = useState(MIN_COPIES);

  useLayoutEffect(
    () =>
      createMarqueeLoop({
        band: bandRef.current,
        track: trackRef.current,
        // Só cresce: nunca remove um conjunto que já está na tela.
        onCopiesNeeded: (needed) =>
          setCopies((current) => Math.max(current, needed)),
      }),
    []
  );

  // aria-hidden: é ornamento, e o conteúdo repetido só atrapalharia
  // quem usa leitor de tela.
  return (
    <div className="marquee" ref={bandRef} aria-hidden="true">
      <div className="marquee-track" ref={trackRef}>
        {Array.from({ length: copies }, (_, copy) => (
          <div className="marquee-set" key={copy}>
            {MARQUEE_ITEMS.map((item) => (
              <span className="marquee-item" key={item}>
                {item}
                <i className="marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
