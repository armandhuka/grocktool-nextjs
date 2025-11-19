'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useToolNavigation } from '../../hooks/useToolNavigation';

const VisionSection = () => {
  const { navigateToTools } = useToolNavigation();

  return (
    <section className="">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-[hsl(var(--toolnest-bg))] p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[hsl(var(--toolnest-text))] mb-6">
              Our Vision
            </h2>
            <p className="text-[hsl(var(--toolnest-text))/80] text-lg leading-relaxed mb-8">
              We aim to keep expanding, refining, and simplifying your interaction with tools — one click at a time. 
              GrockTool will continue growing to become the ultimate destination for all your digital tool needs.
            </p>
            
            <motion.button
              className="bg-[#d8a188] text-[hsl(var(--toolnest-bg))] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl inline-flex items-center gap-2 hover:bg-[#d8a188]/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={navigateToTools}
            >
              Start Using Tools
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;