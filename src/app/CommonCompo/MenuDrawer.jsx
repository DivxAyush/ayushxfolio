"use client";

import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import CursorFollower from "./CursorFollower";
import DecorativeShape from "./DecorativeShape";

function AnimatedText({ text }) {
 return (
  <motion.div
   variants={{
    rest: {},
    hover: {
     transition: {
      staggerChildren: 0.04,
     },
    },
   }}
   style={{ display: "flex" }}
  >
   {text.split("").map((char, i) => (
    <motion.span
     key={i}
     variants={{
      rest: { y: 0 },
      hover: { y: -52 },
     }}
     transition={{ duration: 0.3, ease: "easeInOut" }}
     style={{ display: "inline-block" }}
    >
     {char === " " ? "\u00A0" : char}
    </motion.span>
   ))}
  </motion.div>
 );
}

function MenuItem({ label, onHover, onLeave }) {
 return (
  <Box
   sx={{
    height: 52,
    overflow: "hidden",
    display: "inline-block",
   }}
  >
   <Box
    onMouseEnter={(e) => {
     const rect = e.currentTarget.getBoundingClientRect();
     onHover({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
     });
    }}
    onMouseLeave={onLeave}
    sx={{
     cursor: "pointer",
     display: "inline-block",
    }}
   >
    <motion.div
     initial="rest"
     animate="rest"
     whileHover="hover"
     style={{ display: "flex", flexDirection: "column" }}
    >
     <Typography
      sx={{
       fontSize: 30,
       fontWeight: 700,
       lineHeight: "52px",
       letterSpacing: 1,
       display: "flex",
      }}
     >
      <AnimatedText text={label} />
     </Typography>

     <Typography
      sx={{
       fontSize: 30,
       fontWeight: 700,
       lineHeight: "52px",
       letterSpacing: 1,
       display: "flex",
      }}
     >
      <AnimatedText text={label} />
     </Typography>
    </motion.div>
   </Box>
  </Box>
 );
}


export default function MenuDrawer({ open, onClose }) {
 const [cursor, setCursor] = useState({ x: 0, y: 0 });
 const [visible, setVisible] = useState(false);
 const [hoverPos, setHoverPos] = useState(null);

 return (
  <Drawer
   anchor="right"
   open={open}
   onClose={onClose}
   PaperProps={{
    sx: {
     width: { xs: "100%", sm: 360 },
     backgroundColor: "#000",
     color: "#fff",
     overflow: "hidden",
    },
   }}
  >
   <Box
    sx={{ position: "relative", height: "100%", p: 3 }}
    onMouseMove={(e) => {
     setCursor({ x: e.clientX, y: e.clientY });
    }}
    onMouseEnter={() => setVisible(true)}
    onMouseLeave={() => setVisible(false)}
   >
    <CursorFollower
     x={cursor.x}
     y={cursor.y}
     visible={visible}
     hoverPos={hoverPos}
    />

    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
     <Typography sx={{ fontSize: 22, fontWeight: 600 }}>Menu</Typography>
     <IconButton onClick={onClose} sx={{ color: "white" }}>
      <X />
     </IconButton>
    </Box>

    <Box sx={{ mt: 6, display: "flex", flexDirection: "column", gap: 3 }}>
     <MenuItem label="Home" onHover={setHoverPos} onLeave={() => setHoverPos(null)} />
     <MenuItem label="About" onHover={setHoverPos} onLeave={() => setHoverPos(null)} />
     <MenuItem label="Projects" onHover={setHoverPos} onLeave={() => setHoverPos(null)} />
     <MenuItem label="Contact" onHover={setHoverPos} onLeave={() => setHoverPos(null)} />
    </Box>
    <DecorativeShape open={open} />
   </Box>
  </Drawer>
 );
}
