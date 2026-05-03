import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

/* ─── Data ──────────────────────────────────────────────────────────────── */
const MILESTONES = [
  {
    year: "2001",
    eraLabel: "The Foundation Era",
    title: "The Karachi Genesis",
    body: "Winmark was born in the heart of Karachi's industrial district — a boutique sourcing agent with one mission: to bridge the gap between world-class food ingredient producers and the manufacturers who needed them most. Founded on trust and tireless relationship-building, the company quickly earned a reputation for reliability in a market that demanded it.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Food ingredients spread on a table",
  },
  {
    year: "2005",
    eraLabel: "Strategic Growth",
    title: "Global Supply Networks",
    body: "By 2005, the company had secured its first long-term agreements with European and Southeast Asian commodity producers. These partnerships gave Winmark exclusive access to premium-grade ingredients — from dairy emulsifiers to specialty starches — that were previously unavailable to Pakistan's domestic manufacturers at scale.",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Handshake representing business partnership",
  },
  {
    year: "2010",
    eraLabel: "National Expansion",
    title: "Opening the North",
    body: "The Lahore warehouse was a pivotal investment. Establishing a north-region distribution hub allowed Winmark to serve Punjab's booming manufacturing base — from biscuit factories in Sheikhupura to dairy processors in Faisalabad. Storage capacity doubled overnight, and a new chapter of national reach began.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Large industrial warehouse interior",
  },
  {
    year: "2015",
    eraLabel: "Specialization",
    title: "Technical Expertise",
    body: "Rather than chase every product category, Winmark made a deliberate choice: go deeper. The company built specialized expertise in high-demand segments — functional ingredients, flavor solutions, and bakery improvers. This focus attracted partnerships with multinational FMCG brands who valued a distributor that could speak their technical language.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Food science laboratory with ingredients",
  },
  {
    year: "2019",
    eraLabel: "The Corporate Era",
    title: "Winmark Ingredients Pvt Ltd",
    body: "A pivotal leadership transition brought a renewed, aggressive vision. The company underwent a full corporate restructure, officially registering as Winmark Ingredients Pvt Ltd. By reorganizing sales divisions for Direct Industries, HoReCa, and Bakeries, we significantly expanded our market footprint — powering Pakistan's food industry forward.",
    image: "./riaz.png",
    imageAlt: "Winmark Leadership Transition",
  },
  {
    year: "2021",
    eraLabel: "Modern Logistics",
    title: "Infrastructure Milestone",
    body: "Surpassing 500,000 square feet of total storage space across Pakistan, including state-of-the-art temperature-controlled facilities. This infrastructure ensures that sensitive ingredients like cocoa butter and functional fats maintain their chemical integrity from port to factory floor.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Strategic planning and modern infrastructure",
  },
  {
    year: "2024",
    eraLabel: "Digital Future",
    title: "Intelligence & Traceability",
    body: "Today, we are integrating advanced digital inventory management and real-time traceability. Our mission has evolved from simple distribution to becoming an intelligence-driven partner for the food industry, ensuring safety, compliance, and supply chain resilience for the next 25 years.",
    image: "https://images.unsplash.com/photo-1551288049-bbda3ef66851?auto=format&fit=crop&w=800&q=70",
    imageAlt: "Modern digital supply chain visualization",
  },
]

/* ─── Grain Overlay ─────────────────────────────────────────────────────── */
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
  milestone: (typeof MILESTONES)[0]
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-center mb-32 lg:mb-56"
    >
      {/* Image Container */}
      <div className={`relative group ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-900 border border-white/5">
          <img
            src={milestone.image}
            alt={milestone.imageAlt}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover transition-all duration-1000 ease-in-out"
            style={{ filter: "sepia(0.4) grayscale(0.1) brightness(0.85)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "sepia(0) grayscale(0) brightness(1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "sepia(0.4) grayscale(0.1) brightness(0.85)"
            }}
          />
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay" style={GRAIN_STYLE} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Year Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`absolute -bottom-6 ${isEven ? "-right-4 lg:-right-8" : "-left-4 lg:-left-8"} bg-[#0f172a] border border-teal-500/40 rounded-2xl px-6 py-4 shadow-2xl z-10`}
        >
          <span
            className="text-3xl font-bold text-teal-400"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            {milestone.year}
          </span>
        </motion.div>
      </div>

      {/* Text Content */}
      <div className={`pt-12 lg:pt-0 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-4"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-teal-500">
            {milestone.eraLabel}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            letterSpacing: "-0.02em",
          }}
        >
          {milestone.title}
        </motion.h2>

        <div className="w-16 h-px bg-teal-500/30 mb-8" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-slate-400 font-light leading-loose text-lg"
          style={{ lineHeight: "1.9" }}
        >
          {milestone.body}
        </motion.p>
      </div>
    </motion.article>
  )
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */
export function HistoryPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const bgYearY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <div className="bg-[#050810] text-white antialiased min-h-screen selection:bg-teal-500/30" style={{ ...GRAIN_STYLE }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#050810]"
      >
        <div className="absolute inset-0 pointer-events-none opacity-50" style={GRAIN_STYLE} />

        {/* Large background parallax year */}
        <motion.div
          style={{ y: bgYearY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="text-[25vw] font-black leading-none"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.05)",
              letterSpacing: "-0.05em",
            }}
          >
            2001
          </span>
        </motion.div>

        {/* Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 60%, rgba(20,184,166,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Hero content */}
        <motion.div
          style={{ y: heroTextY }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
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
            className="text-7xl md:text-9xl font-bold leading-tight mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              letterSpacing: "-0.04em",
            }}
          >
            Industrial <br />
            <span className="text-teal-500/90">Heritage.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            From Karachi's industrial hubs to a national powerhouse. Explore the methodical journey of Pakistan's premier ingredient partner.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-slate-500">Begin Exploration</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-teal-500 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── TIMELINE ─────────────────────────────────────────────────── */}
      <section className="relative py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        {MILESTONES.map((m, i) => (
          <MilestoneBlock key={m.year} milestone={m} index={i} />
        ))}
      </section>

      {/* ── FOOTER CTA ──────────────────────────────────────────────── */}
      <section className="py-40 px-6 text-center bg-black/20 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2
            className="text-5xl md:text-7xl font-bold mb-10"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
          >
            The Journey Continues.
          </h2>
          <p className="text-slate-500 text-lg mb-12 font-light leading-loose">
            Our history is just the foundation. We are building the future of food safety and supply chain resilience for Pakistan's largest manufacturing brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/contact"
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold py-5 px-10 rounded-2xl transition-all shadow-xl hover:shadow-teal-500/20"
            >
              Partner With Our Legacy
            </a>
            <a
              href="/products"
              className="bg-transparent border border-white/10 hover:border-teal-500/50 text-white font-bold py-5 px-10 rounded-2xl transition-all"
            >
              Explore Our Portfolio
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
