import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Table2 } from 'lucide-react';

import { productsData } from '@/data/products';
import { SidebarFilters } from '@/components/products/SidebarFilters';
import { lazy, Suspense } from 'react';

const ProductGrid = lazy(() => import('@/components/products/ProductGrid'));

const CATEGORIES = Array.from(new Set(productsData.map(p => p.category)));

export function ProductsPage() {
  const [products] = useState(productsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

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

  // Focus trap and return-focus for mobile filters modal
  useEffect(() => {
    if (!mobileFiltersOpen) return;

    const previousActive = document.activeElement as HTMLElement | null;
    const modal = modalRef.current;
    const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const nodes = modal ? Array.from(modal.querySelectorAll<HTMLElement>(focusableSelector)) : [];
    const first = nodes[0] ?? closeButtonRef.current;
    const last = nodes[nodes.length - 1] ?? closeButtonRef.current;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMobileFiltersOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        if (nodes.length === 0) {
          e.preventDefault();
          closeButtonRef.current?.focus();
          return;
        }

        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first || active === modal) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKey);

    // Move focus into the modal
    setTimeout(() => {
      (first ?? closeButtonRef.current)?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', handleKey);
      // Return focus to the trigger or previous element
      try {
        if (triggerRef.current) triggerRef.current.focus();
        else if (previousActive && typeof previousActive.focus === 'function') previousActive.focus();
      } catch (err) {
        // ignore
      }
    };
  }, [mobileFiltersOpen]);



  return (
    <div className="min-h-screen bg-[var(--midnight-slate)] pt-20 sm:pt-24 md:pt-28 pb-20 px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">

        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">Industrial Products</h1>
            <p className="text-slate-400 text-lg">Browse our complete catalogue of B2B ingredients.</p>
          </div>

          <button
            ref={triggerRef}
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-2 bg-[#1e293b] text-white px-4 py-3 rounded-lg border border-slate-700 w-max min-h-[48px]"
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
            <div className="relative mb-2">
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
            
            {/* Global Spec Note */}
            <p className="text-slate-500 text-xs leading-relaxed italic pl-1">
              Note: Detailed Technical Data Sheets (TDS) and COA are available upon request. Please add items to your inquiry list or contact our technical team directly.
            </p>

            {/* B2B Utility Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#1e293b] p-4 rounded-xl border border-slate-700 shadow-sm gap-4 sm:gap-0">
              <div className="text-slate-300 font-medium flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                Showing <span className="text-white font-bold">{filteredProducts.length}</span> Products
              </div>
              <a
                href={`${import.meta.env.BASE_URL}Winmark-Full-Catalog.xlsx`}
                download="Winmark_Ingredients_Catalog.xlsx"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-teal-400 border border-teal-500/50 rounded-lg hover:bg-slate-800 hover:border-teal-400 transition-colors w-full sm:w-auto justify-center"
              >
                <Table2 size={16} />
                Download Product List (Excel)
              </a>
            </div>

            {/* Product Grid (Lazy Loaded) */}
            <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-teal-500/50">Loading Products...</div>}>
              <ProductGrid 
                filteredProducts={filteredProducts}
                setSearchQuery={setSearchQuery}
                setSelectedCategories={setSelectedCategories}
              />
            </Suspense>

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
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="filters-title"
              className="fixed inset-y-0 right-0 w-[85%] sm:w-[350px] bg-[#1e293b] border-l border-slate-700 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                <h2 id="filters-title" className="text-white font-bold text-lg">Filters</h2>
                <button 
                  ref={closeButtonRef}
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

      {/* Focus trap for Mobile Filters Modal */}
      <script /* noop: kept for patch separation */ />


    </div>
  );
}
