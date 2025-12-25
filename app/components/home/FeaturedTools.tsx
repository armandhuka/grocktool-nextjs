'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toolsData } from '../../data/toolsData';
import { useToolNavigation } from '../../hooks/useToolNavigation';
import { getCategoryIcon } from '../../utils/categoryUtils';

export default function FeaturedTools() {
  const { handleToolClick } = useToolNavigation();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featured = toolsData
    .filter(t => t.status === 'available')
    .slice(0, 8);

  useEffect(() => {
    const el = containerRef.current as HTMLDivElement | null;
    if (!el) return;

    const update = () => {
      const cardWidth = 280 + 28;
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };

    el.addEventListener('scroll', update);
    return () => el.removeEventListener('scroll', update);
  }, []);

  const scrollToIndex = (i: number) => {
    const el = containerRef.current as HTMLDivElement | null;
    if (!el) return;

    const cardWidth = 280 + 28;
    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold text-foreground text-center mb-6"
        >
          Featured Tools
        </motion.h2>

        <p className="text-muted-foreground text-center mb-16 text-lg">
          Handpicked AI tools, selected for performance and reliability
        </p>

        {/* Fade gradients */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10"></div>

          {/* Scroll container */}
          <div
            ref={containerRef}
            className="flex gap-7 overflow-x-auto snap-x snap-mandatory custom-scrollbar pb-8"
            style={{ scrollBehavior: 'smooth' }}
          >
            {featured.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleToolClick(tool)}
                className="snap-start mt-5 min-w-[280px] glass rounded-2xl p-7 cursor-pointer 
                transition-all shadow-sm
                hover:shadow-lg hover:shadow-[hsl(var(--accent))]/10
                hover:border-accent/40 hover:scale-[1.02]"
              >
                {/* Icon + Title */}
                <div className="flex items-center mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent text-accent-foreground text-xl font-semibold shadow-sm">
                    {getCategoryIcon(tool.category)}
                  </div>
                  <h3 className="text-foreground text-xl font-medium ml-4">
                    {tool.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-7 line-clamp-3">
                  {tool.description}
                </p>

                {/* Button */}
                <button className="w-full bg-accent text-accent-foreground font-medium py-2.5 rounded-xl transition-all 
                  hover:opacity-90 hover:shadow-md hover:shadow-accent/20">
                  Try Now
                </button>
              </motion.div>
            ))}
          </div>

          {/* Scroll Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                  i === activeIndex
                    ? 'bg-accent scale-110 shadow-[0_0_8px_hsl(var(--accent)/0.8)]'
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}