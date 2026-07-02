"use client";

import { useState, useEffect, useRef } from "react";

// ── Stage definitions ─────────────────────────────────────────────────────────
// align: "center" = full viewport center (hero moments)
//        "left"   = editorial left (story progression)
const STAGES = [
  {
    id: 1,
    from: 0.00, to: 0.12,
    lines: ["Every Stain", "Has a Story."],
    tagline: null as string | null,
    isBrand: false,
    align: "center" as const,          // ← opening title card, centered
  },
  {
    id: 2,
    from: 0.12, to: 0.25,
    lines: ["We Take It", "From Here."],
    tagline: null as string | null,
    isBrand: false,
    align: "left" as const,
  },
  {
    id: 3,
    from: 0.25, to: 0.50,
    lines: ["Deep Clean.", "Gentle Care."],
    tagline: null as string | null,
    isBrand: false,
    align: "left" as const,
  },
  {
    id: 4,
    from: 0.50, to: 0.65,
    lines: ["Expertly", "Washed."],
    tagline: null as string | null,
    isBrand: false,
    align: "left" as const,
  },
  {
    id: 5,
    from: 0.65, to: 0.80,
    lines: ["Perfectly", "Pressed."],
    tagline: null as string | null,
    isBrand: false,
    align: "center" as const,          // ← shirt reveal hero moment, centered
  },
  {
    id: 6,
    // Trimmed slightly to give Stage 7 more runway
    from: 0.80, to: 0.83,
    lines: ["Freshly", "Folded."],
    tagline: null as string | null,
    isBrand: false,
    align: "left" as const,
  },
  {
    id: 7,
    // Brand reveal now owns 17% of the 280vh runway = ~47.6vh of scroll travel
    from: 0.83, to: 1.00,
    lines: ["Anand's Dry Cleaners", "& Laundries"],
    tagline: "Care Beyond Clean." as string | null,
    isBrand: true,
    align: "center" as const,          // ← brand reveal climax, centered
  },
] as const;

