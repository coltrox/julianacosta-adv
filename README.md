# Juliana Costa — Advocacia

Landing page da Dra. Juliana Soares da Costa. Campinas/SP, com
atendimento online em todo o Brasil.

## Rodar

```bash
npm install
npm run dev
```

Build de produção em `dist/`:

```bash
npm run build
```

## Como está montado

- **React + Vite**, sem framework de CSS. Um arquivo de tokens e um de componentes.
- `src/index.css` — reset, paleta e tipografia (as variáveis `--bone`, `--ink`,
  `--brass`…). Mexer na cor do site é mexer aqui.
- `src/App.css` — layout e estados dos componentes.
- `src/App.jsx` — conteúdo e seções. Textos, áreas de atuação, FAQ e contato
  ficam nas constantes do topo do arquivo.
- `src/icons.jsx` — ícones (traço 1.25, desenho próprio).
- `src/motion.js` — GSAP + Lenis: scroll suave, revelações, parallax, letreiro
  e barra de progresso.

## Paleta

Papel osso (`#f5f1ea`), tinta espresso (`#211f1b`) e latão fosco (`#9a7b4f`)
como único acento. Neutros todos quentes — nada de cinza frio misturado.

## O que falta preencher

- **Número da OAB.** Em `src/App.jsx`, a constante `OAB` está vazia. O
  Provimento 205/2021 da OAB exige nome e número de inscrição na publicidade
  advocatícia. Enquanto estiver vazia, o site não exibe o campo — em nenhum
  lugar aparece número inventado.

## Contato do formulário

Não há servidor. O formulário monta a mensagem e abre o WhatsApp para a pessoa
revisar antes de enviar; o e-mail aparece como alternativa. Nada é armazenado.

## Movimento

O site respeita `prefers-reduced-motion`, mas de forma graduada: quem pede
menos movimento continua vendo o fade de entrada e o scroll suave (mais curto),
e perde parallax, letreiro e o zoom do retrato. O cursor em anel só aparece
quando há mouse de verdade (`pointer: fine`).
