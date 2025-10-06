'use client';

import React from 'react';
import { motion } from 'framer-motion';

const NoToolsFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16 px-6"
    >
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-2xl font-semibold text-toolnest-text mb-2">
        No tools found
      </h3>
      <p className="text-toolnest-text/70">
        Try adjusting your search terms or category filter
      </p>
    </motion.div>
  );
};

export default NoToolsFound;