'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Percent, RotateCcw, Copy, ArrowLeft, Calculator } from 'lucide-react';
import Link from 'next/link';

const SimpleInterest = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<{ interest: number; amount: number } | null>(null);

  useEffect(() => {
    document.title = 'Simple Interest Calculator - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate simple interest with ToolNest\'s free simple interest calculator.');
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

  const copyResult = async () => {
    if (result) {
      const text = `Principal: ${principal}, Rate: ${rate}%, Time: ${time} years\nInterest: ${result.interest.toFixed(2)}\nTotal Amount: ${result.amount.toFixed(2)}`;
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
                Simple Interest Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate simple interest on your investments
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
              {/* Input Fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Percent size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Investment Details
                  </label>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Principal Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="e.g., 10000"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                      step="any"
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Rate of Interest (% per annum)
                    </label>
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="e.g., 5"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                      step="any"
                      min="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Time Period (Years)
                    </label>
                    <input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g., 2"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground"
                      step="any"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateInterest}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calculator size={16} className="sm:w-4 sm:h-4" />
                  Calculate Interest
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
                <h3 className="text-lg font-semibold text-foreground">Calculation Results</h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Main Results Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Simple Interest</div>
                    <div className="text-2xl font-bold text-foreground">₹{result.interest.toFixed(2)}</div>
                  </div>
                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Total Amount</div>
                    <div className="text-2xl font-bold text-foreground">₹{result.amount.toFixed(2)}</div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Principal Amount</span>
                    <span className="font-semibold text-foreground">₹{parseFloat(principal).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Rate of Interest</span>
                    <span className="font-semibold text-foreground">{rate}% per annum</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Time Period</span>
                    <span className="font-semibold text-foreground">{time} years</span>
                  </div>
                </div>

                {/* Formula Display */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Formula Used:</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>I = P × R × T / 100</div>
                    <div className="text-xs">Where: I = Interest, P = Principal, R = Rate, T = Time</div>
                    <div className="text-xs mt-2">
                      Calculation: {principal} × {rate} × {time} / 100 = ₹{result.interest.toFixed(2)}
                    </div>
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Simple Interest Works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Simple interest is calculated only on the principal amount throughout the entire time period, 
                without compounding. It's commonly used for short-term loans and investments.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter the principal amount (initial investment)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Specify the annual interest rate in percentage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter the time period in years</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Interest" to see results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy results for your records or sharing</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Simple Interest Formula:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>I = P × R × T / 100</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>I</strong> = Simple Interest</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>P</strong> = Principal Amount</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>R</strong> = Rate of Interest (% per annum)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>T</strong> = Time Period (years)</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Personal Loans:</strong> Short-term borrowing calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Fixed Deposits:</strong> Interest on non-compounding investments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Education Loans:</strong> Simple interest calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Car Loans:</strong> Short to medium-term financing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Savings Accounts:</strong> Basic interest calculations</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SimpleInterest;