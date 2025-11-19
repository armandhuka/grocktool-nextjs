'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StatisticsCalculator() {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState<{
    count: number;
    sum: number;
    mean: number;
    median: number;
    mode: number[];
    range: number;
    standardDeviation: number;
    variance: number;
    min: number;
    max: number;
  } | null>(null);

  const calculateStatistics = () => {
    const numberArray = numbers
      .split(/[,\s\n]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numberArray.length === 0) {
      setResult(null);
      return;
    }

    // Basic calculations
    const count = numberArray.length;
    const sum = numberArray.reduce((acc, n) => acc + n, 0);
    const mean = sum / count;

    // Median
    const sortedNumbers = [...numberArray].sort((a, b) => a - b);
    const median = count % 2 === 0
      ? (sortedNumbers[count / 2 - 1] + sortedNumbers[count / 2]) / 2
      : sortedNumbers[Math.floor(count / 2)];

    // Mode
    const frequency: { [key: number]: number } = {};
    numberArray.forEach(n => {
      frequency[n] = (frequency[n] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency)
      .filter(key => frequency[parseFloat(key)] === maxFreq)
      .map(key => parseFloat(key));

    // Range and Min/Max
    const min = Math.min(...numberArray);
    const max = Math.max(...numberArray);
    const range = max - min;

    // Variance and Standard Deviation
    const variance = numberArray.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / count;
    const standardDeviation = Math.sqrt(variance);

    setResult({
      count,
      sum,
      mean,
      median,
      mode,
      range,
      standardDeviation,
      variance,
      min,
      max
    });
  };

  const reset = () => {
    setNumbers('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `Count: ${result.count}, Mean: ${result.mean.toFixed(4)}, Median: ${result.median}, Mode: ${result.mode.join(', ')}, Std Dev: ${result.standardDeviation.toFixed(4)}`;
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
                Statistics Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate mean, median, mode, standard deviation, and more
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
                  <BarChart3 size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Enter Numbers
                  </label>
                </div>
                
                <textarea
                  value={numbers}
                  onChange={(e) => setNumbers(e.target.value)}
                  placeholder="Enter numbers separated by commas, spaces, or new lines&#10;Example: 1, 2, 3, 4, 5&#10;or: 1 2 3 4 5&#10;or: 1&#10;2&#10;3&#10;4&#10;5"
                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground min-h-[120px] resize-vertical text-sm"
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">
                  Separate numbers with commas, spaces, or new lines
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateStatistics}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <BarChart3 size={16} className="sm:w-4 sm:h-4" />
                  Calculate Statistics
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
                <h3 className="text-lg font-semibold text-foreground">Statistical Analysis</h3>
                <button
                  onClick={copyResult}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Copy size={16} className="sm:w-4 sm:h-4" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-accent/10 p-3 rounded-lg border border-accent/20 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Count</div>
                    <div className="text-lg font-bold text-foreground">{result.count}</div>
                  </div>
                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Sum</div>
                    <div className="text-lg font-bold text-foreground">{result.sum}</div>
                  </div>
                  <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Mean</div>
                    <div className="text-lg font-bold text-foreground">{result.mean.toFixed(4)}</div>
                  </div>
                  <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Median</div>
                    <div className="text-lg font-bold text-foreground">{result.median}</div>
                  </div>
                </div>

                {/* Advanced Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Mode</div>
                    <div className="text-sm font-bold text-foreground">
                      {result.mode.length === result.count ? 'No mode' : result.mode.join(', ')}
                    </div>
                  </div>
                  <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Range</div>
                    <div className="text-lg font-bold text-foreground">{result.range}</div>
                  </div>
                  <div className="bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Std Dev</div>
                    <div className="text-sm font-bold text-foreground">{result.standardDeviation.toFixed(4)}</div>
                  </div>
                  <div className="bg-pink-500/10 p-3 rounded-lg border border-pink-500/20 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Variance</div>
                    <div className="text-sm font-bold text-foreground">{result.variance.toFixed(4)}</div>
                  </div>
                </div>

                {/* Data Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/20 p-3 rounded-lg border border-border text-center">
                    <div className="text-xs text-muted-foreground mb-1">Minimum</div>
                    <div className="font-semibold text-foreground">{result.min}</div>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-lg border border-border text-center">
                    <div className="text-xs text-muted-foreground mb-1">Maximum</div>
                    <div className="font-semibold text-foreground">{result.max}</div>
                  </div>
                </div>

                {/* Data Summary */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Data Summary:</div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Dataset contains {result.count} numbers</div>
                    <div>• Values range from {result.min} to {result.max}</div>
                    <div>• Average value is {result.mean.toFixed(4)}</div>
                    <div>• Middle value is {result.median}</div>
                    {result.mode.length !== result.count && (
                      <div>• Most frequent value(s): {result.mode.join(', ')}</div>
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Statistical Calculations Work</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Statistical analysis helps understand data distribution and characteristics through 
                various measures of central tendency, dispersion, and frequency.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter your dataset separated by commas, spaces, or new lines</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Statistics" to analyze the data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View comprehensive statistical measures and data summary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy the statistical summary for reporting or analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Understand your data distribution and characteristics</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Measures of Central Tendency:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Mean (Average):</strong> Sum of all values divided by count</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Median:</strong> Middle value when data is sorted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Mode:</strong> Most frequently occurring value(s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Each measure provides different insights into data center</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Measures of Dispersion:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Range:</strong> Difference between maximum and minimum values</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Variance:</strong> Average of squared differences from mean</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Standard Deviation:</strong> Square root of variance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>These measure how spread out the data is</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Examples:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Normal Distribution:</strong> Mean ≈ Median ≈ Mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Skewed Right:</strong> Mean &gt; Median &gt; Mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Skewed Left:</strong> Mean &lt; Median &lt; Mode</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Bimodal:</strong> Two distinct modes in the data</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Real-World Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Business:</strong> Sales analysis, customer behavior, quality control</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Science:</strong> Experimental results, measurement analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Education:</strong> Test scores, student performance analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Finance:</strong> Investment returns, risk assessment</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Statistical Insights:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Mean is sensitive to outliers in the data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Median is robust to outliers and skewed distributions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Mode identifies the most common values in the dataset</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Standard deviation indicates data variability around the mean</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}