"use client";

import { Box, Grid, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppTheme } from "../context/ThemeContext";
import { Dumbbell, Hash, Target, Sparkles, Gamepad } from "lucide-react";

const ACTIVITIES = [
 {
  id: "health-calculator",
  title: "Health Calculator",
  description: "Calculate your daily protein, carbs & calorie goals based on body weight and fitness goal.",
  icon: <Dumbbell size={28} />,
  color: "#10b981",
  tag: "Wellness",
  href: "/activity/health-calculator",
 },
 {
  id: "tic-tac-toe",
  title: "Tic Tac Toe",
  description: "Classic 2-player Tic Tac Toe with score tracking, win detection & smooth animations.",
  icon: <Hash size={28} />,
  color: "#7c3aed",
  tag: "Game",
  href: "/activity/tic-tac-toe",
 },
 {
  id: "bubble-shooter",
  title: "Bubble Shooter",
  description: "Aim and shoot colored bubbles to clear the board. Addictive casual gameplay.",
  icon: <Target size={28} />,
  color: "#f59e0b",
  tag: "Game",
  href: "/activity/bubble-shooter",
 },
 {
  id: "snake",
  title: "Snake Game",
  description: "Classic snake with smooth animations, glowing neon visuals, particles, and speed levels.",
  icon: <Gamepad size={28} />,
  color: "#4ade80",
  tag: "Game",
  href: "/activity/snake",
 },
];

function ActivityCard({ activity, index }) {
 const router = useRouter();
 const { mode } = useAppTheme();
 const isDark = mode === "dark";

 return (
  <motion.div
   initial={{ opacity: 0, y: 40 }}
   animate={{ opacity: 1, y: 0 }}
   transition={{ duration: 0.5, delay: index * 0.1, ease: [0.33, 1, 0.68, 1] }}
   whileHover={{ y: -6, scale: 1.01 }}
   whileTap={{ scale: 0.98 }}
   onClick={() => router.push(activity.href)}
   style={{ cursor: "pointer", height: "100%" }}
  >
   <Box
    sx={{
     borderRadius: "20px",
     overflow: "hidden",
     border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)"}`,
     background: isDark
      ? "linear-gradient(145deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))"
      : "linear-gradient(145deg,rgba(0,0,0,0.03),rgba(0,0,0,0.01))",
     backdropFilter: "blur(12px)",
     transition: "all 0.3s ease",
     height: "100%",
     display: "flex",
     flexDirection: "column",
     "&:hover": {
      border: `1px solid ${activity.color}55`,
      boxShadow: `0 20px 60px ${activity.color}18`,
     },
    }}
   >
    <Box
     sx={{
      width: "100%",
      aspectRatio: "16/9",
      background: `linear-gradient(135deg,${activity.color}18 0%,${activity.color}08 100%)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
     }}
    >
     <Box sx={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", border: `1px solid ${activity.color}22`, top: -30, right: -30 }} />
     <Box sx={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", border: `1px solid ${activity.color}18`, bottom: -20, left: -20 }} />
     <Box
      sx={{
       width: 72, height: 72, borderRadius: "18px",
       background: `${activity.color}22`,
       border: `1px solid ${activity.color}44`,
       display: "flex", alignItems: "center", justifyContent: "center",
       color: activity.color,
      }}
     >
      {activity.icon}
     </Box>
    </Box>

    <Box sx={{ p: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
     <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Typography sx={{ fontSize: 19, fontWeight: 700, fontFamily: "'MyCustomFont',sans-serif", color: "var(--text-primary)" }}>
       {activity.title}
      </Typography>
      <Chip
       label={activity.tag}
       size="small"
       sx={{
        fontSize: 10, fontFamily: "'MyCustomFont',sans-serif", letterSpacing: "0.06em",
        height: 22, background: `${activity.color}18`, border: `1px solid ${activity.color}44`, color: activity.color,
       }}
      />
     </Box>
     <Typography sx={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--text-secondary)", fontFamily: "'MyCustomFont',sans-serif", flex: 1 }}>
      {activity.description}
     </Typography>
     <Box sx={{ fontSize: 13, fontWeight: 600, color: activity.color, fontFamily: "'MyCustomFont',sans-serif", mt: 0.5 }}>
      Open →
     </Box>
    </Box>
   </Box>
  </motion.div>
 );
}

export default function ActivityPage() {
 return (
  <Box sx={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", pt: "100px", pb: "80px", px: { xs: 2, sm: 4 } }}>
   <Box sx={{ maxWidth: 1100, mx: "auto" }}>
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
     <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
      <Sparkles size={14} color="var(--accent)" />
      <Typography sx={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", fontFamily: "'MyCustomFont',sans-serif" }}>
       mini apps & games
      </Typography>
     </Box>
     <Typography component="h1" sx={{ fontSize: "clamp(2.2rem,5vw,4rem)", fontWeight: 700, lineHeight: 1.1, fontFamily: "'MyCustomFont',sans-serif", color: "var(--text-primary)", mb: 1.5 }}>
      Activity <Box component="span" sx={{ color: "var(--accent)" }}>Hub</Box>
     </Typography>
     <Typography sx={{ fontSize: 15, color: "var(--text-secondary)", fontFamily: "'MyCustomFont',sans-serif", maxWidth: 520, lineHeight: 1.8, mb: 6 }}>
      A collection of interactive mini apps and games — built for fun and exploration.
     </Typography>
    </motion.div>

    <Grid container spacing={3}>
     {ACTIVITIES.map((activity, i) => (
      <Grid key={activity.id} size={{ xs: 12, sm: 6, md: 4 }}>
       <ActivityCard activity={activity} index={i} />
      </Grid>
     ))}
    </Grid>
   </Box>
  </Box>
 );
}
