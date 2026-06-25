# 00 — Architecture & Integration Spine

> Read this first. The other four plans (`cray-networks-rebrand.md`, `interactive-showcase-wow-layer.md`, `impeccable-integration.md`, `simulated-data-and-dynamic-interactions.md`) describe *what* to build; this file resolves how they weave together: the shared contracts, cross-cutting policies, and the single master build order. Where this file conflicts with another plan, this file wins.

## Context

The four feature plans were written independently and, taken together, left seams: an unspecified token contract, three overlapping animation systems, "static" vs SSR framing, token source-of-truth drift, IA overlap, non-deterministic failures, and conflicting "build X first" orders. This document fixes those decisions once so the build composes cleanly.

## Cross-cutting decisions

| Decision | Resolution |
|---|---|
| Rendering | **SSR** (required by theme cookie loader + actions + deferred loaders). Not static/SPA. |
| Server runtime | **Node + `react-router-serve` in prod**; Bun for install/dev/build/scripts/tooling. (Avoids the known Bun + react-router-serve crash.) |
| Routing | **`@react-router/fs-routes` flat convention** (matches `system._index.tsx`, `components.$slug.tsx`). |
| Animation policy | Motion = scroll-reveal / page-level only. Base UI `data-state` + CSS transforms = `<Sheet>` (no Motion spring). Custom pointer+transform = canvas. One shared `useReducedMotion`. |
| Token source of truth | **Code is canonical** (`app/theme/tokens.ts` + `app/styles/app.css`). `/system` docs import `tokens.ts` directly (cannot drift). `DESIGN.md` is derived/regenerated. |
| Failure simulation | Default reliable; **explicit + seeded** trigger (`?chaos=1` / "simulate failure" control), never pure RNG. Deterministic for audits. |

## The token contract (THE linchpin — build first)

Everything live-themeable depends on tokens authored as **composable OKLCH channels** exposed as CSS variables, with Tailwind emitting `var()` references (not baked literals).

```css
/* app/styles/app.css */
:root {
  /* primitive channels */
  --accent-l: 55%; --accent-c: 0.12; --accent-h: 195;
  --radius-base: 0.5rem;          /* spacing/density/radius are var-driven */
  --spacing: 0.25rem;
  /* semantic, composed from channels */
  --color-accent: oklch(var(--accent-l) var(--accent-c) var(--accent-h));
  --color-surface: oklch(...); --color-ink: oklch(...);
}
.dark { /* re-declare channels/semantics for dark */ }

@theme inline {                   /* `inline` REQUIRED: keeps utilities override-able */
  --color-accent: var(--color-accent);
  --color-surface: var(--color-surface);
  --radius-md: var(--radius-base);
}
```

Rules this enforces:
- **Live theming** = the override layer sets channel vars (`--accent-h`, `--radius-base`, `--spacing`, font family, type ratio) as **inline styles on `<html>`**. Because utilities reference `var()`, the whole UI re-themes with **no consumer re-render**.
- **OKLCH lab sliders** mutate `--accent-l/c/h`; `oklch.ts` only needs to compute the *ramp* (tints/shades) and contrast, not full color strings baked into JS.
- **Dual-altitude controls**: inline component radius = `calc(var(--radius-base) * k)`; inline "intent" picks which *semantic* var a component points at. Global change → inline shifts. This is why `--radius-base` and channels must exist before any component is built.
- **Density** scales `--spacing`; only use spacing utilities/tokens, never arbitrary px, or density won't cascade.

`app/theme/tokens.ts` is the typed model (primitive channels → semantic → component tiers) that both `app.css` generation and the `/system` docs + OKLCH lab read from.

## Theme state contract (cookie + URL)

- A single typed `ThemeState` (mode, accent l/c/h, radius-base, density, font pairing id, type ratio, variable-font axes), with a **version field**.
- Compact serialize/deserialize (`app/theme/theme-state.ts`, pure + unit-tested). Persisted in the theme cookie (read in root loader) and optionally `?theme=` (Zod-validated).
- `ThemeProvider` holds it; applies channels as inline `<html>` styles; root loader injects them at SSR for no-FOUC; reset clears the override layer.

