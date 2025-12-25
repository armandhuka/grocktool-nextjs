'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useToolNavigation } from '../../hooks/useToolNavigation';

const CTASection = () => {
  const { navigateToTools } = useToolNavigation();

  return (
    <section className="py-20 px-6 bg-toolnest-accent/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-toolnest-text mb-6">
            Want to explore all 150+ tools?
          </h2>
          <motion.button
            onClick={navigateToTools}
            className="px-10 py-4 rounded-full text-lg font-medium transition-all duration-300 bg-toolnest-accent text-toolnest-bg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Browse complete collection of tools"
          >
            Explore All Tools
          </motion.button>
          <p className="mt-4 text-toolnest-text/70">
            All tools are free to use with no limitations or registration required.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;