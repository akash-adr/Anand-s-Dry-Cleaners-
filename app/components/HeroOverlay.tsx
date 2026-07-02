"use client";

import { useMemo, useEffect, useRef, useState } from "react";
import CTAButton from "./CTAButton";

// ─── Scene definitions ────────────────────────────────────────────────────────
interface Scene {
  id: number;
  start: number;        // scroll progress where scene begins to enter
  peak: number;         // scroll progress where scene is fully visible
  end: number;          // scroll progress where scene has fully exited
  headline: string;
  tagline?: string;
  isBrandReveal?: boolean;
  position: "center-left" | "center" | "center-right";
}

interface HeroOverlayProps {
  scrollProgress: number;
}

// Overlap windows: each scene's entry begins BEFORE the previous has fully exited
// to create a cinematic crossfade, never a hard cut.
const SCENES: Scene[] = [
  {
    id: 1,
    // peak === start means the text is fully visible the instant the pin fires
    start: 0,
    peak: 0.0,
    end: 0.14,
    headline: "Every Stain\nHas a Story.",
    position: "center-left",
  },
  {
    id: 2,
    start: 0.11,
    peak: 0.17,
    end: 0.27,
    headline: "We Take It\nFrom Here.",
    position: "center-left",
  },
  {
    id: 3,
    start: 0.24,
    peak: 0.31,
    end: 0.52,
    headline: "Deep Clean.\nGentle Care.",
    position: "center-left",
  },
  {
    id: 4,
    start: 0.49,
    peak: 0.55,
    end: 0.67,
    headline: "Expertly\nWashed.",
    position: "center-left",
  },
  {
    id: 5,
    start: 0.64,
    peak: 0.70,
    end: 0.82,
    headline: "Perfectly\nPressed.",
    position: "center-left",
  },
  {
    id: 6,
    start: 0.79,
    peak: 0.84,
    end: 0.93,
    headline: "Freshly\nFolded.",
    position: "center-left",
  },
  {
    id: 7,
    start: 0.90,
    peak: 0.95,
    end: 1.0,
    headline: "Anand's Dry Cleaners\n& Laundries",
    tagline: "Care Beyond Clean.",
    isBrandReveal: true,
    position: "center",
  },
];

