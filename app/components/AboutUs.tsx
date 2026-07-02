"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AboutUs() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  // Scroll reveal variants
  const blockVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number]
      }
    }
  };

  // Premium SVGs
  const MachineSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M5 7h14" />
      <circle cx="12" cy="14" r="4" />
      <path d="M12 14h.01" />
    </svg>
  );

  const HandlingSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Hook */}
      <path d="M12 7c0-2 1-3 2-3a1.5 1.5 0 1 0-1.5 1.5V7.5" />
      {/* Triangle */}
      <path d="M12 7.5L3.5 14c-.8.6-.8 1.6 0 2.2h17c.8-.6.8-1.6 0-2.2L12 7.5z" />
    </svg>
  );

  const SpeedSVG = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21a9 9 0 1 0-9-9" />
      <path d="M12 7v5l2.5 2.5" />
      <path d="M3 12h2" />
      <path d="M12 3v2" />
      <path d="M21 12h-2" />
    </svg>
  );

  return (
    <section
      id="about-us"
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{
        background: "#FFFFFF",
        zIndex: 20,
        paddingTop: "clamp(64px, 10vw, 140px)",
        paddingBottom: "clamp(64px, 10vw, 140px)",
        paddingLeft: "clamp(24px, 5vw, 64px)",
        paddingRight: "clamp(24px, 5vw, 64px)",
      }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-[45%] h-[45%] rounded-full blur-[140px]" style={{ background: "rgba(9,108,108,0.06)" }} />
        <div className="absolute bottom-[20%] right-[5%] w-[45%] h-[45%] rounded-full blur-[140px]" style={{ background: "rgba(9,108,108,0.04)" }} />
      </div>

      <motion.div
        className="max-w-[1400px] w-full mx-auto px-8 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-start"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={blockVariants}
      >
        {/* ─── LEFT COLUMN ─── */}
        <div className="col-span-1 lg:col-span-7 flex flex-col justify-center items-start w-full">
          
          {/* Eyebrow Label & Rounded Premium Pill Tag */}
          <div className="flex flex-col items-start mb-6" style={{ gap: "12px" }}>
            <motion.span
              className="text-[#096C6C] font-satoshi text-[13px] font-bold tracking-[0.3em] uppercase block"
              variants={fadeUpVariants}
            >
              About Us
            </motion.span>
            
            {/* Badge — 12px below label, 16px bottom margin before heading */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#096C6C]/[0.15] bg-[#096C6C]/[0.05] backdrop-blur-[12px] shadow-sm pointer-events-none"
              style={{ marginBottom: "4px" }}
              variants={fadeUpVariants}
            >
              <span className="text-[#096C6C] text-[12px]">✦</span>
              <span className="text-[#096C6C] font-satoshi text-[12px] font-semibold tracking-wider uppercase">
                Premium Fabric Care Since 2012
              </span>
            </motion.div>
          </div>

          {/* Main Heading with Geometric Bold / Serif Italic contrast */}
          {/* mb-14 = ~56px — intentional whitespace before intro title (28–32px gap) */}
          <motion.h2
            className="text-[#111111] font-display font-extrabold tracking-tight leading-[1.05]"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)", marginBottom: "52px" }}
            variants={fadeUpVariants}
          >
            Fresh Clothes,
            <br />
            <span className="font-serif italic font-light text-[#096C6C]">
              happy you.
            </span>
          </motion.h2>

          {/* Supporting Descriptions */}
          <div className="flex flex-col w-full" style={{ maxWidth: "min(640px, 100%)" }}>
            {/* Intro Title — 16px below heading handled by heading's mb, 16px gap to first para */}
            <motion.p 
              variants={fadeUpVariants} 
              className="font-semibold text-[#111111] text-[16px] md:text-[17px] leading-[1.85]"
              style={{ marginBottom: "16px" }}
            >
              Fresh Clothes, Happy You – Welcome to Anand Laundry
            </motion.p>
            
            {/* Body Paragraphs — 20px between each paragraph, line-height 1.9 for readability */}
            <div className="flex flex-col text-[#4B5563] font-body text-[16px] md:text-[17px] leading-[1.9] w-full" style={{ gap: "20px" }}>
              <motion.p variants={fadeUpVariants}>
                At Anand Laundry, we make laundry effortless and your clothes truly fresh. Whether it's your daily wear, favorite shirts, delicate fabrics, sarees, uniforms, or heavy bedding — we handle it with care and perfection.
              </motion.p>
              
              <motion.p variants={fadeUpVariants}>
                Our expert team offers premium washing, dry cleaning, stain removal, and crisp ironing using high-quality detergents and modern machines. Gentle on fabrics, tough on dirt.
              </motion.p>
              
              <motion.p variants={fadeUpVariants}>
                Drop off your laundry in the morning and pick it up sparkling clean, neatly folded, and smelling amazing — all at honest prices with fast turnaround.
              </motion.p>
            </div>
          </div>

          {/* Closing Statements */}
          {/* mt-10 = 40px above divider (last para → divider ~28px gap + existing space) */}
          <motion.div 
            className="border-t border-[#096C6C]/[0.15] text-[15px] md:text-[16px] font-satoshi w-full"
            style={{ marginTop: "40px", paddingTop: "28px" }}
            variants={fadeUpVariants}
          >
            {/* Brand Statement — stands alone with 20–24px before tagline */}
            <p className="font-bold text-[#096C6C] tracking-wide uppercase" style={{ marginBottom: "14px" }}>
              Simple. Reliable. Spotlessly Clean.
            </p>
            {/* Tagline — 14px below brand statement */}
            <p className="text-[#444444] font-medium">
              Anand Laundry — Where Cleanliness Meets Convenience.
            </p>
          </motion.div>

          {/* Premium Feature Highlights Row */}
          {/* mt-8 = 32px from tagline — matches 28–32px spec */}
          <motion.div 
            className="flex items-center flex-wrap relative z-20 w-full"
            style={{ marginTop: "32px", marginBottom: "40px", gap: "clamp(20px, 4vw, 44px)" }}
            variants={fadeUpVariants}
          >
            {[
              { icon: MachineSVG, label: "Modern Equipment" },
              { icon: HandlingSVG, label: "Expert Handling" },
              { icon: SpeedSVG, label: "Fast Turnaround" }
            ].map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <motion.div
                  key={idx}
                  className="flex items-center font-sans text-[16.5px] font-medium tracking-wide cursor-pointer select-none group whitespace-nowrap"
                  style={{ gap: "11px" }}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.3 }}
                >
                  {/* Icon container — fixed 24×24 so all icons share same bounding box */}
                  <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: "24px", height: "24px" }}>
                    <Icon className="w-full h-full text-[#096C6C]/80 transition-colors duration-300 group-hover:text-[#096C6C]" />
                    <span className="absolute inset-0 bg-[#096C6C]/15 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                  <span className="text-[#6B7280] transition-colors duration-300 group-hover:text-[#096C6C] leading-none">
                    {chip.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <motion.div
          className="col-span-1 lg:col-span-5 flex justify-center items-start relative z-10 w-full"
          variants={fadeUpVariants}
        >
          {/* Framed Visual Card Wrapper (Padded image border) */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              setMousePos({ x: 0, y: 0 });
            }}
            className={cn(
              "relative w-full max-w-[380px] sm:max-w-[420px] md:max-w-[460px] mx-auto rounded-[32px] border bg-white/[0.92] backdrop-blur-[12px] p-4 md:p-5 transition-all duration-500 shadow-2xl flex flex-col items-center mt-4 lg:mt-[88px]",
              isHovered
                ? "border-[#096C6C]/20 shadow-[0_20px_50px_rgba(9,108,108,0.14)]"
                : "border-[#096C6C]/[0.10] shadow-[0_8px_40px_rgba(9,108,108,0.07)]"
            )}
          >
            {/* Image Crop Container */}
            <div className="relative w-full aspect-[3/4] rounded-[24px] overflow-hidden bg-white/[0.01] border border-white/[0.05]">
              {/* Parallax Image */}
              <motion.img
                src="/aboutus.jpg"
                alt="Anand Laundry Facility"
                className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] object-cover"
                animate={{
                  x: isHovered ? mousePos.x * -16 : 0,
                  y: isHovered ? mousePos.y * -16 : 0,
                  scale: isHovered ? 1.03 : 1
                }}
                transition={{
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.35
                }}
              />
            </div>

            {/* Bottom Caption inside the visual card */}
            <div className="w-full text-center pt-8 pb-4 space-y-1.5 opacity-60">
              <p className="text-[#111111]/70 font-serif italic text-[14px] tracking-[0.05em]">
                "Where Cleanliness Meets Convenience"
              </p>
              <p className="text-[#6B7280] font-satoshi text-[9px] font-bold tracking-[0.25em] uppercase">
                Anand Dry Cleaners & Laundries • Since 2012
              </p>
            </div>
          </div>

          {/* Behind-the-image soft halo decoration */}
          <div
            className={cn(
              "absolute -inset-4 rounded-[36px] bg-gradient-to-br from-[#096C6C]/8 to-transparent blur-2xl z-0 pointer-events-none transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          />
        </motion.div>

      </motion.div>
    </section>
  );
}
