import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

export const ProductCard = ({ product, index, onClick }: ProductCardProps) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
    className="bg-[#1e293b] rounded-xl border border-slate-700 overflow-hidden flex flex-col group hover:border-teal-500/50 transition-all shadow-lg cursor-pointer hover:shadow-teal-900/20 hover:scale-[1.02] relative"
  >
    {/* Card Content */}
    <div className="p-6 flex-1 flex flex-col min-h-[160px]">
      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-teal-500/20 text-teal-400 rounded-full border border-teal-500/30">
          {product.category}
        </span>
      </div>

      {/* Product Name */}
      <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-teal-400 transition-colors pr-6">
        {product.name}
      </h3>
      <p className="text-slate-500 text-xs mt-auto pt-4 font-medium uppercase tracking-wider">
        Item #{(index + 1).toString().padStart(4, '0')}-WMI
      </p>
    </div>

    {/* Minimal Hover UI (Bottom Right) */}
    <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
      <span className="text-teal-400 text-sm font-semibold">View Details</span>
      <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 border border-teal-500/30">
        <ArrowUpRight size={16} />
      </div>
    </div>
  </motion.div>
);
