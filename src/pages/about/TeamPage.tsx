import { motion } from "framer-motion"

export function TeamPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-white pt-24">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.05) 0%, transparent 70%)"
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold tracking-widest uppercase mb-6 border border-teal-500/20">
              Leadership
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              The Leadership Team
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
              Professionalism, Integrity, and Excellence across generations.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements to make it feel finished */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
      </section>

      {/* Team content */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            {/* Featured: Current Proprietor / CEO */}
            <div className="w-full bg-gradient-to-br from-slate-900/80 to-slate-800 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8">
              <div className="md:flex md:items-center md:gap-8">
                <div className="md:flex-shrink-0 w-full md:w-1/3 mb-4 md:mb-0">
                  <div className="w-full h-62 md:h-100 bg-slate-800 rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src="/riaz.png"
                      alt="Riaz Hussain"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        if (target.dataset.failed) return;
                        target.dataset.failed = 'true';
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.classList.add('bg-slate-800', 'text-slate-400', 'font-bold', 'text-4xl', 'font-serif');
                          parent.innerHTML = 'RH';
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="font-serif text-2xl text-slate-200 font-bold">Riaz Hussain</h3>
                  <p className="text-xs uppercase tracking-wider text-teal-400 font-semibold mb-4">Current Proprietor &amp; CEO</p>
                  <p className="text-slate-300 leading-relaxed">
                    Riaz Hussain continues to lead Winmark with a clear vision for national expansion and operational excellence.
                    As the proprietor and CEO, he oversees strategic direction, ensures supply continuity, and guides the company through
                    its ongoing transformation while honoring Winmark's legacy.
                  </p>
                </div>
              </div>
            </div>

            {/* Founding Partners / Legacy */}
            <div className="w-full mt-6">
              <div className="border-t border-slate-800 pt-8">
                <h4 className="text-sm uppercase text-teal-400 tracking-wider mb-6">Founding Partners</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: 'Zohaib Hooda', title: 'Co-Founder' },
                    { name: 'Hassan Hooda', title: 'Co-Founder' },
                    { name: 'Babar Sultan', title: 'Co-Founder' },
                    { name: 'Jaffar Sultan', title: 'Co-Founder' },
                    { name: 'Hareem Zehra', title: 'Co-Founder' },

                  ].map((p) => (
                    <div
                      key={p.name}
                      className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:shadow-lg hover:shadow-teal-600/10 transition-shadow group"
                    >
                      <div className="w-full h-50 bg-slate-800 rounded-md mb-4 overflow-hidden flex items-center justify-center">
                        <img
                          src={`/img-team/${p.name.toLowerCase().replace(/\s+/g, '-')}.png`}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (target.dataset.failed) return;
                            target.dataset.failed = 'true';
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.classList.add('bg-slate-800', 'text-slate-400', 'font-bold', 'text-3xl', 'font-serif');
                              const initials = p.name.split(' ').map(n => n[0]).join('');
                              parent.innerHTML = initials;
                            }
                          }}
                        />
                      </div>
                      <h5 className="font-serif text-slate-200 font-bold mb-1">{p.name}</h5>
                      <p className="text-sm text-slate-400">{p.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
