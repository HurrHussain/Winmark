import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useSpring, useTransform } from "framer-motion"
import { HistorySection, type HistoryChapter } from "@/components/sections/HistorySection"

/* ─── Data ──────────────────────────────────────────────────────────────── */
const CHAPTERS: HistoryChapter[] = [
  {
    id: "chapter-1",
    year: "2001",
    title: "THE FOUNDATION",
    description: "Founded in Karachi by Mr. Hassan Hooda, Winmark’s story began with a singular focus on bakery quality. In 2001, Zeeshan Hooda joined, initiating an aggressive portfolio expansion that defined the company’s early trajectory.",
    bgImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1920&q=80",
    bgImageAlt: "Macro shot of bakery ingredients",
  },
  {
    id: "chapter-2",
    year: "2004",
    title: "GEOGRAPHIC REACH",
    description: "Under the leadership of the Hooda brothers, the business expanded beyond Karachi, reaching cottage industries and confectionery manufacturers nationwide. The portfolio diversified into compound chocolates and specialty oils.",
    bgImage: "/ruthson-zimmerman-FVwG5OzPuzo-unsplash.jpg",
    bgImageAlt: "Industrial logistics texture",
  },
  {
    id: "chapter-3",
    year: "2017",
    title: "GLOBAL PARTNERSHIPS",
    description: "2017 marked a milestone as Winmark was appointed distributor for IFFCO Pakistan. The operation was streamlined into three specialized streams:  Oils/Fats, Cocoa derivatives, and Dairy.",
    bgImage: "unnamed.jpg",
    bgImageAlt: "Industrial silos",
  },
  {
    id: "chapter-4",
    year: "Present",
    title: "THE WINMARK ERA",
    description: "Registration as Winmark Ingredients Pvt Ltd. Today, we operate as a restructured, industry-focused powerhouse, serving B2B, HoReCa, and Bakeries with engineered supply chain precision.",
    bgImage: "jj.jpg",
    bgImageAlt: "Modern industrial warehouse",
  },
]

