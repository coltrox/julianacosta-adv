/** O rótulo miúdo em caixa alta que abre cada seção. */
export default function Kicker({ children, className = "", ...rest }) {
  return (
    <span className={`kicker ${className}`} {...rest}>
      {children}
    </span>
  );
}
