"use client";

/**
 * GSAP Smooth Scroll + ScrollTrigger setup
 * Import and call initGSAP() once in your layout or page (client-side only).
 */

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Smooth scroll to a section by id
export function scrollToSection(id) {
 const el = document.getElementById(id);
 if (!el) return;
 gsap.to(window, {
  duration: 1.2,
  scrollTo: { y: el, offsetY: 64 },
  ease: "power3.inOut",
 });
}

// Hook — call inside any component to set up GSAP scroll animations
export function useGSAPScrollAnimations() {
 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Select all elements with data-gsap attribute
  const elements = document.querySelectorAll("[data-gsap='fade-up']");
  elements.forEach((el) => {
   gsap.fromTo(
    el,
    { opacity: 0, y: 60 },
    {
     opacity: 1,
     y: 0,
     duration: 0.9,
     ease: "power3.out",
     scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
     },
    }
   );
  });

  // Stagger children with data-gsap="stagger-up"
  const staggerContainers = document.querySelectorAll("[data-gsap='stagger-up']");
  staggerContainers.forEach((container) => {
   const children = container.children;
   gsap.fromTo(
    children,
    { opacity: 0, y: 40 },
    {
     opacity: 1,
     y: 0,
     duration: 0.7,
     ease: "power3.out",
     stagger: 0.1,
     scrollTrigger: {
      trigger: container,
      start: "top 85%",
      toggleActions: "play none none none",
     },
    }
   );
  });

  // Horizontal slide-in for data-gsap="slide-left"
  const slideLeftEls = document.querySelectorAll("[data-gsap='slide-left']");
  slideLeftEls.forEach((el) => {
   gsap.fromTo(
    el,
    { opacity: 0, x: 60 },
    {
     opacity: 1,
     x: 0,
     duration: 0.9,
     ease: "power3.out",
     scrollTrigger: {
      trigger: el,
      start: "top 88%",
      toggleActions: "play none none none",
     },
    }
   );
  });

  // Section heading scale animation
  const headings = document.querySelectorAll("[data-gsap='heading']");
  headings.forEach((el) => {
   gsap.fromTo(
    el,
    { opacity: 0, y: 50, scale: 0.96 },
    {
     opacity: 1,
     y: 0,
     scale: 1,
     duration: 1,
     ease: "expo.out",
     scrollTrigger: {
      trigger: el,
      start: "top 90%",
      toggleActions: "play none none none",
     },
    }
   );
  });

  return () => {
   ScrollTrigger.getAll().forEach((t) => t.kill());
  };
 }, []);
}

export { gsap, ScrollTrigger };
