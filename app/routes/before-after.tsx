import { Logo } from "../components/brand/Logo";
import { BeforeAfter } from "../components/showcase/BeforeAfter";

export function meta() {
  return [
    { title: "Before & after — Cray Networks" },
    { name: "description", content: "The Cray Networks site, before and after the rebrand." },
  ];
}

/** Faithful pastiche of the dated 2003-era Cray site. Intentionally NOT the design system. */
function BeforeCray() {
  return (
    <div className="flex h-full flex-col bg-white" style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#333" }}>
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "linear-gradient(#18a7e1, #178fc0)", color: "#fff" }}
      >
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-sm text-sm font-bold" style={{ background: "#fff", color: "#094369" }}>
            CN
          </div>
          <span className="text-lg font-bold">Cray Networks</span>
        </div>
        <div className="hidden gap-3 text-sm sm:flex">
          <span>Home</span>
          <span>About</span>
          <span>Services</span>
          <span>Hosting</span>
          <span>Logins</span>
          <span>Contact</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 text-center">
        <div className="mb-1 h-20 w-full max-w-md rounded-sm" style={{ background: "#cccecf" }} />
        <h2 className="text-2xl font-bold" style={{ color: "#094369" }}>
          Reliable cost effective IT solutions
        </h2>
        <p className="max-w-md text-sm" style={{ color: "#666" }}>
          Simplify your technology needs. Serving Leander, Cedar Park &amp; Austin.
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          {["Service Request", "Pay Now", "Remote Support", "Free Quote"].map((b) => (
            <span key={b} className="rounded px-3 py-1.5 text-xs" style={{ background: "#178fc0", color: "#fff", border: "1px solid #094369" }}>
              {b}
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-3 text-xs underline" style={{ color: "#178fc0" }}>
          <span>Google+</span>
          <span>Facebook</span>
          <span>Yelp</span>
        </div>
      </div>
    </div>
  );
}

/** The rebrand: a condensed version of the live navy hero, fully token-driven. */
function AfterCray() {
  return (
    <div className="flex h-full flex-col bg-navy text-on-navy">
      <div className="flex items-center justify-between px-5 py-4">
        <Logo className="text-on-navy" />
        <span className="rounded-md bg-primary px-3 py-1.5 font-sans text-sm font-medium text-on-primary">
          Request a quote
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 sm:px-10">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-on-navy/25 px-3 py-1 font-sans text-xs text-on-navy/80">
          <span className="size-1.5 rounded-full bg-amber" />
          Serving Central Texas since 2003
        </span>
        <h2 className="mt-4 max-w-md font-semibold leading-[1.05] tracking-[-0.03em] text-[clamp(1.75rem,4vw,3rem)]">
          Reliable IT, handled <span className="font-serif font-normal italic text-amber">like a neighbor</span>.
        </h2>
        <p className="mt-3 max-w-sm font-sans text-sm text-on-navy/75">
          From the machine that will not boot to the network you never have to think about.
        </p>
      </div>
    </div>
  );
}

const callouts = [
  { before: "Five competing buttons (Service Request, Pay Now, Remote Support, Free Quote).", after: "One clear path: Request a quote." },
  { before: "Stock cyan gradient and a gray photo box.", after: "A committed navy band with a typographic hero." },
  { before: "No dark mode, fixed styling.", after: "First-class light and dark, themeable live." },
  { before: "Defunct Google+ and scattered social links.", after: "Current, accessible, fast, and token-driven." },
];

export default function BeforeAfterRoute() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Before & after</h1>
      <p className="mt-2 max-w-2xl leading-relaxed text-muted">
        Same business, same blue-and-white identity, finally systematized. Drag the handle to move
        between the 2003-era site and the rebrand.
      </p>

      <div className="mt-8">
        <BeforeAfter before={<BeforeCray />} after={<AfterCray />} />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">What changed, and why</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {callouts.map((c) => (
            <div key={c.before} className="rounded-lg border border-border bg-surface-2 p-5">
              <p className="font-sans text-sm text-muted">
                <span className="font-medium text-ink">Before:</span> {c.before}
              </p>
              <p className="mt-2 font-sans text-sm text-muted">
                <span className="font-medium text-primary-strong">After:</span> {c.after}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
