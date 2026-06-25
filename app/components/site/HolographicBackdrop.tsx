import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * Fixed iridescent gradient field behind 2056 content. Each blob's hue rides the morphing
 * `--iris` custom property (so it recolors with the global animation) and drifts with scroll.
 * Client-only, pointer-events none, static under reduced motion.
 */
export function HolographicBackdrop() {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-32%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [0, 38]);

  if (!mounted) return null;

  const blob = "absolute rounded-full blur-[80px] mix-blend-screen";
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className={`${blob} left-[-10%] top-[-12%] size-[55vmax]`}
        style={{
          y: reduced ? 0 : y1,
          background: "radial-gradient(circle, oklch(0.78 0.16 calc(250 + var(--iris)) / 0.5), transparent 60%)",
        }}
      />
      <motion.div
        className={`${blob} right-[-15%] top-[18%] size-[50vmax]`}
        style={{
          y: reduced ? 0 : y2,
          rotate: reduced ? 0 : rot,
          background: "radial-gradient(circle, oklch(0.74 0.17 calc(330 + var(--iris)) / 0.45), transparent 60%)",
        }}
      />
      <motion.div
        className={`${blob} bottom-[-16%] left-[24%] size-[46vmax]`}
        style={{
          y: reduced ? 0 : y1,
          background: "radial-gradient(circle, oklch(0.8 0.15 calc(200 + var(--iris)) / 0.4), transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}
