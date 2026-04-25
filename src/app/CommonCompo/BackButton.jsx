"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAppTheme } from "../context/ThemeContext";

export default function BackButton({ href = "/activity", label = "Back" }) {
 const router = useRouter();
 const { mode } = useAppTheme();
 const isDark = mode === "dark";

 return (
  <motion.button
   whileHover={{ x: -4, scale: 1.02 }}
   whileTap={{ scale: 0.97 }}
   onClick={() => router.push(href)}
   style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
    borderRadius: 40,
    padding: "8px 18px",
    cursor: "pointer",
    color: "var(--text-secondary)",
    fontSize: 13,
    fontFamily: "'MyCustomFont', sans-serif",
    letterSpacing: "0.02em",
    transition: "all 0.2s ease",
   }}
  >
   <ArrowLeft size={15} />
   {label}
  </motion.button>
 );
}
