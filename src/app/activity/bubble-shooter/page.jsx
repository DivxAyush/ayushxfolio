"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useAppTheme } from "../../context/ThemeContext";
import BackButton from "../../CommonCompo/BackButton";
import { RotateCcw, Target } from "lucide-react";

/* ─── Game constants ─── */
const COLS = 9;
const ROWS = 9;
const R = 24;           // bubble radius
const DIAM = R * 2;
const SPEED = 11;
const COLORS = ["#ff4d00", "#7c3aed", "#10b981", "#06b6d4", "#f59e0b", "#ec4899"];
const INITIAL_FILLED_ROWS = 5;

/* ─── Grid helpers ─── */
function cellX(col, row) {
 return col * DIAM + (row % 2 === 1 ? R : 0) + R;
}
function cellY(row) {
 return row * DIAM * 0.875 + R + 4;
}

function makeGrid() {
 return Array.from({ length: ROWS }, (_, row) =>
  Array.from({ length: COLS }, () =>
   row < INITIAL_FILLED_ROWS ? COLORS[Math.floor(Math.random() * COLORS.length)] : null
  )
 );
}

function randomColor() {
 return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function getNeighbors(row, col) {
 const odd = row % 2 === 1;
 return [
  [row - 1, odd ? col : col - 1],
  [row - 1, odd ? col + 1 : col],
  [row, col - 1],
  [row, col + 1],
  [row + 1, odd ? col : col - 1],
  [row + 1, odd ? col + 1 : col],
 ].filter(([r, c]) => r >= 0 && r < ROWS && c >= 0 && c < COLS);
}

function floodFill(grid, startRow, startCol, color) {
 const visited = new Set();
 const result = [];
 const stack = [[startRow, startCol]];
 while (stack.length) {
  const [r, c] = stack.pop();
  const key = `${r},${c}`;
  if (visited.has(key)) continue;
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS) continue;
  if (grid[r][c] !== color) continue;
  visited.add(key);
  result.push({ row: r, col: c });
  getNeighbors(r, c).forEach(([nr, nc]) => stack.push([nr, nc]));
 }
 return result;
}

function findFloating(grid) {
 const connected = new Set();
 const stack = [];
 for (let c = 0; c < COLS; c++) {
  if (grid[0][c]) stack.push([0, c]);
 }
 while (stack.length) {
  const [r, c] = stack.pop();
  const key = `${r},${c}`;
  if (connected.has(key)) continue;
  if (r < 0 || r >= ROWS || c < 0 || c >= COLS || !grid[r][c]) continue;
  connected.add(key);
  getNeighbors(r, c).forEach(([nr, nc]) => stack.push([nr, nc]));
 }
 const floating = [];
 for (let r = 0; r < ROWS; r++)
  for (let c = 0; c < COLS; c++)
   if (grid[r][c] && !connected.has(`${r},${c}`))
    floating.push({ row: r, col: c });
 return floating;
}

/* ─── Find nearest empty cell to a position ─── */
function nearestEmpty(grid, x, y) {
 let best = null, bestD = Infinity;
 for (let row = 0; row < ROWS; row++) {
  for (let col = 0; col < COLS; col++) {
   if (grid[row][col]) continue;
   const dx = x - cellX(col, row);
   const dy = y - cellY(row);
   const d = dx * dx + dy * dy;
   if (d < bestD) { bestD = d; best = { row, col }; }
  }
 }
 return { cell: best, dist: Math.sqrt(bestD) };
}

/* ─── Draw bubble ─── */
function drawBubble(ctx, cx, cy, radius, color) {
 ctx.beginPath();
 ctx.arc(cx, cy, radius - 1.5, 0, Math.PI * 2);
 const g = ctx.createRadialGradient(cx - radius * 0.28, cy - radius * 0.28, radius * 0.08, cx, cy, radius);
 g.addColorStop(0, color + "ee");
 g.addColorStop(1, color + "88");
 ctx.fillStyle = g;
 ctx.fill();
 ctx.strokeStyle = "rgba(255,255,255,0.18)";
 ctx.lineWidth = 1.2;
 ctx.stroke();
 ctx.beginPath();
 ctx.arc(cx - radius * 0.28, cy - radius * 0.28, radius * 0.22, 0, Math.PI * 2);
 ctx.fillStyle = "rgba(255,255,255,0.3)";
 ctx.fill();
}

