import { motion } from "framer-motion";
import { Box } from "@mui/material";

export default function DecorativeShape({ open }) {
 return (
  <Box
   sx={{
    position: "absolute",
    bottom: 24,
    right: -40,
    width: 160,
    height: 160,
    overflow: "hidden",
    pointerEvents: "none",
   }}
  >

   <motion.div
    animate={{
     rotate: open ? -20 : -5,
    }}
    transition={{
     duration: 0.6,
     ease: "easeInOut",
    }}
    style={{
     width: "100%",
     height: "100%",
     background: "#d3d3d3",
     borderRadius: 24,
    }}
   />
  </Box>
 );
}
