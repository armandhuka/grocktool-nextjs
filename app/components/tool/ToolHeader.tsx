'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ToolHeader = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-toolnest-text mb-6">
            All Tools
          </h1>
          <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
            Discover 150+ tools organized by category. Find exactly what you need, when you need it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolHeader;