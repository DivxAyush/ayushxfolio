"use client";

import { useEffect, useRef } from "react";

export default function DotGrid({ mode }) {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let animationId;
        let dots = [];

        const SPACING = 18;
        const DOT_R = 1.2;
        const REPEL_R = 120;
        const MAX_FORCE = 50;
        const SPRING = 0.1;
        const DAMPING = 0.72;

        function buildDots(W, H) {
            dots = [];
            for (let y = SPACING / 2; y <= H + SPACING; y += SPACING) {
                for (let x = SPACING / 2; x <= W + SPACING; x += SPACING) {
                    dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
                }
            }
        }

        function resize() {
            const parent = canvas.parentElement;
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            buildDots(canvas.width, canvas.height);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const isDark = mode === "dark";
            const baseOpacity = isDark ? 0.2 : 0.3;
            const dotColor = isDark
                ? `rgba(255,255,255,${baseOpacity})`
                : `rgba(0,0,0,${baseOpacity})`;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            for (const d of dots) {
                const dx = d.x - mx;
                const dy = d.y - my;
                const dist = Math.hypot(dx, dy);

                if (dist < REPEL_R && dist > 0) {
                    const t = 1 - dist / REPEL_R;
                    const force = t * t * MAX_FORCE;
                    const angle = Math.atan2(dy, dx);
                    d.vx += Math.cos(angle) * force * 0.2;
                    d.vy += Math.sin(angle) * force * 0.2;
                }

                // Spring back to origin
                d.vx += (d.ox - d.x) * SPRING;
                d.vy += (d.oy - d.y) * SPRING;

                // Damping
                d.vx *= DAMPING;
                d.vy *= DAMPING;

                d.x += d.vx;
                d.y += d.vy;

                // Vary opacity based on distance from origin (displaced dots glow slightly)
                const displaced = Math.hypot(d.x - d.ox, d.y - d.oy);
                const glowFactor = Math.min(displaced / 30, 1);
                const opacity = isDark
                    ? baseOpacity + glowFactor * 0.5
                    : baseOpacity + glowFactor * 0.3;

                ctx.beginPath();
                ctx.arc(d.x, d.y, DOT_R, 0, Math.PI * 2);
                ctx.fillStyle = isDark
                    ? `rgba(255,255,255,${opacity})`
                    : `rgba(0,0,0,${opacity})`;
                ctx.fill();
            }

            animationId = requestAnimationFrame(draw);
        }

        function onMouseMove(e) {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        }

        function onMouseLeave() {
            mouseRef.current = { x: -9999, y: -9999 };
        }

        // Use ResizeObserver for clean resizing
        const ro = new ResizeObserver(() => {
            resize();
        });
        ro.observe(canvas.parentElement);

        resize();
        draw();

        // Attach to parent section so clicks still pass through
        const parent = canvas.parentElement;
        parent.addEventListener("mousemove", onMouseMove);
        parent.addEventListener("mouseleave", onMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            ro.disconnect();
            parent.removeEventListener("mousemove", onMouseMove);
            parent.removeEventListener("mouseleave", onMouseLeave);
        };
    }, [mode]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                zIndex: 1,
            }}
        />
    );
}
