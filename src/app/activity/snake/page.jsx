"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useAppTheme } from "../../context/ThemeContext";
import BackButton from "../../CommonCompo/BackButton";
import { RotateCcw, Trophy, Zap } from "lucide-react";

const COLS = 22, ROWS = 18;
const BASE_MS = 155, MIN_MS = 60;

function lerp(a, b, t) { return a + (b - a) * t; }
function rnd(n) { return Math.floor(Math.random() * n); }
function randomFood(snake) {
 const used = new Set(snake.map(s => `${s.x},${s.y}`));
 let p;
 do { p = { x: rnd(COLS), y: rnd(ROWS) }; } while (used.has(`${p.x},${p.y}`));
 return p;
}
function spawnP(cx, cy) {
 return Array.from({ length: 12 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 12, spd = 1.8 + Math.random() * 2.4;
  return { x: cx, y: cy, vx: Math.cos(a) * spd, vy: Math.sin(a) * spd, life: 1 };
 });
}
function fresh(hi = 0) {
 const s = [{ x: 11, y: 9 }, { x: 10, y: 9 }, { x: 9, y: 9 }];
 return { snake: s, prev: [{ x: 10, y: 9 }, { x: 9, y: 9 }, { x: 8, y: 9 }], dir: { x: 1, y: 0 }, next: { x: 1, y: 0 }, food: randomFood(s), score: 0, hi, ms: BASE_MS, alive: true, lastTick: null, prog: 0, parts: [], pulse: 0 };
}
function tick(g) {
 g.prev = g.snake.map(s => ({ ...s }));
 g.dir = { ...g.next };
 const h = g.snake[0], nx = h.x + g.dir.x, ny = h.y + g.dir.y;
 if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS || g.snake.some(s => s.x === nx && s.y === ny)) { g.alive = false; return; }
 const ate = nx === g.food.x && ny === g.food.y;
 const nh = { x: nx, y: ny };
 if (ate) {
  g.snake = [nh, ...g.snake]; g.prev = [{ ...h }, ...g.prev];
  g.score += 10 + Math.floor(g.snake.length / 3);
  if (g.score > g.hi) g.hi = g.score;
  g.food = randomFood(g.snake); g.ms = Math.max(MIN_MS, g.ms - 4);
  g.parts.push(...spawnP(0, 0)); // positions set in draw using food cell
  g._ateFood = { x: nx, y: ny };
 } else {
  g.snake = [nh, ...g.snake.slice(0, -1)];
  g.prev = [{ ...h }, ...g.prev.slice(0, -1)];
 }
}

const KMAP = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, w: { x: 0, y: -1 }, s: { x: 0, y: 1 }, a: { x: -1, y: 0 }, d: { x: 1, y: 0 }, W: { x: 0, y: -1 }, S: { x: 0, y: 1 }, A: { x: -1, y: 0 }, D: { x: 1, y: 0 } };

