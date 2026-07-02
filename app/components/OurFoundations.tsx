"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/* ─────────────────────────────────────────
   Framer Motion variants
───────────────────────────────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
      delay: i * 0.13,
    },
  }),
};

/* ─────────────────────────────────────────
   Premium SVG icons — 26 × 26, stroke 1.4
   All share the same visual weight
───────────────────────────────────────── */
const PricingIcon = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#096C6C"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: hovered ? "scale(1.15)" : "scale(1)",
      transition: "transform 0.32s ease-out",
    }}
  >
    {/* Receipt / transparent billing */}
    <path d="M4 4v16l2-2 2 2 2-2 2 2 2-2 2 2 2-2V4H4z" />
    <path d="M8 9h8" />
    <path d="M8 12.5h5" />
    <path d="M8 16h3" />
  </svg>
);

const FabricIcon = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#096C6C"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: hovered ? "scale(1.15)" : "scale(1)",
      transition: "transform 0.32s ease-out",
    }}
  >
    {/* Shield — garment protection */}
    <path d="M12 3L4 6v5.5c0 4.5 3.4 8.3 8 9.5 4.6-1.2 8-5 8-9.5V6L12 3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const SpeedIcon = ({ hovered }: { hovered: boolean }) => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#096C6C"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: hovered ? "scale(1.15)" : "scale(1)",
      transition: "transform 0.32s ease-out",
    }}
  >
    {/* Precision clock */}
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
    <path d="M2.5 12h1.5" />
    <path d="M20 12h1.5" />
    <path d="M12 2.5v1.5" />
  </svg>
);

/* Elegant check — 13 × 13, stroke 1.7 */
const Check = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    stroke="#096C6C"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, marginTop: "1px" }}
  >
    <path d="M2 7l3 3 6-6" />
  </svg>
);

/* ─────────────────────────────────────────
   Card data
───────────────────────────────────────── */
const CARDS = [
  {
    icon: PricingIcon,
    title: "Transparent Pricing",
    description:
      "Enjoy straightforward garment-based pricing with no hidden fees or confusing weight-based calculations. You only pay for the care your clothes actually need.",
    highlights: [
      "Clear estimates before service",
      "No hidden charges",
      "Honest, customer-first billing",
    ],
  },
  {
    icon: FabricIcon,
    title: "Trusted Fabric Care",
    description:
      "Our experienced team combines premium detergents, modern equipment, and specialised handling techniques to protect every fabric and every stitch.",
    highlights: [
      "Gentle on delicate garments",
      "Professional stain treatment",
      "Premium washing & finishing",
    ],
  },
  {
    icon: SpeedIcon,
    title: "Fast & Reliable",
    description:
      "Drop off your laundry and collect it fresh, neatly folded, and ready to wear. Quick turnaround without ever compromising quality.",
    highlights: [
      "Fast standard turnaround",
      "Quality checked before delivery",
      "Consistent, dependable service",
    ],
  },
];

