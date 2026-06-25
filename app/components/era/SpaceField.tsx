import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../lib/useReducedMotion";

/**
 * The 2056 void: a Canvas 2D perspective grid horizon + drifting starfield that morphs hue over
 * time and parallaxes to the pointer. Client-only, fixed behind content, pauses off-screen, and
 * renders a single static frame under reduced motion.
 */
export function SpaceField() {
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
    window.addEventListener("resize", resize);

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

      const hue = 210 + Math.sin(t * 0.15) * 45; // cyan .. violet drift
      const px = pointer.x * 40;
      const horizon = h * 0.62;
      const vanishX = w / 2 + px;

      ctx.lineWidth = 1;
      for (let i = -10; i <= 10; i += 1) {
        const fx = w / 2 + (i / 10) * w * 0.95;
        ctx.strokeStyle = `hsla(${hue}, 80%, 70%, 0.16)`;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon);
        ctx.lineTo(fx + px * 2, h);
        ctx.stroke();
      }
      const speed = reduced ? 0.2 : (t * 0.25) % 1;
      for (let i = 0; i < 14; i += 1) {
        const p = (i + speed) / 14;
        const yy = horizon + (h - horizon) * (p * p);
        ctx.strokeStyle = `hsla(${hue}, 80%, 72%, ${0.05 + p * 0.16})`;
        ctx.beginPath();
        ctx.moveTo(0, yy);
        ctx.lineTo(w, yy);
        ctx.stroke();
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
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mounted, reduced]);

  if (!mounted) return null;
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
