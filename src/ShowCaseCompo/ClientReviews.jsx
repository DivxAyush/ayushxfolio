"use client";

import { motion } from "framer-motion";
import { Box, Typography, Stack, Avatar, Rating } from "@mui/material";

const REVIEW_ROWS = [
 [
  {
   name: "Rohan Mehta",
   role: "Startup Founder",
   rating: 5,
   review:
    "Ayush ne hamare product ko sirf build nahi kiya, usne usse polish bhi diya. Speed, UI aur responsiveness tino top class the.",
  },
  {
   name: "Priya Sharma",
   role: "Product Designer",
   rating: 5,
   review:
    "Design handoff ke baad implementation itna clean tha ki almost koi rework hi nahi laga. Details par kaafi strong pakad hai.",
  },
  {
   name: "Aman Verma",
   role: "Freelance Client",
   rating: 4,
   review:
    "Communication smooth rahi aur har feedback round fast turnaround ke saath mila. Final website kaafi premium feel deti hai.",
  },
 ],
 [
  {
   name: "Sneha Kapoor",
   role: "Agency Lead",
   rating: 5,
   review:
    "Deadline tight thi but delivery time par hui. Animations aur performance ke beech balance genuinely impressive tha.",
  },
  {
   name: "Nikhil Arora",
   role: "Frontend Engineer",
   rating: 5,
   review:
    "Code quality dekh ke laga banda visuals ke saath engineering ko bhi equally seriously leta hai. Kaam dependable tha.",
  },
  {
   name: "Ishita Jain",
   role: "Founder, D2C Brand",
   rating: 4,
   review:
    "Landing page redesign ke baad brand ka presentation bahut elevate ho gaya. Mobile par bhi experience kaafi smooth tha.",
  },
 ],
 [
  {
   name: "Karan Bhatia",
   role: "Hackathon Teammate",
   rating: 5,
   review:
    "Pressure ke time bhi calm rehta hai aur kaam nikalwa deta hai. Rapid prototyping aur UI finishing dono me strong hai.",
  },
  {
   name: "Ananya Singh",
   role: "Marketing Consultant",
   rating: 4,
   review:
    "Portfolio style aur storytelling dono standout lage. Visual motion use kiya but overdone bilkul nahi lagta.",
  },
  {
   name: "Dev Malhotra",
   role: "SaaS Co-founder",
   rating: 5,
   review:
    "Feature suggestions bhi useful the, sirf execution nahi. Product thinking clearly dikhti hai har decision me.",
  },
 ],
 [
  {
   name: "Tanya Sethi",
   role: "UI/UX Designer",
   rating: 5,
   review:
    "Spacing, typography aur transitions ka sense bahut mature hai. Build almost exactly design intent ke saath ship hua.",
  },
  {
   name: "Rahul Chauhan",
   role: "Client Partner",
   rating: 4,
   review:
    "Professional approach, regular updates, aur final output strong. Jo promise kiya tha usse better result mila.",
  },
  {
   name: "Yashika Arora",
   role: "Community Manager",
   rating: 5,
   review:
    "Smooth collaboration aur kaafi positive energy ke saath kaam hua. Small fixes bhi without friction close hote gaye.",
  },
 ],
];

