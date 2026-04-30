import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const clients = [
  {
    name: "Unilever",
    description: "Multinational FMCG Leader",
    initials: "UL",
    color: "#003087",
  },
  {
    name: "Dairyland (Dayfresh)",
    description: "Pakistan's Premier Dairy",
    initials: "DL",
    color: "#e31837",
  },
  {
    name: "Rehmat-e-Shereen",
    description: "Confectionery Heritage Brand",
    initials: "RS",
    color: "#8B4513",
  },
]

export function Clients() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="clients" className="bg-white py-24 px-6 lg:px-8">
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
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1e535e]">
              Trusted By
            </span>
            <div className="h-px w-8 bg-[#1e535e]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Our Clients
          </h2>
          <p className="mt-4 text-slate-500 max-w-lg mx-auto text-base leading-relaxed">
            Pakistan's most trusted food brands rely on Winmark for consistent, high-quality ingredient supply.
          </p>
        </motion.div>

        {/* Client logos */}
        <div
          ref={ref}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {clients.map((client, idx) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.15 }}
              className="group flex flex-col items-center gap-3 cursor-default"
            >
              {/* Logo block — grayscale default, color on hover */}
              <div
                className="w-28 h-28 rounded-2xl flex items-center justify-center border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                style={{ filter: "grayscale(100%)", transition: "filter 0.4s ease, transform 0.3s ease, box-shadow 0.3s ease" }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.filter = "grayscale(0%)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLDivElement).style.filter = "grayscale(100%)"
                }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: client.color }}
                >
                  <span className="text-white font-black text-xl tracking-tight">
                    {client.initials}
                  </span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-slate-800">{client.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{client.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <blockquote className="relative inline-block max-w-2xl mx-auto">
            <div
              className="absolute -top-4 left-0 text-6xl font-serif leading-none opacity-20"
              style={{ color: "#1e535e" }}
            >
              &ldquo;
            </div>
            <p className="text-lg md:text-xl font-medium text-slate-700 leading-relaxed px-8 italic">
              Winmark has been an invaluable partner in our ingredient procurement — reliable, technically competent, and always on time.
            </p>
            <footer className="mt-4 text-sm font-semibold text-slate-400 tracking-wide">
              — Industry Partner, Karachi
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  )
}
