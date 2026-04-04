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

 // ── Three refs for the travel effect ──
 const heroImgRef  = useRef(null); // original image in hero (hidden once travel starts)
 const aboutImgRef = useRef(null); // destination ghost in About (shown when travel ends)
 const travelRef   = useRef(null); // fixed-position clone that physically moves

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

   // ────────────────────────────────────────────────
   //  PHOTO TRAVEL ANIMATION
   //  Pre-calculate both start and end positions at
   //  scroll=0 so we have fixed, stable targets.
   // ────────────────────────────────────────────────
   const heroEl  = heroImgRef.current;
   const aboutEl = aboutImgRef.current;
   const travelEl = travelRef.current;
   const aboutSection = document.getElementById("section-about");

   if (!heroEl || !aboutEl || !travelEl || !aboutSection) {
    ScrollTrigger.refresh();
    return;
   }

   // Currently at scroll = 0, so all rects are in document space
   const heroR  = heroEl.getBoundingClientRect();   // viewport coords at scroll=0
   const aboutR = aboutEl.getBoundingClientRect();  // viewport coords at scroll=0

   // Document-relative offsets (scroll=0 means viewport = document here)
   const heroDocY  = heroR.top;    // = heroR.top + 0
   const aboutDocY = aboutR.top;   // = aboutR.top + 0
   const aboutDocX = aboutR.left;  // left is invariant to vertical scroll

   // ScrollTrigger END fires when: "section-about top" = "42% from viewport top"
   //  → native scrollY at end = aboutSection.offsetTop - 0.42 * innerHeight
   const scrollAtEnd = aboutSection.offsetTop - 0.42 * window.innerHeight;

   // Viewport position of About ghost image WHEN the trigger ends
   const endX = aboutDocX;
   const endY = aboutDocY - scrollAtEnd; // = aboutDocY - (aboutSection.offsetTop - 0.42*vh)

   // Initialise travel image as position:fixed, hidden, at hero position
   gsap.set(travelEl, {
    position: "fixed",
    top: 0,
    left: 0,
    x: heroR.left,
    y: heroR.top,
    width: heroR.width,
    height: "auto",
    rotateY: 0,
    rotateX: 0,
    opacity: 0,
    zIndex: 9998,
    transformPerspective: 750,
    transformStyle: "preserve-3d",
    borderRadius: "8px",
    boxShadow: "0 24px 70px rgba(0,0,0,0.45)",
    willChange: "transform, width, opacity",
   });

   // GSAP scrubbed timeline — travels from hero to about
   const tl = gsap.timeline({
    scrollTrigger: {
     trigger: "#section-home",
     start: "25% top",        // fires when user is 25% into the hero
     endTrigger: "#section-about",
     end: "top 42%",          // ends exactly when about heading is 42% from top
     scrub: 2,                // 2s damped smooth follow

     onEnter() {
      // Reveal travel clone, hide original hero image
      gsap.set(travelEl, { opacity: 1 });
      gsap.set(heroEl,   { opacity: 0 });
     },
     onLeave() {
      // Travel complete — show About ghost image, hide travel clone
      gsap.set(travelEl, { opacity: 0 });
      gsap.to(aboutEl,   { opacity: 0.58, duration: 0.4, ease: "power2.out" });
     },
     onEnterBack() {
      // User scrolled back up — hide about ghost, show travel clone
      gsap.set(aboutEl,  { opacity: 0 });
      gsap.set(travelEl, { opacity: 1 });
     },
     onLeaveBack() {
      // Back at hero — restore original image
      gsap.set(heroEl,   { opacity: 1 });
      gsap.set(travelEl, { opacity: 0 });
     },
    },
   });

   // Animate the travel clone from hero → about using pre-calculated fixed coords
   tl.fromTo(travelEl,
    // ── FROM (hero position at scroll=0) ──
    {
     x: heroR.left,
     y: heroR.top,
     width: heroR.width,
     rotateY:  0,
     rotateX:  0,
    },
    // ── TO (about position at scroll=scrollAtEnd) ──
    {
     x: endX,
     y: endY,
     width: 200,
     rotateY: -22,
     rotateX:   8,
     ease: "none",
    }
   );

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

   {/* ── FIXED TRAVEL CLONE — outside any section, always fixed ── */}
   <div
    ref={travelRef}
    style={{
     position: "fixed",   /* CSS fixed so it's out of normal flow immediately */
     top: 0, left: 0,
     pointerEvents: "none",
     zIndex: 9998,
     opacity: 0,
     borderRadius: "10px",
     overflow: "hidden",
    }}
   >
    <Image
     src={profilePic}
     alt="Travel"
     width={200}
     height={200}
     unoptimized
     priority
     style={{ objectFit: "cover", width: "100%", height: "auto", display: "block" }}
    />
   </div>

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

       {/* Original hero image — hidden by GSAP during travel */}
       <div
        ref={heroImgRef}
        style={{ display: "inline-block", willChange: "opacity" }}
       >
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

   <AboutHome aboutImgRef={aboutImgRef} />
   <Projects />
   <Experience />
   <Education />
   <Contact />
  </div>
 );
}
