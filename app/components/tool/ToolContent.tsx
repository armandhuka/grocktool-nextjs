'use client';

import React, { useEffect, useState } from 'react';
import { toolsData, type Tool } from '../../data/toolsData';

import ToolHeader from './ToolHeader';
import ToolSearchFilters from './ToolSearchFilters';
import ToolResultsCount from './ToolResultsCount';
import ToolGrid from './ToolGrid';
import NoToolsFound from './NoToolsFound';

interface ToolContentProps {
  toolId?: string; 
  category?: string; 
}

const ToolContent: React.FC<ToolContentProps> = ({ toolId, category }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || 'All'
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);

  // =====================
  // Unique categories
  // =====================
  const categories = [
    'All',
    ...Array.from(new Set(toolsData.map(tool => tool.category))),
  ];

  // =====================
  // Restore category (UI only)
  // =====================
  useEffect(() => {
    if (!category && typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedCategory');
      if (saved && categories.includes(saved)) {
        setSelectedCategory(saved);
      }
    }
  }, [categories, category]);

  // =====================
  // Filter tools
  // =====================
  const filteredTools = toolsData.filter((tool: Tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // =====================
  // Category change (NO URL CHANGE)
  // =====================
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);

    if (typeof window !== 'undefined') {
      if (cat === 'All') {
        localStorage.removeItem('selectedCategory');
      } else {
        localStorage.setItem('selectedCategory', cat);
      }
    }
  };

  // =====================
  // Favorite handler (STRING ID)
  // =====================
  const handleFavorite = (toolId: string) => {
    setFavorites(prev =>
      prev.includes(toolId)
        ? prev.filter(id => id !== toolId)
        : [...prev, toolId]
    );
  };

  // =====================================================
  // SINGLE TOOL PAGE
  // =====================================================
  if (toolId) {
    const tool = toolsData.find(
      (t: Tool) => t.id.toString() === toolId
    );

    if (!tool) {
      return (
        <div className="min-h-screen pt-20 px-4">
          <h1 className="text-2xl font-bold">Tool Not Found</h1>
          <p className="mt-2 text-gray-600">
            The requested tool does not exist.
          </p>
        </div>
      );
    }

    return (
      <div className="min-h-screen pt-20 px-4">
        <h1 className="text-3xl font-bold">{tool.name}</h1>
        <p className="mt-2 text-gray-600">{tool.description}</p>

        <div className="mt-6 p-6 bg-white rounded-lg shadow">
          <p>
            <strong>{tool.name}</strong> tool UI yahan render hoga.
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // TOOLS LIST / CATEGORY PAGE
  // =====================================================
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
