"use client";

import { useState } from "react";
import { Box, Typography, Slider, LinearProgress, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppTheme } from "../../context/ThemeContext";
import BackButton from "../../CommonCompo/BackButton";
import { Flame, Beef, Wheat, Droplets, Activity } from "lucide-react";

function calcMacros(weight, heightCm, age, gender, goal, activity) {
 const bmr = gender === "male"
  ? 10 * weight + 6.25 * heightCm - 5 * age + 5
  : 10 * weight + 6.25 * heightCm - 5 * age - 161;
 const actMult = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9 };
 const tdee = bmr * (actMult[activity] || 1.55);
 const calories = goal === "loss" ? Math.round(tdee - 400) : goal === "gain" ? Math.round(tdee + 300) : Math.round(tdee);
 const protein = Math.round(weight * (goal === "gain" ? 2.2 : 2.0));
 const fats = Math.round((calories * 0.25) / 9);
 const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);
 const bmi = (weight / ((heightCm / 100) ** 2)).toFixed(1);
 return { calories, protein, carbs, fats, bmi };
}

const GOALS = [
 { val: "loss", label: "Fat Loss", color: "#06b6d4" },
 { val: "maintain", label: "Maintain", color: "#10b981" },
 { val: "gain", label: "Muscle Gain", color: "#f59e0b" },
];
const ACTIVITIES = [
 { val: "sedentary", label: "Sedentary" },
 { val: "light", label: "Light" },
 { val: "moderate", label: "Moderate" },
 { val: "active", label: "Active" },
 { val: "veryActive", label: "Very Active" },
];

