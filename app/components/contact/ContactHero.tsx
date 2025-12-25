'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ContactHero = () => {
  return (
    <header 
      className="pt-28 pb-12 px-6"
      role="banner"
      aria-labelledby="main-heading"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <h1 
            id="main-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-toolnest-text mb-6"
          >
            Contact GrockTool{' '}
            <span className="bg-gradient-to-r from-toolnest-text to-toolnest-accent bg-clip-text text-transparent">
              Support Team
            </span>
          </h1>
          <p className="text-lg md:text-xl text-toolnest-text/80 max-w-3xl mx-auto leading-relaxed">
            Get help with our 150+ free online tools, submit feedback, report bugs, or suggest 
            new tools. We're here to assist developers and creators.
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-toolnest-text/70">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>24-hour response time</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Free support for all users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Tool suggestions welcome</span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default ContactHero;