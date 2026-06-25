import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useReducedMotion } from "../../lib/useReducedMotion";

/** A number that rolls to its new value when it changes. Reduced motion snaps instantly. */
export function AnimatedNumber({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => `${prefix}${Math.round(v).toLocaleString()}`);

  useEffect(() => {
    const controls = animate(mv, value, { duration: reduced ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [value, reduced, mv]);

  return <motion.span>{text}</motion.span>;
}
