"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  { 
    id: "wash", 
    name: "Washing Clothes", 
    image: "/services/washing-clothes.jpeg",
    description: "Your everyday clothes deserve more than just a basic wash—they deserve professional care that keeps them fresh, clean, and long-lasting. Our washing service is specially designed to remove dirt, sweat, stains, and unwanted odors while protecting the softness and quality of every fabric. We use premium detergents and fabric-friendly cleaning techniques to ensure a deep yet gentle wash. Each garment is carefully inspected and sorted before cleaning to provide the right level of care. Our advanced washing process helps maintain the brightness of whites and the richness of colors without causing fading or damage. Delicate fabrics are handled with extra attention to preserve their texture and finish. We focus on hygiene and cleanliness, ensuring every item is thoroughly washed and refreshed. From everyday casual wear to family laundry loads, every piece is treated with the same care and precision. Our methods help extend the life of your garments while keeping them soft and comfortable to wear. Once cleaned, your clothes are neatly finished and ready for immediate use. With professional handling and attention to detail at every step, we deliver laundry that looks, feels, and smells fresh. Save time and enjoy the confidence of perfectly laundered clothes with our reliable and high-quality washing service.",
    span: "md:col-span-2 lg:col-span-2 lg:row-span-2" 
  },
  { 
    id: "dry", 
    name: "Dry Cleaning", 
    image: "/services/dry-cleaning.jpeg",
    description: "Specialized cleaning for delicate and premium fabrics that require extra care. Our process removes stains and refreshes garments without damaging their texture or fit.",
    span: "md:col-span-2 lg:col-span-2" 
  },
  { 
    id: "iron", 
    name: "Ironing", 
    image: "/services/ironing.jpeg",
    description: "Achieve a crisp, wrinkle-free finish with our professional steam ironing service. Every garment is neatly pressed for a polished, ready-to-wear look.",
    span: "md:col-span-1 lg:col-span-1" 
  },
  { 
    id: "shoe", 
    name: "Shoe Cleaning", 
    image: "/services/shoe-cleaning.jpeg",
    description: "Restore the freshness and appearance of your favorite footwear. We carefully clean and rejuvenate sneakers, leather shoes, and other specialty footwear.",
    span: "md:col-span-1 lg:col-span-1" 
  },
  { 
    id: "carpet", 
    name: "Carpet Cleaning", 
    image: "/services/carpet-cleaning.jpeg",
    description: "Carpets can trap dust, allergens, stains, and odors deep within their fibers. Our professional carpet cleaning service uses effective yet gentle methods to remove embedded dirt while protecting the texture and color of the fabric. Whether it's a decorative rug or an everyday household carpet, we restore its freshness and appearance with meticulous care. Enjoy a cleaner, healthier, and more inviting living space with beautifully refreshed carpets. Our advanced cleaning techniques help extend the life of your carpets by preventing premature wear and fiber damage. We ensure a thorough, hygienic clean that leaves your carpets feeling soft, fresh, and revitalized. Experience lasting cleanliness and comfort with carpets that look, smell, and feel like new.",
    span: "md:col-span-1 lg:col-span-1" 
  },
  { 
    id: "curtain", 
    name: "Curtain Cleaning", 
    image: "/services/curtain-cleaning.jpeg",
    description: "Keep your curtains looking bright, fresh, and elegant with our professional curtain cleaning service. We gently remove dust, allergens, stains, odors, and everyday buildup that can dull the appearance of your curtains over time. Our fabric-safe cleaning process is designed to protect delicate materials while restoring their original softness and color. Every curtain is handled with care to ensure a deep, hygienic clean without causing shrinkage or damage. Regular professional cleaning also helps improve indoor air quality by eliminating trapped dust and pollutants. Whether you have sheer curtains, blackout drapes, or premium fabrics, we deliver outstanding results tailored to each material. Give your home a cleaner, healthier, and more polished look with curtains that feel as fresh as they look.",
    span: "md:col-span-1 lg:col-span-2" 
  },
  { 
    id: "blanket", 
    name: "Blanket Cleaning", 
    image: "/services/blanket-cleaning.jpeg",
    description: "Experience the comfort of fresh, professionally cleaned blankets with our specialized blanket cleaning service. We use gentle, fabric-safe cleaning methods to remove dust, dirt, stains, and unwanted odors without damaging the fibers. Our deep-cleaning process helps eliminate allergens and bacteria, ensuring a hygienic and healthy sleeping environment. Each blanket is carefully handled to preserve its softness, texture, and warmth. Whether it's everyday bedding or seasonal blankets, we provide the care they deserve. After cleaning, every blanket is thoroughly refreshed, neatly finished, and ready to use. Enjoy the feeling of clean, soft, and cozy blankets with every service.",
    span: "md:col-span-1 lg:col-span-1" 
  },
  { 
    id: "suitcase", 
    name: "Suitcase Cleaning", 
    image: "/services/suitcase-cleaning.jpeg",
    description: "Your luggage travels everywhere with you, collecting dust, stains, and germs along the way. Our suitcase cleaning service provides a thorough interior and exterior refresh, removing dirt, marks, and unpleasant odors. We carefully clean different materials, including hard-shell and fabric suitcases, while preserving their finish. Every suitcase is sanitized and restored to a neat, travel-ready condition, so you can pack with confidence for your next journey.",
    span: "md:col-span-1 lg:col-span-1" 
  },
  { 
    id: "saree", 
    name: "Saree Polishing", 
    image: "/services/saree-polishing.jpeg",
    description: "Enhance the beauty of your treasured sarees with expert polishing and finishing. We help restore their shine, elegance, and graceful drape. Each saree is carefully treated to preserve its fabric, color, and timeless beauty.",
    span: "md:col-span-2 lg:col-span-2" 
  },
  { 
    id: "doll", 
    name: "Doll Cleaning", 
    image: "/services/doll-cleaning.jpeg",
    description: "Your cherished dolls and soft toys deserve the same level of care as any treasured keepsake. Our specialized doll cleaning service gently removes dust, stains, and accumulated dirt while preserving delicate fabrics, colors, and intricate details. We use safe, fabric-friendly cleaning methods to restore freshness without causing damage. Whether it's a beloved childhood toy or a valuable collectible, we handle every piece with precision and care, bringing it back looking clean, refreshed, and well-preserved.",
    span: "md:col-span-1 lg:col-span-1" 
  },
  { 
    id: "darning", 
    name: "Darning", 
    image: "/services/darning.jpeg",
    description: "Extend the life of your favorite garments with our expert darning and fabric repair service. Our skilled craftsmen carefully repair small tears, holes, loose seams, and minor fabric damage with precision and attention to detail. We use techniques that blend seamlessly with the original fabric, preserving the look and feel of your clothing. Every repair is carried out to restore both the strength and appearance of the garment. Whether it's everyday wear or a cherished piece, we handle each item with the utmost care. Our professional mending service helps reduce waste while keeping your wardrobe in excellent condition. Give your beloved garments a second life with repairs that are neat, durable, and almost invisible.",
    span: "md:col-span-2 lg:col-span-4",
    isHorizontal: true
  }
];

