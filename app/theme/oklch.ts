/** Pure OKLCH helpers. No I/O, no ambient state, so they are trivially unit-testable. */

export type Channels = { l: number; c: number; h: number };

export function clamp(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Serialize channels to an OKLCH CSS color string. */
export function formatOklch({ l, c, h }: Channels): string {
  return `oklch(${l} ${c} ${h})`;
}

/**
 * Pick a readable foreground tier for a fill of the given lightness.
 * Heuristic until the full APCA pass in the color lab: dark fills want light text and vice versa.
 */
export function readableInk(lightness: number): "light" | "dark" {
  return lightness < 0.6 ? "light" : "dark";
}
