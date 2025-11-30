'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, History, TrendingUp, TrendingDown, Target, Hash, PieChart } from 'lucide-react';
import Link from 'next/link';

export default function NumberRoundingPage() {
  const [inputValue, setInputValue] = useState<string>('123.456789');
  const [roundedValue, setRoundedValue] = useState<string>('');
  const [roundingMethod, setRoundingMethod] = useState<'nearest' | 'up' | 'down' | 'truncate' | 'bankers'>('nearest');
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);
  const [significantFigures, setSignificantFigures] = useState<number>(4);
  const [roundingType, setRoundingType] = useState<'decimal' | 'significant'>('decimal');
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<{ input: string; method: string; result: string; type: string }[]>([]);
  const [comparison, setComparison] = useState<{ original: number; rounded: number; difference: number; percentage: number } | null>(null);

  // Rounding methods with descriptions
  const roundingMethods = [
    { 
      value: 'nearest', 
      label: 'Round Half Up', 
      description: 'Rounds to nearest, .5 rounds up',
      icon: <Target size={16} />
    },
    { 
      value: 'bankers', 
      label: "Banker's Rounding", 
      description: 'Rounds to nearest even number',
      icon: <TrendingUp size={16} />
    },
    { 
      value: 'up', 
      label: 'Round Up', 
      description: 'Always rounds away from zero',
      icon: <TrendingUp size={16} />
    },
    { 
      value: 'down', 
      label: 'Round Down', 
      description: 'Always rounds toward zero',
      icon: <TrendingDown size={16} />
    },
    { 
      value: 'truncate', 
      label: 'Truncate', 
      description: 'Simply removes extra digits',
      icon: <Hash size={16} />
    }
  ];

  // Common decimal places
  const commonDecimalPlaces = [0, 1, 2, 3, 4, 5, 6];
  
  // Common significant figures
  const commonSignificantFigures = [1, 2, 3, 4, 5, 6, 8];

  // Sample numbers for testing
  const sampleNumbers = [
    '3.1415926535',
    '2.7182818284',
    '123.456789',
    '9876.54321',
    '0.000123456',
    '999.999999',
    '-45.6789',
    '1000000.12345'
  ];

  // Validate input
  const validateInput = (value: string): boolean => {
    if (!value.trim()) return false;
    const num = parseFloat(value);
    return !isNaN(num) && isFinite(num);
  };

  // Round to decimal places
  const roundToDecimalPlaces = (num: number, places: number, method: string): number => {
    const factor = Math.pow(10, places);
    
    switch (method) {
      case 'nearest':
        return Math.round(num * factor) / factor;
      
      case 'bankers':
        const rounded = Math.round(num * factor);
        // Check if it's exactly halfway
        if (Math.abs(num * factor - rounded) === 0.5) {
          // Round to nearest even
          return (rounded % 2 === 0 ? rounded : rounded - 1) / factor;
        }
        return rounded / factor;
      
      case 'up':
        return Math.ceil(num * factor) / factor;
      
      case 'down':
        return Math.floor(num * factor) / factor;
      
      case 'truncate':
        return Math.trunc(num * factor) / factor;
      
      default:
        return Math.round(num * factor) / factor;
    }
  };

  // Round to significant figures
  const roundToSignificantFigures = (num: number, figures: number, method: string): number => {
    if (num === 0) return 0;
    
    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const factor = Math.pow(10, figures - magnitude - 1);
    
    switch (method) {
      case 'nearest':
        return Math.round(num * factor) / factor;
      
      case 'bankers':
        const rounded = Math.round(num * factor);
        if (Math.abs(num * factor - rounded) === 0.5) {
          return (rounded % 2 === 0 ? rounded : rounded - 1) / factor;
        }
        return rounded / factor;
      
      case 'up':
        return (num > 0 ? Math.ceil(num * factor) : Math.floor(num * factor)) / factor;
      
      case 'down':
        return (num > 0 ? Math.floor(num * factor) : Math.ceil(num * factor)) / factor;
      
      case 'truncate':
        return Math.trunc(num * factor) / factor;
      
      default:
        return Math.round(num * factor) / factor;
    }
  };

  // Format number with proper decimal places
  const formatNumber = (num: number, type: 'decimal' | 'significant', precision: number): string => {
    if (type === 'decimal') {
      return num.toFixed(precision);
    } else {
      return num.toPrecision(precision);
    }
  };

  // Perform rounding
  const roundNumber = () => {
    setError('');
    setRoundedValue('');
    setComparison(null);

    if (!validateInput(inputValue)) {
      setError('Please enter a valid number');
      return;
    }

    try {
      const original = parseFloat(inputValue);
      let rounded: number;

      if (roundingType === 'decimal') {
        rounded = roundToDecimalPlaces(original, decimalPlaces, roundingMethod);
      } else {
        rounded = roundToSignificantFigures(original, significantFigures, roundingMethod);
      }

      const formattedResult = formatNumber(rounded, roundingType, 
        roundingType === 'decimal' ? decimalPlaces : significantFigures
      );

      setRoundedValue(formattedResult);

      // Calculate comparison
      const difference = rounded - original;
      const percentage = original !== 0 ? (difference / original) * 100 : 0;

      setComparison({
        original,
        rounded,
        difference,
        percentage
      });

      // Add to history
      const methodLabel = roundingMethods.find(m => m.value === roundingMethod)?.label || roundingMethod;
      setHistory(prev => [{
        input: inputValue,
        method: methodLabel,
        result: formattedResult,
        type: roundingType === 'decimal' ? `${decimalPlaces} decimals` : `${significantFigures} sig figs`
      }, ...prev.slice(0, 9)]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rounding failed');
    }
  };

  // Clear all fields
  const clearFields = () => {
    setInputValue('');
    setRoundedValue('');
    setError('');
    setComparison(null);
  };

  // Copy result to clipboard
  const copyResult = async () => {
    if (roundedValue) {
      const text = `Number Rounding:\nOriginal: ${inputValue}\nRounded: ${roundedValue}\nMethod: ${roundingMethods.find(m => m.value === roundingMethod)?.label}\nType: ${roundingType === 'decimal' ? `${decimalPlaces} decimal places` : `${significantFigures} significant figures`}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
  };

  // Get method description
  const getMethodDescription = (method: string): string => {
    return roundingMethods.find(m => m.value === method)?.description || '';
  };

  // Common rounding examples
  const commonExamples = [
    { input: '3.14159', decimals: 2, method: 'nearest', expected: '3.14' },
    { input: '2.71828', decimals: 3, method: 'nearest', expected: '2.718' },
    { input: '123.456', decimals: 0, method: 'nearest', expected: '123' },
    { input: '99.999', decimals: 1, method: 'up', expected: '100.0' },
    { input: '45.5', decimals: 0, method: 'bankers', expected: '46' },
    { input: '44.5', decimals: 0, method: 'bankers', expected: '44' }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Number Rounding Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Round numbers to decimal places or significant figures using different rounding methods
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Converter */}
            <div className="lg:col-span-2 space-y-6">
              {/* Converter Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calculator size={20} className="text-foreground" />
                    <label className="block text-sm font-medium text-foreground">
                      Number Rounding Calculator
                    </label>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Enter Number
                    </label>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="e.g., 123.456789"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter any number (positive, negative, or decimal)
                    </p>
                  </div>

                  {/* Rounding Type Selection */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Rounding Type
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setRoundingType('decimal')}
                          className={`flex-1 p-3 rounded-lg border transition-all text-sm ${
                            roundingType === 'decimal' 
                              ? 'bg-accent text-accent-foreground border-accent' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          Decimal Places
                        </button>
                        <button
                          onClick={() => setRoundingType('significant')}
                          className={`flex-1 p-3 rounded-lg border transition-all text-sm ${
                            roundingType === 'significant' 
                              ? 'bg-accent text-accent-foreground border-accent' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          Significant Figures
                        </button>
                      </div>
                    </div>

                    {/* Precision Selection */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        {roundingType === 'decimal' ? 'Decimal Places' : 'Significant Figures'}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {(roundingType === 'decimal' ? commonDecimalPlaces : commonSignificantFigures).map((value) => (
                          <button
                            key={value}
                            onClick={() => roundingType === 'decimal' ? setDecimalPlaces(value) : setSignificantFigures(value)}
                            className={`px-3 py-2 rounded-lg border transition-all text-sm ${
                              (roundingType === 'decimal' ? decimalPlaces === value : significantFigures === value)
                                ? 'bg-accent text-accent-foreground border-accent' 
                                : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                            }`}
                          >
                            {value}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rounding Method Selection */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Rounding Method
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                      {roundingMethods.map((method) => (
                        <button
                          key={method.value}
                          onClick={() => setRoundingMethod(method.value as any)}
                          className={`p-3 rounded-lg border transition-all text-xs ${
                            roundingMethod === method.value
                              ? 'bg-accent text-accent-foreground border-accent' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          <div className="flex items-center gap-1 justify-center flex-col">
                            {method.icon}
                            <span>{method.label}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {getMethodDescription(roundingMethod)}
                    </p>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-destructive text-sm text-center">{error}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={roundNumber}
                      disabled={!inputValue.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Calculator size={16} className="sm:w-4 sm:h-4" />
                      Round Number
                    </button>
                    <button
                      onClick={clearFields}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Clear
                    </button>
                  </div>

                  {/* Sample Numbers */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Sample Numbers
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {sampleNumbers.map((number, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(number)}
                          className="p-2 text-xs bg-secondary text-secondary-foreground rounded border border-border hover:bg-secondary/80 transition-colors text-center font-mono"
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Results Card */}
              {roundedValue && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Rounding Result</h3>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Main Result Display */}
                    <div className="bg-accent/10 p-6 rounded-lg border border-accent/20 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        Rounded Number
                      </div>
                      <div className="text-3xl font-bold text-foreground font-mono">
                        {roundedValue}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {roundingType === 'decimal' 
                          ? `${decimalPlaces} decimal places • ${roundingMethods.find(m => m.value === roundingMethod)?.label}`
                          : `${significantFigures} significant figures • ${roundingMethods.find(m => m.value === roundingMethod)?.label}`
                        }
                      </div>
                    </div>

                    {/* Comparison Details */}
                    {comparison && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-secondary/50 p-4 rounded-lg border border-border text-center">
                          <div className="text-sm text-muted-foreground">Original</div>
                          <div className="text-lg font-semibold text-foreground font-mono">
                            {comparison.original}
                          </div>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg border border-border text-center">
                          <div className="text-sm text-muted-foreground">Difference</div>
                          <div className="text-lg font-semibold text-foreground font-mono">
                            {comparison.difference > 0 ? '+' : ''}{comparison.difference.toExponential(6)}
                          </div>
                        </div>
                        <div className="bg-secondary/50 p-4 rounded-lg border border-border text-center">
                          <div className="text-sm text-muted-foreground">Change</div>
                          <div className="text-lg font-semibold text-foreground font-mono">
                            {comparison.percentage > 0 ? '+' : ''}{comparison.percentage.toFixed(6)}%
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Method Explanation */}
                    <div className="p-4 bg-secondary/30 rounded-lg border border-border">
                      <h4 className="text-sm font-medium text-foreground mb-2">
                        How {roundingMethods.find(m => m.value === roundingMethod)?.label} Works:
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {getMethodDescription(roundingMethod)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Rounding Examples */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <PieChart size={18} />
                  Common Rounding Examples
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 px-3 text-muted-foreground">Number</th>
                        <th className="text-left py-2 px-3 text-muted-foreground">Method</th>
                        <th className="text-left py-2 px-3 text-muted-foreground">Decimals</th>
                        <th className="text-left py-2 px-3 text-muted-foreground">Result</th>
                        <th className="text-left py-2 px-3 text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {commonExamples.map((example, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-2 px-3 font-mono text-foreground">{example.input}</td>
                          <td className="py-2 px-3 text-foreground capitalize">{example.method}</td>
                          <td className="py-2 px-3 text-foreground">{example.decimals}</td>
                          <td className="py-2 px-3 font-mono text-foreground font-semibold">{example.expected}</td>
                          <td className="py-2 px-3">
                            <button
                              onClick={() => {
                                setInputValue(example.input);
                                setRoundingMethod(example.method as any);
                                setDecimalPlaces(example.decimals);
                                setRoundingType('decimal');
                              }}
                              className="text-xs text-accent hover:text-accent/80 transition-colors"
                            >
                              Try
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </div>

            {/* Right Column - History & Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* History Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <History size={18} />
                    Rounding History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-8">
                    <History size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No rounding history yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {history.map((item, index) => (
                      <div key={index} className="p-3 bg-secondary/30 rounded-lg border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-foreground">{item.method}</span>
                          <span className="text-xs text-muted-foreground">{index + 1}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Input:</span>
                            <span className="font-mono text-foreground">{item.input}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Output:</span>
                            <span className="font-mono text-foreground font-semibold">{item.result}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{item.type}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Rounding Methods Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground mb-3">Rounding Methods</h3>
                <div className="space-y-3 text-sm">
                  {roundingMethods.map((method) => (
                    <div key={method.value} className="p-3 bg-secondary/30 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        {method.icon}
                        <span className="font-medium text-foreground">{method.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">About Number Rounding</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Rounding numbers is essential for presenting data clearly, 
                    reducing complexity, and meeting precision requirements in 
                    various fields.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Decimal Places: Fixed number of digits after decimal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Significant Figures: Meaningful digits in measurement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Different methods for different use cases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Handles positive, negative, and very small numbers</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Common Applications:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Financial calculations and reporting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Scientific measurements and data analysis</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Engineering calculations and specifications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Statistical analysis and data presentation</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}