import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax: text panel slides up faster than the bg image
  const panelY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"])
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const panelOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  // Smooth spring for cursor tracking
  const springX = useSpring(0, { stiffness: 80, damping: 20 })
  const springY = useSpring(0, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      springX.set((e.clientX - cx) * 0.04)
      springY.set((e.clientY - cy) * 0.04)
      setMousePos({
        x: ((e.clientX - cx) / cx) * 100,
        y: ((e.clientY - cy) / cy) * 100,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [springX, springY])

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Fixed background image with parallax */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY }}
      >
        <img
          src="/hero-warehouse.webp"
          alt="Winmark Ingredients Facility"
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.1)" }}
        />
        {/* Very light wash — keeps it bright, not dark */}
        <div className="absolute inset-0 bg-white/30" />
      </motion.div>

      {/* Interactive glow that follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at calc(50% + ${mousePos.x * 0.6}px) calc(50% + ${mousePos.y * 0.6}px), rgba(30,83,94,0.12), transparent 70%)`,
          transition: "background 0.1s ease",
        }}
      />

      {/* Frosted glass content panel */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{ y: panelY, opacity: panelOpacity }}
      >
        <motion.div
          className="relative max-w-3xl w-full text-center px-10 py-14 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.62)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.7)",
            boxShadow: "0 8px 48px rgba(30,83,94,0.10), 0 2px 8px rgba(0,0,0,0.06)",
            x: springX,
            y: springY,
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Accent line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 bg-[#1e535e]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1e535e]">
              Est. 2001 · Karachi, Pakistan
            </span>
            <div className="h-px w-10 bg-[#1e535e]" />
          </div>

          {/* Main headline */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4"
            style={{ color: "#1e535e" }}
          >
            WINMARK
            <br />
            <span className="text-slate-900">INGREDIENTS</span>
          </h1>

          <p className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed mb-3 max-w-xl mx-auto">
            Premier Sourcing &amp; Distribution for the Food Industry.
          </p>
          <p className="text-sm text-slate-500 mb-10 tracking-wide">
            Trusted by <strong className="text-slate-700">Unilever</strong>, <strong className="text-slate-700">Dairyland</strong> &amp; <strong className="text-slate-700">Rehmat-e-Shereen</strong>
          </p>

          {/* CTA */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white text-sm font-semibold tracking-wide transition-all hover:shadow-lg hover:scale-105 active:scale-100"
              style={{ backgroundColor: "#1e535e" }}
            >
              Explore Services
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 text-sm font-semibold tracking-wide transition-all hover:scale-105"
              style={{ borderColor: "#1e535e", color: "#1e535e" }}
            >
              Our Products
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ opacity: scrollOpacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-xs tracking-widest uppercase font-medium drop-shadow-md">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-white"
          >
            <ChevronDown className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
