import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const metrics = [
  {
    id: 1,
    ghostData: "25",
    title: "Years of Heritage",
    description: "A quarter-century of uninterrupted supply chain resilience, navigating market volatility with unwavering integrity.",
  },
  {
    id: 2,
    ghostData: "120+",
    title: "Global Products",
    description: "A comprehensive portfolio of specialty fats, cocoa derivatives, and industrial dairy sourced from premier manufacturers.",
  },
  {
    id: 3,
    ghostData: "100%",
    title: "Fulfillment Rate",
    description: "Engineered logistics networks ensuring zero-downtime delivery for Pakistan's largest manufacturing brands.",
  }
];

export default function QuantitativeShield() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of this specific container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress into vertical movement (Parallax)
  // The numbers will move slowly upwards as the user scrolls down
  const yGhost = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#020617] py-32 overflow-hidden border-t border-slate-800/50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col gap-32">
        
        {metrics.map((metric, index) => (
          <div 
            key={metric.id} 
            className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
          >
            {/* The Background Parallax Ghost Number */}
            <motion.div 
              style={{ y: yGhost }}
              className="absolute z-0 select-none pointer-events-none"
            >
              <span className="text-[12rem] md:text-[20rem] lg:text-[25rem] font-black font-mono leading-none text-slate-100 opacity-[0.03]">
                {metric.ghostData}
              </span>
            </motion.div>

            {/* The Foreground Content */}
            <div className="relative z-10 max-w-lg">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                {metric.title}
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                {metric.description}
              </p>
              
              {/* Technical Accent Line */}
              <div className="h-[2px] w-12 bg-teal-500 mt-8 opacity-50"></div>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
