import { TESTIMONIALS } from "../../data/content.js";
import { StarIcon } from "../../icons.jsx";
import Kicker from "../ui/Kicker.jsx";
import Faq from "./Faq.jsx";

const STARS = [0, 1, 2, 3, 4];

export default function Voices() {
  return (
    <section className="section" id="vozes">
      <div className="container">
        <div className="section-head">
          <Kicker>Clientes</Kicker>
          <h2 data-reveal>Quem já passou por aqui.</h2>
        </div>

        <div className="quote-wall">
          {TESTIMONIALS.map((item) => (
            <figure className="quote" key={item.name} data-reveal>
              <span className="quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <div className="quote-stars" aria-label="Avaliação de 5 estrelas">
                {STARS.map((star) => (
                  <StarIcon key={star} size={14} />
                ))}
              </div>
              <blockquote>{item.text}</blockquote>
              <figcaption>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <Faq />
      </div>
    </section>
  );
}
