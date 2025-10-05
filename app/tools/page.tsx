// app/tools/page.tsx  (Next.js 13+ App Router example)

'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toolsData } from '../data/toolsData';
import ToolCard from '../components/tools/ToolCard';

export default function Tools() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get unique categories from tools data
  const categories = useMemo(() => {
    const cats = [...new Set(toolsData.map(tool => tool.category))];
    return ['All', ...cats];
  }, []);

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
      router.replace('/tools');
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
      {/* Header & Footer ab Layout me hain */}

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
              Explore 50+ Free Tools
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
                  onChange={(e) => handleCategoryChange(e.target.value)}
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
                    handleCategoryChange('All');
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
