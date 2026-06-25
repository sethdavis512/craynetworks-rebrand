import { type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { buttonVariants } from "../ui/Button";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { ContactForm } from "./ContactForm";
import { OrbitalCore } from "./OrbitalCore";
import { DecodeText } from "../era/DecodeText";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { SERVICES, VALUES, AREAS } from "../../data/marketing";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Iridescent glow that rides the morphing --iris hue. */
const glow: CSSProperties = { boxShadow: "0 0 50px -16px oklch(0.7 0.16 calc(258 + var(--iris, 0deg)) / 0.5)" };

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The marketing home, reimagined for 2056: same content, a restructured holographic layout with
 * a scroll-reactive backdrop, parallax hero, floating glass panels, and oversized display type.
 */
export function Home2056() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "28%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  return (
    <div className="relative flex min-h-dvh flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
            <OrbitalCore />
          </div>
          <motion.div
            className="mx-auto max-w-5xl px-6 py-28 sm:py-36"
            style={reduced ? undefined : { y: heroY, opacity: heroFade }}
          >
            <p className="font-sans text-sm font-medium uppercase tracking-[0.3em] text-primary-strong">
              Cray // Networks &middot; 2003 &rarr; 2056
            </p>
            <h1 className="mt-5 max-w-4xl text-balance font-sans font-semibold leading-[1.02] tracking-tight text-ink text-[clamp(2.75rem,7vw,5.5rem)]">
              <DecodeText text="Reliable IT, handled " />
              <span className="text-primary">like a neighbor</span> would.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Cray Networks keeps small and mid-sized businesses across the Hill Country running, from the
              machine that will not boot to the network you never have to think about.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#contact" className={buttonVariants({ size: "lg" })} style={glow}>
                Request a quote
              </a>
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center rounded-[var(--radius-base)] border border-border px-6 font-sans text-base font-medium text-ink backdrop-blur-md transition-colors hover:bg-surface-2"
              >
                See what we do
              </a>
            </div>
          </motion.div>
        </section>

        <div className="mx-auto w-full max-w-5xl px-6">
          {/* Services: asymmetric floating glass panels */}
          <section id="services" className="scroll-mt-20 py-20">
            <Reveal>
              <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">What we do</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                One local shop for the whole stack, from the desk to the data center.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {SERVICES.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.08} className={i % 2 === 1 ? "sm:mt-10" : undefined}>
                  <Link
                    to={`/services/${s.slug}`}
                    style={glow}
                    className="group block h-full rounded-[1.5rem] border border-border bg-surface-2 p-7 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="inline-block size-2.5 rounded-full bg-primary" style={glow} />
                    <h3 className="mt-4 font-sans text-xl font-semibold text-ink">{s.name}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Why Cray */}
          <section className="py-20">
            <Reveal>
              <h2 className="font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Why Cray</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {VALUES.map((v, i) => (
                <Reveal key={v.name} delay={i * 0.08}>
                  <div className="h-full rounded-[1.5rem] border border-border bg-surface-2 p-6 backdrop-blur-xl" style={glow}>
                    <h3 className="font-sans text-lg font-semibold text-ink">{v.name}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{v.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Service area */}
          <section className="py-20">
            <Reveal>
              <h2 className="font-sans text-2xl font-semibold tracking-tight text-ink">Where we work</h2>
              <p className="mt-2 leading-relaxed text-muted">On-site across Central Texas and the Hill Country.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {AREAS.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1 font-mono text-sm text-ink backdrop-blur-md"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </Reveal>
          </section>

          {/* Contact */}
          <section id="contact" className="scroll-mt-20 py-20">
            <Reveal>
              <div className="rounded-[1.75rem] border border-border bg-surface-2 p-8 backdrop-blur-xl sm:p-10" style={glow}>
                <h2 className="max-w-xl text-balance font-sans text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Let us get your tech handled.
                </h2>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">
                  Tell us what is going on and we will follow up with a plan. Most quotes go out the same day.
                </p>
                <div className="mt-6 max-w-xl">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
