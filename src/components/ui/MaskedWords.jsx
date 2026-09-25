/**
 * Quebra um texto em palavras, cada uma dentro da sua máscara.
 * É o que permite ao hero subir palavra por palavra de baixo do
 * recorte — o [data-word] é o alvo que buildHeroIntro anima.
 */
export default function MaskedWords({ text, className = "" }) {
  return text.split(" ").map((word, i) => (
    <span className={`mask ${className}`} key={`${word}-${i}`}>
      <span className="mask-i" data-word>
        {word}
      </span>
    </span>
  ));
}
