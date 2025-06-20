"use client";
import { Box, keyframes, Typography } from "@mui/material";
import { Github, Linkedin, Mail, FileText, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import LoadingOverlay from "./CommonCompo/LoadingOverlay";
import { useEffect, useState } from "react";

export default function HeroSection() {
 const iconBoxes = [
  { icon: <Github size={32} />, label: "GitHub" },
  { icon: <Linkedin size={32} />, label: "LinkedIn" },
  { icon: <Mail size={32} />, label: "Mail" },
  { icon: <FileText size={32} />, label: "Resume" },
 ];


 const tiltAndMove = keyframes`
  0% {
    transform: rotate(-5deg) translateZ(0) scale(1);
  }
  25% {
    transform: rotate(0deg) translateZ(5px) scale(1.05);
  }
  50% {
    transform: rotate(5deg) translateZ(0) scale(1);
  }
  75% {
    transform: rotate(0deg) translateZ(-5px) scale(0.95);
  }
  100% {
    transform: rotate(-5deg) translateZ(0) scale(1);
  }
`;


 // Button handlers
 const handleResume = () => window.open("/resume.pdf", "_blank");
 const handleGithub = () => window.open("https://github.com/yourusername", "_blank");
 const handleLinkedin = () => window.open("https://linkedin.com/in/yourprofile", "_blank");
 const handleMail = () => (window.location.href = "mailto:haquedot@gmail.com");
 // Button stylesdds
 const buttonSx = {
  backgroundColor: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(8px)",
  borderRadius: 2,
  border: "1px solid rgba(200,200,200,0.4)",
  color: "white",
  width: 37,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
   transform: "perspective(600px) rotateX(8deg) rotateY(8deg)",
   backgroundColor: "rgba(255,255,255,0.25)",
   boxShadow: "0 8px 16px rgba(255, 255, 255, 0.06)",
  },
 };
 const buttonSxResume = {
  ...buttonSx,
  width: 90,
 };
 const [loading, setLoading] = useState(true);
 useEffect(() => {
  // Simulate loading delay - replace with actual data fetch if needed
  const timer = setTimeout(() => setLoading(false), 2000);
  return () => clearTimeout(timer);
 }, []);

 // Framer Motion Variants
 const bounceVariants = {
  animate: {
   y: [0, -15, 0],
   transition: {
    y: {
     repeat: Infinity,
     repeatType: "loop",
     duration: 1.5,
     ease: "easeInOut",
    },
   },
  },
 };
 const waveVariants = {
  initial: { scale: 0, opacity: 0.5 },
  animate: {
   scale: [0, 1.5, 2],
   opacity: [0.5, 0.2, 0],
   transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeOut",
   },
  },
 };
 // Entrance animations for left and right sides
 const leftVariants = {
  initial: { y: 1, opacity: 0 },
  animate: { y: 120, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
 };
 const rightVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
 };
 const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
   opacity: 1,
   transition: {
    staggerChildren: 0.05,
    delayChildren: 0.2,
   },
  },
 };
 const wordVariants = {
  hidden: {
   opacity: 0,
   y: 20,
   filter: "blur(4px)",
  },
  visible: {
   opacity: 1,
   y: 0,
   filter: "blur(0px)",
   transition: {
    duration: 0.4,
    ease: "easeOut",
   },
  },
 };
 const ripple = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 0.6;
  }
  70% {
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.4);
    opacity: 0;
  }
