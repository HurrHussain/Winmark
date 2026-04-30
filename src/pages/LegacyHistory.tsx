import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

/* ─── Data ──────────────────────────────────────────────────────────────── */
const LEGACY_MILESTONES = [
  {
    year: "2001",
    eraLabel: "Foundation Era",
    title: "The Beginning",
    body: "Winmark was born in the heart of Karachi's industrial district — a boutique sourcing agent with one mission: to bridge the gap between world-class food ingredient producers and the manufacturers who needed them most. Founded on trust and tireless relationship-building, the company quickly earned a reputation for reliability in a market that demanded it.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Food ingredients spread on a table",
  },
  {
    year: "2005",
    eraLabel: "Growth Phase",
    title: "First Strategic Partnerships",
    body: "By 2005, the company had secured its first long-term agreements with European and Southeast Asian commodity producers. These partnerships gave Winmark exclusive access to premium-grade ingredients — from dairy emulsifiers to specialty starches — that were previously unavailable to Pakistan's domestic manufacturers at scale.",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Handshake representing business partnership",
  },
  {
    year: "2010",
    eraLabel: "Regional Expansion",
    title: "Opening The North",
    body: "The Lahore warehouse was a pivotal investment. Establishing a north-region distribution hub allowed Winmark to serve Punjab's booming manufacturing base — from biscuit factories in Sheikhupura to dairy processors in Faisalabad. Storage capacity doubled overnight, and a new chapter of national reach began.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Large industrial warehouse interior",
  },
  {
    year: "2015",
    eraLabel: "Specialization Era",
    title: "Depth Over Breadth",
    body: "Rather than chase every product category, Winmark made a deliberate choice: go deeper. The company built specialized expertise in high-demand segments — functional ingredients, flavor solutions, and bakery improvers. This focus attracted partnerships with multinational FMCG brands who valued a distributor that could speak their technical language.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Food science laboratory with ingredients",
  },
  {
    year: "2018",
    eraLabel: "Pre-Corporate Era",
    title: "Setting The Stage",
    body: "2018 was a year of deliberate consolidation. The leadership undertook a comprehensive review of every product line, supplier contract, and market segment. Redundancies were cut. Strategic alliances were deepened. The groundwork was laid for the most transformative year in the company's history — the 2019 corporate restructure that would formally launch Winmark Ingredients Pvt Ltd.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Business planning documents and strategy",
  },
]

/* ─── Grain Overlay (SVG noise as data URI) ─────────────────────────────── */
const GRAIN_STYLE: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "128px 128px",
}

