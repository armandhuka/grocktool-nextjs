'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LCMHCFCalculator = () => {
  const router = useRouter();
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

  const copyResult = () => {
    if (result) {
      const text = `Numbers: ${numbers}\nLCM: ${result.lcm}\nHCF: ${result.hcf}`;
      navigator.clipboard.writeText(text);
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
              LCM & HCF Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate Least Common Multiple and Highest Common Factor
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
                  <Calculator className="w-6 h-6 text-toolnest-text" />
                  LCM & HCF Calculator
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-toolnest-text mb-2">
                    Enter Numbers (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="e.g., 12, 18, 24"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-center focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent"
                  />
                  <p className="text-sm text-toolnest-text/60 mt-1">Enter at least 2 positive numbers separated by commas</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={calculate} className="bg-toolnest-text hover:bg-toolnest-text/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <Calculator className="w-4 h-4" />
                    Calculate
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
                        Calculation Results
                      </h3>
                      
                      <div className="space-y-4 text-toolnest-text">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-white rounded-lg border">
                            <h4 className="font-semibold text-lg mb-2">LCM (Least Common Multiple)</h4>
                            <p className="text-2xl font-bold text-toolnest-text">{result.lcm.toLocaleString()}</p>
                          </div>
                          <div className="p-4 bg-white rounded-lg border">
                            <h4 className="font-semibold text-lg mb-2">HCF (Highest Common Factor)</h4>
                            <p className="text-2xl font-bold text-toolnest-text">{result.hcf.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-white rounded-lg border">
                          <h4 className="font-semibold text-lg mb-2">Prime Factorization</h4>
                          <div className="space-y-2">
                            {numbers.split(',').map((num, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <span className="font-medium">{num.trim()}:</span>
                                <span className="text-sm">
                                  {result.factors[index].join(' × ')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
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
                  LCM (Least Common Multiple) is the smallest number that is a multiple of all given numbers. 
                  HCF (Highest Common Factor) is the largest number that divides all given numbers without remainder. 
                  This tool calculates both using prime factorization and the Euclidean algorithm.
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

export default LCMHCFCalculator;
