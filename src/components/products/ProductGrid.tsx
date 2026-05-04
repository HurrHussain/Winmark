import { Search } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from '@/data/products';

interface ProductGridProps {
  filteredProducts: Product[];
  setSearchQuery: (val: string) => void;
  setSelectedCategories: (val: string[]) => void;
}

export default function ProductGrid({ filteredProducts, setSearchQuery, setSelectedCategories }: ProductGridProps) {
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#1e293b] rounded-xl border border-slate-700 border-dashed text-center min-h-[300px]">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <Search className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
        <p className="text-slate-400 max-w-md">We couldn't find anything matching your current filters and search query. Try adjusting your selections.</p>
        <button
          onClick={() => { setSearchQuery(""); setSelectedCategories([]); }}
          className="mt-6 text-teal-400 font-semibold hover:text-teal-300 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product, idx) => (
        <ProductCard 
          key={`${product.name}-${idx}`}
          product={product}
          index={idx}
        />
      ))}
    </div>
  );
}
