'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TrustedSection = () => {
  return (
    <section className="py-20 px-6 bg-toolnest-accent/20">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-toolnest-text mb-4">
            Trusted by Thousands of Developers
          </h2>
          <p className="text-toolnest-text/80 text-lg mb-8">
            Join our community of users who rely on GrockTool for their daily workflow
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-toolnest-text">10K+</div>
              <div className="text-toolnest-text/70">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-toolnest-text">150+</div>
              <div className="text-toolnest-text/70">Tools Available in Features</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-toolnest-text">99.9%</div>
              <div className="text-toolnest-text/70">Uptime</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedSection;