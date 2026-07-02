"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Send,
  ShieldAlert,
  User,
  Mail,
  PhoneCall,
  MessageSquareCode,
  Edit2,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { playBubblePop, playSuccessChime } from "./AudioEngine";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type FormStep = "name" | "email" | "phone" | "message" | "review" | "submitted";

interface ContactWizardProps {
  onSubmit: (data: { name: string; email: string; phone: string; message: string }) => void;
}

/* ─────────────────────────────────────────────
   Step metadata
───────────────────────────────────────────── */
const STEPS: { id: FormStep; label: string }[] = [
  { id: "name",    label: "Identification"   },
  { id: "email",   label: "Digital Address"  },
  { id: "phone",   label: "Direct Line"      },
  { id: "message", label: "Inquiry Payload"  },
  { id: "review",  label: "Blueprint Review" },
];

/* ─────────────────────────────────────────────
   Dialog prompts (personalised per step)
───────────────────────────────────────────── */
const getPrompt = (step: FormStep, name: string) => {
  switch (step) {
    case "name":    return "Hello there! What's your full name?";
    case "email":   return `Nice to meet you, ${name.split(" ")[0] || "you"}! What is your email address?`;
    case "phone":   return `Perfect. What's the best phone number to reach you at?`;
    case "message": return `Excellent. Tell us about the garments you need serviced.`;
    case "review":  return "Everything looks good. Ready to send this inquiry?";
    default:        return "";
  }
};

