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
      const cardWidth = 320 + 32; // Updated width
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };

    el.addEventListener('scroll', update);
    return () => el.removeEventListener('scroll', update);
  }, []);

  const scrollToIndex = (i: number) => {
    const el = containerRef.current as HTMLDivElement | null;
    if (!el) return;

    const cardWidth = 320 + 32; // Updated width
    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-6 bg-background" aria-labelledby="featured-tools-heading">
      <div className="max-w-7xl mx-auto">

        {/* Title - Categories section ke similar */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 
            id="featured-tools-heading"
            className="text-4xl md:text-5xl font-semibold text-foreground mb-6"
          >
            Featured Tools
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-3xl mx-auto">
            Handpicked tools selected for performance and reliability
          </p>
          <div className="w-24 h-1 bg-accent rounded-full mx-auto"></div>
        </motion.div>

        {/* Fade gradients */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background to-transparent z-10" aria-hidden="true"></div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background to-transparent z-10" aria-hidden="true"></div>

          {/* Scroll container */}
          <div
            ref={containerRef}
            className="flex gap-8 overflow-x-auto snap-x snap-mandatory custom-scrollbar pb-8"
            style={{ scrollBehavior: 'smooth' }}
            role="list"
            aria-label="Featured tools carousel"
          >
            {featured.map((tool, i) => (
              <motion.article
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => handleToolClick(tool)}
                className="group relative overflow-hidden snap-start mt-5 min-w-[320px] cursor-pointer"
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleToolClick(tool);
                  }
                }}
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Main Card - Categories section ke similar design */}
                <div className="relative backdrop-blur-xl bg-card border border-border rounded-2xl p-8 h-full
                              group-hover:border-accent/50 group-hover:shadow-2xl 
                              group-hover:shadow-accent/20 transition-all duration-300">
                  
                  {/* Icon + Title - Categories section ke similar */}
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl bg-accent text-accent-foreground shadow-sm transition-all group-hover:scale-110">
                      {getCategoryIcon(tool.category)}
                    </div>
                    <div className="ml-5">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {tool.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                          {tool.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {tool.description}
                    </p>
                    
                    {/* Features Info with Animation */}
                    <div className="flex items-center justify-between bg-secondary/30 rounded-lg p-3">
                      <span className="text-sm font-medium text-foreground">
                        Status
                      </span>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-accent mr-2">
                          Available
                        </span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Features List - Categories section ke similar */}
                  <ul className="space-y-2 mb-8">
                    <li className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      Real-time processing
                    </li>
                    <li className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      No installation needed
                    </li>
                    <li className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      Secure data handling
                    </li>
                  </ul>

                  {/* CTA Button - Categories section ke similar */}
                  <button 
                    className="w-full bg-accent text-accent-foreground font-semibold py-3.5 rounded-xl 
                              hover:opacity-90 active:scale-[0.98] transition-all duration-200
                              flex items-center justify-center group/btn"
                    aria-label={`Try ${tool.name} tool`}
                  >
                    <span className="mr-2">Try Now</span>
                    <svg 
                      className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  {/* Hover Effect Line - Categories section ke similar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-transparent 
                                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Scroll Dots */}
          <div className="flex justify-center mt-8 space-x-3" role="tablist" aria-label="Tool carousel navigation">
            {featured.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-ring ${
                  i === activeIndex
                    ? 'bg-accent scale-110 shadow-[0_0_8px_hsl(var(--accent)/0.8)]'
                    : 'bg-muted hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to tool ${i + 1}`}
                aria-selected={i === activeIndex}
                role="tab"
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}