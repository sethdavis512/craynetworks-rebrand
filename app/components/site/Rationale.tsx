import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

/** A short "why we made this decision" note, placed next to the thing it explains. */
export function Rationale({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <aside className={cn("rounded-lg border border-border bg-surface-2 p-4", className)}>
      <h3 className="font-sans text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-[68ch] text-sm leading-relaxed text-muted">{children}</p>
    </aside>
  );
}
