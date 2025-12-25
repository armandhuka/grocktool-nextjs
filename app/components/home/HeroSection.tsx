'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Star, RefreshCw, ArrowDown } from 'lucide-react';
import { useToolNavigation } from '../../hooks/useToolNavigation';

const HeroSection = () => {
  const { navigateToTools } = useToolNavigation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Icons with aria-hidden for decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="animate-float absolute top-20 left-10">
          <Search size={40} className="text-toolnest-text" aria-hidden="true" />
        </div>
        <div className="animate-float absolute top-40 right-20" style={{ animationDelay: '1s' }}>
          <Star size={35} className="text-toolnest-text" aria-hidden="true" />
        </div>
        <div className="animate-float absolute bottom-40 left-20" style={{ animationDelay: '2s' }}>
          <RefreshCw size={30} className="text-toolnest-text" aria-hidden="true" />
        </div>
      </div>

      <motion.div
        className="text-center max-w-4xl mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-toolnest-text mb-6"
          variants={itemVariants}
        >
          Free Online Tools for{' '}
          <span className="bg-gradient-to-r from-toolnest-text to-toolnest-accent bg-clip-text text-transparent">
            Developers & Creators
          </span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-toolnest-text/80 mb-8"
          variants={itemVariants}
        >
          Access 150+ free tools for text, images, code, calculations, and conversions. 
          No registration required.
        </motion.p>

        <motion.button
          className="bg-toolnest-accent text-toolnest-text px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-toolnest-accent focus:ring-offset-2"
          variants={itemVariants}
          whileHover={{ scale: 1.05, backgroundColor: '#9a99a3' }}
          whileTap={{ scale: 0.95 }}
          onClick={navigateToTools}
          aria-label="Explore all available tools"
        >
          Explore Tools
        </motion.button>

        <motion.p
          className="mt-6 text-toolnest-text/60 text-sm"
          variants={itemVariants}
        >
          Trusted by 10K+ users • 99.9% uptime • All tools completely free
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-hidden="true"
      >
        <ArrowDown className="text-toolnest-text/60" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;