# Impeccable Integration

> Companion to `cray-networks-rebrand.md` and `interactive-showcase-wow-layer.md`. This file covers integrating **Impeccable** (`/pbakaus/impeccable`) — a design skill system with ~23 commands, deterministic detector rules, and curated anti-patterns — into the build so design quality is documented, enforced, and visible.

## Context

This repo is a job application for a **design-heavy hiring manager**. Impeccable makes the design rigor *systematic and provable*: it generates design-context docs (PRODUCT.md / DESIGN.md), runs detector-based technical audits (a11y, performance, typography, color, layout), and enables live in-browser iteration. Integrating it both raises quality and becomes visible evidence of process. The individual Impeccable commands are already available as skills in this environment; what's missing is the project-level setup, the live-mode config, and a workflow that uses them as quality gates.

## Locked Decisions

| Decision | Choice |
|---|---|
| Setup path | **Full CLI install + init** (`npx impeccable install` + `/impeccable init`) → PRODUCT.md, DESIGN.md, live-mode config |
| Integration depth | **Per-surface quality gates**: shape → build → critique → audit → polish on every surface |
| Docs as evidence | **Surface PRODUCT.md / DESIGN.md** content from `/colophon` and `/system`; note detector-clean audits |

## What Impeccable provides

- **Setup:** `npx impeccable install`, then `/impeccable init` crawls the repo once and writes:
  - **`PRODUCT.md`** — audience, purpose, voice, design principles (who/what/why).
  - **`DESIGN.md`** — colors, typography, components (how it looks); produced/refined by `/impeccable document`.
  - **`.impeccable/live/config.json`** — live-mode configuration.
- **Plan/build commands:** `shape` (UX/UI brief for a surface), `craft` (end-to-end feature build), `document` (`--seed` on a fresh repo, real run once tokens exist), `extract` (consolidate tokens/patterns into the design system).
- **Quality commands:** `critique` (UX review), `audit <section>` (detector rules across a11y/perf/typography/color/layout), `polish` (final pass), plus atomic refiners (`distill`, `bolder`, `quieter`, `colorize`, `harden`, `animate`, `delight`, `adapt`, `clarify`, `optimize`, `normalize`, `prototype`).
- **`live` mode:** boots a helper, opens the dev-server URL, runs a polling loop, and iterates visually via HMR (uses the available browser tool).

## How it maps to our existing plan

- **PRODUCT.md** is largely pre-decided: warm/human/trustworthy personality, Cray's Central-TX SMB + residential audience, the invite-don't-scold voice, and the design principles (consistency via tokens, accessibility engineered not hoped-for, motion with restraint).
- **DESIGN.md** maps directly onto our OKLCH token tiers, the type system, and the ~24-component library — it becomes the human-readable spec mirroring `app/styles/app.css` + `theme/tokens.ts`.
- **`audit`** enforces exactly the "design-heavy reviewer" bar (typography, color/contrast, layout, a11y, perf).
- **`live`** mode pairs with our RR7 dev server for browser iteration on the marketing page and before/after reveal.
- **`extract`** reinforces the primitive → semantic → component token architecture that the OKLCH lab visualizes.

## Setup sequence (front-loaded, before feature work)

1. Scaffold the RR7 + Bun + Tailwind v4 project (per base plan) so there's a tree to configure.
2. `npx impeccable install` from repo root.
3. `/impeccable init` → generate `PRODUCT.md`, `DESIGN.md`, `.impeccable/live/config.json`. Review and edit PRODUCT.md to encode the brand decisions and the hiring-manager goal.
4. `/impeccable document --seed` (fresh repo) to scaffold DESIGN.md by Q&A; capture our decided tokens/type/components.
5. After the canonical token layer + core primitives exist, re-run `/impeccable document` (no `--seed`) so DESIGN.md reflects the real implemented tokens.
6. Confirm live mode boots against `bun dev` and can screenshot a route.

## Per-surface quality-gate workflow

For each surface — the ~24 components, `/system` (incl. color + type labs), `/playground`, marketing `/`, `/before-after` — run:

1. **`shape`** — generate a short UX/UI brief before building (skip for trivial atomic components).
2. **Build** per the base + wow-layer plans.
3. **`critique`** — UX review; address findings.
4. **`audit <surface>`** — run detectors (a11y/perf/typography/color/layout); fix until clean.
5. **`polish`** — final quality pass; use atomic refiners (`distill`, `harden`, `colorize`, `animate`) as the critique indicates.
6. Use **`live`** mode for visual iteration on the high-touch surfaces (marketing, before/after, playground).

Closing sweep: a full `audit` across all routes + a final `polish`, in both light and dark themes and a couple of drawer-modified token states (to prove the system stays clean under live theming).

## Docs as portfolio evidence

- **`/colophon`** references PRODUCT.md + DESIGN.md and explains the Impeccable-driven process: shaped → built → critiqued → audited → polished, with a note that surfaces pass the detector rules.
- **`/system`** mirrors DESIGN.md's tokens/type/components so the live docs and the generated spec agree.
- Keep PRODUCT.md / DESIGN.md in the repo root (also serves the tooling); the site echoes their content rather than duplicating it.

## New / changed files

```
PRODUCT.md                     strategy: audience, voice, design principles
DESIGN.md                      visual spec: color, typography, components
.impeccable/live/config.json   live-mode configuration
app/routes/colophon.tsx        references PRODUCT.md + DESIGN.md + process note
package.json                   impeccable dev dependency / scripts (from install)
```

## Verification

- `/impeccable init` produced PRODUCT.md, DESIGN.md, and `.impeccable/live/config.json`; PRODUCT.md reflects the brand + hiring-manager goal; DESIGN.md matches the implemented tokens after the real `document` run.
- `live` mode boots against `bun dev`, opens the correct route URL, and captures a screenshot.
- Every surface passes `audit` with no outstanding detector violations, in light AND dark, including at least one drawer-modified token state.
- `/colophon` and `/system` accurately reflect PRODUCT.md / DESIGN.md; no drift between the generated spec and the live system.
- Final full-route `audit` + `polish` sweep is clean before the Railway deploy.
