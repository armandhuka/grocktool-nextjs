'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
  };
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const IconComponent = feature.icon;

  return (
    <motion.div
      className=" p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <IconComponent 
        className="text-toolnest-text mx-auto mb-4 group-hover:scale-110 transition-transform" 
        size={40} 
      />
      <h3 className="text-lg font-semibold text-toolnest-text mb-3">
        {feature.title}
      </h3>
      <p className="text-toolnest-text/70 text-sm leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;