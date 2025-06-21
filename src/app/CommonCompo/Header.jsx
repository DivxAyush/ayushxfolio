"use client";

import React, { useState } from "react";
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
import { Moon, SunDim } from "lucide-react";
import { useTheme } from "@mui/material/styles";

export default function Header({ mode, toggleColorMode }) {
 const theme = useTheme();
 const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 const [drawerOpen, setDrawerOpen] = useState(false);

 const toggleDrawer = (open) => () => {
  setDrawerOpen(open);
 };

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
   
    <Toolbar sx={{ justifyContent: "space-between" }}>
     <Typography variant="h6" component="div">
      Ayush Kumar.Y
     </Typography>

     {/* Desktop Menu */}
     {!isMobile && (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mx: "auto" }}>
       {navLinks.map((item) => (
        <Button key={item.label} color="inherit" href={item.href}>
         {item.label}
        </Button>
       ))}
       <IconButton
        sx={{ ml: 1 }}
        color="inherit"
        onClick={toggleColorMode}
        aria-label="toggle dark mode"
       >
        {mode === "dark" ? <SunDim /> : <Moon />}
       </IconButton>
      </Box>
     )}

     {/* Mobile Hamburger Menu */}
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
