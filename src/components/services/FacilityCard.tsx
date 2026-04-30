import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FacilityCardProps {
  title: string;
  imageAlt: string;
  imagePlaceholderText: string;
  Icon: LucideIcon;
  features: {
    icon: LucideIcon;
    label: string;
    value: string;
  }[];
  index: number;
}

export function FacilityCard({ title, imageAlt, imagePlaceholderText, Icon, features, index }: FacilityCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#1e293b] border border-slate-700 rounded-xl overflow-hidden group hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col"
    >
      <div className="h-64 flex items-center justify-center bg-slate-800/30 m-6 rounded-xl border-2 border-dashed border-slate-600/50 group-hover:border-teal-500/50 transition-colors duration-300 relative overflow-hidden">
        <span className="text-slate-400 font-bold tracking-[0.2em] uppercase text-sm px-6 text-center leading-relaxed relative z-10">
          {imagePlaceholderText}
        </span>
        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="px-8 pb-8 flex-grow flex flex-col">
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 mb-6 shrink-0 border border-slate-700 group-hover:border-teal-500/30 transition-colors">
          <Icon className="w-6 h-6" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-6 group-hover:text-teal-400 transition-colors">
          {title}
        </h2>
        
        <ul className="space-y-4 text-base text-slate-300 flex-grow">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-4">
              <feature.icon className="w-5 h-5 text-teal-400 shrink-0" />
              <span className="font-medium">{feature.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
