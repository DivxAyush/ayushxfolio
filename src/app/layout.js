"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Header from "./CommonCompo/Header";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }) {
 const [mode, setMode] = useState("light");

 useEffect(() => {
  const savedMode = localStorage.getItem("mode");
  if (savedMode === "light" || savedMode === "dark") {
   setMode(savedMode);
  } else {
   const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
   setMode(prefersDark ? "dark" : "light");
  }
 }, []);

 const theme = useMemo(
  () =>
   createTheme({
    palette: {
     mode,
    },
    typography: {
     fontFamily: "'Inter', sans-serif",  // <-- Use Inter here
    },
   }),
  [mode]
 );

 const toggleColorMode = () => {
  setMode((prev) => {
   const newMode = prev === "light" ? "dark" : "light";
   localStorage.setItem("mode", newMode);
   return newMode;
  });
 };

 return (
  <html lang="en">
   <head>
    {/* Add Google Fonts link here */}
    <link
     href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
     rel="stylesheet"
    />
   </head>
   <body>
    <ThemeProvider theme={theme}>
     <CssBaseline />
     <SpeedInsights/>
     <Header mode={mode} toggleColorMode={toggleColorMode} />
     {children}
    </ThemeProvider>
   </body>
  </html>
 );
}
