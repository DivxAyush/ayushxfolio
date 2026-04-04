"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Mail, MapPin, ArrowUpRight, CheckCircle } from "lucide-react";

const SOCIALS = [
 { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/DivxAyush", color: "#333" },
 { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com", color: "#0a66c2" },
 { icon: <Twitter size={18} />, label: "Twitter / X", href: "https://twitter.com", color: "#1d9bf0" },
 { icon: <Mail size={18} />, label: "Email", href: "mailto:ayush@example.com", color: "#ff4d00" },
];

export default function Contact() {
 const [form, setForm] = useState({ name: "", email: "", message: "" });
 const [submitted, setSubmitted] = useState(false);
 const [focused, setFocused] = useState(null);

 const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

 const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
 };

 const inputStyle = (name) => ({
  width: "100%",
  background: focused === name ? "var(--accent-soft)" : "var(--bg-card)",
  border: `1px solid ${focused === name ? "var(--accent)" : "var(--bg-card-border)"}`,
  borderRadius: 12,
  padding: "14px 16px",
  fontSize: 14,
  color: "var(--text-primary)",
  outline: "none",
  fontFamily: "'MyCustomFont', sans-serif",
  transition: "all 0.2s ease",
  boxSizing: "border-box",
  resize: "none",
 });

 return (
  <section id="section-contact" className="section-uniform"
   style={{ width: "100%", minHeight: "100vh", color: "var(--text-primary)", padding: "100px 24px 80px", boxSizing: "border-box" }}
  >
   <div style={{ maxWidth: 1000, margin: "0 auto" }}>

    <p data-gsap="fade-up"
     style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12, fontFamily: "'MyCustomFont', sans-serif" }}
    >
     get in touch
    </p>

    <h2 data-gsap="heading"
     style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 60px 0", fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)" }}
    >
     Let's build something <span style={{ color: "var(--accent)" }}>together.</span>
    </h2>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 40 }}>

     {/* LEFT — Info */}
     <div data-gsap="stagger" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div className="portfolio-card" style={{ borderRadius: 18, padding: "24px" }}>
       <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", margin: 0, fontFamily: "'MyCustomFont', sans-serif" }}>
        I'm currently open to new opportunities, freelance projects, and interesting collaborations.
        Whether you have a question or just want to say hi — my inbox is always open!
       </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
       {[
        { icon: <Mail size={16} color="var(--accent)" />, content: <a href="mailto:ayush@example.com" style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", fontFamily: "'MyCustomFont', sans-serif", transition: "color 0.2s ease" }} onMouseEnter={(e) => e.currentTarget.style.color="var(--accent)"} onMouseLeave={(e) => e.currentTarget.style.color="var(--text-secondary)"}>ayush@example.com</a> },
        { icon: <MapPin size={16} color="var(--accent)" />, content: <span style={{ fontSize: 14, color: "var(--text-secondary)", fontFamily: "'MyCustomFont', sans-serif" }}>India 🇮🇳 — Available for remote work</span> },
       ].map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
         <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--accent-soft)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {item.icon}
         </div>
         {item.content}
        </div>
       ))}
      </div>

      <div>
       <p style={{ fontSize: 12, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 14, fontFamily: "'MyCustomFont', sans-serif" }}>Find me on</p>
       <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {SOCIALS.map(({ icon, label, href, color }) => (
         <a key={label} href={href} target="_blank" rel="noopener noreferrer"
          className="portfolio-card"
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 40, color: "var(--text-secondary)", textDecoration: "none", fontSize: 13, fontFamily: "'MyCustomFont', sans-serif", transition: "all 0.25s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bg-card-border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
         >
          {icon} {label} <ArrowUpRight size={13} />
         </a>
        ))}
       </div>
      </div>
     </div>

     {/* RIGHT — Form */}
     <div data-gsap="slide-right">
      {submitted ? (
       <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ height: "100%", minHeight: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 20, padding: "40px", textAlign: "center" }}
       >
        <CheckCircle size={48} color="#10b981" />
        <h3 style={{ margin: 0, fontSize: "1.4rem", fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)" }}>Message sent!</h3>
        <p style={{ margin: 0, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif", fontSize: 14 }}>Thanks for reaching out. I'll get back to you soon.</p>
        <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
         style={{ marginTop: 8, padding: "10px 24px", borderRadius: 40, border: "1px solid rgba(16,185,129,0.4)", background: "transparent", color: "#10b981", fontSize: 13, cursor: "pointer", fontFamily: "'MyCustomFont', sans-serif" }}
        >
         Send another
        </button>
       </motion.div>
      ) : (
       <form onSubmit={handleSubmit}
        className="portfolio-card"
        style={{ borderRadius: 20, padding: "30px", display: "flex", flexDirection: "column", gap: 16 }}
       >
        {[
         { name: "name", label: "Your Name", type: "text", placeholder: "John Doe" },
         { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com" },
        ].map(({ name, label, type, placeholder }) => (
         <div key={name}>
          <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontFamily: "'MyCustomFont', sans-serif", letterSpacing: "0.05em" }}>{label}</label>
          <input type={type} name={name} required placeholder={placeholder} value={form[name]} onChange={handleChange}
           onFocus={() => setFocused(name)} onBlur={() => setFocused(null)} style={inputStyle(name)} />
         </div>
        ))}
        <div>
         <label style={{ display: "block", fontSize: 12, color: "var(--text-muted)", marginBottom: 6, fontFamily: "'MyCustomFont', sans-serif", letterSpacing: "0.05em" }}>Message</label>
         <textarea name="message" required rows={5} placeholder="Tell me about your project..." value={form.message} onChange={handleChange}
          onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} style={inputStyle("message")} />
        </div>
        <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
         style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px", borderRadius: 12, background: "linear-gradient(135deg, var(--accent), #ff7b45)", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'MyCustomFont', sans-serif" }}
        >
         <Send size={16} /> Send Message
        </motion.button>
       </form>
      )}
     </div>
    </div>

    {/* Footer */}
    <div data-gsap="fade-up" style={{ marginTop: 80, paddingTop: 30, borderTop: "1px solid var(--bg-card-border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
     <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif" }}>© 2025 Ayush Kumar. Built with Next.js & ❤️</p>
     <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", fontFamily: "'MyCustomFont', sans-serif" }}>Designed & Developed by Ayush</p>
    </div>
   </div>
  </section>
 );
}
