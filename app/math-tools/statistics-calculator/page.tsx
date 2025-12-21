'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, RotateCcw, Copy, ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Calculator, PieChart, TrendingUp, Target, Percent, Triangle, Circle, Zap, Hash, Divide, } from 'lucide-react';
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
    q1: number;
    q3: number;
    iqr: number;
    outliers: number[];
  } | null>(null);
  const [openSections, setOpenSections] = useState({
    whatItDoes: false,
    useCases: false,
    howToUse: false,
    examples: false,
    faqs: false,
    relatedTools: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Related tools for Math Tools category
  const relatedTools = [
    { name: 'Advanced Calculator', path: '/math-tools/basic-calculator', icon: Calculator },
    { name: 'Prime Number Checker', path: '/math-tools/prime-checker', icon: CheckCircle },
    { name: 'Factorial Calculator', path: '/math-tools/factorial', icon: PieChart },
    { name: 'Quadratic Equation Solver', path: '/math-tools/quadratic-solver', icon: Target },
    { name: 'Percentage Calculator', path: '/math-tools/percentage-change', icon: Percent },
    { name: 'Multiplication Tables', path: '/math-tools/multiplication-table', icon: TrendingUp },
    { name: 'Triangle Area Calculator', path: '/math-tools/triangle-area', icon: Triangle },
    { name: 'Circle Area Calculator', path: '/math-tools/circle-calculator', icon: Circle },
    { name: 'Exponent & Log Calculator', path: '/math-tools/exponent-log', icon: Zap }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between mean, median, and mode?",
      answer: "Mean (average) is the sum of all values divided by count. Median is the middle value when data is sorted. Mode is the most frequently occurring value(s). Mean is sensitive to outliers, median is robust to outliers, and mode identifies the most common values. For symmetric data, all three are similar; for skewed data, they differ significantly."
    },
    {
      question: "When should I use standard deviation vs variance?",
      answer: "Variance measures average squared deviation from mean (in squared units). Standard deviation is the square root of variance (in original units). Use variance for mathematical calculations and standard deviation for practical interpretation. Standard deviation is more intuitive as it's in the same units as the data and represents typical deviation from the mean."
    },
    {
      question: "What does interquartile range (IQR) tell me about my data?",
      answer: "IQR measures the spread of the middle 50% of data (Q3 - Q1). It's robust to outliers and identifies data variability in the central portion. IQR is used to identify outliers (values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR) and is preferred over range for skewed distributions. A larger IQR indicates more variability in central data."
    },
    {
      question: "How accurate is this statistics calculator?",
      answer: "The calculator provides precision up to 4 decimal places for most calculations using JavaScript's double-precision floating-point arithmetic. For extremely large datasets or very small/large numbers, floating-point limitations may affect precision. However, for typical educational, business, and research applications, it provides accurate and reliable statistical analysis."
    },
    {
      question: "Can I calculate statistics for categorical data?",
      answer: "This calculator is designed for numerical data only. For categorical data, use mode for frequency analysis. Other measures like mean, median, and standard deviation don't apply to categorical data. Consider using frequency tables or percentage distributions for categorical analysis instead of numerical statistics."
    }
  ];

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

    // Quartiles and IQR
    const q1 = calculatePercentile(sortedNumbers, 25);
    const q3 = calculatePercentile(sortedNumbers, 75);
    const iqr = q3 - q1;
    
    // Outliers
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;
    const outliers = sortedNumbers.filter(n => n < lowerBound || n > upperBound);

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
      max,
      q1,
      q3,
      iqr,
      outliers
    });
  };

  const calculatePercentile = (sortedArray: number[], percentile: number): number => {
    const index = (percentile / 100) * (sortedArray.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    
    if (lower === upper) {
      return sortedArray[lower];
    }
    
    const weight = index - lower;
    return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight;
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
      <title>Statistics Calculator | Mean, Median, Mode, Standard Deviation | GrockTool.com</title>
      <meta name="description" content="Free online statistics calculator. Calculate mean, median, mode, standard deviation, variance, quartiles, and perform comprehensive statistical analysis on any dataset. Perfect for data analysis and research." />
      <meta name="keywords" content="statistics calculator, mean calculator, median calculator, mode calculator, standard deviation calculator, variance calculator, statistical analysis, data analysis, quartiles, descriptive statistics" />
      <meta property="og:title" content="Statistics Calculator | Mean, Median, Mode, Standard Deviation" />
      <meta property="og:description" content="Free online statistics calculator. Calculate mean, median, mode, standard deviation, variance, quartiles, and perform comprehensive statistical analysis." />
      <link rel="canonical" href="https://grocktool.com/math-tools/statistics-calculator" />
      
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-6xl">
          {/* Enhanced Header */}
          <div className="mb-8 sm:mb-12">
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                <BarChart3 size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Statistical Analysis • Data Science • Descriptive Statistics</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Statistics Calculator
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Calculate Mean • Median • Mode • Standard Deviation • Variance • Quartiles • Data Analysis
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <BarChart3 size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Mean & Median</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Standard Deviation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <PieChart size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Quartiles & IQR</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Target size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Data Analysis</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Calculator & Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Examples Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Quick Examples:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setNumbers('1, 2, 3, 4, 5')}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <BarChart3 size={12} />
                      Basic Set
                    </button>
                    <button
                      onClick={() => setNumbers('10, 20, 30, 40, 50')}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <CheckCircle size={12} />
                      Even Numbers
                    </button>
                    <button
                      onClick={() => setNumbers('2, 4, 4, 6, 8, 8, 8, 10')}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <PieChart size={12} />
                      With Mode
                    </button>
                    <button
                      onClick={() => setNumbers('100, 200, 300, 400, 500, 1000')}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Target size={12} />
                      With Outlier
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Main Tool Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Statistics Calculator
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <BarChart3 size={12} />
                      <span>Data analysis</span>
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Enter Your Dataset
                      </label>
                      <div className="relative">
                        <textarea
                          value={numbers}
                          onChange={(e) => setNumbers(e.target.value)}
                          placeholder="Enter numbers separated by commas, spaces, or new lines&#10;Example: 1, 2, 3, 4, 5&#10;or: 1 2 3 4 5&#10;or: 1&#10;2&#10;3&#10;4&#10;5"
                          className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground min-h-[140px] resize-vertical text-sm"
                          rows={6}
                        />
                        <div className="absolute left-3 top-3">
                          <Hash size={16} className="text-muted-foreground" />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Separate numbers with commas, spaces, or new lines. Supports decimal numbers and negative values.
                      </p>
                    </div>

                    {/* Sample Data Tips */}
                    <div className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                      <div className="text-xs font-medium text-foreground mb-1">Sample Datasets:</div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>• Normal distribution: 68, 70, 72, 72, 75, 78, 80</div>
                        <div>• Skewed right: 10, 15, 20, 25, 30, 100</div>
                        <div>• Bimodal: 5, 5, 10, 10, 15, 15, 20, 20</div>
                        <div>• With outliers: 50, 52, 53, 54, 55, 200</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={calculateStatistics}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <BarChart3 size={16} className="sm:w-4 sm:h-4" />
                      Calculate Statistics
                    </button>
                    <button
                      onClick={reset}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base font-medium"
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
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
                >
                  <div className="space-y-6">
                    {/* Basic Statistics */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-3 rounded-lg border border-blue-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Count (n)</div>
                        <div className="text-lg font-bold text-foreground">{result.count}</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-3 rounded-lg border border-green-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Sum (Σ)</div>
                        <div className="text-lg font-bold text-foreground">{result.sum.toFixed(2)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 p-3 rounded-lg border border-purple-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Mean (μ)</div>
                        <div className="text-lg font-bold text-foreground">{result.mean.toFixed(4)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 p-3 rounded-lg border border-indigo-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Median</div>
                        <div className="text-lg font-bold text-foreground">{result.median.toFixed(4)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-pink-500/10 to-pink-600/10 p-3 rounded-lg border border-pink-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Mode</div>
                        <div className="text-sm font-bold text-foreground">
                          {result.mode.length === result.count ? 'No mode' : result.mode.join(', ')}
                        </div>
                      </div>
                    </div>

                    {/* Dispersion Statistics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 p-3 rounded-lg border border-orange-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Range</div>
                        <div className="text-lg font-bold text-foreground">{result.range.toFixed(4)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 p-3 rounded-lg border border-red-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Variance (σ²)</div>
                        <div className="text-sm font-bold text-foreground">{result.variance.toFixed(4)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 p-3 rounded-lg border border-amber-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Std Dev (σ)</div>
                        <div className="text-sm font-bold text-foreground">{result.standardDeviation.toFixed(4)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 p-3 rounded-lg border border-emerald-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">IQR</div>
                        <div className="text-sm font-bold text-foreground">{result.iqr.toFixed(4)}</div>
                      </div>
                    </div>

                    {/* Quartiles and Outliers */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      <div className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 p-3 rounded-lg border border-cyan-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Minimum</div>
                        <div className="font-semibold text-foreground">{result.min.toFixed(4)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-3 rounded-lg border border-blue-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Q1 (25%)</div>
                        <div className="font-semibold text-foreground">{result.q1.toFixed(4)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-3 rounded-lg border border-green-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Median</div>
                        <div className="font-semibold text-foreground">{result.median.toFixed(4)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 p-3 rounded-lg border border-purple-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Q3 (75%)</div>
                        <div className="font-semibold text-foreground">{result.q3.toFixed(4)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 p-3 rounded-lg border border-red-500/20 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Maximum</div>
                        <div className="font-semibold text-foreground">{result.max.toFixed(4)}</div>
                      </div>
                    </div>

                    {/* Outliers Analysis */}
                    {result.outliers.length > 0 && (
                      <div className="p-4 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-lg border border-red-500/20">
                        <h4 className="text-sm font-medium text-foreground mb-2">Outliers Detection:</h4>
                        <div className="text-sm text-muted-foreground">
                          <div className="mb-1">Detected {result.outliers.length} outlier(s) using 1.5×IQR rule:</div>
                          <div className="font-mono text-xs bg-card/50 p-2 rounded border border-border/50">
                            {result.outliers.join(', ')}
                          </div>
                          <div className="mt-1 text-xs">
                            Lower bound: {(result.q1 - 1.5 * result.iqr).toFixed(4)}, Upper bound: {(result.q3 + 1.5 * result.iqr).toFixed(4)}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Data Summary */}
                    <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 p-4 rounded-lg border border-border">
                      <div className="text-sm font-medium text-foreground mb-2">Statistical Summary:</div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>• Dataset contains {result.count} observations with mean = {result.mean.toFixed(4)}</div>
                        <div>• Data ranges from {result.min.toFixed(4)} to {result.max.toFixed(4)} (range = {result.range.toFixed(4)})</div>
                        <div>• Central tendency: Median = {result.median.toFixed(4)}, Mode = {result.mode.length === result.count ? 'none' : result.mode.join(', ')}</div>
                        <div>• Dispersion: Standard deviation = {result.standardDeviation.toFixed(4)}, IQR = {result.iqr.toFixed(4)}</div>
                        {result.outliers.length > 0 && (
                          <div>• Outliers detected: {result.outliers.length} value(s) outside 1.5×IQR range</div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Statistical Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 size={18} className="text-blue-600" />
                  Statistics Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Central Tendency */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <BarChart3 size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Measures of Central Tendency</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Mean:</strong> Average value, sensitive to outliers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Median:</strong> Middle value, robust to outliers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Mode:</strong> Most frequent value(s), for categorical data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Relationship:</strong> Mean - Mode ≈ 3(Mean - Median) for skewed data</span>
                      </div>
                    </div>
                  </div>

                  {/* Dispersion */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <CheckCircle size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Measures of Dispersion</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Range:</strong> Maximum - Minimum, sensitive to outliers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Variance:</strong> Average squared deviation from mean</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Standard Deviation:</strong> Square root of variance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>IQR:</strong> Q3 - Q1, robust to outliers</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Statistical Distributions</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Normal Distribution</span>
                      <span className="font-mono">Mean = Median = Mode</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Right Skewed</span>
                      <span className="font-mono">Mean {">"} Median {">"} Mode</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Left Skewed</span>
                      <span className="font-mono">Mean {"<"} Median {"<"} Mode </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Bimodal</span>
                      <span className="font-mono">Two distinct modes</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Info Section */}
            <div className="lg:col-span-1">
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
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Mean (Average):</strong> Sum of all values divided by count</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Median:</strong> Middle value when data is sorted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Mode:</strong> Most frequently occurring value(s)</span>
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
                      <span><strong>IQR:</strong> Interquartile range (Q3 - Q1)</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Quartiles:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Q1 (25th percentile):</strong> 25% of data is below this value</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Q2 (Median):</strong> 50% of data is below this value</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Q3 (75th percentile):</strong> 75% of data is below this value</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Outlier Detection:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span><strong>1.5×IQR Rule:</strong> Values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span><strong>Z-score Method:</strong> Values with |z-score| {">"} 3 (not implemented here)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section with Dropdowns */}
          <section className="space-y-4 mt-12">
            {/* What This Tool Does - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('whatItDoes')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <BarChart3 size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Statistics Calculator - Features & Data Analysis</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Statistics Calculator provides comprehensive data analysis capabilities for any numerical dataset. The tool calculates all essential descriptive statistics including measures of central tendency (mean, median, mode), measures of dispersion (range, variance, standard deviation), quartiles (Q1, Q3, IQR), and outlier detection. It automatically identifies statistical patterns, detects outliers using the 1.5×IQR rule, and provides detailed summaries of data distribution characteristics. Perfect for students learning statistics, researchers analyzing experimental data, business professionals examining performance metrics, or anyone needing to understand patterns in numerical data. The calculator handles datasets of any size and provides precision up to 4 decimal places for accurate statistical analysis.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Central Tendency</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Calculate mean (average), median (middle value), and mode (most frequent values) to understand the center of your data distribution. Compare these measures to identify data skewness and distribution patterns.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Dispersion Analysis</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Measure data spread with range, variance, standard deviation, and interquartile range (IQR). Understand data variability, identify outliers, and assess data consistency across different measures of dispersion.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <PieChart size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Quartile Calculations</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Calculate quartiles (Q1, Q3), interquartile range, and detect outliers using statistical methods. Quartiles provide insights into data distribution and help identify extreme values that may need special attention.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Data Analysis</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Receive comprehensive statistical summaries, outlier detection, and distribution analysis. The tool automatically identifies data patterns and provides actionable insights for data interpretation and decision-making.</p>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Use Cases Section - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('useCases')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <BarChart3 size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Statistical Analysis Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Academic & Research Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Scientific Research:</strong> Analyze experimental results, calculate mean and standard deviation for repeated measurements, and determine statistical significance of findings in laboratory studies</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Psychology Studies:</strong> Calculate descriptive statistics for survey responses, analyze test score distributions, and identify response patterns in behavioral research</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Educational Assessment:</strong> Analyze student test scores, calculate class averages and standard deviations, identify performance outliers, and track academic progress over time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Medical Research:</strong> Calculate clinical trial results, analyze patient response data, determine treatment effectiveness statistics, and identify unusual cases in medical studies</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💼 Business & Finance Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Sales Analysis:</strong> Calculate average sales figures, analyze sales variance across regions, identify top-performing products, and detect unusual sales patterns for inventory management</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Financial Analytics:</strong> Analyze investment returns, calculate portfolio risk metrics (standard deviation), identify outlier transactions, and perform financial ratio analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Quality Control:</strong> Monitor manufacturing processes using statistical process control, calculate product dimension averages and tolerances, and identify production outliers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Market Research:</strong> Analyze consumer survey data, calculate response averages and variability, identify market segment characteristics, and interpret customer satisfaction metrics</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📈 Data Science & Technology</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Data Preprocessing:</strong> Calculate descriptive statistics to understand data distribution before machine learning, identify outliers for removal, and normalize data for analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Performance Monitoring:</strong> Analyze system performance metrics, calculate average response times and variability, identify performance bottlenecks, and monitor service level agreements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>A/B Testing:</strong> Calculate statistical measures for control and test groups, analyze conversion rate differences, determine statistical significance, and make data-driven decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Web Analytics:</strong> Analyze website traffic patterns, calculate average session duration and bounce rates, identify peak traffic times, and understand user behavior statistics</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* How to Use - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('howToUse')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <BarChart3 size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Statistics Calculator - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Step-by-Step Instructions</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Your Dataset</div>
                            <div className="text-sm text-muted-foreground">Input numbers separated by commas, spaces, or new lines. Include decimal numbers, negative values, and any numerical data you want to analyze.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Calculate Statistics</div>
                            <div className="text-sm text-muted-foreground">Click "Calculate Statistics" to perform comprehensive statistical analysis including mean, median, mode, standard deviation, and quartiles.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Review Results</div>
                            <div className="text-sm text-muted-foreground">Examine all statistical measures, outlier detection, and data summary. Compare different measures to understand your data distribution.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Analyze & Interpret</div>
                            <div className="text-sm text-muted-foreground">Use the statistical summary to draw conclusions about your data. Identify patterns, outliers, and characteristics of your dataset.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Statistical Analysis Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <BarChart3 size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Check Data Distribution:</strong> Compare mean, median, and mode to identify skewness. If mean {">"} median {">"} mode, data is right-skewed.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <CheckCircle size={12} className="text-green-500" />
                          </div>
                          <span><strong>Understand Variability:</strong> Use standard deviation with mean for normal distributions, IQR with median for skewed data with outliers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <PieChart size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Identify Outliers:</strong> Check the outlier section and consider their impact on your analysis. Decide whether to exclude or investigate them</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Use Appropriate Measures:</strong> For symmetric data, use mean and standard deviation. For skewed data, use median and IQR</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-red-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-red-500" />
                          </div>
                          <span><strong>Document Results:</strong> Use the copy function to save statistical summaries for reports, presentations, or further analysis</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Example Input and Output Section */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('examples')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <BarChart3 size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Statistical Analysis Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Statistical Analysis Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Dataset</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Mean</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Median</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Mode</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Std Dev</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Distribution</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">1, 2, 3, 4, 5</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">3.0000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">3.0000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">-</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1.4142</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Uniform</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">2, 4, 4, 6, 8, 8, 8</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5.7143</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">6.0000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">8</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2.2887</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Left Skewed</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">10, 20, 30, 40, 100</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">40.0000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">30.0000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">-</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">35.3553</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Right Skewed</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">68, 70, 72, 72, 75, 78, 80</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">73.5714</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">72.0000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">72</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">4.4298</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Normal</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">5, 5, 10, 10, 15, 15, 20, 20</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">12.5000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">12.5000</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5, 10, 15, 20</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5.5902</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Bimodal</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Student Test Scores Analysis</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Comprehensive statistical analysis of student test scores

Dataset: 25 student test scores (out of 100)
Scores: 78, 82, 85, 88, 90, 92, 92, 94, 95, 95, 96, 96, 97, 97, 97, 98, 98, 99, 99, 100, 65, 70, 72, 75, 76

Step 1: Input Data
Enter the scores in the calculator:
78, 82, 85, 88, 90, 92, 92, 94, 95, 95, 96, 96, 97, 97, 97, 98, 98, 99, 99, 100, 65, 70, 72, 75, 76

Step 2: Calculate Statistics
Click "Calculate Statistics"

Step 3: Basic Statistics Results
• Count (n): 25 students
• Sum: 2286 points
• Mean (Average): 2286 ÷ 25 = 91.44
• Minimum: 65
• Maximum: 100
• Range: 100 - 65 = 35

Step 4: Central Tendency Analysis
• Median (Middle Value): Sort scores and find middle
  Sorted: 65, 70, 72, 75, 76, 78, 82, 85, 88, 90, 92, 92, 94, 95, 95, 96, 96, 97, 97, 97, 98, 98, 99, 99, 100
  Middle position: (25 + 1) ÷ 2 = 13th value
  Median = 94
• Mode (Most Frequent): Count frequencies:
  97 appears 3 times (most frequent)
  Mode = 97

Interpretation:
Mean (91.44) < Median (94) < Mode (97)
This indicates left-skewed distribution (more high scores)

Step 5: Dispersion Analysis
• Variance Calculation:
  Sum of squared differences from mean:
  (78-91.44)² + (82-91.44)² + ... + (76-91.44)² = 3495.84
  Variance = 3495.84 ÷ 25 = 139.8336
• Standard Deviation: √139.8336 = 11.8247

Interpretation:
Standard deviation of 11.82 means scores typically vary by about 12 points from the average.

Step 6: Quartile Analysis
• Sort data (already sorted above)
• Q1 (25th percentile): Position = 0.25 × (25+1) = 6.5
  Average of 6th and 7th values: (82 + 85) ÷ 2 = 83.5
• Q3 (75th percentile): Position = 0.75 × (25+1) = 19.5
  Average of 19th and 20th values: (97 + 98) ÷ 2 = 97.5
• IQR = Q3 - Q1 = 97.5 - 83.5 = 14

Step 7: Outlier Detection
• Lower Bound = Q1 - 1.5×IQR = 83.5 - 1.5×14 = 83.5 - 21 = 62.5
• Upper Bound = Q3 + 1.5×IQR = 97.5 + 1.5×14 = 97.5 + 21 = 118.5
• Any score < 62.5 or > 118.5 is an outlier
• Detected outliers: None (all scores between 65-100)

Step 8: Distribution Analysis
• Mean (91.44) < Median (94) → Left skewed
• Standard deviation (11.82) indicates moderate spread
• IQR (14) shows middle 50% of scores range from 83.5 to 97.5
• No outliers detected

Step 9: Grade Distribution Insights
Using standard grading scale (A: 90-100, B: 80-89, etc.):
• A grades: 19 students (76%)
• B grades: 4 students (16%)
• C grades: 2 students (8%)
• D/F grades: 0 students

Step 10: Performance Assessment
• Class average: 91.44 (solid A- average)
• Median score: 94 (half of students scored 94 or above)
• Most common score: 97 (appeared 3 times)
• Score spread: 65 to 100 (35-point range)
• Middle 50%: 83.5 to 97.5 (14-point IQR)

Step 11: Educational Insights
• The class performed well overall (76% A grades)
• Distribution is left-skewed (more high scores)
• No statistical outliers, but lowest score (65) deserves attention
• Consider if test was too easy or students are high-performing
• For future tests, could increase difficulty to better differentiate top students

Step 12: Statistical Summary for Report
Test Score Analysis - Statistics 101 Class (n=25)
• Mean: 91.44 ± 11.82 (mean ± standard deviation)
• Median: 94.00
• Mode: 97
• Range: 35 (65-100)
• IQR: 14 (83.5-97.5)
• Distribution: Left-skewed (mean < median < mode)
• Outliers: None detected
• Grade Distribution: A: 76%, B: 16%, C: 8%

Conclusion:
The class demonstrated strong performance with most students achieving A grades. The left-skewed distribution suggests the test may have been relatively easy for this group, or students were well-prepared. Consider adjusting future assessments to better differentiate performance levels while maintaining the overall positive learning outcomes.`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Frequently Asked Questions (FAQs) */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('faqs')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <BarChart3 size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
                </div>
                {openSections.faqs ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.faqs && (
                <div className="px-6 pb-6">
                  <div className="space-y-6">
                    {faqData.map((faq, index) => (
                      <div key={index} className="pb-4 border-b border-border/50 last:border-0">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Related Tools Section */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('relatedTools')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <h2 className="text-xl font-bold text-foreground">More Math Tools</h2>
                {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.relatedTools && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Explore other useful mathematical calculation tools from our Math Tools category:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedTools.map((tool, index) => {
                      const Icon = tool.icon;
                      return (
                        <Link
                          key={index}
                          href={tool.path}
                          className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg border border-border hover:bg-secondary/50 transition-colors group"
                        >
                          <div className="bg-accent/10 p-2 rounded-lg group-hover:bg-accent/20 transition-colors">
                            <Icon size={18} className="text-accent" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground group-hover:text-accent transition-colors">{tool.name}</div>
                            <div className="text-xs text-muted-foreground">Visit tool →</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          </section>
        </div>
      </div>
    </div>
  );
}