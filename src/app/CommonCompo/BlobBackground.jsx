"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";

export default function BlobBackground() {
  const blobRef = useRef(null);

  useEffect(() => {
    anime({
      targets: blobRef.current,
      d: [
        {
          value:
            "M58.1,-65.5C73.5,-49.2,83.6,-24.6,80.3,-3.5C77.1,17.6,60.4,35.2,45,50.4C29.6,65.6,14.8,78.4,-4.5,82.9C-23.8,87.4,-47.6,83.5,-60.1,69.2C-72.6,54.9,-73.8,30.1,-72.3,7.4C-70.8,-15.4,-66.6,-36,-54.2,-52.1C-41.9,-68.1,-20.9,-79.6,1.3,-81C23.4,-82.5,46.9,-73.8,58.1,-65.5Z",
        },
        {
          value:
            "M47.5,-61.3C61.4,-53.1,72.9,-38.4,74.2,-23.1C75.6,-7.9,66.9,7.9,59.4,25.4C51.8,42.9,45.4,62.1,31.5,72.3C17.7,82.5,-3.7,83.8,-22.7,76.5C-41.6,69.1,-58.1,53,-62.7,35.5C-67.2,18,-59.9,-1.9,-54.1,-23.6C-48.3,-45.3,-43.9,-68.9,-29.7,-76.4C-15.5,-83.9,8.5,-75.5,29.6,-66.4C50.7,-57.4,69.9,-47.7,47.5,-61.3Z",
        },
      ],
      easing: "easeInOutQuad",
      duration: 8000,
      direction: "alternate",
      loop: true,
    });
  }, []);

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "fixed",
        top: "-20%",
        left: "-20%",
        zIndex: -1,
        width: "140vw",
        height: "140vh",
        opacity: 0.1,
        pointerEvents: "none",
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        ref={blobRef}
        fill="#00FFFF"
        d="M58.1,-65.5C73.5,-49.2,83.6,-24.6,80.3,-3.5C77.1,17.6,60.4,35.2,45,50.4C29.6,65.6,14.8,78.4,-4.5,82.9C-23.8,87.4,-47.6,83.5,-60.1,69.2C-72.6,54.9,-73.8,30.1,-72.3,7.4C-70.8,-15.4,-66.6,-36,-54.2,-52.1C-41.9,-68.1,-20.9,-79.6,1.3,-81C23.4,-82.5,46.9,-73.8,58.1,-65.5Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
