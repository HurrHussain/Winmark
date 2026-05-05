import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LegacySignature() {
  // Animation for the handwritten signature
  const signatureDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2.5, ease: "easeInOut", delay: 0.5 },
    },
  };

  return (
    <section className="w-full bg-[#020617] py-24 md:py-40 px-6 md:px-12 lg:px-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* Left Column: The Duotone Portrait */}
        <div className="lg:col-span-5 relative group">
          {/* Decorative Technical Frame */}
          <div className="absolute -inset-4 border border-teal-500/20 translate-x-2 translate-y-2 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0"></div>

          <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
            {/* THE DUOTONE TRICK: 
              1. The image is grayscale.
              2. The teal overlay uses mix-blend-multiply to color the darks.
            */}
            <img
              src={`${import.meta.env.BASE_URL}riaz.png`}
              alt="Riaz Hussain"
              className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-teal-900 mix-blend-multiply opacity-60"></div>

            {/* Subtle bottom gradient to blend with the background */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020617] to-transparent"></div>
          </div>
        </div>

        {/* Right Column: The Quote & Signature */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.2] tracking-tight mb-8">
              "We don't just supply ingredients. We engineer the certainty that your production lines never stop."
            </h2>

            <div className="flex flex-col gap-1 mb-12">
              <span className="text-white font-bold text-lg tracking-wide uppercase">Riaz Hussain</span>
              <span className="text-teal-500 text-sm font-mono tracking-widest uppercase">CEO</span>
            </div>

            {/* The Animated SVG Signature
            <div className="w-64 h-24 relative mb-12 opacity-80">
              <motion.svg
                viewBox="0 0 400 150"
                className="w-full h-full stroke-white fill-transparent stroke-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M 50 100 C 70 80, 80 50, 90 70 C 100 90, 100 120, 110 90 C 120 60, 140 40, 150 70 C 160 100, 180 120, 200 90 C 220 60, 240 50, 250 80 C 260 110, 280 100, 320 80 M 130 80 L 170 80"
                  variants={signatureDraw}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            </div> */}

            {/* The Funnel to the Team Page */}
            <Link
              to="/about/team"
              className="inline-flex items-center gap-4 text-slate-400 hover:text-teal-400 transition-colors duration-300 font-mono text-sm tracking-widest uppercase group"
            >
              <span>Meet the generations behind the movement</span>
              <span className="transform transition-transform group-hover:translate-x-2">→</span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
