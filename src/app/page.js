"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import profilePic from "../../public/assets/image/withayuxh.jpg";
import LoadingOverlay from "./CommonCompo/LoadingOverlay";
import { useScrambleText } from "./CommonCompo/useScrambleText";
import DotGrid from "./CommonCompo/DotGrid";
import { useTransform, motion, useScroll } from "framer-motion";
import SpaceHero from "../ShowCaseCompo/SpaceHero";
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

 
   <SpaceHero startAnimation={startForegroundAnimation} />

   <AboutHome />
   <Projects />
   <Experience />
   <Education />
   <ClientReviews />
   <Contact />
  </div>
 );
}
