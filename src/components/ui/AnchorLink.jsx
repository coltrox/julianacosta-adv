import { scrollToHash } from "../../motion/index.js";

/**
 * Link de âncora que passa pelo scroll suave em vez do salto nativo.
 * Para qualquer href que não comece com "#", é um <a> comum.
 *
 * `onNavigate` existe para o menu do celular se fechar ao navegar.
 */
export default function AnchorLink({ href, children, onNavigate, ...rest }) {
  const handleClick = (ev) => {
    if (href?.startsWith("#")) {
      ev.preventDefault();
      scrollToHash(href);
      // replaceState em vez de push: o botão voltar continua saindo do site
      // em vez de percorrer as seções uma por uma.
      window.history.replaceState(null, "", href);
    }
    onNavigate?.();
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
