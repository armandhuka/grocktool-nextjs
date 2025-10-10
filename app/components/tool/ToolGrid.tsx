'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ToolCard from './ToolCard';
import { getCategoryIcon, getCategoryColor } from '../../utils/categoryUtils';

interface ToolGridProps {
  filteredTools: any[];
  viewMode: 'grid' | 'list';
  favorites: string[];
  handleFavorite: (toolId: number) => void;
}

const ToolGrid: React.FC<ToolGridProps> = ({
  filteredTools,
  viewMode,
  favorites,
  handleFavorite
}) => {
  // Responsive grid classes
  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
    : 'flex flex-col gap-4';

  return (
    <section className="px-4 md:px-6 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className={gridClasses}>
          {filteredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: Math.min(index * 0.05, 0.5),
                ease: "easeOut"
              }}
              className={viewMode === 'list' ? 'w-full' : ''}
            >
              <ToolCard
                tool={tool}
                onFavorite={handleFavorite}
                isFavorite={favorites.includes(tool.id)}
                viewMode={viewMode}
                categoryIcon={getCategoryIcon(tool.category)}
                categoryColor={getCategoryColor(tool.category)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolGrid;