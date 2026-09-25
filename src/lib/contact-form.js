/* ============================================================
   Formulário de contato — regras, sem React
   ------------------------------------------------------------
   O site não tem servidor: o formulário monta uma mensagem e
   entrega ao WhatsApp do visitante, que revisa e envia. Nada é
   armazenado, então a validação existe para um único fim —
   garantir que exista um caminho de volta para responder.

   Por isso as regras são frouxas de propósito: melhor aceitar um
   telefone escrito de um jeito estranho do que barrar alguém com
   um caso real.
   ============================================================ */

import { CONTACT } from "../data/contact.js";
import { SUBJECTS } from "../data/content.js";

/** Estado de um formulário em branco. O assunto já vem no primeiro item. */
export const EMPTY_FORM = {
  nome: "",
  contato: "",
  assunto: SUBJECTS[0],
  resumo: "",
};

/* Não valida e-mail "de verdade" — só rejeita o que claramente não é um:
   sem espaço, um @ no meio e um ponto no domínio. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Dez ou mais dígitos e os separadores que as pessoas realmente usam. */
const PHONE_RE = /^\+?[\d\s().-]{10,}$/;

/**
 * Devolve um objeto de erros por campo. Vazio significa válido.
 * As mensagens explicam por que o dado é necessário, em vez de
 * apenas apontar o que está errado.
 */
export function validateForm(form) {
  const errors = {};

  if (form.nome.trim().length < 2) {
    errors.nome = "Escreva seu nome para eu saber como te chamar.";
  }

  const contato = form.contato.trim();
  if (!contato) {
    errors.contato = "Preciso de um e-mail ou telefone para responder.";
  } else if (!EMAIL_RE.test(contato) && !PHONE_RE.test(contato)) {
    errors.contato = "Confira o e-mail ou o telefone: algo está incompleto.";
  }

  return errors;
}

/** A mensagem que o visitante vai ver já escrita no WhatsApp. */
export function buildWhatsAppUrl(form) {
  const lines = [
    `Olá, Dra. Juliana. Meu nome é ${form.nome.trim()}.`,
    `Assunto: ${form.assunto}.`,
  ];
  if (form.resumo.trim()) lines.push("", form.resumo.trim());
  lines.push("", `Meu contato: ${form.contato.trim()}`);

  return `${CONTACT.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
