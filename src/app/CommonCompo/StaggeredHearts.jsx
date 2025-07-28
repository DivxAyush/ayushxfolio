"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";

export default function StaggeredHearts() {
  const containerRef = useRef(null);

  useEffect(() => {
    const hearts = containerRef.current.querySelectorAll(".heart");

    anime({
      targets: hearts,
      scale: [
        { value: 1, duration: 0 }, // start from scale 1
        { value: 1.5, duration: 600, easing: "easeOutElastic(1, .8)" },
        { value: 1, duration: 800, easing: "easeOutElastic(1, .8)" },
      ],
      rotate: [
        { value: 0, duration: 0 },
        { value: 15, duration: 400, easing: "easeInOutSine" },
        { value: -15, duration: 800, easing: "easeInOutSine" },
        { value: 0, duration: 400, easing: "easeInOutSine" },
      ],
      translateY: [
        { value: 0, duration: 0 },
        { value: -20, duration: 600, easing: "easeOutQuad" },
        { value: 0, duration: 800, easing: "easeInQuad" },
      ],
      delay: anime.stagger(150, { start: 300 }),
      loop: true,
      direction: "alternate",
    });
  }, []);

  // Render 9 hearts in a 3x3 grid
  return (
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 60px)",
        gap: "20px",
        justifyContent: "center",
        marginTop: 50,
      }}
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <svg
          key={i}
          className="heart"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="red"
          width="60"
          height="60"
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
          4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 
          16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}
