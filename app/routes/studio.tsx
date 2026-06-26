import { useState, type ReactNode } from "react";
import { primitives } from "../theme/tokens";
import { Rationale } from "../components/site/Rationale";
import { useTheme } from "../theme/ThemeProvider";
import { clamp, formatOklch, wcagContrast, wcagLevel, apcaLc, oklchToRgb, ramp, type Channels } from "../theme/oklch";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

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

const fmt = (ch: Channels) =>
  `oklch(${(Math.round(ch.l * 100) / 100).toString()} ${(Math.round(ch.c * 1000) / 1000).toString()} ${Math.round(ch.h)})`;

function Swatch({ ch, label }: { ch: Channels; label: string }) {
  const { inGamut } = oklchToRgb(ch);
  return (
    <div className="rounded-lg border border-border p-3">
      <div className="h-12 rounded-md border border-border" style={{ backgroundColor: formatOklch(ch) }} />
      <div className="mt-2 font-sans text-xs">
        <div className="font-medium text-ink">{label}</div>
        <div className="font-mono text-muted">
          {fmt(ch)}
          {inGamut ? "" : " (clamped)"}
        </div>
      </div>
    </div>
  );
}

function ContrastRow({ fg, bg, label, large }: { fg: Channels; bg: Channels; label: string; large?: boolean }) {
  const ratio = wcagContrast(fg, bg);
  const level = wcagLevel(ratio, large);
  const lc = apcaLc(fg, bg);
  return (
    <div className="flex items-center gap-3 border-t border-border py-3 font-sans text-sm sm:gap-4">
      <span
        className="grid size-9 shrink-0 place-items-center rounded-md border border-border text-xs font-semibold"
        style={{ backgroundColor: formatOklch(bg), color: formatOklch(fg) }}
      >
        Aa
      </span>
      <span className="min-w-0 flex-1 truncate text-ink">{label}</span>
      <span className="tabular-nums text-muted">{ratio.toFixed(2)}:1</span>
      <span
        className={`w-10 text-right font-mono text-xs font-semibold uppercase ${level === "fail" ? "text-danger-strong" : "text-success-strong"}`}
      >
        {level}
      </span>
      <span className="hidden w-20 text-right tabular-nums text-muted sm:inline">Lc {lc}</span>
    </div>
  );
}

const c01 = (x: number) => clamp(0, 1, x);

function ColorLab() {
  const { state } = useTheme();
  const mode = state.mode;
  const accent = state.accent;
  const t = primitives[mode];

  const primary: Channels = accent;
  const primaryHover: Channels = { l: c01(mode === "dark" ? accent.l + 0.06 : accent.l - 0.06), c: accent.c, h: accent.h };
  const sky: Channels = { l: c01(accent.l + 0.12), c: accent.c, h: accent.h };
  const primaryStrong: Channels = { l: mode === "dark" ? 0.8 : 0.46, c: accent.c, h: accent.h };
  const onPrimary: Channels = mode === "dark" ? { l: 0.16, c: 0.02, h: 245 } : { l: 0.99, c: 0.004, h: 240 };
  const onNavy: Channels = { l: 0.96, c: 0.01, h: 240 };
  const accentRamp = ramp({ c: accent.c, h: accent.h });

  const pairs: { label: string; fg: Channels; bg: Channels; large?: boolean }[] = [
    { label: "on-primary on primary (button)", fg: onPrimary, bg: primary },
    { label: "ink on surface (body)", fg: t.ink, bg: t.surface },
    { label: "muted on surface (secondary)", fg: t.muted, bg: t.surface },
    { label: "primary-strong on surface (link)", fg: primaryStrong, bg: t.surface },
    { label: "on-navy on navy (hero band)", fg: onNavy, bg: t.navy, large: true },
  ];

  return (
    <section className="mt-16 border-t border-border pt-10">
      <h2 className="text-2xl font-semibold tracking-tight text-ink">Color lab</h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-muted">
        This reads the live accent from the Theme drawer. Drag the hue, chroma, or lightness there and
        the ramp, the token cascade, and the contrast readouts below all update at once.
      </p>

      <div className="mt-6">
        <div className="font-sans text-xs font-semibold text-muted">
          Accent ramp (chroma {accent.c.toFixed(3)}, hue {Math.round(accent.h)})
        </div>
        <div className="mt-2 flex overflow-hidden rounded-lg border border-border">
          {accentRamp.map((ch) => (
            <div key={ch.l} className="h-12 flex-1" style={{ backgroundColor: formatOklch(ch) }} title={`L ${ch.l}`} />
          ))}
        </div>
      </div>

      <div className="mt-8 grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.4fr)_auto_minmax(0,1fr)]">
        <div className="rounded-xl border border-border bg-surface-2 p-4">
          <div className="font-sans text-xs font-semibold text-muted">Primitive channels</div>
          <div className="mt-2 font-mono text-sm text-ink">--primary-l: {accent.l.toFixed(2)}</div>
          <div className="font-mono text-sm text-ink">--primary-c: {accent.c.toFixed(3)}</div>
          <div className="font-mono text-sm text-ink">--primary-h: {Math.round(accent.h)}</div>
          <div className="mt-2 font-sans text-xs text-muted">set live in the Drawer</div>
        </div>
        <div aria-hidden="true" className="hidden text-2xl text-muted lg:block">&rarr;</div>
        <div className="grid grid-cols-2 gap-2">
          <Swatch ch={primary} label="primary" />
          <Swatch ch={primaryHover} label="primary-hover" />
          <Swatch ch={sky} label="sky" />
          <Swatch ch={primaryStrong} label="primary-strong" />
        </div>
        <div aria-hidden="true" className="hidden text-2xl text-muted lg:block">&rarr;</div>
        <div className="space-y-3 rounded-xl border border-border bg-surface-2 p-4">
          <div className="font-sans text-xs font-semibold text-muted">Consumers</div>
          <Button size="sm">Button</Button>
          <div>
            <Badge tone="primary">Badge</Badge>
          </div>
          <div className="font-sans text-sm font-medium text-primary-strong">A primary link</div>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-sans text-lg font-semibold text-ink">Contrast readouts</h3>
          <span className="font-sans text-xs text-muted">{mode} mode &middot; WCAG / level &middot; APCA Lc</span>
        </div>
        <div className="mt-2">
          {pairs.map((p) => (
            <ContrastRow key={p.label} fg={p.fg} bg={p.bg} label={p.label} large={p.large} />
          ))}
        </div>
      </div>

      <Rationale title="Why refined blue, navy, and OKLCH" className="mt-8">
        Cray already owned a cyan-leaning blue, a deep navy, and white; the rebrand systematizes that
        identity rather than inventing a new one. Authoring it in OKLCH instead of hex gives
        perceptually even ramps and keeps light and dark in lockstep, and the lone amber accent,
        already present on the old site, adds warmth without introducing a second brand color.
      </Rationale>
    </section>
  );
}

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

      <ColorLab />
    </div>
  );
}
