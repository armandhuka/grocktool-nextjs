'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AboutHeader = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <header 
      className="pt-32 pb-16 px-6 bg-toolnest-bg"
      role="banner"
      aria-labelledby="main-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            id="main-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-toolnest-text"
            variants={itemVariants}
          >
            About GrockTool: 150+ Free Tools for{' '}
            <span className="bg-gradient-to-r from-toolnest-text to-toolnest-accent bg-clip-text text-transparent">
              Developers & Creators
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl max-w-2xl mx-auto text-toolnest-text/80 leading-relaxed"
            variants={itemVariants}
          >
            Discover our mission to provide free, accessible tools for developers, 
            designers, and creators worldwide. No registration required.
          </motion.p>

          {/* Trust badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-toolnest-text/70"
            variants={itemVariants}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>150+ Free Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>No Registration Required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>10K+ Monthly Users</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default AboutHeader;