import { useState, type ReactNode } from "react";

type BeforeAfterProps = {
  before: ReactNode;
  after: ReactNode;
};

/**
 * Reveal-slider comparison. Before sits on the left, after on the right: the "before" is on top,
 * clipped from the right by an accessible range input, so the handle wipes between the two.
 * Keyboard-operable by default.
 */
export function BeforeAfter({ before, after }: BeforeAfterProps) {
  const [pct, setPct] = useState(50);

  return (
    <div>
      <div className="relative h-[26rem] w-full select-none overflow-hidden rounded-xl border border-border sm:h-[34rem]">
        <div className="absolute inset-0">{after}</div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
          {before}
        </div>

        <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-on-navy/70" style={{ left: `${pct}%` }} />
        <span className="absolute left-3 top-3 z-10 rounded-full bg-scrim px-2 py-0.5 font-sans text-xs text-on-navy">
          2003 site
        </span>
        <span className="absolute right-3 top-3 z-10 rounded-full bg-scrim px-2 py-0.5 font-sans text-xs text-on-navy">
          Rebrand
        </span>
      </div>

      <label className="mt-4 block">
        <span className="font-sans text-xs text-muted">Drag to compare the 2003 site and the rebrand</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          aria-label="Compare the 2003 site and the rebrand"
          className="mt-2 w-full accent-primary"
        />
      </label>
    </div>
  );
}
