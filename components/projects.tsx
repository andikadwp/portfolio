"use client"

import React from "react"

import type { ReactElement } from "react"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useTheme } from "next-themes"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A modern e-commerce platform built with Next.js, featuring product filtering, cart functionality, and secure checkout.",
    images: ["/ecommerce-dashboard.jpg", "/ecommerce-product-page.jpg", "/ecommerce-checkout.jpg"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    link: "#",
  },
  {
    id: 2,
    title: "Dashboard Analytics",
    description: "Interactive dashboard with real-time analytics, data visualization, and user management features.",
    images: ["/analytics-dashboard.png", "/analytics-charts.jpg", "/analytics-users.jpg"],
    tags: ["React", "D3.js", "Firebase", "Material UI"],
    link: "#",
  },
  {
    id: 3,
    title: "Social Media App",
    description: "Full-featured social media application with real-time messaging, post sharing, and user profiles.",
    images: ["/social-feed.jpg", "/social-messaging.jpg", "/social-profile.jpg"],
    tags: ["React Native", "Node.js", "Socket.io", "MongoDB"],
    link: "#",
  },
  {
    id: 4,
    title: "AI Content Generator",
    description: "AI-powered platform for generating creative content with advanced NLP capabilities.",
    images: ["/ai-generator.jpg", "/ai-results.jpg"],
    tags: ["Python", "OpenAI", "FastAPI", "React"],
    link: "#",
  },
  {
    id: 5,
    title: "Mobile Fitness App",
    description: "Cross-platform fitness tracking app with workout plans, progress tracking, and community features.",
    images: ["/fitness-app-interface.png", "/fitness-workouts.jpg"],
    tags: ["React Native", "Firebase", "Redux", "iOS/Android"],
    link: "#",
  },
]

export default function Projects(): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const projectsPerPage = 3
  const totalPages = Math.ceil(projects.length / projectsPerPage)
  const startIdx = currentPage * projectsPerPage
  const displayedProjects = projects.slice(startIdx, startIdx + projectsPerPage)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  return (
    <section id="projects" ref={containerRef} className="relative py-20">
      {!isDark && (
        <>
          <div className="absolute top-1/4 right-1/3 h-72 w-72 rounded-full bg-sky-100/30 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-violet-100/20 blur-3xl" />
        </>
      )}

      <div className="container mx-auto px-4">
        <motion.div style={{ opacity }} className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400">
            Portfolio
          </h2>
          <h3 className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/70 sm:text-4xl">
            Featured Projects
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-white/70">
            Explore my recent work and discover how I bring ideas to life with code and creativity.
          </p>
        </motion.div>

        <motion.div style={{ opacity, y }} className="mb-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDark={isDark}
                onViewGallery={() => setSelectedProject(project.id)}
              />
            ))}
          </div>
        </motion.div>

        {totalPages > 1 && (
          <motion.div style={{ opacity }} className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              className={`flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
                  : "bg-white/50 hover:bg-white/70 text-slate-600 hover:text-slate-800 border border-slate-200/50"
              }`}
              aria-label="Previous projects"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentPage
                      ? isDark
                        ? "w-8 bg-sky-400"
                        : "w-8 bg-sky-600"
                      : isDark
                        ? "w-2 bg-white/20 hover:bg-white/40"
                        : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to page ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className={`flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
                  : "bg-white/50 hover:bg-white/70 text-slate-600 hover:text-slate-800 border border-slate-200/50"
              }`}
              aria-label="Next projects"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </div>

      {selectedProject && (
        <LightboxGallery
          project={projects.find((p) => p.id === selectedProject)!}
          isDark={isDark}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

function ProjectCard({
  project,
  isDark,
  onViewGallery,
}: { project: any; isDark: boolean; onViewGallery: () => void }): ReactElement {
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const images = project.images || [project.image]

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer ${
        isDark
          ? "bg-white/5 hover:bg-white/10"
          : "bg-white/5 hover:bg-white/10 backdrop-blur-md shadow-lg border border-white/50"
      }`}
      onClick={onViewGallery}
    >
      <div
        className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${isDark ? "ring-white/10" : "ring-slate-200/50"}`}
      />

      <div className="relative aspect-video overflow-hidden">
        <Image
          src={images[currentImageIdx] || "/placeholder.svg"}
          alt={`${project.title} - Image ${currentImageIdx + 1}`}
          width={800}
          height={600}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isDark ? "from-black/80 to-transparent" : "from-black/60 to-transparent"
          }`}
        />

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIdx
                    ? isDark
                      ? "w-6 bg-sky-400"
                      : "w-6 bg-white"
                    : isDark
                      ? "w-1.5 bg-white/40"
                      : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="relative p-6">
        <h4 className={`mb-2 text-xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>{project.title}</h4>
        <p className={`mb-4 ${isDark ? "text-white/70" : "text-slate-600"}`}>{project.description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 text-xs ${
                isDark
                  ? "bg-white/10 text-white/70"
                  : "bg-white/70 text-slate-700 border border-slate-200/50 backdrop-blur-sm"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.link}
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center text-sm font-medium transition-colors ${
            isDark ? "text-sky-400 hover:text-sky-300" : "text-sky-600 hover:text-sky-700"
          }`}
        >
          View Project
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </motion.div>
  )
}

function LightboxGallery({
  project,
  isDark,
  onClose,
}: { project: any; isDark: boolean; onClose: () => void }): ReactElement {
  const [currentImageIdx, setCurrentImageIdx] = useState(0)
  const images = project.images || [project.image]

  const handlePrev = () => {
    setCurrentImageIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl px-4"
      >
        <div className="relative aspect-video overflow-hidden rounded-xl bg-black/50">
          <Image
            src={images[currentImageIdx] || "/placeholder.svg"}
            alt={`${project.title} - Gallery ${currentImageIdx + 1}`}
            width={1400}
            height={900}
            className="h-full w-full object-cover"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex items-center justify-center h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white/70 hover:text-white"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentImageIdx ? "w-8 bg-sky-400" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-white/70">
              {currentImageIdx + 1} / {images.length}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
