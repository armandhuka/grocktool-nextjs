'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Users } from 'lucide-react';

const ToolSuggestions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-toolnest-text to-toolnest-text/90 rounded-2xl p-6 text-white"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-bold">Got Tool Ideas?</h3>
      </div>
      
      <p className="text-white/80 text-sm mb-4 leading-relaxed">
        We're always looking for new tool ideas to make your life easier. Share your suggestions and help us build the ultimate toolkit!
      </p>
      
      <div className="space-y-2 text-xs">
        <div className="flex items-center gap-2 text-white/70">
          <Zap className="w-3 h-3" />
          <span>Quick feature implementation</span>
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <Users className="w-3 h-3" />
          <span>Community-driven development</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolSuggestions;