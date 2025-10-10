'use client';

import React, { useState, useRef } from 'react';
import { Search, Filter, ChevronDown, Check } from 'lucide-react';
import ViewModeToggle from '../shared/ViewModeToggle';

interface ToolSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
  categories: string[];
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

const ToolSearchFilters: React.FC<ToolSearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  handleCategoryChange,
  categories,
  viewMode,
  setViewMode
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle search without causing scroll issues
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Save current scroll position
    const scrollY = window.scrollY;
    
    setSearchTerm(value);
    
    // Restore scroll position after state update
    setTimeout(() => {
      window.scrollTo(0, scrollY);
    }, 0);
  };

  return (
    <div className="px-4 md:px-6 mb-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Floating Search Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
          
          {/* Search Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-toolnest-text/40" size={20} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Find the perfect tool for your needs..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-toolnest-text focus:ring-2 focus:ring-toolnest-text/20 outline-none transition-all duration-200 text-toolnest-text placeholder-toolnest-text/40"
                  onKeyDown={(e) => {
                    // Prevent form submission that might cause page reload
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="relative flex-shrink-0 w-full md:w-48">
              <button
                onClick={() => {
                  const scrollY = window.scrollY;
                  setIsCategoryOpen(!isCategoryOpen);
                  // Restore scroll position
                  setTimeout(() => window.scrollTo(0, scrollY), 0);
                }}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors text-toolnest-text"
              >
                <span className="text-sm font-medium">
                  {selectedCategory === 'All' ? 'All Categories' : selectedCategory.replace(' Tools', '')}
                </span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => {
                        const scrollY = window.scrollY;
                        handleCategoryChange(category);
                        setIsCategoryOpen(false);
                        // Restore scroll position
                        setTimeout(() => window.scrollTo(0, scrollY), 0);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-sm text-toolnest-text">
                        {category === 'All' ? 'All Categories' : category.replace(' Tools', '')}
                      </span>
                      {selectedCategory === category && (
                        <Check size={16} className="text-toolnest-text" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex-shrink-0">
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <div className="text-lg font-bold text-toolnest-text">150+</div>
              <div className="text-xs text-toolnest-text/60">Tools Available</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-toolnest-text">100%</div>
              <div className="text-xs text-toolnest-text/60">Free to Use</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-toolnest-text">⚡</div>
              <div className="text-xs text-toolnest-text/60">Instant Results</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolSearchFilters;