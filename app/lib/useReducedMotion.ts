import { useEffect, useState } from "react";

/**
 * The single shared reduced-motion hook (Principle III). SSR-safe: defaults to false on the
 * server and first paint, then syncs to the user's preference after mount. Consumed by every
 * animation system (scroll reveals now; the canvas later).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
