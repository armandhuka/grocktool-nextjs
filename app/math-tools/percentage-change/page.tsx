'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PercentageChange() {
  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    changeType: 'increase' | 'decrease' | 'no change';
  } | null>(null);

  const calculatePercentageChange = () => {
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);

    if (isNaN(original) || isNaN(newVal)) {
      setResult(null);
      return;
    }

    if (original === 0) {
      setResult({
        percentageChange: newVal === 0 ? 0 : Infinity,
        absoluteChange: newVal,
        changeType: newVal === 0 ? 'no change' : 'increase'
      });
      return;
    }

    const absoluteChange = newVal - original;
    const percentageChange = (absoluteChange / original) * 100;
    
    let changeType: 'increase' | 'decrease' | 'no change';
    if (absoluteChange > 0) {
      changeType = 'increase';
    } else if (absoluteChange < 0) {
      changeType = 'decrease';
    } else {
      changeType = 'no change';
    }

    setResult({
      percentageChange: Math.abs(percentageChange),
      absoluteChange: Math.abs(absoluteChange),
      changeType
    });
  };

  const reset = () => {
    setOriginalValue('');
    setNewValue('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `${result.changeType === 'increase' ? '+' : result.changeType === 'decrease' ? '-' : ''}${result.percentageChange === Infinity ? '∞' : result.percentageChange.toFixed(2)}%`;
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
                Percentage Change Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate percentage increase or decrease between two values
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
                <div className="flex items-center gap-2">
                  <TrendingUp size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Enter Values
                  </label>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Original Value
                    </label>
                    <input
                      type="number"
                      value={originalValue}
                      onChange={(e) => setOriginalValue(e.target.value)}
                      placeholder="e.g., 100"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      New Value
                    </label>
                    <input
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="e.g., 120"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculatePercentageChange}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <TrendingUp size={16} className="sm:w-4 sm:h-4" />
                  Calculate Change
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
                <h3 className="text-lg font-semibold text-foreground">Change Analysis</h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Main Change Display */}
                <div className={`p-4 rounded-lg border ${
                  result.changeType === 'increase' 
                    ? 'bg-green-500/10 border-green-500/20' 
                    : result.changeType === 'decrease' 
                    ? 'bg-red-500/10 border-red-500/20'
                    : 'bg-gray-500/10 border-gray-500/20'
                }`}>
                  <div className="flex items-center gap-3">
                    {result.changeType === 'increase' ? (
                      <TrendingUp size={24} className="text-green-600" />
                    ) : result.changeType === 'decrease' ? (
                      <TrendingDown size={24} className="text-red-600" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-400" />
                    )}
                    <div>
                      <div className="text-2xl font-bold text-foreground">
                        {result.changeType === 'increase' ? '+' : result.changeType === 'decrease' ? '-' : ''}
                        {result.percentageChange === Infinity ? '∞' : result.percentageChange.toFixed(2)}%
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {result.changeType === 'no change' ? 'No Change' : `Percentage ${result.changeType}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Absolute Change</div>
                    <div className="font-semibold text-foreground">
                      {result.absoluteChange}
                    </div>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Change Direction</div>
                    <div className="font-semibold text-foreground capitalize">
                      {result.changeType === 'no change' ? 'No Change' : result.changeType}
                    </div>
                  </div>
                </div>

                {/* Formula Display */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Formula Used:</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Percentage Change = ((New - Original) / Original) × 100</div>
                    {originalValue && newValue && (
                      <div className="text-xs mt-2">
                        Calculation: (({newValue} - {originalValue}) / {originalValue}) × 100 = {result.percentageChange === Infinity ? '∞' : result.percentageChange.toFixed(2)}%
                      </div>
                    )}
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Percentage Change Works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Percentage change measures the relative difference between two values, showing how much 
                a quantity has increased or decreased in percentage terms relative to its original value.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter the original (starting) value</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter the new (ending) value</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Change" to see the percentage difference</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View both percentage and absolute changes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the result for reporting or analysis</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Percentage Change Formula:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>% Change = [(New - Original) / Original] × 100</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Positive result = Increase</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Negative result = Decrease</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Zero result = No change</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Examples:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>100 → 120:</strong> +20% increase</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  <span><strong>100 → 80:</strong> -20% decrease</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>50 → 75:</strong> +50% increase</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                  <span><strong>200 → 150:</strong> -25% decrease</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Real-World Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Finance:</strong> Stock price changes, investment returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Business:</strong> Sales growth, revenue changes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Economics:</strong> Inflation rates, GDP growth</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Education:</strong> Grade improvements, test score changes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Science:</strong> Experimental results, measurement changes</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Important Notes:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Percentage change is relative to the original value</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Same absolute change gives different percentages for different bases</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Useful for comparing changes across different scales</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span>Shows proportional rather than absolute differences</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}