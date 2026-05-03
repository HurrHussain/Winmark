import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const clientsData = [
  { name: "Haleeb Foods", src: "/haleeb.png", sizeClass: "scale-125 md:scale-150" },
  { name: "SixB Food Industries", src: "/6b.png", sizeClass: "" },
  { name: "Dairyland", src: "/dll.png", sizeClass: "scale-125 md:scale-150" },
  { name: "PFJ", src: "/pfj.png", sizeClass: "" },
  { name: "Rehmat-e-Shereen", src: "/rehmat.png", sizeClass: "" },
  { name: "Innovative", src: "/innovative.png", sizeClass: "" },
  { name: "Gourmet Foods", src: "/gourmet.png", sizeClass: "scale-125 md:scale-150" }
];

const partnersData = [
  { name: "Engro", src: "/engro.png", sizeClass: "" },
  { name: "Dayfresh", src: "/dll.png", sizeClass: "scale-125 md:scale-150" },
  { name: "IFFCO", src: "/iffco.png", sizeClass: "" },
  { name: "IRC", src: "/irc.png", sizeClass: "" }
];

// Duplicated arrays to ensure infinite scrolling looks seamless
const duplicatedClients = [...clientsData, ...clientsData, ...clientsData, ...clientsData, ...clientsData];
const duplicatedPartners = [...partnersData, ...partnersData, ...partnersData, ...partnersData, ...partnersData];

export function GlobalNetwork() {
  const [activeTab, setActiveTab] = useState<'clients' | 'partners'>('clients');
  const [viewBoth, setViewBoth] = useState(false);

  const TickerRibbon = ({ items, label, duration }: { items: any[], label: string, duration: string }) => (
    <div className="relative flex flex-col py-12 bg-white overflow-hidden border-t border-slate-200">
      <div className="absolute top-4 left-6 z-20 text-[10px] font-bold uppercase tracking-widest text-[#0f172a]">
        {label}
      </div>
      
      {/* Fading Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Scrolling Track */}
      <div 
        className="flex w-max animate-ticker hover:[animation-play-state:paused]"
        style={{ animationDuration: duration }}
      >
        <div className="flex items-center gap-16 md:gap-32 px-8 h-20 md:h-24">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-center flex-shrink-0 min-w-[140px]">
              {item.src ? (
                <img 
                  src={item.src} 
                  alt={item.name} 
                  className={`max-h-14 md:max-h-20 w-auto object-contain transition-transform duration-300 cursor-pointer ${item.sizeClass || ''}`} 
                />
              ) : (
                <span className="text-4xl md:text-5xl font-black whitespace-nowrap text-slate-400 hover:text-[#0f172a] transition-colors duration-300 cursor-default">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-slate-50 py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto mb-14 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        
        {/* Left Side: Headings */}
        <div>
          <p className="text-teal-600 font-bold tracking-[0.2em] uppercase text-xs mb-4">
            Trusted By & Sourced From
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0f172a]">
            {viewBoth ? "Our Global Network" : activeTab === 'clients' ? "Our Clients" : "Our Business Partners"}
          </h2>
        </div>

        {/* Right Side: Controls */}
        <div className="flex flex-col sm:flex-row items-center bg-white rounded-xl p-1.5 border border-slate-200 shadow-xl">
          {/* Tabs */}
          <div className="flex relative w-full sm:w-auto">
            <button 
              onClick={() => !viewBoth && setActiveTab('clients')}
              disabled={viewBoth}
              className={`relative z-10 flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold transition-colors rounded-lg ${
                activeTab === 'clients' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
              } ${viewBoth ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Our Clients
              {activeTab === 'clients' && (
                <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-teal-600 rounded-lg -z-10" />
              )}
            </button>
            <button 
              onClick={() => !viewBoth && setActiveTab('partners')}
              disabled={viewBoth}
              className={`relative z-10 flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold transition-colors rounded-lg ${
                activeTab === 'partners' ? 'text-white' : 'text-slate-600 hover:text-slate-900'
              } ${viewBoth ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Global Partners
              {activeTab === 'partners' && (
                <motion.div layoutId="activeTabBg" className="absolute inset-0 bg-teal-600 rounded-lg -z-10" />
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-[1px] h-8 bg-slate-200 mx-3"></div>

          {/* Toggle */}
          <div className="flex items-center justify-center w-full sm:w-auto gap-3 px-4 py-3 sm:py-0 border-t sm:border-t-0 border-slate-100 mt-2 sm:mt-0">
            <span className={`text-sm font-medium ${viewBoth ? 'text-[#0f172a]' : 'text-slate-500'}`}>View Both</span>
            <button 
              onClick={() => setViewBoth(!viewBoth)}
              className={`w-12 h-6 rounded-full p-1 transition-colors relative focus:outline-none shadow-inner ${viewBoth ? 'bg-teal-500' : 'bg-slate-200'}`}
            >
              <motion.div 
                className="w-4 h-4 bg-white rounded-full shadow-md"
                animate={{ x: viewBoth ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>

      </div>

      {/* The Display Area */}
      <div className="max-w-[100rem] mx-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl relative">
        <AnimatePresence mode="popLayout">
          {(!viewBoth && activeTab === 'clients') && (
            <motion.div
              key="clients-only"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TickerRibbon items={duplicatedClients} label="Client Network" duration="40s" />
            </motion.div>
          )}

          {(!viewBoth && activeTab === 'partners') && (
            <motion.div
              key="partners-only"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TickerRibbon items={duplicatedPartners} label="Supply Partners" duration="23s" />
            </motion.div>
          )}

          {viewBoth && (
            <motion.div
              key="view-both"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="flex flex-col"
            >
              <TickerRibbon items={duplicatedClients} label="Client Network" duration="40s" />
              <TickerRibbon items={duplicatedPartners} label="Supply Partners" duration="23s" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>

  );
}
