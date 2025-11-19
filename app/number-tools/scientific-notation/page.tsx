'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ScientificNotation = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ scientific: string; expanded: string } | null>(null);

  useEffect(() => {
    document.title = 'Scientific Notation Converter - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert numbers to and from scientific notation with ToolNest\'s free scientific notation converter.');
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

  const copyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.scientific);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-2xl">
          {/* Header */}
          <div className="mb-8 sm:mb-10">
            <Link
              href="/tool"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors group text-sm sm:text-base"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Tools
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Scientific Notation Converter
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Convert numbers to and from scientific notation
              </p>
            </motion.div>
          </div>

          {/* Main Tool Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <div className="space-y-6">
              {/* Input Field */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Enter Number
                  </label>
                </div>
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="e.g., 1234567"
                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                  step="any"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={convertToScientific}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Zap size={16} className="sm:w-4 sm:h-4" />
                  Convert
                </button>
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                >
                  <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Card */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Conversion Result</h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Main Result Display */}
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                  <div className="text-2xl font-bold text-foreground text-center">
                    {result.scientific}
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Exponential Form</span>
                    <span className="font-semibold text-foreground text-right">{result.expanded}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Original Number</span>
                    <span className="font-semibold text-foreground">{parseFloat(number).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How This Tool Works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Scientific notation expresses numbers as a coefficient multiplied by 10 raised to a power. 
                This format is useful for very large or very small numbers.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter any number in the input field</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Convert" to see scientific notation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View both standard and exponential forms</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the result for your calculations</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Examples:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>1,234,567</strong> becomes <strong>1.234567 × 10^6</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>0.000123</strong> becomes <strong>1.23 × 10^-4</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>-456,000</strong> becomes <strong>-4.56 × 10^5</strong></span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Scientific Notation Format:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>C × 10^n</strong> where C is coefficient (1 ≤ |C| &lt; 10)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>n is integer exponent representing the power of 10</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Used for very large or very small numbers in science and engineering</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ScientificNotation;