import { useEffect, useRef } from "react";

/**
 * Sitewide falling cherry blossom petals (canvas overlay, fixed, pointer-events: none).
 * Lightweight: ~40 petals, no React state on each frame.
 */

type Petal = {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swing: number;
  swingSpeed: number;
  swingPhase: number;
  rot: number;
  rotSpeed: number;
  hue: number;
  alpha: number;
};

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.globalAlpha = p.alpha;

  // Petal shape: two arcs forming a leaf, tinted pink with slight gradient
  const r = p.size;
  const grad = ctx.createLinearGradient(-r, 0, r, 0);
  grad.addColorStop(0, `hsla(${p.hue}, 95%, 88%, 0.95)`);
  grad.addColorStop(1, `hsla(${p.hue + 8}, 95%, 70%, 0.95)`);
  ctx.fillStyle = grad;

  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.bezierCurveTo(r * 0.9, -r * 0.4, r * 0.9, r * 0.4, 0, r);
  ctx.bezierCurveTo(-r * 0.9, r * 0.4, -r * 0.9, -r * 0.4, 0, -r);
  ctx.closePath();
  ctx.fill();

  // Center notch
  ctx.strokeStyle = `hsla(${p.hue - 5}, 90%, 60%, 0.6)`;
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.9);
  ctx.lineTo(0, r * 0.9);
  ctx.stroke();

  ctx.restore();
}

export function SakuraPetals({ density = 45 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const count = reduced ? Math.floor(density / 3) : density;

    let w = (canvas.width = window.innerWidth * window.devicePixelRatio);
    let h = (canvas.height = window.innerHeight * window.devicePixelRatio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const cssW = () => window.innerWidth;
    const cssH = () => window.innerHeight;

    const makePetal = (initial = false): Petal => ({
      x: Math.random() * cssW(),
      y: initial ? Math.random() * cssH() : -20 - Math.random() * 100,
      size: 5 + Math.random() * 9,
      speedY: 0.6 + Math.random() * 1.4,
      speedX: -0.3 + Math.random() * 0.6,
      swing: 20 + Math.random() * 40,
      swingSpeed: 0.005 + Math.random() * 0.012,
      swingPhase: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: -0.02 + Math.random() * 0.04,
      hue: 330 + Math.random() * 20, // pink range
      alpha: 0.55 + Math.random() * 0.4,
    });

    petalsRef.current = Array.from({ length: count }, () => makePetal(true));

    const onResize = () => {
      w = canvas.width = window.innerWidth * window.devicePixelRatio;
      h = canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    window.addEventListener("resize", onResize);

    let lastT = performance.now();
    const loop = (t: number) => {
      const dt = Math.min(50, t - lastT);
      lastT = t;
      ctx.clearRect(0, 0, cssW(), cssH());

      for (const p of petalsRef.current) {
        p.swingPhase += p.swingSpeed * dt;
        p.x += p.speedX + Math.sin(p.swingPhase) * 0.4;
        p.y += p.speedY * (dt / 16);
        p.rot += p.rotSpeed;

        if (p.y > cssH() + 20 || p.x < -30 || p.x > cssW() + 30) {
          // Recycle to top
          Object.assign(p, makePetal(false));
        }

        drawPetal(ctx, p);
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
