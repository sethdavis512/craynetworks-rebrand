import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { Sheet } from "../ui/Sheet";
import { Button } from "../ui/Button";
import { Tabs } from "../ui/Tabs";
import { useTheme } from "../../theme/ThemeProvider";

function Field({
  label,
  value,
  hint,
  children,
}: {
  label: string;
  value: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between font-sans text-xs font-medium text-ink">
        <span>{label}</span>
        <span className="tabular-nums text-muted">{value}</span>
      </div>
      {hint ? <p className="mt-0.5 font-sans text-xs leading-snug text-muted">{hint}</p> : null}
      {children}
    </label>
  );
}

function GroupLabel({ label, hint }: { label: string; hint: string }) {
  return (
    <>
      <div className="font-sans text-xs font-medium text-ink">{label}</div>
      <p className="mt-0.5 font-sans text-xs leading-snug text-muted">{hint}</p>
    </>
  );
}

const rangeClass = "mt-2 w-full accent-primary";

export function ThemeDrawer() {
  const [open, setOpen] = useState(false);
  const { state, update, reset } = useTheme();
  const { pathname } = useLocation();
  const inAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  const tokensPanel = (
    <div className="space-y-5">
      <div>
        <GroupLabel label="Mode" hint="Light or dark appearance" />
        <div className="mt-2 flex gap-2">
          <Button size="sm" variant={state.mode === "light" ? "primary" : "outline"} onClick={() => update({ mode: "light" })}>
            Light
          </Button>
          <Button size="sm" variant={state.mode === "dark" ? "primary" : "outline"} onClick={() => update({ mode: "dark" })}>
            Dark
          </Button>
        </div>
      </div>

      <Field label="Accent hue" value={String(Math.round(state.accent.h))} hint="Where the brand color sits on the color wheel">
        <input type="range" min={0} max={360} step={1} value={state.accent.h} onChange={(e) => update({ accent: { h: Number(e.target.value) } })} className={rangeClass} />
      </Field>
      <Field label="Accent chroma" value={state.accent.c.toFixed(3)} hint="How vivid or muted the brand color is">
        <input type="range" min={0} max={0.3} step={0.005} value={state.accent.c} onChange={(e) => update({ accent: { c: Number(e.target.value) } })} className={rangeClass} />
      </Field>
      <Field label="Accent lightness" value={state.accent.l.toFixed(2)} hint="How light or dark the brand color is">
        <input type="range" min={0.3} max={0.85} step={0.01} value={state.accent.l} onChange={(e) => update({ accent: { l: Number(e.target.value) } })} className={rangeClass} />
      </Field>
      <Field label="Radius" value={`${state.radius.toFixed(3)}rem`} hint="How rounded the corners are, from sharp to pill">
        <input type="range" min={0} max={1.5} step={0.025} value={state.radius} onChange={(e) => update({ radius: Number(e.target.value) })} className={rangeClass} />
      </Field>
      <Field label="Density" value={`${state.density.toFixed(2)}rem`} hint="How tight or roomy the spacing is">
        <input type="range" min={0.18} max={0.34} step={0.01} value={state.density} onChange={(e) => update({ density: Number(e.target.value) })} className={rangeClass} />
      </Field>
    </div>
  );

  const typePanel = (
    <div className="space-y-5">
      <div>
        <GroupLabel label="Body family" hint="The font used for paragraph text" />
        <div className="mt-2 flex gap-2">
          <Button size="sm" variant={state.type.family === "serif" ? "primary" : "outline"} onClick={() => update({ type: { family: "serif" } })}>
            Literata
          </Button>
          <Button size="sm" variant={state.type.family === "sans" ? "primary" : "outline"} onClick={() => update({ type: { family: "sans" } })}>
            Hanken Grotesk
          </Button>
        </div>
      </div>

      <Field label="Base size" value={`${Math.round(state.type.scale * 100)}%`} hint="Scales every bit of text up or down">
        <input type="range" min={0.85} max={1.2} step={0.01} value={state.type.scale} onChange={(e) => update({ type: { scale: Number(e.target.value) } })} className={rangeClass} />
      </Field>
      <Field label="Weight" value={String(state.type.weight)} hint="How thick the letter strokes are">
        <input type="range" min={300} max={700} step={10} value={state.type.weight} onChange={(e) => update({ type: { weight: Number(e.target.value) } })} className={rangeClass} />
      </Field>
      <Field label="Optical size" value={String(state.type.opsz)} hint="Tunes Literata's letterforms for small or large text">
        <input type="range" min={7} max={72} step={1} value={state.type.opsz} onChange={(e) => update({ type: { opsz: Number(e.target.value) } })} className={rangeClass} />
      </Field>
      <Field label="Tracking" value={`${state.type.tracking.toFixed(3)}em`} hint="The space between letters">
        <input type="range" min={-0.05} max={0.08} step={0.005} value={state.type.tracking} onChange={(e) => update({ type: { tracking: Number(e.target.value) } })} className={rangeClass} />
      </Field>
    </div>
  );

  const heroPanel = (
    <div className="space-y-5">
      <Field label="Node count" value={String(Math.round(state.hero.count))} hint="How many nodes float in the hero graph">
        <input type="range" min={16} max={140} step={2} value={state.hero.count} onChange={(e) => update({ hero: { count: Number(e.target.value) } })} className={rangeClass} />
      </Field>
      <Field label="Drift speed" value={state.hero.speed.toFixed(2)} hint="How lively the graph keeps moving">
        <input type="range" min={0} max={1} step={0.01} value={state.hero.speed} onChange={(e) => update({ hero: { speed: Number(e.target.value) } })} className={rangeClass} />
      </Field>
      <Field label="Spread" value={state.hero.spread.toFixed(2)} hint="How far the nodes push apart">
        <input type="range" min={0} max={1} step={0.01} value={state.hero.spread} onChange={(e) => update({ hero: { spread: Number(e.target.value) } })} className={rangeClass} />
      </Field>
    </div>
  );

  return (
    <>
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <Link
          to={inAdmin ? "/" : "/admin"}
          className="rounded-full border border-border bg-surface px-4 py-2 font-sans text-sm font-medium text-ink shadow-lg transition-colors hover:bg-surface-2"
        >
          {inAdmin ? "View site" : "Admin"}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-full border border-border bg-surface px-4 py-2 font-sans text-sm font-medium text-ink shadow-lg transition-colors hover:bg-surface-2"
        >
          Theme
        </button>
      </div>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        side="right"
        title="Theme"
        description="Live design tokens and type. Every control writes CSS variables on the page, so the whole UI updates instantly and persists."
      >
        <Tabs
          items={[
            { value: "tokens", label: "Tokens", content: tokensPanel },
            { value: "type", label: "Type", content: typePanel },
            { value: "hero", label: "Hero", content: heroPanel },
          ]}
        />
        <Button variant="ghost" size="sm" onClick={reset} className="mt-6">
          Reset to defaults
        </Button>
      </Sheet>
    </>
  );
}
