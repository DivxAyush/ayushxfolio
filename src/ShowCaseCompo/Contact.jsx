"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Box, Typography, Stack, Divider, Tooltip } from "@mui/material";
import {
 Send, Github, Linkedin, Twitter, Mail, MapPin, ArrowUpRight, CheckCircle, AlertCircle, Loader2, Clock, MessageSquare, ArrowUp
} from "lucide-react";

const EMAILJS_SERVICE_ID = "service_q6akw49";   // ← replace
const EMAILJS_TEMPLATE_ID = "template_s2q7n6k";  // ← replace
const EMAILJS_PUBLIC_KEY = "FpXDFha2bT9ruwwb0";   // ← replace



const SOCIALS = [
 { icon: <Github size={16} />, label: "GitHub", href: "https://github.com/DivxAyush", color: "#e4e4e4" },
 { icon: <Linkedin size={16} />, label: "LinkedIn", href: "https://linkedin.com", color: "#0a66c2" },
 { icon: <Twitter size={16} />, label: "Twitter / X", href: "https://twitter.com", color: "#1d9bf0" },
 { icon: <Mail size={16} />, label: "Email", href: "mailto:ayush@example.com", color: "#ff4d00" },
];

// ── Status-based views ──
const STATUS = { IDLE: "idle", SENDING: "sending", SUCCESS: "success", ERROR: "error" };

// ── Animated floating label input ──
function FloatingInput({ name, label, type = "text", placeholder, value, onChange, textarea = false, required = true }) {
 const [focused, setFocused] = useState(false);
 const isActive = focused || value.length > 0;

 const sharedStyle = {
  width: "100%",
  background: focused
   ? "rgba(255,77,0,0.04)"
   : "var(--bg-card)",
  border: `1.5px solid ${focused ? "var(--accent)" : "var(--bg-card-border)"}`,
  borderRadius: 14,
  padding: textarea ? "28px 16px 14px" : "26px 16px 10px",
  fontSize: 14,
  color: "var(--text-primary)",
  outline: "none",
  fontFamily: "'MyCustomFont', sans-serif",
  transition: "all 0.22s ease",
  boxSizing: "border-box",
  resize: "none",
  lineHeight: 1.6,
 };

 return (
  <div style={{ position: "relative", width: "100%" }}>
   {/* Floating label */}
   <label
    style={{
     position: "absolute",
     left: 16,
     top: isActive ? 8 : (textarea ? 18 : "50%"),
     transform: isActive ? "none" : (textarea ? "none" : "translateY(-50%)"),
     fontSize: isActive ? 10 : 14,
     color: isActive ? "var(--accent)" : "var(--text-muted)",
     letterSpacing: isActive ? "0.1em" : "0",
     textTransform: isActive ? "uppercase" : "none",
     fontFamily: "'MyCustomFont', sans-serif",
     transition: "all 0.22s ease",
     pointerEvents: "none",
     zIndex: 1,
    }}
   >
    {label}
   </label>

   {textarea ? (
    <textarea
     name={name}
     required={required}
     rows={5}
     placeholder={focused ? placeholder : ""}
     value={value}
     onChange={onChange}
     onFocus={() => setFocused(true)}
     onBlur={() => setFocused(false)}
     style={sharedStyle}
    />
   ) : (
    <input
     type={type}
     name={name}
     required={required}
     placeholder={focused ? placeholder : ""}
     value={value}
     onChange={onChange}
     onFocus={() => setFocused(true)}
     onBlur={() => setFocused(false)}
     style={sharedStyle}
    />
   )}
  </div>
 );
}

// ── Contact info strip ──
function InfoRow({ icon, children }) {
 return (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
   <div style={{
    width: 40, height: 40,
    borderRadius: 11,
    background: "var(--accent-soft)",
    border: "1px solid var(--accent-border)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
   }}>
    {icon}
   </div>
   {children}
  </div>
 );
}

