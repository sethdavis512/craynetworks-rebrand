import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useTheme } from "../../theme/ThemeProvider";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Lazy-load the 2056 display font: the dynamic import is a separate chunk so standard-mode
// visitors never download it.
let fontPromise: Promise<unknown> | null = null;
function ensureFontLoaded() {
  if (!fontPromise) fontPromise = import("@fontsource-variable/space-grotesk");
  return fontPromise;
}

const BOOT_2056 = [
  "CRAY//OS bootloader v20.56",
  "mounting reality matrix .......... OK",
  "calibrating holographic field .... OK",
  "syncing Central Texas grid ....... OK",
  "decrypting brand identity ........ OK",
  "WELCOME TO 2056",
];
const BOOT_2026 = [
  "saving session state ............. OK",
  "collapsing holographic field ..... OK",
  "returning to the present",
];

export function EraToggle() {
  const { state, update } = useTheme();
  const reduced = useReducedMotion();
  const is2056 = state.era === "2056";

  const [mounted, setMounted] = useState(false);
  const [target, setTarget] = useState<"2056" | "2026" | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (is2056) ensureFontLoaded(); // arrived in 2056 from the cookie
  }, [is2056]);
  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  const flip = () => {
    if (target) return;
    const goingTo = is2056 ? "standard" : "2056";
    if (goingTo === "2056") ensureFontLoaded();
    setTarget(is2056 ? "2026" : "2056");
    const total = reduced ? 1200 : goingTo === "2056" ? 2700 : 1700;
    // Flip the world under the boot overlay (no flash), then lift it.
    timers.current.push(window.setTimeout(() => update({ era: goingTo }), Math.round(total * 0.5)));
    timers.current.push(window.setTimeout(() => setTarget(null), total));
  };

  return (
    <>
      <button
        type="button"
        onClick={flip}
        aria-label={is2056 ? "Return to the present" : "Jump to 2056"}
        className="rounded-full border border-primary/40 bg-surface px-4 py-2 font-sans text-sm font-semibold text-primary-strong shadow-lg transition-colors hover:bg-surface-2"
      >
        {is2056 ? "2026" : "2056"}
      </button>

      {mounted
        ? createPortal(
            <AnimatePresence>{target ? <BootOverlay target={target} reduced={reduced} /> : null}</AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}

function BootOverlay({ target, reduced }: { target: "2056" | "2026"; reduced: boolean }) {
  const lines = target === "2056" ? BOOT_2056 : BOOT_2026;
  const [shown, setShown] = useState(reduced ? lines.length : 0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setShown((s) => Math.min(s + 1, lines.length)), target === "2056" ? 330 : 300);
    return () => clearInterval(id);
  }, [lines.length, reduced, target]);

  const sweep = (target === "2056" ? 2.7 : 1.7) * 0.85;
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[70] grid place-items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.2 : 0.4, ease: EASE }}
      style={{ background: "radial-gradient(130% 130% at 50% 0%, oklch(0.16 0.06 275 / 0.97), oklch(0.1 0.05 265 / 0.99))" }}
    >
      {!reduced ? (
        <motion.div
          className="absolute inset-x-0 top-0 h-0.5 origin-left"
          style={{ background: "oklch(0.85 0.16 250)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: sweep, ease: "linear" }}
        />
      ) : null}
      <div className="w-[min(34rem,calc(100vw-2.5rem))] px-2 font-mono text-sm">
        {lines.slice(0, shown).map((l, i) => {
          const last = i === lines.length - 1;
          return (
            <p
              key={l}
              className={last ? "mt-3 text-lg font-semibold sm:text-xl" : "leading-relaxed"}
              style={{ color: last ? "oklch(0.98 0.02 250)" : "oklch(0.82 0.12 205)" }}
            >
              {last ? "" : "> "}
              {l}
            </p>
          );
        })}
        {!reduced && shown < lines.length ? (
          <span className="inline-block animate-pulse" style={{ color: "oklch(0.98 0.02 250)" }}>
            _
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}
