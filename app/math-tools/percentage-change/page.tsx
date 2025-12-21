'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RotateCcw, Copy, ArrowLeft, Calculator, Hash, PieChart, Grid, Zap, Target, Triangle, Circle, BarChart, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PercentageChange() {
  const [originalValue, setOriginalValue] = useState('');
  const [newValue, setNewValue] = useState('');
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    changeType: 'increase' | 'decrease' | 'no change';
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

  const relatedTools = [
    { name: 'Advanced Calculator', path: '/math-tools/basic-calculator', icon: Calculator },
    { name: 'Prime Number Checker', path: '/math-tools/prime-checker', icon: PieChart },
    { name: 'Factorial Calculator', path: '/math-tools/factorial', icon: Hash },
    { name: 'Multiplication Tables', path: '/math-tools/multiplication-table', icon: Grid },
    { name: 'Quadratic Equation Solver', path: '/math-tools/quadratic-solver', icon: Zap },
    { name: 'Triangle Area Calculator', path: '/math-tools/triangle-area', icon: Triangle },
    { name: 'Circle Area Calculator', path: '/math-tools/circle-calculator', icon: Circle },
    { name: 'Logarithm Calculator', path: '/math-tools/exponent-log', icon: BarChart }
  ];

  const faqData = [
    {
      question: "What's the difference between percentage change and percentage point change?",
      answer: "Percentage change measures relative growth/decline from an original value (e.g., 50% to 75% is a 50% increase). Percentage point change measures absolute difference between percentages (e.g., 50% to 75% is a 25 percentage point increase). Percentage change is relative to the original value, while percentage points measure the raw difference between two percentages."
    },
    {
      question: "How do I calculate reverse percentage change?",
      answer: "To find the original value given a percentage change and new value: Original = New Value / (1 + Percentage Change/100). For a 20% increase to reach 120: Original = 120 / 1.20 = 100. For a 20% decrease to reach 80: Original = 80 / 0.80 = 100. This reverse calculation is essential for understanding pre-change values in financial analysis and business metrics."
    },
    {
      question: "Why is percentage change sometimes misleading?",
      answer: "Percentage changes can be misleading when: 1) Original values are very small (small changes appear large), 2) Comparing across different bases (20% of 100 vs 20% of 1000), 3) Not considering absolute values (50% increase from 2 to 3 vs 10% increase from 1000 to 1100). Always consider both percentage and absolute changes for accurate interpretation of data trends and comparisons."
    },
    {
      question: "How do I calculate compound percentage changes?",
      answer: "For multiple consecutive percentage changes, use: Final Value = Initial Value × (1 ± p₁/100) × (1 ± p₂/100) × ... where p is each percentage change. Example: 100 with 10% increase then 20% increase: 100 × 1.10 × 1.20 = 132. The cumulative percentage change is not simply 10% + 20% = 30%, but actually 32% (from 100 to 132)."
    },
    {
      question: "What are common mistakes when calculating percentage change?",
      answer: "Common mistakes include: 1) Dividing by the wrong value (should be original, not new), 2) Forgetting to multiply by 100, 3) Miscalculating sign direction (increase vs decrease), 4) Confusing percentage points with percentages, 5) Not handling zero or negative original values properly, and 6) Failing to consider context when interpreting results. This calculator helps avoid these errors."
    }
  ];

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
      <title>Percentage Change Calculator | Calculate Increase/Decrease | ToolNest</title>
      <meta name="description" content="Free online percentage change calculator. Calculate percentage increase or decrease between two values with formula and step-by-step explanation. Perfect for finance, business, and data analysis." />
      <meta name="keywords" content="percentage change calculator, percentage increase, percentage decrease, growth rate calculator, change percentage, finance calculator, business metrics, data analysis" />
      <meta property="og:title" content="Percentage Change Calculator | Calculate Increase/Decrease" />
      <meta property="og:description" content="Free online percentage change calculator. Calculate percentage increase or decrease between two values with formula and step-by-step explanation." />
      <link rel="canonical" href="https://grocktool.com/math-tools/percentage-change" />

      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-4xl">
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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-green-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                <TrendingUp size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Finance • Business • Data Analysis</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Percentage Change Calculator
                <span className="block text-lg sm:text-xl font-normal text-muted-foreground mt-2">
                  Calculate Increase/Decrease • Growth Rates • Business Metrics
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <TrendingUp size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Percentage Change</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <TrendingDown size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Growth Analysis</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Target size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Business Metrics</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Calculator size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Financial Analysis</span>
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
                  <div className="text-xs text-muted-foreground">Quick Example Calculations:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setOriginalValue('100');
                        setNewValue('120');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      100 → 120 (+20% Increase)
                    </button>
                    <button
                      onClick={() => {
                        setOriginalValue('200');
                        setNewValue('150');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      200 → 150 (-25% Decrease)
                    </button>
                    <button
                      onClick={() => {
                        setOriginalValue('50');
                        setNewValue('75');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      50 → 75 (+50% Increase)
                    </button>
                    <button
                      onClick={() => {
                        setOriginalValue('1000');
                        setNewValue('1200');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      1000 → 1200 (+20% Increase)
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
                      <TrendingUp size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Percentage Change Calculator
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Zap size={12} />
                      <span>Financial analysis</span>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Original Value (Starting Point)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={originalValue}
                            onChange={(e) => setOriginalValue(e.target.value)}
                            placeholder="e.g., 100, 500, 1000"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            step="any"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Hash size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          The initial or starting value before the change
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          New Value (Ending Point)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            placeholder="e.g., 120, 400, 1500"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            step="any"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <TrendingUp size={16} className="text-muted-foreground" />
                          </div>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="bg-blue-500 text-white rounded-full p-1">
                              <Zap size={10} />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          The final or ending value after the change
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Common Scenarios */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Common Business Scenarios
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { original: 100, new: 110, label: '10% Growth' },
                        { original: 100, new: 90, label: '10% Decline' },
                        { original: 1000, new: 1200, label: '20% Increase' },
                        { original: 1000, new: 800, label: '20% Decrease' }
                      ].map((scenario, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setOriginalValue(scenario.original.toString());
                            setNewValue(scenario.new.toString());
                          }}
                          className="px-2 py-1.5 text-xs bg-green-500/10 text-green-600 rounded border border-green-500/20 hover:bg-green-500/20 transition-colors"
                        >
                          {scenario.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={calculatePercentageChange}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-green-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <TrendingUp size={16} className="sm:w-4 sm:h-4" />
                      Calculate Percentage Change
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Percentage Change Analysis</h3>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Main Change Display */}
                    <div className={`p-6 rounded-lg border ${
                      result.changeType === 'increase' 
                        ? 'bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20' 
                        : result.changeType === 'decrease' 
                        ? 'bg-gradient-to-r from-red-500/10 to-red-600/10 border-red-500/20'
                        : 'bg-gradient-to-r from-gray-500/10 to-gray-600/10 border-gray-500/20'
                    }`}>
                      <div className="flex items-center gap-4">
                        {result.changeType === 'increase' ? (
                          <div className="bg-green-500/20 p-3 rounded-full">
                            <TrendingUp size={28} className="text-green-600" />
                          </div>
                        ) : result.changeType === 'decrease' ? (
                          <div className="bg-red-500/20 p-3 rounded-full">
                            <TrendingDown size={28} className="text-red-600" />
                          </div>
                        ) : (
                          <div className="bg-gray-500/20 p-3 rounded-full">
                            <div className="w-6 h-6 rounded-full bg-gray-400" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground">
                            {result.changeType === 'increase' ? 'Increase' : result.changeType === 'decrease' ? 'Decrease' : 'No Change'}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {result.changeType === 'no change' 
                              ? 'Values remained the same'
                              : `From ${originalValue} to ${newValue}`
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Percentage Change</div>
                          <div className={`text-2xl font-bold ${
                            result.changeType === 'increase' 
                              ? 'text-green-600' 
                              : result.changeType === 'decrease' 
                              ? 'text-red-600'
                              : 'text-gray-600'
                          }`}>
                            {result.changeType === 'increase' ? '+' : result.changeType === 'decrease' ? '-' : ''}
                            {result.percentageChange === Infinity ? '∞' : result.percentageChange.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Absolute Change</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          {result.absoluteChange}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          {newValue} - {originalValue} = {parseFloat(newValue) - parseFloat(originalValue)}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/5 to-purple-600/5 p-4 rounded-lg border border-purple-500/20">
                        <div className="text-sm text-muted-foreground">Change Direction</div>
                        <div className="text-lg font-semibold text-foreground text-center capitalize">
                          {result.changeType === 'no change' ? 'No Change' : result.changeType}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          {result.changeType === 'increase' ? 'Growth/Expansion' : result.changeType === 'decrease' ? 'Decline/Reduction' : 'Stability'}
                        </div>
                      </div>
                    </div>

                    {/* Formula and Calculation */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 p-4 rounded-lg border border-amber-500/20">
                      <h4 className="text-sm font-medium text-foreground mb-2">Calculation Details:</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2"></div>
                          <span><strong>Formula:</strong> % Change = ((New - Original) ÷ Original) × 100</span>
                        </div>
                        {originalValue && newValue && (
                          <div className="flex items-start gap-2">
                            <div className="w-1 h-1 bg-amber-500 rounded-full mt-2"></div>
                            <span><strong>Calculation:</strong> (({newValue} - {originalValue}) ÷ {originalValue}) × 100 = {result.percentageChange === Infinity ? '∞' : result.percentageChange.toFixed(2)}%</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2"></div>
                          <span><strong>Interpretation:</strong> The value has {result.changeType === 'increase' ? 'increased' : result.changeType === 'decrease' ? 'decreased' : 'remained unchanged'} by {result.percentageChange === Infinity ? '∞' : result.percentageChange.toFixed(2)}% relative to the original value.</span>
                        </div>
                      </div>
                    </div>

                    {/* Business Context */}
                    {result.changeType !== 'no change' && (
                      <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                        <h4 className="text-sm font-medium text-foreground mb-2">Business Context Analysis:</h4>
                        <div className="text-xs text-muted-foreground">
                          A {result.percentageChange.toFixed(2)}% {result.changeType} from {originalValue} to {newValue} represents a {
                            Math.abs(parseFloat(newValue) - parseFloat(originalValue)) < 10 ? 'modest' :
                            Math.abs(parseFloat(newValue) - parseFloat(originalValue)) < 50 ? 'significant' :
                            Math.abs(parseFloat(newValue) - parseFloat(originalValue)) < 100 ? 'substantial' : 'dramatic'
                          } change. In business terms, this could represent {
                            result.changeType === 'increase' ? 'growth in sales, revenue, or market share' : 'reduction in costs, losses, or inefficiencies'
                          } that may require {
                            result.changeType === 'increase' ? 'sustaining strategies' : 'corrective actions'
                          }.
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Percentage Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-blue-600" />
                  Percentage Change Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Key Concepts */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <TrendingUp size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Key Percentage Concepts</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Relative Measure:</strong> Percentage change shows proportional difference relative to original value</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Standardized Comparison:</strong> Allows comparison across different scales and magnitudes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Directional Indicator:</strong> Positive for increases, negative for decreases, zero for no change</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Time Series Analysis:</strong> Essential for tracking changes over time in business and economics</span>
                      </div>
                    </div>
                  </div>

                  {/* Interpretation Guide */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Target size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Interpretation Guidelines</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Small Changes:</strong> &lt;5% typically considered marginal or within normal variation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Moderate Changes:</strong> 5-20% may indicate meaningful trends or interventions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Large Changes:</strong> &gt;20% often represent significant shifts requiring attention</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Context Matters:</strong> Always interpret percentage changes within their specific context</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Percentage Change Benchmarks</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-blue-600">Inflation Rate</span>
                      <span className="font-mono">Typically 2-3% annually</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-green-600">Stock Returns</span>
                      <span className="font-mono">7-10% long-term average</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-purple-600">Business Growth</span>
                      <span className="font-mono">10-20% considered healthy</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-red-600">Revenue Decline</span>
                      <span className="font-mono">&gt;10% may signal problems</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Empty as requested */}
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
                    <TrendingUp size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Percentage Change Calculator - Financial Analysis Tool</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Percentage Change Calculator is a comprehensive financial analysis tool that calculates the relative difference between two values expressed as a percentage. It's essential for measuring growth rates, analyzing trends, comparing performance metrics, and making data-driven decisions in business, finance, economics, and everyday scenarios. The calculator provides both percentage change and absolute change, helping users understand both relative and absolute differences. With support for all real numbers including zero and negative values, it handles edge cases appropriately and provides clear interpretations of results. The tool also includes business context analysis, helping users understand the practical implications of percentage changes in real-world scenarios. Whether analyzing sales growth, investment returns, price changes, or performance metrics, this calculator provides accurate, instant calculations with detailed explanations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Accurate Calculations</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Computes percentage changes with precise mathematical formulas, handling edge cases like zero denominators and negative values correctly.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Business Context</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Provides interpretation guidelines and business context analysis to help understand the practical implications of percentage changes.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Educational Value</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Shows step-by-step calculations, explains formulas, and provides learning resources for understanding percentage change concepts.</p>
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
                    <Target size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Percentage Change Applications & Use Cases</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💰 Financial Analysis & Investment</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Investment Returns</strong>: Calculating stock, bond, and portfolio performance over time periods to evaluate investment strategies and compare asset classes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Interest Rate Changes</strong>: Analyzing impact of central bank rate decisions on loans, mortgages, and savings accounts for financial planning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Currency Exchange Fluctuations</strong>: Measuring currency value changes for international trade, travel planning, and foreign investment decisions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Inflation Calculations</strong>: Determining purchasing power changes and real value adjustments for salary negotiations and contract indexing</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏢 Business & Sales Analysis</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Sales Growth Metrics</strong>: Tracking monthly, quarterly, and annual revenue changes to evaluate business performance and market position</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Market Share Analysis</strong>: Calculating changes in competitive position and customer base penetration for strategic planning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Price Change Impact</strong>: Analyzing effects of price increases/decreases on sales volume and total revenue for pricing strategy optimization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Cost Management</strong>: Measuring efficiency improvements, cost reduction initiatives, and operational performance changes over time</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Data Analysis & Performance Metrics</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Website Analytics</strong>: Measuring traffic growth, conversion rate changes, and user engagement improvements for digital marketing optimization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Academic Performance</strong>: Tracking grade improvements, test score changes, and learning progress over academic terms and years</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Scientific Measurements</strong>: Calculating experimental result variations, measurement accuracy improvements, and research outcome changes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Sports Statistics</strong>: Analyzing performance improvements, win rate changes, and competitive ranking movements for athletic training</span>
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
                    <TrendingUp size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Percentage Change Calculator - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Simple 4-Step Process</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Original Value</div>
                            <div className="text-sm text-muted-foreground">Input the starting or initial value (e.g., last month's sales, initial investment amount, baseline measurement).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Enter New Value</div>
                            <div className="text-sm text-muted-foreground">Input the ending or current value (e.g., this month's sales, current investment value, latest measurement).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Calculate Change</div>
                            <div className="text-sm text-muted-foreground">Click "Calculate Percentage Change" to compute both percentage and absolute differences instantly.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Analyze Results</div>
                            <div className="text-sm text-muted-foreground">Review percentage change, absolute change, direction, and business context interpretation.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Advanced Analysis Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span><strong>Compare Multiple Periods</strong>: Calculate sequential percentage changes to identify trends and patterns over time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-accent" />
                          </div>
                          <span><strong>Set Benchmarks</strong>: Compare actual changes against industry averages or target growth rates for performance evaluation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span><strong>Consider Context</strong>: Always interpret percentage changes within their specific business, economic, or situational context</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <TrendingUp size={12} className="text-accent" />
                          </div>
                          <span><strong>Use Absolute Values</strong>: Consider both percentage and absolute changes to get complete picture of impact magnitude</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span><strong>Document Findings</strong>: Copy results for reports, presentations, and decision-making documentation with proper context</span>
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
                    <Calculator size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Percentage Change Examples & Calculations</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Percentage Change Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Scenario</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Original → New</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">% Change</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Interpretation</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Sales Growth</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">100 → 120</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">+20%</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Healthy sales increase</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Price Reduction</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">200 → 150</td>
                                  <td className="px-4 py-3 text-sm font-mono text-red-600">-25%</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Significant price cut</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Investment Return</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1000 → 1100</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">+10%</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Good annual return</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Cost Saving</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">500 → 450</td>
                                  <td className="px-4 py-3 text-sm font-mono text-red-600">-10%</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Efficiency improvement</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Market Share</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">15% → 18%</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">+20%</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Strong competitive gain</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">No Change</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">75 → 75</td>
                                  <td className="px-4 py-3 text-sm font-mono text-gray-600">0%</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Stability maintained</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Business Revenue Growth Analysis</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Complete analysis of revenue growth from $100,000 to $120,000

Step 1: Identify values
Original Value (Q1 Revenue): $100,000
New Value (Q2 Revenue): $120,000

Step 2: Calculate absolute change
Absolute Change = New Value - Original Value
Absolute Change = $120,000 - $100,000 = $20,000

Step 3: Apply percentage change formula
Percentage Change = ((New - Original) ÷ Original) × 100
Percentage Change = (($120,000 - $100,000) ÷ $100,000) × 100
Percentage Change = ($20,000 ÷ $100,000) × 100
Percentage Change = 0.20 × 100 = 20%

Step 4: Determine change direction
Since $120,000 > $100,000 → Increase
Since 20% > 0 → Positive change

Step 5: Mathematical verification
Alternative calculation check:
20% of $100,000 = 0.20 × $100,000 = $20,000
$100,000 + $20,000 = $120,000 ✓

Reverse calculation check:
If 20% increase from $100,000 = $120,000
Then $120,000 ÷ 1.20 = $100,000 ✓

Step 6: Business context interpretation
• Growth Rate: 20% quarterly revenue increase
• Absolute Growth: $20,000 additional revenue
• Annualized Rate: If sustained, approximately 80% annual growth
• Industry Context: Compare to industry average of 5-10% quarterly growth

Step 7: Performance assessment
• Excellent Growth: 20% exceeds typical 5-10% industry benchmarks
• Significant Impact: $20,000 represents substantial revenue increase
• Sustainability: Consider if this growth rate is sustainable long-term
• Drivers: Analyze factors contributing to growth (new customers, price changes, etc.)

Step 8: Strategic implications
• Resource Allocation: May justify increased marketing or production investment
• Forecasting: Could signal upward trend for future quarters
• Investor Relations: Strong growth metric for stakeholder communications
• Competitive Position: May indicate gaining market share

Step 9: Risk considerations
• Base Effect: Large percentage partly due to relatively small base ($100,000)
• Seasonality: Consider if Q2 typically shows growth due to seasonal factors
• Sustainability: Ensure growth drivers are repeatable, not one-time events
• Market Conditions: Consider overall economic and industry conditions

Step 10: Comparative analysis
Compare with other metrics:
• Customer growth: If customers increased 25%, revenue per customer decreased
• Profit margin: If profits grew only 10%, margins may be compressing
• Market share: If market grew 15%, company outperformed market by 5 points

Step 11: Actionable insights
• Positive Findings: Growth strategy appears effective
• Areas to Monitor: Ensure profit margins keep pace with revenue
• Next Steps: Investigate growth drivers for replication
• Resource Planning: Consider scaling successful initiatives

Step 12: Communication summary
"Q2 revenue grew 20% from $100,000 to $120,000, representing $20,000 absolute growth. 
This significantly outperforms industry averages and suggests effective growth strategies. 
Further analysis of underlying drivers is recommended to sustain this positive trend."

Step 13: Long-term perspective
If 20% quarterly growth continues:
End of Year: $100,000 × (1.20)^4 ≈ $207,360
2 Years: $100,000 × (1.20)^8 ≈ $429,980
3 Years: $100,000 × (1.20)^12 ≈ $891,610

Step 14: Caveats and considerations
• Percentage changes can be volatile with small bases
• Always consider absolute values alongside percentages
• External factors may influence results
• Multiple periods provide more reliable trends

Final Analysis:
Revenue increased 20% ($20,000) from Q1 to Q2, representing strong growth that 
exceeds industry norms and warrants further investigation of successful drivers 
while monitoring sustainability and profit margins.`}
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
                    <TrendingUp size={20} className="text-blue-600" />
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