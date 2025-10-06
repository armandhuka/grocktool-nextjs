'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toolsData } from '../data/toolsData';
import ToolCard from '../components/tools/ToolCard';

// Separate component that uses useSearchParams
function ToolContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<number[]>([]);
  
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(toolsData.map(tool => tool.category)))];
  
  // Initialize filter state from URL params or localStorage
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    const savedCategory = typeof window !== 'undefined'
      ? localStorage.getItem('selectedCategory')
      : null;

    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    } else if (savedCategory && categories.includes(savedCategory)) {
      setSelectedCategory(savedCategory);
      router.replace(`?category=${encodeURIComponent(savedCategory)}`);
    }
  }, [searchParams, categories, router]);
  
  // Update URL and localStorage when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);

    if (category === 'All') {
      router.replace('/tool');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('selectedCategory');
      }
    } else {
      router.replace(`?category=${encodeURIComponent(category)}`);
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedCategory', category);
      }
    }
  };

  // Filter tools based on search and category
  const filteredTools = toolsData.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFavorite = (toolId: number) => {
    setFavorites(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Unit Converter Tools': '📏',
      'Text Tools': '📝',
      'Date & Time Tools': '📅',
      'Number Tools': '🔢',
      'Math Tools': '🧮',
      'Health Tools': '💪'
    };
    return icons[category] || '🔧';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Unit Converter Tools': 'bg-blue-100 text-blue-600',
      'Text Tools': 'bg-green-100 text-green-600',
      'Date & Time Tools': 'bg-purple-100 text-purple-600',
      'Number Tools': 'bg-yellow-100 text-yellow-600',
      'Math Tools': 'bg-red-100 text-red-600',
      'Health Tools': 'bg-cyan-100 text-cyan-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter pt-20">
      {/* Header */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-toolnest-text mb-6">
              All Tools
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Discover 150+ tools organized by category. Find exactly what you need, when you need it.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-toolnest-accent rounded-xl focus:border-toolnest-text outline-none bg-white text-toolnest-text"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="px-4 py-3 border-2 border-toolnest-accent rounded-xl focus:border-toolnest-text outline-none bg-white text-toolnest-text"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex border-2 border-toolnest-accent rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-toolnest-text text-white' 
                        : 'bg-white text-toolnest-text hover:bg-toolnest-accent'
                    }`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-toolnest-text text-white' 
                        : 'bg-white text-toolnest-text hover:bg-toolnest-accent'
                    }`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-toolnest-text/70">
              Showing {filteredTools.length} of {toolsData.length} tools
            </p>
          </div>

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'md:grid-cols-1'
            }`}>
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ToolCard
                    tool={tool}
                    onFavorite={handleFavorite}
                    isFavorite={favorites.includes(tool.id)}
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-semibold text-toolnest-text mb-2">No tools found</h3>
              <p className="text-toolnest-text/70">
                Try adjusting your search terms or category filter
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

// Main component with Suspense boundary
const ToolsPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-toolnest-bg font-inter pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-toolnest-text mx-auto"></div>
          <p className="mt-4 text-toolnest-text">Loading tools...</p>
        </div>
      </div>
    }>
      <ToolContent />
    </Suspense>
  );
};

export default ToolsPage;
