"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React", icon: "⚛️", level: 95 },
      { name: "Next.js", icon: "▲", level: 90 },
      { name: "TypeScript", icon: "TS", level: 85 },
      { name: "Tailwind CSS", icon: "🌊", level: 90 },
      { name: "Framer Motion", icon: "🔄", level: 80 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢", level: 80 },
      { name: "Express", icon: "🚂", level: 85 },
      { name: "MongoDB", icon: "🍃", level: 75 },
      { name: "PostgreSQL", icon: "🐘", level: 70 },
      { name: "GraphQL", icon: "◼️", level: 65 },
    ],
  },
  {
    name: "Design",
    skills: [
      { name: "Figma", icon: "🎨", level: 85 },
      { name: "UI/UX", icon: "📱", level: 80 },
      { name: "Animation", icon: "✨", level: 75 },
      { name: "Responsive Design", icon: "📐", level: 90 },
      { name: "Design Systems", icon: "🧩", level: 70 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", icon: "🔄", level: 90 },
      { name: "Docker", icon: "🐳", level: 70 },
      { name: "CI/CD", icon: "🔄", level: 75 },
      { name: "AWS", icon: "☁️", level: 65 },
      { name: "Testing", icon: "🧪", level: 80 },
    ],
  },
]

export default function SkillSlider() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const nextCategory = () => {
    setActiveCategory((prev) => (prev === skillCategories.length - 1 ? 0 : prev + 1))
  }

  const prevCategory = () => {
    setActiveCategory((prev) => (prev === 0 ? skillCategories.length - 1 : prev - 1))
  }

  return (
    <section id="skill-slider" ref={containerRef} className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div style={{ opacity }} className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400">
            My Expertise
          </h2>
          <h3 className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/70 sm:text-4xl">
            Skills & Technologies
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-white/70">
            Explore my technical skills and proficiency in various technologies and tools.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity, y }}
          className="mx-auto max-w-4xl rounded-2xl bg-white/50 p-8 shadow-lg backdrop-blur-md dark:bg-white/5"
        >
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={prevCategory}
              className="rounded-full bg-white/80 p-2 text-slate-800 shadow-md transition-all hover:bg-white dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              aria-label="Previous category"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <h4 className="text-center text-xl font-bold text-slate-800 dark:text-white">
              {skillCategories[activeCategory].name}
            </h4>

            <button
              onClick={nextCategory}
              className="rounded-full bg-white/80 p-2 text-slate-800 shadow-md transition-all hover:bg-white dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
              aria-label="Next category"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="relative overflow-hidden">
            <motion.div
              initial={false}
              animate={{ x: `-${activeCategory * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {skillCategories.map((category, categoryIndex) => (
                <div key={category.name} className="min-w-full flex-shrink-0 px-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: categoryIndex === activeCategory ? 1 : 0,
                          y: categoryIndex === activeCategory ? 0 : 20,
                        }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                        className="rounded-xl bg-white/70 p-4 shadow-sm backdrop-blur-md dark:bg-white/10"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-xl dark:bg-sky-900/50">
                              {skill.icon}
                            </span>
                            <h5 className="font-medium text-slate-800 dark:text-white">{skill.name}</h5>
                          </div>
                          <span className="text-sm font-medium text-slate-500 dark:text-white/50">{skill.level}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: skillIndex * 0.1 + 0.2 }}
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex justify-center">
            {skillCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`mx-1 h-2 w-8 rounded-full transition-all ${
                  activeCategory === index
                    ? "bg-gradient-to-r from-sky-400 to-violet-500"
                    : "bg-slate-300 dark:bg-white/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
