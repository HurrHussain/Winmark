import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StrengthCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  index: number;
}

export function StrengthCard({ title, description, Icon, index }: StrengthCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300 group"
    >
      <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-teal-400 mb-6 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{title}</h3>
      <p className="text-base text-slate-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
