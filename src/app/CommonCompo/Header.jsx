"use client";

import React, { useEffect, useState } from "react";
import {
 AppBar,
 Toolbar,
 Typography,
 Box,
 Button,
 useMediaQuery,
} from "@mui/material";
import { useTheme, keyframes } from "@mui/material/styles";
import { Globe } from "lucide-react";
import MenuDrawer from "./MenuDrawer";

export default function Header() {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const [drawerOpen, setDrawerOpen] = useState(false);
 const [time, setTime] = useState("");

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

 const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
 `;

 return (
  <>
   <AppBar
    position="sticky"
    elevation={0}
    sx={{
     backgroundColor: "transparent",
     backdropFilter: "blur(8px)",
    }}
   >
    <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 } }}>
     <Typography variant="h6">Ayush Kumar.</Typography>

     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {!isMobile && (
       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Globe
         size={18}
         style={{ animation: `${rotate} 6s linear infinite` }}
        />
        <Typography variant="body2">IN {time}</Typography>
       </Box>
      )}

      <Button
       variant="outlined"
       onClick={() => setDrawerOpen(true)}
       sx={{
        gap: 1,
        px: 2,
        py: 1,
        borderColor: "white",
        color: "white",
        borderRadius: "9999px",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255,255,255,0.1)",
        textTransform: "none",
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
