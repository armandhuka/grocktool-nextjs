'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Percent, RotateCcw, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SimpleInterest = () => {
  const router = useRouter();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<{ interest: number; amount: number } | null>(null);

  useEffect(() => {
    document.title = 'Simple Interest Calculator - GrockTool';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate simple interest with GrockTool\'s free simple interest calculator.');
    }
  }, []);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      setResult(null);
      return;
    }

    const interest = (p * r * t) / 100;
    const amount = p + interest;

    setResult({ interest, amount });
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setResult(null);
  };

  const copyResult = () => {
    if (result) {
      const text = `Principal: ${principal}, Rate: ${rate}%, Time: ${time} years\nInterest: ${result.interest.toFixed(2)}\nTotal Amount: ${result.amount.toFixed(2)}`;
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
              Simple Interest Calculator
            </h1>
            <p className="text-xl text-toolnest-text/80 max-w-2xl mx-auto">
              Calculate simple interest on your investments
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
                  <Percent className="w-6 h-6 text-toolnest-text" />
                  Simple Interest Calculator
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Principal Amount
                    </label>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="e.g., 10000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-center focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent"
                      step="any"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Rate of Interest (%)
                    </label>
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="e.g., 5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-center focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent"
                      step="any"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-toolnest-text mb-2">
                      Time (Years)
                    </label>
                    <input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g., 2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg text-center focus:outline-none focus:ring-2 focus:ring-toolnest-text focus:border-transparent"
                      step="any"
                      min="0"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button onClick={calculateInterest} className="bg-toolnest-text hover:bg-toolnest-text/90 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors">
                    <Percent className="w-4 h-4" />
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
                      
                      <div className="space-y-3 text-toolnest-text">
                        <p><strong>Principal Amount:</strong> ₹{parseFloat(principal).toLocaleString()}</p>
                        <p><strong>Rate of Interest:</strong> {rate}% per annum</p>
                        <p><strong>Time Period:</strong> {time} years</p>
                        <p><strong>Simple Interest:</strong> ₹{result.interest.toFixed(2)}</p>
                        <p><strong>Total Amount:</strong> ₹{result.amount.toFixed(2)}</p>
                        <p><strong>Formula:</strong> I = P × R × T / 100</p>
                        <p><strong>Calculation:</strong> I = {principal} × {rate} × {time} / 100 = ₹{result.interest.toFixed(2)}</p>
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
                  Simple interest is calculated using the formula: I = P × R × T / 100, where I is the interest, 
                  P is the principal amount, R is the rate of interest per annum, and T is the time in years. 
                  This tool helps you quickly calculate the interest earned on your investments.
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

export default SimpleInterest;
