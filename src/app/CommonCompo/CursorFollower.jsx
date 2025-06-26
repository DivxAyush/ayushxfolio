import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@mui/material";

const CursorFollower = ({ visible = true }) => {
  const dotRef = useRef(null);
  const [isInWindow, setIsInWindow] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)"); // 📱 Detect mobile screens

  useEffect(() => {
    if (isMobile) return;

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
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
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
        backgroundColor: "transparent",  // <-- background ko transparent karo
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        transform: "translate3d(0, 0, 0)",
        transition: "opacity 0.3s ease",
        opacity: visible && isInWindow ? 1 : 0,
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        boxShadow: "0 0 6px 2px rgba(255, 255, 255, 0.3)", // optional glow
        borderLeft: "5px solid transparent",  // add borders to form triangle edges 
        borderRight: "5px solid transparent",
        borderBottom: "10px solid white",
        width: 0,
        height: 0,
      }}

    />
  );
};

export default CursorFollower;
