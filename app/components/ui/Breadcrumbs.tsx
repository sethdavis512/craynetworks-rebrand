import { Fragment } from "react";
import { cn } from "../../lib/cn";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("font-sans text-sm", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={c.label}>
              <li>
                {c.href && !last ? (
                  <a href={c.href} className="transition-colors hover:text-ink">
                    {c.label}
                  </a>
                ) : (
                  <span className={last ? "text-ink" : undefined} aria-current={last ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
              </li>
              {!last ? (
                <li aria-hidden="true" className="text-border">
                  /
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
