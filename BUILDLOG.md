# Build Log

The chronological, layer-by-layer story of how this rebrand was built. Each stage maps to an
annotated `stage-NN-slug` git tag. See `plans/commit-strategy.md` for the convention.

## Stage 01 - Scaffold and tooling   (tag: stage-01-scaffold)

**Built:** React Router 8 framework-mode app (Vite, Tailwind v4, Base UI) plus Spec Kit and the
Impeccable design skill; Bun lockfile; package named.
**Why:** Establish the substrate the staged build sits on, with the chosen toolchain.
**Demonstrates:** Modern full-stack setup; intentional tooling.

## Stage 02 - Token contract   (tag: stage-02-tokens)

**Built:** The canonical OKLCH token system. `app/theme/tokens.ts` is the typed source of truth
(primitive channels -> semantic -> foundation); `app/app.css` declares the channels in `:root` /
`.dark` and maps them into Tailwind via `@theme inline` so utilities stay override-able. Self-hosted
the variable fonts (Hanken Grotesk headings, Literata body) via Fontsource.
**Why:** The token contract is the linchpin: composable channels exposed through `@theme inline` are
what make instant live theming possible later without re-rendering consumers (Principle I/II).
**Demonstrates:** Token-system architecture; the foundation of the live theming engine. Refined
Cray blue/white in OKLCH with a navy-tinted dark mode they never had, plus an amber pop.
