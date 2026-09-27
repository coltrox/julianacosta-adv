import { AREAS, AREAS_FOOTER, AREAS_INTRO } from "../../data/content.js";
import { ArrowIcon } from "../../icons.jsx";
import AnchorLink from "../ui/AnchorLink.jsx";
import Kicker from "../ui/Kicker.jsx";

export default function Areas() {
  return (
    <section className="section section-alt" id="areas">
      <div className="container">
        <div className="section-head">
          <Kicker>Áreas de atuação</Kicker>
          <h2 data-reveal>Onde a atuação se concentra.</h2>
          <p data-reveal>{AREAS_INTRO}</p>
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

        <p className="area-footer" data-reveal>
          {AREAS_FOOTER.question}{" "}
          <AnchorLink className="text-link" href="#contato">
            {AREAS_FOOTER.cta}
            <ArrowIcon size={16} />
          </AnchorLink>
        </p>
      </div>
    </section>
  );
}
