"use client";

import { ArrowRight, Calendar, MapPin } from "lucide-react";

const EXPERIENCE = [
 {
  id: 1, role: "Full Stack Developer Intern", company: "TechNova Solutions", location: "Remote",
  period: "Jun 2024 – Present", type: "Internship", accent: "#ff4d00",
  points: [
   "Built and shipped 3 production features in Next.js, reducing page load time by 40%.",
   "Designed and integrated RESTful APIs using Node.js and PostgreSQL.",
   "Collaborated with design team to implement pixel-perfect Figma components.",
   "Improved CI/CD pipeline setup using GitHub Actions.",
  ],
 },
 {
  id: 2, role: "Frontend Developer", company: "Freelance", location: "India",
  period: "Jan 2024 – Jun 2024", type: "Freelance", accent: "#7c3aed",
  points: [
   "Delivered 5+ responsive websites for clients across e-commerce and portfolio niches.",
   "Implemented custom animations using Framer Motion and GSAP.",
   "Maintained direct client communication and handled feedback iterations.",
  ],
 },
 {
  id: 3, role: "Open Source Contributor", company: "Various OSS Projects", location: "Remote",
  period: "2023 – Present", type: "Voluntary", accent: "#10b981",
  points: [
   "Contributed UI improvements and bug fixes to 4+ open source repositories.",
   "Reviewed pull requests and participated in community discussions.",
  ],
 },
];

function ExperienceCard({ exp, index }) {
 return (
  <div data-gsap="fade-up" style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
   {/* Timeline dot + line */}
   <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
    <div style={{ width: 14, height: 14, borderRadius: "50%", background: exp.accent, boxShadow: `0 0 16px ${exp.accent}88`, marginTop: 6, flexShrink: 0 }} />
    {index < EXPERIENCE.length - 1 && (
     <div style={{ width: 1, flex: 1, minHeight: 40, background: "var(--bg-card-border)", margin: "8px 0" }} />
    )}
   </div>

   {/* Card */}
   <div
    className="portfolio-card"
    style={{ flex: 1, borderRadius: 18, padding: "24px 26px", position: "relative", overflow: "hidden" }}
   >
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: exp.accent, borderRadius: "18px 0 0 18px" }} />
    <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: exp.accent, background: `${exp.accent}18`, border: `1px solid ${exp.accent}33`, borderRadius: 20, padding: "3px 10px", fontFamily: "'MyCustomFont', sans-serif" }}>
     {exp.type}
    </span>
    <h3 style={{ margin: "10px 0 4px", fontSize: "clamp(1.05rem, 2vw, 1.25rem)", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'MyCustomFont', sans-serif" }}>
     {exp.role}
    </h3>
    <p style={{ margin: "0 0 12px", fontSize: 14, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif" }}>{exp.company}</p>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
     <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif" }}>
      <Calendar size={12} /> {exp.period}
     </span>
     <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif" }}>
      <MapPin size={12} /> {exp.location}
     </span>
    </div>
    <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
     {exp.points.map((point, i) => (
      <li key={i} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)", fontFamily: "'MyCustomFont', sans-serif" }}>
       <ArrowRight size={14} color={exp.accent} style={{ flexShrink: 0, marginTop: 3 }} />
       {point}
      </li>
     ))}
    </ul>
   </div>
  </div>
 );
}

export default function Experience() {
 return (
  <section id="section-experience" className="section-uniform"
   style={{ width: "100%", minHeight: "100vh", color: "var(--text-primary)", padding: "100px 24px 80px", boxSizing: "border-box" }}
  >
   <div style={{ maxWidth: 800, margin: "0 auto" }}>
    <p data-gsap="fade-up"
     style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12, fontFamily: "'MyCustomFont', sans-serif" }}
    >
     career
    </p>
    <h2 data-gsap="heading"
     style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 60px 0", fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)" }}
    >
     Work <span style={{ color: "var(--accent)" }}>Experience.</span>
    </h2>
    {EXPERIENCE.map((exp, idx) => (
     <ExperienceCard key={exp.id} exp={exp} index={idx} />
    ))}
   </div>
  </section>
 );
}
