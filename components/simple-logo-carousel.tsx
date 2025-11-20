"use client"

import { useRef, useEffect } from "react"
import { useTheme } from "next-themes"

// Programming languages with their logos
const languages = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Ruby", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
]

// Duplicate logos for seamless infinite scroll
const duplicatedLanguages = [...languages, ...languages, ...languages]

export default function SimpleLogoCarousel() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = carouselRef.current
    if (!scrollContainer) return

    // Set initial scroll position to ensure animation works
    scrollContainer.scrollLeft = 0

    let animationFrameId: number
    let position = 0
    const speed = 0.5 // pixels per frame - adjust for speed

    const animate = () => {
      position += speed

      // Reset position when we've scrolled the width of the original set of logos
      const firstSetWidth = scrollContainer.scrollWidth / 3
      if (position >= firstSetWidth) {
        position = 0
      }

      scrollContainer.scrollLeft = position
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400">
            Programming Languages
          </h2>
          <h3 className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/70 sm:text-4xl">
            Languages I Work With
          </h3>
        </div>
      </div>

      <div className="relative w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-50 dark:from-black to-transparent"></div>
        <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-50 dark:from-black to-transparent"></div>

        {/* Scrolling container */}
        <div ref={carouselRef} className="flex w-full overflow-x-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
          <div className="flex items-center gap-16 py-8 px-16">
            {duplicatedLanguages.map((language, index) => (
              <div
                key={`${language.name}-${index}`}
                className="flex h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 items-center justify-center"
              >
                <img
                  src={language.logo || "/placeholder.svg"}
                  alt={language.name}
                  className="h-12 w-12 object-contain transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
