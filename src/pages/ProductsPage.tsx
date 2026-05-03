import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ArrowUpRight, Download, FileText } from 'lucide-react';

import { productsData, type Product } from '@/data/products';
import { SidebarFilters } from '@/components/products/SidebarFilters';
import { ProductCard } from '@/components/products/ProductCard';

const CATEGORIES = Array.from(new Set(productsData.map(p => p.category)));

export function ProductsPage() {
  const [products] = useState(productsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Toggle Category Filter
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Real-time filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories, products]);



  return (
    <div className="min-h-screen bg-[#0f172a] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">

        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Industrial Products</h1>
            <p className="text-slate-400 text-lg">Browse our complete catalogue of B2B ingredients.</p>
          </div>

          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-2 bg-[#1e293b] text-white px-4 py-2 rounded-lg border border-slate-700 w-max"
          >
            <Filter size={18} /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Sidebar (Desktop Filters) - 25% width */}
          <aside className="hidden md:block w-full md:w-1/4 flex-shrink-0">
            <div className="sticky top-32 bg-[#1e293b] p-6 rounded-xl border border-slate-700/50">
              <SidebarFilters 
                categories={CATEGORIES}
                selectedCategories={selectedCategories}
                toggleCategory={toggleCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedCategories={setSelectedCategories}
              />
            </div>
          </aside>

          {/* Main Content Area - 75% width */}
          <main className="w-full md:w-3/4 flex-1 flex flex-col gap-6">

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search products by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e293b] border border-slate-700 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all shadow-lg placeholder:text-slate-500 text-lg"
              />
            </div>

            {/* B2B Utility Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#1e293b] p-4 rounded-xl border border-slate-700 shadow-sm gap-4 sm:gap-0">
              <div className="text-slate-300 font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                Showing <span className="text-white font-bold">{filteredProducts.length}</span> Products
              </div>
              <button
                onClick={() => alert("Initiating secure download: Winmark_Product_Catalog_2026.pdf")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-400 border border-teal-500/50 rounded-lg hover:bg-slate-800 hover:border-teal-400 transition-colors w-full sm:w-auto justify-center"
              >
                <Download size={16} />
                Download Full Catalog (PDF)
              </button>
            </div>

            {/* Product Grid - 3 columns on desktop, 1 on mobile */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard 
                    key={`${product.name}-${idx}`}
                    product={product}
                    index={idx}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 px-4 bg-[#1e293b] rounded-xl border border-slate-700 border-dashed text-center">
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
            )}

          </main>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {mobileFiltersOpen ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] sm:w-[350px] bg-[#1e293b] border-l border-slate-700 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <h2 className="text-white font-bold text-lg">Filters</h2>
                <button 
                  onClick={() => setMobileFiltersOpen(false)} 
                  className="text-slate-400 hover:text-white p-2"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                <SidebarFilters 
                  categories={CATEGORIES}
                  selectedCategories={selectedCategories}
                  toggleCategory={toggleCategory}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  setSelectedCategories={setSelectedCategories}
                />
              </div>
              <div className="p-4 border-t border-slate-700">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Show {filteredProducts.length} Results
                </button>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f172a] rounded-2xl border border-teal-500/30 shadow-2xl shadow-teal-900/20 overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors z-10"
                aria-label="Close product details"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-10">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 text-xs uppercase tracking-wider font-bold bg-teal-500/20 text-teal-400 rounded-full border border-teal-500/30">
                    {selectedProduct.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 pr-8 leading-tight">
                  {selectedProduct.name}
                </h2>

                {/* Dummy Content */}
                <div className="space-y-4 mb-10 border-t border-slate-800 pt-6">
                  <h4 className="text-teal-400 font-semibold flex items-center gap-2">
                    <FileText size={18} />
                    Product Specification
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-lg font-light">
                    This specification sheet contains detailed physical, chemical, and microbiological analysis for this ingredient. All parameters are tested according to ISO industry standards to ensure consistent quality for manufacturing.
                  </p>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    alert(`Requesting Spec Sheet for: ${selectedProduct.name}`);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-teal-600/30 text-lg"
                >
                  Request Spec Sheet
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
