import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

const MotionLink = motion(Link)

export function History() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  // ...existing code...

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
          className="max-w-5xl mx-auto bg-[#0b1120] border border-slate-900 rounded-2xl overflow-hidden shadow-2xl relative"
        >
          {/* Subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e535e]/10 to-transparent pointer-events-none" />

          <div className="md:flex items-center gap-12 md:gap-16 relative z-10">
            {/* Left Column - Chairman Card */}
            <div className="flex-shrink-0 flex items-start md:items-center w-full md:w-auto justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="w-48 md:w-64 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col"
                style={{ minWidth: '12rem' }}
              >
                <div className="w-full aspect-[3/4] bg-slate-900 overflow-hidden">
                  <img
                    src="/riaz-hussain.jpg"
                    alt="Riaz Hussain — Chairman & Visionary"
                    className="w-full h-full object-cover object-top aspect-[3/4]"
                    onError={(e) => {
                      e.currentTarget.src = 'riaz.png';
                    }}
                  />
                </div>
                <div className="px-6 py-4 text-center">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">Riaz Hussain</h3>
                  <p className="font-sans text-xs md:text-sm tracking-[0.18em] uppercase text-teal-500 font-semibold mb-2">Chairman & Visionary</p>
                  <p className="font-sans text-slate-400 text-xs md:text-sm leading-relaxed max-w-xs mx-auto">
                    Architect of Winmark’s bold restructure and driving force behind Pakistan’s most resilient food ingredient network.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Content */}
            <div className="flex-1 flex flex-col justify-center items-start md:pl-2">
              {/* Eyebrow */}
              <div className="mb-2 mt-1">
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-sky-400 align-top">
                  2019 – Present
                </span>
              </div>
              {/* Main Heading */}
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                A Legacy of Expansion
              </h3>
              {/* Body Text */}
              <p className="text-slate-300 leading-relaxed mb-6 text-base md:text-lg font-light" style={{ lineHeight: '1.8' }}>
                In 2019, a pivotal leadership transition brought a renewed, aggressive vision to Winmark. Under this new direction, the company underwent a full corporate restructure, officially registering as <strong className="text-white font-medium">Winmark Ingredients Pvt Ltd</strong>. By reorganizing our sales divisions for Direct Industries (B2B), HoReCa, Bakeries, and Traders, we significantly expanded our market footprint — powering Pakistan's food industry forward.
              </p>
              {/* Magnetic CTA Button */}
              <div className="mt-0">
                <MotionLink
                  to="/history"
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
                </MotionLink>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
