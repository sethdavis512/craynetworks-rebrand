import { cn } from "../../lib/cn";

/**
 * Hand-coded SVG mark: a "C" built from network nodes and edges (ties to the /explore canvas
 * motif). Recolors entirely via tokens (currentColor + --color-primary), so it adapts to
 * light/dark and live Drawer changes with no separate assets.
 */
export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-ink", className)}>
      <svg viewBox="0 0 32 32" className="logo-mark size-7 shrink-0" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
          <path d="M20 8 L11 9 L7 16 L11 23 L20 24" fill="none" />
        </g>
        <g>
          <circle cx="11" cy="9" r="2.1" fill="currentColor" />
          <circle cx="7" cy="16" r="2.1" fill="currentColor" />
          <circle cx="11" cy="23" r="2.1" fill="currentColor" />
          <circle cx="20" cy="24" r="2.1" fill="currentColor" />
          <circle cx="20" cy="8" r="2.6" className="fill-primary" />
        </g>
      </svg>
      {showWordmark ? (
        <span className="font-sans text-base font-semibold tracking-tight">
          cray <span className="text-primary">networks</span>
        </span>
      ) : null}
    </span>
  );
}
