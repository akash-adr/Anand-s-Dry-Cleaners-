"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ─────────────────────────────────────────
   Animation variants
───────────────────────────────────────── */
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.78,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.22, ease: "easeIn" as const },
  },
};

/* ─────────────────────────────────────────
   Tab data
───────────────────────────────────────── */
const TABS = [
  {
    id: "philosophy",
    label: "Our Philosophy",
    content: {
      paragraphs: [
        "We believe every garment tells a story — of effort, occasion, and identity. That belief drives every decision we make, from the detergents we choose to the temperature of the water we use.",
        "By maintaining precise water warmth, hand-finishing cuffs and collars, and using fabric-protective steam plates, we extend the life of every piece entrusted to us. Your clothes deserve more than a machine cycle — they deserve craft.",
      ],
      highlights: [] as string[],
    },
  },
  {
    id: "ecowash",
    label: "Eco-Wash Technology",
    content: {
      paragraphs: [
        "Our specialised facility relies on RO soft-water purifying structures to remove calcium minerals that stiffen fabric threads over time. The result is noticeably softer, brighter clothes after every wash.",
      ],
      highlights: [
        "Zero phosphate detergent formulations",
        "Dynamic moisture-oven drum technology",
        "Dryclean silicone-safe solvents",
        "100% filtered clean-water recycling",
      ],
    },
  },
  {
    id: "promise",
    label: "The Anand Promise",
    content: {
      paragraphs: [
        "Our guarantee is straightforward and absolute: if you find a wrinkle on your fine formals, or if any treatable stain is not meticulously attended to, we will take it back and re-process it immediately — free of charge.",
        "Simple. Reliable. Spotlessly Clean. That is our lifelong promise to every customer who walks through our door.",
      ],
      highlights: [] as string[],
    },
  },
];

