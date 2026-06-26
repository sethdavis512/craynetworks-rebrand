---
name: Cray Networks
description: Warm, engineered local-IT brand, the Cray blue-and-white identity finally systematized in OKLCH.
colors:
  cray-blue: "oklch(0.58 0.11 232)"
  cray-blue-deep: "oklch(0.52 0.11 232)"
  cray-blue-strong: "oklch(0.46 0.11 232)"
  sky: "oklch(0.7 0.115 230)"
  navy: "oklch(0.34 0.065 242)"
  amber: "oklch(0.8 0.12 72)"
  surface: "oklch(0.99 0.004 240)"
  surface-2: "oklch(0.975 0.005 240)"
  ink: "oklch(0.25 0.02 245)"
  muted: "oklch(0.52 0.02 245)"
  border: "oklch(0.91 0.008 240)"
  on-primary: "oklch(0.99 0.004 240)"
  success: "oklch(0.55 0.12 150)"
  warning: "oklch(0.72 0.13 75)"
  danger: "oklch(0.55 0.17 25)"
typography:
  display:
    fontFamily: '"Hanken Grotesk Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "clamp(2.75rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  headline:
    fontFamily: '"Hanken Grotesk Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: '"Hanken Grotesk Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: '"Literata Variable", ui-serif, Georgia, serif'
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: '"Hanken Grotesk Variable", ui-sans-serif, system-ui, sans-serif'
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "0.3125rem"
  md: "0.625rem"
  lg: "1rem"
  xl: "1.5rem"
spacing:
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.cray-blue}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "0 1.5rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.cray-blue-deep}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "3rem"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "2.5rem"
    padding: "0 0.75rem"
  card:
    backgroundColor: "{colors.surface-2}"
    rounded: "{rounded.lg}"
    padding: "1.5rem"
  badge-primary:
    textColor: "{colors.cray-blue-strong}"
    rounded: "{rounded.xl}"
    padding: "0.125rem 0.625rem"
---

# Design System: Cray Networks

## 1. Overview

**Creative North Star: "The Neighborly Utility"**

Cray Networks is the local IT expert who treats you like a neighbor: warm and plain-spoken, yet engineered with the precision of serious tooling. The system reads as dependable infrastructure with a human face, not an enterprise dashboard and not a generic MSP template. It is built on continuity: Cray already owned a cyan-leaning blue, a deep navy, and white, and this system keeps that identity and finally systematizes it in OKLCH, with a real dark mode the old site never had.

Typography carries the brand. Type is the primary expressive instrument, a sans display face (Hanken Grotesk) against a serif reading face (Literata), and hierarchy, rhythm, and reading comfort are treated as first-class. The medium is the proof: the token system, instant live theming, and accessibility are demonstrated rather than claimed. Surfaces are calm and near-white in light mode, navy-tinted in dark, with one disciplined amber accent carried over from Cray's own world.

**Key Characteristics:**
- Warm but precise: neighborly voice, Linear-grade restraint and taut spacing.
- Typography-forward: a genuine serif/sans pairing on real variable-font axes.
- OKLCH-native: every color is a composable channel, so the whole UI re-themes live.
- Continuity over reinvention: enhance the real Cray blue-and-white, do not replace it.
- Accessibility engineered, not hoped for: AA verified with APCA, light and dark, reduced-motion honored.

## 2. Colors

A near-white, brand-tinted neutral base carrying one confident blue, a deep navy for depth, and a single amber pop, all authored in OKLCH so light and dark stay in lockstep.

### Primary
- **Cray Blue** (`oklch(0.58 0.11 232)`): the brand's voice. Primary buttons, links (as the darker strong tier), focus rings, the active node in the logo, selected states. In dark mode the same channel brightens to L 0.72.
- **Cray Blue Deep** (`oklch(0.52 0.11 232)`): hover/pressed state of primary fills.
- **Cray Blue Strong** (`oklch(0.46 0.11 232)`): the accessible text tier for blue on light tints (link text, badge text), where the mid blue would fail contrast.

### Secondary
- **Navy** (`oklch(0.34 0.065 242)`): depth. The drenched hero band and dark surfaces; constant across both themes so the hero reads the same in light and dark.
- **Sky** (`oklch(0.7 0.115 230)`): a brighter interactive blue for secondary accents and the logo's connective nodes.

### Tertiary
- **Amber** (`oklch(0.8 0.12 72)`): the lone warm pop (~5% of any screen). Status dots, a single highlighted node, small moments of warmth. Carried over from the old site, not invented.

### Neutral
- **Ink** (`oklch(0.25 0.02 245)`): body text, a navy-charcoal, not pure black.
- **Muted** (`oklch(0.52 0.02 245)`): secondary text, captions, helper copy. Verified ≥4.5:1 on surface.
- **Surface / Surface-2** (`oklch(0.99 0.004 240)` / `oklch(0.975 0.005 240)`): page and panel backgrounds, near-white with a whisper of brand hue. In dark mode these become navy-tinted darks (L 0.19 / 0.235), "Cray at night".
- **Border** (`oklch(0.91 0.008 240)`): hairline dividers and outlines.

### Named Rules
**The One Amber Rule.** Amber appears on at most ~5% of any screen, one accent node, one status dot. Its rarity is the point; it is never a second brand color.

**The Continuity Rule.** The blue is Cray's existing blue, refined, not replaced. Never introduce a competing hue family; warmth comes from amber, typography, and copy, not from a new color.

## 3. Typography

**Display Font:** Hanken Grotesk Variable (with ui-sans-serif, system-ui fallback)
**Body Font:** Literata Variable (with ui-serif, Georgia fallback)
**Label Font:** Hanken Grotesk Variable (the sans, at small sizes)