/* ─── Grain Overlay ─────────────────────────────────────────────────────── */
const GRAIN_STYLE: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "128px 128px",
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */
export function HistoryPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isScrollingRef = useRef(false)

  // Total slides: Hero (1) + Chapters (4) + Footer (1) = 6
  const totalSlides = CHAPTERS.length + 2

  // Heavy spring for the parallax lag effects
  const springIndex = useSpring(currentIndex, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  })

  // Slow parallax for the final CTA background
  const footerParallaxY = useTransform(springIndex, [4, 5], ["-10%", "0%"])

  // Wheel event listener for "Stage Transition"
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // KILL SWITCH: If we are on the final slide, let the user scroll down natively to the Footer.
      // If they scroll up, let native scroll work until they hit the top of the window, then intercept again.
      if (currentIndex === totalSlides - 1) {
        if (e.deltaY > 0) return // Let native scroll down
        if (e.deltaY < 0 && window.scrollY > 0) return // Let native scroll up if not at top
      }

      e.preventDefault()

      if (isScrollingRef.current) return

      if (e.deltaY > 50) {
        // Scroll Down
        if (currentIndex < totalSlides - 1) {
          isScrollingRef.current = true
          setCurrentIndex(prev => prev + 1)
          setTimeout(() => { isScrollingRef.current = false }, 1500) // Lock for duration of transition
        }
      } else if (e.deltaY < -50) {
        // Scroll Up
        if (currentIndex > 0) {
          isScrollingRef.current = true
          setCurrentIndex(prev => prev - 1)
          setTimeout(() => { isScrollingRef.current = false }, 1500)
        }
      }
    }

    // Passive false to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false })
    return () => window.removeEventListener("wheel", handleWheel)
  }, [currentIndex, totalSlides])

  // Touch event handler for mobile swipe navigation
  const touchStartY = useRef(0)
  const touchStartTime = useRef(0)

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartTime.current = Date.now()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return

      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      const deltaTime = Date.now() - touchStartTime.current

      // Require minimum swipe of 50px within 500ms
      if (Math.abs(deltaY) < 50 || deltaTime > 500) return

      // Final slide: let native scroll take over for downward swipe
      if (currentIndex === totalSlides - 1 && deltaY > 0) return

      if (deltaY > 0 && currentIndex < totalSlides - 1) {
        isScrollingRef.current = true
        setCurrentIndex(prev => prev + 1)
        setTimeout(() => { isScrollingRef.current = false }, 1500)
      } else if (deltaY < 0 && currentIndex > 0) {
        isScrollingRef.current = true
        setCurrentIndex(prev => prev - 1)
        setTimeout(() => { isScrollingRef.current = false }, 1500)
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentIndex, totalSlides])

  return (
    <div className="bg-[var(--midnight-slate)] text-white antialiased h-[100dvh] w-full overflow-hidden relative selection:bg-teal-500/30">

      {/* Master Stage Wrapper */}
      <motion.div
        animate={{ y: `-${currentIndex * 100}vh` }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col"
      >

        {/* ── HERO (Index 0) ───────────────────────────────────────── */}
        <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-[var(--midnight-slate)] flex-shrink-0">
          <div className="absolute inset-0 pointer-events-none opacity-50 z-10" style={GRAIN_STYLE} />

          {/* Large background parallax year */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          >
            <span
              className="text-[15vw] md:text-[25vw] font-black leading-none font-display"
              style={{
                color: "transparent",
                WebkitTextStroke: "1px rgba(207, 169, 169, 0.05)",
                letterSpacing: "-0.05em",
              }}
            >
              2001
            </span>
          </motion.div>

          {/* Ambient Glow */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(circle at 50% 60%, rgba(20,184,166,0.1) 0%, transparent 70%)",
            }}
          />

          {/* Hero content */}
          <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.5em] text-teal-400">
                <span className="h-px w-8 bg-teal-500/40" />
                A 25-Year Legacy
                <span className="h-px w-8 bg-teal-500/40" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold leading-tight mb-6 sm:mb-10 font-display italic"
              style={{ letterSpacing: "-0.04em" }}
            >
              Industrial <br />
              <span className="text-teal-500/90">Heritage.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-slate-400 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
            >
              From Karachi's industrial hubs to a national powerhouse. Explore the methodical journey of Pakistan's premier ingredient partner.
            </motion.p>
          </div>

          {/* Scroll indicator (Tether) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-0 flex flex-col items-center z-20 hidden sm:flex"
          >
            <div className="border border-teal-500/30 rounded-full px-6 py-2 bg-[#0b1120]/50 backdrop-blur-sm">
              <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-teal-400">Begin Exploration</span>
            </div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-px h-[120px] bg-gradient-to-b from-teal-500 to-transparent"
            />
          </motion.div>
        </section>

        {/* ── CINEMATIC PARALLAX CHAPTERS (Index 1 to 4) ─────────────── */}
        {CHAPTERS.map((chapter, index) => (
          <HistorySection
            key={chapter.id}
            chapter={chapter}
            index={index + 1}
            springIndex={springIndex}
            isActive={currentIndex === index + 1}
          />
        ))}

        {/* ── FOOTER CTA (Index 5) ──────────────────────────────────── */}
        <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center py-20 sm:py-40 px-4 sm:px-6 text-center bg-[#0b1120] border-t border-white/5 z-20 flex-shrink-0 overflow-hidden">

          {/* Cinematic Background with Slow Parallax */}
          <motion.div
            style={{ y: footerParallaxY }}
            initial={{ opacity: 0 }}
            animate={{ opacity: currentIndex === 5 ? 1 : 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
          >
            <img
              src={`${import.meta.env.BASE_URL}new-bg.jpg`}
              alt="Industrial Background"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.5) contrast(1.1)" }}
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(11, 17, 32, 0.85), rgba(11, 17, 32, 0.75))" }}
            />
          </motion.div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 sm:mb-10 text-white font-display italic"
              style={{ letterSpacing: "-0.04em" }}
            >
              The Journey Continues.
            </h2>
            <p className="text-slate-400 text-lg font-light leading-loose">
              Our history is just the foundation. We are building the future of food safety and supply for Pakistan's largest manufacturing brands.
            </p>
            <div className="flex justify-center mt-12">
              <Link to="/products">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-5 px-12 rounded-2xl transition-colors shadow-xl hover:shadow-teal-500/20 inline-block"
                >
                  Explore Our Portfolio
                </motion.div>
              </Link>
            </div>
          </div>
        </section>

      </motion.div>
    </div>
  )
}
