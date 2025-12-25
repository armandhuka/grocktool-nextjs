'use client';

import React from 'react';
import { motion } from 'framer-motion';

const IntroductionSection = () => {
  return (
    <section 
      className="py-16 px-6"
      aria-labelledby="mission-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-toolnest-bg p-8 md:p-12 rounded-3xl shadow-lg">
            <h2 
              id="mission-heading"
              className="text-3xl md:text-4xl font-bold text-toolnest-text mb-8 text-center"
            >
              Our Mission: Free Tools for Everyone
            </h2>
            
            <div className="space-y-6 text-lg text-toolnest-text/80 leading-relaxed">
              <p>
                <strong className="text-toolnest-text">GrockTool is your comprehensive platform</strong> for 150+ 
                essential online tools designed for developers, designers, and creators. 
                We provide everything from <strong className="text-toolnest-text">text manipulation</strong> and 
                <strong className="text-toolnest-text"> code formatting</strong> to 
                <strong className="text-toolnest-text"> image editing</strong> and 
                <strong className="text-toolnest-text"> unit conversion</strong> — all in one place.
              </p>
              
              <p>
                Founded in 2025, our mission is simple: <strong className="text-toolnest-text">
                make productivity tools accessible to everyone</strong>, regardless of technical 
                expertise or budget. We believe essential utilities should be free, 
                fast, and available without barriers.
              </p>

              <div className="mt-8 p-6 bg-toolnest-accent/5 rounded-2xl border border-toolnest-accent/20">
                <h3 className="text-xl font-semibold text-toolnest-text mb-3">
                  What Makes Us Different?
                </h3>
                <ul className="space-y-2 text-toolnest-text/80">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>No registration required</strong> - Use tools instantly</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>100% browser-based</strong> - No data leaves your device</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Mobile-optimized</strong> - Works perfectly on all devices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span><strong>Regular updates</strong> - New tools added weekly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroductionSection;