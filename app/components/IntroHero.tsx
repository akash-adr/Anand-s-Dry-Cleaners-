"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function IntroHero() {
  useEffect(() => {
    // Disable browser scroll restoration so refreshes never jump to a
    // previously visited anchor (e.g. #contact-us).
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Run inside rAF so the scroll-to-top fires *after* the full React tree
    // has rendered — including ContactWizard's initial focus side-effect —
    // guaranteeing we always land at the very top on load/refresh.
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleScrollDown = () => {
    const target = document.getElementById("scroll-sequence");
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="home"
      className="relative w-full h-screen min-h-[600px] flex flex-col justify-center overflow-hidden bg-black"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        {/* ── Cinematic bottom fade — seamless handoff to scroll sequence ── */}
        <div
          className="absolute bottom-0 left-0 w-full pointer-events-none"
          style={{
            height: "18vh",
            background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.85) 100%)",
            zIndex: 2,
          }}
        />
      </div>

      {/* ── Main Typography Content ── */}
      <div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col items-start justify-center"
        style={{ paddingLeft: "clamp(40px, 7vw, 96px)" }}
      >
        <h1 className="flex flex-col font-display font-extrabold text-white tracking-tight leading-[0.95]">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{ fontSize: "clamp(4.5rem, 10vw, 11rem)" }}
          >
            Anand&apos;s
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            style={{ fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
            className="text-white/95"
          >
            Dry Cleaners
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
            className="text-white/80"
          >
            &amp; Laundries
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="font-serif italic text-[#096C6C] mt-8 md:mt-12 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          Care Beyond Clean
        </motion.p>
      </div>

      {/* ── Scroll Down Indicator ── */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3 cursor-pointer group"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="font-satoshi text-white/80 text-[11px] uppercase tracking-[0.3em] group-hover:text-white transition-colors duration-300">
          Scroll Down
        </span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="w-full h-full bg-white origin-top"
            animate={{ 
              scaleY: [0, 1, 0],
              y: ["-100%", "0%", "100%"]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
