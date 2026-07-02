"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Nav items (visual labels + their click-scroll target IDs) ───────────────
const navItems = [
  { name: "Home",     id: "home"        },
  { name: "About Us", id: "about-us"    },
  { name: "Services", id: "our-services"},
  { name: "Branches", id: "our-branches"},
  { name: "Contact",  id: "contact-us"  },
] as const;

type NavId = (typeof navItems)[number]["id"];

// ─── Scroll-spy map: every section ID → which nav item it belongs to ─────────
//
// Multiple real section IDs can map to a single nav item (e.g. all three About
// sections map to "about-us").  Order matches DOM order top → bottom so the
// last-intersecting rule works correctly.
const SECTION_TO_NAV: Record<string, NavId> = {
  // Hero
  "home":               "home",
  // Entire About region (scroll-sequence + AboutUs + OurFoundations + AboutContinuation)
  "scroll-sequence":    "about-us",
  "about-us":           "about-us",
  "our-foundations":    "about-us",
  "about-continuation": "about-us",
  // Services + How-It-Works treated as the Services nav region
  "our-services":       "our-services",
  "how-it-works":       "our-services",
  // Branches
  "our-branches":       "our-branches",
  // Contact
  "contact-us":         "contact-us",
};

// Ordered list of all real section IDs (DOM order, top to bottom)
const ORDERED_SECTION_IDS = Object.keys(SECTION_TO_NAV);

export function FloatingNavbar() {
  const [activeSection, setActiveSection] = useState<NavId>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Track which sections are currently intersecting.
  // We use a Set so we can always pick the topmost visible one.
  const visibleSections = useRef<Set<string>>(new Set());

  // ── IntersectionObserver-based scroll spy ──────────────────────────────────
  useEffect(() => {
    // Pick the topmost currently-visible section and map it to a nav item.
    const updateActive = () => {
      // Walk sections in DOM order; use the first one that's visible.
      for (const id of ORDERED_SECTION_IDS) {
        if (visibleSections.current.has(id)) {
          setActiveSection(SECTION_TO_NAV[id]);
          return;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.current.add(entry.target.id);
          } else {
            visibleSections.current.delete(entry.target.id);
          }
        });
        updateActive();
      },
      {
        // Fire when at least 15% of a section is visible.
        // rootMargin top offset matches the navbar height so a section that
        // just peeked under the navbar is already considered "in view".
        threshold: 0,
        rootMargin: "-80px 0px -20% 0px",
      }
    );

    // Observe every section we care about
    ORDERED_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── Click handler: smooth scroll with navbar-height offset ────────────────
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      // 100px offset keeps section heading below the fixed navbar (≈60px tall)
      // with comfortable breathing room.
      const y = section.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
      // Optimistically update active state immediately on click so the pill
      // doesn't lag behind while the smooth scroll is in flight.
      setActiveSection(SECTION_TO_NAV[id] ?? (id as NavId));
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* ─── Fixed Circular Logo (Top Left, all breakpoints) ─── */}
      <motion.div
        className="fixed top-6 left-5 sm:left-8 md:top-8 md:left-8 lg:left-12 z-[100] pointer-events-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => handleNavClick(e as any, "home")}
        >
          <img
            src="/logo.jpeg"
            alt="Anand's Logo"
            width={44}
            height={44}
            className="rounded-full object-cover shadow-[0_4px_20px_rgba(9,108,108,0.15)] w-[40px] h-[40px] md:w-[48px] md:h-[48px]"
          />
        </motion.div>
      </motion.div>

      {/* ─── Desktop Floating Navbar (md+) ─── */}
      <div className="fixed top-10 left-0 right-0 z-50 hidden md:flex justify-center pointer-events-none w-full">
        <motion.nav
          initial={{ y: -15, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pointer-events-auto relative flex items-center rounded-full border border-[#096C6C]/[0.12] bg-white/[0.85] backdrop-blur-[24px] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),0_8px_32px_rgba(9,108,108,0.10)] w-fit"
          style={{ height: "60px", paddingLeft: "clamp(16px, 3vw, 32px)", paddingRight: "clamp(16px, 3vw, 32px)" }}
        >
          <div className="flex items-center relative" style={{ gap: "4px" }}>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="relative rounded-full flex items-center justify-center transition-transform duration-300 ease-out hover:-translate-y-[1px] group"
                  style={{ height: "40px", paddingLeft: "clamp(12px, 2vw, 20px)", paddingRight: "clamp(12px, 2vw, 20px)" }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-bg"
                      className="absolute inset-[3px] bg-[#096C6C]/[0.08] rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-b-full bg-[#096C6C] shadow-[0_0_8px_rgba(9,108,108,0.45)]"
                      style={{ top: "5px" }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 font-satoshi text-[15px] font-semibold tracking-wide transition-colors duration-300",
                      isActive ? "text-[#096C6C]" : "text-[#444444] group-hover:text-[#096C6C]"
                    )}
                    style={{ transform: "translateY(1px)" }}
                  >
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.nav>
      </div>

      {/* ─── Mobile Hamburger Button (below md) ─── */}
      <motion.button
        className="fixed top-6 right-5 sm:right-8 z-[100] md:hidden pointer-events-auto flex items-center justify-center rounded-full bg-white/90 backdrop-blur-[16px] border border-[#096C6C]/[0.12] shadow-[0_4px_20px_rgba(9,108,108,0.10)]"
        style={{ width: "40px", height: "40px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#096C6C" strokeWidth="1.8" strokeLinecap="round">
          {menuOpen ? (
            <>
              <path d="M3 3l12 12M15 3L3 15" />
            </>
          ) : (
            <>
              <path d="M2 4h14M2 9h14M2 14h14" />
            </>
          )}
        </svg>
      </motion.button>

      {/* ─── Mobile Dropdown Menu ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-[76px] left-5 right-5 sm:left-8 sm:right-8 z-[99] md:hidden rounded-[24px] bg-white/95 backdrop-blur-[24px] border border-[#096C6C]/[0.12] shadow-[0_16px_48px_rgba(9,108,108,0.12)] overflow-hidden"
          >
            <nav className="flex flex-col py-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={cn(
                      "flex items-center px-6 py-3.5 font-satoshi text-[16px] font-semibold tracking-wide transition-colors duration-200",
                      isActive
                        ? "text-[#096C6C] bg-[#096C6C]/[0.06]"
                        : "text-[#444444] hover:text-[#096C6C] hover:bg-[#096C6C]/[0.04]"
                    )}
                  >
                    {isActive && (
                      <span className="mr-2.5 w-1.5 h-1.5 rounded-full bg-[#096C6C] flex-shrink-0" />
                    )}
                    {item.name}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
