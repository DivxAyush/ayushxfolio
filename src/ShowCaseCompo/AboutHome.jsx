"use client";

import { useState } from "react";
import Image from "next/image";
import profilePic from "../../public/assets/image/withayuxh.jpg";
import { Music2, Gamepad2, Code2, Coffee, Play, Pause } from "lucide-react";
import { motion } from "framer-motion";

// ─── DATA ───
const HOBBIES = [
 { icon: <Code2 size={20} />, label: "Building cool stuff" },
 { icon: <Gamepad2 size={20} />, label: "Gaming" },
 { icon: <Music2 size={20} />, label: "Music" },
 { icon: <Coffee size={20} />, label: "Late-night coffee" },
];

const SKILLS = [
 "React", "Next.js", "Node.js", "Express", "MongoDB",
 "PostgreSQL", "TypeScript", "Tailwind CSS", "Framer Motion",
 "REST APIs", "Git", "Figma",
];

const SONGS = [
 { id: 1, title: "Blinding Lights", artist: "The Weeknd", spotifyId: "0VjIjW4GlUZAMYd2vXMi3b", color: "#ff4d00" },
 { id: 2, title: "Starboy", artist: "The Weeknd ft. Daft Punk", spotifyId: "7MXVkk9YMctZqd1Srtv4MB", color: "#7c3aed" },
 { id: 3, title: "Levitating", artist: "Dua Lipa", spotifyId: "463CkQjx2Zk1yXoBuierM9", color: "#ec4899" },
 { id: 4, title: "Save Your Tears", artist: "The Weeknd", spotifyId: "5QO79kh1waicV47BqGRL3g", color: "#10b981" },
 { id: 5, title: "Peaches", artist: "Justin Bieber", spotifyId: "4iJyoBOLtHqaWYs3vyWFGm", color: "#f59e0b" },
 { id: 6, title: "Shape of You", artist: "Ed Sheeran", spotifyId: "7qiZfU4dY1lWllzX7mPBI3", color: "#06b6d4" },
];

// ─── SONG CARD ───
function SongCard({ song, isPlaying, onToggle }) {
 return (
  <div
   onClick={() => onToggle(song.id)}
   style={{
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "12px 16px",
    borderRadius: 14,
    background: isPlaying ? `${song.color}18` : "var(--bg-card)",
    border: `1px solid ${isPlaying ? song.color + "55" : "var(--bg-card-border)"}`,
    cursor: "pointer",
    transition: "all 0.25s ease",
    position: "relative",
    overflow: "hidden",
   }}
  >
   {isPlaying && (
    <div
     style={{
      position: "absolute",
      inset: 0,
      background: `radial-gradient(ellipse at left, ${song.color}18 0%, transparent 70%)`,
      pointerEvents: "none",
     }}
    />
   )}

   {/* Play/Pause button */}
   <div
    style={{
     width: 38,
     height: 38,
     borderRadius: "50%",
     backgroundColor: isPlaying ? song.color : "var(--bg-card)",
     border: `1px solid ${isPlaying ? song.color : "var(--bg-card-border)"}`,
     display: "flex",
     alignItems: "center",
     justifyContent: "center",
     flexShrink: 0,
     transition: "all 0.25s ease",
    }}
   >
    {isPlaying
     ? <Pause size={16} color="#fff" />
     : <Play size={16} color={song.color} />
    }
   </div>

   {/* Info */}
   <div style={{ flex: 1, minWidth: 0 }}>
    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'MyCustomFont', sans-serif" }}>
     {song.title}
    </p>
    <p style={{ margin: 0, fontSize: 12, color: isPlaying ? song.color : "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "color 0.25s ease", fontFamily: "'MyCustomFont', sans-serif" }}>
     {song.artist}
    </p>
   </div>

   {/* Equalizer bars */}
   {isPlaying && (
    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 20 }}>
     {[1, 2, 3].map((i) => (
      <motion.div
       key={i}
       animate={{ height: ["4px", "16px", "8px", "20px", "4px"] }}
       transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
       style={{ width: 3, borderRadius: 2, backgroundColor: song.color }}
      />
     ))}
    </div>
   )}
  </div>
 );
}

