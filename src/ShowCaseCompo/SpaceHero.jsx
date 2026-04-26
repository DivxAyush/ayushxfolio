"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";

function WireframeTerrain() {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * 0.4;
    const positionAttribute = meshRef.current.geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);

      // Create undulating terrain using sine waves
      const z = Math.sin(x * 0.2 + t) * Math.cos(y * 0.2 + t) * 2
        + Math.sin(x * 0.05 - t) * 4;

      positionAttribute.setZ(i, z);
    }
    positionAttribute.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2 + 0.1, 0, 0]} position={[0, -6, -10]}>
      <planeGeometry args={[100, 100, 80, 80]} />
      <meshBasicMaterial
        color="#ffffff"
        wireframe={true}
        transparent={true}
        opacity={0.4}
      />
    </mesh>
  );
}

function FloatingCoils() {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(clock.getElapsedTime() * 2 + i) * 0.01;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[
        { pos: [8, -2, -15], color: "#ff00ff" },
        { pos: [-10, 0, -20], color: "#00ffff" },
        { pos: [12, 3, -25], color: "#0088ff" },
      ].map((data, i) => (
        <mesh key={i} position={data.pos} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.05, 16, 100]} />
          <meshBasicMaterial color={data.color} wireframe transparent opacity={0.4} />
          {/* Create multiple rings to simulate a coil */}
          <mesh position={[0, 0, 0.5]}>
            <torusGeometry args={[0.8, 0.05, 16, 100]} />
            <meshBasicMaterial color={data.color} wireframe transparent opacity={0.4} />
          </mesh>
          <mesh position={[0, 0, 1]}>
            <torusGeometry args={[0.6, 0.05, 16, 100]} />
            <meshBasicMaterial color={data.color} wireframe transparent opacity={0.4} />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

function MouseParallaxGroup({ children }) {
  const groupRef = useRef();

  useFrame((state) => {
    const { mouse } = state;
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (mouse.y * Math.PI) / 30,
        0.05
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        (mouse.x * Math.PI) / 30,
        0.05
      );
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        (mouse.x * 2),
        0.05
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        (mouse.y * 2),
        0.05
      );
    }
  });

  return <group ref={groupRef}>{children}</group>;
}


