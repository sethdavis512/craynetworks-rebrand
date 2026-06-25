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

## Typography (full type lab)

Live modular-scale ratio control, variable-font axis sliders (weight, optical size), live heading×body pairing swap, and leading/measure/tracking demonstrations, all re-rendering the real type scale instantly through the same override engine. Specimen views show scale, rhythm, and pairing rationale. Requires **variable fonts** so axes are real.

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
