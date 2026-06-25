import { Link } from "react-router";
import type { Route } from "./+types/services.detail";
import { getService, SERVICE_AREA } from "../data/services";
import { ContactForm } from "../components/site/ContactForm";

export function loader({ params }: Route.LoaderArgs) {
  const service = getService(params.slug);
  if (!service) throw new Response("Not Found", { status: 404 });
  return { service };
}

export function meta({ loaderData }: Route.MetaArgs) {
  const name = loaderData?.service.name ?? "Service";
  return [{ title: `${name} — Cray Networks` }];
}

export default function ServiceDetail({ loaderData }: Route.ComponentProps) {
  const { service } = loaderData;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link to="/services" className="font-sans text-sm text-muted transition-colors hover:text-ink">
        &larr; All services
      </Link>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{service.name}</h1>
      <p className="mt-3 max-w-[68ch] text-lg leading-relaxed text-muted">{service.tagline}</p>

      <div className="mt-8 space-y-4">
        {service.paragraphs.map((p, i) => (
          <p key={i} className="max-w-[68ch] leading-relaxed text-ink">
            {p}
          </p>
        ))}
      </div>

      <p className="mt-8 max-w-[68ch] text-sm leading-relaxed text-muted">{SERVICE_AREA}</p>

      <section id="contact" className="mt-12 scroll-mt-20 rounded-xl border border-border bg-surface-2 p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Place a service call</h2>
        <p className="mt-2 max-w-xl leading-relaxed text-muted">
          Tell us what is going on and we will follow up with a plan. Most quotes go out the same day.
        </p>
        <div className="mt-6 max-w-xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