function TerminalModal({ isOpen, onClose, chatHistory, onAsk, isTyping }) {
  const [input, setInput] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const endRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [chatHistory, isTyping, isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      onWheel={(e) => e.stopPropagation()} 
      onTouchMove={(e) => e.stopPropagation()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)"
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        style={{
          width: "95%",
          maxWidth: "700px",
          height: "85vh",
          maxHeight: "700px",
          background: "rgba(15, 15, 18, 0.95)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* macOS Top Bar */}
        <div style={{
          height: "36px",
          background: "rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: "8px"
        }}>
          <div 
            onClick={onClose} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5f56", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {isHovered && <span style={{ color: "#4d0000", fontSize: "10px", fontWeight: "bold", lineHeight: 1, marginTop: "-1px" }}>✕</span>}
          </div>
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ffbd2e" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#27c93f" }} />
          <div style={{ flex: 1, textAlign: "center", fontSize: "13px", color: "#888", fontFamily: "sans-serif", marginLeft: "-40px" }}>
            ayush_ai_terminal ~ zsh
          </div>
        </div>

        {/* Chat Area */}
        <div 
          data-lenis-prevent="true"
          style={{
            flex: 1,
            padding: "20px",
            overflowY: "auto",
            minHeight: 0,
            fontFamily: "monospace",
            fontSize: "0.95rem",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            color: "#d4d4d4"
          }}
        >
          <div style={{ color: "#4af626", marginBottom: "10px", lineHeight: 1.5, flexShrink: 0 }}>
            Welcome to AyushOS v1.0.0 (AI Assistant)<br/>
            Type your questions below.
          </div>
          
          {chatHistory.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.type === 'q' ? "flex-end" : "flex-start",
              color: msg.type === 'q' ? "#fff" : "#a1a1aa",
              background: msg.type === 'q' ? "rgba(255,255,255,0.1)" : "transparent",
              padding: msg.type === 'q' ? "8px 14px" : "0",
              borderRadius: "8px",
              maxWidth: "85%",
              lineHeight: 1.6,
              flexShrink: 0
            }}>
              {msg.type === 'q' ? msg.text : `🤖 ${msg.text}`}
            </div>
          ))}
          {isTyping && (
            <div style={{ alignSelf: "flex-start", color: "#a1a1aa", flexShrink: 0 }}>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>🤖 typing...</motion.span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: "16px 20px",
          background: "rgba(0,0,0,0.3)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <span style={{ color: "#4af626", fontFamily: "monospace", fontSize: "1rem" }}>➜</span>
          <span style={{ color: "#56b6c2", fontFamily: "monospace", fontSize: "1rem" }}>~</span>
          <input 
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                onAsk(input);
                setInput("");
              }
            }}
            placeholder="Ask AI anything..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#fff",
              fontFamily: "monospace",
              fontSize: "1rem"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function SpaceHero({ startAnimation = true }) {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, 200]);
  const opacityFade = useTransform(scrollY, [0, 500], [1, 0]);

  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAsk = async (question) => {
    if (!question.trim()) return;
    setInputValue("");
    
    // Open modal if not already open and there is already chat history (meaning this is the 2nd question)
    if (chatHistory.length >= 2 && !isModalOpen) {
      setIsModalOpen(true);
    }

    setChatHistory(prev => [...prev, { type: 'q', text: question }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question, history: chatHistory })
      });
      
      const data = await response.json();
      if (data.answer) {
        setChatHistory(prev => [...prev, { type: 'a', text: data.answer }]);
      } else {
        setChatHistory(prev => [...prev, { type: 'a', text: "Error: " + (data.error || "Failed to get response") }]);
      }
    } catch (err) {
      setChatHistory(prev => [...prev, { type: 'a', text: "Network error while connecting to AI." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section
      id="section-home"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* Subtle vignette glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 50% 50%, rgba(10,20,40,0.1) 0%, rgba(0,0,0,0.8) 100%)",
        zIndex: 1,
        pointerEvents: "none"
      }} />

      {/* WebGL Canvas Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <fog attach="fog" args={["#000000", 15, 70]} />
          <MouseParallaxGroup>
            <WireframeTerrain />
            <FloatingCoils />
          </MouseParallaxGroup>
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 clamp(1.5rem, 8vw, 10%)",
          y: yParallax,
          opacity: opacityFade,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p style={{
            fontFamily: "monospace",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "1.5rem",
            fontSize: "clamp(0.8rem, 1.5vw, 1rem)"
          }}>
            FULL STACK DEVELOPER
          </p>
          <h1 style={{
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 800,
            color: "#ffffff",
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            fontFamily: "'Inter', sans-serif"
          }}>
            Ayush Kumar.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
        >
          <p style={{
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "600px",
            marginTop: "2rem",
            lineHeight: 1.6,
            fontWeight: 300,
            fontFamily: "'Inter', sans-serif",
          }}>
            Production interfaces that stay fast, consistent, and faithful to design.
            I own the UI path from structure to release.
          </p>
        </motion.div>

        {/* Input box similar to mhdyousuf.me */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" }}
        >
          <div style={{
            position: "relative",
            width: "100%",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "4px",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(4px)",
            padding: "2px"
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAsk(inputValue);
              }}
              placeholder="Ask something specific..."
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                padding: "16px 20px",
                fontSize: "1rem",
                fontFamily: "monospace"
              }}
            />
            <div 
              onClick={() => handleAsk(inputValue)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer"
              }}>
              →
            </div>
          </div>
          
          {/* Chat History Inline */}
          {chatHistory.length > 0 && !isModalOpen && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "8px",
              maxHeight: "150px",
              overflowY: "auto",
              padding: "12px",
              background: "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.2) transparent"
            }}>
              {chatHistory.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.type === 'q' ? "flex-end" : "flex-start",
                  color: msg.type === 'q' ? "#fff" : "rgba(255,255,255,0.7)",
                  background: msg.type === 'q' ? "rgba(255,255,255,0.1)" : "transparent",
                  padding: msg.type === 'q' ? "4px 8px" : "0",
                  borderRadius: "4px",
                  maxWidth: "90%"
                }}>
                  {msg.type === 'q' ? `> ${msg.text}` : msg.text}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: "flex-start", color: "rgba(255,255,255,0.5)" }}>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>...</motion.span>
                </div>
              )}
            </div>
          )}

          {/* Suggestion Tags */}
          {chatHistory.length === 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["Stack and tooling?", "Enterprise / scale?", "Taking new work?"].map((text, i) => (
                <button 
                  key={i} 
                  onClick={() => handleAsk(text)}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)",
                    padding: "6px 12px",
                    borderRadius: "50px",
                    fontSize: "0.8rem",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)" }}
                  onMouseOut={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)" }}
                >
                  {text}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      <TerminalModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setChatHistory([]);
        }} 
        chatHistory={chatHistory} 
        onAsk={handleAsk} 
        isTyping={isTyping} 
      />
    </section>
  );
}
