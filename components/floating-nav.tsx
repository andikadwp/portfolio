"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "next-themes"
import { Menu } from "lucide-react"

export default function FloatingNav() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Update nav visibility based on scroll position
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "skills", "contact"]
      const sectionElements = sections.map((id) => document.getElementById(id))

      const currentSection = sectionElements.findIndex((el) => {
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 200 && rect.bottom >= 200
      })

      if (currentSection !== -1) {
        setActiveSection(sections[currentSection])
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isScrolled ? 0 : -100,
          opacity: isScrolled ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed right-6 top-6 z-50 rounded-full px-4 py-2",
          isDark
            ? "backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
            : "backdrop-blur-xl bg-white/10 border border-slate-200/50 shadow-lg",
        )}
      >
        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                }}
                className={cn(
                  "relative block px-3 py-2 text-sm transition-all duration-300",
                  "hover:text-sky-500",
                  activeSection === item.id ? "text-sky-500" : isDark ? "text-white/80" : "text-slate-700",
                )}
              >
                {activeSection === item.id && (
                  <motion.span
                    layoutId="activeSection"
                    className={cn("absolute inset-0 rounded-full", isDark ? "bg-white/10" : "bg-slate-100")}
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            </li>
          ))}
          <li className="ml-2">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center justify-between sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`mr-2 p-2 rounded-full ${isDark ? "text-white" : "text-slate-800"}`}
          >
            <Menu className="h-5 w-5" />
          </button>
          <ThemeToggle />
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed top-20 right-6 z-50 rounded-xl p-4 w-48",
            isDark
              ? "backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
              : "backdrop-blur-xl bg-white/10 border border-slate-200/50 shadow-lg",
          )}
        >
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
                    setIsMobileMenuOpen(false)
                  }}
                  className={cn(
                    "block px-4 py-2 text-sm rounded-lg transition-all duration-300",
                    activeSection === item.id
                      ? isDark
                        ? "bg-white/10 text-sky-400"
                        : "bg-slate-100 text-sky-600"
                      : isDark
                        ? "text-white/80 hover:bg-white/5"
                        : "text-slate-700 hover:bg-slate-100",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  )
}
