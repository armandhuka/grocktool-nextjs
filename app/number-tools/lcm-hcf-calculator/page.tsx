'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const LCMHCFCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState<{ lcm: number; hcf: number; factors: number[][] } | null>(null);

  useEffect(() => {
    document.title = 'LCM & HCF Calculator - GrockTool';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate LCM and HCF of multiple numbers with GrockTool\'s free calculator.');
    }
  }, []);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  const getPrimeFactors = (num: number): number[] => {
    const factors: number[] = [];
    let divisor = 2;
    
    while (num > 1) {
      while (num % divisor === 0) {
        factors.push(divisor);
        num /= divisor;
      }
      divisor++;
    }
    
    return factors;
  };

  const calculate = () => {
    const numArray = numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0);
    
    if (numArray.length < 2) {
      setResult(null);
      return;
    }

    let currentLcm = numArray[0];
    let currentHcf = numArray[0];

    for (let i = 1; i < numArray.length; i++) {
      currentLcm = lcm(currentLcm, numArray[i]);
      currentHcf = gcd(currentHcf, numArray[i]);
    }

    const factors = numArray.map(getPrimeFactors);

    setResult({ lcm: currentLcm, hcf: currentHcf, factors });
  };

  const reset = () => {
    setNumbers('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `Numbers: ${numbers}\nLCM: ${result.lcm}\nHCF: ${result.hcf}`;
      try {
        await navigator.clipboard.writeText(text);
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
                LCM & HCF Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate Least Common Multiple and Highest Common Factor
              </p>
            </motion.div>
          </div>

          {/* Input Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Calculator size={20} className="text-foreground" />
                <label className="block text-sm font-medium text-foreground">
                  Enter Numbers
                </label>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="e.g., 12, 18, 24"
                    className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter at least 2 positive numbers separated by commas
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={calculate}
                    disabled={!numbers}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Calculator size={16} className="sm:w-4 sm:h-4" />
                    Calculate
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
                <h3 className="text-lg font-semibold text-foreground">Calculation Results</h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* LCM & HCF Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                    <div className="text-sm font-medium text-foreground mb-2">LCM</div>
                    <div className="text-2xl font-bold text-foreground">
                      {result.lcm.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Least Common Multiple</div>
                  </div>
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20">
                    <div className="text-sm font-medium text-foreground mb-2">HCF</div>
                    <div className="text-2xl font-bold text-foreground">
                      {result.hcf.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Highest Common Factor</div>
                  </div>
                </div>

                {/* Prime Factorization */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Prime Factorization</h4>
                  <div className="space-y-2">
                    {numbers.split(',').map((num, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-foreground">{num.trim()}:</span>
                        <span className="text-muted-foreground">
                          {result.factors[index].join(' × ')}
                        </span>
                      </div>
                    ))}
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
                Calculate LCM (Least Common Multiple) and HCF (Highest Common Factor) 
                of multiple numbers using prime factorization and the Euclidean algorithm.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter at least 2 positive numbers separated by commas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate" to compute LCM and HCF</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View detailed results including prime factorization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Use "Clear All" to reset the calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy your results for sharing or record keeping</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Key Concepts:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>LCM:</strong> The smallest number that is a multiple of all given numbers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>HCF:</strong> The largest number that divides all given numbers without remainder</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Prime Factorization:</strong> Breaking down numbers into their prime factors</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LCMHCFCalculator;