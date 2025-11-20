import dynamic from "next/dynamic"

const Hero = dynamic(() => import("@/components/hero"), { ssr: false })
const About = dynamic(() => import("@/components/about"), { ssr: false })
const Projects = dynamic(() => import("@/components/projects"), { ssr: false })
const Skills = dynamic(() => import("@/components/skills"), { ssr: false })
const Contact = dynamic(() => import("@/components/contact"), { ssr: false })
const FloatingNav = dynamic(() => import("@/components/floating-nav"), { ssr: false })
import ToolsLanguagesCarousel from "@/components/tools-languages-carousel"

const BackgroundEffect = dynamic(() => import("@/components/background-effect"), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 to-white text-slate-800 dark:from-slate-900 dark:to-black dark:text-white">
      <BackgroundEffect />
      <FloatingNav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ToolsLanguagesCarousel />
      <Contact />
    </main>
  )
}
