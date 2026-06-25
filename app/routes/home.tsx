import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { Logo } from "../components/brand/Logo";
import { Button, buttonVariants } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Banner } from "../components/ui/Banner";
import { Input } from "../components/ui/Input";
import { Reveal } from "../components/site/Reveal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Cray Networks — Reliable IT for Central Texas" },
    {
      name: "description",
      content:
        "Computer repair, network management, hosting, and web work for Central Texas businesses. Handled like a neighbor would.",
    },
  ];
}

const services = [
  {
    name: "Computer repair",
    body: "Drop-off or on-site fixes for the desktop, laptop, or server that simply will not cooperate.",
  },
  {
    name: "IT & network management",
    body: "Proactive monitoring and maintenance, so problems get fixed before you ever notice them.",
    featured: true,
  },
  {
    name: "Web hosting",
    body: "Fast, dependable hosting for your site and email, kept patched, monitored, and backed up.",
  },
  {
    name: "Web design & development",
    body: "Sites that look right and work right, designed and maintained by people down the road.",
  },
];

const values = [
  { name: "Warm", body: "We talk like neighbors, not a ticket queue. You get a person who remembers your setup." },
  { name: "Clear", body: "Plain answers and honest timelines. No jargon deployed to sound smart." },
  { name: "Trusted", body: "Two decades keeping Central Texas businesses online, one handshake at a time." },
];

const areas = ["Leander", "Cedar Park", "Austin", "Round Rock", "Pflugerville", "Georgetown", "Hill Country"];

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return <Banner tone="success">Thanks. We will be in touch within one business day.</Banner>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <Input name="name" aria-label="Your name" placeholder="Your name" required className="sm:flex-1" />
      <Input
        type="email"
        name="email"
        aria-label="Email"
        placeholder="you@business.com"
        required
        className="sm:flex-1"
      />
      <Button type="submit">Request a quote</Button>
    </form>
  );
}

export default function Home() {
  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" aria-label="Cray Networks home">
            <Logo />
          </Link>
          <nav className="flex items-center gap-1 sm:gap-3">
            <a href="#services" className="hidden rounded-md px-3 py-1.5 font-sans text-sm text-muted transition-colors hover:text-ink sm:inline-block">
              Services
            </a>
            <Link to="/components" className="hidden rounded-md px-3 py-1.5 font-sans text-sm text-muted transition-colors hover:text-ink sm:inline-block">
              Components
            </Link>
            <a href="#contact" className={buttonVariants({ size: "sm" })}>
              Request a quote
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero (always visible) */}
        <section className="py-20 sm:py-28">
          <Badge tone="primary">Serving Central Texas since 2003</Badge>
          <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
            Reliable IT, handled like a neighbor would.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Cray Networks keeps small and mid-sized businesses across the Hill Country running, from
            the machine that will not boot to the network you never have to think about.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#contact" className={buttonVariants({ size: "lg" })}>
              Request a quote
            </a>
            <a href="#services" className={buttonVariants({ variant: "outline", size: "lg" })}>
              See what we do
            </a>
          </div>
        </section>

        {/* Services */}
        <Reveal>
          <section id="services" className="scroll-mt-20 border-t border-border py-16">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">What we do</h2>
            <p className="mt-2 max-w-2xl leading-relaxed text-muted">
              One local shop for the whole stack, from the desk to the data center.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <Card key={s.name} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-sans text-lg font-semibold text-ink">{s.name}</h3>
                    {s.featured ? <Badge tone="primary">Most popular</Badge> : null}
                  </div>
                  <p className="leading-relaxed text-muted">{s.body}</p>
                </Card>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Why Cray */}
        <Reveal>
          <section className="border-t border-border py-16">
            <h2 className="text-3xl font-semibold tracking-tight text-ink">Why Cray</h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {values.map((v) => (
                <div key={v.name}>
                  <h3 className="font-sans text-lg font-semibold text-ink">{v.name}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{v.body}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Service area */}
        <Reveal>
          <section className="border-t border-border py-16">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Where we work</h2>
            <p className="mt-2 leading-relaxed text-muted">On-site across Central Texas and the Hill Country.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {areas.map((a) => (
                <Badge key={a}>{a}</Badge>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Contact CTA */}
        <Reveal>
          <section id="contact" className="scroll-mt-20 border-t border-border py-16">
            <div className="rounded-xl border border-border bg-surface-2 p-8 sm:p-10">
              <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-ink">
                Let us get your tech handled.
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">
                Tell us what is going on and we will follow up with a plan. Most quotes go out the
                same day.
              </p>
              <div className="mt-6 max-w-xl">
                <ContactForm />
              </div>
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
          <Logo />
          <nav className="flex gap-4 font-sans text-sm text-muted">
            <a href="#services" className="hover:text-ink">Services</a>
            <Link to="/components" className="hover:text-ink">Components</Link>
            <a href="#contact" className="hover:text-ink">Contact</a>
          </nav>
          <p className="font-sans text-sm text-muted">Central Texas IT, since 2003.</p>
        </div>
      </footer>
    </div>
  );
}
