'use client';

import React, { useState, useCallback } from 'react';
import { Star, ExternalLink, Sparkles } from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Mobile detection
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  const handleCardClick = useCallback(() => {
    // Save current scroll position before navigation
    const scrollY = window.scrollY;
    sessionStorage.setItem('toolPageScrollPosition', scrollY.toString());
    handleToolClick(tool);
  }, [handleToolClick, tool]);

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Save scroll position before state update
    const scrollY = window.scrollY;
    onFavorite(tool.id);
    // Restore scroll position
    setTimeout(() => window.scrollTo(0, scrollY), 0);
  }, [onFavorite, tool.id]);

  const handleTryNowClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    // Save current scroll position before navigation
    const scrollY = window.scrollY;
    sessionStorage.setItem('toolPageScrollPosition', scrollY.toString());
    handleToolClick(tool);
  }, [handleToolClick, tool]);

  // ... (rest of the component remains the same, just use the updated handlers)
  // List View - Premium Mobile Design
  if (viewMode === 'list') {
    return (
      <div 
        className="group relative bg-white/80 backdrop-blur-sm border border-gray-100/80 p-4 rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-[1.02] active:scale-[0.99] hover:border-toolnest-text/20"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
        style={{
          transform: isPressed ? 'scale(0.99)' : isHovered ? 'scale(1.02)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-start gap-4">
          {/* Animated Category Icon */}
          <div 
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${categoryColor} shadow-lg group-hover:shadow-xl transition-all duration-500 flex-shrink-0 mt-1 group-hover:scale-110`}
            style={{
              transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
            }}
          >
            <span className="relative">
              {categoryIcon}
              {isHovered && (
                <Sparkles 
                  size={12} 
                  className="absolute -top-2 -right-2 text-yellow-500 animate-ping" 
                />
              )}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-gray-900 truncate mb-1 group-hover:text-toolnest-text transition-colors duration-300">
                  {tool.name}
                </h3>
                <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColor} border border-transparent group-hover:border-current/20 transition-all duration-300`}>
                  {tool.category}
                </span>
              </div>
              
              {/* Animated Favorite Button */}
              <button 
                onClick={handleFavoriteClick}
                className="p-2 hover:bg-yellow-50 rounded-xl transition-all duration-300 flex-shrink-0 touch-manipulation hover:scale-110 active:scale-95 group/fav"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Star 
                  size={20} 
                  className={`transition-all duration-300 ${
                    isFavorite 
                      ? 'text-yellow-500 fill-yellow-500 scale-110' 
                      : 'text-gray-400 group-hover/fav:text-yellow-400'
                  }`} 
                />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4 group-hover:text-gray-700 transition-colors duration-300">
              {tool.description}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleTryNowClick}
                className="relative bg-gradient-to-r from-toolnest-text to-toolnest-text/90 text-white py-2.5 px-5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm flex items-center gap-2 touch-manipulation hover:scale-105 active:scale-95 group/btn overflow-hidden"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                <span>Try Now</span>
                <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 transition-transform duration-300" />
              </button>
              
              {/* Mobile Quick Access */}
              {isMobile && (
                <button 
                  onClick={handleCardClick}
                  className="text-toolnest-text text-sm font-semibold hover:underline touch-manipulation transition-all duration-300 hover:scale-105"
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

  // Grid View - Premium Design
  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm border border-gray-100/80 p-5 rounded-2xl hover:shadow-2xl transition-all duration-500 cursor-pointer hover:scale-[1.02] active:scale-[0.99] hover:border-toolnest-text/20 h-full flex flex-col"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      style={{
        transform: isPressed ? 'scale(0.99)' : isHovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-gray-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header with Icon and Favorite */}
      <div className="relative flex items-start justify-between mb-4">
        <div 
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${categoryColor} shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}
          style={{
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
          }}
        >
          <span className="relative">
            {categoryIcon}
            {isHovered && (
              <Sparkles 
                size={12} 
                className="absolute -top-2 -right-2 text-yellow-500 animate-ping" 
              />
            )}
          </span>
        </div>
        
        {/* Animated Favorite Button */}
        <button 
          onClick={handleFavoriteClick}
          className="p-2 hover:bg-yellow-50 rounded-xl transition-all duration-300 flex-shrink-0 touch-manipulation hover:scale-110 active:scale-95 group/fav"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Star 
            size={20} 
            className={`transition-all duration-300 ${
              isFavorite 
                ? 'text-yellow-500 fill-yellow-500 scale-110' 
                : 'text-gray-400 group-hover/fav:text-yellow-400'
            }`} 
          />
        </button>
      </div>

      {/* Content */}
      <div className="relative flex-1 mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-toolnest-text transition-colors duration-300">
          {tool.name}
        </h3>
        
        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColor} border border-transparent group-hover:border-current/20 transition-all duration-300 mb-4`}>
          {tool.category}
        </span>
        
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
          {tool.description}
        </p>
      </div>

      {/* Action Button */}
      <button 
        onClick={handleTryNowClick}
        className="relative w-full bg-gradient-to-r from-toolnest-text to-toolnest-text/90 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-2 touch-manipulation hover:scale-105 active:scale-95 group/btn overflow-hidden"
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
        <span>Try Now</span>
        <ExternalLink size={16} className="group-hover/btn:translate-x-0.5 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default React.memo(ToolCard);