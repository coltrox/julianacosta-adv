import { AREAS } from "../../data/content.js";
import Kicker from "../ui/Kicker.jsx";

export default function Areas() {
  return (
    <section className="section section-alt" id="areas">
      <div className="container">
        <div className="section-head">
          <Kicker>Áreas de atuação</Kicker>
          <h2 data-reveal>Onde eu posso ajudar.</h2>
          <p data-reveal>
            Atuação consultiva, preventiva e contenciosa. Se o seu caso não
            estiver aqui, pergunte: quando não é da minha área, indico um colega
            de confiança.
          </p>
        </div>

        <div className="area-list">
          {AREAS.map((area) => {
            const Icon = area.icon;
            return (
              <article className="area" key={area.title} data-reveal>
                <span className="area-n">{area.n}</span>
                <span className="area-icon">
                  <Icon size={26} />
                </span>
                <div className="area-body">
                  <h3>{area.title}</h3>
                  <p>{area.desc}</p>
                  <ul className="area-tags">
                    {area.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
