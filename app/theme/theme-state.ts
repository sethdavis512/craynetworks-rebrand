import { z } from "zod";

/** Cookie name shared by the server reader and the client persister. */
export const THEME_COOKIE = "cray_theme";

export const ModeSchema = z.enum(["light", "dark"]);

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
  };
  const result = ThemeStateSchema.safeParse(candidate);
  return result.success ? result.data : DEFAULT_THEME_STATE;
}
