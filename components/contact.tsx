"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Send, Mail, Phone, MapPin } from "lucide-react"
import { useTheme } from "next-themes"

export default function Contact() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const containerRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const subject = encodeURIComponent("Project Inquiry from Portfolio")
    const body = encodeURIComponent(
      `Name: ${formState.name}
      Email: ${formState.email}

      Message:
      ${formState.message}`
    )

    // Keep UX smooth
    await new Promise((resolve) => setTimeout(resolve, 800))

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=andikadwiputra06@gmail.com&su=${subject}&body=${body}`

    window.open(gmailUrl, "_blank")

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormState({ name: "", email: "", message: "" })

    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/andikadwp" },
    { name: "LinkedIn", url: "https://linkedin.com/in/andika-dwi-putra-02b706256/" },
    { name: "Instagram", url: "https://instagram.com/andikadwp" },
    { name: "Twitter", url: "https://twitter.com/andikadwp" },
  ];

  return (
    <section id="contact" ref={containerRef} className="relative py-20">
      {/* Light theme liquid glass effect */}
      {!isDark && (
        <>
          <div className="absolute top-1/4 left-1/3 h-80 w-80 rounded-full bg-sky-100/30 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-violet-100/20 blur-3xl" />
        </>
      )}

      <div className="container mx-auto px-4">
        <motion.div style={{ opacity }} className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-sky-400 dark:text-sky-400">
            Get In Touch
          </h2>
          <h3 className="mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-white/70 sm:text-4xl">
            Let’s Connect
          </h3>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-white/70">
            Interested in connecting or discussing opportunities? Feel free to reach out.
          </p>
        </motion.div>

        <motion.div style={{ opacity, y }} className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
          <div
            className={`rounded-2xl p-6 ${isDark ? "bg-white/5" : "bg-white/10 border border-white/50 shadow-lg backdrop-blur-md"
              }`}
          >
            <h4 className={`mb-6 text-xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>
              Contact Information
            </h4>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className={`mr-4 rounded-full p-3 ${isDark ? "bg-sky-400/10" : "bg-sky-100 shadow-sm"}`}>
                  <Mail className={`h-5 w-5 ${isDark ? "text-sky-400" : "text-sky-600"}`} />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>Email</p>
                  <p className={`font-medium ${isDark ? "text-white" : "text-slate-800"}`}>andikadwiputra06@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className={`mr-4 rounded-full p-3 ${isDark ? "bg-sky-400/10" : "bg-sky-100 shadow-sm"}`}>
                  <MapPin className={`h-5 w-5 ${isDark ? "text-sky-400" : "text-sky-600"}`} />
                </div>
                <div>
                  <p className={`text-sm ${isDark ? "text-white/50" : "text-slate-500"}`}>Location</p>
                  <p className={`font-medium ${isDark ? "text-white" : "text-slate-800"}`}>Indonesia, East Java</p>
                </div>
              </div>
            </div>

            <div className={`mt-8 h-px w-full ${isDark ? "bg-white/10" : "bg-slate-200"}`} />

            <div className="mt-8">
              <h5 className={`mb-4 text-sm font-medium ${isDark ? "text-white" : "text-slate-800"}`}>
                Connect with me
              </h5>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full px-4 py-2 text-sm transition-colors ${isDark
                      ? "bg-white/10 text-white hover:bg-white/20"
                      : "bg-white/70 text-slate-700 hover:bg-white border border-slate-200/50"
                      }`}
                  >
                    {platform.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`rounded-2xl p-6 ${isDark ? "bg-white/5" : "bg-white/10 border border-white/10 shadow-lg backdrop-blur-md"
              }`}
          >
            <h4 className={`mb-6 text-xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Send a Message</h4>

            {isSubmitted ? (
              <div
                className={`flex h-[calc(100%-2rem)] flex-col items-center justify-center rounded-lg p-6 text-center ${isDark ? "bg-sky-400/10" : "bg-sky-50/80 backdrop-blur-sm"
                  }`}
              >
                <div className={`mb-4 rounded-full p-3 ${isDark ? "bg-sky-400/20" : "bg-sky-100"}`}>
                  <Send className={`h-6 w-6 ${isDark ? "text-sky-400" : "text-sky-600"}`} />
                </div>
                <h5 className={`mb-2 text-xl font-bold ${isDark ? "text-white" : "text-slate-800"}`}>Message Sent!</h5>
                <p className={`${isDark ? "text-white/70" : "text-slate-600"}`}>
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className={`mb-2 block text-sm font-medium ${isDark ? "text-white" : "text-slate-700"}`}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg px-4 py-2 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-sky-400 ${isDark
                      ? "border border-white/10 bg-white/5 text-white focus:border-sky-400"
                      : "border border-slate-200 bg-white/80 text-slate-800 focus:border-sky-400"
                      }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className={`mb-2 block text-sm font-medium ${isDark ? "text-white" : "text-slate-700"}`}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-lg px-4 py-2 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-sky-400 ${isDark
                      ? "border border-white/10 bg-white/5 text-white focus:border-sky-400"
                      : "border border-slate-200 bg-white/80 text-slate-800 focus:border-sky-400"
                      }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className={`mb-2 block text-sm font-medium ${isDark ? "text-white" : "text-slate-700"}`}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`w-full rounded-lg px-4 py-2 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-sky-400 ${isDark
                      ? "border border-white/10 bg-white/5 text-white focus:border-sky-400"
                      : "border border-slate-200 bg-white/80 text-slate-800 focus:border-sky-400"
                      }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex h-12 overflow-hidden rounded-lg bg-gradient-to-r from-sky-400 to-violet-500 p-[1px] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-black"
                >
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span
                    className={`inline-flex h-full w-full items-center justify-center rounded-lg px-8 py-1 text-sm font-medium backdrop-blur-3xl transition-all duration-300 ${isDark
                      ? "bg-black text-white group-hover:bg-black/80"
                      : "bg-white text-slate-800 group-hover:bg-white/80"
                      }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
