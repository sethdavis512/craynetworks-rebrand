import { useEffect, useRef, useState } from "react";
import { Delaunay } from "d3-delaunay";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * The 2056 hero viz: a living Voronoi lattice. ~40 points drift and constantly re-triangulate
 * into a shimmering holographic mesh; the cursor is injected as an extra site so the cells warp
 * around it. Canvas 2D, fills its container, pauses off-screen, static under reduced motion.
 */
export function HoloMesh() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    const pts = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0007,
      vy: (Math.random() - 0.5) * 0.0007,
    }));
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: false };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = (e.clientX - r.left) / r.width;
      pointer.ty = (e.clientY - r.top) / r.height;
      pointer.active = true;
    };
    if (!reduced) window.addEventListener("pointermove", onMove);

    const draw = (time: number) => {
      const t = reduced ? 0 : time / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      if (!reduced) {
        for (const p of pts) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0.02 || p.x > 0.98) p.vx *= -1;
          if (p.y < 0.02 || p.y > 0.98) p.vy *= -1;
        }
      }

      const coords: [number, number][] = pts.map((p) => [p.x * w, p.y * h]);
      const sites: [number, number][] =
        reduced || !pointer.active ? coords : [...coords, [pointer.x * w, pointer.y * h]];
      const delaunay = Delaunay.from(sites);
      const voronoi = delaunay.voronoi([0, 0, w, h]);

      ctx.clearRect(0, 0, w, h);
      const hue = 205 + Math.sin(t * 0.12) * 50;

      ctx.lineWidth = 1;
      ctx.strokeStyle = `hsla(${hue}, 85%, 72%, 0.22)`;
      ctx.beginPath();
      voronoi.render(ctx);
      ctx.stroke();

      ctx.strokeStyle = `hsla(${hue + 30}, 85%, 75%, 0.08)`;
      ctx.beginPath();
      delaunay.render(ctx);
      ctx.stroke();

      for (let i = 0; i < coords.length; i += 1) {
        const [x, y] = coords[i];
        ctx.fillStyle = `hsla(${hue + (i % 5) * 12}, 90%, 80%, 0.7)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    if (reduced) draw(0);
    else raf = requestAnimationFrame(draw);

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mounted, reduced]);

  if (!mounted) return null;
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 size-full" />;
}