export default function SnakePage() {
 const { mode } = useAppTheme();
 const isDark = mode === "dark";
 const canvasRef = useRef(null);
 const containerRef = useRef(null);
 const gameRef = useRef(null);
 const rafRef = useRef(null);
 const cellRef = useRef(20);
 const statusRef = useRef("idle");
 const touchRef = useRef({ x: null, y: null });

 const [status, setStatus] = useState("idle");
 const [uiScore, setUiScore] = useState(0);
 const [uiHi, setUiHi] = useState(0);
 const [uiLv, setUiLv] = useState(1);

 function setSt(s) { statusRef.current = s; setStatus(s); }

 const getHi = () => { try { return Number(localStorage.getItem("snakeHi")) || 0; } catch { return 0; } };
 const saveHi = (v) => { try { localStorage.setItem("snakeHi", String(v)); } catch {} };

 const startGame = useCallback(() => {
  const hi = Math.max(getHi(), gameRef.current?.hi ?? 0);
  gameRef.current = fresh(hi); setUiScore(0); setUiLv(1); setUiHi(hi); setSt("playing");
 }, []);

 const loop = useCallback((ts) => {
  const g = gameRef.current; const canvas = canvasRef.current;
  if (!canvas || !g) { rafRef.current = requestAnimationFrame(loop); return; }
  const ctx = canvas.getContext("2d");
  const CELL = cellRef.current;
  const CW = COLS * CELL, CH = ROWS * CELL;

  if (statusRef.current === "playing") {
   if (!g.lastTick) g.lastTick = ts;
   if (ts - g.lastTick >= g.ms) {
    if (g._ateFood) {
     const fx = (g._ateFood.x + 0.5) * CELL, fy = (g._ateFood.y + 0.5) * CELL;
     g.parts = spawnP(fx, fy); g._ateFood = null;
    }
    tick(g); g.lastTick = ts;
    if (!g.alive) { saveHi(g.hi); setUiHi(g.hi); setSt("dead"); }
    else { setUiScore(g.score); setUiLv(Math.round((BASE_MS - g.ms) / 4) + 1); }
   }
   g.prog = Math.min(1, (ts - g.lastTick) / g.ms);
  }

  // Draw BG
  ctx.fillStyle = isDark ? "#070910" : "#eef2ff";
  ctx.fillRect(0, 0, CW, CH);
  // Dots
  ctx.fillStyle = isDark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.05)";
  for (let x = 0; x < COLS; x++) for (let y = 0; y < ROWS; y++) { ctx.beginPath(); ctx.arc((x + 0.5) * CELL, (y + 0.5) * CELL, 1, 0, Math.PI * 2); ctx.fill(); }

  // Particles
  g.parts = g.parts.filter(p => p.life > 0);
  g.parts.forEach(p => {
   p.x += p.vx; p.y += p.vy; p.vx *= 0.9; p.vy *= 0.9; p.life -= 0.04;
   ctx.save(); ctx.globalAlpha = Math.max(0, p.life);
   ctx.shadowBlur = 6; ctx.shadowColor = "#ff4d00";
   ctx.fillStyle = "#ff4d00"; ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, 3 * p.life), 0, Math.PI * 2); ctx.fill();
   ctx.restore();
  });

  // Food
  g.pulse = (g.pulse || 0) + 0.08;
  const ps = Math.sin(g.pulse), fx = (g.food.x + 0.5) * CELL, fy = (g.food.y + 0.5) * CELL, fr = CELL * 0.36 + ps * 2;
  ctx.save(); ctx.shadowBlur = 18 + ps * 8; ctx.shadowColor = "#ff4d00";
  const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, fr);
  fg.addColorStop(0, "#ffb347"); fg.addColorStop(0.5, "#ff4d00"); fg.addColorStop(1, "#c0390066");
  ctx.fillStyle = fg; ctx.beginPath(); ctx.arc(fx, fy, fr, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.4)"; ctx.lineWidth = 1.2;
  const sl = fr * 0.5;
  ctx.beginPath(); ctx.moveTo(fx, fy - sl); ctx.lineTo(fx, fy + sl); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(fx - sl, fy); ctx.lineTo(fx + sl, fy); ctx.stroke();
  ctx.restore();

  // Snake
  const len = g.snake.length;
  for (let i = len - 1; i >= 0; i--) {
   const cur = g.snake[i], prv = g.prev[i] ?? cur;
   const vx = lerp(prv.x, cur.x, g.prog), vy = lerp(prv.y, cur.y, g.prog);
   const isH = i === 0, t = i / Math.max(len - 1, 1), pad = isH ? 2 : 3, sz = CELL - pad * 2;
   const px = vx * CELL + pad, py = vy * CELL + pad;
   const rC = Math.round(lerp(0x4a, 0x12, t)), gC = Math.round(lerp(0xde, 0x5a, t)), bC = Math.round(lerp(0x80, 0x1a, t));
   ctx.save();
   ctx.shadowBlur = isH ? 20 : Math.max(0, 10 - i * 2); ctx.shadowColor = "#4ade80";
   ctx.fillStyle = `rgb(${rC},${gC},${bC})`;
   ctx.beginPath();
   if (ctx.roundRect) ctx.roundRect(px, py, sz, sz, isH ? 10 : 7); else ctx.rect(px, py, sz, sz);
   ctx.fill(); ctx.restore();

   if (isH) {
    const d = g.dir, ex = px + sz / 2, ey = py + sz / 2, oa = sz * 0.22, of = sz * 0.25;
    let e1x, e1y, e2x, e2y;
    if (d.x === 1) { e1x = ex + of; e1y = ey - oa; e2x = ex + of; e2y = ey + oa; }
    else if (d.x === -1) { e1x = ex - of; e1y = ey - oa; e2x = ex - of; e2y = ey + oa; }
    else if (d.y === -1) { e1x = ex - oa; e1y = ey - of; e2x = ex + oa; e2y = ey - of; }
    else { e1x = ex - oa; e1y = ey + of; e2x = ex + oa; e2y = ey + of; }
    [[e1x, e1y], [e2x, e2y]].forEach(([ex2, ey2]) => {
     ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(ex2, ey2, 3, 0, Math.PI * 2); ctx.fill();
     ctx.fillStyle = "#111"; ctx.beginPath(); ctx.arc(ex2 + d.x * 1.1, ey2 + d.y * 1.1, 1.5, 0, Math.PI * 2); ctx.fill();
    });
   }
  }

  // Overlays
  const ov = (col, lines) => {
   ctx.fillStyle = col; ctx.fillRect(0, 0, CW, CH); ctx.textAlign = "center";
   lines.forEach(([txt, font, fill, y]) => { ctx.font = font; ctx.fillStyle = fill; ctx.fillText(txt, CW / 2, CH / 2 + y); });
  };
  if (statusRef.current === "idle") ov(isDark ? "rgba(7,9,16,0.82)" : "rgba(238,242,255,0.82)", [["🐍 Snake", "bold 34px sans-serif", isDark ? "#fff" : "#111", -24], ["Arrow keys / WASD · Space to start", "14px sans-serif", "rgba(128,200,128,0.8)", 14], ["Tap screen on mobile", "12px sans-serif", isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)", 38]]);
  if (statusRef.current === "paused") ov(isDark ? "rgba(7,9,16,0.75)" : "rgba(238,242,255,0.75)", [["⏸ Paused", "bold 30px sans-serif", isDark ? "#fff" : "#111", -10], ["Space to resume", "13px sans-serif", "rgba(128,200,128,0.7)", 20]]);
  if (statusRef.current === "dead") ov(isDark ? "rgba(7,9,16,0.88)" : "rgba(238,242,255,0.88)", [["Game Over 💥", "bold 34px sans-serif", "#ff4d00", -38], [`Score: ${g.score}`, "bold 22px sans-serif", isDark ? "#fff" : "#111", 0], [`Best: ${g.hi}`, "16px sans-serif", "#4ade80", 28], ["Space or tap to restart", "12px sans-serif", isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", 54]]);

  rafRef.current = requestAnimationFrame(loop);
 }, [isDark]);

 // Keyboard
 useEffect(() => {
  const handler = (e) => {
   if (e.code === "Space") {
    e.preventDefault();
    const st = statusRef.current, g = gameRef.current;
    if (st === "idle" || st === "dead") startGame();
    else if (st === "playing") setSt("paused");
    else if (st === "paused") { setSt("playing"); if (g) g.lastTick = null; }
    return;
   }
   const d = KMAP[e.key]; if (!d) return; e.preventDefault();
   const g = gameRef.current;
   if (!g || statusRef.current !== "playing") return;
   if (d.x + g.dir.x !== 0 || d.y + g.dir.y !== 0) g.next = d;
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
 }, [startGame]);

 // Touch
 useEffect(() => {
  const el = canvasRef.current; if (!el) return;
  const onS = (e) => { touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; if (statusRef.current === "idle" || statusRef.current === "dead") startGame(); };
  const onE = (e) => {
   const t = touchRef.current; if (!t.x) return;
   const dx = e.changedTouches[0].clientX - t.x, dy = e.changedTouches[0].clientY - t.y;
   const g = gameRef.current; if (!g || statusRef.current !== "playing") return;
   const d = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 }) : (dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
   if (d.x + g.dir.x !== 0 || d.y + g.dir.y !== 0) g.next = d;
   touchRef.current = { x: null, y: null };
  };
  el.addEventListener("touchstart", onS, { passive: true });
  el.addEventListener("touchend", onE, { passive: true });
  return () => { el.removeEventListener("touchstart", onS); el.removeEventListener("touchend", onE); };
 }, [startGame]);

 // Size canvas to container, then start loop
 useEffect(() => {
  const container = containerRef.current; const canvas = canvasRef.current;
  if (!container || !canvas) return;
  const resize = () => {
   const { width, height } = container.getBoundingClientRect();
   const cell = Math.floor(Math.min(width / COLS, height / ROWS));
   cellRef.current = cell;
   const dpr = window.devicePixelRatio || 1;
   const cw = COLS * cell, ch = ROWS * cell;
   canvas.width = cw * dpr; canvas.height = ch * dpr;
   canvas.style.width = cw + "px"; canvas.style.height = ch + "px";
   canvas.getContext("2d").scale(dpr, dpr);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  gameRef.current = fresh(getHi());
  setUiHi(getHi());
  cancelAnimationFrame(rafRef.current);
  rafRef.current = requestAnimationFrame(loop);
  return () => { ro.disconnect(); cancelAnimationFrame(rafRef.current); };
 }, [loop]);

 return (
  <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}>

   {/* Top bar */}
   <Box sx={{ pt: "68px", px: { xs: 2, md: 4 }, pb: 1.2, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1.5 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
     <BackButton />
     <Box>
      <Typography sx={{ fontSize: 10, letterSpacing: "0.2em", color: "#4ade80", textTransform: "uppercase", fontFamily: "'MyCustomFont',sans-serif" }}>classic game</Typography>
      <Typography component="h1" sx={{ fontSize: "clamp(1.3rem,3vw,2rem)", fontWeight: 700, fontFamily: "'MyCustomFont',sans-serif", lineHeight: 1.1, color: "var(--text-primary)" }}>
       Snake <Box component="span" sx={{ color: "#4ade80" }}>Game</Box>
      </Typography>
     </Box>
    </Box>

    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
     {[{ label: "Score", val: uiScore, color: "#4ade80" }, { label: "Best", val: uiHi, color: "#f59e0b", icon: <Trophy size={10} /> }, { label: "Level", val: uiLv, color: "#7c3aed", icon: <Zap size={10} /> }].map(({ label, val, color, icon }) => (
      <Box key={label} sx={{ textAlign: "center" }}>
       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.4 }}>
        {icon && <Box sx={{ color: "var(--text-muted)" }}>{icon}</Box>}
        <Typography sx={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif" }}>{label}</Typography>
       </Box>
       <Typography sx={{ fontSize: 20, fontWeight: 800, color, fontFamily: "'MyCustomFont',sans-serif", lineHeight: 1 }}>{val}</Typography>
      </Box>
     ))}
     <Button
      size="small"
      onClick={() => { const st = statusRef.current, g = gameRef.current; if (st === "idle" || st === "dead") startGame(); else if (st === "playing") setSt("paused"); else if (st === "paused") { setSt("playing"); if (g) g.lastTick = null; } }}
      sx={{ fontFamily: "'MyCustomFont',sans-serif", fontSize: 11, borderRadius: 40, border: `1px solid rgba(74,222,128,0.3)`, color: "#4ade80", px: 2, minWidth: 0, "&:hover": { background: "rgba(74,222,128,0.08)", borderColor: "#4ade80" } }}
     >
      {status === "playing" ? "Pause" : status === "paused" ? "Resume" : "Start"}
     </Button>
     <Button size="small" onClick={startGame} sx={{ fontFamily: "'MyCustomFont',sans-serif", fontSize: 11, borderRadius: 40, border: "1px solid rgba(255,255,255,0.1)", color: "var(--text-muted)", px: 1.5, minWidth: 0, "&:hover": { borderColor: "var(--accent)", color: "var(--accent)" } }}>
      <RotateCcw size={13} />
     </Button>
    </Box>
   </Box>

   <Typography sx={{ px: { xs: 2, md: 4 }, pb: 0.8, fontSize: 11, color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif", flexShrink: 0 }}>
    Arrow / WASD to move · Space pause · Swipe on mobile
   </Typography>

   {/* Canvas container — fills rest of viewport */}
   <Box ref={containerRef} sx={{ flex: 1, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", px: { xs: 1, md: 3 }, pb: { xs: 1, md: 2 } }}>
    <Box sx={{ borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(74,222,128,0.12)", boxShadow: "0 0 60px rgba(74,222,128,0.06)", lineHeight: 0 }}>
     <canvas ref={canvasRef} style={{ display: "block", cursor: "none", touchAction: "none" }} />
    </Box>
   </Box>
  </Box>
 );
}
