import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Warehouse, Truck, FlaskConical, Target } from "lucide-react"

const services = [
  {
    icon: Warehouse,
    title: "Bulk Warehousing",
    description:
      "Strategic high-volume industrial warehousing across Karachi and Lahore. Climate-controlled storage for bulk commodities and specialty ingredients.",
  },
  {
    icon: Truck,
    title: "Nationwide Distribution",
    description:
      "Agile, reliable supply chain network reaching major food manufacturers, confectioneries, and bakeries across all major Pakistani cities.",
  },
  {
    icon: FlaskConical,
    title: "Technical Support",
    description:
      "Ingredient specification matching and R&D assistance. Our technical team helps you by providing precise technical oversight and operational efficiency.",
  },
  {
    icon: Target,
    title: "Strategic Sourcing",
    description:
      "Direct relationships with global suppliers. We source cocoa, dairy, fats, and specialty additives at competitive pricing.",
  },
]

export function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section id="services" className="bg-slate-50 py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-winmark" />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-winmark">
              What We Do
            </span>
            <div className="h-px w-8 bg-winmark" />
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-winmark"
          >
            Our Services
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
            End-to-end ingredient supply chain solutions — from global sourcing to your factory floor.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: idx * 0.12 }}
                className="group bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-winmark bg-winmark-light"
                >
                  <Icon
                    className="w-5 h-5 transition-colors duration-300 group-hover:text-white text-winmark"
                  />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold mb-2.5 text-winmark">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>

                {/* Bottom accent */}
                <div
                  className="mt-6 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-full bg-winmark opacity-25"
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