**Character:** A geometric-humanist sans for headings against a variable serif built for reading. Pairing on a genuine contrast axis (sans display + serif text) rather than two near-identical sans is what gives the brand its warm, trustworthy, editorial voice, and both are self-hosted variable fonts, so the type lab moves real axes (weight, optical size).

### Hierarchy
- **Display** (Hanken Grotesk, 600, `clamp(2.75rem, 6vw, 5rem)`, 1.04, `-0.03em`): the hero headline only. `text-wrap: balance`.
- **Headline** (Hanken Grotesk, 600, ~2rem, 1.1, `-0.02em`): section headings.
- **Title** (Hanken Grotesk, 600, 1.125rem, 1.3): card and subsection titles.
- **Body** (Literata, 400, 1.125rem, 1.6): reading copy. Cap measure at 65-75ch.
- **Label** (Hanken Grotesk, 500, 0.875rem): UI labels, nav, buttons, metadata.

### Named Rules
**The Serif-Reads Rule.** Long-form and reassurance copy is set in Literata, never the sans. The serif is the warmth signal; reach for it whenever the user is reading, not scanning.

**The Measure Rule.** Body text never exceeds ~75ch. Wide hero copy still wraps to a comfortable column.

## 4. Elevation

Predominantly flat and token-bordered. Depth comes from hairline borders, the two-step surface ramp (surface / surface-2), and the navy band, not from a shadow stack. Shadows are reserved for things that genuinely float above the page: overlays (dialog, sheet, popover, the floating control pills) and a soft accent glow on the hero CTA. There is no resting drop-shadow on cards.

### Shadow Vocabulary
- **Overlay** (`box-shadow: 0 10px 30px -10px oklch(0.15 0.02 245 / 0.35)`): dialogs, sheets, popovers, menus, the bottom-right control pills.
- **Accent glow** (`0 0 50px -16px oklch(0.7 0.16 258 / 0.5)`): the hero CTA and 2056-mode surfaces only; a glow, not a drop shadow.

### Named Rules
**The Flat-At-Rest Rule.** Cards and panels are flat; they separate by border and surface tone. A shadow means "this is floating above the page." If a card has a resting drop-shadow, it is wrong.

## 5. Components

### Buttons
- **Shape:** gently rounded (`{rounded.md}`, 0.625rem), scaling with the global radius token.
- **Primary:** Cray Blue fill, on-primary (near-white) text, `padding: 0 1.5rem`, `height: 3rem`. A tactile `active:scale-[0.98]` press (neutralized under reduced motion).
- **Hover / Focus:** background shifts to Cray Blue Deep; focus-visible shows a 2px Cray Blue outline with offset.
- **Outline / Ghost / Danger:** outline is a bordered transparent button with ink text; ghost drops the border; danger swaps the fill to the danger token.

### Cards / Containers
- **Corner Style:** `{rounded.lg}` (1rem).
- **Background:** surface-2 on a surface page (one tonal step up), or surface inside surface-2 regions.
- **Shadow Strategy:** none at rest (see Elevation). Hover may lift with `-translate-y-0.5` + border-color shift, not a shadow.
- **Border:** 1px border token. Never a colored left/right stripe.
- **Internal Padding:** `{spacing.lg}` (1.5rem).

### Inputs / Fields
- **Style:** 1px border token, surface background, `{rounded.md}`, `height: 2.5rem`.
- **Focus:** 2px Cray Blue focus-visible outline with offset (not an inner glow).
- **Error:** message in the danger-strong text tier; the field carries `aria-invalid`. Pair with the Field wrapper (label + hint/error).

### Badges
- **Style:** pill (`{rounded.xl}`), soft tinted background with the matching strong text tier (e.g. Cray Blue Strong on a blue tint) so colored text stays ≥4.5:1. Tones: neutral, primary, success, warning, danger.

### Navigation
- **Style:** sticky top bar, surface background, hairline bottom border. Label-font links in muted, shifting to ink on hover; the active admin link uses a primary tint with the strong text tier. One primary CTA button anchors the right side.

### Signature: the live theme Drawer
The bottom-right Theme pill opens a right-side Sheet with Tokens / Type / Hero tabs. Its sliders write OKLCH channels and font axes as inline CSS vars on `<html>`, so the entire UI (this component included) re-themes instantly with no React re-render. The Drawer is the system controlling itself; treat it as the brand's defining interaction.

## 6. Do's and Don'ts

### Do:
- **Do** author every color in OKLCH as composable channels; keep light and dark on the same channel so they stay in lockstep.
- **Do** set reading copy in Literata and UI/labels in Hanken Grotesk; cap body measure at 65-75ch.
- **Do** verify contrast (AA, APCA in the color lab) in both themes; use the `*-strong` text tiers for colored text on light tints.
- **Do** keep amber to ~5% of a screen; let one node or dot carry it.
- **Do** ship light and dark and honor `prefers-reduced-motion` on every animation.

### Don't:
- **Don't** use stock data-center photos, clip-art icons, or corporate gradient blues. That is the old Cray site and the generic-MSP template; escaping it is the whole point.
- **Don't** fall back to the corporate-blue SaaS / bootstrap template look.
- **Don't** ship AI-slop tells: cream/sand backgrounds, per-section uppercase eyebrows, 01/02/03 section markers, identical card grids, or gradient text.
- **Don't** drift toward cold enterprise-dashboard sterility; warmth (serif, amber, plain-spoken copy) is mandatory.
- **Don't** add a colored `border-left`/`border-right` stripe, a resting card drop-shadow, or a second brand hue.
- **Don't** put token values in component props as React state; tokens flow only as CSS vars.
