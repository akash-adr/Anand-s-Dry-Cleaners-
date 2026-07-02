"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const branches = [
  {
    id: "b1",
    name: "Branch 1",
    tagline: "Premium Fabric Care Center.",
    address: "Kothanur no. 5, post office rd, Hennur-Bagalur Main Road, No. 5 Post Office Road, Bengaluru, Karnataka 560077",
    phone: "080 28444579",
    hours: "7:30am-9:30pm",
    directionsUrl: "https://maps.app.goo.gl/jSDTHnTjxoheKfVa8",
    iframeUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5565705438667!2d77.64640167496988!3d13.063873387260035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19f57e609e05%3A0xfe0d72dbaabde428!2sAnand%27%20s%20Dry%20Cleaners%20%26%20Laundrys!5e0!3m2!1sen!2sin!4v1782995073388!5m2!1sen!2sin",
    description: "Our flagship Anand Laundry location offering complete garment care and premium dry cleaning services.",
    // Premium placeholder images
    image: "/new1.jpeg"
  },
  {
    id: "b2",
    name: "Branch 2",
    tagline: "Advanced Cleaning Hub.",
    address: "Byrathi Bande",
    phone: "Ph:080-23444579",
    hours: "7:30am-9:30pm",
    directionsUrl: "https://maps.app.goo.gl/MFYwxVBE5FnarQ4C8",
    iframeUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3886.336696756373!2d77.65082907507825!3d13.077834987247412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDA0JzQwLjIiTiA3N8KwMzknMTIuMyJF!5e0!3m2!1sen!2sin!4v1782995314627!5m2!1sen!2sin",
    description: "A modern neighborhood branch equipped with advanced cleaning technology and fast turnaround service.",
    image: "/new2.jpeg"
  },
  {
    id: "b3",
    name: "Branch 3",
    tagline: "Express Laundry Boutique.",
    address: "No. 119/3, Shop No 7, Bachanna Complex, Bileshivale, Avalahalli Main Road, Bengaluru-77",
    phone: "9945620820 and 080-23344579",
    hours: "8:00AM-9:00PM",
    directionsUrl: "https://maps.app.goo.gl/KXmDTwhLkqspBH1LA",
    iframeUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3886.711686217689!2d77.66708707507787!3d13.05401498726896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDAzJzE0LjUiTiA3N8KwNDAnMTAuOCJF!5e0!3m2!1sen!2sin!4v1782995777213!5m2!1sen!2sin",
    description: "Conveniently located to provide reliable, premium laundry and garment care with the Anand standard of quality.",
    image: "/new3.jpeg"
  }
];

