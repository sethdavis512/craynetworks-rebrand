import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import type { Route } from "./+types/home";
import { Logo } from "../components/brand/Logo";
import { Button, buttonVariants } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Banner } from "../components/ui/Banner";
import { Input } from "../components/ui/Input";
import { useReducedMotion } from "../lib/useReducedMotion";

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

type Service = { name: string; body: string; featured?: boolean };

const services: Service[] = [
  { name: "IT & network management", body: "Proactive monitoring and maintenance, so problems get fixed before you ever notice them.", featured: true },
  { name: "Computer repair", body: "Drop-off or on-site fixes for the desktop, laptop, or server that simply will not cooperate." },
  { name: "Web hosting", body: "Fast, dependable hosting for your site and email, kept patched and backed up." },
  { name: "Web design & development", body: "Sites that look right and work right, built by people down the road." },
];

const values = [
  { name: "Warm", body: "We talk like neighbors, not a ticket queue. You get a person who remembers your setup." },
  { name: "Clear", body: "Plain answers and honest timelines. No jargon deployed to sound smart." },
  { name: "Trusted", body: "Two decades keeping Central Texas businesses online, one handshake at a time." },
];

const areas = ["Leander", "Cedar Park", "Austin", "Round Rock", "Pflugerville", "Georgetown", "Hill Country"];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const group = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/** Decorative network-node constellation. Purely ornamental; recolors via currentColor. */
function NetworkMotif() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 200"
      className="pointer-events-none absolute -right-10 top-1/2 hidden h-[120%] -translate-y-1/2 text-on-navy/25 lg:block"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.25" opacity="0.6">
        <path d="M40 30 L120 60 L90 130 L170 110 L210 40 M120 60 L190 150 M90 130 L60 180 M170 110 L210 40" />
      </g>
      <g fill="currentColor">
        <circle cx="40" cy="30" r="3" />
        <circle cx="120" cy="60" r="3.5" />
        <circle cx="90" cy="130" r="3" />
        <circle cx="190" cy="150" r="3" />
        <circle cx="60" cy="180" r="3" />
        <circle cx="210" cy="40" r="4" className="fill-amber" />
        <circle cx="170" cy="110" r="3.5" className="fill-sky" />
      </g>
    </svg>
  );
}

function ServiceCard({ s }: { s: Service }) {
  return (
    <Card className="h-full transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/40">
      <h3 className="font-sans text-lg font-semibold text-ink">{s.name}</h3>
      <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
    </Card>
  );
}

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
      <Input type="email" name="email" aria-label="Email" placeholder="you@business.com" required className="sm:flex-1" />
      <Button type="submit">Request a quote</Button>
    </form>
  );
}

export default function Home() {
  const reduced = useReducedMotion();
  const trio = services.filter((s) => !s.featured);
  const featured = services.find((s) => s.featured);

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

      {/* Drenched navy hero (owns the brand color in both themes). Always visible: no entrance gating. */}
      <section className="relative isolate overflow-hidden bg-navy text-on-navy">
        <NetworkMotif />
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32">
          <span className="inline-flex items-center gap-2 rounded-full border border-on-navy/25 px-3 py-1 font-sans text-sm text-on-navy/80">
            <span className="size-1.5 rounded-full bg-amber" />
            Serving Central Texas since 2003
          </span>
          <h1 className="mt-6 max-w-3xl text-balance font-semibold leading-[1.04] tracking-[-0.03em] text-[clamp(2.75rem,6vw,5rem)]">
            Reliable IT, handled{" "}
            <span className="font-serif font-normal italic text-amber">like a neighbor</span> would.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-navy/75 sm:text-xl">
            Cray Networks keeps small and mid-sized businesses across the Hill Country running, from
            the machine that will not boot to the network you never have to think about.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className={buttonVariants({ size: "lg" })}>
              Request a quote
            </a>
            <a
              href="#services"
              className="inline-flex h-12 items-center justify-center rounded-md border border-on-navy/30 px-6 font-sans text-base font-medium text-on-navy transition-colors hover:bg-on-navy/10"
            >
              See what we do
            </a>
          </div>
          <p className="mt-8 font-sans text-sm text-on-navy/55">
            On-site in Leander, Cedar Park, Austin, Round Rock, and the Hill Country.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6">
        {/* Services: featured card breaks the grid, then a trio with hover lift + stagger */}
        <section id="services" className="scroll-mt-20 py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-ink">What we do</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">
            One local shop for the whole stack, from the desk to the data center.
          </p>

          {featured ? (
            <Card className="mt-8 border-primary/40">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-sans text-xl font-semibold text-ink">{featured.name}</h3>
                    <Badge tone="primary">Most popular</Badge>
                  </div>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted">{featured.body}</p>
                </div>
                <a href="#contact" className={buttonVariants({ size: "sm" })}>
                  Get started
                </a>
              </div>
            </Card>
          ) : null}

          {reduced ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {trio.map((s) => (
                <ServiceCard key={s.name} s={s} />
              ))}
            </div>
          ) : (
            <motion.div
              className="mt-4 grid gap-4 sm:grid-cols-3"
              variants={group}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-12% 0px" }}
            >
              {trio.map((s) => (
                <motion.div key={s.name} variants={item}>
                  <ServiceCard s={s} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* Why Cray (static; type + rhythm carry it) */}
        <section className="border-t border-border py-20">
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

        {/* Service area */}
        <section className="border-t border-border py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-ink">Where we work</h2>
          <p className="mt-2 leading-relaxed text-muted">On-site across Central Texas and the Hill Country.</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {areas.map((a) => (
              <Badge key={a}>{a}</Badge>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="scroll-mt-20 py-20">
          <div className="rounded-xl border border-border bg-surface-2 p-8 sm:p-10">
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-ink">
              Let us get your tech handled.
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-muted">
              Tell us what is going on and we will follow up with a plan. Most quotes go out the same day.
            </p>
            <div className="mt-6 max-w-xl">
              <ContactForm />
            </div>
          </div>
        </section>
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
