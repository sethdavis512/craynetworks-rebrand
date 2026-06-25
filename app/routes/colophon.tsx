import { useEffect, useRef, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";
import { useReducedMotion } from "../lib/useReducedMotion";
import { BeforeAfter } from "../components/showcase/BeforeAfter";
import { Logo } from "../components/brand/Logo";
import oldCraySrc from "../images/old-cray.png";
import newCraySrc from "../images/new-cray.png";

export function meta() {
  return [
    { title: "Colophon — Cray Networks" },
    { name: "description", content: "How the Cray Networks rebrand was designed and built." },
  ];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Scroll-triggered reveal beat. Reduced motion renders static. */
function Beat({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Counts up to value when scrolled into view. */
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const mv = useMotionValue(reduced ? value : 0);
  const text = useTransform(mv, (v) => `${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: reduced ? 0 : 1.1, ease: EASE });
    return () => controls.stop();
  }, [inView, value, reduced, mv]);

  return <motion.span ref={ref}>{text}</motion.span>;
}

const callouts = [
  { before: "Four feature buttons plus eight nav items competing for attention.", after: "One clear path: Request a quote." },
  { before: "Heavy blue chrome, an ornate background, and a snapshot of the building.", after: "A committed navy band with a typographic hero." },
  { before: "No dark mode; fixed, dated styling.", after: "First-class light and dark, themeable live." },
  { before: "Google+, Facebook, and Yelp badges in the sidebar.", after: "Current, accessible, fast, and token-driven." },
];

const decisions = [
  {
    title: "Typeface",
    body: "Hanken Grotesk for headings, Literata for reading, both variable and self-hosted. A sans display face against a serif text face creates contrast on a real axis, and the serif carries the warm, trustworthy tone the brand is after.",
  },
  {
    title: "Color",
    body: "Cray already owned a cyan-leaning blue, a navy, and white. The rebrand systematizes that identity in OKLCH for perceptually even ramps and a dark mode that stays in lockstep, with one amber accent that was already in their world.",
  },
  {
    title: "Imagery",
    body: "The before is the real 2003-era site, screenshotted, not a flattering reconstruction. The hero is a live network graph instead of stock photography, so the brand metaphor moves.",
  },
];

const stages = [
  { tag: "stage-02", title: "Token contract", note: "Composable OKLCH channels via @theme inline" },
  { tag: "stage-03", title: "Live theming engine", note: "Override layer on the cascade, no re-renders" },
  { tag: "stage-05", title: "Sheet", note: "One accessible primitive, drawer and panels" },
  { tag: "stage-06", title: "Component library", note: "Base UI, dogfooded across every page" },
  { tag: "stage-08", title: "Studio", note: "Live type lab and the OKLCH token system" },
  { tag: "stage-09", title: "Marketing", note: "The rebrand landing with a living hero" },
  { tag: "stage-11", title: "Before & after", note: "The transformation, reconstructed honestly" },
];

const swatches = [
  { name: "primary", cls: "bg-primary" },
  { name: "sky", cls: "bg-sky" },
  { name: "navy", cls: "bg-navy" },
  { name: "amber", cls: "bg-amber" },
  { name: "ink", cls: "bg-ink" },
  { name: "surface-2", cls: "bg-surface-2" },
];

export default function Colophon() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Opening */}
      <section>
        <p className="font-sans text-sm font-medium text-primary-strong">Colophon</p>
        <h1 className="mt-3 max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl">
          Same business. Finally <span className="font-serif font-normal italic text-primary">systematized</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Cray Networks has served Central Texas since 2003. This rebrand keeps the blue, the white,
          and the trust, and gives it a real design system, a live theme, and a dark mode it never
          had. Here is how it came together.
        </p>
      </section>

      {/* The transformation */}
      <section className="mt-24">
        <Beat>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Where we were, where we ended up</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">Drag to move between the 2003 site and the rebrand.</p>
        </Beat>
        <Beat className="mt-8">
          <BeforeAfter
            before={
              <div className="h-full w-full bg-white">
                <img src={oldCraySrc} alt="The Cray Networks website in 2003" className="h-full w-full object-cover object-top" />
              </div>
            }
            after={
              <div className="h-full w-full bg-navy">
                <img src={newCraySrc} alt="The Cray Networks rebrand landing page" className="h-full w-full object-cover object-top" />
              </div>
            }
          />
        </Beat>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {callouts.map((c) => (
            <Beat key={c.before} className="rounded-lg border border-border bg-surface-2 p-5">
              <p className="font-sans text-sm text-muted">
                <span className="font-medium text-ink">Before:</span> {c.before}
              </p>
              <p className="mt-2 font-sans text-sm text-muted">
                <span className="font-medium text-primary-strong">After:</span> {c.after}
              </p>
            </Beat>
          ))}
        </div>
      </section>

      {/* By the numbers */}
      <section className="mt-24">
        <Beat>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div>
              <div className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
                <CountUp value={20} suffix="+" />
              </div>
              <p className="mt-1 font-sans text-sm text-muted">years serving Central Texas</p>
            </div>
            <div>
              <div className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
                <CountUp value={13} />
              </div>
              <p className="mt-1 font-sans text-sm text-muted">components, dogfooded</p>
            </div>
            <div>
              <div className="text-4xl font-semibold tracking-tight text-ink tabular-nums">
                <CountUp value={2} />
              </div>
              <p className="mt-1 font-sans text-sm text-muted">first-class themes</p>
            </div>
            <div>
              <div className="text-4xl font-semibold tracking-tight text-primary-strong">∞</div>
              <p className="mt-1 font-sans text-sm text-muted">palettes, fonts, and layouts, reshaped live</p>
            </div>
          </div>
        </Beat>
      </section>

      {/* The decisions */}
      <section className="mt-24">
        <Beat>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">The decisions, and why</h2>
        </Beat>
        <div className="mt-8 space-y-px overflow-hidden rounded-xl border border-border bg-border">
          {decisions.map((d) => (
            <Beat key={d.title} className="bg-surface p-6 sm:p-8">
              <div className="grid gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
                <h3 className="font-sans text-lg font-semibold text-ink">{d.title}</h3>
                <p className="max-w-[60ch] leading-relaxed text-muted">{d.body}</p>
              </div>
            </Beat>
          ))}
        </div>
      </section>

      {/* The system, live */}
      <section className="mt-24">
        <Beat>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">The system is alive</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">
            This page obeys the same tokens as the rest of the site. Use the Theme control in the
            corner to change the accent, the type, even the hero graph, and watch everything here
            move with it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {swatches.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className={`size-8 rounded-md border border-border ${s.cls}`} />
                <span className="font-mono text-xs text-muted">{s.name}</span>
              </div>
            ))}
          </div>
        </Beat>
      </section>

      {/* How it was built */}
      <section className="mt-24">
        <Beat>
          <h2 className="text-3xl font-semibold tracking-tight text-ink">Built in the open</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">
            Layer by layer, each stage an atomic, tagged commit whose message explains the why. The
            git history is part of the work.
          </p>
        </Beat>
        <ol className="mt-8 space-y-px overflow-hidden rounded-xl border border-border bg-border">
          {stages.map((s) => (
            <Beat key={s.tag} className="flex items-baseline gap-4 bg-surface p-4 sm:p-5">
              <span className="w-20 shrink-0 font-mono text-xs text-primary-strong">{s.tag}</span>
              <span className="font-sans text-sm font-medium text-ink">{s.title}</span>
              <span className="ml-auto hidden text-right text-sm text-muted sm:block">{s.note}</span>
            </Beat>
          ))}
        </ol>
      </section>

      {/* Close + image slot */}
      <section className="mt-24">
        <Beat>
          <figure className="overflow-hidden rounded-xl border border-border bg-surface-2">
            <div className="flex aspect-[16/7] items-center justify-center">
              <Logo className="scale-150 opacity-80" />
            </div>
            <figcaption className="border-t border-border px-5 py-3 font-sans text-sm text-muted">
              Cray Networks, Leander TX. Local since 2003.
            </figcaption>
          </figure>
          <p className="mt-8 max-w-[60ch] leading-relaxed text-muted">
            The build is the argument. Nothing here is claimed that the code does not show. Thanks
            for scrolling.
          </p>
        </Beat>
      </section>
    </div>
  );
}
