'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { categoriesData } from '../../data/categoriesData';
import { useToolNavigation } from '../../hooks/useToolNavigation';

const CategoriesSection = () => {
  const { handleCategoryClick } = useToolNavigation();

  return (
    <section className="py-20 px-6 bg-toolnest-accent/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
            Explore Categories
          </h2>
          <p className="text-toolnest-text/80 text-lg">
            Find tools organized by category for quick access
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.map((category, index) => (
            <motion.div
              key={category.name}
              className="bg-toolnest-accent p-6 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${category.color} shadow-sm mb-4`}>
                {category.icon}
              </div>
              <h3 className="text-lg font-semibold text-toolnest-text mb-2">{category.name}</h3>
              <p className="text-toolnest-text/70 text-sm">{category.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;