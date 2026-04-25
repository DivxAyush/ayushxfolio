"use client";

import { useState, useCallback } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAppTheme } from "../../context/ThemeContext";
import BackButton from "../../CommonCompo/BackButton";
import { RotateCcw, Trophy } from "lucide-react";

const WINNING_LINES = [
 [0, 1, 2], [3, 4, 5], [6, 7, 8],
 [0, 3, 6], [1, 4, 7], [2, 5, 8],
 [0, 4, 8], [2, 4, 6],
];

function calcWinner(squares) {
 for (const [a, b, c] of WINNING_LINES) {
  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
   return { winner: squares[a], line: [a, b, c] };
 }
 return null;
}

function Cell({ value, index, onClick, isWinning, isDark }) {
 const color = value === "X" ? "#ff4d00" : "#7c3aed";
 return (
  <motion.div
   whileHover={!value ? { scale: 1.05, backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" } : {}}
   whileTap={!value ? { scale: 0.95 } : {}}
   onClick={onClick}
   style={{
    borderRadius: 14,
    background: isWinning
     ? (value === "X" ? "rgba(255,77,0,0.15)" : "rgba(124,58,237,0.15)")
     : (isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"),
    border: `1.5px solid ${isWinning ? (value === "X" ? "#ff4d0066" : "#7c3aed66") : (isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)")}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: value ? "default" : "pointer",
    transition: "all 0.2s ease",
    boxShadow: isWinning ? `0 0 24px ${value === "X" ? "#ff4d0033" : "#7c3aed33"}` : "none",
    aspectRatio: "1",
   }}
  >
   <AnimatePresence>
    {value && (
     <motion.span
      key={value + index}
      initial={{ scale: 0, rotate: -20, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      style={{ fontSize: "clamp(24px,4vw,44px)", fontWeight: 900, fontFamily: "'MyCustomFont',sans-serif", color, lineHeight: 1, userSelect: "none" }}
     >
      {value}
     </motion.span>
    )}
   </AnimatePresence>
  </motion.div>
 );
}

export default function TicTacToePage() {
 const { mode } = useAppTheme();
 const isDark = mode === "dark";

 const [squares, setSquares] = useState(Array(9).fill(null));
 const [xIsNext, setXIsNext] = useState(true);
 const [score, setScore] = useState({ X: 0, O: 0, draw: 0 });

 const result = calcWinner(squares);
 const winner = result?.winner;
 const winLine = result?.line ?? [];
 const isDraw = !winner && squares.every(Boolean);

 const handleClick = useCallback((i) => {
  if (squares[i] || winner || isDraw) return;
  const next = squares.slice();
  next[i] = xIsNext ? "X" : "O";
  setSquares(next);
  setXIsNext((p) => !p);
  const res = calcWinner(next);
  if (res) setScore((s) => ({ ...s, [res.winner]: s[res.winner] + 1 }));
  else if (next.every(Boolean)) setScore((s) => ({ ...s, draw: s.draw + 1 }));
 }, [squares, winner, isDraw, xIsNext]);

 const reset = useCallback(() => { setSquares(Array(9).fill(null)); setXIsNext(true); }, []);
 const fullReset = useCallback(() => { reset(); setScore({ X: 0, O: 0, draw: 0 }); }, [reset]);

 const statusText = winner ? `Player ${winner} wins!` : isDraw ? "It's a draw!" : `Player ${xIsNext ? "X" : "O"}'s turn`;
 const statusColor = winner ? (winner === "X" ? "#ff4d00" : "#7c3aed") : isDraw ? "#10b981" : "var(--text-primary)";

 const panelSx = {
  borderRadius: "14px", p: "14px 18px",
  background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
  border: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
 };

 return (
  <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-primary)", color: "var(--text-primary)", overflow: "hidden" }}>
   {/* Top bar */}
   <Box sx={{ pt: "72px", px: { xs: 2, md: 4 }, pb: 1.5, flexShrink: 0 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 3, flexWrap: "wrap" }}>
     <BackButton />
     <Box>
      <Typography sx={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--accent)", textTransform: "uppercase", fontFamily: "'MyCustomFont',sans-serif" }}>2-player game</Typography>
      <Typography component="h1" sx={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 700, fontFamily: "'MyCustomFont',sans-serif", color: "var(--text-primary)", lineHeight: 1.1 }}>
       Tic <Box component="span" sx={{ color: "var(--accent)" }}>Tac Toe</Box>
      </Typography>
     </Box>
    </Box>
   </Box>

   {/* Body — two columns */}
   <Box sx={{ flex: 1, overflow: "hidden", px: { xs: 2, md: 4 }, pb: 2, display: "flex", gap: 3, alignItems: "stretch" }}>

    {/* Left — board */}
    <Box sx={{ flex: "0 0 auto", display: "flex", flexDirection: "column", justifyContent: "center", gap: 2 }}>
     {/* Board */}
     <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1.5, width: "min(46vh, 380px)" }}>
      {squares.map((val, i) => (
       <Cell key={i} index={i} value={val} onClick={() => handleClick(i)} isWinning={winLine.includes(i)} isDark={isDark} />
      ))}
     </Box>

     {/* Buttons */}
     <Box sx={{ display: "flex", gap: 1.5 }}>
      <Button onClick={reset} startIcon={<RotateCcw size={13} />} size="small" variant="outlined"
       sx={{ fontFamily: "'MyCustomFont',sans-serif", fontSize: 12, borderColor: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)", color: "var(--text-primary)", borderRadius: 40, px: 2.5, "&:hover": { borderColor: "var(--accent)", color: "var(--accent)", background: "rgba(255,77,0,0.06)" } }}>
       New Game
      </Button>
      <Button onClick={fullReset} size="small" variant="text"
       sx={{ fontFamily: "'MyCustomFont',sans-serif", fontSize: 12, color: "var(--text-muted)", borderRadius: 40, "&:hover": { color: "var(--text-secondary)" } }}>
       Reset Scores
      </Button>
     </Box>
    </Box>

    {/* Right — info */}
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, minWidth: 0 }}>

     {/* Status */}
     <AnimatePresence mode="wait">
      <motion.div key={statusText} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.25 }}>
       <Box sx={{ ...panelSx, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
         {(winner || isDraw) && <Trophy size={18} color={statusColor} />}
         <Typography sx={{ fontSize: 16, fontWeight: 700, color: statusColor, fontFamily: "'MyCustomFont',sans-serif" }}>
          {statusText} {winner ? "🎉" : isDraw ? "🤝" : ""}
         </Typography>
        </Box>
        {(winner || isDraw) && (
         <Chip label="Next Round" onClick={reset} size="small"
          sx={{ cursor: "pointer", background: "var(--accent)", color: "#fff", fontFamily: "'MyCustomFont',sans-serif", fontSize: 11, "&:hover": { background: "#e03e00" } }} />
        )}
       </Box>
      </motion.div>
     </AnimatePresence>

     {/* Turn indicator */}
     {!winner && !isDraw && (
      <Box sx={{ display: "flex", gap: 1.5 }}>
       {["X", "O"].map((p) => {
        const active = (xIsNext && p === "X") || (!xIsNext && p === "O");
        const c = p === "X" ? "#ff4d00" : "#7c3aed";
        return (
         <Box key={p} sx={{ flex: 1, ...panelSx, textAlign: "center", border: `1.5px solid ${active ? c + "66" : (isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)")}`, background: active ? `${c}10` : "transparent", transition: "all 0.3s" }}>
          <Typography sx={{ fontSize: 28, fontWeight: 900, color: active ? c : "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif", lineHeight: 1 }}>{p}</Typography>
          <Typography sx={{ fontSize: 10, color: active ? c : "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif", mt: 0.4 }}>{active ? "your turn" : "waiting"}</Typography>
         </Box>
        );
       })}
      </Box>
     )}

     {/* Score */}
     <Box sx={panelSx}>
      <Typography sx={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif", mb: 1.5 }}>Scoreboard</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1.5 }}>
       {[
        { label: "X Wins", val: score.X, color: "#ff4d00" },
        { label: "Draws", val: score.draw, color: "#10b981" },
        { label: "O Wins", val: score.O, color: "#7c3aed" },
       ].map(({ label, val, color }) => (
        <Box key={label} sx={{ textAlign: "center" }}>
         <Typography sx={{ fontSize: 9, letterSpacing: "0.08em", color, textTransform: "uppercase", fontFamily: "'MyCustomFont',sans-serif", mb: 0.3 }}>{label}</Typography>
         <Typography sx={{ fontSize: 34, fontWeight: 900, color, fontFamily: "'MyCustomFont',sans-serif", lineHeight: 1 }}>{val}</Typography>
        </Box>
       ))}
      </Box>
     </Box>

     {/* How to play */}
     <Box sx={{ ...panelSx }}>
      <Typography sx={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", fontFamily: "'MyCustomFont',sans-serif", mb: 1 }}>How to Play</Typography>
      {["Player X goes first — click any empty cell.", "Take turns placing your mark.", "First to get 3 in a row wins!"].map((t) => (
       <Typography key={t} sx={{ fontSize: 12, color: "var(--text-secondary)", fontFamily: "'MyCustomFont',sans-serif", lineHeight: 1.7 }}>· {t}</Typography>
      ))}
     </Box>
    </Box>
   </Box>
  </Box>
 );
}
