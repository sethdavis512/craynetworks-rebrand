<!--
SYNC IMPACT REPORT
Version change (1.1.1): PATCH. Factual correction: the scaffold installs React Router 8.0.0,
so "React Router 7" wording was updated to "React Router 8" throughout. No principle or
governance changes.

Version change: 1.0.0 -> 1.1.0
Bump rationale (1.1.0): MINOR. Added governance guidance naming git history as a deliverable
(atomic layer-by-layer commits, per-stage tags, BUILDLOG.md) under Development Workflow & Quality
Gates, sourced from plans/commit-strategy.md. No principles removed or redefined.

Prior (1.0.0): Initial ratification. First concrete fill of the template into a
project-specific constitution derived from the plan set in plans/.

Principles (all newly defined from placeholders):
  I.   Token-Driven, OKLCH-Only Design
  II.  Live Theming Without Re-render
  III. Dual-Theme, Accessible by Default (NON-NEGOTIABLE)
  IV.  Dogfooded, Drift-Free Design System
  V.   Mandatory Per-Surface Quality Gates (NON-NEGOTIABLE)
  VI.  Deterministic, Honest Simulation
  VII. Pure Core, Tested

Added sections:
  - Technology & Architecture Constraints
  - Development Workflow & Quality Gates

Removed sections: none

