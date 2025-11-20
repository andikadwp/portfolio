"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

// Programming languages and technologies with their logos
const technologies = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    category: "Language",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178C6",
    category: "Language",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61DAFB",
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    color: "#000000",
    category: "Frontend",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#339933",
    category: "Backend",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776AB",
    category: "Language",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E34F26",
    category: "Frontend",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#1572B6",
    category: "Frontend",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    color: "#06B6D4",
    category: "Frontend",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "#47A248",
    category: "Database",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#4169E1",
    category: "Database",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#2496ED",
    category: "DevOps",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    color: "#F05032",
    category: "Tool",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    color: "#F24E1E",
    category: "Design",
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
    color: "#232F3E",
    category: "Cloud",
  },
  {
    name: "Firebase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    color: "#FFCA28",
    category: "Backend",
  },
  {
    name: "GraphQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    color: "#E10098",
    category: "API",
  },
  {
    name: "Redux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    color: "#764ABC",
    category: "Frontend",
  },
]

// Duplicate the technologies array for seamless infinite scroll
const duplicatedTechnologies = [...technologies, ...technologies, ...technologies]

export default function TechStackCarousel() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Create two separate refs for the two rows
  const firstRowRef = useRef<HTMLDivElement>(null)
  const secondRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const firstRow = firstRowRef.current
    const secondRow = secondRowRef.current
    if (!firstRow || !secondRow) return

    let firstRowPosition = 0
    let secondRowPosition = secondRow.scrollWidth / 3 // Start at the middle for the second row

    const firstRowSpeed = 0.5
    const secondRowSpeed = 0.5

    // Animation for first row (left to right)
    const animateFirstRow = () => {
      firstRowPosition += firstRowSpeed
      if (firstRowPosition >= firstRow.scrollWidth / 3) {
        firstRowPosition = 0
      }
      firstRow.scrollLeft = firstRowPosition
      requestAnimationFrame(animateFirstRow)
    }

    // Animation for second row (right to left)
    const animateSecondRow = () => {
      secondRowPosition -= secondRowSpeed
      if (secondRowPosition <= 0) {
        secondRowPosition = secondRow.scrollWidth / 3
      }
      secondRow.scrollLeft = secondRowPosition
      requestAnimationFrame(animateSecondRow)
    }

    const firstRowAnimation = requestAnimationFrame(animateFirstRow)
    const secondRowAnimation = requestAnimationFrame(animateSecondRow)

    return () => {
      cancelAnimationFrame(firstRowAnimation)
      cancelAnimationFrame(secondRowAnimation)
    }
  }, [])

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400"
          >
            Tech Stack
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/70 sm:text-4xl"
          >
            My Development Toolkit
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-white/70"
          >
            The languages, frameworks, and tools I use to bring ideas to life
          </motion.p>
        </div>
      </div>

      <div className="space-y-12">
        {/* First row - left to right */}
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-50 dark:from-black to-transparent"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 dark:from-black to-transparent"></div>

          {/* Scrolling container */}
          <div ref={firstRowRef} className="flex w-full overflow-x-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
            <div className="flex gap-8 py-8 px-4">
              {duplicatedTechnologies.slice(0, duplicatedTechnologies.length / 2).map((tech, index) => (
                <div key={`${tech.name}-${index}`} className="group flex flex-col items-center justify-center gap-3">
                  <div
                    className={`flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center rounded-xl 
                    ${isDark ? "bg-white/5" : "bg-white/80"} 
                    shadow-lg backdrop-blur-sm transition-all duration-300`}
                  >
                    <img
                      src={tech.icon || "/placeholder.svg"}
                      alt={tech.name}
                      className="h-8 w-8 sm:h-12 sm:w-12 object-contain transition-all duration-300"
                      style={{
                        filter: isDark && tech.name === "Next.js" ? "invert(1)" : "none",
                      }}
                    />
                  </div>
                  <span className="text-center text-xs sm:text-sm font-medium text-slate-700 dark:text-white/80">
                    {tech.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-white/50 hidden sm:block">{tech.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second row - right to left */}
        <div className="relative w-full">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-50 dark:from-black to-transparent"></div>
          <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 dark:from-black to-transparent"></div>

          {/* Scrolling container */}
          <div
            ref={secondRowRef}
            className="flex w-full overflow-x-hidden"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex gap-8 py-8 px-4">
              {duplicatedTechnologies
                .slice(duplicatedTechnologies.length / 2)
                .reverse()
                .map((tech, index) => (
                  <div key={`${tech.name}-${index}`} className="group flex flex-col items-center justify-center gap-3">
                    <div
                      className={`flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center rounded-xl 
                      ${isDark ? "bg-white/5" : "bg-white/80"} 
                      shadow-lg backdrop-blur-sm transition-all duration-300`}
                    >
                      <img
                        src={tech.icon || "/placeholder.svg"}
                        alt={tech.name}
                        className="h-8 w-8 sm:h-12 sm:w-12 object-contain transition-all duration-300"
                        style={{
                          filter: isDark && tech.name === "Next.js" ? "invert(1)" : "none",
                        }}
                      />
                    </div>
                    <span className="text-center text-xs sm:text-sm font-medium text-slate-700 dark:text-white/80">
                      {tech.name}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-white/50 hidden sm:block">{tech.category}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
