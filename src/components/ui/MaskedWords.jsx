import { Fragment } from "react";

/**
 * Quebra um texto em palavras, cada uma dentro da sua máscara.
 * É o que permite ao hero subir palavra por palavra de baixo do
 * recorte — o [data-word] é o alvo que buildHeroIntro anima.
 *
 * O espaço entre as palavras é um espaço de verdade, no texto, e não
 * uma margem no CSS. Com margem, o conteúdo do <h1> era
 * "Segurançajurídicacomolharhumano." para quem lê o documento em vez
 * de olhar a tela: leitor de tela, buscador, e qualquer um que copie o
 * título. O espaço sai depois de toda palavra, inclusive a última,
 * porque o hero encadeia duas chamadas deste componente e a emenda
 * entre elas precisa separar também.
 */
export default function MaskedWords({ text, className = "" }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className={`mask ${className}`}>
        <span className="mask-i" data-word>
          {word}
        </span>
      </span>{" "}
    </Fragment>
  ));
}
