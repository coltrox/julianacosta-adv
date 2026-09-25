/* ============================================================
   Ícones
   ------------------------------------------------------------
   Traço único de 1.25 em todo o conjunto — mais fino que o padrão
   de biblioteca, para combinar com a serifa de alto contraste.
   Desenhos próprios: nada de escudo para "defesa" nem coração
   para "acolhimento".
   ============================================================ */

const Glyph = ({ children, size = 24, className = "", strokeWidth = 1.25 }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    {children}
  </svg>
);

/* --- marca: balança reduzida ao essencial --- */
export const ScaleIcon = (p) => (
  <Glyph {...p}>
    <path d="M12 3.6v16.8" />
    <path d="M8 20.4h8" />
    <path d="M3.4 7.6h17.2" />
    <path d="M3.4 7.6.9 14a3.9 3.9 0 0 0 5 0Z" />
    <path d="M20.6 7.6 18.1 14a3.9 3.9 0 0 0 5 0Z" />
  </Glyph>
);

/* --- tempo de atuação --- */
export const YearsIcon = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 7.4V12l3.2 2" />
  </Glyph>
);

/* --- confirmação: traço simples, sem círculo em volta --- */
export const CheckIcon = (p) => (
  <Glyph {...p}>
    <path d="M4.5 12.6 9.3 17.4 19.5 7.2" />
  </Glyph>
);

export const PhoneIcon = (p) => (
  <Glyph {...p}>
    <path d="M6.3 3.2h3.1l1.6 4-2 1.3a11.4 11.4 0 0 0 5.5 5.5l1.3-2 4 1.6v3.1a2 2 0 0 1-2.2 2A17.3 17.3 0 0 1 4.3 5.4a2 2 0 0 1 2-2.2Z" />
  </Glyph>
);

export const MailIcon = (p) => (
  <Glyph {...p}>
    <rect x="2.6" y="5.2" width="18.8" height="13.6" rx="1.4" />
    <path d="m3.4 6.4 7.7 5.4a1.6 1.6 0 0 0 1.8 0l7.7-5.4" />
  </Glyph>
);

export const PinIcon = (p) => (
  <Glyph {...p}>
    <path d="M12 21.4s7-6.1 7-11.4a7 7 0 1 0-14 0c0 5.3 7 11.4 7 11.4Z" />
    <circle cx="12" cy="9.8" r="2.6" />
  </Glyph>
);

export const LinkedInIcon = (p) => (
  <Glyph {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M7.4 10.6v6.2" />
    <path d="M7.4 7.5v.1" strokeWidth={1.8} />
    <path d="M11.6 16.8v-6.2" />
    <path d="M11.6 13.2a2.4 2.4 0 0 1 4.8 0v3.6" />
  </Glyph>
);

export const InstagramIcon = (p) => (
  <Glyph {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.1" />
    <path d="M17 7v.1" strokeWidth={1.9} />
  </Glyph>
);

/* --- acordo: dois arcos que se encontram no meio --- */
export const AccordIcon = (p) => (
  <Glyph {...p}>
    <path d="M3 17.5c0-4.1 3.1-7.4 7-7.4" />
    <path d="M21 17.5c0-4.1-3.1-7.4-7-7.4" />
    <path d="M10 10.1 12 12l2-1.9" />
    <path d="M12 12v8" />
  </Glyph>
);

/* --- acordo que dura: selo --- */
export const SealIcon = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="9.4" r="6.2" />
    <path d="m8.6 14.6-1 7 4.4-2.6 4.4 2.6-1-7" />
  </Glyph>
);

/* --- contratos e empresarial --- */
export const DocIcon = (p) => (
  <Glyph {...p}>
    <path d="M14 3.2H6.6a1.4 1.4 0 0 0-1.4 1.4v14.8a1.4 1.4 0 0 0 1.4 1.4h10.8a1.4 1.4 0 0 0 1.4-1.4V8Z" />
    <path d="M14 3.2V8h4.8" />
    <path d="M8.6 12.6h6.8" />
    <path d="M8.6 16.2h4.4" />
  </Glyph>
);

/* --- família e sucessões: presenças ligadas --- */
export const FamilyIcon = (p) => (
  <Glyph {...p}>
    <circle cx="7.2" cy="7.4" r="2.8" />
    <circle cx="16.8" cy="7.4" r="2.8" />
    <path d="M2.8 20.4c0-2.7 2-4.6 4.4-4.6s4.4 1.9 4.4 4.6" />
    <path d="M12.4 20.4c0-2.7 2-4.6 4.4-4.6s4.4 1.9 4.4 4.6" />
  </Glyph>
);

/* --- imobiliário: planta em corte --- */
export const EstateIcon = (p) => (
  <Glyph {...p}>
    <path d="M3.4 20.6V9.2L12 3.4l8.6 5.8v11.4" />
    <path d="M3.4 20.6h17.2" />
    <path d="M9.8 20.6v-6h4.4v6" />
    <path d="M12 3.4v5.8" />
  </Glyph>
);

/* --- consumidor --- */
export const TagIcon = (p) => (
  <Glyph {...p}>
    <path d="M12.6 3.4H19a1.6 1.6 0 0 1 1.6 1.6v6.4a1.6 1.6 0 0 1-.47 1.13l-7.4 7.4a1.6 1.6 0 0 1-2.26 0l-6.53-6.53a1.6 1.6 0 0 1 0-2.26l7.4-7.4a1.6 1.6 0 0 1 1.13-.47Z" />
    <path d="M16.4 7.6v.1" strokeWidth={1.9} />
  </Glyph>
);

/* --- formação acadêmica --- */
export const BookIcon = (p) => (
  <Glyph {...p}>
    <path d="M12 6.6C10.4 5.2 8.2 4.6 4.4 4.6v12.8c3.8 0 6 .6 7.6 2 1.6-1.4 3.8-2 7.6-2V4.6c-3.8 0-6 .6-7.6 2Z" />
    <path d="M12 6.6v14.8" />
  </Glyph>
);

export const ChevronIcon = (p) => (
  <Glyph {...p}>
    <path d="m6.5 9.5 5.5 5.5 5.5-5.5" />
  </Glyph>
);

export const ArrowIcon = (p) => (
  <Glyph {...p}>
    <path d="M4.5 12h15" />
    <path d="m13.5 6 6 6-6 6" />
  </Glyph>
);

export const StarIcon = ({ size = 16, className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export const MenuIcon = (p) => (
  <Glyph {...p} strokeWidth={1.4}>
    <path d="M3.5 8h17" />
    <path d="M3.5 16h17" />
  </Glyph>
);

export const CloseIcon = (p) => (
  <Glyph {...p} strokeWidth={1.4}>
    <path d="M5.5 5.5l13 13" />
    <path d="M18.5 5.5l-13 13" />
  </Glyph>
);
