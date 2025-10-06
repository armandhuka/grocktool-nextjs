'use client';

import { useState, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { toolsData } from '../data/toolsData';
import ToolCard from '../components/tools/ToolCard';

// Separate component that doesn't use useSearchParams
function ToolsContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories from tools data
  const categories = useMemo(() => {
    const cats = [...new Set(toolsData.map(tool => tool.category))];
    return ['All', ...cats];
  }, []);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return toolsData.filter(tool => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg font-inter">
      {/* Title Section */}
      <section className="pt-32 pb-12 px-4">
        <div className="toolnest-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-toolnest-text mb-6"
              variants={itemVariants}
            >
              Explore Free Tools
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-toolnest-text/80 max-w-3xl mx-auto mb-12"
              variants={itemVariants}
            >
              Your all-in-one toolkit categorized for productivity
            </motion.p>

            {/* Search and Filter Section */}
            <motion.div
              className="max-w-4xl mx-auto mb-8"
              variants={itemVariants}
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-toolnest-text/50"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search for a tool..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-transparent bg-white shadow-lg focus:outline-none focus:border-toolnest-text transition-all duration-300"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-6 py-3 rounded-full border-2 border-transparent bg-white shadow-lg focus:outline-none focus:border-toolnest-text transition-all duration-300 capitalize"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Results Count */}
              <p className="text-toolnest-text/70 mt-4">
                Showing {filteredTools.length} of {toolsData.length} tools
                {selectedCategory !== 'All' && (
                  <span className="ml-2 px-3 py-1 bg-toolnest-accent rounded-full text-sm font-medium">
                    {selectedCategory}
                  </span>
                )}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid Section */}
      <section className="pb-20 px-4">
        <div className="toolnest-container">
          {filteredTools.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredTools.map((tool) => (
                <motion.div key={tool.id} variants={itemVariants}>
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <h3 className="text-2xl font-bold text-toolnest-text mb-4">
                  No tools found
                </h3>
                <p className="text-toolnest-text/70 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All');
                  }}
                  className="px-6 py-3 bg-toolnest-text text-white rounded-full hover:bg-toolnest-text/90 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

// Main component with Suspense
export default function Tools() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-toolnest-bg font-inter">
        <section className="pt-32 pb-20 px-4">
          <div className="toolnest-container">
            <div className="text-center">
              <div className="h-16 bg-gray-200 rounded-full w-64 mx-auto mb-6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-12 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    }>
      <ToolsContent />
    </Suspense>
  );
}