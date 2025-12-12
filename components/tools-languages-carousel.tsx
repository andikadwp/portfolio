"use client"

import { useRef, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

// Programming tools logos
const tools = [
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Visual Studio Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "npm", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
  { name: "Postman", src: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
]

// Programming languages logos
const languages = [
  { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "PHP", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "HTML", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Laravel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
  { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Redis", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
  { name: "Tailwind CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
]

// Duplicate for seamless infinite scroll
const duplicatedTools = [...tools, ...tools, ...tools]
const duplicatedLanguages = [...languages, ...languages, ...languages]

export default function ToolsLanguagesCarousel() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Create two separate refs for the two rows
  const toolsRowRef = useRef<HTMLDivElement>(null)
  const languagesRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const toolsRow = toolsRowRef.current
    const languagesRow = languagesRowRef.current
    if (!toolsRow || !languagesRow) return

    let toolsPosition = 0
    let languagesPosition = languagesRow.scrollWidth / 3 // Start at the middle for the languages row

    const toolsSpeed = 0.5
    const languagesSpeed = 0.5

    // Animation for tools row (left to right)
    const animateToolsRow = () => {
      toolsPosition += toolsSpeed
      if (toolsPosition >= toolsRow.scrollWidth / 3) {
        toolsPosition = 0
      }
      toolsRow.scrollLeft = toolsPosition
      requestAnimationFrame(animateToolsRow)
    }

    // Animation for languages row (right to left)
    const animateLanguagesRow = () => {
      languagesPosition -= languagesSpeed
      if (languagesPosition <= 0) {
        languagesPosition = languagesRow.scrollWidth / 3
      }
      languagesRow.scrollLeft = languagesPosition
      requestAnimationFrame(animateLanguagesRow)
    }

    const toolsAnimation = requestAnimationFrame(animateToolsRow)
    const languagesAnimation = requestAnimationFrame(animateLanguagesRow)

    return () => {
      cancelAnimationFrame(toolsAnimation)
      cancelAnimationFrame(languagesAnimation)
    }
  }, [])

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400"
          >
            Development Tools
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/70 sm:text-4xl"
          >
            My Favorite Tools
          </motion.h3>
        </div>
      </div>

      <div>
        {/* Tools row - left to right */}
        <div className="relative w-full overflow-hidden">
          {/* Fade edges - removed left fade to fix black area */}
          {/* <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 dark:from-black to-transparent"></div> */}

          {/* Scrolling container */}
          <div ref={toolsRowRef} className="flex w-full overflow-x-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
            <div className="flex gap-16 py-8 px-16">
              {duplicatedTools.map((tool, index) => (
                <div
                  key={`${tool.name}-${index}`}
                  className="flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center"
                >
                  <img
                    src={tool.src || "/placeholder.svg"}
                    alt={tool.name}
                    className="h-12 w-12 object-contain transition-all duration-300"
                    style={{
                      filter: mounted && isDark && tool.name === "GitHub" ? "invert(1)" : "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Languages row - right to left */}
        <div className="relative w-full overflow-hidden">
          {/* Fade edges - removed left fade to fix black area */}
          {/* <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 dark:from-black to-transparent"></div> */}

          {/* Scrolling container */}
          <div
            ref={languagesRowRef}
            className="flex w-full overflow-x-hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex gap-16 py-8 px-16">
              {duplicatedLanguages.map((language, index) => (
                <div
                  key={`${language.name}-${index}`}
                  className="flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center"
                >
                  <img
                    src={language.src || "/placeholder.svg"}
                    alt={language.name}
                    className="h-12 w-12 object-contain transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
