"use client";

import React from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const quickLinks = [
  { name: "Home", id: "home" },
  { name: "About Us", id: "about-us" },
  { name: "Our Foundations", id: "our-foundations" },
  { name: "Services", id: "our-services" },
  { name: "How It Works", id: "how-it-works" },
  { name: "Branches", id: "our-branches" },
  { name: "Contact", id: "contact-us" },
];

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative w-full bg-[#F4F8F8] border-t border-[#096C6C]/10 z-20"
      style={{ paddingTop: "96px", paddingBottom: "72px", paddingLeft: "clamp(24px, 5vw, 64px)", paddingRight: "clamp(24px, 5vw, 64px)" }}
    >
      <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

        {/* ── Top 3-Column Layout ── */}
        {/*
          Brand: ~42% → col-span-5
          Quick Links: ~24% → col-span-3
          Contact: ~34% → col-span-4
        */}
        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-y-14"
          style={{ columnGap: "clamp(60px, 7vw, 100px)" }}
        >

          {/* ── Left: Brand Column ── */}
          <div
            className="md:col-span-5 flex flex-col items-start"
            style={{
              paddingTop: "32px",
              paddingBottom: "8px",
              /* Shift the entire brand block inward from the grid edge */
              paddingLeft: "clamp(0px, 4vw, 72px)",
            }}
          >
            {/* ── Logo + Company Name: top-aligned row ── */}
            <div
              className="flex items-start"
              style={{ gap: "36px", marginBottom: "32px" }}
            >
              {/* Square logo card — top-aligned with text */}
              <div
                className="bg-white rounded-xl shrink-0 flex items-center justify-center"
                style={{
                  width: "80px",
                  height: "80px",
                  /* generous internal padding so artwork never touches edges */
                  padding: "16px",
                  boxShadow: "0 8px 32px rgba(9,108,108,0.14)",
                  /* nudge the box down 2px so its top visually lines up with
                     the cap-height of the "Anand's" heading */
                  marginTop: "2px",
                }}
              >
                <img
                  src="/logo.jpeg"
                  alt="Anand's Logo"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>

              {/* Company name stack: top-aligned */}
              <div className="flex flex-col items-start">
                <span
                  className="font-display font-bold text-[#111111] tracking-wide leading-none"
                  style={{ fontSize: "32px" }}
                >
                  Anand&apos;s
                </span>
                <span
                  className="font-display font-medium text-[#4A4A4A] uppercase"
                  style={{
                    fontSize: "13.5px",
                    letterSpacing: "0.22em",
                    marginTop: "12px",
                  }}
                >
                  Dry Cleaners &amp; Laundries
                </span>
              </div>
            </div>

            {/* Tagline — sits below the logo+name row */}
            <h4
              className="font-serif italic text-[#096C6C]"
              style={{ fontSize: "27px", marginBottom: "0px" }}
            >
              Care Beyond Clean.
            </h4>

            {/* Description — below tagline */}
            <p
              className="font-body text-[#5A5A5A]"
              style={{
                fontSize: "17px",
                lineHeight: "1.78",
                maxWidth: "420px",
                marginTop: "24px",
              }}
            >
              Premium garment care, expert dry cleaning, and trusted laundry
              services with quality you can feel.
            </p>
          </div>

          {/* ── Middle: Quick Links ── */}
          <div
            className="md:col-span-3 flex flex-col items-start"
            style={{ paddingTop: "28px" }}
          >
            <h4
              className="font-display font-bold text-[#111111] uppercase"
              style={{
                fontSize: "13px",
                letterSpacing: "0.2em",
                marginBottom: "24px",
              }}
            >
              Quick Links
            </h4>

            <nav className="flex flex-col" style={{ gap: "22px" }}>
              {quickLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleScroll(e, link.id)}
                  className="group flex items-center font-satoshi text-[#555555] hover:text-[#096C6C] w-fit"
                  style={{
                    fontSize: "17px",
                    gap: "8px",
                    transition: "color 250ms ease",
                  }}
                >
                  <ArrowRight
                    className="text-[#096C6C] shrink-0"
                    style={{
                      width: "14px",
                      height: "14px",
                      opacity: 0,
                      transform: "translateX(-6px)",
                      transition: "opacity 250ms ease, transform 250ms ease",
                    }}
                  />
                  <span
                    style={{
                      display: "inline-block",
                      transition: "transform 250ms ease",
                    }}
                    className="group-hover:[transform:translateX(4px)] group-hover:[&~svg]:opacity-100"
                  >
                    {link.name}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* ── Right: Contact ── */}
          <div
            className="md:col-span-4 flex flex-col items-start"
            style={{ paddingTop: "28px" }}
          >
            <h4
              className="font-display font-bold text-[#111111] uppercase"
              style={{
                fontSize: "13px",
                letterSpacing: "0.2em",
                marginBottom: "24px",
              }}
            >
              Contact
            </h4>

            <div className="flex flex-col" style={{ gap: "36px" }}>
              {/* Address */}
              <div className="flex items-start" style={{ gap: "18px" }}>
                <MapPin
                  className="text-[#096C6C] shrink-0"
                  style={{ width: "20px", height: "20px", marginTop: "3px" }}
                />
                <span
                  className="font-body text-[#555555]"
                  style={{ fontSize: "16.5px", lineHeight: "1.75" }}
                >
                  123 Main Road, Bangalore
                  <br />
                  Karnataka, India
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center" style={{ gap: "18px" }}>
                <Phone
                  className="text-[#096C6C] shrink-0"
                  style={{ width: "20px", height: "20px" }}
                />
                <span
                  className="font-body text-[#555555]"
                  style={{ fontSize: "16.5px" }}
                >
                  +91 98765 43210
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center" style={{ gap: "18px" }}>
                <Mail
                  className="text-[#096C6C] shrink-0"
                  style={{ width: "20px", height: "20px" }}
                />
                <span
                  className="font-body text-[#555555]"
                  style={{ fontSize: "16.5px" }}
                >
                  info@anandlaundry.com
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ── Divider & Credits ── */}
        <div
          className="border-t border-[#096C6C]/15 flex flex-col items-center justify-center text-center"
          style={{
            marginTop: "56px",
            paddingTop: "36px",
            paddingBottom: "0px",
          }}
        >
          {/* Copyright */}
          <p
            className="font-satoshi text-[#374151] tracking-wide font-semibold"
            style={{ fontSize: "14.5px" }}
          >
            &copy; {new Date().getFullYear()} Anand&apos;s Dry Cleaners &amp; Laundries. All rights reserved.
          </p>

          {/* Powered By block */}
          <div
            className="flex flex-col items-center"
            style={{ marginTop: "18px" }}
          >
            <span
              className="font-display text-[#374151] uppercase font-bold tracking-[0.25em]"
              style={{ fontSize: "12px" }}
            >
              Powered By Akash Rajarathinam
            </span>
            <a
              href="mailto:akash@atyourservice.ind.in"
              className="font-body hover:text-[#0a7f7f] transition-colors duration-300"
              style={{
                fontSize: "13.5px",
                fontWeight: 500,
                color: "rgba(9,108,108,0.85)",
                marginTop: "10px",
              }}
            >
              akash@atyourservice.ind.in
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
