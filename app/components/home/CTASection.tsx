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
            className="bg-toolnest-text text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToTools}
          >
            Explore All Tools
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;