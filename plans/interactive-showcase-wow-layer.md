# Cray Networks Rebrand — Interactive Showcase / Wow Layer

> Companion to `cray-networks-rebrand.md`. That file covers the base rebrand (brand, components, marketing, before/after). This file covers the **interactive layer built to impress a design-heavy hiring manager**, since this project doubles as a job application.

## Context

This repo is effectively a **job application** aimed at a **design-heavy hiring manager**. The bar is "this person clearly understands how design systems function and what modern tooling can produce." Three things must be undeniably strong and shown off *live*: **typography**, **token / token-system architecture**, and **effortless real-time switching/toggling**.

Signature experience: a **Storybook-style live system** where the viewer clicks switches and watches the entire real product re-theme instantly, with zero jank.

## New Locked Decisions (this layer)

| Decision | Choice |
|---|---|
| Control surface | Global slide-in **Drawer** (foundation tokens) + **inline** controls (component props) |
| Theming engine | Canonical CSS untouched; Context override layer; inline CSS-var overrides; cookie persistence via root loader (flash-free) |
| Color controls | Live **OKLCH ramp generation** + primitive→semantic→component cascade + live contrast |
| Typography | **Full type lab**: modular-scale ratio, variable-font axes, live pairing, leading/measure/tracking |
| Pitch layer | `/colophon` page documenting decisions + systems thinking |

## Live theming engine — illusion of change, no source mutation

Canonical tokens in `app/styles/app.css` (`@theme` / `:root` / `.dark`) are the *shipped* system and are **never mutated at runtime**. A live override layer sits on top:

1. **`ThemeProvider` (React Context)** holds working override state: mode, accent hue/chroma/lightness, base radius, density, font pairing, type-scale ratio, variable-font axes.
2. **Apply via inline CSS variables on the root element** (`document.documentElement.style.setProperty('--accent-h', …)`). Inline styles outrank `:root`, so the whole UI re-themes instantly and **consumers never re-render** — they just read CSS vars. This is what makes it feel like Storybook controls.
3. **OKLCH ramp math runs in JS** from hue/chroma/lightness inputs and emits override values; zero file changes.
4. **Persistence via cookie, read in the RR8 root loader** → correct theme injected as inline style **server-side, no FOUC**, survives reload, link-shareable.
5. **Reset to defaults** clears the override layer, revealing the canonical system underneath (a deliberate proof point).

## Control taxonomy — the systems-expertise flex

The *placement* of each control is itself the demonstration. Deciding rule: **scope of effect.**

- **Global Drawer = foundation/token layer.** Cross-cutting knobs that cascade everywhere: color mode, accent OKLCH ramp, base radius scale, density/spacing scale, font pairing, type-scale ratio, contrast/reduced-motion. A "design system control room" mapped onto primitive + semantic tokens. Slides in/out, collapsible, available on **every page** so the viewer can re-theme the *real product* (marketing, before/after) live.
- **Inline controls = component/instance API layer.** Scoped, local props that show a single component's flexibility without leaking: a banner's tone, a button's variant/size, a card's elevation, an element's corner radius.
- **Dual-altitude controls are the highlight.** Some controls live at *both* layers intentionally: the Drawer sets the **base radius token**, while a banner exposes an inline `sm/md/lg/full` choice expressed as a multiple of that base — so dragging the global radius shifts the inline "lg" with it. Same for color: global hue drives the ramp; inline "intent" picks which *semantic* token a component points at. This live linkage (foundation cascading into local override) reads as "understands token architecture, not just CSS." Surface it as an explicit teaching note in the docs.

## Typography (full type lab) — FLAGSHIP SURFACE

Typography is the single most emphasized thing in this build (PRODUCT.md principle: *typography carries the brand*). The type lab is a hero surface, not a docs afterthought, and every control re-renders the real type instantly through the same CSS-var override engine (Principle II), so nothing is a mockup. Requires **variable fonts** so the axes are real.

**Global type controls (Drawer, foundation layer, cascade app-wide):**

- Font pairing swap (heading family x body family)
- Base/root font size
- Modular scale ratio (1.2 to 1.5; Impeccable floor is >= 1.25, flat scales read as uncommitted)
- Variable-font axes exposed by the chosen faces: weight, and optical size / grade / slant where available
- Global leading (line-height) and tracking (letter-spacing)
- Density (spacing rhythm around type)