export default function OurServices() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section
      id="our-services"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#FFFFFF",
        zIndex: 20,
        paddingTop: "clamp(80px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 12vw, 160px)",
        paddingLeft: "clamp(24px, 5vw, 64px)",
        paddingRight: "clamp(24px, 5vw, 64px)"
      }}
    >
      {/* ─── Ambient Background Details ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[30%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[140px]" style={{ background: "rgba(9,108,108,0.03)" }} />
        <div className="absolute bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full blur-[160px]" style={{ background: "rgba(9,108,108,0.04)" }} />
      </div>

      <div className="relative max-w-[1400px] w-full mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        
        {/* ─── Section Header ─── */}
        <motion.div
          className="flex flex-col items-center text-center w-full mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center rounded-full border border-[#096C6C]/[0.15] bg-[#096C6C]/[0.05] backdrop-blur-[12px] shadow-sm mb-6 md:mb-8" style={{ padding: "12px 32px" }}
            variants={itemVariants}
          >
            <span className="text-[#096C6C] font-satoshi text-[12px] font-bold tracking-[0.25em] uppercase">
              Our Services
            </span>
          </motion.div>

          <motion.h2
            className="text-[#111111] font-display font-extrabold tracking-tight leading-[1.05] mb-6 md:mb-8"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.8rem)" }}
            variants={itemVariants}
          >
            Care Crafted
            <br />
            <span className="font-serif italic font-light text-[#096C6C]">
              For Every Fabric.
            </span>
          </motion.h2>

          <motion.p
            className="font-body text-[#4B5563] text-[16px] md:text-[18px] leading-[1.8] max-w-[700px] mx-auto"
            variants={itemVariants}
          >
            From everyday clothing to delicate heirloom fabrics, Anand Laundry offers specialized care designed to restore freshness, preserve quality, and extend the life of every item you trust us with.
          </motion.p>
        </motion.div>

        {/* ─── Interactive Service Explorer (Bento Grid) ─── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          onMouseLeave={() => setHoveredId(null)}
        >
          {services.map((service) => {
            const isHovered = hoveredId === service.id;
            const isDimmed = hoveredId !== null && hoveredId !== service.id;

            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredId(service.id)}
                onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                className={cn(
                  "relative bg-white border rounded-[32px] overflow-hidden cursor-pointer transition-all duration-400 ease-out",
                  service.span,
                  (service as any).isHorizontal ? "flex flex-col lg:flex-row items-center" : "flex flex-col",
                  isHovered
                    ? "border-[#096C6C]/30 shadow-[0_20px_60px_rgba(9,108,108,0.12),0_4px_16px_rgba(9,108,108,0.06)] -translate-y-2"
                    : "border-[#096C6C]/[0.08] shadow-[0_8px_30px_rgba(9,108,108,0.04)]",
                  isDimmed && "opacity-60 grayscale-[20%]"
                )}
                style={{
                  /* Standard cards keep existing padding; horizontal Darning card gets more room */
                  padding: (service as any).isHorizontal
                    ? "clamp(32px, 3.5vw, 44px)"
                    : "clamp(20px, 3vw, 32px)",
                  willChange: "transform, opacity, box-shadow"
                }}
              >
                {/* Premium Image Container */}
                <div 
                  className={cn(
                    "relative overflow-hidden shadow-[0_8px_24px_rgba(9,108,108,0.08)] bg-[#F8FBFB] flex-shrink-0",
                    (service as any).isHorizontal
                      ? "w-full lg:w-[38%] aspect-[16/10] lg:aspect-[4/3] rounded-[24px] mb-6 lg:mb-0"
                      : "w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-[24px] mb-6 md:mb-8"
                  )}
                  style={(service as any).isHorizontal ? { marginRight: "clamp(0px, 4vw, 56px)" } : {}}
                >
                  <motion.img
                    src={service.image}
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ scale: isHovered ? 1.03 : 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#096C6C]/[0.05] rounded-[24px] pointer-events-none" />
                </div>

                {/* Ambient hover glow beneath card */}
                <div
                  className={cn(
                    "absolute -inset-4 bg-gradient-to-t from-[#096C6C]/[0.08] to-transparent pointer-events-none transition-opacity duration-400 z-0",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                />

                {/* Service Title & Description */}
                <div
                  className={cn("relative z-10 flex flex-col flex-grow", (service as any).isHorizontal ? "justify-center" : "")}
                  style={(service as any).isHorizontal ? { paddingLeft: "clamp(0px, 2vw, 16px)", paddingTop: "8px", paddingBottom: "8px" } : {}}
                >
                  <h3
                    className={cn(
                      "font-display font-bold text-[22px] md:text-[24px] tracking-tight transition-colors duration-300 mb-3",
                      isHovered ? "text-[#096C6C]" : "text-[#111111]"
                    )}
                  >
                    {service.name}
                  </h3>

                  <p
                    className={cn(
                      "font-body text-[#6B7280] leading-[1.75] max-w-prose transition-all duration-300",
                      expandedId === service.id ? "line-clamp-none" : "line-clamp-3 lg:line-clamp-none"
                    )}
                    style={{
                      fontSize: "15.5px",
                      marginTop: (service as any).isHorizontal ? "18px" : undefined,
                    }}
                  >
                    {service.description}
                  </p>
                  
                  {/* Mobile Read More / Close Button */}
                  <div className="mt-2 lg:hidden flex justify-start">
                    <button
                      className="text-[#096C6C] font-semibold text-sm hover:underline focus:outline-none transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedId(expandedId === service.id ? null : service.id);
                      }}
                    >
                      {expandedId === service.id ? "Close" : "Read more"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