/* ─────────────────────────────────────────
   Check icon
───────────────────────────────────────── */
const Check = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 13 13"
    fill="none"
    stroke="#096C6C"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, marginTop: "2px" }}
  >
    <path d="M2 7l3 3 6-6" />
  </svg>
);

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function AboutContinuation() {
  const [activeTab, setActiveTab] = useState("philosophy");
  const [imageHovered, setImageHovered] = useState(false);

  const currentTab = TABS.find((t) => t.id === activeTab)!;

  return (
    <section
      id="about-continuation"
      className="relative w-full overflow-hidden"
      style={{ background: "#FFFFFF", zIndex: 20 }}
    >
      {/* Soft ambient blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "15%",
            left: "3%",
            width: "36%",
            height: "44%",
            background: "rgba(9,108,108,0.035)",
            filter: "blur(150px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "10%",
            right: "4%",
            width: "32%",
            height: "38%",
            background: "rgba(9,108,108,0.025)",
            filter: "blur(150px)",
          }}
        />
      </div>

      {/* ── Content wrapper ── */}
      <div
        className="relative max-w-[1400px] w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16"
        style={{ paddingTop: "clamp(64px, 10vw, 130px)", paddingBottom: "clamp(64px, 10vw, 140px)", paddingLeft: "clamp(24px, 5vw, 64px)", paddingRight: "clamp(24px, 5vw, 64px)" }}
      >
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 xl:gap-24 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={sectionVariants}
        >

          {/* ════════════════════════════
              LEFT — Premium image panel
          ════════════════════════════ */}
          <motion.div
            className="relative w-full lg:w-[42%] xl:w-[44%] flex-shrink-0"
            variants={fadeUpVariants}
            style={{ paddingLeft: "clamp(0px, 3vw, 52px)" }}
          >
            <div
              className="relative rounded-[28px] overflow-hidden"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
              style={{
                boxShadow: imageHovered
                  ? "0 28px 64px rgba(9,108,108,0.14), 0 8px 24px rgba(9,108,108,0.08)"
                  : "0 10px 40px rgba(9,108,108,0.09), 0 2px 10px rgba(9,108,108,0.05)",
                transition: "box-shadow 0.38s ease-out",
                aspectRatio: "4/5",
                maxHeight: "clamp(360px, 50vw, 580px)",
              }}
            >
              {/* Image */}
              <img
                src="/aboutus.jpg"
                alt="Anand's Laundry — Premium garment care"
                className="w-full h-full object-cover"
                style={{
                  transform: imageHovered ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.55s cubic-bezier(0.25,1,0.5,1)",
                  willChange: "transform",
                }}
              />

              {/* Subtle dark gradient at the bottom for badge legibility */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: "40%",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 100%)",
                }}
              />

              {/* Badge */}
              <div
                className="absolute bottom-5 left-5 flex items-center gap-3"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="#096C6C"
                    >
                      <path d="M7 1l1.55 3.14L12 4.64l-2.5 2.43.59 3.43L7 8.77l-3.09 1.73.59-3.43L2 4.64l3.45-.5L7 1z" />
                    </svg>
                  ))}
                </div>

                {/* Text badge */}
                <div>
                  <p
                    className="font-satoshi font-extrabold leading-none"
                    style={{ fontSize: "22px", color: "#FFFFFF" }}
                  >
                    100%
                  </p>
                  <p
                    className="font-satoshi font-bold tracking-[0.18em] uppercase leading-none mt-0.5"
                    style={{ fontSize: "9px", color: "rgba(255,255,255,0.75)" }}
                  >
                    Wrinkle Free
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ════════════════════════════
              RIGHT — Editorial content + tabs
          ════════════════════════════ */}
          <div className="flex flex-col w-full lg:w-[58%] xl:w-[56%]" style={{ paddingTop: "0" }}>

            {/* Eyebrow */}
            <motion.span
              variants={fadeUpVariants}
              className="font-satoshi font-bold uppercase"
              style={{
                fontSize: "12px",
                letterSpacing: "0.3em",
                color: "#096C6C",
                marginBottom: "20px",
                display: "block",
              }}
            >
              Anand Heritage
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={fadeUpVariants}
              className="font-display font-extrabold text-[#111111] tracking-tight"
              style={{
                fontSize: "clamp(2rem, 3.8vw, 3.4rem)",
                lineHeight: 1.1,
                marginBottom: "24px",
              }}
            >
              Anand Laundry —{" "}
              <span
                className="font-serif italic font-light"
                style={{ color: "#075f5f" }}
              >
                Where Cleanliness Meets Convenience.
              </span>
            </motion.h2>

            {/* Sub-description */}
            <motion.p
              variants={fadeUpVariants}
              className="font-body text-[#4B5563]"
              style={{ fontSize: "16.5px", lineHeight: "1.9", marginBottom: "36px", maxWidth: "min(540px, 100%)" }}
            >
              We started with a single purpose: your favourite clothes represent
              your identity, and they deserve bespoke, artisan-level protection.
              Today, we are proud to serve thousands of households daily across
              our branches.
            </motion.p>

            {/* ── Tab navigation ── */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-end gap-0"
              style={{
                borderBottom: "1px solid rgba(9,108,108,0.12)",
                marginBottom: "36px",
              }}
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative font-satoshi font-semibold pb-3 pr-8 text-left transition-colors duration-250"
                    style={{
                      fontSize: "14.5px",
                      color: isActive ? "#096C6C" : "#6B7280",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0 28px 12px 0",
                    }}
                  >
                    {tab.label}

                    {/* Animated underline indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="tab-underline"
                        className="absolute bottom-0 left-0"
                        style={{
                          height: "2.5px",
                          width: "100%",
                          paddingRight: "28px",
                          background: "#096C6C",
                          borderRadius: "2px 2px 0 0",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </motion.div>

            {/* ── Tab content ── */}
            <motion.div variants={fadeUpVariants} className="relative min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col"
                  style={{ gap: "18px" }}
                >
                  {/* Paragraphs */}
                  {currentTab.content.paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="font-body text-[#4B5563]"
                      style={{ fontSize: "16px", lineHeight: "1.9" }}
                    >
                      {para}
                    </p>
                  ))}

                  {/* Highlight grid (Eco-Wash tab) */}
                  {currentTab.content.highlights.length > 0 && (
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 mt-2"
                      style={{ gap: "10px 32px" }}
                    >
                      {currentTab.content.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <Check />
                          <span
                            className="font-satoshi font-medium"
                            style={{ fontSize: "14px", color: "#374151", lineHeight: "1.5" }}
                          >
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* ── CTA ── */}
            <motion.div variants={fadeUpVariants} style={{ marginTop: "40px" }}>
              <a
                href="#contact-us"
                className="inline-flex items-center gap-2.5 font-satoshi font-bold text-[14px] tracking-wide text-[#096C6C] transition-all duration-300 hover:gap-4"
                style={{ letterSpacing: "0.02em" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Talk to our team
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#096C6C"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </a>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
