import {
  Warehouse,
  CheckCircle2,
  Snowflake,
  Thermometer,
  Zap,
  ShieldCheck,
  Truck,
  Globe,
  ArrowRight
} from "lucide-react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { FacilityCard } from "@/components/services/FacilityCard"
import { StrengthCard } from "@/components/services/StrengthCard"

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

const STRENGTHS = [
  {
    title: "Nationwide Cold-Chain Fleet",
    description: "A robust fleet of temperature-controlled transit vehicles ensuring uninterrupted environmental stability from port to production line across Pakistan.",
    Icon: Truck
  },
  {
    title: "QA & Traceability",
    description: "Rigorous food safety standards with granular lot tracking and digital compliance records, mitigating risk for every ingredient batch.",
    Icon: ShieldCheck
  },
  {
    title: "Global Import Capacity",
    description: "Seamless handling of high-tonnage international shipments, facilitating strategic partnerships with global leaders like IFFCO.",
    Icon: Globe
  }
];

export function ServicesPage() {
  return (
    <div className="bg-[#0f172a] text-slate-200 antialiased min-h-screen flex flex-col pt-20 md:pt-24">

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 px-6 md:px-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8ed3891d17?auto=format&fit=crop&q=80')" }}
        ></motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest block mb-4">
              Industrial Logistics
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white">
              The Infrastructure Powering Pakistan's Food Industry.
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
              Over *** square feet of hybrid warehouse storage, seamless cold-chain logistics, and strict quality assurance ensuring your production never stops.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
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

      {/* Operational Strengths */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold text-teal-400 uppercase tracking-widest block mb-2">
              Core Competencies
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              End-to-End Operational Strength
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STRENGTHS.map((strength, idx) => (
              <StrengthCard
                key={idx}
                index={idx}
                {...strength}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 bg-[#1e535e] text-white text-center mb-0 mt-auto overflow-hidden relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white blur-3xl"
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Secure Your Supply Chain Today.
          </h2>
          <p className="text-lg text-teal-50 mb-8 leading-relaxed">
            Partner with Winmark to ensure resilient, scalable, and compliant logistics for your enterprise.
          </p>
          <Link to="/contact" className="block w-fit mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-500 text-white text-xs font-semibold uppercase tracking-widest px-8 py-4 rounded-md hover:bg-teal-400 transition-colors duration-300 flex items-center justify-center gap-2 shadow-xl shadow-black/10"
            >
              Discuss Your Volume Requirements
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </section>

    </div>
  );
}
