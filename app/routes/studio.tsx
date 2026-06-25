import { useState, type ReactNode } from "react";
import { primitives, oklchString } from "../theme/tokens";
import { Rationale } from "../components/site/Rationale";

export function meta() {
  return [
    { title: "Studio — Cray Networks" },
    { name: "description", content: "Live typography lab and the OKLCH token system." },
  ];
}

function Field({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between font-sans text-xs text-muted">
        <span>{label}</span>
        <span className="tabular-nums">{value}</span>
      </div>
      {children}
    </label>
  );
}

const range = "mt-2 w-full accent-primary";

const SCALE = [
  { label: "Display", k: 5 },
  { label: "Heading 1", k: 4 },
  { label: "Heading 2", k: 3 },
  { label: "Heading 3", k: 2 },
  { label: "Body", k: 0 },
  { label: "Caption", k: -1 },
];

const SWATCHES = [
  { name: "primary", cls: "bg-primary" },
  { name: "primary-hover", cls: "bg-primary-hover" },
  { name: "sky", cls: "bg-sky" },
  { name: "navy", cls: "bg-navy" },
  { name: "amber", cls: "bg-amber" },
  { name: "surface", cls: "bg-surface" },
  { name: "surface-2", cls: "bg-surface-2" },
  { name: "ink", cls: "bg-ink" },
  { name: "muted", cls: "bg-muted" },
  { name: "border", cls: "bg-border" },
  { name: "success", cls: "bg-success" },
  { name: "warning", cls: "bg-warning" },
  { name: "danger", cls: "bg-danger" },
] as const;

const SPECIMEN =
  "Cray Networks keeps Central Texas businesses online, from the machine that will not boot to the network you never have to think about.";