function CompactSlider({ label, value, min, max, color, onChange, unit }) {
 return (
  <Box sx={{ mb: 2 }}>
   <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
    <Typography sx={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif" }}>
     {label}
    </Typography>
    <Typography sx={{ fontSize: 13, fontWeight: 700, color, fontFamily: "'MyCustomFont',sans-serif" }}>
     {value} {unit}
    </Typography>
   </Box>
   <Slider
    value={value} min={min} max={max} onChange={(_, v) => onChange(v)} size="small"
    sx={{
     color, py: "8px",
     "& .MuiSlider-thumb": { width: 14, height: 14 },
     "& .MuiSlider-rail": { opacity: 0.15 },
    }}
   />
  </Box>
 );
}

function MacroBar({ icon, label, value, unit, color, max }) {
 return (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.8 }}>
   <Box sx={{ color, flexShrink: 0 }}>{icon}</Box>
   <Box sx={{ flex: 1 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
     <Typography sx={{ fontSize: 11, color, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'MyCustomFont',sans-serif" }}>
      {label}
     </Typography>
     <Typography sx={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'MyCustomFont',sans-serif" }}>
      {value}<Box component="span" sx={{ fontSize: 10, color: "var(--text-muted)", ml: 0.4 }}>{unit}</Box>
     </Typography>
    </Box>
    <LinearProgress
     variant="determinate" value={Math.min(100, (value / max) * 100)}
     sx={{ height: 4, borderRadius: 4, backgroundColor: `${color}18`, "& .MuiLinearProgress-bar": { backgroundColor: color, borderRadius: 4 } }}
    />
   </Box>
  </Box>
 );
}

export default function HealthCalculatorPage() {
 const { mode } = useAppTheme();
 const isDark = mode === "dark";

 const [weight, setWeight] = useState(70);
 const [height, setHeight] = useState(170);
 const [age, setAge] = useState(22);
 const [gender, setGender] = useState("male");
 const [goal, setGoal] = useState("maintain");
 const [activity, setActivity] = useState("moderate");

 const r = calcMacros(weight, height, age, gender, goal, activity);
 const bmiColor = r.bmi < 18.5 ? "#06b6d4" : r.bmi < 25 ? "#10b981" : r.bmi < 30 ? "#f59e0b" : "#ef4444";
 const bmiLabel = r.bmi < 18.5 ? "Underweight" : r.bmi < 25 ? "Healthy Weight" : r.bmi < 30 ? "Overweight" : "Obese";
 const goalColor = GOALS.find(g => g.val === goal)?.color ?? "#10b981";

 const card = {
  borderRadius: "16px", p: "20px 22px",
  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
  border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
 };

 const chipSx = (active, color) => ({
  cursor: "pointer", fontFamily: "'MyCustomFont',sans-serif", fontSize: 11,
  border: `1px solid ${active ? color : (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)")}`,
  background: active ? `${color}22` : "transparent",
  color: active ? color : "var(--text-muted)",
  transition: "all 0.2s",
  "&:hover": { borderColor: color, color },
 });

 return (
  <Box sx={{
   minHeight: "100vh",
   backgroundColor: "var(--bg-primary)",
   color: "var(--text-primary)",
   pt: "80px",
   pb: 4,
   px: { xs: 2, sm: 3, md: 5 },
   overflowY: "auto",
  }}>
   <Box sx={{ maxWidth: 1100, mx: "auto" }}>

    {/* Header */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
     <BackButton />
     <Box>
      <Typography sx={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", fontFamily: "'MyCustomFont',sans-serif" }}>
       wellness tool
      </Typography>
      <Typography component="h1" sx={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700, fontFamily: "'MyCustomFont',sans-serif", lineHeight: 1.1, color: "var(--text-primary)" }}>
       Body Weight <Box component="span" sx={{ color: "var(--accent)" }}>Calculator</Box>
      </Typography>
     </Box>
    </Box>

    {/* Two column */}
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>

     {/* LEFT */}
     <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>

      {/* Sliders */}
      <Box sx={card}>
       <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif", mb: 1.5 }}>
        Body Stats
       </Typography>
       <CompactSlider label="Weight" value={weight} min={30} max={200} unit="kg" color="var(--accent)" onChange={setWeight} />
       <CompactSlider label="Height" value={height} min={100} max={250} unit="cm" color="#06b6d4" onChange={setHeight} />
       <CompactSlider label="Age" value={age} min={10} max={90} unit="yrs" color="#7c3aed" onChange={setAge} />
      </Box>

      {/* Gender */}
      <Box sx={{ ...card, display: "flex", flexDirection: "column", gap: 1.2 }}>
       <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif" }}>
        Gender
       </Typography>
       <Box sx={{ display: "flex", gap: 1 }}>
        {["male", "female"].map(g => (
         <Chip key={g} label={g.charAt(0).toUpperCase() + g.slice(1)} onClick={() => setGender(g)}
          sx={{ ...chipSx(gender === g, "#ff4d00"), flex: 1 }} />
        ))}
       </Box>
      </Box>

      {/* Goal */}
      <Box sx={{ ...card, display: "flex", flexDirection: "column", gap: 1.2 }}>
       <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif" }}>
        Goal
       </Typography>
       <Box sx={{ display: "flex", gap: 1 }}>
        {GOALS.map(g => (
         <Chip key={g.val} label={g.label} onClick={() => setGoal(g.val)}
          sx={{ ...chipSx(goal === g.val, g.color), flex: 1 }} />
        ))}
       </Box>
      </Box>

      {/* Activity */}
      <Box sx={{ ...card, display: "flex", flexDirection: "column", gap: 1.2 }}>
       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Activity size={13} color="var(--text-muted)" />
        <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif" }}>
         Activity Level
        </Typography>
       </Box>
       <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap" }}>
        {ACTIVITIES.map(a => (
         <Chip key={a.val} label={a.label} size="small" onClick={() => setActivity(a.val)}
          sx={chipSx(activity === a.val, "#10b981")} />
        ))}
       </Box>
      </Box>
     </Box>

     {/* RIGHT */}
     <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <AnimatePresence mode="wait">
       <motion.div
        key={`${weight}-${height}-${age}-${gender}-${goal}-${activity}`}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
       >
        {/* BMI */}
        <Box sx={{ ...card, display: "flex", alignItems: "center", gap: 3 }}>
         <Box>
          <Typography sx={{ fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif", mb: 0.5 }}>
           BMI Index
          </Typography>
          <Typography sx={{ fontSize: 52, fontWeight: 900, color: bmiColor, fontFamily: "'MyCustomFont',sans-serif", lineHeight: 1 }}>
           {r.bmi}
          </Typography>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, mt: 0.8, background: `${bmiColor}18`, border: `1px solid ${bmiColor}44`, borderRadius: 20, px: 1.2, py: 0.3 }}>
           <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: bmiColor }} />
           <Typography sx={{ fontSize: 11, color: bmiColor, fontFamily: "'MyCustomFont',sans-serif" }}>{bmiLabel}</Typography>
          </Box>
         </Box>
         <Box sx={{ flex: 1 }}>
          {[{ l: "< 18.5 Underweight", c: "#06b6d4" }, { l: "18.5–24.9 Healthy", c: "#10b981" }, { l: "25–29.9 Overweight", c: "#f59e0b" }, { l: "≥ 30 Obese", c: "#ef4444" }].map(({ l, c }) => (
           <Box key={l} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.6 }}>
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", background: c, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif" }}>{l}</Typography>
           </Box>
          ))}
         </Box>
        </Box>

        {/* Calories */}
        <Box sx={{ ...card, textAlign: "center", background: `linear-gradient(135deg,rgba(255,77,0,0.08),rgba(255,77,0,0.02))`, border: "1px solid rgba(255,77,0,0.2)" }}>
         <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center", mb: 0.5 }}>
          <Flame size={15} color="#ff4d00" />
          <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#ff4d00", fontFamily: "'MyCustomFont',sans-serif" }}>Daily Calories</Typography>
         </Box>
         <Typography sx={{ fontSize: 54, fontWeight: 900, color: "var(--text-primary)", fontFamily: "'MyCustomFont',sans-serif", lineHeight: 1 }}>
          {r.calories}
          <Box component="span" sx={{ fontSize: 16, color: "var(--text-muted)", fontWeight: 400, ml: 0.8 }}>kcal</Box>
         </Typography>
         <Typography sx={{ fontSize: 11, color: goalColor, fontFamily: "'MyCustomFont',sans-serif", mt: 0.5 }}>
          {goal === "loss" ? "Caloric Deficit (−400 kcal)" : goal === "gain" ? "Caloric Surplus (+300 kcal)" : "Maintenance Calories"}
         </Typography>
        </Box>

        {/* Macros */}
        <Box sx={card}>
         <Typography sx={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif", mb: 2 }}>
          Daily Macros
         </Typography>
         <MacroBar icon={<Beef size={14} />} label="Protein" value={r.protein} unit="g" color="#10b981" max={300} />
         <MacroBar icon={<Wheat size={14} />} label="Carbohydrates" value={r.carbs} unit="g" color="#7c3aed" max={600} />
         <MacroBar icon={<Droplets size={14} />} label="Fats" value={r.fats} unit="g" color="#f59e0b" max={150} />
        </Box>
       </motion.div>
      </AnimatePresence>
     </Box>
    </Box>
   </Box>
  </Box>
 );
}
