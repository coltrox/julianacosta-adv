import { useEffect, useRef, useState } from "react";
import { FAQ_ITEMS } from "../../data/content.js";
import { ChevronIcon } from "../../icons.jsx";
import { animateDisclosure } from "../../motion/index.js";
import Kicker from "../ui/Kicker.jsx";

/** Índice que representa "nenhum painel aberto". */
const NONE = -1;

export default function Faq() {
  // Um painel por vez, e o primeiro já abre: a resposta mais procurada
  // fica visível sem clique.
  const [openIndex, setOpenIndex] = useState(0);
  const panelsRef = useRef([]);

  useEffect(() => {
    panelsRef.current.forEach((panel, i) =>
      animateDisclosure(panel, openIndex === i)
    );
  }, [openIndex]);

  return (
    <div className="faq">
      <div className="faq-head">
        <Kicker>Dúvidas frequentes</Kicker>
        <h2 data-reveal>Antes de ligar.</h2>
      </div>

      <div className="faq-list" data-reveal>
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
              <h3>
                <button
                  className="faq-q"
                  onClick={() => setOpenIndex(isOpen ? NONE : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-button-${i}`}
                >
                  <span>{item.q}</span>
                  <ChevronIcon size={20} />
                </button>
              </h3>
              <div
                className="faq-panel"
                id={`faq-panel-${i}`}
                role="region"
                aria-labelledby={`faq-button-${i}`}
                ref={(el) => {
                  panelsRef.current[i] = el;
                }}
              >
                <p>{item.a}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
