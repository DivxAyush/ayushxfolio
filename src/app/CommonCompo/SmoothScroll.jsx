"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
 useEffect(() => {
  const lenis = new Lenis({
   duration: 1.4,                              // scroll inertia duration
   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
   orientation: "vertical",
   smoothWheel: true,
   wheelMultiplier: 0.9,                       // wheel sensitivity
   touchMultiplier: 1.8,                       // touch sensitivity
   infinite: false,
  });

  // ✅ Make Lenis globally accessible (for menu navigation)
  window.__lenis = lenis;

  // ✅ Sync GSAP ScrollTrigger with Lenis scroll position
  lenis.on("scroll", ScrollTrigger.update);

  // ✅ Drive Lenis through GSAP's ticker (frame-perfect sync)
  const tickerFn = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return () => {
   lenis.destroy();
   gsap.ticker.remove(tickerFn);
   delete window.__lenis;
  };
 }, []);

 return <>{children}</>;
}
