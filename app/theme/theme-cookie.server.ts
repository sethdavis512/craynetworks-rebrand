import { DEFAULT_THEME_STATE, deserialize, serialize, THEME_COOKIE, type ThemeState } from "./theme-state";

/**
 * Resolve the theme for SSR: a `?theme=` param wins (shareable links), then the cookie,
 * then defaults. Read in the root loader so the correct theme is injected at first paint.
 */
export function readTheme(request: Request): ThemeState {
  const url = new URL(request.url);
  const fromUrl = url.searchParams.get("theme");
  if (fromUrl) return deserialize(fromUrl);

  const cookieHeader = request.headers.get("Cookie") ?? "";
  const entry = cookieHeader
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(`${THEME_COOKIE}=`));
  if (!entry) return DEFAULT_THEME_STATE;

  return deserialize(decodeURIComponent(entry.slice(THEME_COOKIE.length + 1)));
}

/** Build a Set-Cookie value (for server-driven persistence if ever needed). */
export function themeCookie(state: ThemeState): string {
  return `${THEME_COOKIE}=${encodeURIComponent(serialize(state))}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
