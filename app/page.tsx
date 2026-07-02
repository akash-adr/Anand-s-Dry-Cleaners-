import ScrollSequence from "./components/ScrollSequence";
import { FloatingNavbar } from "@/components/ui/floating-navbar";
import IntroHero from "./components/IntroHero";
import AboutUs from "./components/AboutUs";
import OurFoundations from "./components/OurFoundations";
import AboutContinuation from "./components/AboutContinuation";
import OurServices from "./components/OurServices";
import HowItWorks from "./components/HowItWorks";
import OurBranches from "./components/OurBranches";
import ContactUs from "./components/contact/ContactUs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <FloatingNavbar />

      {/* ─── Premium Intro Hero (Cinematic Video) ─── */}
      <IntroHero />

      {/* ─── Scroll Animated Hero ─── */}
      <ScrollSequence />

      {/* ─── Premium Editorial About Us Section ─── */}
      <AboutUs />

      {/* ─── Our Foundations (Brand Values) ─── */}
      <OurFoundations />

      {/* ─── Heritage Story — Interactive Editorial Section ─── */}
      <AboutContinuation />

      {/* ─── Our Services ─── */}
      <OurServices />

      {/* ─── How It Works (Interactive Journey) ─── */}
      <HowItWorks />

      {/* ─── Branches (Interactive Portfolio Showcase) ─── */}
      <OurBranches />

      {/* ─── Contact Us (Interactive Bubble Vault) ─── */}
      <ContactUs />

      {/* ─── Premium Footer ─── */}
      <Footer />
    </main>
  );
}
