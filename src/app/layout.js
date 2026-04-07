"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Header from "./CommonCompo/Header";
import SmoothScroll from "./CommonCompo/SmoothScroll";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "../app/globals.css";
import { ThemeContext } from "./context/ThemeContext";

const THEME_INIT_SCRIPT = `
(() => {
  try {
    const savedMode = localStorage.getItem("mode");
    const mode = savedMode === "light" || savedMode === "dark" ? savedMode : "dark";
    document.documentElement.setAttribute("data-theme", mode);
  } catch (error) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
`;

export default function RootLayout({ children }) {
 const [mode, setMode] = useState(() => {
  if (typeof window === "undefined") {
   return "dark";
  }

  const savedMode = window.localStorage.getItem("mode");
  if (savedMode === "light" || savedMode === "dark") {
   return savedMode;
  }

  const htmlMode = document.documentElement.getAttribute("data-theme");
  return htmlMode === "light" || htmlMode === "dark" ? htmlMode : "dark";
 });

 useEffect(() => {
  const savedMode = window.localStorage.getItem("mode");
  if (savedMode === "light" || savedMode === "dark") {
   setMode(savedMode);
  } else {
   setMode("dark");
  }
 }, []);

 // Apply data-theme attribute on <html> for CSS variable switching
 useEffect(() => {
  document.documentElement.setAttribute("data-theme", mode);
 }, [mode]);

 const theme = useMemo(
  () =>
   createTheme({
    palette: {
     mode,
     ...(mode === "light"
      ? {
         background: { default: "#f5f5f5", paper: "#ffffff" },
         text: { primary: "#0f0f0f", secondary: "rgba(0,0,0,0.65)" },
        }
      : {
         background: { default: "#000000", paper: "#0a0a0a" },
         text: { primary: "#ffffff", secondary: "rgba(255,255,255,0.7)" },
        }),
    },
    typography: {
     fontFamily: "'MyCustomFont', sans-serif",
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
  <html lang="en" data-theme={mode} suppressHydrationWarning>
   <head>
    <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
   </head>
   <body>
    <ThemeContext.Provider value={{ mode, toggleColorMode }}>
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <SpeedInsights />
      <Analytics />
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <SmoothScroll>
       {children}
      </SmoothScroll>
     </ThemeProvider>
    </ThemeContext.Provider>
   </body>
  </html>
 );
}
