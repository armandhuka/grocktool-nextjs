'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Zap, Users, TrendingUp, CheckCircle } from 'lucide-react';

const ToolSuggestions = () => {
  const benefits = [
    { icon: Zap, text: 'Quick implementation for popular ideas' },
    { icon: Users, text: 'Community voting on new tools' },
    { icon: TrendingUp, text: 'See your suggestion in development' },
    { icon: CheckCircle, text: 'Get credit for your contribution' },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      viewport={{ once: true }}
      className="rounded-2xl p-6 bg-gradient-to-br from-toolnest-accent to-toolnest-text shadow-lg"
      aria-labelledby="suggestions-heading"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
        <div>
          <h3 
            id="suggestions-heading"
            className="text-lg font-bold text-white"
          >
            Got Tool Ideas?
          </h3>
          <p className="text-white/90 text-xs">
            We build tools based on your needs
          </p>
        </div>
      </div>
      
      <p className="text-white/90 text-sm mb-4 leading-relaxed">
        Your suggestions directly influence our roadmap. We prioritize tools 
        requested by multiple users and implement the most requested features first.
      </p>
      
      <div className="space-y-2 mb-4">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div key={index} className="flex items-center gap-2 text-white/90">
              <Icon className="w-4 h-4 text-white" aria-hidden="true" />
              <span className="text-xs">{benefit.text}</span>
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <a 
          href="mailto:ideas@grocktool.com"
          className="inline-block px-4 py-2 bg-white text-toolnest-accent text-sm font-semibold rounded-lg hover:bg-white/90 transition-colors"
          aria-label="Email your tool suggestions to ideas@grocktool.com"
        >
          Submit Your Idea
        </a>
      </div>
    </motion.aside>
  );
};

export default ToolSuggestions;