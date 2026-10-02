import { scrollToHash } from "../../motion/index.js";

/**
 * Link de âncora que passa pelo scroll suave em vez do salto nativo.
 * Para qualquer href que não comece com "#", é um <a> comum.
 *
 * `onNavigate` existe para o menu do celular se fechar ao navegar.
 */
export default function AnchorLink({ href, children, onNavigate, ...rest }) {
  const handleClick = (ev) => {
    // Primeiro avisa quem hospeda, depois rola — e nunca o contrário.
    // O menu do celular trava o scroll enquanto está aberto, e o Lenis
    // ignora scrollTo enquanto está parado: na ordem inversa o painel
    // fechava e a página não saía do lugar.
    onNavigate?.();

    if (href?.startsWith("#")) {
      ev.preventDefault();
      scrollToHash(href);
      // replaceState em vez de push: o botão voltar continua saindo do site
      // em vez de percorrer as seções uma por uma.
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
