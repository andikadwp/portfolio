"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const skillsData = {
  Frontend: [
    { name: "HTML/CSS", level: 95, icon: "🌐" },
    { name: "React", level: 80, icon: "⚛️" },
    { name: "Next.js", level: 80, icon: "▲" },
    { name: "Tailwind CSS", level: 85, icon: "🎨" },
    { name: "TypeScript", level: 80, icon: "🔷" },
  ],
  Backend: [
    { name: "Laravel", level: 90, icon: "🍕" },
    { name: "PHP", level: 90, icon: "🐘" },
    { name: "JavaScript", level: 90, icon: "⚡" },
    { name: "REST API", level: 85, icon: "🔌" },
    { name: "MySQL", level: 90, icon: "🗄️" },
  ],
  Tools: [
    { name: "Git", level: 90, icon: "🔀" },
    { name: "Figma", level: 85, icon: "🎯" },
    { name: "Postman", level: 85, icon: "🧪" },
    { name: "Terminal / Shell", level: 80, icon: "🖥️" },
  ],
  Design: [
    { name: "UI Design", level: 85, icon: "✨" },
    { name: "UX Design", level: 75, icon: "👤" },
    { name: "Responsive", level: 90, icon: "📱" },
    { name: "Canva", level: 85, icon: "📐" },
  ],
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend")
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const categories = Object.keys(skillsData)

  return (
    <section id="skills" ref={containerRef} className="relative py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div style={{ opacity }} className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400">
            Expertise
          </h2>
          <h3 className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/70 sm:text-4xl">
            Skills & Technologies
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-white/70">
            A collection of the tools and technologies I work with to build web applications.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div style={{ opacity }} className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "text-slate-800 dark:text-white"
                  : "text-slate-600 dark:text-white/60 hover:text-slate-800 dark:hover:text-white/80"
              }`}
            >
              {activeCategory === category && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-lg border border-slate-500/10 bg-slate-500/[0.05] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.08]"
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div style={{ opacity, scale }} className="mx-auto max-w-5xl">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {skillsData[activeCategory as keyof typeof skillsData].map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillCard({ skill, index }: { skill: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      <div
        className={`relative overflow-hidden rounded-xl p-5 transition-all duration-300 backdrop-blur-md ${
          isHovered ? "shadow-lg" : "shadow-md"
        } border border-white/10 bg-white/[0.05] dark:border-white/10 dark:bg-white/[0.08]`}
      >
        {/* Gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-violet-500/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon and Name */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{skill.icon}</span>
              <h4 className="font-semibold text-slate-900 dark:text-white">{skill.name}</h4>
            </div>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400">{skill.level}%</span>
          </div>

          {/* Proficiency Bar */}
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-200/50 dark:bg-white/10 backdrop-blur-sm">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            />
          </div>

          {/* Proficiency Label */}
          <div className="mt-3 flex justify-between">
            <span className="text-xs text-slate-600 dark:text-white/60">Proficiency</span>
            <span className="text-xs font-medium text-slate-700 dark:text-white/80">
              {skill.level >= 90 ? "Expert" : skill.level >= 80 ? "Advanced" : "Intermediate"}
            </span>
          </div>
        </div>

        {/* Subtle glow on hover */}
        <motion.div
          className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-sky-500/20 to-violet-500/20 blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: -1 }}
        />
      </div>
    </motion.div>
  )
}
