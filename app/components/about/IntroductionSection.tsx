'use client';

import React from 'react';
import { motion } from 'framer-motion';

const IntroductionSection = () => {
  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-[hsl(var(--toolnest-bg))] p-8 md:p-12 rounded-3xl shadow-lg">
            <div className="space-y-6 text-lg text-[hsl(var(--toolnest-text))/80] leading-relaxed">
              <p>
                GrockTool is your go-to platform to access 150+ handy tools for daily development, 
                productivity, calculations, and more — all in one place. From text manipulation 
                to health calculators, we've curated the most useful tools you need.
              </p>
              
              <p>
                Our mission is to provide fast, accessible, and categorized tools to make your 
                digital life simpler. No downloads, no registrations, no complications — just 
                the tools you need when you need them.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroductionSection;