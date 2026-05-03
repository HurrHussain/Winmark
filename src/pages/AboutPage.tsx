import { motion } from "framer-motion"
import { Shield, Target, Users, Award, CheckCircle2 } from "lucide-react"

export function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  }

  const values = [
    {
      icon: <Shield className="w-6 h-6 text-[#1e535e]" />,
      title: "Quality Assurance",
      description: "We adhere to the highest international food safety standards, ensuring every ingredient meets rigorous quality benchmarks."
    },
    {
      icon: <Target className="w-6 h-6 text-[#1e535e]" />,
      title: "Strategic Sourcing",
      description: "Leveraging two decades of industry expertise to source the finest ingredients from trusted global partners."
    },
    {
      icon: <Users className="w-6 h-6 text-[#1e535e]" />,
      title: "Customer Centric",
      description: "Building long-term partnerships through transparent communication and dedicated technical support."
    },
    {
      icon: <Award className="w-6 h-6 text-[#1e535e]" />,
      title: "Industry Excellence",
      description: "Recognized as a leading distributor in Pakistan, powering some of the nation's most beloved food brands."
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-[#f8fafc]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 100 M100 0 L0 100" stroke="currentColor" strokeWidth="0.1" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1e535e]/10 text-[#1e535e] text-xs font-bold tracking-widest uppercase mb-6">
              Our Legacy
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Pioneering the Future of <span className="text-[#1e535e]">Food Ingredients</span> in Pakistan.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Established in 2001, Winmark Ingredients has grown from a specialized importer to a cornerstone of Pakistan's food manufacturing supply chain. We bridge the gap between global innovation and local excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 lg:px-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              To empower Pakistan's food industry by providing world-class ingredients, technical expertise, and sustainable supply chain solutions that enhance the quality of life for consumers nationwide.
            </p>
            <div className="space-y-4">
              {[
                "Global sourcing from certified partners",
                "Strict adherence to ISO & Halal standards",
                "Technical support for product formulation",
                "Reliable nationwide distribution network"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1e535e]" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            {...fadeIn}
            className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-slate-200"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1e535e]/20 to-transparent" />
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
              alt="Quality Control" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600">
              The principles that guide our decisions and define our commitment to our partners and the community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-[#1e535e]/30 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#1e535e]/5 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 lg:px-8 bg-[#1e535e] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Years of Excellence", val: "22+" },
            { label: "Global Partners", val: "15+" },
            { label: "Food Ingredients", val: "500+" },
            { label: "Satisfied Clients", val: "100+" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.val}</div>
              <div className="text-white/60 text-sm font-medium tracking-wide uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 lg:px-8 text-center overflow-hidden relative">
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Partner with the Industry Leader</h2>
          <p className="text-lg text-slate-600 mb-10">
            Discover how our technical expertise and premium ingredient portfolio can elevate your products.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#1e535e] text-white font-bold hover:bg-[#16424b] transition-all transform hover:scale-105 shadow-lg"
          >
            Work with Us
          </a>
        </div>
      </section>
    </div>
  )
}
