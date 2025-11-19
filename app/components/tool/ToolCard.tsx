'use client';

import React, { useState, useCallback } from 'react';
import { Star, ExternalLink, Sparkles } from 'lucide-react';
import { useToolNavigation } from '../../hooks/useToolNavigation';

const ToolCard = ({
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
    const y = window.scrollY;
    sessionStorage.setItem('toolPageScrollPosition', y.toString());
    handleToolClick(tool);
  };

  const fav = (e) => {
    e.stopPropagation();
    const y = window.scrollY;
    onFavorite(tool.id);
    setTimeout(() => window.scrollTo(0, y), 0);
  };

  const tryNow = (e) => {
    e.stopPropagation();
    const y = window.scrollY;
    sessionStorage.setItem('toolPageScrollPosition', y.toString());
    handleToolClick(tool);
  };

  const CardBase =
    "group relative rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] backdrop-blur-sm transition-all cursor-pointer";

  if (viewMode === 'list') {
    return (
      <div
        className={`${CardBase} p-4 hover:border-[hsl(var(--accent))]`}
        onClick={click}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-start gap-4">

          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${categoryColor} transition`}
          >
            <span className="relative">
              {categoryIcon}
              {hover && <Sparkles size={12} className="absolute -top-2 -right-2 text-[hsl(var(--accent))]" />}
            </span>
          </div>

          <div className="flex-1">

            <div className="flex justify-between items-start mb-3">
              <h3 className="text-base font-medium text-[hsl(var(--foreground))]">
                {tool.name}
              </h3>

              <button onClick={fav}>
                <Star
                  size={18}
                  className={
                    isFavorite
                      ? "text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
                      : "text-[hsl(var(--muted-foreground))]"
                  }
                />
              </button>
            </div>

            <p className="text-[hsl(var(--muted-foreground))] text-sm line-clamp-2 mb-4">
              {tool.description}
            </p>

            <button
              onClick={tryNow}
              className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] px-4 py-2 rounded-lg text-sm"
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

        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${categoryColor} transition`}
        >
          <span className="relative">
            {categoryIcon}
            {hover && <Sparkles size={12} className="absolute -top-2 -right-2 text-[hsl(var(--accent))]" />}
          </span>
        </div>

        <button onClick={fav}>
          <Star
            size={18}
            className={
              isFavorite
                ? "text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
                : "text-[hsl(var(--muted-foreground))]"
            }
          />
        </button>

      </div>

      <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-3 line-clamp-2">
        {tool.name}
      </h3>

      <p className="text-[hsl(var(--foreground))] text-sm line-clamp-3 flex-1 mb-4">
        {tool.description}
      </p>

      <button
        onClick={tryNow}
        className="w-full bg-[#d8a188] text-[hsl(var(--accent-foreground))] py-2.5 rounded-lg text-sm"
      >
        Try Now
      </button>
    </div>
  );
};

export default React.memo(ToolCard);
