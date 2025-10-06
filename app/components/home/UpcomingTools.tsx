'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { upcomingToolsData } from '../../data/upcomingToolsData';

const UpcomingTools = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
            Upcoming Tools
          </h2>
          <p className="text-toolnest-text/80 text-lg">
            Sneak peek of tools coming soon
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingToolsData.map((tool, index) => (
            <motion.div
              key={tool.name}
              className="bg-toolnest-accent p-6 rounded-xl hover:bg-white transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${tool.color} shadow-sm mb-4`}>
                  {tool.name[0]}
                </div>
                <h3 className="text-lg font-semibold text-toolnest-text mb-2">{tool.name}</h3>
                <p className="text-toolnest-text/70 text-sm">{tool.description}</p>
              </div>
              <span className="text-xs text-toolnest-text/50 mt-4">{tool.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingTools;