import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import { useInquiry } from '@/hooks/InquiryContext';
import { cn } from '@/lib/utils';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index: number;
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
  const { addItem, hasItem } = useInquiry();
  const isAdded = hasItem(product.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.01 }}
      className="bg-[#1e293b] w-full rounded-xl border border-slate-700 overflow-hidden flex flex-col group hover:border-teal-500/50 transition-all shadow-lg hover:shadow-teal-900/20 relative"
    >
      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col min-h-[160px]">
        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-teal-500/20 text-teal-400 rounded-full border border-teal-500/30">
            {product.category}
          </span>
          {product.brand === "Winmark (WMI)" && (
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold bg-white/5 text-slate-400 rounded-full border border-slate-600">
              WMI
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-base font-bold text-white leading-tight mb-2 pr-2">
          {product.name}
        </h3>
        <p className="text-slate-500 text-[10px] mt-auto pt-4 font-bold uppercase tracking-widest">
          Item #{(index + 1).toString().padStart(4, '0')}-WMI
        </p>
      </div>

      {/* Hover/Focus Reveal — Actions (works on both hover and tap/focus) */}
      <div className="absolute inset-0 bg-[#0f172a]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isAdded) addItem(product.name);
            }}
            disabled={isAdded}
            className={cn(
              "w-full max-w-[200px] text-xs font-black uppercase tracking-widest py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2",
              isAdded
                ? "bg-teal-800/40 text-teal-400 border border-teal-500/30 cursor-default shadow-inner"
                : "bg-teal-600 hover:bg-teal-500 text-white shadow-lg shadow-teal-900/50"
            )}
          >
            {isAdded ? (
              <>
                <Check size={14} />
                Added to List ✓
              </>
            ) : (
              <>
                <Plus size={14} />
                Add to Inquiry
              </>
            )}
          </button>
      </div>
    </motion.div>
  );
};
