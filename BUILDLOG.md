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

## Stage 03 - Live theming engine   (tag: stage-03-theming-engine)

**Built:** The real-time theming layer. Pure, unit-tested core (`theme-state.ts` serialize/parse
with Zod validation, `oklch.ts` helpers); a `ThemeProvider` that applies the override layer as
inline CSS vars on `<html>` (so consumers never re-render); cookie persistence read in the root
loader and injected at SSR for no FOUC; a shareable `?theme=` link; and a global control Drawer
(mode, accent hue/chroma/lightness, radius, density) with reset.
**Why:** The "click a switch, the whole product re-themes instantly" experience is the centerpiece
pillar, and it elevates everything already built (all components re-theme at once).
**Demonstrates:** Real-time switching/toggling; systems thinking; SSR-correct, flash-free theming.

## Stage 05 - Sheet   (tag: stage-05-sheet)

**Built:** A direction-aware `<Sheet>` (top/right/bottom/left) on the Base UI Dialog primitive
(focus trap, scroll lock, Escape, aria). The global theme Drawer is `Sheet side="right"`.
**Why:** One accessible primitive powers the Drawer, future mobile nav, and canvas detail panels.
**Demonstrates:** Composable, accessible overlay engineering; dogfooding (the Drawer uses it).

## Stage 09 - Marketing page   (tag: stage-09-marketing)

**Built:** The Cray rebrand landing at `/`: hand-coded SVG `<Logo />` (network-node "C"), sticky
nav, hero with a single clear CTA, services grid, "why Cray" values, service-area band, a working
contact CTA, and a footer, all composed from the design-system components and re-theming live via
the Drawer. Subtle scroll reveals via Motion through a shared `useReducedMotion` (reduced motion
renders static). Replaces the token-preview scratch route.
**Why:** This is the surface a reviewer lands on first; it has to read as a believable, better Cray
and prove the components hold up in a real composition.
**Demonstrates:** Brand identity, restraint, typography, and the design system dogfooded end to end.

## Stage 08 - Studio (type lab + token system)   (tag: stage-08-studio)

**Built:** `/admin/studio`, the typography and token showcase. A live type lab with real
variable-font controls (family, weight, optical size, modular scale ratio, line height, tracking,
measure) driving a specimen and a modular scale ramp via `font-variation-settings`; plus an OKLCH
token ramp whose swatches read canonical values straight from `tokens.ts` (now extended to model
the status colors), so the docs cannot drift from what ships.
**Why:** Typography and token architecture are the project's loudest pillars; they needed a surface
that flexes the craft, not just a marketing page that consumes it.
**Demonstrates:** Deep typographic control (genuine optical-size axis), and the token system made
legible and inspectable.

## Stage 11 - Before & after   (tag: stage-11-before-after)

**Built:** `/admin/before-after`, a reveal-slider comparison. A faithful pastiche of the dated
2003-era Cray site (cyan gradient, competing CTAs, gray stock-photo box, Google+ links) under a
keyboard-operable clip slider against the token-driven rebrand, plus problem-to-fix callouts.
**Why:** The transformation is the heart of the pitch and the material the enriched colophon will
draw on: same business, same blue-and-white identity, finally systematized.
**Demonstrates:** The thesis made visible, and honest framing (the before is reconstructed, not
strawmanned).

## Stage 06 - Component library   (tag: stage-06-components)

**Built:** The Base UI library completed to 26 components, dogfooded into the gallery at
`/admin/components` (live preview, API, and accessibility notes each). Added Textarea, Select, Radio
group, Slider, Field, Menu, Breadcrumbs, Accordion, Popover, Toast, Table, Progress, and Skeleton, on
Base UI primitives where they exist and plain elements otherwise, all token-driven.
**Why:** A credible design system covers the real surface area, not just the pieces the marketing page
happened to need.
**Demonstrates:** Breadth and consistency of the system; accessible primitives wired to the tokens.

