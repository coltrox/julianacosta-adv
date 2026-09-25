import { useEffect, useRef } from "react";
import { createCursorFollower } from "../../motion/index.js";

/** Anel + ponto que substituem o ponteiro do sistema no desktop. */
export default function Cursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(
    () => createCursorFollower(ringRef.current, dotRef.current),
    []
  );

  return (
    <>
      <span className="cursor-ring" ref={ringRef} aria-hidden="true" />
      <span className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
