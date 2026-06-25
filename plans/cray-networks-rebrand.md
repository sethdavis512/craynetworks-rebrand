# Cray Networks Rebrand — Design Engineering Showcase

## Context

This repo (`craynetworks-rebrand`) will become a portfolio-grade artifact that proves Seth's range as a **design engineer**: identity design, design-system architecture, documentation craft, and flexible production components, all in one cohesive experience.

The subject is a **real** business: [Cray Networks](https://www.craynetworks.com/), a Central Texas IT shop (Leander/Cedar Park/Austin). Its current site is genuinely dated: cold generic styling, competing CTAs with no hierarchy, defunct Google+ links, no dark mode, weak differentiation. That makes it perfect raw material for an honest, grounded "before → after" transformation rather than a contrived mockup.

The deliverable has four surfaces:
1. **Marketing page** — the new Cray brand done right.
2. **Brand/system documentation** — logo, palette, type, rationale.
3. **Component library** — 20+ flexible, dual-theme Base UI components.
4. **Before/after** — faithful rebuild of the real site with a reveal slider.

Light and dark mode are first-class throughout.

## Locked Decisions

| Decision | Choice |
|---|---|
| Subject | Cray Networks (real IT shop, name kept, identity evolved) |
| Framework | React Router 7 (framework mode), Bun, Vite |
| Styling | Tailwind v4, `@theme` tokens, OKLCH only, `.dark` scope, semantic tokens |
| Components | Base UI primitives, 20+ comprehensive library, dogfooded into the pages |
| Brand direction | Warm, human, trustworthy (break from corporate-blue cliche) |
| Logo | Hand-coded themeable SVG `<Logo />` component, no raster assets |
| Motion | Motion lib, subtle scroll-trigger reveals, respects `prefers-reduced-motion` |
| Marketing page | Standalone polished brand page; transformation story lives separately |
| Before/after | Faithful rebuild of real Cray screens + drag-slider reveal + annotated callouts |
| Deploy | Railway, deploy-ready config |

## Brand Identity Proposal (for sign-off during build)

Documented with rationale on the `/system` pages. Starting proposal, adjustable:

- **Personality:** the local IT expert who treats you like a neighbor, competent but not cold.
- **Palette (OKLCH semantic tokens):**
  - Neutrals: warm sand/cream surfaces in light, warm near-black ink in dark
  - `--color-accent`: deep teal (trust + technical credibility)
  - `--color-highlight`: warm amber (human warmth, the differentiator)
  - Semantic: success / info / warning / danger, all derived in OKLCH for contrast parity
- **Type:** geometric-humanist sans for headings (e.g. Hanken Grotesk / Schibsted Grotesk), clean readable text face for body (e.g. Inter). Final pairing confirmed during build.
- **Logo:** refined `C` mark built from network nodes/edges, lowercase wordmark, recolors via `currentColor`/tokens across themes.

## Tech & Conventions

- Load the `/react-router-framework-mode` skill before any route work (source of truth for RR7 patterns). Routes import types from `./+types/<route>`; validate any search params with Zod.
- Verify the Base UI package name and current component API via **context7** before building (namespace subpath imports, e.g. `import { Dialog } from '<pkg>/dialog'` then `Dialog.Root`, etc.). Use plain elements only where Base UI has no primitive (Button, Card, Badge, Table).
- Follow Seth's component-library conventions: CVA variants exported alongside components, `cn()` for class merging, `data-[disabled]` / `hover:not-data-disabled` modifiers (Base UI sets data attributes, not `:disabled`), `bg-surface` not `bg-white`, `forwardRef` only when DOM ref is needed.
- Bun for everything (`bun install`, `bun dev`). Add `@types/bun` if any scripts are written.

## Site Structure (routes)

```
app/
  root.tsx                     theme provider (.dark class), fonts, <Logo/> in nav
  routes/
    _index.tsx                 Marketing (new Cray brand)
    system._index.tsx          Brand overview + rationale
    system.color.tsx           Palette + OKLCH tokens + contrast notes
    system.type.tsx            Type scale + pairing
    system.foundations.tsx     Spacing, radius, elevation, motion principles, voice
    components._index.tsx       Component gallery index
    components.$slug.tsx        Per-component: demo + variants + props + code + light/dark
    before-after.tsx           Faithful rebuild + reveal slider + callouts
  components/
    ui/                        the design-system components (one file each + CVA + index barrel)
    brand/Logo.tsx             hand-coded SVG mark + wordmark
    site/                      nav, footer, theme toggle, scroll-reveal wrapper
    gallery/                   demo registry powering /components
  styles/
    app.css                    Tailwind v4 entry + @theme token definitions (light + .dark)
```

## Component Library (~24, dogfooded)

- **Forms:** Button, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider, Field/Label
- **Navigation:** Tabs, Menu/DropdownMenu, Breadcrumbs, Accordion
- **Overlays:** Dialog, Popover, Tooltip, Toast
- **Data display:** Card, Badge, Avatar, Table, Separator, Progress
- **Feedback:** Alert, Skeleton

Each appears in the gallery with: live interactive demo, variant matrix (size/intent/state), light+dark rendering, a props table, and a copyable usage snippet. The marketing, system, and before/after pages are built **from these same components** to prove they're real and flexible.

## Marketing Page Sections (`/`)

New-brand-only, subtle scroll-trigger reveals: sticky nav (Logo + theme toggle), hero with clear single CTA, services grid (computer repair, IT/network management, hosting, web dev), "why Cray" value props (warmth + clarity + trust), social proof / service-area band, contact/quote CTA, footer. No before/after here.

## System Docs (`/system`)

Brand story & rationale (the *why* behind each change), logo usage (clearspace, variants, do/don't), color palette with live OKLCH token swatches and light/dark + contrast notes, typography scale and pairing rationale, foundations (spacing, radius, elevation, motion principles, voice & tone), accessibility commitments.

## Before/After (`/before-after`)

Faithfully reconstruct the real Cray homepage hero, services section, and contact area as the **before** (dated styling, competing CTAs, dead social links). A drag slider / toggle reveals the redesigned **after** on the same screens, with annotated callouts mapping each problem to its fix ("five competing CTAs → one clear path", "cold stock blue → warm trustworthy palette", "no dark mode → dual theme"). May fetch additional Cray pages during build to ground the reconstruction.

## Build Sequence

1. Scaffold RR7 + Bun + Tailwind v4 + Base UI; wire theme provider and `.dark` toggle; load RR7 skill.
2. Define OKLCH token layer in `app.css` `@theme` (light + dark); set up fonts.
3. Build `<Logo />` and core primitives (Button, Card, Input, Badge) first; verify Base UI API via context7.
4. Build out the full ~24-component library + gallery registry.
5. Build `/system` docs pages consuming tokens + components.
6. Build the marketing page (`/`) with Motion scroll reveals.
7. Reconstruct the real Cray screens and build the `/before-after` reveal slider + callouts.
8. Accessibility + reduced-motion + light/dark QA pass.
9. Railway deploy config; verify a clean build.

## Verification

- `bun dev` runs cleanly; every route loads with no console errors.
- Toggle theme on every page: tokens flip correctly, contrast holds in both modes, no hardcoded colors.
- Each gallery component: all variants render, interactions work (open/close/select/toggle), keyboard-accessible.
- Before/after slider drags smoothly; callouts align; reconstructed "before" reads as the real Cray site.
- `prefers-reduced-motion` disables scroll animations.
- `bun run build` succeeds; Railway config validated for deploy.
