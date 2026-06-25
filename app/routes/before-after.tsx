import { BeforeAfter } from "../components/showcase/BeforeAfter";
import oldCraySrc from "../images/old-cray.png";
import newCraySrc from "../images/new-cray.png";
import { Rationale } from "../components/site/Rationale";

export function meta() {
  return [
    { title: "Before & after — Cray Networks" },
    { name: "description", content: "The Cray Networks site, before and after the rebrand." },
  ];
}

/** The real 2003-era Cray site (screenshot), shown from the top. */
function BeforeCray() {
  return (
    <div className="h-full w-full bg-white">
      <img
        src={oldCraySrc}
        alt="The Cray Networks website in 2003, before the rebrand"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

/** The rebrand: a screenshot of the live marketing landing. */
function AfterCray() {
  return (
    <div className="h-full w-full bg-navy">
      <img
        src={newCraySrc}
        alt="The Cray Networks rebrand landing page"
        className="h-full w-full object-cover object-top"
      />
    </div>
  );
}

const callouts = [
  { before: "Four feature buttons plus eight nav items competing for attention.", after: "One clear path: Request a quote." },
  { before: "Heavy blue chrome, an ornate background, and a snapshot of the building.", after: "A committed navy band with a typographic hero." },
  { before: "No dark mode; fixed, dated styling.", after: "First-class light and dark, themeable live." },
  { before: "Google+, Facebook, and Yelp badges in the sidebar.", after: "Current, accessible, fast, and token-driven." },
];

export default function BeforeAfterRoute() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Before & after</h1>
      <p className="mt-2 max-w-2xl leading-relaxed text-muted">
        Same business, same blue-and-white identity, finally systematized. Drag the handle to move
        between the real 2003-era site and the rebrand.
      </p>

      <div className="mt-8">
        <BeforeAfter before={<BeforeCray />} after={<AfterCray />} />
      </div>

      <Rationale title="Why real screenshots" className="mt-6">
        Both panels are real screenshots, the actual 2003-era site and the rebuilt rebrand, not
        flattering reconstructions. Showing the true starting point keeps the comparison honest and
        makes the distance traveled legible at a glance.
      </Rationale>

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