// ─── Smoothstep easing ────────────────────────────────────────────────────────
function smoothstep(x: number): number {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

// ─── Per-scene animation state ────────────────────────────────────────────────
function getSceneState(scene: Scene, progress: number) {
  if (progress < scene.start || progress > scene.end) {
    return { opacity: 0, translateY: 28, blur: 6, gradientShift: 0, active: false };
  }

  const duration = scene.end - scene.start;
  const p = (progress - scene.start) / duration; // 0→1 within scene

  // Entry ramp: start→peak mapped to 0→entryFrac
  const entryFrac = (scene.peak - scene.start) / duration;
  // Exit ramp: peakEnd→end (hold from entryFrac to holdEnd, then fade)
  const holdEnd = Math.max(entryFrac, 1 - (scene.end - scene.peak) / duration);

  let opacity: number;
  let translateY: number;
  let blur: number;
  let gradientShift: number;

  if (entryFrac > 0 && p <= entryFrac) {
    // ── Entering ──
    const t = smoothstep(p / entryFrac);
    opacity = t;
    translateY = 28 * (1 - t);
    blur = 6 * (1 - t);
    gradientShift = t * 60; // gradient sweeps in as text arrives
  } else if (p <= holdEnd) {
    // ── Holding / living ──
    const holdP = (p - entryFrac) / (holdEnd - entryFrac);
    opacity = 1;
    translateY = 0;
    blur = 0;
    gradientShift = 60 + holdP * 40; // slow living gradient shift while held
  } else {
    // ── Exiting ──
    const t = smoothstep((p - holdEnd) / (1 - holdEnd));
    opacity = 1 - t;
    translateY = -22 * t;
    blur = 4 * t;
    gradientShift = 100;
  }

  return { opacity, translateY, blur, gradientShift, active: true };
}

// ─── Individual scene renderer ────────────────────────────────────────────────
function SceneText({
  scene,
  scrollProgress,
}: {
  scene: Scene;
  scrollProgress: number;
}) {
  const state = useMemo(
    () => getSceneState(scene, scrollProgress),
    [scene, scrollProgress]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  // Track mouse parallax (desktop only, lightweight)
  const [mouseXY, setMouseXY] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const onMove = (e: MouseEvent) => {
      setMouseXY({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 6,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (state.opacity <= 0.005) return null;

  // ── Positioning ──
  const alignClass =
    scene.position === "center-left"
      ? "items-start text-left pl-6 sm:pl-10 md:pl-16 lg:pl-24 xl:pl-32"
      : scene.position === "center-right"
      ? "items-end text-right pr-6 sm:pr-10 md:pr-16 lg:pr-24 xl:pr-32"
      : "items-center text-center px-6 sm:px-10";

  const lines = scene.headline.split("\n");

  // Gradient: white → soft ivory → peacock tint → teal accent, shifting with scroll
  // gradientShift (0→100) maps to background-position
  const gradientStyle = {
    backgroundImage:
      "linear-gradient(90deg, #FFFFFF 0%, #F7F7F5 20%, #A7D8D3 55%, #F7F7F5 78%, #FFFFFF 100%)",
    backgroundSize: "250% 100%",
    backgroundPosition: `${state.gradientShift * 2}% center`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
  } as React.CSSProperties;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 flex flex-col justify-center ${alignClass} pointer-events-none`}
      style={{
        zIndex: 15,
        opacity: state.opacity,
        transform: `translate(${mouseXY.x}px, ${state.translateY + mouseXY.y}px)`,
        filter: state.blur > 0 ? `blur(${state.blur}px)` : "none",
        // No CSS transition on opacity/transform — driven entirely by scroll progress
        // so it stays perfectly in sync with frame changes
        willChange: "transform, opacity, filter",
      }}
    >
      {/* Brand reveal ambient glow behind text */}
      {scene.isBrandReveal && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(9,108,108,0.14) 0%, rgba(9,108,108,0.05) 45%, transparent 70%)",
            opacity: state.opacity,
          }}
        />
      )}

      {/* ── Headline lines ── */}
      <div
        className="relative"
        style={{
          filter:
            "drop-shadow(0 2px 16px rgba(9,108,108,0.25)) drop-shadow(0 0 40px rgba(9,108,108,0.12))",
        }}
      >
        {lines.map((line, i) => (
          <p
            key={`${scene.id}-${i}`}
            style={{
              ...gradientStyle,
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: scene.isBrandReveal
                ? "clamp(2rem, 4.5vw, 4.2rem)"
                : "clamp(2.6rem, 5.5vw, 5.4rem)",
              lineHeight: 1.05,
              letterSpacing: scene.isBrandReveal ? "-0.01em" : "-0.03em",
              maxWidth: scene.isBrandReveal ? "700px" : "820px",
              marginBottom: i < lines.length - 1 ? "0.08em" : 0,
              // Stagger second line slightly on enter
              opacity: i === 1 ? Math.min(1, state.opacity * 1.4) : 1,
              transform:
                i === 1
                  ? `translateY(${state.translateY * 0.4}px)`
                  : undefined,
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* ── Tagline (brand reveal only) ── */}
      {scene.tagline && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(167,216,211,0.85)",
            marginTop: "1.4rem",
            opacity: Math.min(1, state.opacity * 1.3),
            transform: `translateY(${state.translateY * 0.5}px)`,
          }}
        >
          {scene.tagline}
        </p>
      )}

      {/* ── CTA Button — brand reveal only ── */}
      {scene.isBrandReveal && state.opacity > 0.35 && (
        <div
          className="pointer-events-auto"
          style={{
            opacity: Math.min(1, (state.opacity - 0.35) * (1 / 0.65)),
            transform: `translateY(${Math.max(0, (1 - state.opacity) * 24)}px)`,
          }}
        >
          <CTAButton />
        </div>
      )}
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function HeroOverlay({ scrollProgress }: HeroOverlayProps) {
  return (
    <>
      {SCENES.map((scene) => (
        <SceneText
          key={scene.id}
          scene={scene}
          scrollProgress={scrollProgress}
        />
      ))}
    </>
  );
}
