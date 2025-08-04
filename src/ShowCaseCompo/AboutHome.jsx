"use client";
import { motion } from "framer-motion";

export default function AboutHome() {
 return (
  <section className="w-full min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center justify-center">
   <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    {/* Left: Text Content */}
    <motion.div
     initial={{ opacity: 0, y: 60 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 1 }}
     viewport={{ once: true }}
     className="bg-[#111111] p-8 rounded-3xl border border-[#222] shadow-lg"
    >
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
    </motion.div>

    {/* Right: Gray Placeholder Box with Glow Circle */}
    <motion.div
     initial={{ opacity: 0, x: 60 }}
     whileInView={{ opacity: 1, x: 0 }}
     transition={{ duration: 1 }}
     viewport={{ once: true }}
     className="relative flex justify-center items-center"
    >
     <div className="w-[400px] h-[500px] rounded-3xl bg-[#333333] flex items-center justify-center">
      <span className="text-white text-lg opacity-40">Image Placeholder</span>
     </div>
     <div className="absolute top-[-20px] right-[-20px] w-14 h-14 bg-[#ff4d00] rounded-full shadow-xl shadow-orange-500 flex items-center justify-center text-2xl font-bold text-white">
      G
     </div>
    </motion.div>
   </div>
  </section>
 );
}
