'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const EmailModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!showModal) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-md mx-auto relative shadow-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-toolnest-text mb-4">🔥 GrockTool is Live!</h3>
          <p className="text-toolnest-text/80 mb-6">
            Discover 150+ tools designed to simplify your digital life.
          </p>
          <button
            onClick={() => setShowModal(false)}
            className="bg-toolnest-text text-white px-6 py-3 rounded-full font-semibold hover:bg-toolnest-text/90 transition-colors"
          >
            Explore Now
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EmailModal;