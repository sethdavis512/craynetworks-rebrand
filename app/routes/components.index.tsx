import { Link } from "react-router";
import { components } from "../components/gallery/registry";
import { docs } from "../components/gallery/docs";

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
        A dogfooded Base UI and Tailwind library. Every cell is the real, live component reading the
        same OKLCH tokens, so the whole set re-themes at once. Select a name to see usage, variants,
        and its API.
      </p>

      <div className="mt-8 overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 xl:grid-cols-3">
          {components.map((c) => (
            <div key={c.slug} className="flex min-h-56 flex-col bg-surface p-6">
              <Link
                to={`/components/${c.slug}`}
                className="font-sans text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {c.name}
              </Link>
              <div className="flex flex-1 flex-wrap items-center justify-center gap-3 pt-6">
                {docs[c.slug]?.sections[0]?.preview}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