/* ─────────────────────────────────────────
   Individual Card
───────────────────────────────────────── */
function FoundationCard({
  card,
  index,
}: {
  card: (typeof CARDS)[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        /* Lift */
        transform: hovered ? "translateY(-7px)" : "translateY(0px)",
        /* Layered premium shadow */
        boxShadow: hovered
          ? "0 32px 72px rgba(9,108,108,0.12), 0 8px 28px rgba(9,108,108,0.07), 0 1px 4px rgba(9,108,108,0.05)"
          : "0 6px 30px rgba(9,108,108,0.07), 0 2px 8px rgba(9,108,108,0.04)",
        /* Border */
        borderColor: hovered
          ? "rgba(9,108,108,0.20)"
          : "rgba(9,108,108,0.08)",
        transition:
          "transform 0.33s cubic-bezier(0.25,1,0.5,1), box-shadow 0.33s ease-out, border-color 0.28s ease-out",
      }}
      className="relative flex flex-col bg-white rounded-[30px] border overflow-hidden"
    >
      {/* Soft teal ambient glow (top-left corner) — only on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[30px]"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 20% 15%, rgba(9,108,108,0.06) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.38s ease-out",
        }}
      />

      {/* Inner padding container — gives us control without extra nesting */}
      <div className="relative flex flex-col h-full" style={{ padding: "52px 48px 52px" }}>

        {/* ── Icon badge ── */}
        <div
          style={{
            width: "62px",
            height: "62px",
            borderRadius: "20px",
            background: hovered
              ? "rgba(9,108,108,0.12)"
              : "rgba(9,108,108,0.07)",
            border: "1px solid rgba(9,108,108,0.13)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "36px",
            transition: "background 0.3s ease",
          }}
        >
          <Icon hovered={hovered} />
        </div>

        {/* ── Card title ── */}
        <h3
          className="font-satoshi font-bold leading-[1.2]"
          style={{
            fontSize: "21px",
            color: hovered ? "#096C6C" : "#111111",
            marginBottom: "22px",
            transition: "color 0.28s ease-out",
          }}
        >
          {card.title}
        </h3>

        {/* ── Card description ── */}
        <p
          className="font-body leading-[1.9]"
          style={{
            fontSize: "15.5px",
            color: "#4B5563",
            marginBottom: "44px",
          }}
        >
          {card.description}
        </p>

        {/* ── Divider ── */}
        <div
          style={{
            height: "1px",
            background: "rgba(9,108,108,0.09)",
            marginBottom: "34px",
          }}
        />

        {/* ── Highlight bullets ── */}
        <ul className="flex flex-col mt-auto" style={{ gap: "16px" }}>
          {card.highlights.map((h, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <Check />
              <span
                className="font-satoshi font-medium"
                style={{ fontSize: "13.5px", color: "#096C6C", lineHeight: "1.5" }}
              >
                {h}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function OurFoundations() {
  return (
    <section
      id="our-foundations"
      className="relative w-full overflow-hidden"
      style={{ background: "#F8FBFB", zIndex: 20 }}
    >
      {/* Ambient blobs — very soft, non-distracting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "8%",
            right: "4%",
            width: "40%",
            height: "48%",
            background: "rgba(9,108,108,0.04)",
            filter: "blur(160px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "8%",
            left: "4%",
            width: "36%",
            height: "42%",
            background: "rgba(9,108,108,0.028)",
            filter: "blur(160px)",
          }}
        />
      </div>

      {/* ── Main content wrapper ── */}
      <div
        className="relative max-w-[1400px] w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16"
        style={{ paddingTop: "clamp(64px, 10vw, 130px)", paddingBottom: "clamp(64px, 10vw, 140px)", paddingLeft: "clamp(24px, 5vw, 64px)", paddingRight: "clamp(24px, 5vw, 64px)" }}
      >
        <motion.div
          className="flex flex-col items-center w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >

          {/* ════════════════════════════
              Section header
          ════════════════════════════ */}
          <div
            className="flex flex-col items-center text-center w-full mx-auto"
            style={{ marginBottom: "72px", maxWidth: "800px" }}
          >

            {/* Eyebrow label */}
            <motion.div
              variants={fadeUpVariants}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(9,108,108,0.07)",
                border: "1px solid rgba(9,108,108,0.13)",
                borderRadius: "9999px",
                padding: "7px 20px",
                marginBottom: "36px",
              }}
            >
              <span
                className="font-satoshi font-bold uppercase"
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.28em",
                  color: "#096C6C",
                }}
              >
                Our Foundations
              </span>
            </motion.div>

            {/* Main heading — tight leading so the two lines feel unified */}
            <motion.h2
              variants={fadeUpVariants}
              className="font-display font-extrabold tracking-tight text-[#111111]"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4.6rem)",
                lineHeight: 1.04,
                marginBottom: "40px",
              }}
            >
              Simple. Reliable.
              <br />
              <span
                className="font-serif italic font-light"
                style={{ color: "#075f5f" }}
              >
                Spotlessly Clean.
              </span>
            </motion.h2>

            {/* Supporting description — max 670px, comfortable line-height */}
            <motion.p
              variants={fadeUpVariants}
              className="font-body text-[#4B5563]"
              style={{
                fontSize: "17px",
                lineHeight: "1.95",
                maxWidth: "650px",
              }}
            >
              At Anand Laundry, every process is built around three simple
              principles: honest pricing, exceptional garment care, and quick,
              dependable service. From everyday wear to delicate fabrics, we
              make laundry effortless while treating every piece with the
              attention it deserves.
            </motion.p>
          </div>

          {/* ════════════════════════════
              Three premium cards
          ════════════════════════════ */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "24px", maxWidth: "1160px", marginTop: "64px", marginLeft: "auto", marginRight: "auto", width: "100%" }}
          >
            {CARDS.map((card, i) => (
              <FoundationCard key={card.title} card={card} index={i} />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
