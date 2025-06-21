"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Moon, SunDim } from "lucide-react";

export default function Header({ mode, toggleColorMode }) {
 return (
  <AppBar position="sticky">
   <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography variant="h6" component="div">
     Ayush Kumar.Y
    </Typography>
    {/* ayush test */}
    <div>
     <Button color="inherit" href="#about">
      About
     </Button>

     <Button color="inherit" href="#about">
      Project
     </Button>
     <Button color="inherit">Let's Connect</Button>

     <IconButton
      sx={{ ml: 1 }}
      color="inherit"
      onClick={toggleColorMode}
      aria-label="toggle dark mode"
     >
      {mode === "dark" ? <SunDim /> : <Moon />}
     </IconButton>
    </div>
   </Toolbar>
  </AppBar>
 );
}
