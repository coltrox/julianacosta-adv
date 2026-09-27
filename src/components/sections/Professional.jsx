import { CONTACT } from "../../data/contact.js";
import { EDUCATION, PROFILE_PARAGRAPHS } from "../../data/content.js";
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
            Experiência para compreender cada caso.{" "}
            <em>Técnica para conduzir o seu.</em>
          </h2>
        </div>

        <div className="editorial-body">
          {PROFILE_PARAGRAPHS.map((paragraph, i) => (
            <p className={i === 0 ? "lead" : undefined} key={paragraph} data-reveal>
              {paragraph}
            </p>
          ))}

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
