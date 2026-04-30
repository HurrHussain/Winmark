import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function History() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  // Magnetic button state
  const btnRef = useRef<HTMLAnchorElement>(null)
  const [btnStyle, setBtnStyle] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setBtnStyle({ x: x * 0.25, y: y * 0.25 })
  }

  const handleMouseLeave = () => setBtnStyle({ x: 0, y: 0 })

  return (
    <section id="history" className="bg-slate-900 py-28 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#1e535e]" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#4a9aaa]">
              Our Story
            </span>
            <div className="h-px w-8 bg-[#1e535e]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            The New Era
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
            2019 marked a turning point. Under bold new leadership, Winmark Ingredients Pvt Ltd entered an era of precision, scale, and national impact.
          </p>
        </motion.div>

        {/* Featured Era Card */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl mx-auto bg-[#1e293b]/80 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl relative"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e535e]/20 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-5 relative z-10">

            {/* Left Column - Image */}
            <div className="md:col-span-2 p-6 md:p-8 flex items-center justify-center bg-slate-900/40">
              <div className="w-full aspect-[4/5] relative rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800 shadow-inner">
                <img
                  src="/riaz.png"
                  alt="Riaz — Leadership Vision"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.style.background =
                      'linear-gradient(to bottom right, #1e293b, #0f172a)';
                  }}
                />
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="md:col-span-3 p-8 md:p-12 lg:p-16 flex flex-col justify-center">

              {/* Eyebrow */}
              <div className="mb-4">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-sky-400">
                  2019 – Present
                </span>
              </div>

              {/* Main Heading */}
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
                A Legacy of Expansion
              </h3>

              {/* Body Text */}
              <p className="text-slate-300 leading-relaxed mb-10 text-base md:text-lg font-light" style={{ lineHeight: '1.8' }}>
                In 2019, a pivotal leadership transition brought a renewed, aggressive vision to Winmark. Under this new direction, the company underwent a full corporate restructure, officially registering as <strong className="text-white font-medium">Winmark Ingredients Pvt Ltd</strong>. By reorganizing our sales divisions for Direct Industries (B2B), HoReCa, Bakeries, and Traders, we significantly expanded our market footprint — powering Pakistan's food industry forward.
              </p>

              {/* Magnetic CTA Button */}
              <div>
                <motion.a
                  ref={btnRef}
                  href="/legacy-history"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  animate={{ x: btnStyle.x, y: btnStyle.y }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-white relative overflow-hidden group"
                  style={{
                    background: 'linear-gradient(135deg, #1e535e 0%, #0f766e 100%)',
                    boxShadow: '0 0 0 1px rgba(20,184,166,0.3)',
                  }}
                >
                  {/* Hover shimmer */}
                  <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-full" />
                  {/* Glow ring on hover */}
                  <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ boxShadow: '0 0 24px 4px rgba(20,184,166,0.45)' }}
                  />
                  <span className="relative z-10">Explore Our 25-Year Legacy</span>
                  <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
