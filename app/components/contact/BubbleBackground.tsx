"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playBubblePop } from "./AudioEngine";
import { cn } from "@/lib/utils";

interface Drifter {
  id: string;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export default function BubbleBackground() {
  const [drifters, setDrifters] = useState<Drifter[]>([]);
  const [clickSpawns, setClickSpawns] = useState<{ id: string, x: number, y: number, size: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Generate initial drifters
    const newDrifters = Array.from({ length: 15 }).map((_, i) => ({
      id: `drifter-${i}`,
      x: Math.random() * 100, // percentage
      size: Math.random() * 50 + 20, // 20px to 70px
      duration: Math.random() * 20 + 10, // 10 to 30 seconds
      delay: Math.random() * -20 // random start delay to stagger
    }));
    setDrifters(newDrifters);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleContainerClick = (e: React.MouseEvent) => {
    // Only spawn if clicking directly on the background (not interactive elements)
    if (e.target !== containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    playBubblePop(500, 0.1);
    
    const newSpawn = {
      id: `spawn-${Date.now()}`,
      x,
      y,
      size: Math.random() * 40 + 30
    };
    
    setClickSpawns(prev => [...prev, newSpawn]);
    
    // Auto cleanup after float duration
    setTimeout(() => {
      setClickSpawns(prev => prev.filter(b => b.id !== newSpawn.id));
    }, 15000);
  };

  const handlePop = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playBubblePop(600, 0.15);
    setDrifters(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-auto cursor-crosshair z-0"
      onClick={handleContainerClick}
    >
      {/* Ambient Drifters */}
      <AnimatePresence>
        {drifters.map(bubble => {
          const parallaxX = mousePos.x * (bubble.size * 0.5);
          const parallaxY = mousePos.y * (bubble.size * 0.5);
          
          return (
            <motion.div
              key={bubble.id}
              onClick={(e) => handlePop(bubble.id, e)}
              className="absolute rounded-full cursor-pointer transition-all duration-300 hover:brightness-110"
              style={{
                width: bubble.size,
                height: bubble.size,
                left: `${bubble.x}%`,
                // Theme adaptation: Pristine glassmorphic teal bubbles instead of neon sci-fi
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5) 0%, rgba(9,108,108,0.06) 60%, transparent 100%)",
                boxShadow: "inset 0 0 10px rgba(255,255,255,0.6), 0 4px 20px rgba(9,108,108,0.05)",
                backdropFilter: "blur(2px)",
                border: "1px solid rgba(255,255,255,0.4)"
              }}
              initial={{ y: "110vh", opacity: 0, x: 0 }}
              animate={{ 
                y: "-20vh", 
                opacity: [0, 1, 1, 0],
                x: [0, Math.sin(bubble.size) * 50, 0], // Continuous Sine/Cosine organic wiggle
                translateX: parallaxX,
                translateY: parallaxY,
                scale: 1 // Default scale, handled hover via CSS or layoutId ideally, but CSS hover is reliable
              }}
              whileHover={{ scale: 1.15 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{
                y: { duration: bubble.duration, repeat: Infinity, delay: bubble.delay, ease: "linear" },
                opacity: { duration: bubble.duration, repeat: Infinity, delay: bubble.delay, ease: "linear" },
                x: { duration: bubble.duration / 2, repeat: Infinity, delay: bubble.delay, ease: "easeInOut", repeatType: "mirror" },
                translateX: { type: "spring", stiffness: 50, damping: 20 },
                translateY: { type: "spring", stiffness: 50, damping: 20 }
              }}
            >
              {/* Blurred crescent glossy highlight */}
              <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] bg-white/80 rounded-full blur-[0.5px] rotate-[-45deg]" />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Interactive Click Spawns */}
      <AnimatePresence>
        {clickSpawns.map(bubble => (
          <motion.div
            key={bubble.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7) 0%, rgba(9,108,108,0.12) 60%, transparent 100%)",
              boxShadow: "inset 0 0 12px rgba(255,255,255,0.9), 0 8px 30px rgba(9,108,108,0.1)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.6)"
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: -300 }} // Float up from spawn point
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{
              scale: { type: "spring", bounce: 0.6, duration: 0.5 },
              opacity: { duration: 0.3 },
              y: { duration: 15, ease: "linear" }
            }}
          >
            <div className="absolute top-[15%] left-[15%] w-[25%] h-[25%] bg-white/90 rounded-full blur-[0.5px] rotate-[-45deg]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
