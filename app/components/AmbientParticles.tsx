"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  phase: number;
  phaseSpeed: number;
}

interface AmbientParticlesProps {
  scrollProgress: number;
  scrollVelocity: number;
}

export default function AmbientParticles({
  scrollProgress,
  scrollVelocity,
}: AmbientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Initialize particles
  useEffect(() => {
    // Skip particles on mobile for performance
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const particles: Particle[] = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.2 - 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: Math.random() * 0.01 + 0.005,
      });
    }
    particlesRef.current = particles;

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Fade multiplier based on scroll progress (particles disappear in later scenes)
  const getFadeMultiplier = useCallback((progress: number): number => {
    if (progress < 0.67) return 1;
    if (progress < 0.81) return 1 - (progress - 0.67) / 0.14;
    return 0;
  }, []);

  // Render loop
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      timeRef.current += 1;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);

      const fadeMultiplier = getFadeMultiplier(scrollProgress);
      if (fadeMultiplier <= 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const velocityBoost = Math.min(Math.abs(scrollVelocity) * 2, 3);

      particlesRef.current.forEach((p) => {
        p.phase += p.phaseSpeed;

        // Organic floating motion using sine waves
        const xDrift = Math.sin(p.phase) * 0.5;
        const yDrift = Math.cos(p.phase * 0.7) * 0.3;

        p.x += p.speedX + xDrift + velocityBoost * p.speedX;
        p.y += p.speedY + yDrift - velocityBoost * 0.3;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Draw with glow
        const alpha = p.opacity * fadeMultiplier;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(9, 108, 108, ${alpha})`;
        ctx.fill();

        // Subtle glow
        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(9, 108, 108, ${alpha * 0.12})`;
          ctx.fill();
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [scrollProgress, scrollVelocity, getFadeMultiplier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none hidden md:block"
      style={{ zIndex: 5 }}
    />
  );
}
