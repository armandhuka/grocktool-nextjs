'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Factorial() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ factorial: string; steps: string[] } | null>(null);

  const calculateFactorial = (n: number): { factorial: bigint; steps: string[] } => {
    if (n === 0 || n === 1) {
      return { factorial: BigInt(1), steps: [`${n}! = 1`] };
    }

    let factorial = BigInt(1);
    const steps: string[] = [];
    const factors: number[] = [];

    for (let i = 1; i <= n; i++) {
      factorial *= BigInt(i);
      factors.push(i);
    }

    steps.push(`${n}! = ${factors.join(' × ')}`);
    steps.push(`${n}! = ${factorial.toString()}`);

    return { factorial, steps };
  };

  const calculate = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) {
      setResult(null);
      return;
    }

    if (num > 170) {
      setResult({
        factorial: 'Number too large (max: 170)',
        steps: ['Factorial of numbers greater than 170 results in infinity']
      });
      return;
    }

    const { factorial, steps } = calculateFactorial(num);
    setResult({ factorial: factorial.toString(), steps });
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result?.factorial) {
      try {
        await navigator.clipboard.writeText(result.factorial);
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
                Factorial Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate factorial (n!) of any number with detailed steps
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
                  <Hash size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Enter Number
                  </label>
                </div>
                <input
                  type="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="e.g., 5"
                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                  min="0"
                  max="170"
                />
                <p className="text-xs text-muted-foreground text-center">
                  Enter a number between 0 and 170
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculate}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Hash size={16} className="sm:w-4 sm:h-4" />
                  Calculate Factorial
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
                <h3 className="text-lg font-semibold text-foreground">Calculation Result</h3>
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
                  <div className="text-sm text-muted-foreground mb-1">Factorial Result</div>
                  <div className="text-2xl font-bold text-foreground font-mono break-all text-center">
                    {result.factorial}
                  </div>
                </div>

                {/* Steps Display */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Calculation Steps:</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    {result.steps.map((step, index) => (
                      <div key={index} className="text-sm font-mono text-foreground">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Number Info */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Input Number</div>
                    <div className="font-semibold text-foreground">{number}</div>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Factorial Notation</div>
                    <div className="font-semibold text-foreground">{number}!</div>
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Factorial Calculation Works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Factorial (n!) is the product of all positive integers less than or equal to n. 
                It's a fundamental concept in mathematics, particularly in combinatorics and probability.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter any non-negative integer between 0 and 170</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Factorial" to compute the result</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View the step-by-step multiplication process</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the result for use in other applications</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Factorial Formula:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>n! = n × (n-1) × (n-2) × ... × 3 × 2 × 1</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>0! = 1</strong> (by mathematical definition)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>1! = 1</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Factorial grows very rapidly with larger numbers</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Examples:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>5! = 5 × 4 × 3 × 2 × 1 = 120</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>7! = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5,040</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>10! = 10 × 9 × ... × 2 × 1 = 3,628,800</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>0! = 1</strong> (special case)</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Real-World Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Combinatorics:</strong> Counting permutations and combinations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Probability:</strong> Calculating probabilities in complex scenarios</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Statistics:</strong> Arrangements and sampling methods</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Computer Science:</strong> Algorithm analysis and complexity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Mathematics:</strong> Taylor series and mathematical analysis</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Technical Notes:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span>Maximum input is 170 due to computational limits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span>Uses BigInt for precise large number calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span>Factorial growth is exponential (faster than exponential)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span>Results are displayed with proper formatting for large numbers</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}