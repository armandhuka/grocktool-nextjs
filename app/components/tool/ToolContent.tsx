'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toolsData } from '../../data/toolsData';
import ToolHeader from './ToolHeader';
import ToolSearchFilters from './ToolSearchFilters';
import ToolResultsCount from './ToolResultsCount';
import ToolGrid from './ToolGrid';
import NoToolsFound from './NoToolsFound';

// Define tool type
interface Tool {
  id: string | number;
  name: string;
  description: string;
  category: string;
  path: string;
}

// Define props interface
interface ToolContentProps {
  toolId?: string;
}

const ToolContent: React.FC<ToolContentProps> = ({ toolId }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]); // Changed to string array
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  
  const router = useRouter();
  const mainContentRef = useRef<HTMLDivElement>(null);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(toolsData.map((tool: Tool) => tool.category)))];
  
  // Filter tools based on search and category
  const filteredTools = toolsData.filter((tool: Tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Disable automatic scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Disable Next.js automatic scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    }
  }, []);

  // Initialize filter state from URL params or localStorage
  useEffect(() => {
    if (!toolId && isInitialLoad) {
      const savedCategory = typeof window !== 'undefined'
        ? localStorage.getItem('selectedCategory')
        : null;

      if (savedCategory && categories.includes(savedCategory)) {
        setSelectedCategory(savedCategory);
        // Use push instead of replace to avoid scroll issues
        router.push(`/tool?category=${encodeURIComponent(savedCategory)}`);
      }
      setIsInitialLoad(false);
    }
  }, [toolId, categories, router, isInitialLoad]);

  // Update SEO content when filters change
  useEffect(() => {
    updateSEOContent();
  }, [selectedCategory, searchTerm, filteredTools.length]);

  // Preserve scroll position during category changes
  const handleCategoryChange = (category: string) => {
    // Save current scroll position
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    
    setSelectedCategory(category);

    if (category === 'All') {
      router.push('/tool');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('selectedCategory');
      }
    } else {
      router.push(`/tool?category=${encodeURIComponent(category)}`);
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedCategory', category);
      }
    }

    // Restore scroll position after a brief delay
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, scrollY);
      }
    }, 50);
  };

  // Handle search with scroll preservation
  const handleSearchChange = (term: string) => {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    setSearchTerm(term);
    
    // Restore scroll position
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo(0, scrollY);
      }
    }, 50);
  };

  const handleFavorite = (toolId: string | number) => {
    // Convert toolId to string for consistent comparison
    const toolIdStr = toolId.toString();
    setFavorites(prev => 
      prev.includes(toolIdStr) 
        ? prev.filter(id => id !== toolIdStr)
        : [...prev, toolIdStr]
    );
  };

  // Update SEO content dynamically
  const updateSEOContent = () => {
    if (typeof window === 'undefined') return;

    const seoContent = document.getElementById('seo-content');
    if (!seoContent) return;

    const categoryText = selectedCategory === 'All' ? 'all categories' : `${selectedCategory} tools`;
    const searchText = searchTerm ? ` matching "${searchTerm}"` : '';
    const resultsText = filteredTools.length === 1 ? 'tool' : 'tools';

    // Generate category list HTML
    const categoryList = categories
      .filter(cat => cat !== 'All')
      .map(category => {
        const toolCount = toolsData.filter(tool => tool.category === category).length;
        return `<li><strong>${category}:</strong> ${toolCount} tools available</li>`;
      })
      .join('');

    // Get first 8 tools as popular tools
    const popularToolsList = toolsData
      .slice(0, 8)
      .map(tool => `<li><strong>${tool.name}:</strong> ${tool.description}</li>`)
      .join('');

    seoContent.innerHTML = `
      <h1>Online Tools Collection - GrockTool</h1>
      <p>Browse and discover ${filteredTools.length} ${resultsText} in ${categoryText}${searchText}. GrockTool offers ${toolsData.length}+ free online tools for developers, designers, students, and creators.</p>
      
      <h2>Available Tool Categories</h2>
      <ul>${categoryList}</ul>

      <h2>Popular Tools</h2>
      <ul>${popularToolsList}</ul>

      <h2>Why Use GrockTool Tools?</h2>
      <ul>
        <li><strong>Completely Free:</strong> No hidden costs or subscription fees</li>
        <li><strong>No Registration:</strong> Use tools instantly without signing up</li>
        <li><strong>Browser-Based:</strong> All processing happens in your browser</li>
        <li><strong>Privacy Focused:</strong> Your data never leaves your device</li>
        <li><strong>Mobile Friendly:</strong> Optimized for all devices and screen sizes</li>
        <li><strong>Regular Updates:</strong> New tools and features added frequently</li>
      </ul>

      <h2>Tool Statistics</h2>
      <ul>
        <li><strong>Total Tools:</strong> ${toolsData.length}+ available utilities</li>
        <li><strong>Categories:</strong> ${categories.length - 1} specialized categories</li>
        <li><strong>Popular Tools:</strong> 8 highlighted utilities</li>
        <li><strong>New Additions:</strong> Regular weekly updates with new tools</li>
      </ul>

      <h2>How to Use This Page</h2>
      <p>Use the search bar to find specific tools by name or description. Filter by category to browse tools organized by their primary function. Switch between grid and list views to see tools in your preferred layout.</p>

      <p><strong>Start exploring our collection of ${toolsData.length}+ free online tools today and discover the perfect utilities for your needs!</strong></p>
    `;

    // Update structured data
    updateStructuredData();
  };

  // Helper function to map categories to schema.org application categories
  const getApplicationCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Text Tools': 'UtilityApplication',
      'Developer Tools': 'DeveloperApplication',
      'Calculator Tools': 'UtilityApplication',
      'Converter Tools': 'UtilityApplication',
      'Image Tools': 'MultimediaApplication',
      'Health Tools': 'HealthApplication',
      'Math Tools': 'UtilityApplication',
      'Number Tools': 'UtilityApplication',
      'QR & Barcode Tools': 'UtilityApplication',
    };
    return categoryMap[category] || 'UtilityApplication';
  };

  // Update structured data dynamically
  const updateStructuredData = () => {
    if (typeof window === 'undefined') return;

    // Remove existing structured data
    const existingScript = document.getElementById('tool-page-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.id = 'tool-page-structured-data';
    script.type = 'application/ld+json';
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Online Tools Collection - GrockTool",
      "description": `Browse ${filteredTools.length} tools in ${selectedCategory === 'All' ? 'all categories' : selectedCategory}. GrockTool offers ${toolsData.length}+ free online tools for various needs.`,
      "url": `https://www.grocktool.com/tool${selectedCategory === 'All' ? '' : `?category=${selectedCategory}`}`,
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": filteredTools.length,
        "itemListElement": filteredTools.slice(0, 20).map((tool: Tool, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "WebApplication",
            "name": tool.name,
            "description": tool.description,
            "url": `https://www.grocktool.com${tool.path}`,
            "applicationCategory": getApplicationCategory(tool.category),
            "operatingSystem": "Any",
            "permissions": "browser"
          }
        }))
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.grocktool.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tools",
            "item": "https://www.grocktool.com/tool"
          },
          ...(selectedCategory !== 'All' ? [{
            "@type": "ListItem",
            "position": 3,
            "name": selectedCategory,
            "item": `https://www.grocktool.com/tool?category=${selectedCategory}`
          }] : [])
        ]
      }
    };

    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);
  };

  // If toolId is provided, show individual tool view
  if (toolId) {
    const tool = toolsData.find((t: Tool) => t.id.toString() === toolId);
    if (!tool) {
      return (
        <div className="min-h-screen bg-toolnest-bg font-inter pt-20">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-900">Tool Not Found</h1>
            <p className="text-gray-600 mt-2">The requested tool could not be found.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-toolnest-bg font-inter pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
          <p className="text-gray-600 mt-2">{tool.description}</p>
          {/* Add your individual tool component here */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-700">Individual tool interface for {tool.name} will be displayed here.</p>
          </div>
        </div>
      </div>
    );
  }

  // Default tools listing view
  return (
    <div 
      ref={mainContentRef}
      className="min-h-screen bg-toolnest-bg font-inter pt-20"
      style={{ overflowAnchor: 'none' }} // Prevent browser auto-scroll
    >
      <ToolHeader />
      
      <ToolSearchFilters
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
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