// Smoothstep easing
function ss(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

interface StoryOverlayProps { scrollProgress: number }

export default function StoryOverlay({ scrollProgress }: StoryOverlayProps) {
  const [stageId,   setStageId]   = useState(1);
  const [localP,    setLocalP]    = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const p = scrollProgress;
      // find active stage (clamp to last if past all stages)
      const stage =
        STAGES.find(s => p >= s.from && p < s.to) ?? STAGES[STAGES.length - 1];
      const dur = stage.to - stage.from;
      const lp  = dur > 0 ? Math.max(0, Math.min(1, (p - stage.from) / dur)) : 1;
      setStageId(stage.id);
      setLocalP(lp);
    });
  }, [scrollProgress]);

  const stage = STAGES.find(s => s.id === stageId) ?? STAGES[0];

  // ── Per-stage animation values ────────────────────────────────────────────
  // Stage 7 gets a custom hold curve so the brand lingers much longer.
  // All other stages use the shared entry / hold / exit curve below.
  let opacity    = 1;
  let translateY = 0;
  let blurPx     = 0;

  if (stageId === 1) {
    // Stage 1: appear instantly at full opacity, blur-free from the start.
    if (localP >= 0.78) {
      const t    = ss((localP - 0.78) / 0.22);
      opacity    = 1 - t;
      translateY = -22 * t;
    }
  } else if (stageId === 7) {
    // ── Stage 7 Brand Reveal — custom luxury timing ──────────────────────────
    // Phase breakdown (localP 0→1 maps to 0.83→1.00 of global progress):
    //   0.00 → 0.18  Fast, crisp fade-in + upward drift (no slow lingering entry)
    //   0.18 → 0.88  LONG hold at full opacity — the luxury "pause" (~33vh of scroll)
    //   0.88 → 1.00  Gentle fade-up exit (only ~5.7vh, exits cleanly)
    if (localP < 0.18) {
      // Entry: blur clears, text rises into position
      const t    = ss(localP / 0.18);
      opacity    = t;
      translateY = 28 * (1 - t);
      blurPx     = 6 * (1 - t);
    } else if (localP < 0.88) {
      // ── Extended hold — full opacity, razor sharp ──
      opacity    = 1;
      translateY = 0;
      blurPx     = 0;
    } else {
      // Exit: clean fade-up, no blur
      const t    = ss((localP - 0.88) / 0.12);
      opacity    = 1 - t;
      translateY = -24 * t;
      blurPx     = 0;
    }
  } else if (localP < 0.22) {
    // Entry: blur fades away as text arrives
    const t    = ss(localP / 0.22);
    opacity    = t;
    translateY = 30 * (1 - t);
    blurPx     = 7 * (1 - t);          // blur ONLY during entry
  } else if (localP < 0.76) {
    // Hold: always crisp
    opacity    = 1;
    translateY = 0;
    blurPx     = 0;
  } else {
    // Exit: clean fade-up, no blur
    const t    = ss((localP - 0.76) / 0.24);
    opacity    = 1 - t;
    translateY = -22 * t;
    blurPx     = 0;
  }

  // CTA button: fades in during entry and is fully settled at the hold
  // (localP > 0.18 means it appears as soon as the text settles)
  const ctaVisible = stageId === 7 && localP > 0.18;
  const ctaOpacity = ctaVisible ? Math.min(1, (localP - 0.18) / 0.16) : 0;

  // ── Gradient ─────────────────────────────────────────────────────────────
  // Shifts slowly with global scrollProgress for the "living text" feel.
  const bgPos = (scrollProgress * 80).toFixed(2);

  const gradStyle: React.CSSProperties = {
    backgroundImage:
      "linear-gradient(90deg, #FFFFFF 0%, #F8F8F6 18%, #C6E9E6 42%, #A7D8D3 56%, #F8F8F6 78%, #FFFFFF 100%)",
    backgroundSize: "260% 100%",
    backgroundPosition: `${bgPos}% center`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
  };

  // ── Layout alignment ─────────────────────────────────────────────────────
  const isCenter = stage.align === "center";

  const outerStyle: React.CSSProperties = isCenter
    ? {
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 clamp(1.5rem, 6vw, 6rem)",
      }
    : {
        position: "absolute",
        inset: 0,
        zIndex: 10,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: "clamp(1.8rem, 9vw, 8rem)",
        paddingRight: "clamp(1.8rem, 20vw, 18rem)",
      };

  // Drop-shadow behind text for legibility against the frame sequence
  const shadowFilter = "drop-shadow(0 2px 28px rgba(0,0,0,0.55)) drop-shadow(0 0 48px rgba(9,108,108,0.22))";
  const combinedFilter =
    blurPx > 0
      ? `blur(${blurPx.toFixed(2)}px) ${shadowFilter}`
      : shadowFilter;

  const handleExplore = () => {
    const el = document.getElementById("about-us");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Brand headline font size — ~18% larger than before for dominance
  const brandFontSize = "clamp(2.6rem, 5vw, 5.2rem)";

  return (
    <div style={outerStyle}>
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          filter: combinedFilter,
          // Brand reveal gets more width so the two lines sit comfortably
          maxWidth: stage.isBrand ? "820px" : isCenter ? "860px" : "820px",
          willChange: "transform, opacity, filter",
        }}
      >
        {/* ── Headline lines ── */}
        {stage.lines.map((line, i) => (
          <p
            key={`${stageId}-${i}`}
            style={{
              ...gradStyle,
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: stage.isBrand
                ? brandFontSize
                : "clamp(3rem, 6vw, 6rem)",
              lineHeight: stage.isBrand ? 1.06 : 1.02,
              letterSpacing: stage.isBrand ? "-0.02em" : "-0.035em",
              marginBottom: i < stage.lines.length - 1
                ? (stage.isBrand ? "0.12em" : "0.04em")
                : 0,
              transform: i === 1 && blurPx > 0
                ? `translateY(${blurPx * 1.4}px)`
                : undefined,
              // Second line: in Stage 7 hold, force full opacity (no dimming)
              opacity: i === 1
                ? (stageId === 7 && localP >= 0.18 ? 1 : Math.min(1, opacity * 1.6))
                : 1,
            }}
          >
            {line}
          </p>
        ))}

        {/* ── Thin accent rule under brand headline ── */}
        {stage.isBrand && (
          <div
            style={{
              width: "72%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(167,216,211,0.55), transparent)",
              margin: "1.6rem auto 0",
            }}
          />
        )}

        {/* ── Tagline ── */}
        {stage.tagline && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              // Slightly larger tagline for readability
              fontSize: "clamp(0.85rem, 1.55vw, 1.2rem)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              // Brighter teal during the hold so it reads clearly
              color: stageId === 7 && localP >= 0.18
                ? "rgba(198,233,230,0.96)"
                : "rgba(167,216,211,0.88)",
              marginTop: "1.8rem",
              // During hold: full opacity; otherwise driven by parent opacity
              opacity: stageId === 7 && localP >= 0.18
                ? opacity
                : Math.min(1, opacity * 1.4),
            }}
          >
            {stage.tagline}
          </p>
        )}

        {/* ── CTA Button (brand reveal only) ── */}
        {stageId === 7 && (
          <div
            style={{
              marginTop: "2.8rem",
              opacity: ctaOpacity,
              transform: `translateY(${(1 - ctaOpacity) * 16}px)`,
              pointerEvents: ctaOpacity > 0.05 ? "auto" : "none",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ExploreButton onClick={handleExplore} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Premium Explore Us button ─────────────────────────────────────────────────
function ExploreButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        // ~12% more padding than before (was 0.95rem / 2.6rem)
        padding: "1.1rem 3rem",
        borderRadius: "9999px",
        background: hovered
          ? "rgba(9,108,108,0.28)"
          : "rgba(255,255,255,0.14)",
        border: `1.5px solid ${hovered ? "rgba(198,233,230,0.85)" : "rgba(198,233,230,0.55)"}`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        color: "#ffffff",
        fontFamily: "var(--font-body)",
        fontWeight: 600,
        // ~2px larger than before (was clamp 0.85→1rem)
        fontSize: "clamp(0.92rem, 1.35vw, 1.08rem)",
        letterSpacing: "0.11em",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 0.28s cubic-bezier(0.25,0.46,0.45,0.94)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        // Stronger resting shadow so button is visible without hover
        boxShadow: hovered
          ? "0 16px 44px rgba(9,108,108,0.36), 0 0 32px rgba(9,108,108,0.18)"
          : "0 6px 28px rgba(0,0,0,0.32), 0 0 18px rgba(9,108,108,0.12)",
      }}
    >
      <span style={{ position: "relative", zIndex: 1, letterSpacing: "0.11em" }}>
        Explore Us
      </span>
      {/* Arrow — shifts diagonally on hover */}
      <svg
        width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
        style={{
          opacity: hovered ? 1 : 0.72,
          transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
          transition: "transform 0.28s ease, opacity 0.28s ease",
        }}
      >
        <path d="M7 17L17 7"/>
        <path d="M7 7h10v10"/>
      </svg>
    </button>
  );
}
