import { useEffect, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useScrambleText(text = "", duration = 1000, intervalSpeed = 50) {
 const [displayText, setDisplayText] = useState("");

 useEffect(() => {
  let timeout;
  let frame = 0;
  let output = "";
  const maxFrame = Math.floor(duration / intervalSpeed);

  function scramble() {
   output = "";
   for (let i = 0; i < text.length; i++) {
    if (frame >= maxFrame) {
     output += text[i];
    } else {
     const shouldReveal = Math.random() < frame / maxFrame;
     output += shouldReveal ? text[i] : characters[Math.floor(Math.random() * characters.length)];
    }
   }

   setDisplayText(output);

   if (frame < maxFrame) {
    frame++;
    timeout = setTimeout(scramble, intervalSpeed);
   }
  }

  scramble();

  return () => clearTimeout(timeout);
 }, [text, duration, intervalSpeed]);

 return displayText;
}
