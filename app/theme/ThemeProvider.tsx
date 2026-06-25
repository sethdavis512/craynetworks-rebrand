import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { DEFAULT_THEME_STATE, serialize, THEME_COOKIE, type ThemeState } from "./theme-state";

type AccentPatch = Partial<ThemeState["accent"]>;
type ThemePatch = Partial<Omit<ThemeState, "accent">> & { accent?: AccentPatch };

type ThemeContextValue = {
  state: ThemeState;
  update: (patch: ThemePatch) => void;
  reset: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const CHANNEL_PROPS = ["--primary-l", "--primary-c", "--primary-h", "--radius-base", "--spacing"] as const;

/** Apply the override layer as inline CSS vars on <html>. Consumers read vars, so they never re-render. */
function applyToDom(state: ThemeState) {
  const root = document.documentElement;
  root.style.setProperty("--primary-l", String(state.accent.l));
  root.style.setProperty("--primary-c", String(state.accent.c));
  root.style.setProperty("--primary-h", String(state.accent.h));
  root.style.setProperty("--radius-base", `${state.radius}rem`);
  root.style.setProperty("--spacing", `${state.density}rem`);
  root.classList.toggle("dark", state.mode === "dark");
}

/** Clear the override layer entirely, revealing the canonical app.css system underneath. */
function clearDom() {
  const root = document.documentElement;
  for (const prop of CHANNEL_PROPS) root.style.removeProperty(prop);
  root.classList.remove("dark");
}

function persist(state: ThemeState) {
  document.cookie = `${THEME_COOKIE}=${encodeURIComponent(serialize(state))}; path=/; max-age=31536000; samesite=lax`;
}

export function ThemeProvider({ initialState, children }: { initialState: ThemeState; children: ReactNode }) {
  const [state, setState] = useState<ThemeState>(initialState);
  const mounted = useRef(false);

  // SSR already injected the matching inline style; re-apply only after real changes.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    applyToDom(state);
    persist(state);
  }, [state]);

  const update = useCallback((patch: ThemePatch) => {
    setState((prev) => ({
      ...prev,
      ...patch,
      accent: { ...prev.accent, ...(patch.accent ?? {}) },
    }));
  }, []);

  const reset = useCallback(() => {
    clearDom();
    document.cookie = `${THEME_COOKIE}=; path=/; max-age=0`;
    setState(DEFAULT_THEME_STATE);
    mounted.current = false; // skip the next apply; canonical values are already showing
  }, []);

  return <ThemeContext.Provider value={{ state, update, reset }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
