import { METHOD_DIAGNOSIS, METHOD_SYSTEMIC } from "../../data/content.js";
import { CheckIcon } from "../../icons.jsx";
import Kicker from "../ui/Kicker.jsx";

/**
 * Dois movimentos, na ordem em que acontecem: primeiro entender o caso,
 * depois conduzi-lo. O segundo traz a lista do que isso significa na
 * prática, e por isso vem junto dele e não antes.
 */
export default function Methodology() {
  return (
    <section className="section section-dark" id="metodo">
      <div className="container editorial">
        <div className="editorial-aside">
          <Kicker>Método</Kicker>
          <h2 data-reveal>
            Diagnóstico <em>antes da estratégia.</em>
          </h2>
        </div>

        <div className="editorial-body">
          {METHOD_DIAGNOSIS.map((paragraph, i) => (
            <p className={i === 0 ? "lead" : undefined} key={paragraph} data-reveal>
              {paragraph}
            </p>
          ))}

          <h3 className="method-sub" data-reveal>
            {METHOD_SYSTEMIC.title}
          </h3>
          <p data-reveal>{METHOD_SYSTEMIC.text}</p>
          <p data-reveal>{METHOD_SYSTEMIC.toolsIntro}</p>

          <ul className="tool-list" data-reveal>
            {METHOD_SYSTEMIC.tools.map((tool) => (
              <li key={tool}>
                <CheckIcon size={16} />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
