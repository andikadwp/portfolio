"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function BackgroundEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      // Calculate mouse position as percentage of screen
      const x = clientX / innerWidth
      const y = clientY / innerHeight

      // Update CSS variables for gradient position
      containerRef.current.style.setProperty("--mouse-x", `${x}`)
      containerRef.current.style.setProperty("--mouse-y", `${y}`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Generate static stars
  const staticStars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 0.5 + Math.random() * 1.5,
    opacity: 0.3 + Math.random() * 0.7,
    twinkleDelay: Math.random() * 5,
  }))

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden"
      style={
        {
          "--mouse-x": "0.5",
          "--mouse-y": "0.5",
        } as React.CSSProperties
      }
    >
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(
          circle at calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%), 
          ${isDark ? "rgba(14, 165, 233, 0.3)" : "rgba(14, 165, 233, 0.4)"}, 
          ${isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.3)"}, 
          transparent 40%
        )`,
        }}
      />

      {/* Galaxy nebula effect */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl ${
            isDark
              ? "bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20"
              : "bg-gradient-to-r from-purple-200/30 via-blue-200/30 to-indigo-200/30"
          }`}
          style={{
            animation: "float 20s ease-in-out infinite",
          }}
        />
        <div
          className={`absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-3xl ${
            isDark
              ? "bg-gradient-to-r from-pink-900/20 via-violet-900/20 to-purple-900/20"
              : "bg-gradient-to-r from-pink-200/30 via-violet-200/30 to-purple-200/30"
          }`}
          style={{
            animation: "float 25s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Static stars */}
      <div className="absolute inset-0">
        {staticStars.map((star) => (
          <motion.div
            key={`static-${star.id}`}
            className={`absolute rounded-full ${isDark ? "bg-white" : "bg-slate-400"}`}
            style={{
              width: star.size,
              height: star.size,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: star.twinkleDelay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Liquid glass effect - light theme only */}
      {!isDark && (
        <div className="absolute inset-0">
          <div
            className="absolute rounded-full bg-gradient-to-r from-sky-300/50 to-violet-300/50 blur-3xl"
            style={{
              top: `calc(var(--mouse-y) * 100% - 200px)`,
              left: `calc(var(--mouse-x) * 100% - 200px)`,
              width: "400px",
              height: "400px",
              opacity: 0.6,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute rounded-full bg-gradient-to-r from-blue-300/40 to-purple-300/40 blur-3xl"
            style={{
              bottom: `calc((1 - var(--mouse-y)) * 100% - 150px)`,
              right: `calc((1 - var(--mouse-x)) * 100% - 150px)`,
              width: "300px",
              height: "300px",
              opacity: 0.5,
              transform: "translate(50%, 50%)",
            }}
          />
        </div>
      )}

      {/* Subtle grid pattern */}
      <div
        className={`absolute inset-0 ${isDark ? "opacity-5" : "opacity-10"}`}
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(100,116,139,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(100,116,139,0.1) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles for extra galaxy effect */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full ${isDark ? "bg-white" : "bg-slate-500/70"}`}
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 8 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
    </div>
  )
}
