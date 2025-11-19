'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ExponentLog() {
  const [operation, setOperation] = useState('power');
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [number, setNumber] = useState('');
  const [logBase, setLogBase] = useState('10');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (operation === 'power') {
      const b = parseFloat(base);
      const e = parseFloat(exponent);
      if (isNaN(b) || isNaN(e)) {
        setResult(null);
        return;
      }
      setResult(Math.pow(b, e));
    } else if (operation === 'logarithm') {
      const n = parseFloat(number);
      const lb = parseFloat(logBase);
      if (isNaN(n) || isNaN(lb) || n <= 0 || lb <= 0 || lb === 1) {
        setResult(null);
        return;
      }
      
      if (lb === 10) {
        setResult(Math.log10(n));
      } else if (lb === Math.E) {
        setResult(Math.log(n));
      } else {
        setResult(Math.log(n) / Math.log(lb));
      }
    } else if (operation === 'natural-log') {
      const n = parseFloat(number);
      if (isNaN(n) || n <= 0) {
        setResult(null);
        return;
      }
      setResult(Math.log(n));
    } else if (operation === 'square-root') {
      const n = parseFloat(number);
      if (isNaN(n) || n < 0) {
        setResult(null);
        return;
      }
      setResult(Math.sqrt(n));
    }
  };

  const reset = () => {
    setBase('');
    setExponent('');
    setNumber('');
    setLogBase('10');
    setResult(null);
  };

  const copyResult = async () => {
    if (result !== null) {
      try {
        await navigator.clipboard.writeText(result.toString());
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const getOperationDescription = () => {
    switch (operation) {
      case 'power':
        return 'Calculate exponential power (a^b)';
      case 'logarithm':
        return 'Calculate logarithm with custom base';
      case 'natural-log':
        return 'Calculate natural logarithm (base e)';
      case 'square-root':
        return 'Calculate square root (√n)';
      default:
        return '';
    }
  };

  const getFormula = () => {
    switch (operation) {
      case 'power':
        return base && exponent ? `${base}^${exponent} = ${result?.toFixed(8)}` : '';
      case 'logarithm':
        return number && logBase ? `log_${logBase}(${number}) = ${result?.toFixed(8)}` : '';
      case 'natural-log':
        return number ? `ln(${number}) = ${result?.toFixed(8)}` : '';
      case 'square-root':
        return number ? `√${number} = ${result?.toFixed(8)}` : '';
      default:
        return '';
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
                Exponent & Logarithm Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate powers, logarithms, natural logs, and square roots
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
              {/* Operation Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Select Operation
                  </label>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setOperation('power')}
                    className={`p-3 rounded-lg border transition-all ${
                      operation === 'power' 
                        ? 'bg-accent text-accent-foreground border-accent' 
                        : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                    }`}
                  >
                    <div className="text-sm font-medium">Power (a^b)</div>
                  </button>
                  <button
                    onClick={() => setOperation('logarithm')}
                    className={`p-3 rounded-lg border transition-all ${
                      operation === 'logarithm' 
                        ? 'bg-accent text-accent-foreground border-accent' 
                        : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                    }`}
                  >
                    <div className="text-sm font-medium">Logarithm</div>
                  </button>
                  <button
                    onClick={() => setOperation('natural-log')}
                    className={`p-3 rounded-lg border transition-all ${
                      operation === 'natural-log' 
                        ? 'bg-accent text-accent-foreground border-accent' 
                        : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                    }`}
                  >
                    <div className="text-sm font-medium">Natural Log</div>
                  </button>
                  <button
                    onClick={() => setOperation('square-root')}
                    className={`p-3 rounded-lg border transition-all ${
                      operation === 'square-root' 
                        ? 'bg-accent text-accent-foreground border-accent' 
                        : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                    }`}
                  >
                    <div className="text-sm font-medium">Square Root</div>
                  </button>
                </div>
              </div>

              {/* Operation Description */}
              <div className="bg-muted p-3 rounded-lg">
                <div className="text-sm text-foreground font-medium">
                  {getOperationDescription()}
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                {operation === 'power' && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Base (a)
                      </label>
                      <input
                        type="number"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="e.g., 2"
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Exponent (b)
                      </label>
                      <input
                        type="number"
                        value={exponent}
                        onChange={(e) => setExponent(e.target.value)}
                        placeholder="e.g., 3"
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                      />
                    </div>
                  </div>
                )}

                {operation === 'logarithm' && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Number (n)
                      </label>
                      <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="e.g., 100"
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Logarithm Base
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {['10', '2.718281828459045', '2'].map((baseValue) => (
                          <button
                            key={baseValue}
                            onClick={() => setLogBase(baseValue)}
                            className={`p-2 rounded-lg border transition-all text-sm ${
                              logBase === baseValue
                                ? 'bg-accent text-accent-foreground border-accent'
                                : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                            }`}
                          >
                            {baseValue === '10' ? '10' : baseValue === '2.718281828459045' ? 'e' : '2'}
                          </button>
                        ))}
                        <input
                          type="number"
                          value={logBase === '10' || logBase === '2.718281828459045' || logBase === '2' ? '' : logBase}
                          onChange={(e) => setLogBase(e.target.value)}
                          placeholder="Custom"
                          className="p-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-sm"
                          step="any"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(operation === 'natural-log' || operation === 'square-root') && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Number (n)
                    </label>
                    <input
                      type="number"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      placeholder={operation === 'square-root' ? 'e.g., 16' : 'e.g., 2.718'}
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculate}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Zap size={16} className="sm:w-4 sm:h-4" />
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
          </motion.div>

          {/* Results Card */}
          {result !== null && (
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
                {/* Main Result */}
                <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Result</div>
                  <div className="text-2xl font-bold text-foreground font-mono">
                    {result.toFixed(8)}
                  </div>
                </div>

                {/* Formula Display */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Formula:</div>
                  <div className="text-sm font-mono text-foreground">
                    {getFormula()}
                  </div>
                </div>

                {/* Operation Info */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Operation</div>
                    <div className="font-semibold text-foreground capitalize">
                      {operation.replace('-', ' ')}
                    </div>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Precision</div>
                    <div className="font-semibold text-foreground">8 decimals</div>
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Exponential & Logarithmic Calculations Work</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Exponential and logarithmic functions are fundamental mathematical operations that are 
                inverses of each other, widely used in science, engineering, and finance.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Select the mathematical operation you want to perform</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter the required values in the input fields</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate" to compute the result</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View the precise result with formula display</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the result for use in other applications</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Power (Exponentiation):</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Formula:</strong> a^b = a × a × ... (b times)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Example:</strong> 2^3 = 2 × 2 × 2 = 8</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Used for exponential growth, compound interest, and scientific notation</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Logarithm:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Formula:</strong> log_b(n) = x means b^x = n</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Common Bases:</strong> 10 (common log), e (natural log), 2 (binary log)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Example:</strong> log_10(100) = 2 because 10^2 = 100</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Natural Logarithm:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Formula:</strong> ln(n) = log_e(n)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Base e:</strong> Approximately 2.718281828459045</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Example:</strong> ln(7.389) ≈ 2 because e^2 ≈ 7.389</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Square Root:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Formula:</strong> √n = x means x^2 = n</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Example:</strong> √16 = 4 because 4^2 = 16</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Special case of exponentiation: √n = n^(1/2)</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Real-World Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span><strong>Finance:</strong> Compound interest, investment growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span><strong>Science:</strong> pH scale, radioactive decay, sound intensity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span><strong>Engineering:</strong> Signal processing, control systems</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span><strong>Computer Science:</strong> Algorithm complexity, data compression</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Mathematical Properties:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  <span>Exponents and logarithms are inverse operations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  <span>log_b(1) = 0 for any base b</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  <span>log_b(b) = 1 for any base b</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  <span>a^0 = 1 for any a ≠ 0</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}