Templates reviewed:
  - .specify/templates/plan-template.md  ✅ compatible (Constitution Check gate derives
    its gates from this file at plan time; no hardcoded principles to update)
  - .specify/templates/spec-template.md  ✅ no change required (no principle references)
  - .specify/templates/tasks-template.md ✅ no change required (no principle references)
  - .specify/extensions/git/commands/*    ✅ no change required (generic, agent-neutral)

Deferred TODOs: none (RATIFICATION_DATE set to initial adoption date 2026-06-24)
-->

# Cray Networks Rebrand Constitution

This project is a rebrand of a real business, Cray Networks (a Central Texas IT shop),
built as a portfolio piece and job application aimed at a design-heavy hiring manager. Its
purpose is to demonstrate, live and interactively, mastery of typography, token-system
architecture, and real-time theming. The plan set in `plans/` is the source of truth;
`plans/00-architecture-and-integration.md` is the integration spine and wins on any conflict.
This constitution encodes the non-negotiables that every surface MUST uphold.

## Core Principles

### I. Token-Driven, OKLCH-Only Design

All color MUST be expressed in OKLCH and consumed through semantic tokens. Hex, rgb, hsl, and
raw Tailwind color utilities (e.g. `blue-500`) are prohibited in application code. Tokens MUST
be authored as composable channels (for example `--accent-l/c/h`, `--radius-base`, `--spacing`)
and exposed via `@theme inline` so Tailwind utilities emit `var()` references and remain
override-able; plain `@theme` is prohibited because it bakes literals and breaks live theming.
Spacing and radius MUST flow through tokens, never arbitrary pixel values, or density and radius
controls will not cascade. `app/theme/tokens.ts` is the single canonical token model.

Rationale: One composable, var-based token system is what makes instant live theming, dual
themes, and the dual-altitude control story possible at all.

### II. Live Theming Without Re-render

Canonical token definitions in CSS MUST NOT be mutated at runtime. Runtime overrides MUST be
applied as inline CSS custom properties on the document root, so the cascade re-themes the whole
UI and token consumers do NOT re-render. Token values MUST NOT be routed through React state
into component props. Theme persistence MUST use a versioned `ThemeState` stored in a cookie read
by the root loader and injected at SSR to avoid flash of unthemed content; reset MUST clear only
the override layer, revealing the canonical system underneath.

Rationale: The "click a switch, the entire product re-themes instantly with zero jank" experience
is the centerpiece, and it only holds if theming lives in the cascade, not in React renders.

### III. Dual-Theme, Accessible by Default (NON-NEGOTIABLE)

Every surface MUST ship both light and dark themes and MUST be mobile-first responsive. Color
pairings MUST meet WCAG AA, verified with APCA readouts, in both themes. `prefers-reduced-motion`
MUST be honored through a single shared `useReducedMotion` consumed by all animation systems.
Spatial or pointer-driven interfaces (for example the `/explore` canvas) MUST ship a semantic
keyboard- and screen-reader-accessible fallback view of the same content.

Rationale: A design-heavy reviewer will probe accessibility first; inclusivity is part of the
quality bar, not an add-on.

### IV. Dogfooded, Drift-Free Design System

Components MUST be built on Base UI primitives where they exist, using plain elements only where
Base UI has none (Button, Card, Badge, Table). Components MUST export CVA variant configs and
merge classes with `cn()`. The same library MUST compose every page (marketing, system, explore,
before/after); nothing ships bespoke that the system could provide. Documentation under `/system`
MUST import `tokens.ts` directly so docs cannot drift from reality, and `DESIGN.md` MUST be
derived, never hand-authored to diverge.

Rationale: A design system is only credible if it is real, used everywhere, and provably in sync
with its own documentation.

### V. Mandatory Per-Surface Quality Gates (NON-NEGOTIABLE)

Every surface MUST pass the Impeccable workflow `shape -> build -> critique -> audit -> polish`
before it is considered done. No surface MAY ship with outstanding detector violations
(accessibility, performance, typography, color, layout) in light mode, in dark mode, or under a
drawer-modified token state. A final full-route `audit` plus `polish` sweep MUST pass before any
deploy.

Rationale: The project's thesis is provable design rigor; gates make rigor verifiable rather than
asserted.

### VI. Deterministic, Honest Simulation

The application is server-rendered (SSR). Routes MUST follow React Router 8 framework-mode
conventions: loaders and actions for data and mutations, types imported from `./+types/<route>`,
search and `?theme=` params validated with Zod, and server or sensitive logic confined to
`*.server.ts`. Simulated data and simulated failures MUST be off by default and MUST be
seedable or explicitly triggered (for example `?chaos=1` or a control), never pure runtime
randomness, so demos read intentionally and audits stay deterministic.

Rationale: Realistic interaction proves full-stack range, but nondeterministic failure makes
audits flaky and can read as a real bug during a live review.

### VII. Pure Core, Tested

Pure logic MUST be separated from I/O and unit-tested with vitest, co-located with the source.
The highest-priority units are OKLCH ramp and contrast math (`oklch.ts`), theme serialize and
deserialize (`theme-state.ts`), `screenToCanvas` and camera math, and Zod schemas. Pure functions
MUST NOT call `Date.now()`, `Math.random()`, or other ambient sources at module scope; such inputs
MUST be passed in so behavior is deterministic and testable.

Rationale: The interesting correctness lives in small pure functions; isolating them keeps the
system testable and reinforces Principle VI.

## Technology & Architecture Constraints

- Stack: React Router 8 (framework mode, SSR, `@react-router/fs-routes` flat convention), Vite,
  Tailwind v4, Base UI, Motion, OKLCH design tokens, Impeccable design tooling, Railway deploy.
- Runtime: Bun for install, dev, build, scripts, and tooling; Node with `react-router-serve` for
  the production SSR server (avoids the known Bun + react-router-serve crash).
- Animation policy (three lanes, kept separate): Motion for scroll-reveal and page-level effects
  only; Base UI `data-state` plus CSS transforms for `<Sheet>` (no Motion spring); custom pointer
  plus transform for the `/explore` canvas.
- Control taxonomy: the global Drawer (`<Sheet side="right">`) hosts foundation/token controls
  that cascade app-wide; inline controls host a single component's own scoped props; dual-altitude
  controls (for example inline radius derived from `--radius-base`) are deliberate and MUST be
  preserved.
- Source of truth: the plan set in `plans/` governs scope and design; `00-architecture-and-
  integration.md` supersedes the other plans on conflict. Brand values are signed off in
  `plans/brand-direction.md` (refined Cray blue/white in OKLCH, amber pop, Hanken Grotesk x Inter).

## Development Workflow & Quality Gates

- Build order follows the master sequence in `00-architecture-and-integration.md`: token contract
  and theming engine first, then Impeccable init, `<Sheet>`, the component library, simulated
  data and forms, the labs and playground, marketing, `/explore`, before/after, colophon, then the
  audit sweep and deploy.
- Impeccable gates (Principle V) run per surface; `live` mode is used for high-touch pages.
- CLAUDE.md is the runtime guidance for future sessions and MUST stay consistent with this
  constitution and the plan set; update it when a change would make it wrong.
- Prose, copy, and content fields MUST NOT use em dashes or double-hyphen separators.
- Leave-it-better: fix obvious nearby problems when already editing a file; keep cleanup commits
  separate from feature work.
- History is a deliverable: commits MUST be atomic and layer-by-layer with messages that explain
  the why, each build stage MUST be tagged, and `BUILDLOG.md` MUST narrate the stages, per
  `plans/commit-strategy.md`.

## Governance

This constitution supersedes other practices for this repository. Amendments MUST be made by
editing this file, MUST be documented in the Sync Impact Report comment at the top, and MUST
re-version according to semantic versioning: MAJOR for backward-incompatible principle removals or
redefinitions, MINOR for a new principle or materially expanded guidance, PATCH for clarifications
and non-semantic refinements. When principles change, the dependent Spec Kit templates
(`plan-template.md`, `spec-template.md`, `tasks-template.md`) and `CLAUDE.md` MUST be reviewed and
realigned in the same change.

Compliance is verified per surface through the Impeccable `audit` gate and the verification
sections of the plan files; the Constitution Check gate in `plan-template.md` MUST pass before
Phase 0 research and be re-checked after Phase 1 design. Any deviation MUST be justified in the
plan's Complexity Tracking section or the surface MUST be brought into compliance. Use `CLAUDE.md`
for day-to-day runtime development guidance.

**Version**: 1.1.1 | **Ratified**: 2026-06-24 | **Last Amended**: 2026-06-24
