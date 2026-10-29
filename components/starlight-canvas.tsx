'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  twinkle: number;
  hue: number;
}

interface Bokeh {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  color: string;
  phase: number;
}

export default function StarlightCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];
    const bokeh: Bokeh[] = [];
    const STAR_COUNT = Math.min(160, Math.floor((width * height) / 9000));
    const BOKEH_COUNT = 14;

    for (let i = 0; i < STAR_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.5 ? 45 : 290,
      });
    }

    const bokehColors = [
      'rgba(224,36,163,0.10)',
      'rgba(168,85,247,0.10)',
      'rgba(252,211,77,0.08)',
    ];
    for (let i = 0; i < BOKEH_COUNT; i++) {
      bokeh.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 80 + 50,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: bokehColors[i % bokehColors.length],
        phase: Math.random() * Math.PI * 2,
      });
    }

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // bokeh glow
      bokeh.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;
        b.phase += 0.005;
        if (b.x < -100) b.x = width + 100;
        if (b.x > width + 100) b.x = -100;
        if (b.y < -100) b.y = height + 100;
        if (b.y > height + 100) b.y = -100;
        const pulse = 0.6 + Math.sin(b.phase) * 0.4;
        const grad = ctx.createRadialGradient(
          b.x,
          b.y,
          0,
          b.x,
          b.y,
          b.r * pulse,
        );
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      // stars
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += 0.04;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        const a = p.alpha * (0.5 + Math.sin(p.twinkle) * 0.5);
        const color =
          p.hue === 45
            ? `rgba(252,211,77,${a})`
            : `rgba(168,85,247,${a})`;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
    />
  );
}