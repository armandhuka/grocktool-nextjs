'use client';

import React, { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';
import { useToolNavigation } from '../../hooks/useToolNavigation';
import type { Tool } from '../../data/toolsData'; // ✅ SINGLE SOURCE OF TRUTH

interface ToolCardProps {
  tool: Tool; // ✅ number id
  onFavorite: (id: string) => void; // UI = string
  isFavorite: boolean;
  viewMode: 'grid' | 'list';
  categoryIcon: React.ReactNode;
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
  const [hover, setHover] = useState(false);

  const click = () => {
    sessionStorage.setItem(
      'toolPageScrollPosition',
      window.scrollY.toString()
    );
    handleToolClick(tool);
  };

  const fav = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(tool.id.toString()); // ✅ number → string
  };

  const tryNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    sessionStorage.setItem(
      'toolPageScrollPosition',
      window.scrollY.toString()
    );
    handleToolClick(tool);
  };

  const CardBase =
    'group relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all cursor-pointer';

  if (viewMode === 'list') {
    return (
      <div
        className={`${CardBase} p-4 hover:border-[hsl(var(--accent))]`}
        onClick={click}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${categoryColor}`}>
            <span className="relative">
              {categoryIcon}
              {hover && (
                <Sparkles
                  size={12}
                  className="absolute -top-2 -right-2 text-[hsl(var(--accent))]"
                />
              )}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <h3 className="font-medium">{tool.name}</h3>
              <button onClick={fav}>
                <Star
                  size={18}
                  className={
                    isFavorite
                      ? 'text-[hsl(var(--accent))] fill-[hsl(var(--accent))]'
                      : 'text-[hsl(var(--muted-foreground))]'
                  }
                />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {tool.description}
            </p>

            <button
              onClick={tryNow}
              className="bg-[hsl(var(--accent))] text-white px-4 py-2 rounded-lg text-sm"
            >
              Try Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${CardBase} p-5 hover:border-[hsl(var(--accent))] flex flex-col`}
      onClick={click}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex justify-between mb-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${categoryColor}`}>
          {categoryIcon}
        </div>

        <button onClick={fav}>
          <Star
            size={18}
            className={
              isFavorite
                ? 'text-[hsl(var(--accent))] fill-[hsl(var(--accent))]'
                : 'text-[hsl(var(--muted-foreground))]'
            }
          />
        </button>
      </div>

      <h3 className="text-lg font-medium mb-2 line-clamp-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground flex-1 mb-4 line-clamp-3">
        {tool.description}
      </p>

      <button
        onClick={tryNow}
        className="w-full bg-[#d8a188] text-white py-2.5 rounded-lg text-sm"
      >
        Try Now
      </button>
    </div>
  );
};

export default React.memo(ToolCard);
