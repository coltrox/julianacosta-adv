import { CONTACT } from "../../data/contact.js";
import { EDUCATION } from "../../data/content.js";
import {
  ArrowIcon,
  BookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "../../icons.jsx";
import Kicker from "../ui/Kicker.jsx";

export default function Professional() {
  return (
    <section className="section" id="perfil">
      <div className="container editorial">
        <div className="editorial-aside">
          <Kicker>A profissional</Kicker>
          <h2 data-reveal>
            Técnica de quem já viu <em>muitos casos</em> — e paciência para ouvir
            o seu.
          </h2>
        </div>

        <div className="editorial-body">
          <p className="lead" data-reveal>
            Advogada inscrita na OAB/SP, com mais de 20 anos dedicados ao Direito
            privado. Atuação em Campinas e, por videoconferência, em todo o
            Brasil — em causas judiciais e em soluções de cartório.
          </p>
          <p data-reveal>
            O trabalho começa sempre pelo diagnóstico honesto: o que é possível,
            o que é improvável, quanto tempo leva e quanto custa. Só depois vem a
            estratégia. Cliente que entende o próprio caso decide melhor e se
            frustra menos.
          </p>

          <ul className="edu-list" data-reveal>
            {EDUCATION.map((item) => (
              <li key={item.school}>
                <span className="edu-icon">
                  <BookIcon size={18} />
                </span>
                <span className="edu-text">
                  <strong>{item.course}</strong>
                  <span>{item.school}</span>
                </span>
                <span className="edu-when">{item.when}</span>
              </li>
            ))}
          </ul>

          <div className="profile-links" data-reveal>
            <a
              className="text-link"
              href={CONTACT.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon size={17} /> Instagram
              <ArrowIcon size={16} />
            </a>
            <a
              className="text-link"
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon size={17} /> LinkedIn
              <ArrowIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
