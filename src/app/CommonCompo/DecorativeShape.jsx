"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { useAppTheme } from "../context/ThemeContext";

export default function DecorativeShape({ open }) {
    const shapeRef = useRef(null);
    const glowRef = useRef(null);
    const { mode } = useAppTheme();
    const isDark = mode === "dark";

    // Floating + glow on mount
    useEffect(() => {
        if (!shapeRef.current) return;

        gsap.set(shapeRef.current, { rotate: -5, scale: 0.85, opacity: 0.7 });

        // Float
        gsap.to(shapeRef.current, {
            y: -14,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });

        // Glow pulse
        if (glowRef.current) {
            gsap.to(glowRef.current, {
                opacity: 0.5,
                scale: 1.18,
                duration: 2.2,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
            });
        }
    }, []);

    // Animate on open/close

    useEffect(() => {
        if (!shapeRef.current) return;
        gsap.to(shapeRef.current, {
            rotate: open ? -22 : -5,
            scale: open ? 1 : 0.85,
            opacity: open ? 1 : 0.7,
            duration: 0.75,
            ease: "expo.out",
        });
    }, [open]);

    // ── Theme-aware gradient colours ──
    const gradientBg = isDark
        ? "linear-gradient(135deg, #2c2c2c 0%, #141414 60%, #1e1e1e 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #e0e0e0 60%, #d0d0d0 100%)";

    const shineColor = isDark
        ? "rgba(255,255,255,0.07)"
        : "rgba(255,255,255,0.65)";

    const borderColor = isDark
        ? "rgba(255,255,255,0.08)"
        : "rgba(255,255,255,0.9)";

    const accentColor = isDark
        ? "rgba(255,77,0,0.55)"
        : "rgba(255,77,0,0.35)";

    const glowGradient = isDark
        ? "radial-gradient(circle, rgba(255,77,0,0.2) 0%, transparent 70%)"
        : "radial-gradient(circle, rgba(255,77,0,0.18) 0%, transparent 70%)";

    // Extra inner stripe for dark mode
    const innerStripe = isDark
        ? "linear-gradient(160deg, rgba(255,255,255,0.05) 0%, transparent 50%)"
        : "none";

    return (
        <Box
            sx={{
                position: "relative",
                width: 180,
                height: 180,
                overflow: "visible",
                pointerEvents: "none",
                zIndex: 0,
                margin: "10px",
            }}
        >
            {/* Glow halo */}
            <Box
                ref={glowRef}
                sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "30px",
                    background: glowGradient,
                    filter: "blur(22px)",
                    opacity: 0.2,
                }}
            />

            {/* Main rounded box */}
            <Box
                ref={shapeRef}
                sx={{
                    width: "100%",
                    height: "100%",
                    background: gradientBg,
                    borderRadius: "28px",
                    border: `1px solid ${borderColor}`,
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isDark
                        ? "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.5)"
                        : "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 24px rgba(0,0,0,0.12)",
                }}
            >
                {/* Top-left shine blob */}
                <Box
                    sx={{
                        position: "absolute",
                        top: "8%",
                        left: "8%",
                        width: "42%",
                        height: "34%",
                        background: shineColor,
                        borderRadius: "50%",
                        filter: "blur(14px)",
                    }}
                />

                {/* Inner stripe (dark mode only) */}
                {isDark && (
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background: innerStripe,
                        }}
                    />
                )}

                {/* Orange corner accent square */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 14,
                        right: 14,
                        width: 26,
                        height: 26,
                        borderRadius: "8px",
                        background: accentColor,
                        boxShadow: isDark ? `0 0 12px rgba(255,77,0,0.4)` : "none",
                    }}
                />

                {/* Small dot pattern (top-right) */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 5px)",
                        gap: "4px",
                    }}
                >
                    {Array.from({ length: 9 }).map((_, i) => (
                        <Box
                            key={i}
                            sx={{
                                width: 4,
                                height: 4,
                                borderRadius: "50%",
                                background: isDark
                                    ? "rgba(255,255,255,0.18)"
                                    : "rgba(0,0,0,0.18)",
                            }}
                        />
                    ))}
                </Box>
            </Box>
        </Box>
    );
}
