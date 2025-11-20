"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { useTheme } from "next-themes"

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20"
    >
      {/* Light theme liquid glass effect */}
      {!isDark && (
        <>
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-violet-200/30 blur-3xl" />
          <div className="absolute top-1/2 right-1/3 h-40 w-40 rounded-full bg-blue-200/20 blur-2xl" />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 inline-block rounded-full bg-gradient-to-r from-sky-400 to-violet-500 p-1"
        >
          <div className="rounded-full bg-white px-4 py-1.5 text-sm font-medium text-slate-800 dark:bg-black dark:text-white">
            Full-Stack Developer
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-white dark:to-sky-300 sm:text-6xl md:text-7xl"
        >
        <span className="block">Creating Digital</span>
        <span className="block">Experiences</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mx-auto mb-10 max-w-lg text-lg text-slate-600 dark:text-white/70"
        >
          I build modern, responsive web applications with cutting-edge technologies and pixel-perfect design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group relative inline-flex h-12 overflow-hidden rounded-full bg-gradient-to-r from-sky-400 to-violet-500 p-[1px] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-white px-8 py-1 text-sm font-medium text-slate-800 backdrop-blur-3xl transition-all duration-300 group-hover:bg-white/80 dark:bg-black dark:text-white dark:group-hover:bg-black/80">
              Get in touch
            </span>
          </a>

          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white/50 px-8 py-1 text-sm font-medium text-slate-800 backdrop-blur-sm transition-all duration-300 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
          >
            View projects
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
          <ArrowDown className="h-6 w-6 text-slate-400 dark:text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
