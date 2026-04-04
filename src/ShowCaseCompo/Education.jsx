"use client";

import { GraduationCap, Award, Calendar } from "lucide-react";

const EDUCATION = [
 {
  id: 1,
  degree: "Bachelor of Technology",
  field: "Computer Science & Engineering",
  institution: "XYZ University",
  location: "India",
  period: "2022 – 2026",
  grade: "CGPA: 8.5 / 10",
  highlights: [
   "Core subjects: DSA, DBMS, OS, Computer Networks, Software Engineering",
   "Active member of the college coding club and tech fest organizer",
   "Led a team of 4 to build a college event management system",
  ],
  accent: "#ff4d00",
 },
 {
  id: 2,
  degree: "Higher Secondary (Class XII)",
  field: "Science — Physics, Chemistry, Mathematics",
  institution: "ABC Senior Secondary School",
  location: "India",
  period: "2020 – 2022",
  grade: "Percentage: 88%",
  highlights: [
   "Scored 95% in Mathematics and 90% in Computer Science",
   "Participated in district-level science olympiad",
  ],
  accent: "#7c3aed",
 },
];

const CERTIFICATIONS = [
 { title: "Meta Frontend Developer", issuer: "Coursera", year: "2024", accent: "#06b6d4" },
 { title: "Node.js: The Complete Guide", issuer: "Udemy", year: "2024", accent: "#10b981" },
 { title: "MongoDB Basics", issuer: "MongoDB University", year: "2023", accent: "#f59e0b" },
];

export default function Education() {
 return (
  <section id="section-education" className="section-uniform"
   style={{ width: "100%", minHeight: "100vh", color: "var(--text-primary)", padding: "100px 24px 80px", boxSizing: "border-box" }}
  >
   <div style={{ maxWidth: 900, margin: "0 auto" }}>

    <p data-gsap="fade-up"
     style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12, fontFamily: "'MyCustomFont', sans-serif" }}
    >
     background
    </p>

    <h2 data-gsap="heading"
     style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 60px 0", fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)" }}
    >
     Education & <span style={{ color: "var(--accent)" }}>Learning.</span>
    </h2>

    {/* Education cards */}
    <div data-gsap="stagger" style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 60 }}>
     {EDUCATION.map((edu) => (
      <div
       key={edu.id}
       className="portfolio-card"
       style={{ borderRadius: 20, padding: "28px 30px", position: "relative", overflow: "hidden" }}
      >
       <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${edu.accent}, transparent)` }} />

       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
         <div style={{ width: 44, height: 44, borderRadius: 12, background: `${edu.accent}20`, border: `1px solid ${edu.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <GraduationCap size={20} color={edu.accent} />
         </div>
         <div>
          <h3 style={{ margin: "0 0 4px", fontSize: "clamp(1.05rem, 2vw, 1.2rem)", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'MyCustomFont', sans-serif" }}>{edu.degree}</h3>
          <p style={{ margin: "0 0 2px", fontSize: 14, color: edu.accent, fontFamily: "'MyCustomFont', sans-serif" }}>{edu.field}</p>
          <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif" }}>{edu.institution} • {edu.location}</p>
         </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
         <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif" }}>
          <Calendar size={12} /> {edu.period}
         </span>
         <span style={{ fontSize: 12, color: edu.accent, background: `${edu.accent}18`, border: `1px solid ${edu.accent}33`, borderRadius: 20, padding: "2px 10px", fontFamily: "'MyCustomFont', sans-serif" }}>
          {edu.grade}
         </span>
        </div>
       </div>

       {edu.highlights && (
        <ul style={{ margin: "20px 0 0", paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
         {edu.highlights.map((h, i) => (
          <li key={i} style={{ display: "flex", gap: 10, fontSize: 13, lineHeight: 1.7, color: "var(--text-secondary)", fontFamily: "'MyCustomFont', sans-serif" }}>
           <span style={{ color: edu.accent, flexShrink: 0 }}>—</span>{h}
          </li>
         ))}
        </ul>
       )}
      </div>
     ))}
    </div>

    {/* Certifications */}
    <div data-gsap="fade-up">
     <p style={{ fontSize: 12, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 20, fontFamily: "'MyCustomFont', sans-serif" }}>
      Certifications
     </p>
     <div data-gsap="stagger" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: 14 }}>
      {CERTIFICATIONS.map((cert) => (
       <div key={cert.title} className="portfolio-card" style={{ borderRadius: 14, padding: "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
        <Award size={18} color={cert.accent} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
         <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", fontFamily: "'MyCustomFont', sans-serif" }}>{cert.title}</p>
         <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif" }}>{cert.issuer} · {cert.year}</p>
        </div>
       </div>
      ))}
     </div>
    </div>
   </div>
  </section>
 );
}