function ReviewCard({ review }) {
 return (
  <Box
   component="article"
   sx={{
    width: "100%",
    p: 3,
    borderRadius: "22px",
    background: "linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))",
    border: "1px solid var(--bg-card-border)",
    boxShadow: "0 18px 50px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
    boxSizing: "border-box"
   }}
  >
   <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
    <Stack direction="row" alignItems="center" spacing={1.5}>
     <Avatar
      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=random&color=fff&rounded=true&bold=true`}
      alt={review.name}
      sx={{ width: 44, height: 44 }}
     />
     <Box>
      <Typography
       component="h3"
       sx={{
        m: 0,
        fontSize: "1rem",
        fontWeight: 600,
        color: "var(--text-primary)",
        fontFamily: "'MyCustomFont', sans-serif",
       }}
      >
       {review.name}
      </Typography>
      <Typography
       component="p"
       sx={{
        m: 0,
        mt: 0.2,
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        fontFamily: "'MyCustomFont', sans-serif",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
       }}
      >
       {review.role}
      </Typography>
     </Box>
    </Stack>

    <Rating value={review.rating} readOnly size="small" sx={{ color: "#ffb547" }} />
   </Stack>

   <Typography
    component="p"
    sx={{
     m: 0,
     fontSize: "0.875rem",
     lineHeight: 1.75,
     color: "var(--text-secondary)",
     fontFamily: "'MyCustomFont', sans-serif",
    }}
   >
    "{review.review}"
   </Typography>
  </Box>
 );
}

function ReviewColumn({ reviews, direction = "up", speed = 30 }) {
 const marqueeReviews = [...reviews, ...reviews];

 return (
  <Box sx={{ overflow: "hidden", width: "100%", height: "100%", display: "flex" }}>
   <motion.div
    style={{
     display: "flex",
     flexDirection: "column",
     gap: "20px",
     width: "100%",
     willChange: "transform",
    }}
    animate={{
     y: direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"],
    }}
    transition={{
     y: {
      repeat: Infinity,
      repeatType: "loop",
      duration: speed,
      ease: "linear",
     },
    }}
   >
    {marqueeReviews.map((review, index) => (
     <ReviewCard
      key={`${review.name}-${review.role}-${index}`}
      review={review}
     />
    ))}
   </motion.div>
  </Box>
 );
}

export default function ClientReviews() {
 return (
  <Box
   component="section"
   id="section-reviews"
   className="section-uniform"
   sx={{
    width: "100%",
    minHeight: "100vh",
    color: "var(--text-primary)",
    pt: { xs: 8, md: 14 },
    pb: { xs: 6, md: 10 },
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
   }}
  >
   <Box sx={{ maxWidth: 1100, mx: "auto", px: 3, boxSizing: "border-box", mb: { xs: 4, md: 6 } }}>
    <Typography
     data-gsap="fade-up"
     sx={{
      fontSize: "0.75rem",
      letterSpacing: "0.2em",
      color: "var(--accent)",
      textTransform: "uppercase",
      mb: 1.5,
      fontFamily: "'MyCustomFont', sans-serif",
     }}
    >
     client voices
    </Typography>

    <Typography
     component="h2"
     data-gsap="heading"
     sx={{
      fontSize: "clamp(2.2rem, 5vw, 4rem)",
      fontWeight: 700,
      lineHeight: 1.1,
      m: "0 0 20px 0",
      fontFamily: "'MyCustomFont', sans-serif",
      color: "var(--text-primary)",
      maxWidth: 760,
     }}
    >
     What people say about <Box component="span" sx={{ color: "var(--accent)" }}>working with me.</Box>
    </Typography>

    <Typography
     data-gsap="fade-up"
     sx={{
      maxWidth: 620,
      fontSize: "0.9375rem",
      lineHeight: 1.85,
      color: "var(--text-secondary)",
      fontFamily: "'MyCustomFont', sans-serif",
     }}
    >
     A moving wall of feedback from people I have built with, collaborated with,
     and shipped work for.
    </Typography>
   </Box>

   <Box
    className="reviews-shell"
    data-gsap="fade-up"
    sx={{
     maxWidth: 1300,
     mx: "auto",
     px: { xs: 2.5, md: 3 },
     height: { xs: "500px", md: "650px" },
     display: "grid",
     gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
     gap: { xs: 2, md: 2.5 },
     maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
     WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
     overflow: "hidden"
    }}
   >
    <ReviewColumn reviews={REVIEW_ROWS[0]} direction="up" speed={35} />
    
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
     <ReviewColumn reviews={REVIEW_ROWS[1]} direction="down" speed={40} />
    </Box>
    
    <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
     <ReviewColumn reviews={REVIEW_ROWS[2]} direction="up" speed={32} />
    </Box>
    
    <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
     <ReviewColumn reviews={REVIEW_ROWS[3]} direction="down" speed={38} />
    </Box>
   </Box>
  </Box>
 );
}