// ─── SPOTIFY EMBED ───
function SpotifyEmbed({ trackId, color }) {
 return (
  <motion.div
   initial={{ opacity: 0, scale: 0.97 }}
   animate={{ opacity: 1, scale: 1 }}
   exit={{ opacity: 0, scale: 0.97 }}
   transition={{ duration: 0.4 }}
   style={{
    borderRadius: 14,
    overflow: "hidden",
    border: `1px solid ${color}44`,
    boxShadow: `0 4px 30px ${color}22`,
   }}
  >
   <iframe
    src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
    width="100%"
    height="80"
    frameBorder="0"
    allowFullScreen=""
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
    style={{ display: "block" }}
   />
  </motion.div>
 );
}

// ─── MAIN COMPONENT ───
export default function AboutHome() {
 const [activeSong, setActiveSong] = useState(null);
 const toggleSong = (id) => setActiveSong((p) => (p === id ? null : id));
 const activeSongData = SONGS.find((s) => s.id === activeSong);

 return (
  <section
   id="section-about"
   className="section-uniform"
   style={{
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-primary)",
    padding: "100px 24px 80px",
    boxSizing: "border-box",
   }}
  >
   <div style={{ maxWidth: 1100, margin: "0 auto" }}>

    {/* Label */}
    <p
     data-gsap="fade-up"
     style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12, fontFamily: "'MyCustomFont', sans-serif" }}
    >
     about me
    </p>

    {/* ── Heading ── */}
    <div style={{ position: "relative", marginBottom: 60 }}>
     <h2
      data-gsap="heading"
      style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, margin: 0, fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)", position: "relative", zIndex: 1 }}
     >
      I'm Ayush —{" "}
      <span style={{ color: "var(--accent)" }}>Full Stack Developer</span>
      <br />based in India.
     </h2>
    </div>

    <div
     style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
      gap: 40,
     }}
    >
     {/* LEFT COL */}
     <div data-gsap="stagger" style={{ display: "flex", flexDirection: "column", gap: 32 }}>

      {/* Bio */}
      <div
       className="portfolio-card"
       style={{ borderRadius: 20, padding: "28px" }}
      >
       <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-secondary)", margin: "0 0 16px", fontFamily: "'MyCustomFont', sans-serif" }}>
        Hey! I'm a passionate Full Stack Developer who loves turning ideas into
        beautiful, fast, and functional digital experiences. I specialize in
        React, Next.js, and Node.js — with a keen eye for design and performance.
        When I'm not coding, you'll find me gaming, exploring new music, or
        obsessing over my latest side project.
       </p>
       <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-secondary)", margin: 0, fontFamily: "'MyCustomFont', sans-serif" }}>
        I believe great software is a blend of clean code and thoughtful design.
        Currently open to exciting opportunities and collaborations.
       </p>
      </div>

      {/* Hobbies */}
      <div>
       <p style={{ fontSize: 12, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 14, fontFamily: "'MyCustomFont', sans-serif" }}>
        When I'm not coding
       </p>
       <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {HOBBIES.map(({ icon, label }) => (
         <div
          key={label}
          className="portfolio-card"
          style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: 40, padding: "8px 16px", fontSize: 13, color: "var(--text-secondary)", fontFamily: "'MyCustomFont', sans-serif" }}
         >
          {icon} {label}
         </div>
        ))}
       </div>
      </div>

      {/* Skills */}
      <div>
       <p style={{ fontSize: 12, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 14, fontFamily: "'MyCustomFont', sans-serif" }}>
        Tech I work with
       </p>
       <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {SKILLS.map((skill) => (
         <span
          key={skill}
          style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-border)", borderRadius: 6, padding: "4px 12px", fontSize: 12, color: "var(--accent)", fontFamily: "'MyCustomFont', sans-serif", letterSpacing: "0.03em" }}
         >
          {skill}
         </span>
        ))}
       </div>
      </div>
     </div>

     {/* RIGHT COL — Songs */}
     <div data-gsap="slide-right" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Songs header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
       <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #1db954, #158a3e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Music2 size={18} color="#fff" />
       </div>
       <div>
        <p style={{ margin: 0, fontSize: 16, fontWeight: 700, fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)" }}>Currently Vibing To</p>
        <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif" }}>My favourite tracks — click to play</p>
       </div>
      </div>

      {/* Song list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
       {SONGS.map((song) => (
        <SongCard key={song.id} song={song} isPlaying={activeSong === song.id} onToggle={toggleSong} />
       ))}
      </div>

      {/* Spotify embed */}
      {activeSongData && (
       <SpotifyEmbed trackId={activeSongData.spotifyId} color={activeSongData.color} />
      )}
     </div>
    </div>
   </div>
  </section>
 );
}