// ── Main component ──
export default function Contact() {
 const formRef = useRef(null);
 const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
 const [submittedName, setSubmittedName] = useState("");
 const [status, setStatus] = useState(STATUS.IDLE);
 const [error, setError] = useState("");

 const handleChange = (e) =>
  setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

 const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus(STATUS.SENDING);
  setError("");

  // ── Validation ──
  if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
   setStatus(STATUS.ERROR);
   setError("Please fill in all required fields.");
   return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
   setStatus(STATUS.ERROR);
   setError("Please enter a valid email address.");
   return;
  }

  try {
   await emailjs.sendForm(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    formRef.current,
    EMAILJS_PUBLIC_KEY
   );
   setSubmittedName(form.name.trim());
   setStatus(STATUS.SUCCESS);
   setForm({ name: "", email: "", subject: "", message: "" });
  } catch (err) {
   console.error("EmailJS error:", err);
   setStatus(STATUS.ERROR);
   setError("Failed to send message. Please try again or email me directly.");
  }
 };

 const resetForm = () => {
  setStatus(STATUS.IDLE);
  setError("");
  setSubmittedName("");
  setForm({ name: "", email: "", subject: "", message: "" });
 };

 return (
  <section
   id="section-contact"
   className="section-uniform"
   style={{
    width: "100%",
    minHeight: "100vh",
    color: "var(--text-primary)",
    padding: "100px 24px 80px",
    boxSizing: "border-box",
   }}
  >
   <div style={{ maxWidth: 1050, margin: "0 auto" }}>

    {/* Label */}
    <p
     data-gsap="fade-up"
     style={{ fontSize: 12, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 12, fontFamily: "'MyCustomFont', sans-serif" }}
    >
     get in touch
    </p>

    {/* Heading */}
    <h2
     data-gsap="heading"
     style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 60px 0", fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)" }}
    >
     Let's build something{" "}
     <span style={{ color: "var(--accent)" }}>together.</span>
    </h2>

    {/* ── Grid ── */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 40 }}>

     {/* LEFT — Info */}
     <div data-gsap="stagger" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Intro card */}
      <div className="portfolio-card" style={{ borderRadius: 18, padding: "24px 26px" }}>
       <p style={{ fontSize: 15, lineHeight: 1.85, color: "var(--text-secondary)", margin: 0, fontFamily: "'MyCustomFont', sans-serif" }}>
        I'm currently open to new opportunities, freelance projects, and interesting collaborations.
        Whether you have a question or just want to say hi — my inbox is always open!
       </p>
      </div>

      {/* Contact details */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
       <InfoRow icon={<Mail size={16} color="var(--accent)" />}>
        <a
         href="mailto:ayushkumar@example.com"
         style={{ fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", fontFamily: "'MyCustomFont', sans-serif", transition: "color 0.2s" }}
         onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
         onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
         ayushkumar@example.com
        </a>
       </InfoRow>

       <InfoRow icon={<MapPin size={16} color="var(--accent)" />}>
        <span style={{ fontSize: 14, color: "var(--text-secondary)", fontFamily: "'MyCustomFont', sans-serif" }}>
         India 🇮🇳 — Available for remote work
        </span>
       </InfoRow>

       <InfoRow icon={<Clock size={16} color="var(--accent)" />}>
        <span style={{ fontSize: 14, color: "var(--text-secondary)", fontFamily: "'MyCustomFont', sans-serif" }}>
         Usually replies within 24 hours
        </span>
       </InfoRow>
      </div>

      {/* Socials */}
      <div>
       <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: 14, fontFamily: "'MyCustomFont', sans-serif" }}>
        Find me on
       </p>
       <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {SOCIALS.map(({ icon, label, href, color }) => (
         <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-card"
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 40, color: "var(--text-secondary)", textDecoration: "none", fontSize: 13, fontFamily: "'MyCustomFont', sans-serif", transition: "all 0.25s ease" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bg-card-border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
         >
          {icon} {label} <ArrowUpRight size={12} />
         </a>
        ))}
       </div>
      </div>

      {/* Availability badge */}
      <motion.div
       animate={{ opacity: [0.7, 1, 0.7] }}
       transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
       style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(16,185,129,0.08)",
        border: "1px solid rgba(16,185,129,0.3)",
        borderRadius: 40,
        padding: "10px 18px",
        width: "fit-content",
       }}
      >
       <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
       <span style={{ fontSize: 13, color: "#10b981", fontFamily: "'MyCustomFont', sans-serif" }}>
        Available for new projects
       </span>
      </motion.div>
     </div>

     {/* RIGHT — Form */}
     <div data-gsap="slide-right">
      <AnimatePresence mode="wait">

       {/* ── SUCCESS STATE ── */}
       {status === STATUS.SUCCESS && (
        <motion.div
         key="success"
         initial={{ opacity: 0, scale: 0.9, y: 20 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.9 }}
         transition={{ duration: 0.4, ease: "easeOut" }}
         style={{
          height: "100%",
          minHeight: 340,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "rgba(16,185,129,0.05)",
          border: "1.5px solid rgba(16,185,129,0.25)",
          borderRadius: 20,
          padding: "48px 32px",
          textAlign: "center",
         }}
        >
         <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
         >
          <CheckCircle size={58} color="#10b981" strokeWidth={1.5} />
         </motion.div>

         <div>
          <h3 style={{ margin: "0 0 8px", fontSize: "1.5rem", fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)" }}>
           Message sent! 🎉
          </h3>
          <p style={{ margin: 0, color: "var(--text-secondary)", fontFamily: "'MyCustomFont', sans-serif", fontSize: 14, lineHeight: 1.7 }}>
           Thanks for reaching out, <strong style={{ color: "var(--text-primary)" }}>{submittedName || "friend"}</strong>!<br />
           I'll get back to you within 24 hours.
          </p>
         </div>

         <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={resetForm}
          style={{
           marginTop: 8,
           padding: "11px 28px",
           borderRadius: 40,
           border: "1.5px solid rgba(16,185,129,0.4)",
           background: "transparent",
           color: "#10b981",
           fontSize: 13,
           cursor: "pointer",
           fontFamily: "'MyCustomFont', sans-serif",
           transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(16,185,129,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
         >
          Send another message
         </motion.button>
        </motion.div>
       )}

       {/* ── FORM STATE (idle / sending / error) ── */}
       {status !== STATUS.SUCCESS && (
        <motion.form
         key="form"
         ref={formRef}
         onSubmit={handleSubmit}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="portfolio-card"
         style={{
          borderRadius: 20,
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
         }}
        >
         {/* Header */}
         <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <MessageSquare size={18} color="var(--accent)" />
          <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "'MyCustomFont', sans-serif", color: "var(--text-primary)" }}>
           Send a Message
          </span>
         </div>

         {/* Error banner */}
         <AnimatePresence>
          {status === STATUS.ERROR && (
           <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            style={{
             display: "flex",
             alignItems: "center",
             gap: 10,
             padding: "12px 14px",
             borderRadius: 10,
             background: "rgba(239,68,68,0.08)",
             border: "1px solid rgba(239,68,68,0.3)",
             overflow: "hidden",
            }}
           >
            <AlertCircle size={16} color="#ef4444" />
            <span style={{ fontSize: 13, color: "#ef4444", fontFamily: "'MyCustomFont', sans-serif" }}>
             {error}
            </span>
           </motion.div>
          )}
         </AnimatePresence>

         {/* Fields */}
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <FloatingInput
           name="from_name"
           label="Your Name *"
           placeholder="John Doe"
           value={form.name}
           onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
          <FloatingInput
           name="from_email"
           label="Email *"
           type="email"
           placeholder="john@example.com"
           value={form.email}
           onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
          />
         </div>

         <FloatingInput
          name="subject"
          label="Subject"
          placeholder="Project idea / Collaboration"
          value={form.subject}
          onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
          required={false}
         />

         <FloatingInput
          name="message"
          label="Message *"
          placeholder="Tell me about your project, idea, or just say hi..."
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          textarea
         />

         {/* Submit */}
         <motion.button
          type="submit"
          disabled={status === STATUS.SENDING}
          whileHover={status !== STATUS.SENDING ? { scale: 1.02, boxShadow: "0 8px 30px rgba(255,77,0,0.35)" } : {}}
          whileTap={status !== STATUS.SENDING ? { scale: 0.97 } : {}}
          style={{
           display: "flex",
           alignItems: "center",
           justifyContent: "center",
           gap: 10,
           padding: "16px",
           borderRadius: 14,
           background: status === STATUS.SENDING
            ? "rgba(255,77,0,0.5)"
            : "linear-gradient(135deg, #ff4d00 0%, #ff7b45 100%)",
           border: "none",
           color: "#fff",
           fontSize: 14,
           fontWeight: 600,
           cursor: status === STATUS.SENDING ? "not-allowed" : "pointer",
           fontFamily: "'MyCustomFont', sans-serif",
           transition: "all 0.25s ease",
          }}
         >
          {status === STATUS.SENDING ? (
           <>
            <motion.div
             animate={{ rotate: 360 }}
             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
             <Loader2 size={16} />
            </motion.div>
            Sending…
           </>
          ) : (
           <>
            <Send size={16} />
            Send Message
           </>
          )}
         </motion.button>

         <p style={{ margin: 0, fontSize: 11, color: "var(--text-muted)", textAlign: "center", fontFamily: "'MyCustomFont', sans-serif" }}>
          Your message is sent directly to my inbox. No spam ever.
         </p>
        </motion.form>
       )}
      </AnimatePresence>
     </div>
    </div>

    {/* ── S-Class Modern Footer ── */}
    <Box component="footer" sx={{ mt: { xs: 8, md: 15 }, position: 'relative', overflow: 'hidden' }}>
     <Divider sx={{ borderColor: 'var(--bg-card-border)', mb: { xs: 5, md: 8 } }} />

     <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-end' }} spacing={6}>
      <Box sx={{ width: '100%', maxWidth: '800px' }}>
       <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
       >
        <Typography
         variant="h1"
         sx={{
          fontFamily: "'MyCustomFont', sans-serif",
          fontWeight: 800,
          fontSize: { xs: '3rem', sm: '5.5rem', md: '8.5rem' },
          lineHeight: 0.95,
          color: 'var(--text-primary)',
          letterSpacing: '-0.04em',
          mb: 3,
          textTransform: 'uppercase'
         }}
        >
         LET'S COLLAB.
        </Typography>
       </motion.div>
       
       <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        viewport={{ once: true }}
       >
        <Typography sx={{ color: 'var(--text-secondary)', fontFamily: "'MyCustomFont', sans-serif", fontSize: { xs: '1rem', md: '1.4rem' }, maxWidth: '600px', lineHeight: 1.6 }}>
         Turning caffeine and blank screens into seamless, modern digital experiences.
        </Typography>
       </motion.div>
      </Box>

      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: { xs: 2, sm: 0 } }}>
       {SOCIALS.map((social, idx) => (
        <Tooltip key={social.label} title={social.label} arrow placement="top">
         <motion.a
          href={social.href}
          target="_blank"
          whileHover={{ y: -6, scale: 1.15, color: social.color, borderColor: social.color, boxShadow: `0 10px 25px ${social.color}40` }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + (idx * 0.1) }}
          viewport={{ once: true }}
          style={{
           color: 'var(--text-muted)',
           display: 'flex',
           transition: 'all 0.3s ease',
           padding: '16px',
           background: 'rgba(255,255,255,0.02)',
           borderRadius: '50%',
           border: '1px solid var(--bg-card-border)',
           backdropFilter: 'blur(10px)'
          }}
         >
          {social.icon}
         </motion.a>
        </Tooltip>
       ))}
      </Stack>
     </Stack>

     <Box
      sx={{
       mt: { xs: 6, md: 10 },
       pt: 4,
       pb: 4,
       display: 'flex',
       flexDirection: { xs: 'column-reverse', sm: 'row' },
       justifyContent: 'space-between',
       alignItems: 'center',
       gap: 4,
       borderTop: '1px solid rgba(255,255,255,0.05)'
      }}
     >
      <Typography sx={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontFamily: "'MyCustomFont', sans-serif", textAlign: { xs: 'center', sm: 'left' } }}>
       © {new Date().getFullYear()} Ayush Kumar. Built with Next.js & Framer Motion.<br/>
       <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Optimized with Material-UI</span>
      </Typography>

      <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} style={{ cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
       <Stack direction="row" alignItems="center" spacing={1} sx={{
         px: 3, py: 1.5, 
         borderRadius: '40px', 
         background: 'rgba(255,77,0,0.1)',
         border: '1px solid rgba(255,77,0,0.2)',
         color: 'var(--accent)',
         transition: 'all 0.3s'
       }}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, fontFamily: "'MyCustomFont', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' }}>
         Back To Top
        </Typography>
        <ArrowUp size={16} />
       </Stack>
      </motion.div>
     </Box>
    </Box>
   </div>
  </section>
 );
}
