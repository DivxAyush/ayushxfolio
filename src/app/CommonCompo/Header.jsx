"use client";

import React, { useEffect, useState } from "react";
import {
 AppBar,
 Toolbar,
 Typography,
 Box,
 Button,
 IconButton,
 Tooltip,
 useMediaQuery,
} from "@mui/material";
import { useTheme, keyframes } from "@mui/material/styles";
import { Globe, Moon, Sun } from "lucide-react";
import MenuDrawer from "./MenuDrawer";

export default function Header({ mode, toggleColorMode }) {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const [drawerOpen, setDrawerOpen] = useState(false);
 const [time, setTime] = useState("");
 const [scrolled, setScrolled] = useState(false);

 useEffect(() => {
  const updateTime = () => {
   const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
   });
   setTime(formatter.format(new Date()));
  };

  updateTime();
  const interval = setInterval(updateTime, 60000);
  return () => clearInterval(interval);
 }, []);

 useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 20);
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
 }, []);

 const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
 `;

 return (
  <>
   <AppBar
    position="fixed"
    elevation={0}
    sx={{
     backgroundColor: scrolled
      ? mode === "dark"
        ? "rgba(0,0,0,0.85)"
        : "rgba(255,255,255,0.85)"
      : "transparent",
     backdropFilter: "blur(12px)",
     borderBottom: scrolled
      ? `1px solid ${mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`
      : "none",
     transition: "background-color 0.3s ease, border-bottom 0.3s ease",
    }}
   >
    <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
     <Typography
      variant="h6"
      sx={{
       fontFamily: "'MyCustomFont', sans-serif",
       fontWeight: 700,
       letterSpacing: 1,
       color: scrolled ? (mode === "dark" ? "#fff" : "#000") : "#fff",
      }}
     >
      Ayush Kumar.
     </Typography>

     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {!isMobile && (
       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Globe
         size={18}
         color={scrolled ? (mode === "dark" ? "#fff" : "#000") : "#fff"}
         style={{ animation: `${rotate} 6s linear infinite` }}
        />
        <Typography
         variant="body2"
         sx={{ color: scrolled ? (mode === "dark" ? "#fff" : "#000") : "#fff" }}
        >
         IN {time}
        </Typography>
       </Box>
      )}

      {/* Dark / Light Toggle */}
      <Tooltip title={mode === "dark" ? "Light mode" : "Dark mode"}>
       <IconButton
        onClick={toggleColorMode}
        sx={{
         color: scrolled ? (mode === "dark" ? "#fff" : "#000") : "#fff",
         backgroundColor: scrolled
          ? (mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")
          : "rgba(255,255,255,0.08)",
         borderRadius: "50%",
         width: 38,
         height: 38,
         "&:hover": {
          backgroundColor: scrolled
           ? (mode === "dark" ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.16)")
           : "rgba(255,255,255,0.16)",
         },
         transition: "all 0.2s ease",
        }}
       >
        {mode === "dark" ? <Sun size={18} /> : <Moon size={18} />}
       </IconButton>
      </Tooltip>

      <Button
       variant="outlined"
       onClick={() => setDrawerOpen(true)}
       sx={{
        gap: 1,
        px: 2,
        py: 1,
        borderColor: scrolled
         ? (mode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)")
         : "rgba(255,255,255,0.5)",
        color: scrolled ? (mode === "dark" ? "#fff" : "#000") : "#fff",
        borderRadius: "9999px",
        backdropFilter: "blur(8px)",
        backgroundColor: scrolled
         ? (mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)")
         : "rgba(255,255,255,0.08)",
        textTransform: "none",
        fontFamily: "'MyCustomFont', sans-serif",
        "&:hover": {
         backgroundColor: scrolled
          ? (mode === "dark" ? "rgba(255,255,255,0.16)" : "rgba(0,0,0,0.12)")
          : "rgba(255,255,255,0.16)",
         borderColor: scrolled ? (mode === "dark" ? "#fff" : "#000") : "#fff",
        },
        transition: "all 0.2s ease",
       }}
      >
       Go to Menu
      </Button>
     </Box>
    </Toolbar>
   </AppBar>

   <MenuDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
  </>
 );
}
