'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    { step: '1', title: 'Browse Tools', description: 'Explore our curated collection of tools' },
    { step: '2', title: 'Choose Category', description: 'Find tools by specific use case or industry' },
    { step: '3', title: 'Start Using', description: 'Click through to start using your chosen tool' }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
            How It Works
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-toolnest-text text-toolnest-bg rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                {step.step}
              </div>
              <h3 className="text-2xl font-semibold text-toolnest-text mb-3">
                {step.title}
              </h3>
              <p className="text-toolnest-text/80">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;