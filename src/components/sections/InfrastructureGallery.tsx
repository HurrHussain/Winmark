import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export default function InfrastructureGallery() {
  return (
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-left">
          <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] block mb-4">
            Core Competencies
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            End-to-End <br /> Operational Strength
          </h2>
        </div>

        <div className="flex flex-col gap-32">
          {/* Fleet Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            <div className="order-2 lg:order-1">
              <span className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-4 block">
                Uninterrupted Cold Chain
              </span>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                Nationwide Cold-Chain Fleet
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Our logistics network is powered by specialized reefer units and real-time environmental logging, 
                ensuring that sensitive ingredients maintain their absolute thermal profile from port to 
                production line across Pakistan.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "GPS Real-time Tracking", 
                  "Multi-temp Zones", 
                  "24/7 Remote Monitoring", 
                  "Preventative Maintenance"
                ].map((spec) => (
                  <li key={spec} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative aspect-video lg:aspect-square overflow-hidden rounded-2xl group min-h-[300px] w-full">
              <img 
                loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1586191582151-f705663764b8?auto=format&fit=crop&q=80" 
                alt="Fleet Logistics"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-teal-900/10 mix-blend-overlay" />
            </div>
          </motion.div>

          {/* QA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-2xl group min-h-[300px] w-full">
              <img 
                loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                alt="Quality Assurance"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-teal-900/10 mix-blend-overlay" />
            </div>
            <div>
              <span className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-4 block">
                The Digital Backbone
              </span>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                QA & Traceability
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                We implement a rigorous quality assurance framework featuring granular lot tracking and sample 
                archiving. Our systems are built for international safety compliance, providing full transparency 
                for every ingredient batch.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Batch-level Traceability", 
                  "ISO Compliance", 
                  "Digital Sample Archive", 
                  "Risk Mitigation Audit"
                ].map((spec) => (
                  <li key={spec} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Global Reach Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center"
          >
            <div className="order-2 lg:order-1">
              <span className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-4 block">
                Network Reach
              </span>
              <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-6">
                Global Import Capacity
              </h3>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Leveraging strategic partnerships with global leaders like IFFCO, we facilitate high-tonnage 
                international shipments with unmatched port-to-production speed. Our scale ensures supply chain 
                resilience for Pakistan's largest food enterprises.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Strategic IFFCO Partner", 
                  "Priority Port Clearance", 
                  "High-Volume Logistics", 
                  "Resilient Global Sourcing"
                ].map((spec) => (
                  <li key={spec} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative aspect-video lg:aspect-square overflow-hidden rounded-2xl group min-h-[300px] w-full">
              <img 
                loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&q=80" 
                alt="Global Distribution"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-teal-900/10 mix-blend-overlay" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
