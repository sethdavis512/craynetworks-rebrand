import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>#*=";

/**
 * Renders text that "decodes" from scrambled glyphs into the final string once on mount. SSR-safe
 * (the real text is the initial render, so it is correct with JS off) and static under reduced motion.
 */
export function DecodeText({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    if (reduced || started.current) return;
    started.current = true;
    const total = 16;
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const revealed = Math.floor((frame / total) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) =>
            i < revealed || ch === " " ? ch : GLYPHS[Math.floor((i + frame) * 7) % GLYPHS.length],
          )
          .join(""),
      );
      if (frame >= total) {
        setDisplay(text);
        clearInterval(id);
      }
    }, 45);
    return () => clearInterval(id);
  }, [text, reduced]);

  return <span className={className}>{display}</span>;
}
