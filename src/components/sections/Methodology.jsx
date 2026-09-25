import { METHOD_PILLARS, METHOD_TOOLS } from "../../data/content.js";
import { CheckIcon } from "../../icons.jsx";
import Kicker from "../ui/Kicker.jsx";

export default function Methodology() {
  return (
    <section className="section section-dark" id="metodo">
      <div className="container editorial">
        <div className="editorial-aside">
          <Kicker>Método</Kicker>
          <h2 data-reveal>
            Direito Sistêmico: <em>resolver, não prolongar.</em>
          </h2>
        </div>

        <div className="editorial-body">
          <p className="lead" data-reveal>
            Todo conflito acontece dentro de um sistema — uma família, um
            condomínio, uma sociedade — em que as pessoas seguem se afetando
            depois da sentença. Ignorar isso produz vitórias que não resolvem
            nada.
          </p>
          <p data-reveal>
            Por isso a condução dos casos usa ferramentas que vão além da
            petição:
          </p>

          <ul className="tool-list" data-reveal>
            {METHOD_TOOLS.map((tool) => (
              <li key={tool}>
                <CheckIcon size={16} />
                {tool}
              </li>
            ))}
          </ul>

          <div className="pillars">
            {METHOD_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div className="pillar" key={pillar.title} data-reveal>
                  <Icon size={24} />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
