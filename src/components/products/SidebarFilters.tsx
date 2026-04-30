import { X } from 'lucide-react';

interface SidebarFiltersProps {
  categories: string[];
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategories: (categories: string[]) => void;
}

export const SidebarFilters = ({
  categories,
  selectedCategories,
  toggleCategory,
  searchQuery,
  setSearchQuery,
  setSelectedCategories,
}: SidebarFiltersProps) => (
  <div className="space-y-8">
    {/* Categories */}
    <div>
      <h3 className="text-white font-semibold mb-4 text-lg border-b border-slate-700 pb-2">Categories</h3>
      <div className="space-y-3">
        {categories.map(category => (
          <label key={category} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="hidden"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(category) ? 'bg-teal-500 border-teal-500' : 'border-slate-600 group-hover:border-teal-400 bg-slate-800'}`}>
              {selectedCategories.includes(category) ? (
                <div className="w-2.5 h-2.5 bg-white rounded-sm" />
              ) : null}
            </div>
            <span className={`text-sm transition-colors ${selectedCategories.includes(category) ? 'text-white font-medium' : 'text-slate-400 group-hover:text-slate-200'}`}>
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Clear Filters Button */}
    {selectedCategories.length > 0 || searchQuery !== "" ? (
      <div className="pt-6 border-t border-slate-700 mt-8">
        <button
          onClick={() => {
            setSearchQuery("");
            setSelectedCategories([]);
          }}
          className="w-full py-3 px-4 border border-slate-600 text-slate-300 rounded-lg font-medium hover:bg-slate-700 hover:text-white transition-all flex items-center justify-center gap-2 group"
        >
          <X size={16} className="text-slate-400 group-hover:text-white transition-colors" />
          Clear All Filters
        </button>
      </div>
    ) : null}
  </div>
);
