import { Link } from "react-router";
import { componentsByCategory } from "../components/gallery/registry";

export function meta() {
  return [
    { title: "Components — Cray Networks" },
    { name: "description", content: "A dogfooded Base UI + Tailwind component library." },
  ];
}

export default function ComponentsIndex() {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Components</h1>
      <p className="mt-2 max-w-[60ch] text-lg leading-relaxed text-muted">
        A dogfooded Base UI and Tailwind library. Every component reads the same OKLCH tokens, so the
        whole set re-themes at once. Open a component to see usage, variants, and its API.
      </p>

      <div className="mt-10 space-y-10">
        {componentsByCategory().map(({ category, items }) => (
          <section key={category}>
            <h2 className="font-sans text-sm font-semibold text-muted">{category}</h2>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {items.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/components/${c.slug}`}
                    className="-mx-3 flex items-baseline justify-between gap-4 rounded-md px-3 py-3 transition-colors hover:bg-surface-2"
                  >
                    <span className="font-sans font-medium text-ink">{c.name}</span>
                    <span className="text-right text-sm text-muted">{c.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
