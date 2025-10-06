'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ContactHero = () => {
  return (
    <section className="pt-28 pb-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-toolnest-text mb-6">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-toolnest-text/80 max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you—whether it's feedback, a question, or a tool suggestion. 
            Let's build something amazing together!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;