/* ─── Milestone Card ────────────────────────────────────────────────────── */
function MilestoneBlock({
  milestone,
  index,
}: {
  milestone: (typeof LEGACY_MILESTONES)[0]
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-center mb-32 lg:mb-48"
    >
      {/* Image — alternates side */}
      <div className={`relative group ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        {/* Museum sepia + grain overlay */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={milestone.image}
            alt={milestone.imageAlt}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover transition-all duration-700 ease-in-out"
            style={{ filter: "sepia(0.55) grayscale(0.15) brightness(0.88)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "sepia(0) grayscale(0) brightness(1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "sepia(0.55) grayscale(0.15) brightness(0.88)"
            }}
          />
          {/* Grain overlay on image */}
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay" style={GRAIN_STYLE} />
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none rounded-2xl" />
        </div>

        {/* Floating year badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`absolute -bottom-5 ${isEven ? "-right-4 lg:-right-6" : "-left-4 lg:-left-6"} bg-[#0f172a] border border-[#1e535e]/60 rounded-xl px-5 py-3 shadow-xl`}
        >
          <span
            className="text-2xl font-bold text-teal-400"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {milestone.year}
          </span>
        </motion.div>
      </div>

      {/* Text */}
      <div className={`pt-10 lg:pt-0 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        {/* Era label */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-teal-500/80">
            {milestone.eraLabel}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            letterSpacing: "-0.02em",
          }}
        >
          {milestone.title}
        </motion.h2>

        {/* Divider */}
        <div className="w-12 h-px bg-teal-500/50 mb-6" />

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-300 font-light leading-loose"
          style={{ lineHeight: "1.85", fontSize: "1.05rem" }}
        >
          {milestone.body}
        </motion.p>
      </div>
    </motion.article>
  )
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */
export function LegacyHistoryPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Parallax: background year moves at 30% the speed of scroll
  const bgYearY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  // Foreground hero text moves slightly faster (subtle)
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])

  return (
    <div className="bg-[#0a0f1e] text-white antialiased min-h-screen" style={{ ...GRAIN_STYLE }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1e]"
      >
        {/* Grain base */}
        <div className="absolute inset-0 pointer-events-none opacity-60" style={GRAIN_STYLE} />

        {/* Parallax background year */}
        <motion.div
          style={{ y: bgYearY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden="true"
        >
          <span
            className="text-[22vw] font-black leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.06)",
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}
          >
            2001
          </span>
        </motion.div>

        {/* Radial ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(30,83,94,0.22) 0%, transparent 70%)",
          }}
        />

        {/* Hero text — foreground */}
        <motion.div
          style={{ y: heroTextY }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-teal-400/80">
              <span className="h-px w-6 bg-teal-500/50 inline-block" />
              Winmark Ingredients · Est. 2001
              <span className="h-px w-6 bg-teal-500/50 inline-block" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold leading-[0.95] mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              letterSpacing: "-0.03em",
            }}
          >
            25 Years of{" "}
            <em
              className="not-italic"
              style={{ color: "#4a9aaa" }}
            >
              Excellence.
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
            style={{ lineHeight: "1.8" }}
          >
            From a single warehouse in Karachi to a national ingredient powerhouse — every year of this journey was built on precision, partnership, and purpose.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-16 flex flex-col items-center gap-2 text-slate-600"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-px h-10 bg-gradient-to-b from-teal-500/40 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ── MILESTONES ───────────────────────────────────────────────── */}
      <section className="relative py-28 px-6 md:px-12 lg:px-20">
        {/* Section intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="max-w-7xl mx-auto mb-24 text-center"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-teal-500/70">
            2001 — 2018
          </span>
          <h2
            className="mt-3 text-5xl md:text-6xl font-bold text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              letterSpacing: "-0.025em",
            }}
          >
            The Founding Chapter
          </h2>
          <p className="mt-5 text-slate-400 max-w-xl mx-auto font-light" style={{ lineHeight: "1.8" }}>
            Before the formal restructure, there were years of deliberate, methodical growth. Each milestone laid a brick in the foundation of what Winmark is today.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="max-w-7xl mx-auto">
          {LEGACY_MILESTONES.map((m, i) => (
            <MilestoneBlock key={m.year} milestone={m} index={i} />
          ))}
        </div>

        {/* Chapter transition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mt-8 py-20 border-t border-slate-800"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-teal-500/70 block mb-4">
            What Came Next
          </span>
          <h3
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              letterSpacing: "-0.02em",
            }}
          >
            The New Era Begins.
          </h3>
          <p className="text-slate-400 font-light mb-10" style={{ lineHeight: "1.8" }}>
            In 2019, Winmark Ingredients Pvt Ltd was formally established — ushering in a new era of corporate precision, specialized divisions, and national market leadership.
          </p>
          <Link
            to="/history"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #1e535e 0%, #0f766e 100%)",
              boxShadow: "0 0 0 1px rgba(20,184,166,0.3)",
            }}
          >
            View The New Era
            <ArrowLeft size={14} className="rotate-180" />
          </Link>
        </motion.div>
      </section>

      {/* ── FLOATING BACK BUTTON ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-8 right-6 z-50"
      >
        <Link
          to="/history"
          className="flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]"
          style={{
            background: "rgba(14, 25, 40, 0.85)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(20,184,166,0.3)",
          }}
          aria-label="Back to Overview"
        >
          <ArrowLeft size={13} />
          Back to Overview
        </Link>
      </motion.div>

    </div>
  )
}
