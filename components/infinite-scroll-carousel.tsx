"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

// Programming tools logos
const tools = [
  { name: "Visual Studio Code", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
  { name: "Git", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "npm", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" },
  { name: "Webpack", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg" },
  { name: "Babel", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg" },
  { name: "ESLint", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg" },
  { name: "Jest", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
  { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
]

// Duplicate logos for seamless infinite scroll
const duplicatedTools = [...tools, ...tools, ...tools]

export default function InfiniteScrollCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const scrollContainer = carouselRef.current
    if (!scrollContainer) return

    let animationId: number
    let position = 0
    const speed = 0.5 // pixels per frame

    const scroll = () => {
      position += speed

      // Reset position when we've scrolled the width of the original set of logos
      const firstSetWidth = scrollContainer.scrollWidth / 3
      if (position >= firstSetWidth) {
        position = 0
      }

      scrollContainer.scrollLeft = position
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section id="tools" className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400">
            Development Tools
          </h2>
          <h3 className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/70 sm:text-4xl">
            My Favorite Tools
          </h3>
        </div>
      </div>

      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-50 dark:from-black to-transparent"></div>
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 dark:from-black to-transparent"></div>

        {/* Scrolling container */}
        <div ref={carouselRef} className="flex w-full overflow-x-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
          <div className="flex gap-16 py-8">
            {duplicatedTools.map((tool, index) => (
              <div
                key={`${tool.name}-${index}`}
                className="flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center"
              >
                <img
                  src={tool.src || "/placeholder.svg"}
                  alt={tool.name}
                  width={48}
                  height={48}
                  className={`h-12 w-12 object-contain transition-all duration-300 ${
                    isDark ? "brightness-100" : "brightness-100"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
