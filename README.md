# Cray Networks — rebrand

A rebrand of [Cray Networks](https://www.craynetworks.com/), a Central Texas IT shop, built as a
design-engineering portfolio piece. The bar is "this person understands how design systems
function," demonstrated live: **typography**, **token architecture**, and **real-time theming**
you can drive yourself.

**Live:** https://cray-networks-rebrand.up.railway.app

## Highlights

- **Live theming engine.** The canonical OKLCH tokens in `app/app.css` are never mutated at
  runtime; a Context override layer writes inline CSS vars on `<html>`, so the whole UI re-themes
  instantly with no consumer re-renders. State persists in a cookie read by the root loader (no
  FOUC) and is shareable via `?theme=`. Drive it from the **Theme** drawer (Tokens / Type / Hero).
- **2056 mode.** A bottom-right **2056** pill flips the entire site into a holographic future-OS via
  an `.era-2056` class skin: morphing OKLCH colors, Space Grotesk + mono (lazy-loaded), a persistent
  HUD shell, a Cmd-K command palette, cross-route view transitions, a boot sequence, and a Canvas
  grid + orbital-core hero. Same content, different world. All of it is reduced-motion safe.
- **~13-component Base UI library**, dogfooded into every page and browsable at `/admin/components`.
- **`/admin/behind-the-rebrand`** — a scroll-driven case study (before/after reveal, interactive
  logo anatomy, the decisions and why, a build-stage timeline).

## Stack

React Router 8 (framework mode, **SSR**) · Vite · Tailwind v4 · Base UI · Motion · D3
(`d3-force`/`d3-delaunay`) · OKLCH design tokens · Impeccable (design tooling). **Bun** for
install/dev/build/scripts; **Node** runs the production SSR server (`react-router-serve`).

## Commands

```bash
bun install          # install dependencies
bun dev              # dev server at http://localhost:5173
bun run build        # production build
bun run start        # production SSR server (react-router-serve, Node)
bun run typecheck    # react-router typegen + tsc
bun run test         # vitest (co-located *.test.ts)
```

## Deploy

Deployed on **Railway**, connected to this GitHub repo: **every push to `main` auto-deploys**.
The build uses a multi-stage `Dockerfile` that installs and builds with **Bun** but serves on
**Node** (`react-router-serve` crashes under Bun); glibc throughout so Bun-installed native deps
stay compatible. The builder is pinned to `DOCKERFILE` via `railway.json`.

## Repository

See `CLAUDE.md` for architecture and conventions, `plans/` for the planning set, and `BUILDLOG.md`
for the stage-by-stage build narrative. The git history is intentionally part of the work.
