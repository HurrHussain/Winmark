import { useState, useRef, lazy, Suspense } from "react"
import {
  Warehouse,
  CheckCircle2,
  Snowflake,
  Thermometer,
  Zap,
  ArrowRight
} from "lucide-react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"
import { FacilityCard } from "@/components/services/FacilityCard"

const InfrastructureGallery = lazy(() => import("@/components/sections/InfrastructureGallery"))

const BASE_URL = import.meta.env.BASE_URL || "/"

// UPDATED: Removed duplicate entry and applied the specific .png image names
const FACILITIES = [
  {
    title: "Karachi Office & Distribution Hub",
    image: `${BASE_URL}img-services/office.png`,
    Icon: Warehouse,
    features: [
      { icon: CheckCircle2, label: "Capacity", value: "20+ Workstations" },
      { icon: CheckCircle2, label: "Capacity", value: "10+ Vehicles" },
      { icon: CheckCircle2, label: "Facilities", value: "24/7 Surveillance" },
    ]
  },
  {
    title: "Lahore Warehouse",
    image: `${BASE_URL}img-services/warehouse1.png`,
    Icon: Snowflake,
    features: [
      { icon: Thermometer, label: "Temperature", value: "Ambient/Cold" },
      { icon: CheckCircle2, label: "Storage", value: "5000 Sq Ft" },
      { icon: Zap, label: "Power", value: "Backup Available" },
    ]
  },
  {
    title: "karachi Warehouse",
    image: `${BASE_URL}img-services/parking.png`,
    Icon: Warehouse,
    features: [
      { icon: Thermometer, label: "Temperature", value: "Ambient/Cold" },
      { icon: CheckCircle2, label: "Storage", value: "5000 Sq Ft" },
      { icon: Zap, label: "Power", value: "Backup Available" },
    ]
  },
  {
    title: "Lahore Office & Distribution Hub",
    image: `${BASE_URL}img-services/warehouse2.png`,
    Icon: Snowflake,
    features: [
      { icon: CheckCircle2, label: "Capacity", value: "5+ Vehicles" },
      { icon: CheckCircle2, label: "Security", value: "24/7 Surveillance" },
      { icon: Zap, label: "Power", value: "Backup Available" },
    ]
  }
];

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
    <div className="bg-[var(--midnight-slate)] text-slate-200 antialiased min-h-screen flex flex-col pt-16 md:pt-24">

      {/* Infrastructure Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[85vh] flex items-stretch overflow-hidden">
        <motion.div
          style={{
            backgroundImage: "url('/infrastructure-bg.jfif')",
            opacity: bgOpacity
          }}
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000"
        />
        <div className="absolute inset-0 z-10 bg-slate-950/40" />

        <div className="relative z-20 w-full md:w-[45%] lg:w-[40%] bg-white/5 backdrop-blur-[60px] border-r border-white/10 flex flex-col px-5 sm:px-8 md:px-16 py-16 sm:py-24 md:py-32 min-h-full">
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter text-white drop-shadow-2xl leading-[0.9] mb-6 sm:mb-10">
                THE INFRASTRUCTURE <br />
                POWERING THE <br />
                INDUSTRY.
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-md leading-relaxed mb-8 sm:mb-12 font-medium border-l-2 border-teal-500/50 pl-4 sm:pl-6">
                Over 250,000 square feet of hybrid warehousing and advanced cold-chain logistics, engineered to maintain the absolute integrity of Pakistan's food supply.
              </p>
            </div>

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

      <div id="facilities" />

      {/* Lead-in Typography Section */}
      <section ref={leadInSectionRef} className="pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-left"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
            Strategic Nodes in the <br /> National Supply Chain.
          </h2>
          <div className="h-1 w-10 bg-[#1e535e] mb-8" />
          <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
            Maintaining the absolute integrity of industrial ingredients through specialized,
            high-capacity environments designed for Pakistan's most demanding food manufacturers.
          </p>
        </motion.div>
      </section>

      {/* Facilities Grid */}
      <section className="pb-16 sm:pb-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FACILITIES.map((facility, idx) => (
            <FacilityCard
              image={facility.image}
              imagePlaceholderText={""}
              key={idx}
              index={idx}
              title={facility.title}
              Icon={facility.Icon}
              features={facility.features}
              imageAlt={facility.title}
            />
          ))}
        </div>
      </section>

      <Suspense fallback={
        <div className="py-32 px-6 md:px-12 max-w-7xl mx-auto w-full animate-pulse">
          <div className="h-4 w-32 bg-slate-800 rounded mb-4" />
          <div className="h-12 w-96 bg-slate-800 rounded mb-24" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="h-96 bg-slate-800 rounded-2xl" />
            <div className="space-y-4">
              <div className="h-8 w-64 bg-slate-800 rounded" />
              <div className="h-32 w-full bg-slate-800 rounded" />
            </div>
          </div>
        </div>
      }>
        <InfrastructureGallery />
      </Suspense>
     
      <SupplyChainCTA />

    </div>
  );
}

function SupplyChainCTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 md:px-12 relative overflow-hidden bg-[var(--midnight-slate)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="text-left flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Secure Your Supply Chain Today.
            </h2>
            <p className="text-lg text-slate-400 font-medium max-w-2xl">
              Partner with Winmark for resilient, scalable, and compliant logistics across Pakistan.
            </p>
          </div>
         
          <div className="relative group overflow-visible">
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] rounded-full pointer-events-none z-0"
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