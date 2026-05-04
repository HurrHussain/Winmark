import { useState } from "react"
import {
  Warehouse,
  CheckCircle2,
  Snowflake,
  Thermometer,
  Zap,
  ArrowRight
} from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FacilityCard } from "@/components/services/FacilityCard"
import { lazy, Suspense } from "react"

const InfrastructureGallery = lazy(() => import("@/components/sections/InfrastructureGallery"))

const FACILITIES = [
  {
    title: "Karachi: Ambient Storage",
    imagePlaceholderText: "[INSERT PICTURE:\nKARACHI AMBIENT FACILITY]",
    Icon: Warehouse,
    features: [
      { icon: CheckCircle2, label: "Capacity", value: "[Sq Ft Capacity]" },
      { icon: CheckCircle2, label: "Pallets", value: "[Pallet Positions]" },
      { icon: CheckCircle2, label: "Inventory", value: "[Inventory System]" },
    ]
  },
  {
    title: "Lahore: Ambient Storage",
    imagePlaceholderText: "[INSERT PICTURE:\nLAHORE AMBIENT FACILITY]",
    Icon: Warehouse,
    features: [
      { icon: CheckCircle2, label: "Capacity", value: "[Sq Ft Capacity]" },
      { icon: CheckCircle2, label: "Pallets", value: "[Pallet Positions]" },
      { icon: CheckCircle2, label: "Inventory", value: "[Inventory System]" },
    ]
  },
  {
    title: "Karachi: Cold Storage",
    imagePlaceholderText: "[INSERT PICTURE:\nKARACHI COLD STORAGE]",
    Icon: Snowflake,
    features: [
      { icon: Thermometer, label: "Temperature", value: "[Temperature Range]" },
      { icon: CheckCircle2, label: "Pallets", value: "[Pallet Positions]" },
      { icon: Zap, label: "Power", value: "[Backup Power System]" },
    ]
  },
  {
    title: "Lahore: Cold Storage",
    imagePlaceholderText: "[INSERT PICTURE:\nLAHORE COLD STORAGE]",
    Icon: Snowflake,
    features: [
      { icon: Thermometer, label: "Temperature", value: "[Temperature Range]" },
      { icon: CheckCircle2, label: "Pallets", value: "[Pallet Positions]" },
      { icon: Zap, label: "Power", value: "[Backup Power System]" },
    ]
  }
];



import { useRef } from "react"
import { useScroll, useTransform } from "framer-motion"

export function ServicesPage() {
  const leadInSectionRef = useRef<HTMLElement>(null)
  
  // Track scroll progress of the "Strategic Nodes" section
  const { scrollYProgress } = useScroll({
    target: leadInSectionRef,
    offset: ["start end", "center center"]
  })

  // Fade background from 1 to 0 as section enters
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="bg-[var(--midnight-slate)] text-slate-200 antialiased min-h-screen flex flex-col pt-20 md:pt-24">

      {/* Infrastructure Hero Section */}
      <section className="relative min-h-[85vh] flex items-stretch overflow-hidden">
        {/* Background Image — Linked to Scroll Opacity */}
        <motion.div 
          style={{ 
            backgroundImage: "url('./infrastructure-bg.jfif')",
            opacity: bgOpacity 
          }}
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000"
        />
        {/* Base Dark Overlay */}
        <div className="absolute inset-0 z-10 bg-slate-950/40" />

        {/* Vertical Frosted Pillar */}
        <div className="relative z-20 w-full md:w-[45%] lg:w-[40%] bg-white/5 backdrop-blur-[60px] border-r border-white/10 flex flex-col px-8 md:px-16 py-32 min-h-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col h-full"
          >
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-[10px] md:text-xs font-black text-teal-400 uppercase tracking-[0.4em] mb-8 block">
                Enterprise Infrastructure
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-2xl leading-[0.9] mb-10">
                THE INFRASTRUCTURE <br /> 
                POWERING THE <br /> 
                INDUSTRY.
              </h1>
              <p className="text-base md:text-lg text-slate-200 max-w-md leading-relaxed mb-12 font-medium border-l-2 border-teal-500/50 pl-6">
                Over 250,000 square feet of hybrid warehousing and advanced cold-chain logistics, engineered to maintain the absolute integrity of Pakistan's food supply.
              </p>
            </div>

            {/* Buttons at bottom of pillar — Left Aligned */}
            <div className="flex flex-col sm:flex-row gap-5 mt-auto pt-12">
              <Link to="/contact">
                <button className="w-full sm:w-auto bg-white text-slate-950 px-10 py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-2xl">
                  Discuss Volume
                </button>
              </Link>
              <button 
                onClick={() => document.getElementById('facilities')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto border border-white/30 text-white px-10 py-4 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                View Facilities
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Anchor for scroll */}
      <div id="facilities" />

      {/* Lead-in Typography Section — The trigger for the fade */}
      <section ref={leadInSectionRef} className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-left"
        >
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
            Strategic Nodes in the <br /> National Supply Chain.
          </h2>
          {/* Teal Accent Line */}
          <div className="h-1 w-10 bg-[#1e535e] mb-8" />
          <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
            Maintaining the absolute integrity of industrial ingredients through specialized, 
            high-capacity environments designed for Pakistan's most demanding food manufacturers.
          </p>
        </motion.div>
      </section>

      {/* Facilities Grid */}
      <section className="pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES.map((facility, idx) => (
            <FacilityCard
              key={idx}
              index={idx}
              {...facility}
              imageAlt={facility.title}
            />
          ))}
        </div>
      </section>

      {/* Long-Form Capability Showcase (Lazy Loaded) */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-teal-500/50">Loading Gallery...</div>}>
        <InfrastructureGallery />
      </Suspense>
      {/* Secure Your Supply Chain CTA */}
      <SupplyChainCTA />

    </div>
  );
}

function SupplyChainCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-16 px-6 md:px-12 relative overflow-visible bg-[var(--midnight-slate)]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-left flex-1">
            <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Secure Your Supply Chain Today.
            </h2>
            <p className="text-lg text-slate-400 font-medium max-w-2xl">
              Partner with Winmark for resilient, scalable, and compliant logistics across Pakistan.
            </p>
          </div>
          
          <div className="relative group overflow-visible">
            {/* Dynamic Glow Layer */}
            <motion.div 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
              style={{
                background: "radial-gradient(circle, rgba(20, 184, 166, 0.3) 0%, transparent 70%)",
                filter: "blur(64px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? [1, 1.1, 1] : 1
              }}
              transition={{
                opacity: { duration: 0.5 },
                scale: { 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }
              }}
            />

            <Link to="/contact">
              <motion.button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-950 px-10 py-5 font-black uppercase text-xs tracking-widest hover:bg-teal-500 hover:text-white transition-all duration-300 shadow-2xl flex items-center gap-3 whitespace-nowrap relative z-20"
              >
                Discuss Volume Requirements
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
