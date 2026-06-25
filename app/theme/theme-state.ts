import { z } from "zod";

/** Cookie name shared by the server reader and the client persister. */
export const THEME_COOKIE = "cray_theme";

/** Body font stacks (kept here so SSR and the client provider agree). */
export const FONT_STACKS = {
  serif: '"Literata Variable", ui-serif, Georgia, "Times New Roman", serif',
  sans: '"Hanken Grotesk Variable", ui-sans-serif, system-ui, sans-serif',
} as const;

export const ModeSchema = z.enum(["light", "dark"]);
export const FamilySchema = z.enum(["serif", "sans"]);

/**
 * Versioned, validated theme override state. Pure and serializable so it can live in a cookie
 * and a shareable `?theme=` URL, and be unit-tested. Ranges double as clamps.
 */
export const ThemeStateSchema = z.object({
  mode: ModeSchema.default("light"),
  accent: z
    .object({
      l: z.coerce.number().min(0).max(1).default(0.58),
      c: z.coerce.number().min(0).max(0.37).default(0.11),
      h: z.coerce.number().min(0).max(360).default(232),
    })
    .default({ l: 0.58, c: 0.11, h: 232 }),
  radius: z.coerce.number().min(0).max(2).default(0.625),
  density: z.coerce.number().min(0.15).max(0.4).default(0.25),
  type: z
    .object({
      family: FamilySchema.default("serif"),
      scale: z.coerce.number().min(0.85).max(1.2).default(1),
      weight: z.coerce.number().min(300).max(700).default(400),
      opsz: z.coerce.number().min(7).max(72).default(18),
      tracking: z.coerce.number().min(-0.05).max(0.08).default(0),
    })
    .default({ family: "serif", scale: 1, weight: 400, opsz: 18, tracking: 0 }),
  hero: z
    .object({
      count: z.coerce.number().min(16).max(140).default(52),
      speed: z.coerce.number().min(0).max(1).default(0.5),
      spread: z.coerce.number().min(0).max(1).default(0.5),
    })
    .default({ count: 52, speed: 0.5, spread: 0.5 }),
  era: z.enum(["standard", "2056"]).default("standard"),
});

export type ThemeState = z.infer<typeof ThemeStateSchema>;

export const DEFAULT_THEME_STATE: ThemeState = ThemeStateSchema.parse({});

/** Compact, URL-safe encoding (also used for the cookie value). */
export function serialize(state: ThemeState): string {
  return new URLSearchParams({
    m: state.mode,
    al: String(state.accent.l),
    ac: String(state.accent.c),
    ah: String(state.accent.h),
    r: String(state.radius),
    s: String(state.density),
    tf: state.type.family,
    ts: String(state.type.scale),
    tw: String(state.type.weight),
    to: String(state.type.opsz),
    tk: String(state.type.tracking),
    hc: String(state.hero.count),
    hs: String(state.hero.speed),
    hp: String(state.hero.spread),
    e: state.era,
  }).toString();
}

/** Parse + validate; any malformed input falls back to defaults rather than throwing. */
export function deserialize(input: string | null | undefined): ThemeState {
  if (!input) return DEFAULT_THEME_STATE;
  const p = new URLSearchParams(input);
  const candidate = {
    mode: p.get("m") ?? undefined,
    accent: { l: p.get("al") ?? undefined, c: p.get("ac") ?? undefined, h: p.get("ah") ?? undefined },
    radius: p.get("r") ?? undefined,
    density: p.get("s") ?? undefined,
    type: {
      family: p.get("tf") ?? undefined,
      scale: p.get("ts") ?? undefined,
      weight: p.get("tw") ?? undefined,
      opsz: p.get("to") ?? undefined,
      tracking: p.get("tk") ?? undefined,
    },
    hero: {
      count: p.get("hc") ?? undefined,
      speed: p.get("hs") ?? undefined,
      spread: p.get("hp") ?? undefined,
    },
    era: p.get("e") ?? undefined,
  };
  const result = ThemeStateSchema.safeParse(candidate);
  return result.success ? result.data : DEFAULT_THEME_STATE;
}
