'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { featuresData } from '../../data/featuresData';
import FeatureCard from '../shared/FeatureCard';

const FeaturesSection = () => {
  return (
    <section className="py-16 px-6 bg-[hsl(var(--toolnest-bg))]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--toolnest-text))] mb-4">
            Why Choose GrockTool?
          </h2>
          <p className="text-[hsl(var(--toolnest-text))/80] text-lg">
            Four key reasons that make us different
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;