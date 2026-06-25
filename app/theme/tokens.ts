/**
 * Canonical token model for the Cray Networks rebrand.
 *
 * This file is the single source of truth (Principle I / IV). `app/styles/app.css`
 * declares these as CSS custom properties; the `/system` docs import THIS file directly
 * so documentation cannot drift from the shipped values.
 *
 * Tiers: primitive OKLCH channels -> semantic tokens -> component tokens.
 * Colors are authored as composable OKLCH channels so the live theming engine (stage-03)
 * can override `--*-l/c/h` on <html> and re-theme everything with no React re-render.
 *
 * Values are the signed-off brand (plans/brand-direction.md): refined Cray blue (#178fc0),
 * navy (#094369), white, with an amber pop. Channels are oklch(L C H); L as a 0-1 fraction.
 */

export type Oklch = { l: number; c: number; h: number };
export type ThemeName = "light" | "dark";

/** Primitive brand + neutral channels, per theme. The accent ramp (stage-03) derives from these. */
export const primitives: Record<ThemeName, Record<string, Oklch>> = {
  light: {
    primary: { l: 0.58, c: 0.11, h: 232 }, // Cray blue, anchored on #178fc0
    primaryHover: { l: 0.52, c: 0.11, h: 232 },
    sky: { l: 0.7, c: 0.115, h: 230 }, // brighter interactive blue, #18a7e1
    navy: { l: 0.34, c: 0.065, h: 242 }, // depth / dark surfaces, #094369
    amber: { l: 0.8, c: 0.12, h: 72 }, // complementary pop (~5% usage)
    surface: { l: 0.99, c: 0.004, h: 240 }, // near-white, whisper of brand hue
    surface2: { l: 0.975, c: 0.005, h: 240 },
    ink: { l: 0.25, c: 0.02, h: 245 }, // navy-charcoal body text
    muted: { l: 0.52, c: 0.02, h: 245 },
    border: { l: 0.91, c: 0.008, h: 240 },
    success: { l: 0.55, c: 0.12, h: 150 },
    warning: { l: 0.72, c: 0.13, h: 75 },
    danger: { l: 0.55, c: 0.17, h: 25 },
  },
  dark: {
    primary: { l: 0.72, c: 0.11, h: 232 },
    primaryHover: { l: 0.78, c: 0.11, h: 232 },
    sky: { l: 0.76, c: 0.115, h: 230 },
    navy: { l: 0.34, c: 0.065, h: 242 },
    amber: { l: 0.82, c: 0.12, h: 72 },
    surface: { l: 0.19, c: 0.02, h: 245 }, // navy-tinted dark ("Cray at night"), from #031421
    surface2: { l: 0.235, c: 0.02, h: 245 },
    ink: { l: 0.95, c: 0.006, h: 240 },
    muted: { l: 0.7, c: 0.014, h: 240 },
    border: { l: 0.32, c: 0.016, h: 245 },
    success: { l: 0.7, c: 0.13, h: 150 },
    warning: { l: 0.8, c: 0.13, h: 75 },
    danger: { l: 0.68, c: 0.17, h: 25 },
  },
};

/** Semantic status hues (derived per theme for contrast parity). */
export const statusHue = { success: 150, info: 232, warning: 75, danger: 25 } as const;

/** Non-color foundation tokens. Spacing/radius flow through these so density/radius cascade. */
export const foundation = {
  radiusBase: "0.625rem", // inline sm/md/lg derive as calc(var(--radius-base) * k)
  spacing: "0.25rem",
  fonts: {
    heading: '"Hanken Grotesk Variable", ui-sans-serif, system-ui, sans-serif',
    body: '"Literata Variable", ui-serif, Georgia, "Times New Roman", serif',
  },
} as const;

/** Serialize a channel triple to an OKLCH CSS color string. */
export function oklchString({ l, c, h }: Oklch): string {
  return `oklch(${l} ${c} ${h})`;
}
