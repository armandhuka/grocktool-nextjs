'use client';

import React, { useState, useRef } from 'react';
import { Search, ChevronDown, Check } from 'lucide-react';
import ViewModeToggle from '../shared/ViewModeToggle';

const ToolSearchFilters = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  handleCategoryChange,
  categories,
  viewMode,
  setViewMode
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const searchInputRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    const scrollY = window.scrollY;
    setSearchTerm(value);
    setTimeout(() => window.scrollTo(0, scrollY), 0);
  };

  return (
    <div className="px-4 md:px-6 mb-8">
      <div className="max-w-6xl mx-auto">

        <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-md p-6 mb-6">

          <div className="flex flex-col md:flex-row gap-4 items-center">

            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]"
                size={18}
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:ring-2 focus:ring-[hsl(var(--accent))] transition"
              />
            </div>

            <div className="relative w-full md:w-48">
              <button
                onClick={() => {
                  const scrollY = window.scrollY;
                  setIsCategoryOpen(!isCategoryOpen);
                  setTimeout(() => window.scrollTo(0, scrollY), 0);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))]"
              >
                <span className="text-sm">
                  {selectedCategory === 'All' ? 'All Categories' : selectedCategory.replace(' Tools', '')}
                </span>
                <ChevronDown
                  size={16}
                  className={`${isCategoryOpen ? 'rotate-180' : ''} transition`}
                />
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[hsl(var(--secondary))] border border-[hsl(var(--border))] shadow-lg max-h-60 overflow-y-auto z-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        const scrollY = window.scrollY;
                        handleCategoryChange(category);
                        setIsCategoryOpen(false);
                        setTimeout(() => window.scrollTo(0, scrollY), 0);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-left text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition"
                    >
                      <span className="text-sm">
                        {category === 'All' ? 'All Categories' : category.replace(' Tools', '')}
                      </span>
                      {selectedCategory === category && (
                        <Check size={16} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
          </div>

          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-[hsl(var(--border))]">
            <div className="text-center">
              <div className="text-lg font-semibold text-[hsl(var(--foreground))]">150+</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Tools</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-[hsl(var(--foreground))]">Free</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">No Login</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-[hsl(var(--foreground))]">⚡</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))]">Instant</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ToolSearchFilters;
