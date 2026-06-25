import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";

const RINGS = [
  { r: 0.34, speed: 0.18, dots: 1 },
  { r: 0.54, speed: -0.12, dots: 2 },
  { r: 0.76, speed: 0.07, dots: 1 },
];

/**
 * The 2056 hero focal: a glowing core orbited by tilted concentric rings and a few light points.
 * One structured object (pairs with the flat grid floor rather than competing with it). Canvas 2D,
 * fills its container, parallaxes/tilts to the pointer, pauses off-screen, static under reduced motion.
 */
export function OrbitalCore() {
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
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

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
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };
    if (!reduced) window.addEventListener("pointermove", onMove);

    const draw = (time: number) => {
      const t = reduced ? 0 : time / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      ctx.clearRect(0, 0, w, h);

      const hue = 210 + Math.sin(t * 0.13) * 48;
      const cx = w / 2 + pointer.x * 22;
      const cy = h / 2 + pointer.y * 16;
      const base = Math.min(w, h) * 0.5;
      const tilt = 0.42 + pointer.y * 0.12; // orbital plane squash, responds to cursor

      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.5);
      bloom.addColorStop(0, `hsla(${hue}, 90%, 78%, 0.45)`);
      bloom.addColorStop(1, "hsla(0, 0%, 0%, 0)");
      ctx.fillStyle = bloom;
      ctx.beginPath();
      ctx.arc(cx, cy, base * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.lineWidth = 1;
      for (const ring of RINGS) {
        const rr = base * ring.r;
        ctx.strokeStyle = `hsla(${hue}, 80%, 72%, 0.28)`;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rr, rr * tilt, 0, 0, Math.PI * 2);
        ctx.stroke();

        for (let d = 0; d < ring.dots; d += 1) {
          const ang = t * ring.speed * Math.PI * 2 + (d / ring.dots) * Math.PI * 2 + ring.r * 5;
          const dx = cx + Math.cos(ang) * rr;
          const dy = cy + Math.sin(ang) * rr * tilt;
          ctx.strokeStyle = `hsla(${hue}, 85%, 78%, 0.12)`;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(dx, dy);
          ctx.stroke();
          const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, 7);
          g.addColorStop(0, `hsla(${hue + 20}, 95%, 82%, 0.95)`);
          g.addColorStop(1, "hsla(0, 0%, 0%, 0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(dx, dy, 7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.fillStyle = `hsla(${hue + 30}, 95%, 86%, 0.95)`;
      ctx.beginPath();
      ctx.arc(cx, cy, 4 + (reduced ? 0 : Math.sin(t * 1.5) * 1.2), 0, Math.PI * 2);
      ctx.fill();

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
