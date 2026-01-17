"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import profilePic from "../../public/assets/image/withayuxh.jpg";
import LoadingOverlay from "./CommonCompo/LoadingOverlay";
import { useScrambleText } from "./CommonCompo/useScrambleText";

export default function Home() {
 const [loading, setLoading] = useState(true);
 const [animateContent, setAnimateContent] = useState(false);
 const [startScramble, setStartScramble] = useState(false);
 const [startForegroundAnimation, setStartForegroundAnimation] = useState(false);

 useEffect(() => {
  const timer = setTimeout(() => {
   setLoading(false);
  }, 2000);

  return () => clearTimeout(timer);
 }, []);

 const handleOverlayHalfway = () => {
  setStartScramble(true); // starts scramble when overlay halfway up
  setStartForegroundAnimation(true);
 };

 const handleOverlayFinish = () => {
  setAnimateContent(true); // show main content after overlay fully gone
 };

 const scrambledText = useScrambleText(startScramble ? "Ayush" : "", 1000, 50);

 return (
  <div className="relative w-full h-screen bg-black text-white overflow-hidden">
   <LoadingOverlay
    isLoading={loading}
    onHalfway={handleOverlayHalfway}
    onFinish={handleOverlayFinish}
   />

   {/* Background AYUSH */}
   {animateContent && (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none px-4 w-full text-center">
     <h1
      style={{ fontFamily: "MyCustomFont2" }}
      className="font-bold opacity-[0.05] select-none leading-none text-[250px] md:text-[280px] whitespace-nowrap md:whitespace-nowrap"
     >
      <span className="hidden max-md:inline">
       {scrambledText.slice(0, 2)}
       <br />
       {scrambledText.slice(2)}
      </span>
      <span className="max-md:hidden">{scrambledText}</span>
     </h1>
    </div>
   )}

   {/* Foreground Content */}
   {startForegroundAnimation && (
    <motion.div
     initial={{ opacity: 0, y: 100 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 1, ease: "easeOut" }}
     className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4"
    >
     <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
      className="flex items-center gap-2 text-[90px] sm:text-[70px] md:text-[160px] font-extralight leading-none flex-wrap justify-center"
     >
      <span>i'm</span>
      <Image
       src={profilePic}
       alt="Profile"
       width={150}
       unoptimized
       className="object-cover"
       style={{ borderRadius: "6px" }}
      />
      <span>ayush</span>
     </motion.div>

     <motion.h2
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
      className="text-[100px] sm:text-[50px] md:text-[110px] font-bold tracking-tight leading-none mt-[-10px]"
     >
      Bringing Ideas to Reality
     </motion.h2>
    </motion.div>
   )}

   {animateContent && (
    <>
     {/* Hero Section */}
     <motion.div>...</motion.div>

     {/* About Section */}
     <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="w-full min-h-screen px-6 py-16 bg-black text-white flex flex-col items-center justify-center"
     >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       {/* Left: Text Content */}
       <div className="bg-[#111111] p-8 rounded-3xl border border-[#222] shadow-lg">
        <p className="text-2xl mb-3 text-white font-bold">*</p>
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
         I’m your <span className="font-bold text-white">Full Stack Developer</span>
        </h2>
        <p className="text-gray-400 text-base leading-relaxed mb-6">
         From designing beautiful interfaces to making sure everything runs smoothly behind the scenes, I’ve got you covered.
         Let’s turn your ideas into interactive wonders that make waves online.
         With me by your side, your website will be more than just pixels”
        </p>
        <p className="text-[#ff4d4d] text-xl font-semibold">
         &#123; <span className="text-orange-400">Simplicity for the Future</span> &#125;
        </p>
       </div>

       {/* Right: Gray Placeholder Box with Glow Circle */}
       <div className="relative flex justify-center items-center">
        <div className="w-[400px] h-[500px] rounded-3xl bg-[#333333] flex items-center justify-center">
         <span className="text-white text-lg opacity-40">Image Placeholder</span>
        </div>
        <div className="absolute top-[-20px] right-[-20px] w-14 h-14 bg-[#ff4d00] rounded-full shadow-xl shadow-orange-500 flex items-center justify-center text-2xl font-bold text-white">
         G
        </div>
       </div>
      </div>
     </motion.section>
    </>
   )}


  </div>
 );
}
