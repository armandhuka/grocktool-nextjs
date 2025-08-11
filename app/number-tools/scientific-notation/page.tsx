'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, RotateCcw, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ScientificNotation = () => {
  const router = useRouter();
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ scientific: string; expanded: string } | null>(null);

  useEffect(() => {
    document.title = 'Scientific Notation Converter - GrockTool';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert numbers to and from scientific notation with GrockTool\'s free scientific notation converter.');
    }
  }, []);

  const convertToScientific = () => {
    const num = parseFloat(number);
    if (isNaN(num)) {
      setResult(null);
      return;
    }

    if (num === 0) {
      setResult({ scientific: '0 × 10^0', expanded: '0' });
      return;
    }

    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const coefficient = num / Math.pow(10, exponent);
    
    const scientific = `${coefficient.toFixed(6).replace(/\.?0+$/, '')} × 10^${exponent}`;
    const expanded = num.toExponential(6);

    setResult({ scientific, expanded });
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result.scientific);
      alert('Result copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-toolnest-bg">
      <Header />

      <main className="pt-32 pb-16 px-4">
        <div className="toolnest-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-toolnest-text mb-4">
              Scientific Notation Converter
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Convert numbers to and from scientific notation
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white shadow-lg rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-toolnest-text flex items-center gap-3">
                  <Zap className="w-6 h-6 text-toolnest-text" />
                  Scientific Notation Converter
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Enter Number
                  </label>
                  <input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="e.g., 1234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-center focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent"
                    step="any"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={convertToScientific} className="bg-toolnest-text hover:bg-toolnest-text/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <Zap className="w-4 h-4" />
                    Convert
                  </button>
                  <button onClick={reset} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                  {result && (
                    <button onClick={copyResult} className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                      <Copy className="w-4 h-4" />
                      Copy Result
                    </button>
                  )}
                </div>

                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6"
                  >
                    <div className="p-6 bg-toolnest-accent/20 rounded-lg border">
                      <h3 className="text-2xl font-bold text-toolnest-text mb-4">
                        Scientific Notation
                      </h3>
                      
                      <div className="space-y-3 text-toolnest-text">
                        <p><strong>Standard Form:</strong> {result.scientific}</p>
                        <p><strong>Exponential Form:</strong> {result.expanded}</p>
                        <p><strong>Original Number:</strong> {parseFloat(number).toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <div className="bg-white shadow-lg rounded-lg">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-toolnest-text">How This Tool Works</h2>
              </div>
              <div className="p-6">
                <p className="text-toolnest-text/80 leading-relaxed">
                  Scientific notation expresses numbers as a coefficient multiplied by 10 raised to a power. 
                  This format is useful for very large or very small numbers. For example, 1,234,567 becomes 
                  1.234567 × 10^6 in scientific notation.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <button 
              onClick={() => router.push('/tool')}
              className="bg-toolnest-text hover:bg-toolnest-text/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Tools
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ScientificNotation;
