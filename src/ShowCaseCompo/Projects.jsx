"use client";

import { useState } from "react";
import { Github, ArrowUpRight } from "lucide-react";

const PROJECTS = [
 { id: 1, title: "DevConnect", description: "A real-time developer collaboration platform with live code sharing, video rooms, and GitHub integration. Built for remote engineering teams.", tags: ["Next.js", "Socket.io", "MongoDB", "WebRTC"], github: "https://github.com/DivxAyush", live: "#", accent: "#ff4d00", year: "2024" },
 { id: 2, title: "AuraShop", description: "A premium e-commerce experience with animated product pages, AI-powered recommendations, and seamless Stripe checkout.", tags: ["React", "Node.js", "Stripe", "PostgreSQL"], github: "https://github.com/DivxAyush", live: "#", accent: "#7c3aed", year: "2024" },
 { id: 3, title: "PulseBoard", description: "Real-time analytics dashboard for SaaS products. Visualizes events, funnels, and revenue metrics with animated charts.", tags: ["Next.js", "Recharts", "Prisma", "Redis"], github: "https://github.com/DivxAyush", live: "#", accent: "#10b981", year: "2023" },
 { id: 4, title: "NoteFlow", description: "A minimal, distraction-free note-taking app with rich text editing, tags, and cross-device sync powered by Supabase.", tags: ["React", "Supabase", "TipTap", "TypeScript"], github: "https://github.com/DivxAyush", live: "#", accent: "#ec4899", year: "2023" },
 { id: 5, title: "ClimaViz", description: "An interactive weather visualization app with animated maps, hourly forecasts, and global city search.", tags: ["Next.js", "OpenWeather API", "Mapbox", "Framer Motion"], github: "https://github.com/DivxAyush", live: "#", accent: "#06b6d4", year: "2023" },
 { id: 6, title: "This Portfolio", description: "My personal developer portfolio — built with Next.js, MUI, Framer Motion, GSAP and custom fonts.", tags: ["Next.js", "MUI", "Framer Motion", "GSAP"], github: "https://github.com/DivxAyush/ayushxfolio", live: "#", accent: "#f59e0b", year: "2025" },
];

function ProjectCard({ project }) {
 const [hovered, setHovered] = useState(false);

 return (
  <div
   className="portfolio-card"
   onMouseEnter={() => setHovered(true)}
   onMouseLeave={() => setHovered(false)}
   style={{
    position: "relative",
    background: hovered ? `${project.accent}0d` : "var(--bg-card)",
    border: `1px solid ${hovered ? project.accent + "55" : "var(--bg-card-border)"}`,
    borderRadius: 20,
    padding: "28px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    cursor: "default",
    transition: "all 0.3s ease",
    overflow: "hidden",
   }}
  >
   {/* Top glow line */}
   <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hovered ? `linear-gradient(90deg, transparent, ${project.accent}, transparent)` : "transparent", transition: "all 0.3s ease" }} />

   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
    <div>
     <span style={{ fontSize: 11, color: project.accent, margin: 0, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'MyCustomFont', sans-serif" }}>{project.year}</span>
     <h3 style={{ margin: "6px 0 0", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'MyCustomFont', sans-serif" }}>{project.title}</h3>
    </div>
    <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
     <a href={project.github} target="_blank" rel="noopener noreferrer"
      style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--bg-card)", border: "1px solid var(--bg-card-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", textDecoration: "none", transition: "all 0.2s ease" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.color = project.accent; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bg-card-border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
     >
      <Github size={15} />
     </a>
     <a href={project.live} target="_blank" rel="noopener noreferrer"
      style={{ width: 36, height: 36, borderRadius: "50%", background: hovered ? project.accent : "var(--bg-card)", border: `1px solid ${hovered ? project.accent : "var(--bg-card-border)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: hovered ? "#fff" : "var(--text-muted)", textDecoration: "none", transition: "all 0.3s ease" }}
     >
      <ArrowUpRight size={15} />
     </a>
    </div>
   </div>

   <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)", margin: 0, fontFamily: "'MyCustomFont', sans-serif" }}>{project.description}</p>

   <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
    {project.tags.map((tag) => (
     <span key={tag} style={{ background: `${project.accent}14`, border: `1px solid ${project.accent}33`, borderRadius: 6, padding: "3px 10px", fontSize: 11, color: project.accent, fontFamily: "'MyCustomFont', sans-serif", letterSpacing: "0.03em" }}>{tag}</span>
    ))}
   </div>
  </div>
 );
}

export default function Projects() {
 return (
  <section id="section-projects" className="section-uniform"
   style={{ width: "100%", minHeight: "100vh", color: "var(--text-primary)", padding: "100px 24px 80px", boxSizing: "border-box" }}
  >
   <div style={{ maxWidth: 1100, margin: "0 auto" }}>

    <p data-gsap="fade-up"
     style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12, fontFamily: "'MyCustomFont', sans-serif" }}
    >
     selected work
    </p>

    <h2 data-gsap="heading"
     style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 60px 0", fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)" }}
    >
     Things I've <span style={{ color: "var(--accent)" }}>built.</span>
    </h2>

    <div
     data-gsap="stagger"
     style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))", gap: 20 }}
    >
     {PROJECTS.map((project) => <ProjectCard key={project.id} project={project} />)}
    </div>

    <div data-gsap="fade-up" style={{ textAlign: "center", marginTop: 60 }}>
     <a href="https://github.com/DivxAyush" target="_blank" rel="noopener noreferrer"
      className="portfolio-card"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", borderRadius: 40, color: "var(--text-secondary)", textDecoration: "none", fontSize: 14, fontFamily: "'MyCustomFont', sans-serif", transition: "all 0.25s ease" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bg-card-border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
     >
      <Github size={16} /> See all on GitHub <ArrowUpRight size={14} />
     </a>
    </div>
   </div>
  </section>
 );
}
