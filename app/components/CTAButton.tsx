"use client";

import { useCallback, useRef, useState } from "react";

export default function CTAButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  // Scroll to About Us when clicked
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = btnRef.current;
      if (!btn) return;

      // ── Ripple effect ──
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const ripple = document.createElement("span");
      ripple.className = "btn-ripple";
      Object.assign(ripple.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}px`,
        top: `${y}px`,
      });
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      // ── Navigate to About Us ──
      const target =
        document.getElementById("about-us") ||
        document.querySelector("[data-section='about']");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    []
  );

  return (
    <div className="flex flex-col items-start gap-5 mt-10">
      {/* ── Primary pill CTA ── */}
      <button
        ref={btnRef}
        id="explore-cta"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        style={{
          position: "relative",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.85rem 2.2rem",
          borderRadius: "9999px",
          background: hovered
            ? "rgba(9,108,108,0.18)"
            : "rgba(255,255,255,0.08)",
          border: "1px solid rgba(167,216,211,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          color: "#ffffff",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
          letterSpacing: "0.08em",
          cursor: "pointer",
          userSelect: "none",
          transition:
            "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 12px 36px rgba(9,108,108,0.28), 0 0 24px rgba(9,108,108,0.14)"
            : "0 4px 16px rgba(0,0,0,0.18)",
        }}
      >
        <span style={{ position: "relative", zIndex: 1 }}>Explore Us</span>

        {/* Arrow icon — shifts right on hover */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: "relative",
            zIndex: 1,
            opacity: hovered ? 1 : 0.65,
            transform: hovered ? "translate(3px,-3px)" : "translate(0,0)",
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </button>

      {/* ── Scroll cue ── */}
      <div
        className="flex items-center gap-2"
        style={{
          opacity: 0.45,
          paddingLeft: "0.25rem",
        }}
      >
        <div
          style={{
            width: 1,
            height: 36,
            background:
              "linear-gradient(to bottom, rgba(167,216,211,0), rgba(167,216,211,0.7), rgba(167,216,211,0))",
            animation: "scrollCuePulse 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(167,216,211,0.8)",
          }}
        >
          Continue
        </span>
      </div>

      <style>{`
        @keyframes scrollCuePulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.85); }
          50%       { opacity: 0.9; transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
