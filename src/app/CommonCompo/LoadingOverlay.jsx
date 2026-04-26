"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "SYSTEM_BOOT_INITIATED...",
  "KERNEL_LOADING... [OK]",
  "ESTABLISHING_SECURE_CONNECTION... [OK]",
  "MOUNTING_VIRTUAL_DRIVES... [OK]",
  "DECRYPTING_ASSETS... [IN_PROGRESS]",
  "ASSETS_DECRYPTED... [OK]",
  "INITIALIZING_UI_ENGINE...",
  "ACCESS_GRANTED_WELCOME"
];

export default function LoadingOverlay({ isLoading, onFinish, onHalfway }) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [visibleLines, setVisibleLines] = useState([]);
  const [percent, setPercent] = useState(0);
  const [hasTriggeredHalfway, setHasTriggeredHalfway] = useState(false);

  // Lock scroll while overlay visible
  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      if (window.__lenis) window.__lenis.stop();
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
    };
  }, [showOverlay]);

  useEffect(() => {
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setVisibleLines(prev => [...prev, bootLines[currentLine]]);
        setPercent(Math.floor(((currentLine + 1) / bootLines.length) * 100));
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowOverlay(false), 500); // Small pause before hiding
      }
    }, 250); // Speed of each line appearing

    return () => clearInterval(interval);
  }, []);

  const handleAnimationUpdate = (latest) => {
    if (latest.y !== undefined && parseFloat(latest.y) < -50 && !hasTriggeredHalfway) {
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
            backgroundColor: "#050505",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            padding: "5vw",
            overflow: "hidden",
            color: "#fff",
            fontFamily: "monospace",
          }}
        >
          {/* Terminal Text */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100%", maxWidth: "800px" }}>
            {visibleLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  fontSize: "clamp(0.8rem, 1.5vw, 1.2rem)",
                  color: index === bootLines.length - 1 ? "#00ff00" : "rgba(255,255,255,0.7)",
                  marginBottom: "8px",
                  textShadow: index === bootLines.length - 1 ? "0 0 10px rgba(0,255,0,0.5)" : "none"
                }}
              >
                {">"} {line}
              </motion.div>
            ))}
            
            {/* Blinking cursor */}
            {visibleLines.length < bootLines.length && (
              <motion.div
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{
                  width: "10px",
                  height: "20px",
                  backgroundColor: "#fff",
                  marginTop: "8px"
                }}
              />
            )}
          </div>

          {/* Progress Bar Area */}
          <div style={{ width: "100%", maxWidth: "800px", marginTop: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>
              <span>SYSTEM_LOAD</span>
              <span>{percent}%</span>
            </div>
            <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.1)" }}>
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.2 }}
                style={{ height: "100%", background: "#ffffff" }} 
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
