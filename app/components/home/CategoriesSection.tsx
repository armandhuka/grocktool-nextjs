'use client';

import { motion } from 'framer-motion';
import { categoriesData } from '../../data/categoriesData';
import { useToolNavigation } from '../../hooks/useToolNavigation';

const CategoriesSection = () => {
  const { handleCategoryClick } = useToolNavigation();

  return (
    <section className="py-24 px-6 bg-toolnest-accent/20 theme-transition">
      <div className="max-w-7xl mx-auto">

        {/* Title with SEO improvements */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-toolnest-text mb-6">
            Explore Our Tools by Category
          </h2>
          <p className="text-toolnest-text/65 text-lg mb-8 max-w-3xl mx-auto">
            Discover specialized tools organized into comprehensive categories for efficient workflow management and productivity enhancement
          </p>
          <div className="w-24 h-1 bg-toolnest-accent rounded-full mx-auto"></div>
        </motion.div>

        {/* Categories Grid - 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categoriesData.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => handleCategoryClick(category.name)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer theme-transition-fast"
            >
              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Main Card */}
              <div className="relative backdrop-blur-xl bg-card border border-border rounded-2xl p-8 h-full 
                            group-hover:border-accent/50 group-hover:shadow-2xl 
                            group-hover:shadow-accent/20 theme-transition">
                
                {/* Category Icon and Header */}
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl 
                                ${category.color} theme-transition-fast`}>
                    {category.icon}
                  </div>
                  <div className="ml-5">
                    <h2 className="text-xl font-semibold text-foreground mb-2 theme-transition">
                      {category.name}
                    </h2>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full theme-transition">
                        {category.description}
                      </span>
                    </div>
                  </div>
                </div>

                {/* SEO Rich Description */}
                <div className="mb-8">
                  <p className="text-muted-foreground text-sm mb-4 theme-transition">
                    Access a comprehensive suite of {category.name.toLowerCase()} designed for developers, designers, and professionals.
                  </p>
                  
                  {/* Tools Count with Animation */}
                  <div className="flex items-center justify-between bg-secondary/30 rounded-lg p-3 theme-transition">
                    <span className="text-sm font-medium text-foreground theme-transition">
                      Available Tools
                    </span>
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-accent mr-2 theme-transition">
                        {category.description.split('+')[0]}+
                      </span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Features List for SEO */}
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center text-sm text-muted-foreground theme-transition">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                    Real-time processing capabilities
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground theme-transition">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                    Browser-based, no installation needed
                  </li>
                  <li className="flex items-center text-sm text-muted-foreground theme-transition">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                    Secure and private data handling
                  </li>
                </ul>

                {/* CTA Button */}
                <button className="w-full bg-accent text-accent-foreground font-semibold py-3.5 rounded-xl 
                                hover:opacity-90 active:scale-[0.98] theme-transition-fast
                                flex items-center justify-center group/btn">
                  <span className="mr-2">Explore Tools</span>
                  <svg 
                    className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-transparent 
                              transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* SEO Rich Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-border theme-transition"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-4 theme-transition">
            Why Choose Our Tool Categories?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto theme-transition">
                <span className="text-accent text-xl">⚡</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 theme-transition">Instant Access</h4>
              <p className="text-sm text-muted-foreground theme-transition">
                All tools work directly in your browser without any downloads or installations
              </p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto theme-transition">
                <span className="text-accent text-xl">🔒</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 theme-transition">Privacy First</h4>
              <p className="text-sm text-muted-foreground theme-transition">
                Your data never leaves your browser. All processing happens locally
              </p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto theme-transition">
                <span className="text-accent text-xl">🔄</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2 theme-transition">Regular Updates</h4>
              <p className="text-sm text-muted-foreground theme-transition">
                New tools and features added regularly based on user feedback
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CategoriesSection;