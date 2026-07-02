"use client";

import React, { useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";

const workflowNodes = [
  {
    id: "collection",
    title: "Collection",
    description: "Drop off your garments or schedule a convenient pickup with Anand Laundry."
  },
  {
    id: "cleaning",
    title: "Expert Cleaning",
    description: "Your items receive specialized washing or dry cleaning using premium products and modern equipment."
  },
  {
    id: "quality",
    title: "Quality Check",
    description: "Every garment is carefully inspected, stain-checked, finished, and professionally prepared."
  },
  {
    id: "delivery",
    title: "Fresh & Ready",
    description: "Your clothes are neatly folded or perfectly pressed and prepared for collection or delivery."
  }
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Highly performant drawing loop connecting the exact DOM centers of the nodes
  useAnimationFrame(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    for (let i = 0; i < workflowNodes.length - 1; i++) {
      const node1 = circleRefs.current[i];
      const node2 = circleRefs.current[i + 1];
      const path = pathRefs.current[i];

      if (node1 && node2 && path) {
        const rect1 = node1.getBoundingClientRect();
        const rect2 = node2.getBoundingClientRect();

        // Calculate centers relative to the container
        const x1 = rect1.left - containerRect.left + rect1.width / 2;
        const y1 = rect1.top - containerRect.top + rect1.height / 2;
        const x2 = rect2.left - containerRect.left + rect2.width / 2;
        const y2 = rect2.top - containerRect.top + rect2.height / 2;

        // Determine orientation to draw elegant curved links
        const isVertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);
        let d = "";

        if (isVertical) {
          // Sweeping curve to the side to avoid text on mobile layout
          const dy = Math.abs(y2 - y1) * 0.5;
          const curveOffset = i % 2 === 0 ? 80 : -80;
          d = `M ${x1} ${y1} C ${x1 + curveOffset} ${y1 + dy * 0.5}, ${x2 + curveOffset} ${y2 - dy * 0.5}, ${x2} ${y2}`;
        } else {
          // Subtle droop for horizontal layout to feel like hanging fabric thread
          const dx = Math.abs(x2 - x1) * 0.4;
          d = `M ${x1} ${y1} C ${x1 + dx} ${y1 + 30}, ${x2 - dx} ${y2 + 30}, ${x2} ${y2}`;
        }

        path.setAttribute("d", d);
      }
    }
  });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const }
    }
  };

  return (
    <section
      id="how-it-works"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#F8FBFB", // Very soft contrasting background compared to Services (White)
        zIndex: 20,
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
        paddingLeft: "clamp(24px, 5vw, 64px)",
        paddingRight: "clamp(24px, 5vw, 64px)",
        borderTop: "1px solid rgba(9,108,108,0.06)"
      }}
    >
      <div className="relative max-w-[1400px] w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* ─── Editorial Header ─── */}
        <motion.div
          className="flex flex-col items-center text-center w-full mb-16 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center rounded-full border border-[#096C6C]/[0.15] bg-[#096C6C]/[0.05] backdrop-blur-[12px] shadow-sm mb-6 md:mb-8" style={{ padding: "12px 32px" }}
            variants={itemVariants}
          >
            <span className="text-[#096C6C] font-satoshi text-[12px] font-bold tracking-[0.25em] uppercase">
              How It Works
            </span>
          </motion.div>

          <motion.h2
            className="text-[#111111] font-display font-extrabold tracking-tight leading-[1.05] mb-6 md:mb-8"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)" }}
            variants={itemVariants}
          >
            Your Laundry,
            <br />
            <span className="font-serif italic font-light text-[#096C6C]">
              Handled With Care.
            </span>
          </motion.h2>

          <motion.p
            className="font-body text-[#4B5563] text-[16px] md:text-[18px] leading-[1.8] max-w-[700px] mx-auto"
            variants={itemVariants}
          >
            From the moment you hand over your garments, every step is carefully managed through expert cleaning, precision finishing, and thorough quality checks—ensuring your clothes return fresh, spotless, and ready to wear.
          </motion.p>
        </motion.div>

        {/* ─── Interactive Workflow Canvas ─── */}
        <motion.div
          ref={containerRef}
          className="relative w-full min-h-[800px] md:min-h-[350px] flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-4 lg:gap-8 z-10 mt-8 md:mt-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          {/* SVG Connection Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
            {/* We create 3 connection lines for the 4 nodes */}
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                ref={(el) => { pathRefs.current[i] = el; }}
                fill="none"
                stroke="url(#gradientTeal)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-opacity duration-500"
                style={{ 
                  opacity: hoveredNode === i || hoveredNode === i + 1 ? 0.6 : 0.2,
                  filter: hoveredNode === i || hoveredNode === i + 1 ? "drop-shadow(0 0 6px rgba(9,108,108,0.4))" : "none"
                }}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.2 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 + i * 0.2 }}
              />
            ))}
            <defs>
              <linearGradient id="gradientTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#096C6C" />
                <stop offset="100%" stopColor="#111111" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timeline Nodes */}
          {workflowNodes.map((node, i) => (
            <motion.div
              key={node.id}
              variants={itemVariants}
              drag
              dragConstraints={{ top: -20, bottom: 20, left: -20, right: 20 }}
              dragElastic={0.2}
              whileDrag={{ scale: 1.02, cursor: "grabbing" }}
              onHoverStart={() => setHoveredNode(i)}
              onHoverEnd={() => setHoveredNode(null)}
              className={cn(
                "relative z-10 flex flex-col items-center text-center cursor-grab w-full max-w-[260px] flex-shrink-0 transition-transform duration-300",
                hoveredNode === i && "-translate-y-1",
                // Stagger logic for mobile zig-zag
                i % 2 === 0 
                  ? "self-start md:self-auto" 
                  : "self-end md:self-auto"
              )}
            >
              <div 
                ref={(el) => { circleRefs.current[i] = el; }}
                className={cn(
                  "relative w-20 h-20 rounded-full bg-white border shadow-[0_8px_30px_rgba(9,108,108,0.06)] flex items-center justify-center mb-6 transition-all duration-300",
                  hoveredNode === i ? "border-[#096C6C]/40 shadow-[0_12px_40px_rgba(9,108,108,0.12)]" : "border-[#096C6C]/15"
                )}
              >
                <span className={cn(
                  "font-display font-bold text-[24px] transition-colors duration-300 z-10",
                  hoveredNode === i ? "text-[#096C6C]" : "text-[#111111]"
                )}>
                  0{i + 1}
                </span>

                {/* Soft ambient glow inside circle on hover */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-full ring-1 ring-inset pointer-events-none transition-all duration-400 z-0",
                    hoveredNode === i ? "ring-[#096C6C]/20 bg-[#096C6C]/[0.03]" : "ring-transparent"
                  )}
                />
              </div>
              
              <h3 className={cn(
                "font-display font-bold text-[19px] md:text-[20px] tracking-tight mb-2.5 transition-colors duration-300",
                hoveredNode === i ? "text-[#096C6C]" : "text-[#111111]"
              )}>
                {node.title}
              </h3>
              
              <p className="font-body text-[#6B7280] text-[15px] leading-[1.65]">
                {node.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
