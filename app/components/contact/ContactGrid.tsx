"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  User,
  Mail,
  PhoneCall,
  MessageSquare,
  AlertCircle,
  Check,
  RotateCcw,
} from "lucide-react";
import { playBubblePop, playSuccessChime } from "./AudioEngine";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface ContactGridProps {
  onSubmit: (data: { name: string; email: string; phone: string; message: string }) => void;
}

type FormData = { name: string; email: string; phone: string; message: string };

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function ContactGrid({ onSubmit }: ContactGridProps) {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", phone: "", message: "" });
  const [errors,   setErrors]   = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  /* ── Handlers ── */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (formData.name.trim().length < 2)           newErrors.name    = "Name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) newErrors.email = "Please provide a valid email.";
    if (formData.phone.replace(/\D/g, "").length < 7) newErrors.phone = "Phone must have at least 7 digits.";
    if (formData.message.trim().length < 8)        newErrors.message = "Message must be at least 8 characters.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) { playBubblePop(220, 0.25); return false; }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    playSuccessChime();
    onSubmit(formData);
  };

  const handleReset = () => {
    playBubblePop(380, 0.18);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setErrors({});
    setSubmitted(false);
  };

  /* ── Shared field wrapper classes ── */
  const fieldWrap = (hasError: boolean, focusColor = "focus-within:border-[#096C6C]") =>
    [
      "relative flex items-center bg-slate-50 border rounded-2xl transition-all duration-200 shadow-xs",
      hasError
        ? "border-red-200 bg-red-50/50"
        : `border-slate-200 ${focusColor} focus-within:bg-white`,
    ].join(" ");

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div className="relative w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center">

      {/* ── Main Glass Panel ── */}
      <motion.div
        className="w-full bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-[40px] shadow-[0_24px_50px_-12px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.6)] relative overflow-hidden flex flex-col"
        style={{ padding: "clamp(40px, 5vw, 64px)" }}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 100 }}
      >
        {/* Top sheen */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/60 to-transparent pointer-events-none rounded-t-[40px]" />

        {/* ── Section header ── */}
        <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto" style={{ marginBottom: "48px" }}>
          <div className="w-14 h-14 rounded-full bg-[#096C6C]/10 border border-[#096C6C]/20 flex items-center justify-center" style={{ marginBottom: "24px" }}>
            <Mail className="w-6 h-6 text-[#096C6C]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 font-display" style={{ marginBottom: "12px" }}>
            Send Us a Message
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-body leading-relaxed">
            Fill in your details below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* ── Form / Success AnimatePresence ── */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="grid-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {/* ── Grid: Name / Email / Phone / Message ── */}
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "32px" }}>

                {/* Full Name */}
                <div className="flex flex-col">
                  <label htmlFor="grid-name" className="text-xs font-semibold uppercase tracking-wider text-slate-500" style={{ paddingLeft: "8px", marginBottom: "12px" }}>
                    Full Name
                  </label>
                  <div className={fieldWrap(!!errors.name)} style={{ padding: "6px" }}>
                    <div className="text-[#096C6C] shrink-0" style={{ marginLeft: "16px", marginRight: "16px" }}>
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      id="grid-name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => playBubblePop(500, 0.04)}
                      placeholder="Jane Doe"
                      className="w-full bg-transparent border-0 outline-none placeholder-slate-400 text-sm md:text-base text-slate-800 font-body focus:ring-0"
                      style={{ padding: "16px 20px 16px 0" }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        className="text-[11px] text-red-500 flex items-center gap-1 font-mono"
                        style={{ paddingLeft: "8px", marginTop: "8px" }}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Address */}
                <div className="flex flex-col">
                  <label htmlFor="grid-email" className="text-xs font-semibold uppercase tracking-wider text-slate-500" style={{ paddingLeft: "8px", marginBottom: "12px" }}>
                    Email Address
                  </label>
                  <div className={fieldWrap(!!errors.email)} style={{ padding: "6px" }}>
                    <div className="text-[#096C6C] shrink-0" style={{ marginLeft: "16px", marginRight: "16px" }}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      id="grid-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => playBubblePop(550, 0.04)}
                      placeholder="jane@example.com"
                      className="w-full bg-transparent border-0 outline-none placeholder-slate-400 text-sm md:text-base text-slate-800 font-body focus:ring-0"
                      style={{ padding: "16px 20px 16px 0" }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        className="text-[11px] text-red-500 flex items-center gap-1 font-mono"
                        style={{ paddingLeft: "8px", marginTop: "8px" }}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                  <label htmlFor="grid-phone" className="text-xs font-semibold uppercase tracking-wider text-slate-500" style={{ paddingLeft: "8px", marginBottom: "12px" }}>
                    Phone Number
                  </label>
                  <div className={fieldWrap(!!errors.phone)} style={{ padding: "6px" }}>
                    <div className="text-[#096C6C] shrink-0" style={{ marginLeft: "16px", marginRight: "16px" }}>
                      <PhoneCall className="w-5 h-5" />
                    </div>
                    <input
                      id="grid-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onFocus={() => playBubblePop(600, 0.04)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-transparent border-0 outline-none placeholder-slate-400 text-sm md:text-base text-slate-800 font-body focus:ring-0"
                      style={{ padding: "16px 20px 16px 0" }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.phone && (
                      <motion.p
                        className="text-[11px] text-red-500 flex items-center gap-1 font-mono"
                        style={{ paddingLeft: "8px", marginTop: "8px" }}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.phone}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Tip / switch-mode nudge */}
                <div className="flex flex-col" style={{ paddingTop: "28px" }}>
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center justify-between h-full" style={{ padding: "20px 24px" }}>
                    <div className="flex flex-col h-full justify-center">
                      <span className="text-xs font-mono text-[#096C6C] font-bold uppercase tracking-wide" style={{ marginBottom: "6px" }}>Pro tip</span>
                      <span className="text-sm text-slate-500 leading-relaxed">
                        Try our guided conversational mode — it takes only 2 minutes!
                      </span>
                    </div>
                  </div>
                </div>

                {/* Your Message — full width */}
                <div className="md:col-span-2 flex flex-col">
                  <label htmlFor="grid-message" className="text-xs font-semibold uppercase tracking-wider text-slate-500" style={{ paddingLeft: "8px", marginBottom: "12px" }}>
                    Your Message
                  </label>
                  <div className={[
                    "relative flex bg-slate-50 border rounded-2xl transition-all duration-200 shadow-xs",
                    errors.message
                      ? "border-red-200 bg-red-50/50"
                      : "border-slate-200 focus-within:border-[#096C6C] focus-within:bg-white",
                  ].join(" ")} style={{ padding: "6px" }}>
                    <div className="text-[#096C6C] shrink-0" style={{ marginTop: "20px", marginLeft: "16px", marginRight: "16px" }}>
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <textarea
                      id="grid-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => playBubblePop(450, 0.04)}
                      placeholder="Tell us about the garments you need serviced, or share any questions…"
                      className="w-full bg-transparent border-0 outline-none placeholder-slate-400 text-sm md:text-base text-slate-800 font-body resize-none focus:ring-0"
                      style={{ padding: "20px 24px 20px 0" }}
                    />
                  </div>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.p
                        className="text-[11px] text-red-500 flex items-center gap-1 font-mono"
                        style={{ paddingLeft: "8px", marginTop: "8px" }}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        {errors.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ── Footer Action Row ── */}
              <div className="flex flex-col sm:flex-row justify-end items-center border-t border-slate-150" style={{ marginTop: "48px", paddingTop: "32px", gap: "24px" }}>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs font-mono tracking-wider transition-colors duration-200 cursor-pointer w-full sm:w-auto"
                  style={{ padding: "18px 32px" }}
                >
                  <RotateCcw className="w-4 h-4" />
                  CLEAR FORM
                </button>
                <motion.button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#111111] hover:bg-[#096C6C] text-white font-mono font-bold text-xs tracking-wider shadow-xs transition-colors duration-300 cursor-pointer w-full sm:w-auto border border-transparent"
                  style={{ padding: "18px 40px" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Send className="w-4 h-4" />
                  LAUNCH MESSAGE VESSEL
                </motion.button>
              </div>
            </motion.form>

          ) : (
            /* ── Success screen ── */
            <motion.div
              key="grid-success"
              className="flex flex-col items-center justify-center text-center py-12"
              style={{ gap: "32px" }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 18 }}
            >
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200 relative z-10">
                  <Check className="w-10 h-10 text-emerald-600" strokeWidth={2.5} />
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border border-emerald-200/50"
                  initial={{ scale: 1 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                />
              </div>

              <div className="flex flex-col items-center" style={{ gap: "12px" }}>
                <h3 className="text-3xl font-bold text-slate-900 font-display tracking-tight">
                  Message Sent Successfully!
                </h3>
                <p className="text-base text-slate-500 max-w-sm mx-auto leading-relaxed font-body">
                  Thank you for reaching out. Our team will review your message and get back to you shortly.
                </p>
              </div>

              <motion.button
                onClick={handleReset}
                className="rounded-full bg-[#111111] hover:bg-[#096C6C] text-white text-xs font-mono font-bold tracking-widest shadow-xs cursor-pointer border border-transparent transition-colors duration-300"
                style={{ padding: "16px 32px" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Another Message
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