## Stage 07 - Simulated data + forms   (tag: stage-07-forms)

**Built:** A real RR8 full-stack form. A `/contact` resource route with a server `action` (Zod
validation, field errors) wired to `ContactForm` via `fetcher.Form` (pending state, success/error
banners). Failures are deterministic and opt-in, not RNG: `app/mock/simulate.server.ts` exposes
seeded `maybeFail(~25%)`/`simulatedLatency` (unit-tested), gated behind a "flaky connection" checkbox
or `?chaos=1`. The quote route streams a deferred stat via Suspense/`Await`.
**Why:** The full-stack interaction layer was the biggest missing pillar; this proves loaders,
actions, validation, deferred data, and graceful failure.
**Demonstrates:** RR8 framework-mode data flow; deterministic, auditable chaos.

## Stage 08b - Color lab   (extends tag: stage-08-studio)

**Built:** The OKLCH color lab inside Studio. `oklch.ts` gained ramp generation, sRGB conversion with
gamut detection, WCAG contrast/level, and an APCA Lc estimate (tested). The lab reads the live accent
from the Drawer (no duplicate controls) and renders a lightness ramp, a primitive -> semantic ->
consumer cascade, and AA/AAA + APCA readouts for the key pairings, all updating as you theme.
**Why:** "Token architecture" is a headline claim; it needed a surface that shows the cascade and
proves contrast is engineered, not hoped for.
**Demonstrates:** OKLCH ramp math, the token cascade made visible, and live accessibility readouts.

## Stage 12 - Behind the rebrand   (tag: stage-12-colophon)

**Built:** The colophon reimagined as a scroll-driven celebration at `/admin/behind-the-rebrand` (the
standalone before/after route folded in): thesis opener, the reveal slider as centerpiece with
problem-to-fix callouts, count-up stats, decisions-and-why beats, a live-token section, a tagged
build-stage timeline, and an interactive logo showcase (zoom + annotated anatomy). Renamed from
"colophon" so a non-design audience understands it.
**Why:** The transformation deserved a real narrative surface, not a flat documentation page.
**Demonstrates:** Scroll-triggered storytelling; the brand argument, evidenced by the build itself.

## Stage 14 - Deploy   (tag: stage-14-deploy)

**Built:** Production on Railway. A Bun-build / Node-serve multi-stage Dockerfile (Bun installs and
builds; Node runs `react-router-serve`, avoiding the Bun + react-router-serve crash; glibc
throughout), builder pinned via `railway.json`. The service is connected to this GitHub repo, so every
push to `main` auto-deploys. Live at https://cray-networks-rebrand.up.railway.app.
**Why:** A portfolio piece has to be reachable, and the pipeline itself is part of the craft.
**Demonstrates:** Container/runtime reasoning and a push-to-deploy workflow.

## Stage 15 - 2056 future mode   (tag: stage-15-future-mode)

**Built:** A bonus beyond the plan: an `era` flag and a bottom-right pill that flip the whole site
into a holographic future-OS via an `.era-2056` class skin, morphing OKLCH colors (animated `--iris`),
Space Grotesk + mono (lazy-loaded), a persistent HUD shell, a Cmd-K command palette, cross-route view
transitions, a terminal boot sequence, a Canvas grid + orbital-core hero, and OS-window modals. Same
content, different world; all reduced-motion safe and SSR-safe.
**Why:** To push the "real-time switching" pillar past a reskin into a genuinely different experience.
**Demonstrates:** The token engine taken to its limit, kept as one cohesive system.

## Not built / deferred (honest gaps)

The `/explore` infinite canvas (stage 10) and a dedicated `/playground` matrix were not built.
Impeccable produced `PRODUCT.md` but `DESIGN.md` and the live config were not generated (stage 04 was
integration, not a formal staged build). A final one-time audit gate (stage 13) is ongoing rather than
a single pass. Routing is config-based in `app/routes.ts`, not the planned fs-routes flat convention.
