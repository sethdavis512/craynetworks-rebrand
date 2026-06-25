import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { Tooltip } from "../ui/Tooltip";
import { Logo } from "./Logo";

type Pin = { x: number; y: number; n: string; why: string };

// x/y are percentages within the square mark box, matching the SVG's 0..32 viewBox coords.
const pins: Pin[] = [
  {
    x: 62.5,
    y: 25,
    n: "1",
    why: "Only the top node carries the brand primary, one bright connection. It is the same color as 'networks' in the wordmark, so the mark and the word share a single accent.",
  },
  {
    x: 21.9,
    y: 50,
    n: "2",
    why: "The C is never drawn as a letter. It is the shortest path between five nodes, so the brand reads as a network, not a monogram.",
  },
  {
    x: 34.4,
    y: 71.9,
    n: "3",
    why: "Each node stands for something Cray keeps online: a site, a server, a workstation. The mark is literally the work.",
  },
];

/**
 * Interactive anatomy of the logo: hover to zoom toward the cursor, numbered points explain
 * why each piece exists, and the same token-driven mark is shown on light, dark, and at favicon
 * scale. Zoom is suppressed under reduced motion; the points and tooltips always work.
 */
export function LogoShowcase() {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [zoom, setZoom] = useState(false);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const stage = stageRef.current;
    const inner = innerRef.current;
    if (!stage || !inner) return;
    const r = stage.getBoundingClientRect();
    inner.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  };

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_minmax(0,18rem)] sm:items-center">
      <div
        ref={stageRef}
        onPointerMove={onMove}
        onPointerEnter={() => !reduced && setZoom(true)}
        onPointerLeave={() => setZoom(false)}
        className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface-2"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div
          ref={innerRef}
          className="absolute inset-0 transition-transform duration-300 ease-out"
          style={{ transform: zoom ? "scale(1.8)" : "scale(1)" }}
        >
          <div className="absolute left-1/2 top-1/2 aspect-square w-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg viewBox="0 0 32 32" className="size-full text-ink" fill="none" aria-hidden="true">
              <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
                <path d="M20 8 L11 9 L7 16 L11 23 L20 24" fill="none" />
              </g>
              <circle cx="11" cy="9" r="2.1" fill="currentColor" />
              <circle cx="7" cy="16" r="2.1" fill="currentColor" />
              <circle cx="11" cy="23" r="2.1" fill="currentColor" />
              <circle cx="20" cy="24" r="2.1" fill="currentColor" />
              <circle cx="20" cy="8" r="2.6" className="fill-primary" />
            </svg>
            {pins.map((p) => (
              <div key={p.n} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                <Tooltip content={<span className="block max-w-[15rem] leading-snug">{p.why}</span>}>
                  <button
                    type="button"
                    aria-label={`Why, point ${p.n}`}
                    className="grid size-5 place-items-center rounded-full border border-primary/50 bg-surface text-[10px] font-semibold text-primary-strong shadow-sm transition-colors hover:bg-primary hover:text-on-primary"
                  >
                    {p.n}
                  </button>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
        {!reduced ? (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-border bg-surface/80 px-2 py-0.5 font-sans text-[11px] text-muted backdrop-blur-sm">
            Hover to zoom
          </span>
        ) : null}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-center rounded-lg border border-border bg-surface px-4 py-5">
          <Logo />
        </div>
        <div className="flex items-center justify-center rounded-lg border border-border bg-navy px-4 py-5">
          <Logo className="text-on-navy" />
        </div>
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface-2 px-4 py-4">
          <Logo showWordmark={false} />
          <span className="font-sans text-xs text-muted">one set of tokens, down to a 16px favicon</span>
        </div>
      </div>
    </div>
  );
}
