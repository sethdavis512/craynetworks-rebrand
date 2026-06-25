import { Link } from "react-router";

export function meta() {
  return [{ title: "Admin — Cray Networks" }];
}

const sections = [
  {
    to: "/admin/components",
    title: "Component gallery",
    body: "The dogfooded Base UI and Tailwind library: live previews, variants, and API docs that re-theme with the Drawer.",
  },
  {
    to: "/admin/studio",
    title: "Studio",
    body: "The live typography lab and the OKLCH token system: the type and color craft, made interactive.",
  },
  {
    to: "/admin/behind-the-rebrand",
    title: "Behind the rebrand",
    body: "The transformation, celebrated: the before/after reveal, the decisions and why, the live system, and how it was built, in one scroll.",
  },
];

export default function AdminIndex() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Admin</h1>
      <p className="mt-2 max-w-2xl leading-relaxed text-muted">
        Internal tools and documentation for the Cray Networks rebrand.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link
            key={s.to}
            to={s.to}
            className="rounded-lg border border-border bg-surface-2 p-6 transition-colors hover:border-primary/40"
          >
            <h2 className="font-sans text-lg font-semibold text-ink">{s.title}</h2>
            <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
