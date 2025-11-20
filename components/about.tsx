"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  return (
    <section id="about" ref={containerRef} className="relative py-20">
      {/* Light theme liquid glass effect */}
      {!isDark && (
        <>
          <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-sky-100/40 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 h-48 w-48 rounded-full bg-violet-100/30 blur-2xl" />
        </>
      )}

      <div className="container mx-auto px-4">
        <motion.div style={{ opacity, scale }} className="grid gap-12 md:grid-cols-2 md:gap-8 lg:gap-16">
          <div className="relative order-2 md:order-1">
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
              <div
                className={`absolute inset-0 rounded-2xl ${
                  isDark
                    ? "bg-gradient-to-br from-sky-400/20 to-violet-500/20"
                    : "bg-gradient-to-br from-sky-200/30 to-violet-200/30"
                } backdrop-blur-sm`}
              />
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Profile"
                width={600}
                height={800}
                className="h-full w-full object-cover opacity-90"
              />
              <div
                className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${
                  isDark ? "ring-white/10" : "ring-slate-200/50"
                }`}
              />
            </div>

            <div className="absolute -bottom-6 -right-6 h-40 w-40 rounded-2xl bg-gradient-to-br from-sky-400 to-violet-500 p-1">
              <div className={`h-full w-full rounded-2xl ${isDark ? "bg-black" : "bg-white"} p-4`}>
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className={`text-4xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>5+</div>
                  <div className={`text-sm ${isDark ? "text-white/70" : "text-slate-600"}`}>Years of Experience</div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 flex flex-col justify-center md:order-2">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400">
              About Me
            </h2>
            <h3 className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/70 sm:text-4xl">
              Crafting digital experiences with passion and precision
            </h3>

            <div className="mb-8 space-y-4 text-lg text-slate-600 dark:text-white/70">
              <p>
                I'm a full-stack developer with a passion for creating beautiful, functional, and user-friendly web
                applications. With over 5 years of experience in the industry, I've worked on a wide range of projects
                from small business websites to large-scale enterprise applications.
              </p>
              <p>
                My expertise includes React, Next.js, TypeScript, and modern CSS frameworks like Tailwind. I'm also
                experienced with backend technologies including Node.js, Python, and various database systems.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS"].map((tech) => (
                <span
                  key={tech}
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    isDark
                      ? "bg-white/10 text-white/70"
                      : "bg-white/70 text-slate-700 shadow-sm backdrop-blur-sm border border-slate-200/50"
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