const STEP_ICONS: Record<string, React.ReactNode> = {
  name:    <User            className="w-5 h-5 text-[#096C6C]" />,
  email:   <Mail            className="w-5 h-5 text-[#096C6C]" />,
  phone:   <PhoneCall       className="w-5 h-5 text-[#096C6C]" />,
  message: <MessageSquareCode className="w-5 h-5 text-[#096C6C]" />,
};

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function ContactWizard({ onSubmit }: ContactWizardProps) {
  const [step,      setStep]      = useState<FormStep>("name");
  const [formData,  setFormData]  = useState({ name: "", email: "", phone: "", message: "" });
  const [inputVal,  setInputVal]  = useState("");
  const [errorText, setErrorText] = useState("");

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  const isMounted = useRef(false);

  /* Auto-focus input on step change — skip the very first render so the
     browser does NOT scroll the viewport down to this input on page load. */
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    inputRef.current?.focus();
  }, [step]);

  /* Sync local input with saved data when navigating back */
  useEffect(() => {
    setErrorText("");
    if (step === "name")    setInputVal(formData.name);
    else if (step === "email")   setInputVal(formData.email);
    else if (step === "phone")   setInputVal(formData.phone);
    else if (step === "message") setInputVal(formData.message);
    else setInputVal("");
  }, [step]);

  /* ── Validation ── */
  const validate = (): boolean => {
    if (step === "name") {
      if (inputVal.trim().length < 2) {
        setErrorText("Please provide a name with at least 2 characters.");
        playBubblePop(220, 0.25);
        return false;
      }
    } else if (step === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputVal.trim())) {
        setErrorText("Please provide a valid email address.");
        playBubblePop(220, 0.25);
        return false;
      }
    } else if (step === "phone") {
      if (inputVal.replace(/\D/g, "").length < 7) {
        setErrorText("Please enter a valid phone number (at least 7 digits).");
        playBubblePop(220, 0.25);
        return false;
      }
    } else if (step === "message") {
      if (inputVal.trim().length < 8) {
        setErrorText("Please write a message of at least 8 characters.");
        playBubblePop(220, 0.25);
        return false;
      }
    }
    return true;
  };

  /* ── Next step ── */
  const handleNext = () => {
    if (!validate()) return;
    const updated = { ...formData };
    if (step === "name")    updated.name    = inputVal.trim();
    if (step === "email")   updated.email   = inputVal.trim();
    if (step === "phone")   updated.phone   = inputVal.trim();
    if (step === "message") updated.message = inputVal.trim();
    setFormData(updated);
    playBubblePop(450 + Math.random() * 150, 0.18);
    if (step === "name")    setStep("email");
    else if (step === "email")   setStep("phone");
    else if (step === "phone")   setStep("message");
    else if (step === "message") setStep("review");
  };

  const handleBackTo = (target: FormStep) => {
    playBubblePop(300, 0.12);
    setStep(target);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step !== "message") {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step !== "review") return;
    playSuccessChime();
    onSubmit(formData);
    setStep("submitted");
  };

  const handleReset = () => {
    playBubblePop(380, 0.18);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setInputVal("");
    setErrorText("");
    setStep("name");
  };

  /* Completed steps for footer field pills */
  const completedPills = [
    { key: "name" as FormStep, label: "Name",  val: formData.name },
    { key: "email" as FormStep, label: "Email", val: formData.email },
    { key: "phone" as FormStep, label: "Phone", val: formData.phone },
    { key: "message" as FormStep, label: "Message", val: formData.message },
  ].filter((p) => p.val);

  /* ── Is a step completed? ── */
  const isCompleted = (s: FormStep) =>
    (s === "name"    && !!formData.name) ||
    (s === "email"   && !!formData.email) ||
    (s === "phone"   && !!formData.phone) ||
    (s === "message" && !!formData.message) ||
    (s === "review"  && step === "submitted");

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <div className="relative w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center">

      {/* ── Main Glass Card ── */}
      <motion.div
        className="w-full bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-[40px] shadow-[0_24px_50px_-12px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,0.6)] relative overflow-hidden flex flex-col md:flex-row min-h-[520px]"
        style={{ padding: "clamp(40px, 5vw, 64px)" }}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 22, stiffness: 100 }}
      >
        {/* Top/bottom sheens */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white/60 to-transparent pointer-events-none rounded-t-[40px]" />
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-slate-50/20 to-transparent pointer-events-none rounded-b-[40px]" />

        {/* ════════════════════════════════════════════
            LEFT SIDEBAR — Step Tracker
        ════════════════════════════════════════════ */}
        <div
          className="flex md:flex-col items-center md:items-start justify-center md:justify-start shrink-0 border-b md:border-b-0 md:border-r border-slate-200/60 pb-6 md:pb-0 gap-3 md:gap-0"
          style={{ width: "auto", minWidth: 0 }}
        >
          {/* Desktop: fixed sidebar width + right padding as gap */}
          <div className="hidden md:flex flex-col h-full" style={{ width: "240px", paddingRight: "48px" }}>
            {/* Brand accent top */}
            <div className="flex items-center gap-3" style={{ marginBottom: "48px" }}>
              <div className="w-10 h-10 rounded-full bg-[#096C6C]/10 border border-[#096C6C]/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#096C6C]" />
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold tracking-[0.25em] text-[#096C6C] uppercase leading-none">
                  Contact Form
                </p>
                <p className="font-mono text-[9px] text-slate-400 tracking-wider mt-1.5">
                  Step-by-step
                </p>
              </div>
            </div>

            {/* Step list — vertical on desktop */}
            <div className="flex flex-col" style={{ gap: "36px" }}>
              {STEPS.map((s, idx) => {
                const isActive = step === s.id;
                const done = isCompleted(s.id);
                return (
                  <div key={s.id} className="flex items-center" style={{ gap: "16px" }}>
                    <motion.button
                      disabled={!done && !isActive}
                      onClick={() => {
                        if ((done || isActive) && step !== "submitted") handleBackTo(s.id);
                      }}
                      className={[
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border outline-none shrink-0",
                        isActive
                          ? "bg-[#096C6C] border-[#096C6C] text-white shadow-[0_0_0_4px_rgba(9,108,108,0.12)]"
                          : done
                          ? "bg-[#096C6C]/10 border-[#096C6C]/30 text-[#096C6C] hover:bg-[#096C6C]/20 cursor-pointer"
                          : "bg-slate-100/60 border-slate-200/80 text-slate-400 cursor-not-allowed",
                      ].join(" ")}
                      whileHover={done || isActive ? { scale: 1.12 } : {}}
                      whileTap={done || isActive ? { scale: 0.95 } : {}}
                    >
                      {done ? (
                        <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                      ) : (
                        <span className="font-mono text-[10px] font-bold">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      )}
                    </motion.button>

                    <span
                      className={[
                        "font-mono text-[11px] tracking-tight transition-all duration-200 leading-none",
                        isActive ? "text-[#111111] font-bold"
                                 : done ? "text-[#096C6C] font-semibold"
                                 : "text-slate-400 font-medium",
                      ].join(" ")}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step counter at bottom */}
            <div className="mt-auto" style={{ paddingTop: "48px" }}>
              <p className="font-mono text-[10px] text-slate-400 tracking-wider">
                {step === "submitted"
                  ? "✓ Complete"
                  : step === "review"
                  ? "Review & send"
                  : `Step ${Math.min(stepIndex + 1, 4)} of 4`}
              </p>
            </div>
          </div>

          {/* Mobile: horizontal step dots */}
          <div className="flex md:hidden gap-3">
            {STEPS.map((s, idx) => {
              const isActive = step === s.id;
              const done = isCompleted(s.id);
              return (
                <motion.button
                  key={s.id}
                  disabled={!done && !isActive}
                  onClick={() => {
                    if ((done || isActive) && step !== "submitted") handleBackTo(s.id);
                  }}
                  className={[
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all border outline-none shrink-0",
                    isActive
                      ? "bg-[#096C6C] border-[#096C6C] text-white shadow-[0_0_0_4px_rgba(9,108,108,0.12)]"
                      : done
                      ? "bg-[#096C6C]/10 border-[#096C6C]/30 text-[#096C6C] hover:bg-[#096C6C]/20 cursor-pointer"
                      : "bg-slate-100/60 border-slate-200/80 text-slate-400 cursor-not-allowed",
                  ].join(" ")}
                  whileHover={done || isActive ? { scale: 1.12 } : {}}
                  whileTap={done || isActive ? { scale: 0.95 } : {}}
                >
                  {done ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                  ) : (
                    <span className="font-mono text-[10px] font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            RIGHT MAIN STAGE
        ════════════════════════════════════════════ */}
        <div className="flex-1 flex flex-col justify-between min-h-[360px]" style={{ paddingLeft: "48px" }}>

          {/* ── Content area ── */}
          <div className="flex-1 flex flex-col justify-start pt-2">
            <AnimatePresence mode="wait">

              {/* ─── Input Steps ─── */}
              {step !== "review" && step !== "submitted" && (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 24, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -24, filter: "blur(4px)" }}
                  transition={{ duration: 0.28 }}
                >
                  {/* Speech bubble prompt */}
                  <div className="relative bg-slate-100/90 border border-slate-200/60 rounded-2xl flex items-center justify-between" style={{ padding: "24px 32px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                    {/* Left-pointing speech tail */}
                    <div className="absolute top-8 -left-3 w-0 h-0 border-t-8 border-t-transparent border-r-[12px] border-r-slate-100/95 border-b-8 border-b-transparent" />
                    
                    <p className="text-sm md:text-base leading-relaxed font-body font-medium text-slate-800" style={{ marginLeft: "16px" }}>
                      {getPrompt(step, formData.name)}
                    </p>
                    
                    <div className="opacity-25" style={{ marginLeft: "24px" }}>
                      {STEP_ICONS[step]}
                    </div>
                  </div>

                  {/* ── Input field ── */}
                  <div style={{ marginTop: "32px" }}>
                    {step === "message" ? (
                      /* Textarea */
                      <div className="relative group rounded-3xl bg-slate-50 border border-slate-200 focus-within:border-[#096C6C] focus-within:bg-white shadow-xs overflow-hidden transition-all duration-300" style={{ padding: "8px" }}>
                        <textarea
                          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                          id="wizard-textarea"
                          value={inputVal}
                          onChange={(e) => { setInputVal(e.target.value); setErrorText(""); }}
                          onKeyDown={handleKeyDown}
                          placeholder="Your thoughts, ideas, or questions…"
                          rows={5}
                          className="w-full bg-transparent border-0 outline-none placeholder-slate-400 text-slate-800 font-body text-sm md:text-base resize-none focus:ring-0"
                          style={{ padding: "20px 24px" }}
                        />
                        {/* Send button */}
                        <div className="flex justify-end" style={{ padding: "0 16px 16px" }}>
                          <motion.button
                            type="button"
                            onClick={handleNext}
                            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#111111] hover:bg-[#096C6C] text-white font-mono text-[11px] tracking-widest font-bold transition-all duration-300 border border-transparent cursor-pointer"
                            whileHover={{ scale: 1.03, boxShadow: "0 6px 16px rgba(0,0,0,0.15)" }}
                            whileTap={{ scale: 0.96 }}
                          >
                            Review Details
                            <ArrowRight className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      /* Pill text input */
                      <div className="relative flex items-center group rounded-full bg-slate-50 border border-slate-200 focus-within:border-[#096C6C] focus-within:bg-white shadow-xs transition-all duration-300" style={{ padding: "8px" }}>
                        <div className="shrink-0 text-slate-400" style={{ paddingLeft: "20px", marginRight: "20px" }}>
                          {STEP_ICONS[step]}
                        </div>
                        <input
                          ref={inputRef as React.RefObject<HTMLInputElement>}
                          id="wizard-input"
                          type={step === "email" ? "email" : step === "phone" ? "tel" : "text"}
                          value={inputVal}
                          onChange={(e) => { setInputVal(e.target.value); setErrorText(""); }}
                          onKeyDown={handleKeyDown}
                          placeholder={
                            step === "name"  ? "Type your full name…"    :
                            step === "email" ? "Type your email address…" :
                                              "Type your phone number…"
                          }
                          className="w-full bg-transparent border-0 outline-none placeholder-slate-400 text-slate-800 font-body text-sm md:text-base focus:ring-0"
                          style={{ padding: "20px 24px 20px 0" }}
                        />
                        <motion.button
                          type="button"
                          onClick={handleNext}
                          className="rounded-full bg-[#111111] hover:bg-[#096C6C] text-white transition-all duration-300 shrink-0 cursor-pointer border border-transparent"
                          style={{ padding: "16px", marginRight: "4px" }}
                          whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Confirm"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    )}

                    {/* Hint row */}
                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono" style={{ marginTop: "16px", paddingLeft: "40px", paddingRight: "16px" }}>
                      <span>
                        {step === "message" ? "Press Send below when finished" : "Press Enter ↵ to proceed"}
                      </span>
                      {inputVal.length > 0 && (
                        <span>{inputVal.length} chars</span>
                      )}
                    </div>
                  </div>

                  {/* Validation error */}
                  <AnimatePresence>
                    {errorText && (
                      <motion.div
                        className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl text-xs font-body shadow-xs"
                        style={{ marginTop: "16px" }}
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                      >
                        <ShieldAlert className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{errorText}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ─── Review Stage ─── */}
              {step === "review" && (
                <motion.div
                  key="review"
                  className="flex flex-col"
                  style={{ gap: "32px" }}
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
                      Let&apos;s review your inquiry!
                    </h3>
                    <p className="text-sm text-slate-500 font-mono" style={{ marginTop: "8px" }}>
                      Click any field below to edit, or send it directly.
                    </p>
                  </div>

                  {/* Letter Blueprint envelope */}
                  <div className="relative rounded-3xl bg-slate-50 border border-slate-200/80 shadow-xs" style={{ padding: "32px" }}>
                    {/* Stamp header */}
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-b border-slate-200/60" style={{ paddingBottom: "16px", marginBottom: "24px" }}>
                      <span>INQUIRY_CAPSULE</span>
                      <span>{new Date().toISOString().substring(0, 10)}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "16px" }}>
                      {/* Name tile */}
                      <motion.div
                        onClick={() => handleBackTo("name")}
                        className="bg-white hover:bg-[#096C6C]/5 border border-slate-150 hover:border-[#096C6C]/30 rounded-2xl cursor-pointer transition-all duration-200 relative group"
                        style={{ padding: "16px" }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-[10px] uppercase tracking-wider font-mono text-[#096C6C] font-bold" style={{ marginBottom: "8px" }}>Name</div>
                        <div className="text-slate-800 font-medium text-sm truncate pr-5">{formData.name}</div>
                        <Edit2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#096C6C] absolute top-4 right-4 transition-colors" />
                      </motion.div>

                      {/* Email tile */}
                      <motion.div
                        onClick={() => handleBackTo("email")}
                        className="bg-white hover:bg-[#096C6C]/5 border border-slate-150 hover:border-[#096C6C]/30 rounded-2xl cursor-pointer transition-all duration-200 relative group"
                        style={{ padding: "16px" }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-[10px] uppercase tracking-wider font-mono text-[#096C6C] font-bold" style={{ marginBottom: "8px" }}>Email</div>
                        <div className="text-slate-800 font-medium text-sm truncate pr-5">{formData.email}</div>
                        <Edit2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#096C6C] absolute top-4 right-4 transition-colors" />
                      </motion.div>

                      {/* Phone tile */}
                      <motion.div
                        onClick={() => handleBackTo("phone")}
                        className="bg-white hover:bg-[#096C6C]/5 border border-slate-150 hover:border-[#096C6C]/30 rounded-2xl cursor-pointer transition-all duration-200 relative group"
                        style={{ padding: "16px" }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="text-[10px] uppercase tracking-wider font-mono text-[#096C6C] font-bold" style={{ marginBottom: "8px" }}>Phone</div>
                        <div className="text-slate-800 font-medium text-sm truncate pr-5">{formData.phone}</div>
                        <Edit2 className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#096C6C] absolute top-4 right-4 transition-colors" />
                      </motion.div>

                      {/* Message tile — full width */}
                      <div className="md:col-span-3 bg-white border border-slate-150 rounded-2xl" style={{ padding: "20px" }}>
                        <div className="flex justify-between items-center" style={{ marginBottom: "12px" }}>
                          <span className="text-[10px] uppercase tracking-wider font-mono text-[#096C6C] font-bold">Message</span>
                          <button
                            onClick={() => handleBackTo("message")}
                            className="text-[10px] font-mono text-slate-500 hover:text-[#096C6C] underline cursor-pointer transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="text-slate-600 text-sm leading-relaxed max-h-24 overflow-y-auto pr-1">
                          &quot;{formData.message}&quot;
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review action buttons */}
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-end" style={{ gap: "16px", paddingTop: "8px" }}>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs font-mono tracking-wider transition-colors duration-200 cursor-pointer"
                      style={{ padding: "16px 32px" }}
                    >
                      <RotateCcw className="w-4 h-4" />
                      CLEAR & RESET
                    </button>
                    <motion.button
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-full bg-[#096C6C] hover:bg-[#075A5A] text-white font-mono font-bold text-xs tracking-wider shadow-sm cursor-pointer border border-transparent transition-colors duration-200"
                      style={{ padding: "16px 40px" }}
                      whileHover={{ scale: 1.03, boxShadow: "0 8px 20px rgba(9,108,108,0.25)" }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Send className="w-4 h-4" />
                      SEND INQUIRY
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* ─── Success Screen ─── */}
              {step === "submitted" && (
                <motion.div
                  key="submitted"
                  className="flex flex-col items-center justify-center text-center py-12"
                  style={{ gap: "32px" }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 16 }}
                >
                  <div className="relative">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-200 relative z-10"
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    >
                      <Check className="w-10 h-10 text-emerald-600" strokeWidth={2.5} />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 rounded-full border border-emerald-200/50"
                      initial={{ scale: 1 }}
                      animate={{ scale: 2.4, opacity: 0 }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <h3 className="text-3xl font-bold text-emerald-600 font-display tracking-tight">
                      Inquiry Sent Successfully!
                    </h3>
                    <p className="text-base text-slate-600 max-w-sm mx-auto leading-relaxed font-body">
                      Thank you, <span className="text-[#096C6C] font-bold">{formData.name}</span>!{" "}
                      Your message has been received. We will be in touch shortly.
                    </p>
                  </div>

                  <motion.button
                    onClick={handleReset}
                    className="rounded-full bg-[#111111] hover:bg-[#096C6C] text-white text-xs font-mono font-bold tracking-widest shadow-xs cursor-pointer border border-transparent transition-colors duration-300"
                    style={{ padding: "16px 36px" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Footer Controls Bar ── */}
          {step !== "submitted" && step !== "review" && (
            <div className="border-t border-slate-150 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3" style={{ marginTop: "48px", paddingTop: "32px" }}>
              {/* Collected field pills */}
              <div className="flex flex-wrap gap-2 items-center">
                {completedPills.length > 0 ? (
                  <>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest" style={{ marginRight: "8px" }}>
                      Collected:
                    </span>
                    {completedPills.map((p) => (
                      <motion.button
                        key={p.key}
                        onClick={() => handleBackTo(p.key)}
                        className="rounded-full bg-[#096C6C]/8 hover:bg-[#096C6C]/15 border border-[#096C6C]/20 text-[#096C6C] text-[10px] font-mono select-none flex items-center gap-1.5 cursor-pointer transition-colors"
                        style={{ padding: "6px 16px" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="opacity-65">{p.label}:</span>
                        <span className="max-w-[72px] truncate font-medium">{p.val}</span>
                      </motion.button>
                    ))}
                  </>
                ) : (
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest" style={{ paddingLeft: "8px" }}>
                    Your answers will appear here
                  </span>
                )}
              </div>

              {/* Back button */}
              {step !== "name" && (
                <button
                  type="button"
                  onClick={() => {
                    const steps: FormStep[] = ["name", "email", "phone", "message"];
                    const idx = steps.indexOf(step as FormStep);
                    if (idx > 0) {
                      setStep(steps[idx - 1]);
                      playBubblePop(350, 0.12);
                    }
                  }}
                  className="text-[11px] font-mono text-slate-400 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                >
                  ← Go back
                </button>
              )}
            </div>
          )}

        </div>{/* /right stage */}
      </motion.div>
    </div>
  );
}
