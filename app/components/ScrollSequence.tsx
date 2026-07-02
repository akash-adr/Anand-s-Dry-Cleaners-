"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCanvas from "./HeroCanvas";
import AmbientParticles from "./AmbientParticles";
import StoryOverlay from "./StoryOverlay";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 300;

export default function ScrollSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame]   = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [zoomLevel, setZoomLevel]           = useState(1);
  const [active, setActive]                 = useState(false);
  const lastProgressRef = useRef(0);
  const lastTimeRef     = useRef(Date.now());

  useEffect(() => {
    if (!sectionRef.current) return;

    // ── DO NOT CHANGE THIS BLOCK ─────────────────────────────────────────────
    // Original working GSAP pin configuration. Section is 280vh → scroll runway.
    // pin:true makes the section position:fixed at the viewport top while the
    // user scrolls 280vh. pinSpacing:false prevents a duplicate spacer.
    // ────────────────────────────────────────────────────────────────────────
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        const now = Date.now();
        const dt  = Math.max(now - lastTimeRef.current, 1);
        const velocity = ((progress - lastProgressRef.current) / dt) * 1000;
        lastProgressRef.current = progress;
        lastTimeRef.current = now;

        requestAnimationFrame(() => {
          setScrollProgress(progress);
          setCurrentFrame(Math.round(progress * (TOTAL_FRAMES - 1)));
          setScrollVelocity(velocity);
          setZoomLevel(progress > 0.92
            ? 1 + ((progress - 0.92) / 0.08) * 0.03
            : 1);
        });
      },
      onEnter:      () => setActive(true),
      onLeave:      () => setActive(false),
      onEnterBack:  () => setActive(true),
      onLeaveBack:  () => setActive(false),
    });

    return () => trigger.kill();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setScrollVelocity(v => v * 0.9), 50);
    return () => clearInterval(id);
  }, []);

  return (
    // 280vh section — scroll runway. DO NOT CHANGE HEIGHT.
    <section
      ref={sectionRef}
      id="scroll-sequence"
      className="relative w-full"
      style={{ height: "280vh" }}
    >
      {/*
        ── Viewport-height inner wrapper ────────────────────────────────────
        This is what the user sees when GSAP pins the section. All layers
        inside here use position:absolute so they stay inside this container
        and are NOT affected by GSAP's stacking context on the section.

        CRITICAL: Do NOT use position:fixed inside a GSAP-pinned element.
        GSAP makes the section position:fixed, which becomes the containing
        block for any child position:fixed elements — they are no longer
        viewport-relative and get clipped or misplaced.
        ────────────────────────────────────────────────────────────────────
      */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "100vh",
          background: "#000",          // prevents white flash before canvas loads
          opacity: active ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Layer 1 — Frame sequence canvas (z-index: 0) */}
        <HeroCanvas
          currentFrame={currentFrame}
          totalFrames={TOTAL_FRAMES}
          zoomLevel={zoomLevel}
        />

        {/* Layer 2 — Ambient particles (z-index: 5, position:fixed internally) */}
        <AmbientParticles
          scrollProgress={scrollProgress}
          scrollVelocity={scrollVelocity}
        />

        {/* Layer 3 — Story text (position:absolute, z-index: 10)
            Must be INSIDE this wrapper so it is not affected by GSAP's
            position:fixed stacking context on the outer section.         */}
        <StoryOverlay scrollProgress={scrollProgress} />

        {/* Layer 4 — Top-edge cinematic fade (z-index: 20) */}
        <div
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{
            height: "10vh",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, transparent 100%)",
            zIndex: 20,
          }}
        />
      </div>
    </section>
  );
}