export default function Studio() {
  const [family, setFamily] = useState<"serif" | "sans">("serif");
  const [weight, setWeight] = useState(440);
  const [opsz, setOpsz] = useState(18);
  const [ratio, setRatio] = useState(1.25);
  const [leading, setLeading] = useState(1.5);
  const [tracking, setTracking] = useState(0);
  const [measure, setMeasure] = useState(66);

  const fontFamily = family === "serif" ? "var(--font-body)" : "var(--font-heading)";
  const variation = `'wght' ${weight}, 'opsz' ${opsz}`;

  const specimenStyle = {
    fontFamily,
    fontVariationSettings: variation,
    fontWeight: weight,
    lineHeight: leading,
    letterSpacing: `${tracking}em`,
  } as const;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Studio</h1>
      <p className="mt-2 max-w-2xl leading-relaxed text-muted">
        The typography lab and the OKLCH token system. Every control writes real font-variation and
        layout values onto the specimen; the swatches are read straight from the canonical token
        model, so they cannot drift from what ships.
      </p>

      {/* Type lab */}
      <section className="mt-10 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <div>
            <div className="font-sans text-xs font-semibold text-muted">Family</div>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setFamily("serif")}
                className={`rounded-md border px-3 py-1.5 font-sans text-sm transition-colors ${family === "serif" ? "border-primary bg-primary/10 text-primary-strong" : "border-border text-muted hover:text-ink"}`}
              >
                Literata
              </button>
              <button
                type="button"
                onClick={() => setFamily("sans")}
                className={`rounded-md border px-3 py-1.5 font-sans text-sm transition-colors ${family === "sans" ? "border-primary bg-primary/10 text-primary-strong" : "border-border text-muted hover:text-ink"}`}
              >
                Hanken Grotesk
              </button>
            </div>
          </div>

          <Field label="Weight" value={String(weight)}>
            <input type="range" min={200} max={800} step={10} value={weight} onChange={(e) => setWeight(Number(e.target.value))} className={range} />
          </Field>
          <Field label="Optical size (Literata)" value={String(opsz)}>
            <input type="range" min={7} max={72} step={1} value={opsz} onChange={(e) => setOpsz(Number(e.target.value))} className={range} />
          </Field>
          <Field label="Scale ratio" value={ratio.toFixed(3)}>
            <input type="range" min={1.1} max={1.6} step={0.005} value={ratio} onChange={(e) => setRatio(Number(e.target.value))} className={range} />
          </Field>
          <Field label="Line height" value={leading.toFixed(2)}>
            <input type="range" min={1} max={2} step={0.01} value={leading} onChange={(e) => setLeading(Number(e.target.value))} className={range} />
          </Field>
          <Field label="Tracking" value={`${tracking.toFixed(3)}em`}>
            <input type="range" min={-0.05} max={0.1} step={0.005} value={tracking} onChange={(e) => setTracking(Number(e.target.value))} className={range} />
          </Field>
          <Field label="Measure" value={`${measure}ch`}>
            <input type="range" min={40} max={90} step={1} value={measure} onChange={(e) => setMeasure(Number(e.target.value))} className={range} />
          </Field>
        </aside>

        <div className="min-w-0">
          {/* Modular scale ramp */}
          <div className="space-y-3 border-b border-border pb-8">
            {SCALE.map((s) => (
              <div key={s.label} className="flex items-baseline gap-4">
                <span className="w-24 shrink-0 font-sans text-xs text-muted">
                  {s.label}
                  <span className="block tabular-nums">{(ratio ** s.k).toFixed(2)}rem</span>
                </span>
                <span
                  className="min-w-0 truncate text-ink"
                  style={{ ...specimenStyle, fontSize: `${ratio ** s.k}rem`, lineHeight: 1.1 }}
                >
                  Reliable IT, handled like a neighbor.
                </span>
              </div>
            ))}
          </div>

          {/* Reading specimen at the chosen measure */}
          <p className="mt-8 text-ink" style={{ ...specimenStyle, fontSize: "1.125rem", maxWidth: `${measure}ch` }}>
            {SPECIMEN} {SPECIMEN}
          </p>
        </div>
      </section>

      <Rationale title="Why Hanken Grotesk and Literata" className="mt-8">
        Hanken Grotesk gives headings a warm, geometric-humanist voice; Literata is a variable serif
        built for reading, with a real optical-size axis. Pairing a sans display face with a serif
        text face creates contrast on a genuine axis, not two near-identical sans, and the serif
        signals the human, trustworthy tone the brand is after. Both are self-hosted and variable,
        so the controls above move real axes.
      </Rationale>

      {/* Token ramp (read from tokens.ts) */}
      <section className="mt-16 border-t border-border pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Tokens</h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted">
          The semantic palette in OKLCH. Swatches fill from the live theme; the value below each is
          the canonical light-mode channel, imported directly from <code className="font-mono text-sm">tokens.ts</code>.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SWATCHES.map((s) => {
            const keyMap: Record<string, string> = { "primary-hover": "primaryHover", "surface-2": "surface2" };
            const lk = (keyMap[s.name] ?? s.name) as keyof (typeof primitives)["light"];
            const channels = primitives.light[lk];
            return (
              <div key={s.name} className="rounded-lg border border-border p-3">
                <div className={`h-12 rounded-md border border-border ${s.cls}`} />
                <div className="mt-2 font-sans text-xs">
                  <div className="font-medium text-ink">{s.name}</div>
                  <div className="font-mono text-muted">{channels ? oklchString(channels) : "derived"}</div>
                </div>
              </div>
            );
          })}
        </div>

        <Rationale title="Why refined blue, navy, and OKLCH" className="mt-6">
          Cray already owned a cyan-leaning blue, a deep navy, and white; the rebrand systematizes
          that identity rather than inventing a new one. Authoring it in OKLCH instead of hex gives
          perceptually even ramps and keeps light and dark in lockstep, and the lone amber accent,
          already present on the old site, adds warmth without introducing a second brand color.
        </Rationale>
      </section>
    </div>
  );
}
