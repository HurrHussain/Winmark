import { motion } from "framer-motion"
import { Calendar, Award, Building2, Users, TrendingUp, History as HistoryIcon } from "lucide-react"
import { Link } from "react-router-dom"

const TIMELINE_EVENTS = [
  {
    year: "2001",
    title: "The Foundation",
    description: "Winmark began its journey as a boutique sourcing agent for high-quality food ingredients, bridging the gap between global producers and local manufacturers in Karachi.",
    Icon: Building2,
  },
  {
    year: "2010",
    title: "Regional Expansion",
    description: "Successfully expanded operations to Lahore, establishing a north-region distribution hub and doubling our warehousing capacity to serve the growing Punjab market.",
    Icon: TrendingUp,
  },
  {
    year: "2019",
    title: "Corporate Restructure",
    description: "Officially registered as Winmark Ingredients Pvt Ltd. A strategic shift focused on specialized sales divisions for Direct Industries, HoReCa, and Bakeries.",
    Icon: Users,
  },
  {
    year: "2021",
    title: "Infrastructure Milestone",
    description: "Surpassed 500,000 square feet of total storage space across Pakistan, including state-of-the-art cold chain facilities for temperature-sensitive ingredients.",
    Icon: Award,
  },
  {
    year: "2023 – Present",
    title: "Digital & Supply Chain Excellence",
    description: "Integrating advanced inventory management and digital traceability to ensure the highest standards of food safety and supply chain resilience.",
    Icon: HistoryIcon,
  }
];

export function HistoryPage() {
  return (
    <div className="bg-[#0f172a] text-slate-200 antialiased min-h-screen pt-20">
      
      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-12 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Calendar size={14} /> Our Heritage
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              A Legacy of <span className="text-teal-500">Quality.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              For over two decades, Winmark has been the silent partner behind Pakistan's most successful food brands, ensuring quality from source to plate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6 md:px-12 bg-[#0f172a]">
        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-0 md:left-1/2 md:-translate-x-px">
            {TIMELINE_EVENTS.map((event, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative mb-20 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12 md:text-right md:ml-0' : 'md:pl-12 md:ml-auto'}`}
              >
                {/* Dot */}
                <div className="absolute top-0 w-8 h-8 rounded-full bg-[#1e293b] border-4 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.5)] z-10 -left-[17px] md:left-auto md:right-0 md:translate-x-1/2" 
                     style={{ left: idx % 2 === 0 ? 'auto' : '-17px', right: idx % 2 === 0 ? '-17px' : 'auto' }} />
                
                {/* Content Card */}
                <div className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-colors shadow-xl">
                  <div className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-teal-400 mb-4 ${idx % 2 === 0 ? 'md:ml-auto' : ''}`}>
                    <event.Icon size={24} />
                  </div>
                  <span className="text-teal-400 font-bold text-lg block mb-1">{event.year}</span>
                  <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Transition Section */}
      <section className="py-24 px-6 md:px-12 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square max-w-md mx-auto"
            >
              <div className="absolute inset-0 bg-teal-500/20 rounded-3xl rotate-6"></div>
              <div className="absolute inset-0 bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl">
                <img 
                  src="/riaz.png" 
                  alt="Winmark Leadership" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                The 2019 <span className="text-teal-500">Vision Shift.</span>
              </h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed font-light">
                <p>
                  In 2019, Winmark underwent a profound leadership transition that redefined our market strategy. This wasn't just a change in management—it was a total corporate evolution into <strong className="text-white font-medium">Winmark Ingredients Pvt Ltd.</strong>
                </p>
                <p>
                  By segmenting our expertise into specialized divisions for HoReCa, B2B Industry, and Retail, we unlocked a new level of service precision. Today, this structure allows us to anticipate market shifts and provide the tailored technical support that modern food production demands.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 text-center border-t border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-6">Want to learn more about our certifications?</h2>
        <Link to="/contact" className="inline-block px-8 py-3 bg-slate-800 hover:bg-slate-700 text-teal-400 font-bold rounded-lg border border-teal-500/30 transition-all">
          Contact Our Compliance Team
        </Link>
      </section>

    </div>
  );
}
