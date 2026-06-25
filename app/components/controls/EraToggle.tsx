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

export function EraToggle() {
  const { state, update } = useTheme();
  const reduced = useReducedMotion();
  const is2056 = state.era === "2056";

  const [mounted, setMounted] = useState(false);
  const [shiftLabel, setShiftLabel] = useState<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (is2056) ensureFontLoaded(); // arrived in 2056 from the cookie
  }, [is2056]);
  useEffect(() => () => timers.current.forEach((t) => clearTimeout(t)), []);

  const flip = () => {
    if (shiftLabel) return;
    const goingTo = is2056 ? "standard" : "2056";
    if (goingTo === "2056") ensureFontLoaded();
    setShiftLabel(is2056 ? "2026" : "2056");
    const total = reduced ? 1100 : 2000;
    // Flip the world under the overlay (no flash), then lift the overlay.
    timers.current.push(window.setTimeout(() => update({ era: goingTo }), Math.round(total * 0.55)));
    timers.current.push(window.setTimeout(() => setShiftLabel(null), total));
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
            <AnimatePresence>
              {shiftLabel ? <EraOverlay target={shiftLabel} reduced={reduced} /> : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}

function EraOverlay({ target, reduced }: { target: string; reduced: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[60] grid place-items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.2 : 0.45, ease: EASE }}
      style={{
        background: "radial-gradient(120% 120% at 50% 0%, oklch(0.7 0.18 285 / 0.92), oklch(0.5 0.2 250 / 0.97))",
      }}
    >
      {!reduced ? (
        <motion.div
          className="absolute inset-x-0 top-0 h-1 origin-left"
          style={{ background: "oklch(0.96 0.05 250)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "linear" }}
        />
      ) : null}
      <div className="px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-white/80">Reality shift in progress</p>
        <p className="mt-3 font-sans text-5xl font-semibold tracking-tight text-white sm:text-7xl">
          Recalibrating &rarr; {target}
        </p>
        <p className="mt-4 font-mono text-sm text-white/70">Hold tight. The interface is rewriting itself.</p>
      </div>
    </motion.div>
  );
}
