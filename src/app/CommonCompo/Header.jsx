"use client";

import React, { useEffect, useState } from "react";
import {
 AppBar,
 Toolbar,
 Typography,
 Button,
 IconButton,
 Box,
 Drawer,
 List,
 ListItem,
 ListItemText,
 useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Moon, SunDim, Globe } from "lucide-react";
import { useTheme, keyframes } from "@mui/material/styles";

export default function Header({ mode, toggleColorMode }) {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const [drawerOpen, setDrawerOpen] = useState(false);
 const [time, setTime] = useState("");



 // Update time in IST
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
   const formattedTime = formatter.format(now);
   setTime(formattedTime);
  };

  updateTime();
  const interval = setInterval(updateTime, 60000);
  return () => clearInterval(interval);
 }, []);

 const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
 `;

 const toggleDrawer = (open) => () => setDrawerOpen(open);

 const navLinks = [
  { label: "About", href: "#about" },
  { label: "Project", href: "#project" },
  { label: "Let's Connect", href: "#contact" },
 ];

 return (
  <>
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

     {/* Desktop: Center Nav */}
     {!isMobile && (
      <>
       <Box sx={{ flexGrow: 2, display: "flex", gap: 2, justifyContent: "center", alignItems: "center" }}>
        {navLinks.map((item) => (
         <Button key={item.label} color="inherit" href={item.href}>
          {item.label}
         </Button>
        ))}
        <IconButton
         color="inherit"
         onClick={toggleColorMode}
         aria-label="toggle dark mode"
        >
         {mode === "dark" ? <SunDim /> : <Moon />}
        </IconButton>
       </Box>

       {/* Right: Time */}
       <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center", gap: 1 }}>
        <Globe
         size={18}
         sx={{
          animation: `${rotate} 6s linear infinite`,
          transformOrigin: "center",
         }}
        />
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
         IN {time}
        </Typography>
       </Box>

      </>
     )}

     {/* Mobile: Hamburger Menu */}
     {isMobile && (
      <>
       <IconButton
        color="inherit"
        edge="end"
        onClick={toggleDrawer(true)}
        aria-label="menu"
       >
        <MenuIcon />
       </IconButton>

       <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
         sx={{ width: 250 }}
         role="presentation"
         onClick={toggleDrawer(false)}
         onKeyDown={toggleDrawer(false)}
        >
         <List>
          {navLinks.map((item) => (
           <ListItem button component="a" href={item.href} key={item.label}>
            <ListItemText primary={item.label} />
           </ListItem>
          ))}

          <ListItem>
           <IconButton
            color="inherit"
            onClick={toggleColorMode}
            aria-label="toggle dark mode"
           >
            {mode === "dark" ? <SunDim /> : <Moon />}
           </IconButton>
          </ListItem>

          <ListItem>
           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Globe
             size={18}
             style={{
              animation: `${rotate} 6s linear infinite`,
              transformOrigin: "center",
             }}
            />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
             IN {time}
            </Typography>
           </Box>
          </ListItem>
         </List>
        </Box>
       </Drawer>
      </>
     )}
    </Toolbar>
   </AppBar>
  </>
 );
}
