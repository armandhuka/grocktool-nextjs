'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toolsData } from '../../data/toolsData';
import { useToolNavigation } from '../../hooks/useToolNavigation';
import { getCategoryIcon, getCategoryColor } from '../../utils/categoryUtils';
import { useScroll } from '../../hooks/useScroll';

const FeaturedTools = () => {
  const { handleToolClick } = useToolNavigation();
  const { scrollContainer } = useScroll();

  const featuredTools = toolsData
    .filter(tool => tool.status === 'available')
    .slice(0, 8);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
            Featured Tools
          </h2>
          <p className="text-toolnest-text/80 text-lg">
            Popular tools used by thousands of users
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={() => scrollContainer('featured-tools-container', 'left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft size={20} className="text-toolnest-text" />
          </button>
          <button
            onClick={() => scrollContainer('featured-tools-container', 'right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight size={20} className="text-toolnest-text" />
          </button>

          <div
            id="featured-tools-container"
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                className="flex-shrink-0 w-80 bg-toolnest-accent p-6 rounded-2xl hover:bg-white transition-all duration-300 cursor-pointer hover:shadow-lg group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                onClick={() => handleToolClick(tool)}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${getCategoryColor(tool.category)} shadow-sm mr-4`}>
                    {getCategoryIcon(tool.category)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-toolnest-text mb-1">
                      {tool.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(tool.category)}`}>
                      {tool.category}
                    </span>
                  </div>
                </div>
                <p className="text-toolnest-text/70 text-sm mb-4 line-clamp-2">
                  {tool.description}
                </p>
                <button className="w-full bg-toolnest-text text-white py-2 px-4 rounded-xl font-medium group-hover:bg-toolnest-text/90 transition-colors">
                  Try Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;