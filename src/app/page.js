"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import profilePic from "../../public/assets/image/withayuxh.jpg";
import LoadingOverlay from "./CommonCompo/LoadingOverlay";
import { useScrambleText } from "./CommonCompo/useScrambleText";
import DotGrid from "./CommonCompo/DotGrid";
import { useTransform, motion, useScroll } from "framer-motion";
import AboutHome from "../ShowCaseCompo/AboutHome";
import Projects from "../ShowCaseCompo/Projects";
import Experience from "../ShowCaseCompo/Experience";
import Education from "../ShowCaseCompo/Education";
import ClientReviews from "../ShowCaseCompo/ClientReviews";
import Contact from "../ShowCaseCompo/Contact";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useAppTheme } from "./context/ThemeContext";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
 const [loading, setLoading]   = useState(true);
 const [animateContent, setAnimateContent] = useState(false);
 const [startScramble, setStartScramble]   = useState(false);
 const [startForegroundAnimation, setStartForegroundAnimation] = useState(false);

 const { scrollY } = useScroll();
 const { mode }    = useAppTheme();
 const bgY         = useTransform(scrollY, [0, 500], [0, -60]);

 

 useEffect(() => {
  const t = setTimeout(() => setLoading(false), 2000);
  return () => clearTimeout(t);
 }, []);

 useEffect(() => {
  if (loading) return;

  const timeout = setTimeout(() => {
   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

   // Standard section reveals
   gsap.utils.toArray("[data-gsap='fade-up']").forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 50 },
     { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
       scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } });
   });
   gsap.utils.toArray("[data-gsap='stagger']").forEach((el) => {
    gsap.fromTo(el.children, { opacity: 0, y: 35 },
     { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1,
       scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" } });
   });
   gsap.utils.toArray("[data-gsap='slide-right']").forEach((el) => {
    gsap.fromTo(el, { opacity: 0, x: 60 },
     { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
       scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" } });
   });
   gsap.utils.toArray("[data-gsap='heading']").forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 40, scale: 0.97 },
     { opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out",
       scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } });
   });

   ScrollTrigger.refresh();
  }, 700);

  return () => {
   clearTimeout(timeout);
   ScrollTrigger.getAll().forEach((t) => t.kill());
  };
 }, [loading]);

 const handleOverlayHalfway = () => {
  setStartScramble(true);
  setStartForegroundAnimation(true);
 };
 const handleOverlayFinish = () => setAnimateContent(true);
 const scrambledText = useScrambleText(startScramble ? "Ayush" : "", 1000, 50);

 return (
  <div style={{ width: "100%", overflowX: "hidden" }}>
   <LoadingOverlay isLoading={loading} onHalfway={handleOverlayHalfway} onFinish={handleOverlayFinish} />

 
   {/* ─── HERO ─── */}
   <section
    id="section-home"
    style={{
     position: "relative",
     width: "100%",
     height: "100vh",
     background: "var(--bg-primary)",
     color: "var(--text-primary)",
     overflow: "hidden",
    }}
   >
    <DotGrid mode={mode} />

    {/* AYUSH ghost text */}
    {animateContent && (
     <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 2 }}>
      <motion.div style={{ y: bgY }}>
       <h1 style={{ fontFamily: "'MyCustomFont2', monospace", fontWeight: 900, opacity: 0.1, userSelect: "none", lineHeight: 1, fontSize: "clamp(140px, 20vw, 280px)", whiteSpace: "nowrap", color: "var(--text-primary)", margin: 0 }}>
        {scrambledText}
       </h1>
      </motion.div>
     </div>
    )}

    {/* Hero foreground */}
    {startForegroundAnimation && (
     <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 16px", pointerEvents: "none" }}
     >
      <motion.div
       initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
       style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "clamp(60px, 12vw, 160px)", fontWeight: 200, lineHeight: 1, flexWrap: "wrap", justifyContent: "center", color: "var(--text-primary)", pointerEvents: "auto" }}
      >
       <span>i'm</span>

       {/* Original hero image */}
       <div style={{ display: "inline-block" }}>
        <Image
         src={profilePic}
         alt="Profile"
         width={150}
         unoptimized
         style={{ objectFit: "cover", borderRadius: "6px", display: "block" }}
        />
       </div>

       <span>ayush</span>
      </motion.div>

      <motion.h2
       initial={{ opacity: 0, y: 50 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
       style={{ fontSize: "clamp(28px, 7vw, 100px)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, marginTop: "-4px", color: "var(--text-primary)", fontFamily: "'MyCustomFont', sans-serif" }}
      >
       Bringing Ideas to Reality
      </motion.h2>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} style={{ position: "absolute", bottom: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
       <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif", textTransform: "uppercase" }}>Scroll</span>
       <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }} style={{ width: 1, height: 40, background: "var(--text-muted)" }} />
      </motion.div>
     </motion.div>
    )}
   </section>

   <AboutHome />
   <Projects />
   <Experience />
   <Education />
   <ClientReviews />
   <Contact />
  </div>
 );
}
