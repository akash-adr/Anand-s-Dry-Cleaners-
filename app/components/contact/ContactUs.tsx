"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Layers } from "lucide-react";
import ContactGrid from "./ContactGrid";
import ContactWizard from "./ContactWizard";
import { getIsAudioEnabled, playBubblePop } from "./AudioEngine";
import { cn } from "@/lib/utils";

type WorkspaceMode = "conversational" | "grid";

export default function ContactUs() {
  const [mode, setMode] = useState<WorkspaceMode>("conversational");

  useEffect(() => { getIsAudioEnabled(); }, []);

  const switchMode = (newMode: WorkspaceMode) => {
    if (mode === newMode) return;
    playBubblePop(500, 0.1);
    setMode(newMode);
  };

  const handleInquirySubmit = (data: { name: string; email: string; phone: string; message: string }) => {
    console.log("Inquiry submitted:", data);
  };

  return (
    <section
      id="contact-us"
      className="relative w-full flex flex-col items-center overflow-hidden"
      style={{
        background: "#F4F8F8",
        zIndex: 20,
        borderTop: "1px solid rgba(9,108,108,0.08)",
        paddingTop: "clamp(40px, 4vw, 60px)",
        paddingBottom: "clamp(120px, 15vw, 200px)",
        paddingLeft: "clamp(24px, 5vw, 64px)",
        paddingRight: "clamp(24px, 5vw, 64px)",
      }}
    >
      {/* ─── Content wrapper ─── */}
      <div className="relative w-full max-w-5xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center z-10">

        {/* 1. Section Badge */}
        <motion.div
          className="inline-flex items-center justify-center rounded-full border border-[#096C6C]/[0.18] bg-[#096C6C]/[0.06] backdrop-blur-[12px] shadow-sm w-fit" style={{ padding: "12px 32px" }}
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#096C6C] font-mono text-[11px] font-bold tracking-[0.3em] uppercase">
            Contact Us
          </span>
        </motion.div>

        {/* Spacer: badge → heading = 32px */}
        <div className="h-8" />

        {/* 2. Main Heading */}
        <motion.h2
          className="font-display font-extrabold text-[#111111] tracking-tight leading-[1.05] text-center"
          style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          Connect With Us
        </motion.h2>

        {/* Spacer: heading → subtitle = 16px */}
        <div className="h-4" />

        {/* 3. Subtitle */}
        <motion.p
          className="font-mono text-[11.5px] tracking-[0.26em] text-[#096C6C] uppercase"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          Interactive Contact Experience
        </motion.p>

        {/* Spacer: subtitle → toggle = 48px */}
        <div className="h-12" />

        {/* 4. Mode Toggle Pill */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <div className="flex items-center bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full shadow-sm transition-all duration-300" style={{ padding: "8px", gap: "8px" }}>
            {/* Conversational */}
            <button
              onClick={() => switchMode("conversational")}
              className={cn(
                "flex items-center rounded-full font-mono text-[11px] tracking-widest font-semibold transition-all duration-300 cursor-pointer",
                mode === "conversational"
                  ? "bg-[#111111] text-white shadow-md scale-[1.02]"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50",
              )}
              style={{ padding: "14px 32px", gap: "12px" }}
            >
              <Terminal className="w-4 h-4 shrink-0" />
              Conversational
            </button>

            {/* Grid */}
            <button
              onClick={() => switchMode("grid")}
              className={cn(
                "flex items-center rounded-full font-mono text-[11px] tracking-widest font-semibold transition-all duration-300 cursor-pointer",
                mode === "grid"
                  ? "bg-[#111111] text-white shadow-md scale-[1.02]"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50",
              )}
              style={{ padding: "14px 32px", gap: "12px" }}
            >
              <Layers className="w-4 h-4 shrink-0" />
              Form Grid
            </button>
          </div>
        </motion.div>

        {/* Spacer: toggle → form = 64px */}
        <div className="h-16" />

        {/* 5. Form Workspace */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {mode === "conversational" ? (
              <motion.div
                key="wizard"
                className="w-full"
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.25 }}
              >
                <ContactWizard onSubmit={handleInquirySubmit} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="w-full"
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.25 }}
              >
                <ContactGrid onSubmit={handleInquirySubmit} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
