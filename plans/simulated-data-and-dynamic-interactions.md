# Simulated Data & Dynamic Interactions

> Companion to `cray-networks-rebrand.md`, `interactive-showcase-wow-layer.md`, and `impeccable-integration.md`. This file covers two additions that make the rebranded site feel like a real, living product: (1) a fully simulated RR7 data/form experience, and (2) dynamic-movement interfaces (infinite canvas + direction-aware sliding panels). Reference for the motion patterns: `/Users/seth/repositories/layout-gallery`.

## Context

A design-heavy hiring manager will poke at the site, not just scroll it. Two things prove range beyond static design: realistic full-stack interaction (loaders, actions, pending UI, error handling, all RR7 framework-mode), and spatial/dynamic UI (a pannable/zoomable canvas, panels that slide from any edge). The infinite canvas doubles as the "what Cray Networks is about" exploration. `layout-gallery` proves these interactions need **no animation library** — camera math + CSS transforms + pointer events — which is itself the flex.

## Locked Decisions

| Decision | Choice |
|---|---|
| Infinite canvas | Dedicated **`/explore`** route: pannable/zoomable map of services + process, network-edge motif, click-to-fly-in + side panel, themed by tokens |
| Canvas tech | **Custom camera** (layout-gallery pattern): `useCanvasCamera` hook, CSS `translate()/scale()`, pointer + wheel, screen↔canvas math, no deps |
| Sliding panels | **Base UI Dialog-based `<Sheet side="top\|right\|bottom\|left">`**; the global token Drawer becomes `Sheet side="right"` |
| Failure scope | **Forms fail ~25%** (latency + validation + retry); page loads reliable except one intentional deferred loader demo |

---

## Part 1 — Simulated data & form experience (RR7 framework mode)

### Mock backend

A clearly-labeled fake backend in `app/mock/`:

- `app/mock/db.server.ts` — in-memory stores (service requests, testimonials, service-area availability).
- `app/mock/simulate.server.ts` — `simulateLatency(minMs=600, maxMs=1800)` and `maybeFail(rate=0.25)` helpers. (Note: avoid `Math.random` at module scope; call inside loaders/actions only.)

### Primary form: Service Request / Quote (`<Form>` + `action`)

- Route `routes/contact.tsx` (also reachable as a section on `/`) with an `action`.
- `action`: Zod-validate fields; on invalid → return `{ errors }` (422-style) rendered inline. On valid → `await simulateLatency()`, then `maybeFail(0.25)`: failure returns `{ formError }` with a retry affordance; success persists to the mock store and **redirects (PRG, 303)** to a confirmation state to avoid resubmit-on-refresh.
- Types from `./+types/contact`; validation with Zod; all logic in `*.server.ts`.
- **Pending UI** via `useNavigation()` (submitting → disabled button + spinner + "Sending…"). Field errors render beside inputs; the server-failure banner offers "Try again".

### Inline mutations: `useFetcher` (no navigation)

- Newsletter / "notify me about availability" and a service-area ZIP checker use `useFetcher` so they post without navigating.
- **Optimistic UI**: read `fetcher.formData` to reflect the pending value immediately; reconcile on result; occasional simulated failure rolls back with a toast.

### Deferred loader demo (the one intentional load failure)

- One surface (e.g. a "current service status" / testimonials strip) uses a **loader returning a deferred promise** rendered through `<Suspense>` + `<Await>`: skeleton → resolved content. This single loader intentionally exercises `maybeFail` so the **route error boundary** (or `<Await errorElement>`) shows a styled error + retry. Everything else loads reliably so browsing stays smooth.

### State matrix to build/verify (feeds Impeccable `audit` + feature-snapshot)

default · pending/submitting · empty · validation-error · server-error (25%) · success/confirmation · optimistic + rollback.

### Files

```
app/
  mock/db.server.ts, mock/simulate.server.ts
  routes/contact.tsx                 action + <Form>, pending + error states
  routes/_index.tsx                  embeds the form section + fetcher widgets
  components/forms/                   field + inline-error + pending-button (from the UI library)
```

---

## Part 2 — Dynamic movement interfaces

### Infinite canvas — `/explore`

