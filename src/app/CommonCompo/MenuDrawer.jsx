"use client";

import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import { X, ArrowUpRight, Code2, Braces, Layers, Gamepad2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecorativeShape from "./DecorativeShape";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useAppTheme } from "../context/ThemeContext";
import Link from "next/link";

gsap.registerPlugin(ScrollToPlugin);

const NAV_ITEMS = [
 { label: "Home",       id: "section-home",       num: "01" },
 { label: "About",      id: "section-about",      num: "02" },
 { label: "Projects",   id: "section-projects",   num: "03" },
 { label: "Experience", id: "section-experience", num: "04" },
 { label: "Education",  id: "section-education",  num: "05" },
 { label: "Contact",    id: "section-contact",    num: "06" },
];

const ROUTE_ITEMS = [
 { label: "Activity", href: "/activity", num: "07", icon: <Gamepad2 size={14} /> },
];

const SOCIALS = [
 { label: "GitHub",      href: "https://github.com/DivxAyush" },
 { label: "LinkedIn",    href: "https://linkedin.com" },
 { label: "Twitter / X", href: "https://twitter.com" },
];

// Role tags that animate across
const ROLES = ["Full Stack Dev", "React Expert", "UI Craftsman", "Open Source"];

const ITEM_H = 52;

// ── Rolling nav item ──
function MenuItem({ item, isActive, onClick, isDark }) {
 const textColor = isActive ? "#ff4d00" : (isDark ? "#ffffff" : "#0f0f0f");
 const numColor  = isActive ? "#ff4d00" : (isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)");

 return (
  <motion.div
   initial="rest"
   whileHover="hover"
   animate="rest"
   onClick={onClick}
   style={{
    cursor: "pointer",
    userSelect: "none",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "2px 0",
   }}
  >
   {/* Number */}
   <motion.span
    variants={{ rest: { opacity: 0.3 }, hover: { opacity: 1, color: "#ff4d00" } }}
    transition={{ duration: 0.2 }}
    style={{ fontSize: 11, fontFamily: "'MyCustomFont', sans-serif", letterSpacing: "0.12em", color: numColor, minWidth: 22, flexShrink: 0 }}
   >
    {item.num}
   </motion.span>

   {/* Rolling label */}
   <div style={{ height: ITEM_H, overflow: "hidden", flex: 1 }}>
    <motion.div
     variants={{ rest: { y: 0 }, hover: { y: -ITEM_H } }}
     transition={{ duration: 0.42, ease: [0.33, 1, 0.68, 1] }}
     style={{ display: "flex", flexDirection: "column" }}
    >
     <div style={{ height: ITEM_H, display: "flex", alignItems: "center", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, fontFamily: "'MyCustomFont', sans-serif", color: textColor }}>
      {item.label}
     </div>
     <div style={{ height: ITEM_H, display: "flex", alignItems: "center", fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, fontFamily: "'MyCustomFont', sans-serif", color: "#ff4d00" }}>
      {item.label}
     </div>
    </motion.div>
   </div>

   {/* Arrow */}
   <motion.div
    variants={{ rest: { opacity: 0, x: -8, scale: 0.8 }, hover: { opacity: 1, x: 0, scale: 1 } }}
    transition={{ duration: 0.22 }}
    style={{ flexShrink: 0 }}
   >
    <ArrowUpRight size={16} color="#ff4d00" />
   </motion.div>

   {/* Active bar */}
   {isActive && (
    <motion.div
     layoutId="activeBar"
     style={{
      position: "absolute",
      left: -18,
      top: "50%",
      transform: "translateY(-50%)",
      width: 3,
      height: 28,
      borderRadius: 2,
      background: "linear-gradient(180deg, #ff4d00, #ff7b45)",
     }}
    />
   )}
  </motion.div>
 );
}

// ── Animated rotating role tag at top ──
function RoleTag({ isDark }) {
 const [roleIdx, setRoleIdx] = useState(0);

 useEffect(() => {
  const timer = setInterval(() => setRoleIdx((p) => (p + 1) % ROLES.length), 2200);
  return () => clearInterval(timer);
 }, []);

 const bg   = isDark ? "rgba(255,77,0,0.12)"  : "rgba(255,77,0,0.1)";
 const bdr  = isDark ? "rgba(255,77,0,0.3)"   : "rgba(255,77,0,0.25)";

 return (
  <div style={{ display: "flex", alignItems: "center", gap: 8, background: bg, border: `1px solid ${bdr}`, borderRadius: 30, padding: "6px 14px", width: "fit-content" }}>
   <Code2 size={13} color="#ff4d00" />
   <div style={{ height: 18, overflow: "hidden", position: "relative", minWidth: 120 }}>
    <AnimatePresence mode="wait">
     <motion.span
      key={roleIdx}
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -18, opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
       display: "inline-block",
       fontSize: 12,
       color: "#ff4d00",
       fontFamily: "'MyCustomFont', sans-serif",
       letterSpacing: "0.04em",
       position: "absolute",
       whiteSpace: "nowrap",
      }}
     >
      {ROLES[roleIdx]}
     </motion.span>
    </AnimatePresence>
   </div>
  </div>
 );
}

