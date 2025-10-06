'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toolsData } from '../../data/toolsData';
import ToolHeader from './ToolHeader';
import ToolSearchFilters from './ToolSearchFilters';
import ToolResultsCount from './ToolResultsCount';
import ToolGrid from './ToolGrid';
import NoToolsFound from './NoToolsFound';

const ToolContent = () => {
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

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter pt-20">
      <ToolHeader />
      
      <ToolSearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        categories={categories}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      <ToolResultsCount 
        filteredTools={filteredTools}
        toolsData={toolsData}
        selectedCategory={selectedCategory}
      />

      {filteredTools.length > 0 ? (
        <ToolGrid
          filteredTools={filteredTools}
          viewMode={viewMode}
          favorites={favorites}
          handleFavorite={handleFavorite}
        />
      ) : (
        <NoToolsFound />
      )}
    </div>
  );
};

export default ToolContent;