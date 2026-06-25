# Brand Direction (SIGNED OFF)

> The rebrand is an **enhancement of Cray's existing blue-and-white identity**, not a new direction. Keep the blue, keep the white, refine both into a clean OKLCH system with proper dark mode, and add a small, disciplined set of complementary accents to pop where needed. This file anchors the refined palette in Cray's *actual* current colors. These are now the canonical defaults for `tokens.ts` + `DESIGN.md`.

## Locked decisions

- **Core palette:** refined Cray blue/white in OKLCH (table below), navy-tinted dark mode.
- **Complementary pop:** **Amber** `oklch(0.80 0.12 72)` (dark `0.82 0.12 72`), used sparingly (~5%) for CTAs/highlights. Native to their current template, true complement to the blue.
- **Type pairing:** **Hanken Grotesk** (headings, `wght`) x **Inter** (body, `wght`), self-hosted via Fontsource. A polished evolution of their current sans.
- **Logo:** hand-coded SVG `C` from network nodes/edges + lowercase wordmark, recolors via tokens.

## Cray's current palette (extracted from their template CSS)

From `templates/rt_catalyst/css/style1.css` and friends:

| Role | Current hex | Notes |
|---|---|---|
| Primary brand blue | `#178fc0` | cyan-leaning blue, their main link/brand color |
| Bright sky accent | `#18a7e1` | hover/secondary, brighter azure |
| Deep navy | `#094369` → `#073457` | headers, depth |
| Near-black navy | `#031421` | darkest |
| Backgrounds | `#ffffff` / `#fbfbfb` / `#f7f7f7` | white / off-white |
| Already-present warm tones | `#ffbb65`, `#e7bd72`, `#c76e34` | the template already pops with amber/orange |

Takeaway: the brand is **cyan-blue + navy + white**, and warm amber already lives in their palette as the natural complement. The rebrand keeps all of this and simply makes it coherent and modern.

## Refined core palette (the enhancement)

Same identity, cleaned into composable OKLCH channels. Channels are `oklch(L C H)`; values are starting points, contrast-tuned to **WCAG AA (APCA-checked)** in both modes during build.

| Token | Light | Dark | Anchored on |
|---|---|---|---|
| `primary` (Cray blue) | `oklch(0.58 0.11 232)` | `oklch(0.72 0.11 232)` | `#178fc0` |
| `primary-hover` | `oklch(0.52 0.11 232)` | `oklch(0.78 0.11 232)` | deepened |
| `sky` (secondary/interactive) | `oklch(0.70 0.115 230)` | `oklch(0.76 0.115 230)` | `#18a7e1` |
| `navy` (depth, headings, dark surface) | `oklch(0.34 0.065 242)` | base for dark UI | `#094369` |
| `surface` (base) | `oklch(0.99 0.004 240)` | `oklch(0.19 0.02 245)` | white / `#031421` |
| `surface-2` (raised) | `oklch(0.975 0.005 240)` | `oklch(0.235 0.02 245)` | `#fbfbfb` |
| `ink` (text) | `oklch(0.25 0.02 245)` | `oklch(0.95 0.006 240)` | navy-charcoal |
| `muted` | `oklch(0.52 0.02 245)` | `oklch(0.70 0.014 240)` | |
| `border` | `oklch(0.91 0.008 240)` | `oklch(0.32 0.016 245)` | |

Neutrals carry a whisper of blue (low chroma at hue ~240) so white/grey harmonize with the brand rather than fighting it. **Dark mode is navy-tinted** (built up from `#031421`), so it reads as "Cray at night," not a generic dark theme. The whole point of the before/after: same colors, finally systematized, plus a real dark mode they never had.

## Decision 1 — the complementary pop  → CHOSEN: A (Amber)

One restrained accent for CTAs, highlights, and emphasis (used sparingly, ~5% of surface). Blue's complement sits in the warm 60-80 hue range.

- **A — Amber** `oklch(0.80 0.12 72)` (dark `0.82 0.12 72`). The true complement to the cyan-blue, and already native to their template (`#ffbb65`/`#e7bd72`). Warm, optimistic, highest continuity. **← chosen**
- **B — Coral** `oklch(0.70 0.15 35)`. Warmer/punchier, more energy and modernity, slightly bolder leap.
- **C — Signal green** `oklch(0.72 0.15 150)` as an "uptime/online" accent (doubles as success). Reads very "IT/monitoring," but adds a second hue family to manage.

Status hues (`success ~150`, `info` = the brand blue, `warning ~75`, `danger ~25`) are derived separately in OKLCH regardless of the pop choice.

## Decision 2 — type pairing  → CHOSEN: 1 (Hanken Grotesk x Inter)

Cray currently uses default template sans. An enhancement should feel like a sharpened version of that, clean, legible, professional, so the choice leans **sans** rather than a dramatic serif. All options are variable + open-licensed so the type lab axes are real.

- **1 — Hanken Grotesk x Inter.** Warm geometric-humanist headings + Inter body. Friendly, trustworthy, low-risk; reads as a polished evolution of their current look. Axes: weight. **← chosen**
- **2 — Space Grotesk x Inter.** Headings with subtle technical character (great for an IT brand) + neutral Inter body. A touch more "engineered." Axes: weight.
- **3 — Fraunces x Inter.** Variable serif headings (real optical-size axis, best type-lab demo) + Inter body. The biggest differentiator and the most impressive lab, but the largest deviation from their current sans identity.

## Logo (unchanged approach)

Hand-coded SVG `<Logo />`: a refined `C` from network nodes + edges (ties to the `/explore` canvas), lowercase `cray networks` wordmark. Recolors via tokens (`primary` / `navy` / `currentColor`), so it adapts to light/dark and live Drawer changes with no separate assets. Keeps their blue; just makes the mark intentional.

## Outcome

Signed off: refined core blue/white **+ Amber pop + Hanken Grotesk x Inter**. Maximum continuity with Cray's identity, a single warm accent that's already in their world, and a clean typographic upgrade. Dark mode and the real token system carry the "wow." The before/after thesis: *same brand, finally systematized.* These values are the canonical defaults for `tokens.ts`; `DESIGN.md` is generated to match.