**Per-specimen / inline controls (scoped to one specimen, the lab's playground):**

- Size per role (display / h1 / h2 / h3 / body / caption / mono)
- Leading (line-height) per role
- Tracking (letter-spacing); display floor >= -0.04em per Impeccable
- Measure (line length in ch), with the 65 to 75ch comfort range marked
- Paragraph spacing / vertical rhythm
- Weight and optical size (variable axes)
- Text color: pick which semantic ink token (ink / muted / accent-on-surface) with a live APCA + WCAG contrast readout, so "configure the color of type" is tied to the token system and proven legible
- Case (none / upper / small-caps), alignment, and `text-wrap` (balance on h1 to h3, pretty on prose)

**Specimen views:** full scale ramp, a paragraph set at the chosen measure, a weight waterfall, and a pangram, each updating live. Specimen also shows the pairing rationale and the resolved values (size/leading/tracking/measure) as readable output, so the viewer sees the system, not just the result.

**Built-in good-typography guardrails** (so the lab teaches, and can't be dragged into slop): cap measure at 65 to 75ch, ratio >= 1.25, display tracking >= -0.04em, hero clamp max <= ~6rem, and add 0.05 to 0.1 line-height for light-on-dark. Surface these as gentle annotations when a control approaches a limit.

**Font decision (resolved):** pairing is **Hanken Grotesk** (headings) x **Literata** (body). Inter was dropped because Impeccable's brand register lists it (and Space Grotesk, Fraunces) as reflex-reject defaults, and Cray has no committed brand font to preserve. Literata is a warm variable serif with a genuine `opsz` + `wght` axis (not reflex-rejected), so the lab's optical-size control is real. Alternative on file if an all-sans look is later preferred: Roboto Flex (also `opsz`).

## OKLCH color lab

Lightness/chroma/hue sliders regenerate the entire ramp live in OKLCH (perceptually even). A visible **primitive → semantic → component cascade** graph shows how one primitive change flows outward, with live APCA/WCAG contrast readouts on key pairings to prove accessibility is engineered, not hoped for.

## New / changed files

```
app/
  root.tsx                     ThemeProvider, cookie->inline-vars at SSR, global Drawer mount
  theme/
    ThemeProvider.tsx          Context: override state + apply via setProperty
    tokens.ts                  token model (primitive/semantic/component tiers)
    oklch.ts                   ramp generation + contrast (APCA/WCAG) helpers
    theme-cookie.server.ts     read/write theme cookie for root loader
  components/controls/         Drawer, control widgets (sliders/toggles), inline control wrappers
  routes/
    playground.tsx             Flagship lab: full controls + component matrix
    system.color.tsx           OKLCH lab: ramp gen + cascade graph + contrast
    system.type.tsx            Full type lab
    colophon.tsx               Decisions, tradeoffs, systems thinking (the pitch)
```

## Build order (this layer)

1. Build the **theming engine** first (`ThemeProvider`, `oklch.ts`, `theme-cookie.server.ts`, root-loader SSR injection, reset) — unblocks everything.
2. Build the global **Drawer** (foundation controls) + inline control wrappers; prove live re-theme with no consumer re-render.
3. Wire inline controls into each gallery component.
4. Build `/playground` (flagship matrix), `/system` color lab, `/system` type lab.
5. Write `/colophon`.

## Verification (this layer)

- Drawer controls re-theme the **entire app instantly**; React DevTools confirms token consumers do **not** re-render on token change (only CSS vars update).
- Reload with a configured theme: **no FOUC** (cookie applied at SSR); `?theme=` link reproduces the exact setup; reset restores canonical defaults.
- OKLCH sliders regenerate the full ramp; cascade graph updates primitive→semantic→component; contrast readouts update live and flag failures.
- Type lab: ratio + variable axes + pairing re-render the real scale instantly.
- Inline vs global linkage: dragging global radius shifts a banner's inline "lg"; changing global hue shifts inline "accent" demos.
- `prefers-reduced-motion` respected throughout.
