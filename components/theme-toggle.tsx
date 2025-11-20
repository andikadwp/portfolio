"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md">
        <span className="sr-only">Toggle theme</span>
        <Sun className="h-4 w-4 text-white" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md dark:bg-slate-800/50 transition-all duration-500"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="relative w-4 h-4">
        <Sun
          className={`h-4 w-4 absolute transition-all duration-500 ${
            resolvedTheme === "dark" ? "opacity-100 rotate-0 text-white" : "opacity-0 rotate-90 text-slate-800"
          }`}
        />
        <Moon
          className={`h-4 w-4 absolute transition-all duration-500 ${
            resolvedTheme === "dark" ? "opacity-0 -rotate-90 text-white" : "opacity-100 rotate-0 text-slate-800"
          }`}
        />
      </div>
      <span className="sr-only">{resolvedTheme === "dark" ? "Light mode" : "Dark mode"}</span>
    </Button>
  )
}