A pannable, zoomable canvas presenting Cray's services and "how we work" as connected nodes (network-edge motif tying back to the logo). Custom camera per the layout-gallery pattern.

- **Camera hook** `app/canvas/useCanvasCamera.ts`: `camera = {x, y, zoom}`; applies `transform: translate(50%,50%) scale(zoom) translate(x,y)` with `transformOrigin: 0 0`; `screenToCanvas()` helper; wheel-to-zoom clamped to `MIN_ZOOM`/`MAX_ZOOM`; pointer-drag to pan.
- **Drag state machine**: tagged union (`{type:'canvas'} | {type:'node'; id; offsetX; offsetY} | null`) as in `Canvas001.tsx`. Array-based z-ordering when a node is focused.
- **Nodes**: service offerings (computer repair, IT/network management, hosting, web dev) + process steps (intake → diagnose → fix → maintain), drawn as design-system Cards on the canvas, connected by SVG edges. All token-driven, so the **global Drawer re-skins the canvas live** (extra wow).
- **Click-to-fly-in**: animate the camera to a node (eased), then open a **detail `<Sheet side="right">`** with that service's info. `prefers-reduced-motion` → jump instantly instead of animating.
- **Controls + a11y**: zoom in/out/reset buttons, a small minimap, keyboard pan/zoom, focus management when the Sheet opens. Full-viewport (`h-dvh`, `overflow-hidden`).
- Dot/grid background via the layout-gallery CSS technique, colored from tokens.

```
app/
  canvas/useCanvasCamera.ts, canvas/types.ts (drag union), canvas/nodes.ts (graph data)
  routes/explore.tsx
  components/canvas/CanvasNode.tsx, Edges.tsx, Minimap.tsx, ZoomControls.tsx
```

### Direction-aware sliding panels — `<Sheet>`

One reusable, accessible component covering all four edges, built on **Base UI Dialog** (focus trap, scroll lock, ESC, ARIA for free).

- `app/components/ui/Sheet.tsx`: props `side: 'top'|'right'|'bottom'|'left'`, `size`, plus CVA variants. Per-side enter/exit transform classes driven by Base UI `data-[state=open/closed]` (`translateX/Y(±100%)` → `0`). Optional Motion spring; respects reduced-motion.
- **Reuse across the app**: the global token **Drawer is `Sheet side="right"`**; mobile nav is `side="left"` (or `top`); the canvas node detail is `side="right"`; a cookie/notice bar is `side="bottom"`; filters could be `side="left"`.
- Documented in the **component gallery** with inline controls for `side` and `size` (ties into the control-taxonomy story: inline props vs global tokens).

---

## Build order

1. Build `<Sheet>` first (unblocks the global Drawer, mobile nav, and the canvas detail panel). Refactor the planned Drawer to be `Sheet side="right"`.
2. Build the mock backend (`db.server.ts`, `simulate.server.ts`) and the form primitives (field + inline-error + pending-button).
3. Build `routes/contact.tsx` action/form with full state matrix; add fetcher widgets + the deferred-loader demo + its error boundary.
4. Build `useCanvasCamera` + canvas node graph + `/explore`, including click-to-fly-in into a `Sheet`.
5. Run the per-surface Impeccable gate (`shape → critique → audit → polish`) on `/contact`, `/explore`, and the `<Sheet>` gallery entry, in light + dark and under a drawer-modified token state.

## Verification

- Submitting the quote form shows pending UI, then either inline Zod errors, a ~25% server-error banner with working retry, or a PRG redirect to confirmation (refresh does not resubmit).
- Fetcher widgets update optimistically and roll back cleanly on simulated failure.
- The single deferred loader shows skeleton → content normally, and its error boundary + retry on the intentional failure path; other routes load reliably.
- `/explore`: drag pans, wheel zooms (clamped), nodes are draggable with correct z-order, clicking a node flies the camera in and opens the right-side Sheet; reset/zoom controls and keyboard work; reduced-motion disables fly-in easing.
- The canvas re-skins live when global tokens change via the Drawer.
- `<Sheet>` opens from all four sides with focus trap, scroll lock, ESC close, and reduced-motion fallback; the global Drawer and mobile nav use it.
- All new surfaces pass Impeccable `audit` in light and dark.
