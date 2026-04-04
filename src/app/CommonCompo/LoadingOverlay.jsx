"use client";

import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hello",
  "Hola",
  "Bonjour",
  "नमस्ते",
  "Ciao",
  "こんにちは",
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  "चलिए शुरू करते है",
];

const TOTAL = greetings.length;

export default function LoadingOverlay({ isLoading, onFinish, onHalfway }) {
 const [showOverlay, setShowOverlay] = useState(true);
 const [currentIndex, setCurrentIndex] = useState(0);
 const [percent, setPercent] = useState(0);
 const intervalRef = useRef(null);
 const percentRef = useRef(null);
 const [hasTriggeredHalfway, setHasTriggeredHalfway] = useState(false);

 // Lock scroll while overlay visible (both CSS + Lenis)
 useEffect(() => {
  if (showOverlay) {
   document.body.style.overflow = "hidden";
   document.documentElement.style.overflow = "hidden";
   // Pause Lenis smooth scroll if active
   if (window.__lenis) window.__lenis.stop();
  } else {
   document.body.style.overflow = "";
   document.documentElement.style.overflow = "";
   // Resume Lenis smooth scroll
   if (window.__lenis) window.__lenis.start();
  }
  return () => {
   document.body.style.overflow = "";
   document.documentElement.style.overflow = "";
   if (window.__lenis) window.__lenis.start();
  };
 }, [showOverlay]);

 // Greetings + percent
 useEffect(() => {
  intervalRef.current = setInterval(() => {
   setCurrentIndex((prev) => {
    const next = prev < TOTAL - 1 ? prev + 1 : prev;
    const p = Math.round((next / (TOTAL - 1)) * 100);
    setPercent(p);

    if (next === prev) {
     clearInterval(intervalRef.current);
     // Animate to 100% then exit
     setPercent(100);
     setTimeout(() => setShowOverlay(false), 1000);
    }
    return next;
   });
  }, 250);

  return () => clearInterval(intervalRef.current);
 }, []);

 const handleAnimationUpdate = (latest) => {
  if (
   latest.y !== undefined &&
   parseFloat(latest.y) < -50 &&
   !hasTriggeredHalfway
  ) {
   setHasTriggeredHalfway(true);
   onHalfway?.();
  }
 };

 return (
  <AnimatePresence>
   {showOverlay && (
    <motion.div
     initial={{ y: 0, opacity: 1 }}
     animate={{ y: 0, opacity: 1 }}
     exit={{ y: "-100%", opacity: 0 }}
     onUpdate={handleAnimationUpdate}
     onAnimationComplete={() => onFinish?.()}
     transition={{ duration: 0.8, ease: "easeInOut" }}
     style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#000",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
     }}
    >
     {/* Ghost letter background */}
     <Typography
      sx={{
       position: "absolute",
       fontSize: { xs: "19rem", sm: "15rem" },
       color: "white",
       opacity: 0.04,
       fontWeight: 900,
       fontFamily: "'MyCustomFont2', monospace",
       userSelect: "none",
       zIndex: 0,
      }}
     >
      A
     </Typography>

     {/* Greeting word */}
     <AnimatePresence mode="wait">
      <motion.div
       key={currentIndex}
       initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
       animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
       exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
       transition={{ duration: 0.28, ease: "easeOut" }}
       style={{ zIndex: 1 }}
      >
       <Typography
        sx={{
         fontSize: { xs: "2.4rem", sm: "4rem" },
         fontWeight: 500,
         color: "white",
         fontFamily: "'MyCustomFont', sans-serif",
         textAlign: "center",
        }}
       >
        {greetings[currentIndex]}
       </Typography>
      </motion.div>
     </AnimatePresence>

     {/* ── Progress bar at bottom ── */}
     <div
      style={{
       position: "absolute",
       bottom: 0,
       left: 0,
       right: 0,
       height: 2,
       background: "rgba(255,255,255,0.08)",
      }}
     >
      <motion.div
       initial={{ width: "0%" }}
       animate={{ width: `${percent}%` }}
       transition={{ duration: 0.22, ease: "linear" }}
       style={{
        height: "100%",
        background: "linear-gradient(90deg, #ff4d00, #ff7b45)",
       }}
      />
     </div>

     {/* ── % counter — bottom right ── */}
     <div
      style={{
       position: "absolute",
       bottom: 28,
       right: 32,
       display: "flex",
       flexDirection: "column",
       alignItems: "flex-end",
       gap: 6,
       zIndex: 2,
      }}
     >
      <motion.div
       key={percent}
       initial={{ opacity: 0, y: 6 }}
       animate={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.18 }}
       style={{ display: "flex", alignItems: "baseline", gap: 2 }}
      >
       <span
        style={{
         fontSize: "clamp(2rem, 5vw, 3.5rem)",
         fontWeight: 800,
         color: "#ffffff",
         fontFamily: "'MyCustomFont2', monospace",
         lineHeight: 1,
         letterSpacing: "-0.03em",
        }}
       >
        {String(percent).padStart(2, "0")}
       </span>
       <span
        style={{
         fontSize: "1rem",
         fontWeight: 400,
         color: "rgba(255,255,255,0.5)",
         fontFamily: "'MyCustomFont', sans-serif",
        }}
       >
        %
       </span>
      </motion.div>
      <span
       style={{
        fontSize: 10,
        letterSpacing: "0.18em",
        color: "rgba(255,77,0,0.7)",
        fontFamily: "'MyCustomFont', sans-serif",
        textTransform: "uppercase",
       }}
      >
       Loading
      </span>
     </div>

     {/* Bottom-left: name tag */}
     <div
      style={{
       position: "absolute",
       bottom: 28,
       left: 32,
       zIndex: 2,
      }}
     >
      <span
       style={{
        fontSize: 11,
        letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.25)",
        fontFamily: "'MyCustomFont', sans-serif",
        textTransform: "uppercase",
       }}
      >
       Ayush Kumar — Portfolio
      </span>
     </div>
    </motion.div>
   )}
  </AnimatePresence>
 );
}
