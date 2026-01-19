import { motion } from "framer-motion";

export default function CursorFollower({ x, y, visible, hoverPos }) {
 const isHovering = Boolean(hoverPos);

 return (
  <motion.div
   animate={{
    left: isHovering ? hoverPos.x : x,
    top: isHovering ? hoverPos.y : y,
    width: isHovering ? 120 : 12,
    height: isHovering ? 120 : 12,
    opacity: visible ? 1 : 0,
   }}
   transition={{
    type: "spring",
    stiffness: 300,
    damping: 25,
   }}
   style={{
    position: "fixed",
    borderRadius: "50%",
    backgroundColor: isHovering
     ? "rgba(255,255,255,0.15)"
     : "#fff",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
   }}
  />
 );
}
