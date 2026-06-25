# Commit Strategy & Build Log

> The git history is a portfolio artifact. This project is also a job application, and a
> design-heavy hiring manager (plus any engineer who opens the repo) will read the log to see
> *how* it was built. So commits are deliberate, atomic, layer-by-layer, and each one explains the
> why and what it demonstrates. This file is the source of truth for the convention; `CLAUDE.md`
> points here, and the constitution names history as a deliverable.

## Principles

- **One layer per commit.** Each commit is a coherent step that builds, type-checks, and (where
  applicable) passes its tests. No half-finished layers, no "WIP" in the permanent history (squash
  local WIP before committing the layer).
- **Atomic and ordered.** Commits follow the master build order in
  `00-architecture-and-integration.md`. Cleanup/refactor stays in its own commit, separate from
  feature work.
- **Messages teach.** The subject says what; the body says *why* and *what it demonstrates*, because
  the audience reads them. This is the differentiator over a generic log.
- **Stages are tagged.** Each completed stage gets an annotated git tag so the history is navigable
  by chapter. `BUILDLOG.md` narrates the same chapters in prose.

## Message format (Conventional Commits)

```
<type>(<scope>): <imperative subject, <=72 chars, no trailing period>

<body: why this change, what it demonstrates, key decisions. wrap ~72-100 chars.>

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

- **Types:** `feat`, `fix`, `refactor`, `test`, `docs`, `style`, `chore`, `build`, `ci`, `perf`.
- **Scope:** the layer/area, for example `tokens`, `theme`, `sheet`, `ui`, `forms`, `canvas`,
  `system`, `marketing`, `explore`, `colophon`, `deploy`.
- No em dashes or double-hyphen separators in messages (project style).

Example:

```
feat(tokens): author OKLCH channel token contract

Tokens are composable channels (--accent-l/c/h, --radius-base, --spacing) exposed via
@theme inline so Tailwind utilities emit var() references and stay override-able. This is
the foundation that makes instant live theming possible without re-rendering consumers.
```

## Stage map (tag per stage)

Stage numbers mirror the master build order. Tag each on completion with an annotated tag
`stage-NN-slug` (`git tag -a stage-02-tokens -m "Stage 02: token contract"`).

| Tag | Stage | Demonstrates |
|---|---|---|
| `stage-01-scaffold` | RR8 (fs-routes, SSR) + Bun + Vite + Tailwind v4 + Base UI; git; Node prod target | Modern full-stack setup |
| `stage-02-tokens` | OKLCH channel token contract (`tokens.ts` + `app.css` + `@theme inline`); fonts | Token-system architecture |
| `stage-03-theming-engine` | `ThemeProvider`, `oklch.ts`, `theme-state.ts`, cookie loader, SSR injection, reset | Live theming without re-render |
| `stage-04-impeccable` | `impeccable install` + `init` + `document --seed`; PRODUCT.md/DESIGN.md | Design rigor as process |
| `stage-05-sheet` | Direction-aware `<Sheet>` (Base UI); Drawer = `Sheet side="right"` | Accessible primitives |
| `stage-06-components` | ~24-component library + gallery; inline controls wired to tokens | Dogfooded design system |
| `stage-07-forms` | Mock backend (seeded), contact action/form, fetchers, deferred-loader demo | Full-stack RR8 + state matrix |
| `stage-08-system-playground` | OKLCH color lab, type lab, foundations, `/playground` | Typography + token showmanship |
| `stage-09-marketing` | Marketing `/` with Motion scroll reveals | Brand + restraint |
| `stage-10-explore` | `/explore` infinite canvas (custom camera) + a11y fallback | Dynamic interaction craft |
| `stage-11-before-after` | Faithful Cray reconstruction + reveal slider + callouts | The transformation story |
| `stage-12-colophon` | `/colophon` referencing PRODUCT.md/DESIGN.md/BUILDLOG | The meta narrative |
| `stage-13-audit-polish` | Final full-route Impeccable `audit` + `polish`, light/dark/themed states | Verifiable quality |
| `stage-14-deploy` | Railway (Node SSR), no-FOUC, chaos-off defaults | Ships clean |

Per-surface Impeccable gates (`shape -> critique -> audit -> polish`) happen *within* each stage,
not as separate tags.

## BUILDLOG.md (manager-facing, repo root)

Create `BUILDLOG.md` at the repo root and append a section as each stage completes. It is the
prose companion to the tags and feeds `/colophon`.

Template per stage:

```markdown
## Stage 02 - Token contract   (tag: stage-02-tokens)

**Built:** Composable OKLCH channel tokens in tokens.ts + app.css via @theme inline.
**Why:** Utilities must emit var() references so the whole UI is override-able at runtime.
**Demonstrates:** Token-system architecture; the foundation of the live theming engine.
**Key commits:** abc1234..def5678
```

## Spec Kit auto-commit hooks

The `.specify/extensions.yml` `after_*` hooks offer auto-commits. To keep the curated history
clean, prefer **manual stage commits** using this convention and **decline** the optional Spec Kit
auto-commits during the build (or ensure any accepted ones use a conventional, meaningful message).
Do not let phase hooks inject generic "commit after tasks" noise into the narrative.

## Workflow per stage

1. Build the layer (and run its per-surface Impeccable gate where it is a surface).
2. `bun run build` / tests green for that layer.
3. Commit with a teaching message (one commit, or a small atomic cluster).
4. Append the stage section to `BUILDLOG.md`.
5. Annotate the stage tag: `git tag -a stage-NN-slug -m "Stage NN: <title>"`.
6. Push commits and tags (once a remote exists).