## Information architecture (no duplication)

- **Global Drawer** (`<Sheet side="right">`) — the global token controls, available on every page.
- **`/system/*`** — focused didactic labs (color lab, type lab, foundations) with rationale; import `tokens.ts`.
- **`/components/$slug`** — single-component reference with inline controls.
- **`/playground`** — the everything-bench; **composes** the lab control widgets + the gallery matrix, does not reimplement them.
- **`/explore`** — the infinite-canvas experience. **`/before-after`**, **`/colophon`**, **`/`** marketing as planned.

## Cross-cutting requirements

- **Canvas SSR-safety**: `/explore` measures `window`/rects only after mount (client-only render or measure-on-mount); never read `window` during render.
- **Canvas a11y fallback**: a semantic list/card view of the same service/process content (toggle or `prefers-reduced-motion`/no-pointer path), plus focus management when the detail Sheet opens. Required to pass Impeccable a11y detectors.
- **Single `useReducedMotion`** consumed by Motion reveals, Sheet, and canvas fly-in.
- **Determinism**: `maybeFail`/`simulateLatency` accept a seed; chaos off by default; explicit trigger for each error state.

## Master build order (supersedes per-plan orders)

1. **Scaffold**: RR7 (fs-routes, SSR) + Bun + Vite + Tailwind v4 + Base UI; `git init`; Node prod-server target; verify Base UI package/API via context7.
2. **Token contract**: `tokens.ts` + `app.css` channels + `@theme inline`; variable fonts self-hosted; light/dark.
3. **Theming engine**: `ThemeProvider`, `oklch.ts` (ramp + contrast, pure), `theme-state.ts` (serialize, pure), `theme-cookie.server.ts`, root-loader SSR injection, reset.
4. **Impeccable init**: `npx impeccable install` + `/impeccable init` + `document --seed` (PRODUCT.md from locked brand). Re-run `document` after tokens are real.
5. **`<Sheet>`** (Base UI, 4 sides) — unblocks Drawer, mobile nav, canvas detail. Drawer = `Sheet side="right"`.
6. **Primitives + component library** (~24), dogfooded; inline controls wired to the token contract.
7. **Mock backend + forms**: `db.server.ts`, `simulate.server.ts` (seeded), contact action/`<Form>`, fetcher widgets, deferred-loader demo + error boundary.
8. **Labs + playground + `/system`**: OKLCH color lab, type lab, foundations, `/playground` (composes widgets).
9. **Marketing `/`** with Motion scroll reveals.
10. **`/explore`** infinite canvas (custom camera) + a11y fallback + token-driven re-skin.
11. **`/before-after`** reconstruction + reveal slider.
12. **`/colophon`** (references PRODUCT.md/DESIGN.md + process).
13. **Per-surface Impeccable gates** throughout (`shape → critique → audit → polish`), then a **final full-route audit + polish** in light/dark and a drawer-modified token state.
14. **Railway deploy** (Node SSR), verify clean build + no-FOUC + chaos-off defaults.

## Open dependencies (not blockers, decide during build)

- **Brand sign-off**: exact OKLCH channel values + variable-font pairing (+ licensing/self-host via Fontsource). Blocks finalizing `tokens.ts` and `DESIGN.md`; everything else can scaffold against placeholder channels.

## Verification (integration-level)

- Changing a single channel via the Drawer re-themes the entire app, including `/explore`, with **no token-consumer re-render** (verify in React DevTools).
- A `?theme=` link + cookie reproduce an exact configuration at SSR with **no FOUC**; reset restores canonical defaults.
- `/system` swatches/type specimens match `tokens.ts` exactly (no drift) and update when channels change.
- Chaos off by default; each error state is reachable on demand; a seeded run is deterministic across audits.
- `/explore` works pointer + keyboard, has a passing a11y fallback view, and re-skins live with token changes.
- Prod build runs under Node `react-router-serve` on Railway; SSR loaders/actions function; no Bun-server crash.
