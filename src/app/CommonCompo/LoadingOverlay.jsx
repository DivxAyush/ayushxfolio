"use client";

import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingOverlay({ isLoading }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#121212",
            zIndex: 1300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            userSelect: "none",
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            style={{
              border: "4px solid white",
              borderTop: "4px solid transparent",
              borderRadius: "50%",
              width: 40,
              height: 40,
            }}
          />
          <Typography sx={{ ml: 2, fontWeight: "bold" }}>Loading...</Typography>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