/* ─── Main component ─── */
export default function BubbleShooterPage() {
 const { mode } = useAppTheme();
 const isDark = mode === "dark";

 const canvasRef = useRef(null);
 const stateRef = useRef(null);
 const rafRef = useRef(null);

 const [uiScore, setUiScore] = useState(0);
 const [status, setStatus] = useState("playing"); // playing | win | lose
 const statusRef = useRef("playing");

 function setGameStatus(s) {
  statusRef.current = s;
  setStatus(s);
 }

 /* Canvas dimensions based on game grid */
 const CW = COLS * DIAM + R;    // canvas width
 const CH = cellY(ROWS - 1) + R + DIAM + 20; // canvas height (last row + shooter area)
 const shooterY = CH - R - 10;
 const shooterX = CW / 2;

 function freshState() {
  return {
   grid: makeGrid(),
   angle: -Math.PI / 2,
   bullet: null,
   currentColor: randomColor(),
   nextColor: randomColor(),
   score: 0,
  };
 }

 /* ─── Snap bullet into grid ─── */
 const snapBullet = useCallback((s, bx, by) => {
  const { cell, dist } = nearestEmpty(s.grid, bx, by);
  if (!cell || dist > DIAM * 1.2) { s.bullet = null; return; }

  s.grid[cell.row][cell.col] = s.bullet.color;
  s.bullet = null;

  // Check cluster
  const cluster = floodFill(s.grid, cell.row, cell.col, s.grid[cell.row][cell.col]);
  if (cluster.length >= 3) {
   cluster.forEach(({ row, col }) => { s.grid[row][col] = null; });
   s.score += cluster.length * 10;

   const floating = findFloating(s.grid);
   floating.forEach(({ row, col }) => { s.grid[row][col] = null; s.score += 5; });

   setUiScore(s.score);
  }

  // Win / lose check
  const anyLeft = s.grid.some(row => row.some(c => c));
  if (!anyLeft) { setGameStatus("win"); return; }
  if (s.grid[ROWS - 1].some(c => c)) { setGameStatus("lose"); return; }

  s.currentColor = s.nextColor;
  s.nextColor = randomColor();
 }, []);

 /* ─── Game tick ─── */
 const tick = useCallback(() => {
  const canvas = canvasRef.current;
  const s = stateRef.current;
  if (!canvas || !s || statusRef.current !== "playing") return;
  const ctx = canvas.getContext("2d");

  // Update bullet position
  if (s.bullet) {
   s.bullet.x += s.bullet.vx;
   s.bullet.y += s.bullet.vy;

   // Wall bounce
   if (s.bullet.x - R < 0) { s.bullet.x = R; s.bullet.vx = Math.abs(s.bullet.vx); }
   if (s.bullet.x + R > CW) { s.bullet.x = CW - R; s.bullet.vx = -Math.abs(s.bullet.vx); }

   // Top wall snap
   if (s.bullet.y - R <= cellY(0) - R) {
    snapBullet(s, s.bullet.x, cellY(0));
   } else {
    // Collision check with existing bubbles
    let snapped = false;
    for (let row = 0; row < ROWS && !snapped; row++) {
     for (let col = 0; col < COLS && !snapped; col++) {
      if (!s.grid[row][col]) continue;
      const dx = s.bullet.x - cellX(col, row);
      const dy = s.bullet.y - cellY(row);
      if (dx * dx + dy * dy < (DIAM - 2) * (DIAM - 2)) {
       snapBullet(s, s.bullet.x, s.bullet.y);
       snapped = true;
      }
     }
    }
   }
  }

  /* ─── DRAW ─── */
  ctx.clearRect(0, 0, CW, CH);
  ctx.fillStyle = isDark ? "#080808" : "#f5f5f5";
  ctx.fillRect(0, 0, CW, CH);

  // Grid line
  ctx.strokeStyle = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, shooterY - R * 1.6);
  ctx.lineTo(CW, shooterY - R * 1.6);
  ctx.stroke();

  // Grid bubbles
  for (let row = 0; row < ROWS; row++) {
   for (let col = 0; col < COLS; col++) {
    const color = s.grid[row][col];
    if (!color) continue;
    drawBubble(ctx, cellX(col, row), cellY(row), R, color);
   }
  }

  // Aim dots
  let ax = shooterX, ay = shooterY;
  const dvx = Math.cos(s.angle), dvy = Math.sin(s.angle);
  ctx.fillStyle = s.currentColor + "55";
  for (let i = 1; i <= 8; i++) {
   let nx = ax + dvx * R * i * 1.6;
   let ny = ay + dvy * R * i * 1.6;
   if (nx - R < 0 || nx + R > CW) break;
   ctx.beginPath();
   ctx.arc(nx, ny, 3, 0, Math.PI * 2);
   ctx.fill();
  }

  // Shooter
  drawBubble(ctx, shooterX, shooterY, R, s.currentColor);

  // Next bubble (small, to the right)
  ctx.fillStyle = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)";
  ctx.font = "10px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("next", shooterX + R * 2.8, shooterY + R + 10);
  drawBubble(ctx, shooterX + R * 2.8, shooterY, R * 0.65, s.nextColor);

  // Flying bullet
  if (s.bullet) {
   drawBubble(ctx, s.bullet.x, s.bullet.y, R, s.bullet.color);
  }

  rafRef.current = requestAnimationFrame(tick);
 }, [isDark, snapBullet, CW, CH, shooterX, shooterY]);

 const shoot = useCallback(() => {
  const s = stateRef.current;
  if (!s || s.bullet) return;
  s.bullet = {
   x: shooterX, y: shooterY,
   vx: Math.cos(s.angle) * SPEED,
   vy: Math.sin(s.angle) * SPEED,
   color: s.currentColor,
  };
 }, [shooterX, shooterY]);

 const updateAngle = useCallback((mx, my) => {
  const s = stateRef.current;
  if (!s) return;
  const dx = mx - shooterX, dy = my - shooterY;
  const angle = Math.atan2(dy, dx);
  s.angle = Math.min(-0.1, Math.max(-Math.PI + 0.1, angle));
 }, [shooterX, shooterY]);

 const handleMouseMove = useCallback((e) => {
  const rect = canvasRef.current?.getBoundingClientRect();
  if (!rect) return;
  const scaleX = CW / rect.width;
  const scaleY = CH / rect.height;
  updateAngle((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
 }, [CW, CH, updateAngle]);

 const handleTouchMove = useCallback((e) => {
  e.preventDefault();
  const rect = canvasRef.current?.getBoundingClientRect();
  if (!rect) return;
  const t = e.touches[0];
  const scaleX = CW / rect.width;
  const scaleY = CH / rect.height;
  updateAngle((t.clientX - rect.left) * scaleX, (t.clientY - rect.top) * scaleY);
 }, [CW, CH, updateAngle]);

 const restart = useCallback(() => {
  cancelAnimationFrame(rafRef.current);
  stateRef.current = freshState();
  setUiScore(0);
  setGameStatus("playing");
  rafRef.current = requestAnimationFrame(tick);
 }, [tick]);

 useEffect(() => {
  const dpr = window.devicePixelRatio || 1;
  const canvas = canvasRef.current;
  canvas.width = CW * dpr;
  canvas.height = CH * dpr;
  canvas.style.width = CW + "px";
  canvas.style.height = CH + "px";
  canvas.getContext("2d").scale(dpr, dpr);

  stateRef.current = freshState();
  rafRef.current = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(rafRef.current);
 }, [tick, CW, CH]);

 const overlayBg = isDark ? "rgba(8,8,8,0.92)" : "rgba(245,245,245,0.92)";
 const isOver = status !== "playing";

 return (
  <Box sx={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", pt: "80px", pb: 4, px: { xs: 2, sm: 3, md: 5 }, overflowY: "auto" }}>
   <Box sx={{ maxWidth: 900, mx: "auto" }}>

    {/* Header */}
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2.5, flexWrap: "wrap", gap: 2 }}>
     <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
      <BackButton />
      <Box>
       <Typography sx={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", fontFamily: "'MyCustomFont',sans-serif" }}>
        casual game
       </Typography>
       <Typography component="h1" sx={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)", fontWeight: 700, fontFamily: "'MyCustomFont',sans-serif", lineHeight: 1.1, color: "var(--text-primary)" }}>
        Bubble <Box component="span" sx={{ color: "var(--accent)" }}>Shooter</Box>
       </Typography>
      </Box>
     </Box>
     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
       <Target size={16} color="var(--accent)" />
       <Typography sx={{ fontSize: 24, fontWeight: 800, color: "var(--accent)", fontFamily: "'MyCustomFont',sans-serif" }}>{uiScore}</Typography>
      </Box>
      <Button onClick={restart} startIcon={<RotateCcw size={13} />} size="small"
       sx={{ fontFamily: "'MyCustomFont',sans-serif", fontSize: 12, borderRadius: 40, border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`, color: "var(--text-secondary)", px: 2, "&:hover": { borderColor: "var(--accent)", color: "var(--accent)" } }}>
       Restart
      </Button>
     </Box>
    </Box>

    <Typography sx={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif", mb: 2 }}>
     Move mouse to aim · Click to shoot · Match 3+ same-color bubbles to pop them
    </Typography>

    {/* Game canvas centered */}
    <Box sx={{ display: "flex", justifyContent: "center" }}>
     <Box sx={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`, display: "inline-block" }}>
      <canvas
       ref={canvasRef}
       style={{ display: "block", cursor: "crosshair", touchAction: "none", maxWidth: "100%" }}
       onClick={shoot}
       onMouseMove={handleMouseMove}
       onTouchMove={handleTouchMove}
       onTouchEnd={shoot}
      />

      {isOver && (
       <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: overlayBg, gap: 2 }}>
        <Typography sx={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, fontFamily: "'MyCustomFont',sans-serif", color: status === "win" ? "#10b981" : "#ff4d00" }}>
         {status === "win" ? "You Win! 🎉" : "Game Over 💥"}
        </Typography>
        <Typography sx={{ fontSize: 16, color: "var(--text-secondary)", fontFamily: "'MyCustomFont',sans-serif" }}>
         Final Score: {uiScore}
        </Typography>
        <Button onClick={restart} variant="contained"
         sx={{ background: "var(--accent)", color: "#fff", fontFamily: "'MyCustomFont',sans-serif", borderRadius: 40, px: 4, py: 1.2, fontSize: 14, mt: 1, "&:hover": { background: "#e03e00" } }}>
         Play Again
        </Button>
       </Box>
      )}
     </Box>
    </Box>
   </Box>
  </Box>
 );
}
