/** Pure OKLCH helpers. No I/O, no ambient state, so they are trivially unit-testable. */

export type Channels = { l: number; c: number; h: number };

export function clamp(min: number, max: number, value: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Serialize channels to an OKLCH CSS color string. */
export function formatOklch({ l, c, h }: Channels): string {
  return `oklch(${l} ${c} ${h})`;
}

/** OKLCH -> linear sRGB (may be out of [0,1] when the color is outside the sRGB gamut). */
function oklchToLinear({ l, c, h }: Channels): [number, number, number] {
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;
  const L = l_ ** 3;
  const M = m_ ** 3;
  const S = s_ ** 3;
  return [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];
}

const encode = (x: number) => {
  const v = clamp(0, 1, x);
  return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
};

/** OKLCH -> 8-bit sRGB, plus whether the color fit inside the sRGB gamut (else it was clamped). */
export function oklchToRgb(ch: Channels): { r: number; g: number; b: number; inGamut: boolean } {
  const lin = oklchToLinear(ch);
  const inGamut = lin.every((v) => v >= -0.002 && v <= 1.002);
  return {
    r: Math.round(encode(lin[0]) * 255),
    g: Math.round(encode(lin[1]) * 255),
    b: Math.round(encode(lin[2]) * 255),
    inGamut,
  };
}

/** WCAG relative luminance of an OKLCH color. */
export function relativeLuminance(ch: Channels): number {
  const lin = oklchToLinear(ch).map((v) => clamp(0, 1, v));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** WCAG 2.x contrast ratio between two colors (1..21). */
export function wcagContrast(a: Channels, b: Channels): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export function wcagLevel(ratio: number, large = false): "AAA" | "AA" | "fail" {
  if (ratio >= (large ? 4.5 : 7)) return "AAA";
  if (ratio >= (large ? 3 : 4.5)) return "AA";
  return "fail";
}

/** APCA (W3 / SAPC) lightness contrast Lc for text on a background. Standards-based estimate. */
export function apcaLc(text: Channels, bg: Channels): number {
  const screenY = (ch: Channels) => {
    const { r, g, b } = oklchToRgb(ch);
    return 0.2126729 * (r / 255) ** 2.4 + 0.7151522 * (g / 255) ** 2.4 + 0.072175 * (b / 255) ** 2.4;
  };
  let txt = screenY(text);
  let bgY = screenY(bg);
  const thr = 0.022;
  const clmp = 1.414;
  if (txt < thr) txt += (thr - txt) ** clmp;
  if (bgY < thr) bgY += (thr - bgY) ** clmp;
  if (Math.abs(bgY - txt) < 0.0005) return 0;
  let lc: number;
  if (bgY > txt) {
    lc = (bgY ** 0.56 - txt ** 0.57) * 1.14;
    lc = lc < 0.1 ? 0 : (lc - 0.027) * 100;
  } else {
    lc = (bgY ** 0.65 - txt ** 0.62) * 1.14;
    lc = lc > -0.1 ? 0 : (lc + 0.027) * 100;
  }
  return Math.round(lc * 10) / 10;
}

/** A perceptual lightness ramp at a fixed chroma/hue: even-ish L steps light to dark. */
export function ramp(
  { c, h }: { c: number; h: number },
  stops = [0.95, 0.86, 0.77, 0.68, 0.58, 0.48, 0.38, 0.28, 0.2],
): Channels[] {
  return stops.map((l) => ({ l, c, h }));
}

/**
 * Pick a readable foreground tier for a fill of the given lightness.
 * Heuristic helper; the color lab uses wcagContrast/apcaLc for exact readouts.
 */
export function readableInk(lightness: number): "light" | "dark" {
  return lightness < 0.6 ? "light" : "dark";
}
