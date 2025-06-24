import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";

const CursorFollower = ({ visible = true }) => {
  const dotRef = useRef(null);
  const [isInWindow, setIsInWindow] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)"); // 📱 Detect mobile screens

  useEffect(() => {
    if (isMobile) return; // ❌ Skip on mobile

    const dot = dotRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const speed = 0.1;

    const animate = () => {
      currentX += (mouseX - currentX) * speed;
      currentY += (mouseY - currentY) * speed;
      if (dot) {
        dot.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsInWindow(true);
    };

    const handleMouseLeave = () => setIsInWindow(false);
    const handleMouseEnter = () => setIsInWindow(true);

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMobile]);

  if (isMobile) return null; // ❌ Don’t render on mobile

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "white",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate3d(0, 0, 0)",
        transition: "opacity 0.3s ease",
        opacity: visible && isInWindow ? 1 : 0,
        mixBlendMode: "difference",
      }}
    />
  );
};

export default CursorFollower;
