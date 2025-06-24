"use client";

import { useState, useEffect, useRef } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function getRandomChar() {
  return chars.charAt(Math.floor(Math.random() * chars.length));
}

export default function LoadingOverlay({ isLoading }) {
  const [progress, setProgress] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const fullText = "Ayush Kumar";
  const revealSpeed = 80;
  const animationRef = useRef(null);

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    let interval;

    if (isLoading) {
      document.body.style.overflow = "hidden";
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
      document.body.style.overflow = "auto";
      setProgress(0);
      setDisplayText("");
    }

    return () => {
      document.body.style.overflow = "auto";
      clearInterval(interval);
    };
  }, [isLoading]);

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

  // Split display text into two parts for mobile
  const firstWord = displayText.split(" ")[0] || "";
  const secondWord = displayText.split(" ")[1] || "";

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: "100vh" }}
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
            overflow: "hidden",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "3rem", sm: "5rem" },
              fontWeight: 700,
              color: "white",
              fontFamily: "'Courier New', Courier, monospace",
              userSelect: "none",
              letterSpacing: "0.1em",
              lineHeight: 1.2,
            }}
          >
            {isMobile ? (
              <>
                {firstWord}
                <br />
                {secondWord}
              </>
            ) : (
              displayText
            )}
          </Typography>

          <Typography
            sx={{
              position: "absolute",
              bottom: 20,
              left: 20,
              fontSize: { xs: "2rem", sm: "4rem" },
              fontWeight: 500,
              color: "white",
              opacity: { xs: 0.2, sm: 0.4 },
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
