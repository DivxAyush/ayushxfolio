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
export default function LoadingOverlay({ isLoading, onFinish, onHalfway }) {
 const [showOverlay, setShowOverlay] = useState(true);
 const [currentIndex, setCurrentIndex] = useState(0);
 const intervalRef = useRef(null);
 const [exitStarted, setExitStarted] = useState(false);
 const [hasTriggeredHalfway, setHasTriggeredHalfway] = useState(false);

 useEffect(() => {
  intervalRef.current = setInterval(() => {
   setCurrentIndex((prev) => {
    if (prev < greetings.length - 1) {
     return prev + 1;
    } else {
     clearInterval(intervalRef.current);
     setTimeout(() => setShowOverlay(false), 1000);
     return prev;
    }
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
     <Typography
      sx={{
       position: "absolute",
       fontSize: { xs: "19rem", sm: "15rem" },
       color: "white",
       opacity: 0.05,
       fontWeight: 900,
       fontFamily: "'MyCustomFont2', monospace",
       userSelect: "none",
       zIndex: 0,
      }}
     >
      A
     </Typography>

     <motion.div
      key={currentIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ zIndex: 1 }}
     >
      <Typography
       sx={{
        fontSize: { xs: "2.5rem", sm: "4rem" },
        fontWeight: 500,
        color: "white",
        fontFamily: "'MyCustomFont', sans-serif",
        textAlign: "center",
       }}
      >
       {greetings[currentIndex]}
      </Typography>
     </motion.div>
    </motion.div>
   )}
  </AnimatePresence>
 );
}
