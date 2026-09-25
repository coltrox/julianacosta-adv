import { useState } from "react";
import { CONTACT, MAPS_LINK } from "../../data/contact.js";
import { SUBJECTS } from "../../data/content.js";
import {
  CheckIcon,
  ChevronIcon,
  MailIcon,
  PinIcon,
  WhatsAppIcon,
  YearsIcon,
} from "../../icons.jsx";
import {
  buildWhatsAppUrl,
  EMPTY_FORM,
  validateForm,
} from "../../lib/contact-form.js";
import Kicker from "../ui/Kicker.jsx";

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  // Guarda nome e link da última mensagem montada, para a tela de confirmação.
  const [sent, setSent] = useState(null);

  const update = (field) => (ev) => {
    const { value } = ev.target;
    setForm((current) => ({ ...current, [field]: value }));
    // Limpa o erro assim que a pessoa começa a corrigir, não só no envio.
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: null }));
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const found = validateForm(form);
    setErrors(found);

    const [firstInvalid] = Object.keys(found);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const url = buildWhatsAppUrl(form);
    window.open(url, "_blank", "noopener,noreferrer");
    setSent({ nome: form.nome.trim(), url });
    setForm(EMPTY_FORM);
  };

  return (
    <section className="section section-alt" id="contato">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-form-side" data-reveal>
            <Kicker>Primeiro contato</Kicker>
            <h2>Conte o seu caso.</h2>

            {sent ? (
              <div className="sent" role="status">
                <span className="sent-icon">
                  <CheckIcon size={22} />
                </span>
                <p>
                  <strong>Tudo certo, {sent.nome}.</strong> Abri o WhatsApp com a
                  sua mensagem já escrita — basta enviar.
                </p>
                <p className="sent-alt">
                  Se a janela não abriu,{" "}
                  <a href={sent.url} target="_blank" rel="noreferrer">
                    clique aqui
                  </a>{" "}
                  ou escreva para{" "}
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
                </p>
                <button className="btn btn-quiet" onClick={() => setSent(null)}>
                  Escrever outra mensagem
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="nome">Nome</label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    placeholder="Como devo te chamar"
                    value={form.nome}
                    onChange={update("nome")}
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? "erro-nome" : undefined}
                  />
                  {errors.nome && (
                    <span className="field-error" id="erro-nome">
                      {errors.nome}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="contato">E-mail ou telefone</label>
                  <input
                    id="contato"
                    name="contato"
                    type="text"
                    autoComplete="email"
                    placeholder="Para eu conseguir te responder"
                    value={form.contato}
                    onChange={update("contato")}
                    aria-invalid={!!errors.contato}
                    aria-describedby={
                      errors.contato ? "erro-contato" : undefined
                    }
                  />
                  {errors.contato && (
                    <span className="field-error" id="erro-contato">
                      {errors.contato}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="assunto">Assunto</label>
                  <div className="select-wrap">
                    <select
                      id="assunto"
                      name="assunto"
                      value={form.assunto}
                      onChange={update("assunto")}
                    >
                      {SUBJECTS.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon size={18} />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="resumo">
                    Resumo <span>(opcional)</span>
                  </label>
                  <textarea
                    id="resumo"
                    name="resumo"
                    rows={4}
                    placeholder="Em poucas linhas, o que está acontecendo"
                    value={form.resumo}
                    onChange={update("resumo")}
                  />
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  <WhatsAppIcon size={18} /> Enviar pelo WhatsApp
                </button>
                <p className="form-note">
                  A mensagem abre no seu WhatsApp para você revisar antes de
                  enviar. Nada é armazenado neste site.
                </p>
              </form>
            )}
          </div>

          <aside className="contact-info-side" data-reveal>
            <Kicker>Escritório</Kicker>
            <h2>Onde me encontrar.</h2>
            <p className="measure">
              Atendimento presencial em Campinas, com agendamento prévio, e
              consultas por videoconferência para clientes de qualquer cidade.
            </p>

            <ul className="contact-list">
              <li>
                <span className="contact-icon">
                  <WhatsAppIcon size={18} />
                </span>
                <span className="contact-text">
                  <strong>WhatsApp e ligações</strong>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </span>
              </li>
              <li>
                <span className="contact-icon">
                  <MailIcon size={18} />
                </span>
                <span className="contact-text">
                  <strong>E-mail</strong>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </span>
              </li>
              <li>
                <span className="contact-icon">
                  <PinIcon size={18} />
                </span>
                <span className="contact-text">
                  <strong>Endereço</strong>
                  <a href={MAPS_LINK} target="_blank" rel="noreferrer">
                    {CONTACT.address}
                  </a>
                </span>
              </li>
              <li>
                <span className="contact-icon">
                  <YearsIcon size={18} />
                </span>
                <span className="contact-text">
                  <strong>Horário</strong>
                  <span className="plain">
                    Segunda a sexta, 9h às 18h — retorno em até 1 dia útil
                  </span>
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
