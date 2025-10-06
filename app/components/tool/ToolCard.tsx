'use client';

import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { useToolNavigation } from '../../hooks/useToolNavigation';

interface ToolCardProps {
  tool: any;
  onFavorite: (toolId: number) => void;
  isFavorite: boolean;
  viewMode: 'grid' | 'list';
  categoryIcon: string;
  categoryColor: string;
}

const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  onFavorite,
  isFavorite,
  viewMode,
  categoryIcon,
  categoryColor
}) => {
  const { handleToolClick } = useToolNavigation();

  // Mobile detection hook
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  const handleCardClick = () => {
    handleToolClick(tool);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(tool.id);
  };

  const handleTryNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToolClick(tool);
  };

  // List View - Optimized for mobile
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-toolnest-text/30 active:scale-95"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      >
        <div className="flex items-start gap-3">
          {/* Category Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${categoryColor} shadow-sm flex-shrink-0 mt-1`}>
            {categoryIcon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-toolnest-text truncate">
                  {tool.name}
                </h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColor} mt-1`}>
                  {tool.category}
                </span>
              </div>
              
              {/* Favorite Button - Mobile Optimized */}
              <button 
                onClick={handleFavoriteClick}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 touch-manipulation"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star 
                  size={18} 
                  className={isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'} 
                />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
              {tool.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleTryNowClick}
                className="bg-toolnest-text text-white py-2 px-4 rounded-lg font-medium hover:bg-toolnest-text/90 transition-colors text-sm flex items-center gap-1.5 touch-manipulation active:scale-95"
              >
                <span>Try Now</span>
                <ExternalLink size={14} />
              </button>
              
              {/* Mobile-only quick access */}
              {isMobile && (
                <button 
                  onClick={handleCardClick}
                  className="text-toolnest-text text-sm font-medium hover:underline touch-manipulation"
                >
                  Open
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View - Mobile Optimized
  return (
    <div 
      className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-toolnest-text/30 active:scale-95 h-full flex flex-col"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
    >
      {/* Header with Icon and Favorite */}
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${categoryColor} shadow-sm`}>
          {categoryIcon}
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={handleFavoriteClick}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 touch-manipulation"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star 
            size={18} 
            className={isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-toolnest-text mb-2 line-clamp-2 leading-tight">
          {tool.name}
        </h3>
        
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${categoryColor} mb-3`}>
          {tool.category}
        </span>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
          {tool.description}
        </p>
      </div>

      {/* Action Button */}
      <button 
        onClick={handleTryNowClick}
        className="w-full bg-toolnest-text text-white py-2.5 px-4 rounded-lg font-medium hover:bg-toolnest-text/90 transition-colors text-sm flex items-center justify-center gap-2 touch-manipulation active:scale-95 group-hover:shadow-md"
      >
        <span>Try Now</span>
        <ExternalLink size={14} />
      </button>
    </div>
  );
};

export default ToolCard;