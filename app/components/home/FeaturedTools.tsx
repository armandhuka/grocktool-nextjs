'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toolsData } from '../../data/toolsData';
import { useToolNavigation } from '../../hooks/useToolNavigation';
import { getCategoryIcon } from '../../utils/categoryUtils';

export default function FeaturedTools() {
  const { handleToolClick } = useToolNavigation();
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featured = toolsData
    .filter(t => t.status === 'available')
    .slice(0, 8);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const cardWidth = 280 + 28;
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };

    el.addEventListener('scroll', update);
    return () => el.removeEventListener('scroll', update);
  }, []);

  const scrollToIndex = (i) => {
    const el = containerRef.current;
    if (!el) return;
    const cardWidth = 280 + 28;
    el.scrollTo({ left: i * cardWidth, behavior: 'smooth' });
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold text-toolnest-text text-center mb-6"
        >
          Featured Tools
        </motion.h2>

        <p className="text-toolnest-text/65 text-center mb-16 text-lg">
          Handpicked AI tools, selected for performance and reliability
        </p>

        {/* Fade gradients */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-[#262626] to-transparent"></div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#262626] to-transparent"></div>

          {/* Scroll container */}
          <div
            ref={containerRef}
            className="flex gap-7 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollBehavior: 'smooth' }}
          >
            {featured.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05  }}
                onClick={() => handleToolClick(tool)}
                className="snap-start mt-5 min-w-[280px] backdrop-blur-xl bg-[#ffffff0a] border border-[#ffffff20] rounded-2xl p-7 cursor-pointer 
                transition-all shadow-[0_0_0_0_rgba(0,0,0,0)]
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]
                hover:border-[#B2C9AD60]"
              >
                {/* Icon + Title */}
                <div className="flex items-center mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-toolnest-accent text-[#262626] text-xl font-semibold shadow-sm">
                    {getCategoryIcon(tool.category)}
                  </div>
                  <h3 className="text-toolnest-text text-xl font-medium ml-4">
                    {tool.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-toolnest-text/70 text-sm mb-7 line-clamp-3">
                  {tool.description}
                </p>

                {/* Button */}
                <button className="w-full bg-toolnest-accent text-[#262626] font-medium py-2.5 rounded-xl transition-all hover:opacity-85">
                  Try Now
                </button>
              </motion.div>
            ))}
          </div>

          {/* Scroll Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {featured.map((_, i) => (
              <div
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`w-3.5 h-3.5 rounded-full cursor-pointer transition-all ${
                  i === activeIndex
                    ? 'bg-toolnest-accent shadow-[0_0_8px_rgba(178,201,173,0.8)] scale-110'
                    : 'bg-toolnest-text/30'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
