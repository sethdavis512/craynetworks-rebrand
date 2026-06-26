# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status: built & deployed

The app is built and live on **Railway** (https://cray-networks-rebrand.up.railway.app), **auto-deployed on every push to `main`** (the service is connected to this GitHub repo). The **code is the source of truth**; `plans/` is the historical planning set and `BUILDLOG.md` narrates the build. The plans describe some things that were renamed or built differently, trust the code on any conflict. Notably: tokens live in **`app/theme/tokens.ts`** (the canonical typed model) and **`app/app.css`** (the CSS vars), the plan's `app/styles/app.css` path is just `app/app.css`; the system/colophon surfaces became **`/admin/components`**, **`/admin/studio`** (type + color lab), and **`/admin/behind-the-rebrand`**; routing is config-based in `app/routes.ts` (the chosen convention, this is correct, not a deviation); the `/explore` canvas was not built.

**Visual changes must be verified in a real browser with `agent-browser`** (screenshot + computed-style check) before claiming they work, per the global rule. Don't reason about rendering blind.

- `plans/00-architecture-and-integration.md` — cross-cutting contracts (token model, SSR/runtime, routing, animation policy, source-of-truth, determinism) and the master build order.
- `plans/cray-networks-rebrand.md` — base rebrand: brand identity, ~24-component Base UI library, marketing page, before/after.
- `plans/interactive-showcase-wow-layer.md` — live theming engine, global Drawer vs inline controls, OKLCH color lab, type lab, `/colophon`.
- `plans/impeccable-integration.md` — Impeccable setup, per-surface quality gates, PRODUCT.md/DESIGN.md as evidence.
- `plans/simulated-data-and-dynamic-interactions.md` — simulated RR8 data/forms, `/explore` infinite canvas, direction-aware `<Sheet>`.
- `plans/brand-direction.md` — signed-off brand: refined Cray blue/white in OKLCH, amber pop, Hanken Grotesk x Literata.
- `plans/commit-strategy.md` — layer-by-layer commit convention, stage tags, and the `BUILDLOG.md` narrative.

## What this project is

A rebrand of a **real** business, [Cray Networks](https://www.craynetworks.com/) (a Central Texas IT shop), built as a portfolio piece / job application aimed at a **design-heavy hiring manager**. The quality bar is "this person understands how design systems function," demonstrated live. Three things must be excellent and shown off interactively: **typography**, **token/token-system architecture**, and **real-time switching/toggling**.

## Stack & runtime

React Router 8 (framework mode, **SSR**, `@react-router/fs-routes` flat convention) · Vite · Tailwind v4 · Base UI · Motion · OKLCH design tokens · Impeccable (design tooling) · Railway (deploy).

- **Bun** for install, dev, build, scripts, and tooling.
- **Node + `react-router-serve`** for the production SSR server (avoids the known Bun + react-router-serve crash). The app is SSR, not static, because the theme cookie loader, form actions, and deferred loaders need a server.

## Commands

- `bun install` — install deps
- `bun dev` — dev server (also what Impeccable `live` mode and `/run` drive)
- `bun run build` — production build; prod server runs on Node via `react-router-serve`
- RR8 typegen runs via build/dev; route types come from `./+types/<route>`
- Tests: vitest, co-located (`*.test.ts(x)`); single file via `bun run test <path>`. Prioritize the pure functions: OKLCH ramp/contrast (`oklch.ts`), theme (de)serialize (`theme-state.ts`), `screenToCanvas`, Zod schemas.

## Core architecture (the parts that span files)

**The token contract is the linchpin — read `00-architecture` before touching tokens.**

- `app/theme/tokens.ts` is the **canonical** typed token model (primitive OKLCH channels → semantic → component tiers). `app/styles/app.css` declares them as CSS vars; `/system` docs import `tokens.ts` directly so docs cannot drift; `DESIGN.md` is derived.
- Tokens are authored as **composable OKLCH channels** (`--accent-l/c/h`, `--radius-base`, `--spacing`) and exposed via **`@theme inline`** so Tailwind utilities emit `var()` references and stay override-able. Plain `@theme` would bake literals and break live theming.
- **Live theming engine**: `app/theme/ThemeProvider.tsx` holds a runtime override layer (mode, accent l/c/h, radius-base, density, font pairing, type ratio, variable-font axes) and applies it as **inline CSS vars on `<html>`** (`document.documentElement.style.setProperty`). Inline styles outrank `:root`, so the whole UI re-themes instantly and **token consumers do not re-render** — they only read CSS vars. Never route token values through React state into component props.
- **Persistence**: a versioned `ThemeState` (`app/theme/theme-state.ts`, pure) stored in a cookie read by the **root loader** (`theme-cookie.server.ts`) and injected as inline style at SSR for no FOUC; optional `?theme=` (Zod-validated). Reset clears the override layer.

**Control taxonomy (scope of effect decides placement):**

- Global Drawer (`<Sheet side="right">`) = foundation/token layer, cascades app-wide, on every page.
- Inline controls = a single component's own props (variant, tone, radius), scoped and non-leaking.
- Dual-altitude controls are deliberate: inline radius = `calc(var(--radius-base) * k)`; inline intent picks which semantic var a component points at. Global change shifts inline. `--radius-base` and channels must exist before any component is built.

**Component library** (`app/components/ui/`): Base UI primitives where they exist; plain elements only where Base UI has none (Button, Card, Badge, Table). Dogfooded into every page.

**Animation policy** (three systems, kept in lanes): Motion = scroll-reveal / page-level only; Base UI `data-state` + CSS transforms = `<Sheet>` (no Motion spring); custom pointer+transform = `/explore` canvas. One shared `useReducedMotion` consumed by all three.

## 2056 "future mode" (the `era` flag)

A second skin lives alongside the present-day site. `ThemeState.era` (`"standard" | "2056"`) is toggled by the bottom-right **2056** pill (`app/components/controls/EraToggle.tsx`) and applies an **`.era-2056` class on `<html>`** (ThemeProvider suppresses the present-day inline token overrides so the curated class skin wins; root.tsx sets it at SSR too). The skin lives at the end of `app/app.css`: a holographic OKLCH palette whose hue rides an animated `@property --iris` (a unitless **`<number>`** — it is added to a bare hue in `oklch(... calc(H + var(--iris)))`, so it must never be an `<angle>`, that mix is invalid CSS and silently breaks the dependent tokens to transparent). The global future-OS layer (`app/components/era/`) renders only in 2056: `Era2056Shell` (HUD), `SpaceField` (Canvas grid), `CommandPalette` (Cmd-K), with a bespoke `Home2056` (Voronoi/orbital hero, decode text). All era effects are reduced-motion safe and client-gated (SSR-safe).

## Conventions

- Load the `react-router-framework-mode` skill before route work. Routes import loader/action types from `./+types/<route>`; validate search params and `?theme=` with Zod; keep server/sensitive logic in `*.server.ts`.
- Component conventions: export CVA variant configs alongside components; merge classes with `cn()`; use `data-[disabled]` / `hover:not-data-disabled` (Base UI sets data attributes, not `:disabled`); `bg-surface` not `bg-white`; `forwardRef` only when a DOM ref is needed (set `displayName`). Named function components, named exports, no default exports.
- **Color is OKLCH only** (no hex/rgb/hsl), via semantic tokens — never raw Tailwind color utilities (`blue-500`). Spacing/radius via tokens, never arbitrary px, or density/radius controls won't cascade.
- Always ship light AND dark; mobile-first responsive.
- `/explore` canvas: never read `window` during render (measure on mount / client-only); ship the semantic list/card a11y fallback.
- Simulated failures are off by default and seeded/explicitly triggered (`?chaos=1` / a control), never pure RNG, so audits stay deterministic.

## Impeccable workflow

Front-loaded: `npx impeccable install` then `/impeccable init` generates `PRODUCT.md` (strategy/principles), `DESIGN.md` (visual spec), and `.impeccable/live/config.json`. Re-run `/impeccable document` (no `--seed`) after tokens are real. Each surface goes `shape → build → critique → audit → polish`; use `live` mode for high-touch pages. `/colophon` and `/system` surface PRODUCT.md/DESIGN.md as evidence.

## Commits (history is a deliverable)

The git history is part of the portfolio. Commit layer by layer per `plans/commit-strategy.md`: atomic conventional commits whose body explains the why and what it demonstrates, an annotated `stage-NN-slug` tag per completed build stage, and a `BUILDLOG.md` section appended as each stage lands. Prefer manual stage commits; decline the Spec Kit optional auto-commit hooks (or give them meaningful messages) so the narrative stays clean.

## Output style

No em dashes and no double-hyphen separators in prose, copy, or content fields.

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
<!-- SPECKIT END -->
