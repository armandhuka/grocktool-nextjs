'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useToolNavigation } from '../../hooks/useToolNavigation';

const VisionSection = () => {
  const { navigateToTools } = useToolNavigation();

  return (
    <section 
      className="py-16 px-6"
      aria-labelledby="vision-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-toolnest-bg to-toolnest-accent/5 p-8 md:p-12 rounded-3xl shadow-lg border border-toolnest-accent/20">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Sparkles className="text-toolnest-accent" size={24} />
              <h2 
                id="vision-heading"
                className="text-3xl md:text-4xl font-bold text-toolnest-text"
              >
                Our Vision & Future Roadmap
              </h2>
            </div>
            
            <div className="space-y-6 text-toolnest-text/80 text-lg leading-relaxed mb-8">
              <p>
                We're building <strong className="text-toolnest-text">the most comprehensive free tools platform </strong> 
                on the web. Our vision extends beyond today's 150+ tools to a future where 
                GrockTool becomes the go-to destination for every digital utility need.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="text-lg font-semibold text-toolnest-text mb-2">2026 Roadmap</h3>
                  <ul className="space-y-1 text-sm text-toolnest-text/70">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-toolnest-accent rounded-full"></div>
                      <span>AI-powered tools integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-toolnest-accent rounded-full"></div>
                      <span>Collaborative features for teams</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-toolnest-accent rounded-full"></div>
                      <span>Performance & Usability Upgrades</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl">
                  <h3 className="text-lg font-semibold text-toolnest-text mb-2">Long-term Goals</h3>
                  <ul className="space-y-1 text-sm text-toolnest-text/70">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-toolnest-accent rounded-full"></div>
                      <span>500+ tools by 2028</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-toolnest-accent rounded-full"></div>
                      <span>Multilingual interface support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-toolnest-accent rounded-full"></div>
                      <span>API access for developers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <motion.button
                className="bg-toolnest-accent text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-toolnest-accent focus:ring-offset-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={navigateToTools}
                aria-label="Start using 150+ free tools on GrockTool"
              >
                Start Using Free Tools
                <ArrowRight size={20} aria-hidden="true" />
              </motion.button>
              <p className="mt-4 text-sm text-toolnest-text/60">
                Join 10,000+ developers and creators using GrockTool today
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;