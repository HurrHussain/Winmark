import { motion } from 'framer-motion';

// The animation variants for the SVG drawing effect
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { type: 'spring', duration: 3, bounce: 0 },
      opacity: { duration: 0.5 },
    },
  },
};

const textFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, delay: 0.5 } 
  },
};

const streams = [
  {
    id: '01',
    title: 'Specialty Oils & Fats',
    desc: 'Engineered lipid solutions ensuring exact melting curves and structural integrity for industrial manufacturing.',
    // Abstract Chemical Molecule / Node connection path
    svgPath: 'M20 80 L 50 20 L 150 20 L 180 80 M50 20 L 100 60 L 150 20 M100 60 L 100 120 M70 140 A 30 30 0 1 0 130 140', 
  },
  {
    id: '02',
    title: 'Cocoa Derivatives',
    desc: 'Alkalised powders and raw mass sourced from the global vanguard, processed for strict microbiological compliance.',
    // Abstract Global Network / Latticework path
    svgPath: 'M10 50 Q 50 10 100 50 T 190 50 M10 100 Q 50 60 100 100 T 190 100 M50 30 L 50 120 M150 30 L 150 120',
  },
  {
    id: '03',
    title: 'Industrial Dairy',
    desc: 'High-yield dry milk and butter oil frameworks designed for scalable bakery and HoReCa deployments.',
    // Abstract Structural / Silo framework path
    svgPath: 'M40 160 L 40 40 Q 100 10 160 40 L 160 160 Z M40 80 L 160 80 M40 120 L 160 120 M100 40 L 100 160',
  },
];

export default function BlueprintPillars() {
  return (
    <section className="w-full bg-[#020617] py-32 px-6 md:px-12 lg:px-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-24">
          <h2 className="text-teal-500 font-mono text-sm tracking-widest uppercase mb-4">// Core Infrastructure</h2>
          <p className="text-3xl md:text-5xl font-bold text-white max-w-3xl leading-tight">
            The structural framework powering Pakistan's premier ingredient supply chain.
          </p>
        </div>

        {/* The Blueprint Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          {streams.map((stream) => (
            <motion.div 
              key={stream.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }} // Triggers when user scrolls near it
              className="relative border-l border-slate-800 pl-8 pb-12"
            >
              {/* The Index Number */}
              <div className="absolute -left-[17px] top-0 bg-[#020617] text-teal-500 font-mono text-xs border border-teal-500/30 px-2 py-1 rounded">
                {stream.id}
              </div>

              {/* The Animated SVG Canvas */}
              <div className="h-48 w-full mb-8 relative opacity-60">
                <motion.svg
                  viewBox="0 0 200 200"
                  className="w-full h-full stroke-teal-500/80 stroke-1 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)] fill-transparent"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d={stream.svgPath}
                    variants={draw}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </div>

              {/* The Typographic Content */}
              <motion.div variants={textFade}>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{stream.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {stream.desc}
                </p>
              </motion.div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
