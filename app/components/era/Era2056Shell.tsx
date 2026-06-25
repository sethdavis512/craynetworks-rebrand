import { useEffect, useState } from "react";

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/**
 * The persistent future-OS chrome: a top system bar (live clock pinned to 2056), corner HUD
 * brackets, and faint scanlines. Fixed overlays, pointer-events none, present on every route
 * while era is 2056 so the whole site reads as one operating system.
 */
export function Era2056Shell() {
  const now = useClock();
  const time = now ? now.toLocaleTimeString("en-US", { hour12: false }) : "--:--:--";
  const corner = "pointer-events-none fixed z-40 size-5 border-primary/60";

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex h-9 items-center justify-between border-b border-border bg-surface/70 px-4 font-mono text-[11px] uppercase tracking-wider text-muted backdrop-blur-md">
        <span className="font-semibold text-primary-strong">CRAY//OS v20.56</span>
        <span className="hidden sm:inline">Leander.TX &middot; Central Texas Grid &middot; ONLINE</span>
        <span className="tabular-nums text-ink">
          {time} &middot; <span className="text-primary-strong">2056</span>
        </span>
      </div>

      <span className={`${corner} left-2 top-11 border-l-2 border-t-2`} />
      <span className={`${corner} right-2 top-11 border-r-2 border-t-2`} />
      <span className={`${corner} bottom-2 left-2 border-b-2 border-l-2`} />
      <span className={`${corner} bottom-2 right-2 border-b-2 border-r-2`} />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[35] opacity-40"
        style={{
          background: "repeating-linear-gradient(to bottom, transparent 0 2px, oklch(0.5 0.1 270 / 0.06) 2px 3px)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[34]"
        style={{ boxShadow: "inset 0 0 220px 50px oklch(0.28 0.1 272 / 0.25)" }}
      />
    </>
  );
}
