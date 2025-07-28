// components/CommonCompo/BackgroundAnimation.jsx
"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";

export default function BackgroundAnimation() {
 const canvasRef = useRef(null);

 useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  let particles = [];

  const resize = () => {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
  };

  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < 50; i++) {
   particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.8,
    dy: (Math.random() - 0.5) * 0.8,
    opacity: Math.random(),
   });
  }

  const animate = () => {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
   });

   requestAnimationFrame(animate);
  };

  animate();

  return () => window.removeEventListener("resize", resize);
 }, []);

 return (
  <canvas
   ref={canvasRef}
   style={{
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: -1,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
   }}
  />
 );
}
