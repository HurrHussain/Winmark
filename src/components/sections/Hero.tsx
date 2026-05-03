import { useRef } from "react"
import { motion, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import { useScrollContext } from "@/hooks/ScrollContext"

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScrollContext()

  // Hero Card Fade: Stretched to 350px for a more majestic, slower transition.
  // As scroll goes from 0px to 350px, opacity goes from 1 to 0.
  const cardOpacity = useTransform(scrollY, [150, 800], [1, 0])

  // Scroll indicator fades out early so it doesn't linger
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 120], [1, 0])

  return (
    <section ref={containerRef} className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Layer 1: Warehouse background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero-warehouse.webp"
          alt="Winmark Ingredients Facility"
          className="w-full h-full object-cover scale-[1.05]"
        />
        {/* Gradient wash — top and bottom edges, center stays bright */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10" />
      </div>



      {/* Layer 2: The translucent hero card — fades out as user scrolls */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{ opacity: cardOpacity }}
      >
        <motion.div
          className="relative max-w-4xl w-full text-center px-10 py-8 rounded-[3rem] mx-6 overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.10)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.30)",
            boxShadow: "0 0 50px 0 rgba(255,255,255,0.05)",
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Internal light-reflection glow: simulates light hitting top-left of glass */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[2rem]"
            style={{
              background: "linear-gradient(135deg, rgba(32, 21, 3, 0.17) 0%, transparent 10%)",
            }}
          />

          {/* Safety gap: space for the Flying Logo at 2.5 scale hovering above the card */}
          <div className="h-44 w-full" />

          {/* Accent line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-[1px] w-10 bg-[#1e535e]/30" />
            <span className="text-[12px] font-bold tracking-[0.3em] uppercase text-[#1e535e]">
              Est. 2001 • Karachi • Lahore
            </span>
            <span className="h-[1px] w-10 bg-[#1e535e]/30" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-6 tracking-tight leading-[1.1]">
            Premier Sourcing & Distribution<br />for the Food Industry.
          </h1>

          <p className="text-slate-800 font-medium text-base mb-12 max-w-lg mx-auto leading-relaxed">
            Trusted by industrial leaders including{" "}
            <span className="text-[#1e535e] font-bold underline decoration-teal-500/30 underline-offset-4">Unilever</span>{" "}
            and{" "}
            <span className="text-[#1e535e] font-bold underline decoration-teal-500/30 underline-offset-4">Dairyland</span>.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-12 py-4 rounded-full text-white text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5"
              style={{
                backgroundColor: "#1e535e",
                boxShadow: "0 10px 20px -5px rgba(30,83,94,0.4)",
              }}
            >
              Our Services
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-12 py-4 rounded-full text-slate-800 text-sm font-bold tracking-wide border border-slate-200 bg-white/40 hover:bg-white transition-all"
            >
              Products
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ opacity: scrollIndicatorOpacity }}
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
