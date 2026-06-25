import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "../../lib/useReducedMotion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Subtle scroll-triggered reveal. Reduced motion renders a plain, fully-visible element (no
 * animation). Used for below-the-fold sections only; the hero is always visible.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