// ── Animated accent bar ──
function AccentLine({ open, isDark }) {
 const lineRef = useRef(null);

 useEffect(() => {
  if (open && lineRef.current) {
   gsap.fromTo(lineRef.current,
    { scaleX: 0, opacity: 0 },
    { scaleX: 1, opacity: 1, duration: 0.7, ease: "expo.out", delay: 0.2 }
   );
  }
 }, [open]);

 return (
  <div style={{ position: "relative", height: 1, background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)", marginBottom: 6, overflow: "hidden" }}>
   <div
    ref={lineRef}
    style={{
     position: "absolute",
     top: 0,
     left: 0,
     height: "100%",
     width: "45%",
     background: "linear-gradient(90deg, #ff4d00, transparent)",
     transformOrigin: "left",
    }}
   />
  </div>
 );
}

// ── Mini tech stack row ──
function TechStack({ open, isDark }) {
 const TECH = [
  { label: "React",    icon: <Braces  size={12} /> },
  { label: "Next.js",  icon: <Layers  size={12} /> },
  { label: "Node.js",  icon: <Code2   size={12} /> },
 ];

 const tagBg   = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
 const tagBdr  = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";
 const tagText = isDark ? "rgba(255,255,255,0.5)"  : "rgba(0,0,0,0.5)";

 return (
  <motion.div
   initial={{ opacity: 0, y: 10 }}
   animate={{ opacity: open ? 1 : 0, y: open ? 0 : 10 }}
   transition={{ duration: 0.35, delay: 0.35 }}
   style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
  >
   {TECH.map(({ label, icon }) => (
    <div
     key={label}
     style={{
      display: "flex",
      alignItems: "center",
      gap: 5,
      background: tagBg,
      border: `1px solid ${tagBdr}`,
      borderRadius: 20,
      padding: "4px 10px",
      fontSize: 11,
      color: tagText,
      fontFamily: "'MyCustomFont', sans-serif",
     }}
    >
     {icon} {label}
    </div>
   ))}
  </motion.div>
 );
}

// ─────────────────────────────────────────────
//  MAIN DRAWER
// ─────────────────────────────────────────────
export default function MenuDrawer({ open, onClose }) {
 const { mode } = useAppTheme();
 const isDark = mode === "dark";

 const [activeSection, setActiveSection] = useState("section-home");
 const listRef = useRef(null);

 // Palette
 const drawerBg    = isDark ? "#0a0a0a" : "#ffffff";
 const borderEdge  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.09)";
 const dividerCol  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
 const labelCol    = isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.32)";
 const socialCol   = isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.45)";
 const closeCol    = isDark ? "#ffffff"                : "#0f0f0f";
 const closeBg     = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";
 const closeBorder = isDark ? "rgba(255,255,255,0.1)"  : "rgba(0,0,0,0.1)";

 // Active section tracking
 useEffect(() => {
  const observers = [];
  NAV_ITEMS.forEach(({ id }) => {
   const el = document.getElementById(id);
   if (!el) return;
   const obs = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
    { threshold: 0.35, rootMargin: "-10% 0px -50% 0px" }
   );
   obs.observe(el);
   observers.push(obs);
  });
  return () => observers.forEach((o) => o.disconnect());
 }, []);

 // GSAP stagger on open
 useEffect(() => {
  if (open && listRef.current) {
   const items = listRef.current.querySelectorAll(".nav-item");
   gsap.fromTo(items,
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.42, ease: "power3.out", stagger: 0.065, delay: 0.15 }
   );
  }
 }, [open]);

 const handleNavClick = (id) => {
  const el = document.getElementById(id);
  if (el) {
   if (window.__lenis) {
    // Use Lenis for buttery smooth navigation (in sync with scroll system)
    window.__lenis.scrollTo(el, { offset: -64, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
   } else {
    // Fallback to GSAP ScrollToPlugin
    gsap.to(window, { duration: 1.2, scrollTo: { y: el, offsetY: 64 }, ease: "power3.inOut" });
   }
  }
  onClose();
 };

 return (
  <Drawer
   anchor="right"
   open={open}
   onClose={onClose}
   PaperProps={{
    sx: {
     width: { xs: "100%", sm: 400 },
     backgroundColor: drawerBg,
     color: isDark ? "#fff" : "#0f0f0f",
     overflow: "hidden",
     borderLeft: `1px solid ${borderEdge}`,
    },
   }}
  >
   <Box sx={{ position: "relative", height: "100%", p: "20px 28px", display: "flex", flexDirection: "column", gap: 0 }}>

    {/* ── Header row ── */}
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
     <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: open ? 1 : 0, x: open ? 0 : -16 }}
      transition={{ duration: 0.32, delay: 0.05 }}
     >
      <Typography sx={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: labelCol, fontFamily: "'MyCustomFont', sans-serif" }}>
       Navigation
      </Typography>
     </motion.div>

     <motion.div whileHover={{ rotate: 90, scale: 1.1 }} transition={{ duration: 0.22 }}>
      <IconButton
       onClick={onClose}
       sx={{
        color: closeCol,
        width: 36, height: 36,
        background: closeBg,
        border: `1px solid ${closeBorder}`,
        borderRadius: "50%",
        transition: "all 0.2s ease",
        "&:hover": { background: "rgba(255,77,0,0.14)", borderColor: "#ff4d00", color: "#ff4d00" },
       }}
      >
       <X size={15} />
      </IconButton>
     </motion.div>
    </Box>

    {/* ── Animated role tag ── */}
    <motion.div
     initial={{ opacity: 0, y: -10 }}
     animate={{ opacity: open ? 1 : 0, y: open ? 0 : -10 }}
     transition={{ duration: 0.35, delay: 0.1 }}
     style={{ marginBottom: 12 }}
    >
     <RoleTag isDark={isDark} />
    </motion.div>

    {/* ── Animated accent divider ── */}
    <AccentLine open={open} isDark={isDark} />

    {/* ── Nav items ── */}
    <Box ref={listRef} sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0, pl: 2, pt: 0.5 }}>
     {NAV_ITEMS.map((item) => (
      <Box key={item.id} className="nav-item">
       <MenuItem
        item={item}
        isActive={activeSection === item.id}
        onClick={() => handleNavClick(item.id)}
        isDark={isDark}
       />
      </Box>
     ))}
    </Box>

    {/* ── Route items ── */}
    <Box sx={{ pl: 2, mb: 1 }}>
     <Typography sx={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.28)", mb: 1.2, fontFamily: "'MyCustomFont', sans-serif" }}>
      Explore
     </Typography>
     {ROUTE_ITEMS.map((item) => (
      <motion.div
       key={item.href}
       whileHover="hover"
       initial="rest"
       animate="rest"
      >
       <Link href={item.href} onClick={onClose} style={{ textDecoration: "none" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 0.8, cursor: "pointer" }}>
         <Box sx={{ width: 28, height: 28, borderRadius: "8px", background: "rgba(255,77,0,0.12)", border: "1px solid rgba(255,77,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ff4d00", flexShrink: 0 }}>
          {item.icon}
         </Box>
         <Typography sx={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 700, fontFamily: "'MyCustomFont', sans-serif", color: isDark ? "#fff" : "#0f0f0f", transition: "color 0.2s", "&:hover": { color: "#ff4d00" } }}>
          {item.label}
         </Typography>
         <ArrowUpRight size={14} color="#ff4d00" style={{ opacity: 0.7 }} />
        </Box>
       </Link>
      </motion.div>
     ))}
    </Box>

    {/* ── Tech stack chips ── */}
    <Box sx={{ pl: 2, mb: 1.5, mt: 0.5 }}>
     <TechStack open={open} isDark={isDark} />
    </Box>

    <Divider sx={{ borderColor: dividerCol, mb: 1.5 }} />

    {/* ── Footer ── */}
    <motion.div
     initial={{ opacity: 0, y: 14 }}
     animate={{ opacity: open ? 1 : 0, y: open ? 0 : 14 }}
     transition={{ duration: 0.35, delay: 0.5 }}
     style={{ position: "relative", zIndex: 2 }}
    >
     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
      {/* Socials */}
      <Box>
       <Typography sx={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: labelCol, mb: 1, fontFamily: "'MyCustomFont', sans-serif" }}>
        Socials
       </Typography>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 0.6 }}>
        {SOCIALS.map(({ label, href }) => (
         <Typography
          key={label}
          component="a"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
           fontSize: 13,
           color: socialCol,
           textDecoration: "none",
           fontFamily: "'MyCustomFont', sans-serif",
           transition: "color 0.2s ease",
           "&:hover": { color: "#ff4d00" },
          }}
         >
          {label}
         </Typography>
        ))}
       </Box>
      </Box>

      {/* Available badge */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
       <Box
        sx={{
         display: "flex",
         alignItems: "center",
         gap: 0.8,
         background: "rgba(16,185,129,0.1)",
         border: "1px solid rgba(16,185,129,0.3)",
         borderRadius: 20,
         px: 1.5, py: 0.6,
        }}
       >
        <Box
         sx={{
          width: 7, height: 7, borderRadius: "50%",
          background: "#10b981",
          boxShadow: "0 0 8px #10b981",
          animation: "pulse 2s ease-in-out infinite",
          "@keyframes pulse": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.3 } },
         }}
        />
        <Typography sx={{ fontSize: 11, color: "#10b981", fontFamily: "'MyCustomFont', sans-serif", letterSpacing: "0.03em" }}>
         Available
        </Typography>
       </Box>
       {/* Mini copyright stamp */}
       <Typography sx={{ fontSize: 10, color: labelCol, fontFamily: "'MyCustomFont', sans-serif", letterSpacing: "0.1em" }}>
        © 2025
       </Typography>
      </Box>
     </Box>
    </motion.div>

    {/* ── Decorative GSAP shape ── */}
    <Box sx={{ position: "absolute", bottom: 14, right: 0, zIndex: 0, pointerEvents: "none" }}>
     <DecorativeShape open={open} />
    </Box>
   </Box>
  </Drawer>
 );
}
