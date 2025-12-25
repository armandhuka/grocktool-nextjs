'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { featuresData } from '../../data/featuresData';
import FeatureCard from '../shared/FeatureCard';

const FeaturesSection = () => {
  return (
    <section 
      className="py-16 px-6 bg-toolnest-bg"
      aria-labelledby="features-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 
            id="features-heading"
            className="text-3xl md:text-4xl font-bold text-toolnest-text mb-4"
          >
            Why Choose GrockTool? 4 Key Benefits
          </h2>
          <p className="text-toolnest-text/80 text-lg max-w-2xl mx-auto">
            We built GrockTool with developers and creators in mind. 
            Here's what makes our platform different.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {featuresData.map((feature, index) => (
            <div key={feature.title} role="listitem">
              <FeatureCard
                feature={feature}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* Additional trust element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-6 py-3 bg-toolnest-accent/10 rounded-full">
            <p className="text-toolnest-text/80 text-sm">
              <span className="font-semibold text-toolnest-text">100% Free Forever</span> • 
              No hidden costs • No premium tiers • No data selling
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;