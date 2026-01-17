"use client";

import React, { useEffect, useState } from "react";
import {
 AppBar,
 Toolbar,
 Typography,
 IconButton,
 Box,
 Drawer,
 useMediaQuery,
 Button,
} from "@mui/material";
import { useTheme, keyframes } from "@mui/material/styles";
import { Globe } from "lucide-react";
import YourSvgIcon from "../../../public/assets/image/imgi_1_menu.svg"; // replace with your actual SVG path
import Image from "next/image";

export default function Header() {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const [drawerOpen, setDrawerOpen] = useState(false);
 const [time, setTime] = useState("");

 useEffect(() => {
  const updateTime = () => {
   const now = new Date();
   const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
   };
   const formatter = new Intl.DateTimeFormat("en-IN", options);
   setTime(formatter.format(now));
  };

  updateTime();
  const interval = setInterval(updateTime, 60000);
  return () => clearInterval(interval);
 }, []);

 const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
 `;

 return (
  <AppBar
   position="sticky"
   elevation={0}
   sx={{
    backgroundColor: "transparent",
    backdropFilter: "blur(8px)",
    boxShadow: "none",
   }}
  >
   <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
    {/* Left: Logo */}
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
     Ayush Kumar.
    </Typography>

    {/* Right: Time + Button */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Globe
       size={18}
       sx={{ animation: `${rotate} 6s linear infinite`, transformOrigin: "center" }}
      />
      <Typography variant="body2" sx={{ fontWeight: 500 }}>
       IN {time}
      </Typography>
     </Box>

     <Button
      variant="outlined"
      sx={{
       display: "flex",
       alignItems: "center",
       gap: 1,
       px: 2,
       py: 1,
       borderColor: "white",
       color: "white",
       borderRadius: "9999px",
       backdropFilter: "blur(8px)",
       backgroundColor: "rgba(255, 255, 255, 0.1)",
       textTransform: "none",
       fontWeight: 500,
       fontSize: "0.875rem",
      }}
     >
      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation-icon lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
      Go to Menu
     </Button>
    </Box>
   </Toolbar>
  </AppBar>
 );
}