export default function OurBranches() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeBranch = branches[currentIndex];

  const contentContainerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { staggerChildren: 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] as const } 
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  const contentItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <section
      id="our-branches"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#FFFFFF",
        zIndex: 20,
        paddingTop: "clamp(40px, 4vw, 60px)",
        paddingBottom: "0px",
        paddingLeft: "clamp(24px, 5vw, 64px)",
        paddingRight: "clamp(24px, 5vw, 64px)",
        borderTop: "1px solid rgba(9,108,108,0.06)"
      }}
    >
      <div className="relative max-w-[1600px] w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* Unified Premium Container Background */}
        <div 
          className="relative w-full bg-[#FFFFFF] rounded-[48px] shadow-[0_24px_80px_rgba(9,108,108,0.06)] border border-[#096C6C]/[0.08] overflow-hidden"
          style={{ padding: "clamp(48px, 6vw, 80px)" }}
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: "clamp(48px, 8vw, 120px)" }}>
            
            {/* ─── LEFT COLUMN: Location Explorer ─── */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              
              {/* Zone 1: Static Intro */}
              <div>
                <div className="inline-flex items-center justify-center rounded-full border border-[#096C6C]/[0.15] bg-[#096C6C]/[0.05] backdrop-blur-[12px] shadow-sm w-fit" style={{ padding: "12px 32px", marginBottom: "32px" }}>
                  <span className="text-[#096C6C] font-satoshi text-[12px] font-bold tracking-[0.25em] uppercase">
                    Our Branches
                  </span>
                </div>
                
                <h2 className="text-[#111111] font-display font-extrabold tracking-tight leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 4vw, 4.2rem)", marginBottom: "32px" }}>
                  Discover The <br />
                  <span className="font-serif italic font-light text-[#096C6C]">Anand Quality</span> Near You.
                </h2>
                
                <p className="font-body text-[#6B7280] text-[16px] md:text-[18px] leading-[1.8] max-w-md" style={{ marginBottom: "48px" }}>
                  Every Anand Laundry branch is built around the same commitment to premium garment care, fast turnaround, and exceptional customer service. Find the location most convenient for you.
                </p>
              </div>

              {/* Zone 2: Google Maps Embed */}
              <div 
                className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden bg-[#F8FBFB] border border-[#096C6C]/[0.08]"
                style={{
                  boxShadow: "inset 0 0 40px rgba(9,108,108,0.03), 0 12px 40px rgba(9,108,108,0.06)"
                }}
              >
                <iframe
                  src={activeBranch.iframeUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Zone 3: Bespoke Slider Navbar */}
              <div className="flex bg-[#F4F8F8] rounded-full border border-[#096C6C]/10 w-full max-w-[420px] relative shadow-sm" style={{ padding: "8px", marginTop: "48px", gap: "4px" }}>
                {branches.map((b, i) => {
                  const isActive = currentIndex === i;
                  return (
                    <button 
                      key={b.id} 
                      onClick={() => setCurrentIndex(i)} 
                      className="relative flex-1 font-display font-bold text-[13px] md:text-[14px] tracking-wide outline-none cursor-pointer"
                      style={{ padding: "14px 0" }}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="branchSliderPill" 
                          className="absolute inset-0 bg-white rounded-full shadow-[0_4px_12px_rgba(9,108,108,0.1)] border border-[#096C6C]/[0.08] z-[-1]" 
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className={cn("transition-colors duration-300", isActive ? "text-[#096C6C]" : "text-[#6B7280] hover:text-[#111111]")}>
                        {b.name}
                      </span>
                    </button>
                  );
                })}
              </div>

            </div>

            {/* ─── RIGHT COLUMN: Branch Details Panel ─── */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              
              {/* Hero Image Block */}
              <img 
                src={activeBranch.image} 
                alt={activeBranch.name}
                className="w-full aspect-[4/3] lg:aspect-[16/10] object-cover rounded-[32px] shadow-[0_24px_64px_rgba(9,108,108,0.12)] border border-[#096C6C]/[0.08]" 
                style={{ marginBottom: "56px" }}
              />
              
              {/* Dynamic Content Details */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentIndex}
                  variants={contentContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col flex-grow"
                >
                  <motion.h3 variants={contentItemVariants} className="text-[28px] md:text-[36px] font-display font-bold text-[#111111] tracking-tight" style={{ marginBottom: "12px" }}>
                    {activeBranch.name}
                  </motion.h3>
                  
                  <motion.p variants={contentItemVariants} className="text-[#096C6C] font-serif italic text-[18px] md:text-[22px]" style={{ marginBottom: "48px" }}>
                    {activeBranch.tagline}
                  </motion.p>
                  
                  {/* 2-Column Information Grid */}
                  <motion.div variants={contentItemVariants} className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#096C6C]/[0.08]" style={{ gap: "40px", paddingBottom: "48px", marginBottom: "48px" }}>
                    
                    <div className="flex items-start group" style={{ gap: "16px" }}>
                      <div className="w-12 h-12 rounded-full bg-[#096C6C]/5 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#096C6C]/10">
                        <MapPin className="w-5 h-5 text-[#096C6C]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col pt-1">
                        <span className="font-display font-bold text-[#111111] text-[12px] uppercase tracking-wider" style={{ marginBottom: "8px" }}>Address</span>
                        <span className="font-body text-[#4B5563] text-[16px] leading-[1.6]">{activeBranch.address}</span>
                      </div>
                    </div>

                    <div className="flex items-start group" style={{ gap: "16px" }}>
                      <div className="w-12 h-12 rounded-full bg-[#096C6C]/5 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#096C6C]/10">
                        <Phone className="w-5 h-5 text-[#096C6C]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col pt-1">
                        <span className="font-display font-bold text-[#111111] text-[12px] uppercase tracking-wider" style={{ marginBottom: "8px" }}>Contact</span>
                        <span className="font-body text-[#4B5563] text-[16px] leading-[1.6]">{activeBranch.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-start group" style={{ gap: "16px" }}>
                      <div className="w-12 h-12 rounded-full bg-[#096C6C]/5 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-[#096C6C]/10">
                        <Clock className="w-5 h-5 text-[#096C6C]" strokeWidth={2} />
                      </div>
                      <div className="flex flex-col pt-1">
                        <span className="font-display font-bold text-[#111111] text-[12px] uppercase tracking-wider" style={{ marginBottom: "8px" }}>Hours</span>
                        <span className="font-body text-[#4B5563] text-[16px] leading-[1.6]">{activeBranch.hours}</span>
                      </div>
                    </div>



                  </motion.div>
                  
                  <motion.p variants={contentItemVariants} className="font-body text-[#6B7280] text-[16px] leading-[2]" style={{ marginBottom: "48px" }}>
                    {activeBranch.description}
                  </motion.p>
                  
                  <motion.div variants={contentItemVariants} className="mt-auto">
                    <motion.a 
                      href={activeBranch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-[#111111] text-white rounded-full font-display font-bold text-[14px] tracking-widest border border-transparent cursor-pointer"
                      style={{ padding: "20px 48px", gap: "12px", width: "fit-content" }}
                      whileHover={{ scale: 1.03, backgroundColor: "#096C6C", boxShadow: "0 12px 32px rgba(9,108,108,0.25)" }}
                      whileTap={{ scale: 0.96 }}
                    >
                      GET DIRECTIONS
                      <ArrowUpRight className="w-5 h-5" strokeWidth={2.5} />
                    </motion.a>
                  </motion.div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
