
"use client";
import { Box, Button, Typography } from "@mui/material";
import { Github, Linkedin, Mail, FileText, MapPin } from "lucide-react"; // icons from lucide-react
import { useState } from "react";

export default function HeroSection() {

 const iconBoxes = [
  { icon: <Github size={32} />, label: "GitHub" },
  { icon: <Linkedin size={32} />, label: "LinkedIn" },
  { icon: <Mail size={32} />, label: "Mail" },
  { icon: <FileText size={32} />, label: "Resume" },
 ];

 // Button click handlers (optional)
 const handleResume = () => {
  window.open("/resume.pdf", "_blank");
 };
 const handleGithub = () => {
  window.open("https://github.com/yourusername", "_blank");
 };
 const handleLinkedin = () => {
  window.open("https://linkedin.com/in/yourprofile", "_blank");
 };
 const handleMail = () => {
  window.location.href = "mailto:haquedot@gmail.com";
 };

 // Common hover effect style for buttons
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
  backgroundColor: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(8px)",
  borderRadius: 2,
  border: "1px solid rgba(200,200,200,0.4)",
  color: "white",
  width: 90,
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
   boxShadow: "0 8px 16px rgba(255, 255, 255, 0.01)",
  },
 };


 return (
  <Box
   sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
    gap: 6,
    minHeight: "100vh",
    p: { xs: 3, sm: 6 },
    fontFamily: "'Inter', sans-serif", // or your font variable
    color: "white",
   }}
  >
   {/* Left side */}
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
      Software Engineer
     </Typography>
    </Typography>

    <Box sx={{ display: "flex", gap: 4, opacity: 0.8, alignItems: "center" }}>
     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Mail size={16} />
      <Typography variant="body1">ayush21929a@gmail.com</Typography>
     </Box>

     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <MapPin size={16} />
      <Typography variant="body1">Kanpur, India</Typography>
     </Box>
    </Box>

    <Typography variant="body1" sx={{ mt: 2, opacity: 0.85 }}>
     A goal-oriented software developer with experience in building web
     applications using modern technologies like React, Next.js, and more.
     Seeking to leverage my technical skills to deliver exceptional user
     experiences.
    </Typography>

    {/* Buttons */}
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 4 }}>
     <Box
      component="button"
      onClick={handleResume}
      sx={buttonSxResume}
      aria-label="Resume"
     >
      <FileText size={15} />
      Resume
     </Box>

     <Box
      component="button"
      onClick={handleGithub}
      sx={buttonSx}
      aria-label="GitHub"
     >
      <Github size={15} />
     </Box>

     <Box
      component="button"
      onClick={handleLinkedin}
      sx={buttonSx}
      aria-label="LinkedIn"
     >
      <Linkedin size={15} />
     </Box>

     <Box
      component="button"
      onClick={handleMail}
      sx={buttonSx}
      aria-label="Mail"
     >
      <Mail size={15} />
     </Box>
    </Box>
   </Box>

   {/* Right side: 2x2 grid icons */}
   <Box
    sx={{
     display: "grid",
     gridTemplateColumns: "repeat(2, 1fr)",
     gridTemplateRows: "repeat(2, 1fr)",
     gap: 4,
     placeItems: "center",
     mt: { xs: 6, lg: 0 },
    }}
   >
    {iconBoxes.map(({ icon, label }, i) => (
     <Box
      key={i}
      sx={{
       width: 120,
       height: 120,
       borderRadius: 3,
       backgroundColor: "rgba(255,255,255,0.1)",
       border: "1px solid rgba(200,200,200,0.3)",
       backdropFilter: "blur(6px)",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       cursor: "default",
       transition: "transform 0.3s ease",
       "&:hover": {
        transform: "scale(1.1) rotate(5deg)",
        boxShadow: "0 8px 20px rgba(255,255,255,0.2)",
       },
      }}
      aria-label={label}
      role="img"
     >
      {icon}
     </Box>
    ))}
   </Box>
  </Box>
 );
}
