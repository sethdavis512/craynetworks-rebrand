import { useState, type ReactNode } from "react";
import { Link } from "react-router";
import { Sheet } from "../ui/Sheet";
import { Button } from "../ui/Button";
import { useTheme } from "../../theme/ThemeProvider";

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

const rangeClass = "mt-2 w-full accent-primary";

export function ThemeDrawer() {
  const [open, setOpen] = useState(false);
  const { state, update, reset } = useTheme();

  return (
    <>
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <Link
          to="/admin"
          className="rounded-full border border-border bg-surface px-4 py-2 font-sans text-sm font-medium text-ink shadow-lg transition-colors hover:bg-surface-2"
        >
          Admin
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
        description="Live design tokens. Every control writes CSS variables on the page, so the whole UI re-themes instantly and persists."
      >
        <div className="space-y-5">
          <div>
            <div className="font-sans text-xs font-semibold text-muted">Mode</div>
            <div className="mt-2 flex gap-2">
              <Button
                size="sm"
                variant={state.mode === "light" ? "primary" : "outline"}
                onClick={() => update({ mode: "light" })}
              >
                Light
              </Button>
              <Button
                size="sm"
                variant={state.mode === "dark" ? "primary" : "outline"}
                onClick={() => update({ mode: "dark" })}
              >
                Dark
              </Button>
            </div>
          </div>

          <Field label="Accent hue" value={String(Math.round(state.accent.h))}>
            <input
              type="range"
              min={0}
              max={360}
              step={1}
              value={state.accent.h}
              onChange={(e) => update({ accent: { h: Number(e.target.value) } })}
              className={rangeClass}
            />
          </Field>

          <Field label="Accent chroma" value={state.accent.c.toFixed(3)}>
            <input
              type="range"
              min={0}
              max={0.3}
              step={0.005}
              value={state.accent.c}
              onChange={(e) => update({ accent: { c: Number(e.target.value) } })}
              className={rangeClass}
            />
          </Field>

          <Field label="Accent lightness" value={state.accent.l.toFixed(2)}>
            <input
              type="range"
              min={0.3}
              max={0.85}
              step={0.01}
              value={state.accent.l}
              onChange={(e) => update({ accent: { l: Number(e.target.value) } })}
              className={rangeClass}
            />
          </Field>

          <Field label="Radius" value={`${state.radius.toFixed(3)}rem`}>
            <input
              type="range"
              min={0}
              max={1.5}
              step={0.025}
              value={state.radius}
              onChange={(e) => update({ radius: Number(e.target.value) })}
              className={rangeClass}
            />
          </Field>

          <Field label="Density (spacing)" value={`${state.density.toFixed(2)}rem`}>
            <input
              type="range"
              min={0.18}
              max={0.34}
              step={0.01}
              value={state.density}
              onChange={(e) => update({ density: Number(e.target.value) })}
              className={rangeClass}
            />
          </Field>

          <Button variant="ghost" size="sm" onClick={reset}>
            Reset to defaults
          </Button>
        </div>
      </Sheet>
    </>
  );
}
