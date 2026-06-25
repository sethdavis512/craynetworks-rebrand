import { Link } from "react-router";
import { services } from "../data/services";

export function meta() {
  return [
    { title: "Services — Cray Networks" },
    { name: "description", content: "IT and network management, computer repair, hosting, and web work for Central Texas." },
  ];
}

export default function ServicesIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Services</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
        One local shop for the whole stack, from the desk to the data center.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            to={`/services/${s.slug}`}
            className="block rounded-lg border border-border bg-surface-2 p-6 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40"
          >
            <h2 className="font-sans text-lg font-semibold text-ink">{s.name}</h2>
            <p className="mt-2 leading-relaxed text-muted">{s.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
