import { useEffect, useMemo, useRef, useState } from "react";
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { useReducedMotion } from "../../lib/useReducedMotion";
import { useTheme } from "../../theme/ThemeProvider";

const W = 1000;
const H = 600;

type Accent = "none" | "sky" | "amber" | "primary";
type GNode = SimulationNodeDatum & { id: number; accent: Accent; r: number };
type GLink = SimulationLinkDatum<GNode>;

/** Seeded RNG so a given node count yields a stable layout (no reshuffle on speed/spread tweaks). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), seed | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generate(count: number) {
  const rand = mulberry32(count * 1000 + 7);
  const nodes: GNode[] = [];
  for (let i = 0; i < count; i += 1) {
    const roll = rand();
    const accent: Accent = roll < 0.06 ? "amber" : roll < 0.16 ? "sky" : roll < 0.22 ? "primary" : "none";
    const r = accent === "none" ? 2.5 + rand() * 2 : 4 + rand() * 2.5;
    nodes.push({ id: i, accent, r });
  }
  const links: GLink[] = [];
  for (let i = 1; i < count; i += 1) {
    links.push({ source: i, target: Math.floor(rand() * i) });
    if (rand() < 0.18) links.push({ source: i, target: Math.floor(rand() * i) });
  }
  return { nodes, links };
}

const fillFor = (a: Accent) =>
  a === "amber" ? "fill-amber" : a === "sky" ? "fill-sky" : a === "primary" ? "fill-primary" : "fill-on-navy/40";

/**
 * Hero background: a d3-force network field (Obsidian-style). Client-only and token-colored so it
 * re-skins with the theme. The only interaction is gentle cursor repulsion; static under reduced
 * motion. Node count, drift speed, and spread are driven live by the Theme drawer's Hero tab.
 */
export function HeroGraph() {
  const reduced = useReducedMotion();
  const { state } = useTheme();
  const { count, speed, spread } = state.hero;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const graph = useMemo(() => generate(Math.round(count)), [count]);

  const circles = useRef<(SVGCircleElement | null)[]>([]);
  const lines = useRef<(SVGLineElement | null)[]>([]);
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const simRef = useRef<Simulation<GNode, undefined> | null>(null);

  // Build/rebuild the simulation when topology or reduced-motion changes.
  useEffect(() => {
    if (!mounted) return;
    const nodes = graph.nodes.map((n) => ({ ...n }));
    const links = graph.links.map((l) => ({ ...l }));

    const sim = forceSimulation<GNode>(nodes)
      .force("link", forceLink<GNode, GLink>(links).id((d) => d.id).distance(40 + spread * 100).strength(0.2))
      .force("charge", forceManyBody().strength(-(80 + spread * 260)))
      .force("center", forceCenter(W / 2, H / 2))
      .force("collide", forceCollide<GNode>().radius((d) => d.r + 6));
    simRef.current = sim;

    const paint = () => {
      nodes.forEach((n, i) => {
        const c = circles.current[i];
        if (c) {
          c.setAttribute("cx", String(n.x ?? 0));
          c.setAttribute("cy", String(n.y ?? 0));
        }
      });
      links.forEach((l, i) => {
        const ln = lines.current[i];
        const s = l.source as GNode;
        const t = l.target as GNode;
        if (ln) {
          ln.setAttribute("x1", String(s.x ?? 0));
          ln.setAttribute("y1", String(s.y ?? 0));
          ln.setAttribute("x2", String(t.x ?? 0));
          ln.setAttribute("y2", String(t.y ?? 0));
        }
      });
    };

    if (reduced) {
      sim.stop();
      for (let i = 0; i < 320; i += 1) sim.tick();
      paint();
      return () => {
        sim.stop();
      };
    }

    sim.force("pointer", (alpha: number) => {
      const p = pointer.current;
      if (!p) return;
      for (const n of nodes) {
        const dx = (n.x ?? 0) - p.x;
        const dy = (n.y ?? 0) - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        const reach = 170;
        if (dist < reach) {
          const f = ((reach - dist) / dist) * alpha * 6;
          n.vx = (n.vx ?? 0) + dx * f;
          n.vy = (n.vy ?? 0) + dy * f;
        }
      }
    });
    sim.alphaTarget(0.005 + speed * 0.05).restart();
    sim.on("tick", paint);

    const toLocal = (e: PointerEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      pointer.current = { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
      sim.alphaTarget(Math.max(0.1, 0.005 + speed * 0.05));
    };
    const clear = () => {
      pointer.current = null;
      sim.alphaTarget(0.005 + speed * 0.05);
    };
    window.addEventListener("pointermove", toLocal);
    window.addEventListener("pointerleave", clear);

    return () => {
      sim.on("tick", null);
      sim.stop();
      window.removeEventListener("pointermove", toLocal);
      window.removeEventListener("pointerleave", clear);
    };
    // speed/spread are read here for the initial build; live tweaks are handled by the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, graph, reduced]);

  // Live-tune forces on speed/spread without rebuilding (keeps positions, no reshuffle).
  useEffect(() => {
    const sim = simRef.current;
    if (!sim || reduced) return;
    const charge = sim.force("charge") as { strength?: (n: number) => void } | undefined;
    const link = sim.force("link") as { distance?: (n: number) => void } | undefined;
    charge?.strength?.(-(80 + spread * 260));
    link?.distance?.(40 + spread * 100);
    sim.alphaTarget(0.005 + speed * 0.05).alpha(0.3).restart();
  }, [speed, spread, reduced]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full text-on-navy"
      fill="none"
    >
      {mounted ? (
        <>
          <g stroke="currentColor" strokeWidth="1" opacity="0.16">
            {graph.links.map((_, i) => (
              <line key={i} ref={(el) => { lines.current[i] = el; }} />
            ))}
          </g>
          <g>
            {graph.nodes.map((n, i) => (
              <circle key={i} ref={(el) => { circles.current[i] = el; }} r={n.r} className={fillFor(n.accent)} />
            ))}
          </g>
        </>
      ) : null}
    </svg>
  );
}