`;

 return (
  <Box
   sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
    gap: 6,
    minHeight: "100vh",
    p: { xs: 3, sm: 6 },
    fontFamily: "'Inter', sans-serif",
    color: "white",
   }}
  >
   {/* Left side with slide-up animation */}

   <LoadingOverlay isLoading={loading} />

   {/* Main Hero content */}
   {!loading && (
    <>
     <motion.div
      variants={leftVariants}
      initial="initial"
      animate="animate"
      style={{ width: "100%" }}
     >
      <Box
       sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        maxWidth: 600,
       }}
      >
       <Typography variant="h4" fontWeight="bold" sx={{ lineHeight: 1.1 }}>
        Ayush Kumar <br />
        <Typography
         component="span"
         variant="h6"
         fontWeight="medium"
         color="secondary.main"
        >
         Front-End React Developer
        </Typography>
       </Typography>

       <Box sx={{ display: "flex", gap: 4, opacity: 0.8, alignItems: "center" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
         <Mail size={16} />
         <Typography variant="body1">ayush21929a@gmail.com</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
         <Box sx={{ position: "relative", width: 16, height: 16 }}>
          {[0, 0.6, 1.2].map((delay, idx) => (
           <Box
            key={idx}
            sx={{
             position: "absolute",
             top: "50%",
             left: "50%",
             width: 16,
             height: 16,
             borderRadius: "50%",
             backgroundColor: "#4caf50",
             transform: "translate(-50%, -50%) scale(0.8)",
             opacity: 0.6,
             animation: `${ripple} 2s ease-in-out infinite`,
             animationDelay: `${delay}s`,
             zIndex: 0,
            }}
           />
          ))}

          {/* Static center dot */}
          <Box
           sx={{
            width: 8,
            height: 8,
            backgroundColor: "#4caf50",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
           }}
          />

          {/* MapPin icon */}
          <MapPin
           size={16}
           style={{
            position: "relative",
            zIndex: 2,
           }}
          />
         </Box>

         <Typography variant="body1">Kanpur, India</Typography>
        </Box>

       </Box>

       <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: "flex", flexWrap: "wrap", marginTop: 16 }}
       >
        {`A goal-oriented software developer with experience in building web applications using modern technologies like React, Next.js, and more. Seeking to leverage my technical skills to deliver exceptional user experiences.`
         .split(" ")
         .map((word, i) => (
          <motion.span
           key={i}
           variants={wordVariants}
           style={{
            marginRight: "6px",
            display: "inline-block",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.85)",
            fontFamily: "Inter, sans-serif",
           }}
          >
           {word}
          </motion.span>
         ))}
       </motion.div>



       {/* Buttons */}
       <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 4 }}>
        <Box component="button" onClick={handleResume} sx={buttonSxResume} aria-label="Resume">
         <FileText size={15} />
         Resume
        </Box>

        <Box component="button" onClick={handleGithub} sx={buttonSx} aria-label="GitHub">
         <Github size={15} />
        </Box>

        <Box component="button" onClick={handleLinkedin} sx={buttonSx} aria-label="LinkedIn">
         <Linkedin size={15} />
        </Box>

        <Box component="button" onClick={handleMail} sx={buttonSx} aria-label="Mail">
         <Mail size={15} />
        </Box>
       </Box>
      </Box>
     </motion.div>

     <motion.div
      variants={rightVariants}
      initial="initial"
      animate="animate"
      style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
     >
      <Box
       sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 120px)",
        gridTemplateRows: "repeat(2, 120px)",
        gap: 1,
        placeItems: "center",
        justifyContent: "center",
        alignContent: "center",
        height: "100%",
       }}
      >
       {iconBoxes.map(({ icon, label }, i) => {


        // Text for each corner circle based on index
        const cornerTexts = ["ReactJS", "MUI", "Java Script", "Next JS"];
        const cornerPositions = [
         { top: -27, left: -8 },   // top-left corner, outside thoda bahar
         { top: -33, right: -5 },  // top-right corner
         { bottom: -33, left: -2 },// bottom-left corner
         { bottom: -33, right: 2 },// bottom-right corner
        ];
        const isGithubBox = label === "GitHub";
        return (
         <Box
          key={i}
          sx={{
           position: "relative",
           width: 120,
           height: 120,
           borderRadius: 16,
          }}
         >
          <Box
           sx={{
            position: "absolute",
            ...cornerPositions[i],
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            backgroundColor: "#121212",
            borderRadius: "40px",
            width: 88,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: "500",
            textAlign: "center",
            pointerEvents: "none",
            zIndex: 10,
            padding: "6px",
            lineHeight: 1.1,
            userSelect: "none",
            animation: `${tiltAndMove} 5s ease-in-out infinite`,
            transformOrigin: "center bottom",
            transformStyle: "preserve-3d",

           }}
          >
           {cornerTexts[i]}
          </Box>
          {isGithubBox && (
           <motion.div
            variants={waveVariants}
            initial="initial"
            animate="animate"
            style={{
             position: "absolute",
             top: "50%",
             left: "50%",
             width: 120,
             height: 120,
             borderRadius: "50%",
             border: "2px solid rgba(255,255,255,0.3)",
             transform: "translate(-50%, -50%)",
             pointerEvents: "none",
             zIndex: 0,
            }}
           />
          )}

          {isGithubBox ? (
           <motion.div
            variants={bounceVariants}
            animate="animate"
            whileHover={{ scale: 1.1 }}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
           >
            <Box
             sx={{
              width: "100%",
              height: "100%",
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(200,200,200,0.3)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
             }}
             aria-label={label}
             role="img"
            >
             {icon}
            </Box>
           </motion.div>
          ) : (
           <motion.div
            whileHover={{ scale: 1.1 }}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
           >
            <Box
             sx={{
              width: "100%",
              height: "100%",
              borderRadius: 3,
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(200,200,200,0.3)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              zIndex: 1,
             }}
             aria-label={label}
             role="img"
            >
             {icon}
            </Box>
           </motion.div>
          )}
         </Box>
        );
       })}


      </Box>
     </motion.div>
    </>
   )}
  </Box>
 );
}
