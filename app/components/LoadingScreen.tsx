"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [isExitPhase, setIsExitPhase] = useState(false);
  const [bubbles, setBubbles] = useState<any[]>([]);

  useEffect(() => {
    // Lock scroll immediately on mount
    document.body.style.overflow = "hidden";
    
    // Generate bubbles only on client to avoid hydration mismatch
    setBubbles([...Array(12)].map(() => ({
      size: Math.random() * 60 + 20,
      left: Math.random() * 100,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
      xOffset: Math.random() * 60 - 30,
    })));

    // Simulate fake progress to 90%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + (90 - prev) * 0.15;
      });
    }, 100);

    const checkReady = () => {
      // Minimum loading time so the animation feels deliberate
      setTimeout(() => {
        setIsLoaded(true);
      }, 1500);
    };

    if (document.readyState === "complete") {
      checkReady();
    } else {
      window.addEventListener("load", checkReady);
    }

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener("load", checkReady);
    };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setProgress(100);
      
      // Start exit sequence after progress reaches 100%
      const exitTimeout = setTimeout(() => {
        setIsExitPhase(true);
        
        // Unmount entirely after exit animation
        setTimeout(() => {
          setShowLoader(false);
          document.body.style.overflow = "";
        }, 900); // Matches the exit transition duration
      }, 300); // Brief pause at 100%
      
      return () => clearTimeout(exitTimeout);
    }
  }, [isLoaded]);

  if (!showLoader) return null;

  return (
    <AnimatePresence>
      {!isExitPhase && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fdfdfd] overflow-hidden pointer-events-auto"
          style={{
            background: "radial-gradient(circle at center, #ffffff 0%, #f1f7f7 100%)"
          }}
        >
          {/* Floating Soap Bubbles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             {bubbles.map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute top-full rounded-full border border-[#096C6C]/10 bg-gradient-to-tr from-white/50 to-transparent backdrop-blur-[2px]"
                  style={{
                    width: b.size + "px",
                    height: b.size + "px",
                    left: b.left + "%",
                  }}
                  animate={{
                    y: ["0vh", "-120vh"],
                    x: [0, b.xOffset, -b.xOffset, 0],
                  }}
                  transition={{
                    y: {
                      duration: b.duration,
                      repeat: Infinity,
                      ease: "linear",
                      delay: b.delay,
                    },
                    x: {
                      duration: b.duration * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: b.delay,
                    }
                  }}
                />
             ))}
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-[32px] shadow-[0_20px_60px_rgba(9,108,108,0.06)] bg-white/60 backdrop-blur-xl border border-white flex items-center justify-center overflow-hidden mb-8"
            >
              <Image 
                src="/logo.jpeg" 
                alt="Anand's Dry Cleaners"
                fill
                style={{ objectFit: "contain", mixBlendMode: "multiply", padding: "32px" }}
                priority
              />
            </motion.div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-satoshi text-[16px] md:text-[18px] text-[#096C6C]/80 font-medium tracking-wide mb-6"
            >
              Preparing Freshness...
            </motion.p>

            {/* Glassmorphic Progress Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-[200px] md:w-[260px] h-1.5 rounded-full bg-[#096C6C]/[0.08] overflow-hidden relative shadow-inner"
            >
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#096C6C]/60 to-[#096C6C] shadow-[0_0_8px_rgba(9,108,108,0.4)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
