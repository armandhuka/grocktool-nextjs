'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  title: string;
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ title, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
    >
      <div className="flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
        <div>
          <h4 className="font-semibold text-green-800 text-sm">{title}</h4>
          <p className="text-green-700 text-sm mt-1">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessMessage;