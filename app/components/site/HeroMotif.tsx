import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "../../lib/useReducedMotion";

const nodes = [
  { cx: 40, cy: 30, r: 3, cls: "", delay: 0 },
  { cx: 120, cy: 60, r: 3.5, cls: "", delay: 0.8 },
  { cx: 90, cy: 130, r: 3, cls: "", delay: 1.6 },
  { cx: 190, cy: 150, r: 3, cls: "", delay: 0.4 },
  { cx: 60, cy: 180, r: 3, cls: "", delay: 2.2 },
  { cx: 210, cy: 40, r: 4, cls: "fill-amber", delay: 1.2 },
  { cx: 170, cy: 110, r: 3.5, cls: "fill-sky", delay: 2 },
  { cx: 120, cy: 60, r: 2.4, cls: "fill-primary", delay: 0 },
];

/**
 * The hero's network constellation, alive: nodes drift and edges pulse (CSS, disabled under
 * reduced motion), the whole field leans toward the cursor (pointer parallax), and it draws in
 * once on load. Purely decorative (aria-hidden); recolors via tokens so it tracks the theme.
 */
export function HeroMotif() {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 50, damping: 18 });
  const sy = useSpring(y, { stiffness: 50, damping: 18 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth - 0.5) * 20);
      y.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 240 200"
      className="pointer-events-none absolute right-[-2.5rem] top-[-10%] hidden h-[120%] text-on-navy/25 lg:block"
      fill="none"
      style={reduced ? undefined : { x: sx, y: sy }}
      initial={reduced ? undefined : { opacity: 0, scale: 1.05 }}
      animate={reduced ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <g stroke="currentColor" strokeWidth="1.25" className="cn-edge">
        <path d="M40 30 L120 60 L90 130 L170 110 L210 40 M120 60 L190 150 M90 130 L60 180 M170 110 L210 40" />
      </g>
      <g fill="currentColor">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.cx} cy={n.cy} r={n.r} className={`cn-node ${n.cls}`} style={{ animationDelay: `${n.delay}s` }} />
        ))}
      </g>
    </motion.svg>
  );
}
