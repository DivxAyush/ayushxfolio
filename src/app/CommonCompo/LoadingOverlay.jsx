"use client";

import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomChar() {
 return chars.charAt(Math.floor(Math.random() * chars.length));
}

export default function LoadingOverlay({ isLoading }) {
 const [progress, setProgress] = useState(0);
 const [displayText, setDisplayText] = useState("");
 const fullText = "Ayush Kumar";
 const revealSpeed = 110; // ms per step
 const animationRef = useRef(null);

 // Progress bar logic (your existing)
 useEffect(() => {
  let interval;

  if (isLoading) {
   setProgress(0);
   interval = setInterval(() => {
    setProgress((prev) => {
     if (prev >= 100) {
      clearInterval(interval);
      return 100;
     }
     return prev + 1;
    });
   }, 20);
  } else {
   setProgress(0);
   setDisplayText("");
  }

  return () => clearInterval(interval);
 }, [isLoading]);

 // Random text reveal effect
 useEffect(() => {
  if (!isLoading) {
   setDisplayText("");
   if (animationRef.current) clearTimeout(animationRef.current);
   return;
  }

  let revealedCount = 0;

  function revealStep() {
   if (revealedCount >= fullText.length) {
    setDisplayText(fullText);
    return;
   }

   // Build display string with revealed chars + random chars
   let result = "";
   for (let i = 0; i < fullText.length; i++) {
    if (i < revealedCount) {
     result += fullText[i];
    } else if (fullText[i] === " ") {
     result += " ";
    } else {
     result += getRandomChar();
    }
   }

   setDisplayText(result);
   revealedCount++;
   animationRef.current = setTimeout(revealStep, revealSpeed);
  }

  revealStep();

  return () => {
   if (animationRef.current) clearTimeout(animationRef.current);
  };
 }, [isLoading]);

 return (
  <AnimatePresence>
   {isLoading && (
    <motion.div
     initial={{ opacity: 1 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     transition={{ duration: 0.7, ease: "easeOut" }}
     style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "#121212",
      zIndex: 1300,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
     }}
    >
     <Typography
      sx={{
       fontSize: "5rem",
       fontWeight: 700,
       color: "white",
       fontFamily: "'Courier New', Courier, monospace",
       userSelect: "none",
       letterSpacing: "0.1em",
       whiteSpace: "pre",
      }}
     >
      {displayText}
     </Typography>

     {/* Bottom-left Percentage Text */}
     <Typography
      sx={{
       position: "absolute",
       bottom: 20,
       left: 20,
       fontSize: "4rem",
       fontWeight: 500,
       color: "white",
       opacity: 0.4,
       userSelect: "none",
      }}
     >
      {progress}%
     </Typography>
    </motion.div>
   )}
  </AnimatePresence>
 );
}
