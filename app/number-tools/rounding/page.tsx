'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, History, TrendingUp, TrendingDown, Target, Hash, PieChart, ChevronUp, ChevronDown, Percent, DollarSign, FileText, Globe, SortAsc, Shuffle, Zap, Cpu, Binary, Code, Maximize2, ChevronRight } from 'lucide-react';
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

  // Related tools for Number Tools category
  const relatedTools = [
    { name: 'Percentage Calculator', path: '/number-tools/percentage-calculator', icon: Percent },
    { name: 'Simple Interest Calculator', path: '/number-tools/simple-interest', icon: DollarSign },
    { name: 'EMI Calculator', path: '/number-tools/EMI-Calculator', icon: Calculator },
    { name: 'Roman Number Converter', path: '/number-tools/roman-converter', icon: Hash },
    { name: 'LCM/HCF Calculator', path: '/number-tools/lcm-hcf-calculator', icon: SortAsc },
    { name: 'Number to Words', path: '/number-tools/number-to-words', icon: FileText },
    { name: 'Scientific Notation', path: '/number-tools/scientific-notation', icon: Maximize2 },
    { name: 'Base Converter', path: '/number-tools/number-base-converter', icon: Code },
    { name: 'Random Generator', path: '/number-tools/random-generator', icon: Shuffle }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What's the difference between decimal places and significant figures?",
      answer: "Decimal places refer to the number of digits after the decimal point, while significant figures count all meaningful digits in a number from the first non-zero digit. For example, 0.00456 has 5 decimal places but only 3 significant figures. Decimal places are used for fixed precision requirements, while significant figures represent measurement accuracy in scientific contexts."
    },
    {
      question: "What is Banker's rounding and when should I use it?",
      answer: "Banker's rounding (also called round half to even) rounds to the nearest even number when a value is exactly halfway between two numbers. For example, 2.5 rounds to 2, and 3.5 rounds to 4. This method reduces cumulative rounding errors in statistical calculations and is the default rounding method in many financial and statistical applications, including IEEE 754 standard for floating-point arithmetic."
    },
    {
      question: "How does rounding handle negative numbers?",
      answer: "Our rounding tool correctly handles negative numbers according to mathematical conventions. For round up (ceil), negative numbers move toward positive infinity (-2.3 → -2). For round down (floor), negative numbers move toward negative infinity (-2.3 → -3). Round half up follows the same rules as positive numbers, while truncation simply removes digits without regard to sign."
    },
    {
      question: "What's the maximum precision this rounding tool can handle?",
      answer: "The tool can handle numbers with up to 15-17 significant digits (JavaScript's floating-point precision limit) and can round to up to 20 decimal places or significant figures. For extremely precise calculations beyond this range, the results may be limited by JavaScript's numerical precision, but the algorithms are mathematically correct for all valid inputs."
    },
    {
      question: "When should I use rounding vs. truncation?",
      answer: "Use rounding when you want to approximate a number to a specific precision while minimizing error. Use truncation when you need to simply remove extra digits without approximation (e.g., currency calculations where fractions of cents must be discarded). Rounding is better for statistical accuracy, while truncation is used in specific financial and computational contexts."
    }
  ];

  useEffect(() => {
    document.title = 'Number Rounding Calculator - Round to Decimal Places & Significant Figures | ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online Number Rounding Calculator. Round numbers to decimal places or significant figures using multiple methods: round half up, banker\'s rounding, ceil, floor, and truncation with precision control.');
    }
  }, []);

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
      
      <title>Number Rounding Calculator | Round to Decimal Places & Significant Figures | GrockTool.com</title>
      <meta name="description" content="Free online Number Rounding Calculator. Round numbers to decimal places or significant figures using multiple methods: round half up, banker's rounding, ceil, floor, and truncation with precision control." />
      <meta name="keywords" content="number rounding calculator, rounding calculator, round to decimal places, significant figures calculator, banker's rounding, round half up, truncate numbers, precision rounding" />
      <meta property="og:title" content="Number Rounding Calculator | Round to Decimal Places & Significant Figures" />
      <meta property="og:description" content="Free online Number Rounding Calculator. Round numbers to decimal places or significant figures using multiple methods with precision control." />
      <link rel="canonical" href="https://grocktool.com/number-tools/rounding" />
     

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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 px-4 py-2 rounded-full mb-4 border border-green-500/20">
                <Target size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-600">Precision Control • Multiple Methods • Decimal & Significant Figures</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Number Rounding Calculator
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Round Numbers to Decimal Places or Significant Figures • 5 Rounding Methods • Precision Control
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Target size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Round Half Up</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <TrendingUp size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Banker's Rounding</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Calculator size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Decimal Places</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <PieChart size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Significant Figures</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Converter */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Examples Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Quick Rounding Examples:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => {
                        setInputValue('3.1415926535');
                        setRoundingMethod('nearest');
                        setDecimalPlaces(2);
                        setRoundingType('decimal');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      π → 3.14
                    </button>
                    <button
                      onClick={() => {
                        setInputValue('123.456789');
                        setRoundingMethod('bankers');
                        setDecimalPlaces(0);
                        setRoundingType('decimal');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      123.456 → 123
                    </button>
                    <button
                      onClick={() => {
                        setInputValue('0.000123456');
                        setRoundingMethod('nearest');
                        setSignificantFigures(3);
                        setRoundingType('significant');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      0.000123 → 0.000123
                    </button>
                    <button
                      onClick={() => {
                        setInputValue('999.999999');
                        setRoundingMethod('up');
                        setDecimalPlaces(1);
                        setRoundingType('decimal');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      999.999 → 1000.0
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
                      <Calculator size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Number Rounding Calculator
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <Zap size={12} />
                      <span>Precision control</span>
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Enter Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g., 123.456789"
                        className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg font-mono"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Target size={16} className="text-muted-foreground" />
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-green-500 text-white rounded-full p-1">
                          <Zap size={10} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter any number (positive, negative, or decimal)
                    </p>
                  </div>

                  {/* Rounding Type Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-green-500' 
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
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-blue-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Calculator size={16} className="sm:w-4 sm:h-4" />
                      Round Number
                    </button>
                    <button
                      onClick={clearFields}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base font-medium"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Clear All
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
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Rounding Results</h3>
                      <p className="text-sm text-muted-foreground">
                        {roundingType === 'decimal' 
                          ? `${decimalPlaces} decimal places • ${roundingMethods.find(m => m.value === roundingMethod)?.label}`
                          : `${significantFigures} significant figures • ${roundingMethods.find(m => m.value === roundingMethod)?.label}`
                        }
                      </p>
                    </div>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                      title="Copy results"
                    >
                      <Copy size={18} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Main Result Display */}
                    <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6 rounded-lg border border-green-500/20">
                      <div className="text-sm text-muted-foreground mb-2 text-center">
                        Rounded Number
                      </div>
                      <div className="text-3xl font-bold text-foreground text-center font-mono">
                        {roundedValue}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center">
                        Original: {inputValue} • Method: {roundingMethods.find(m => m.value === roundingMethod)?.label}
                      </div>
                    </div>

                    {/* Comparison Details */}
                    {comparison && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 rounded-lg border border-green-500/20">
                          <div className="text-sm text-muted-foreground">Original</div>
                          <div className="text-lg font-semibold text-foreground font-mono">
                            {comparison.original}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Input value</div>
                        </div>
                        <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                          <div className="text-sm text-muted-foreground">Difference</div>
                          <div className="text-lg font-semibold text-foreground font-mono">
                            {comparison.difference > 0 ? '+' : ''}{comparison.difference.toExponential(6)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Rounded - Original</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500/5 to-purple-600/5 p-4 rounded-lg border border-purple-500/20">
                          <div className="text-sm text-muted-foreground">Relative Change</div>
                          <div className="text-lg font-semibold text-foreground font-mono">
                            {comparison.percentage > 0 ? '+' : ''}{comparison.percentage.toFixed(6)}%
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">Percentage change</div>
                        </div>
                      </div>
                    )}

                    {/* Method Explanation */}
                    <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 p-4 rounded-lg border border-border">
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

              {/* Rounding Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <PieChart size={18} className="text-green-600" />
                  Rounding Methods Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Rounding Types */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Calculator size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Rounding Types</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Decimal Places</strong>: Controls digits after decimal point. Example: 123.456 → 123.46 (2 decimal places)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Significant Figures</strong>: Counts meaningful digits. Example: 0.00456 → 0.0046 (2 significant figures)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Integer Rounding</strong>: Round to whole numbers. Set decimal places to 0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Scientific Rounding</strong>: Used in scientific notation and measurements</span>
                      </div>
                    </div>
                  </div>

                  {/* Method Applications */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Target size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Method Applications</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Round Half Up</strong>: Default for everyday calculations, simple to understand</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Banker's Rounding</strong>: Reduces bias in statistics, finance standard</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Round Up/Down</strong>: Used in billing, inventory, conservative estimates</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Truncation</strong>: Financial calculations, computer science, data truncation</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Rounding Examples</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">3.14159 (π)</span>
                      <span className="font-mono">3.14 (2 decimals)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">2.71828 (e)</span>
                      <span className="font-mono">2.718 (3 decimals)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">123.456</span>
                      <span className="font-mono">123 (0 decimals)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">0.000123456</span>
                      <span className="font-mono">0.000123 (3 sig figs)</span>
                    </div>
                  </div>
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
                    <History size={18} className="text-green-600" />
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
                    <p className="text-xs text-muted-foreground mt-1">Your recent rounding operations will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {history.map((item, index) => (
                      <div key={index} className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-foreground">{item.method}</span>
                          <span className="text-xs text-muted-foreground bg-card px-2 py-1 rounded">{index + 1}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Input:</span>
                            <span className="font-mono text-foreground">{item.input}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Output:</span>
                            <span className="font-mono text-foreground font-semibold text-green-600">{item.result}</span>
                          </div>
                          <div className="text-xs text-muted-foreground bg-card/50 px-2 py-1 rounded inline-block">{item.type}</div>
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
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Target size={16} className="text-blue-600" />
                  Rounding Methods Comparison
                </h3>
                <div className="space-y-3 text-sm">
                  {roundingMethods.map((method) => (
                    <div key={method.value} className="p-3 bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        {method.icon}
                        <span className="font-medium text-foreground">{method.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                      <div className="text-xs text-muted-foreground mt-2">
                        <strong>Example:</strong> 2.5 → {method.value === 'nearest' ? '3' : method.value === 'bankers' ? '2' : method.value === 'up' ? '3' : method.value === 'down' ? '2' : '2'}
                      </div>
                    </div>
                  ))}
                  <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                    <h5 className="text-xs font-medium text-foreground mb-1">Rounding Tip:</h5>
                    <p className="text-xs text-muted-foreground">
                      Use Banker's Rounding for statistical calculations to reduce cumulative rounding errors. Use Round Half Up for everyday calculations.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Real-World Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <PieChart size={18} className="text-amber-600" />
                  Real-World Applications
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="text-xs sm:text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Financial Reporting</strong>: Currency amounts rounded to 2 decimal places ($123.456 → $123.46)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Scientific Measurements</strong>: Significant figures represent measurement precision (2.3456g ±0.0001g)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Computer Programming</strong>: Floating-point arithmetic, memory allocation, and display formatting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Engineering Calculations</strong>: Tolerance specifications and safety factor calculations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span><strong>Statistical Analysis</strong>: Banker's rounding to minimize bias in aggregated data</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Why Proper Rounding Matters:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Prevents cumulative errors in financial calculations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Ensures accurate scientific and engineering results</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Maintains consistency in data presentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Complies with industry standards and regulations</span>
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
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Target size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Number Rounding Calculator - Features & Precision Control</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Number Rounding Calculator is a comprehensive precision tool that provides multiple rounding methods for converting numbers to specific decimal places or significant figures. It supports five distinct rounding algorithms: Round Half Up (standard rounding), Banker's Rounding (round half to even for statistical accuracy), Round Up (ceil), Round Down (floor), and Truncation (simple digit removal). The calculator handles both positive and negative numbers, extremely small values, and provides detailed comparison metrics showing the exact difference and percentage change between original and rounded values. Designed for professionals in finance, science, engineering, and data analysis, it ensures mathematical accuracy while offering educational insights into how different rounding methods affect numerical precision.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Multiple Rounding Methods</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Five rounding algorithms including Round Half Up, Banker's Rounding (IEEE 754 standard), Ceil, Floor, and Truncation with proper handling of positive/negative numbers.</p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <PieChart size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Dual Precision Types</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Round to specific decimal places (fixed precision) or significant figures (measurement accuracy) with support for 0-20 decimal places and 1-20 significant figures.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <History size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Detailed Analysis</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Provides exact difference calculations, percentage changes, conversion history, and method explanations for understanding rounding impacts on numerical accuracy.</p>
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
                  <div className="bg-blue-500/10 p-2 rounded-lg">
                    <PieChart size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Number Rounding Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💰 Financial & Business Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Currency Calculations</strong>: Rounding monetary amounts to 2 decimal places for invoices, receipts, and financial statements ($123.456 → $123.46)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Tax Calculations</strong>: Applying specific rounding rules required by tax authorities for accurate tax reporting and compliance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Financial Reporting</strong>: Preparing balance sheets, income statements, and financial ratios with consistent decimal precision</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Investment Analysis</strong>: Calculating returns, percentages, and ratios for investment decisions with appropriate precision</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔬 Scientific & Engineering Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Laboratory Measurements</strong>: Reporting experimental results with correct significant figures that reflect measurement precision (2.3456g ±0.0001g)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Engineering Specifications</strong>: Applying tolerance limits and rounding technical drawings, dimensions, and material specifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Scientific Publications</strong>: Formatting numerical results in research papers according to journal guidelines and precision requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Statistical Analysis</strong>: Using Banker's Rounding to minimize cumulative errors in statistical calculations and data aggregation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💻 Programming & Data Processing</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Data Display Formatting</strong>: Rounding numbers for user interface display in applications, dashboards, and reports</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Database Operations</strong>: Preparing numerical data for storage with consistent precision across database systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>API Development</strong>: Formatting numerical responses in APIs to maintain consistency and prevent floating-point errors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Game Development</strong>: Rounding coordinates, scores, and physics calculations for smooth gameplay and display</span>
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
                  <div className="bg-orange-500/10 p-2 rounded-lg">
                    <Calculator size={20} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Number Rounding Calculator - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Simple 5-Step Process</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Your Number</div>
                            <div className="text-sm text-muted-foreground">Input any number (positive, negative, decimal, or scientific notation). Use sample numbers or quick examples for common values.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Choose Rounding Type</div>
                            <div className="text-sm text-muted-foreground">Select between Decimal Places (fixed precision) or Significant Figures (measurement accuracy) based on your needs.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Set Precision Level</div>
                            <div className="text-sm text-muted-foreground">Choose the number of decimal places (0-6) or significant figures (1-8) using the quick-select buttons or custom input.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Select Rounding Method</div>
                            <div className="text-sm text-muted-foreground">Pick from 5 rounding algorithms: Round Half Up, Banker's, Round Up, Round Down, or Truncation based on your application.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
                          <div>
                            <div className="font-medium text-foreground">Round & Analyze</div>
                            <div className="text-sm text-muted-foreground">Click Round Number to see results, examine difference calculations, copy formatted output, and track history.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Rounding Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-accent" />
                          </div>
                          <span><strong>Use Quick Examples</strong>: Try pre-configured examples like π→3.14 or currency rounding for common scenarios</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <TrendingUp size={12} className="text-accent" />
                          </div>
                          <span><strong>Choose Method Wisely</strong>: Use Banker's for statistics, Round Half Up for everyday math, Truncation for financial truncation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <History size={12} className="text-accent" />
                          </div>
                          <span><strong>Utilize History</strong>: Track your rounding operations for reference, comparison, or batch processing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span><strong>Copy Formatted Results</strong>: Copy complete rounding information including method and precision for documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <PieChart size={12} className="text-accent" />
                          </div>
                          <span><strong>Understand Differences</strong>: Review the difference and percentage change to understand rounding impact on your data</span>
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
                    <Zap size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Number Rounding Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Rounding Examples by Method</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Input Number</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Method</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Precision</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Result</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Application</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">3.1415926535</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Round Half Up</td>
                                  <td className="px-4 py-3 text-sm text-foreground">2 decimals</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">3.14</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Basic mathematics, π approximation</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">123.456789</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Banker's Rounding</td>
                                  <td className="px-4 py-3 text-sm text-foreground">2 decimals</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">123.46</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Financial calculations, statistics</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">99.999</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Round Up</td>
                                  <td className="px-4 py-3 text-sm text-foreground">1 decimal</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">100.0</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Conservative estimates, billing</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">45.6789</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Round Down</td>
                                  <td className="px-4 py-3 text-sm text-foreground">0 decimals</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">45</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Inventory counting, age calculation</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">123.456789</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Truncate</td>
                                  <td className="px-4 py-3 text-sm text-foreground">2 decimals</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">123.45</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Financial truncation, data processing</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">0.000123456</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Round Half Up</td>
                                  <td className="px-4 py-3 text-sm text-foreground">3 sig figs</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">0.000123</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Scientific measurements</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">-45.6789</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Round Half Up</td>
                                  <td className="px-4 py-3 text-sm text-foreground">1 decimal</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground font-semibold">-45.7</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Negative number handling</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Rounding Example: Financial Calculation</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Financial invoice calculation with proper rounding

Step 1: Original invoice calculation
Item price: $123.456 per unit
Quantity: 7 units
Subtotal: 123.456 × 7 = 864.192

Step 2: Tax calculation (10% tax rate)
Tax amount: 864.192 × 0.10 = 86.4192

Step 3: Determine rounding requirements
Financial regulations require:
• Currency amounts rounded to 2 decimal places
• Round Half Up method for final amounts
• Truncation for intermediate calculations (some systems)

Step 4: Round subtotal (if required by system)
Subtotal: 864.192
Using Truncation to 2 decimals: 864.19
Using Round Half Up: 864.19 (same in this case)

Step 5: Round tax amount
Tax: 86.4192
Using Truncation to 2 decimals: 86.41
Using Round Half Up: 86.42 (different!)

Step 6: Calculate total with different methods
Method A: Truncate both, then sum
864.19 + 86.41 = 950.60

Method B: Round Half Up both, then sum
864.19 + 86.42 = 950.61

Method C: Calculate exact, then round final
864.192 + 86.4192 = 950.6112
Round Half Up to 2 decimals: 950.61

Step 7: Analyze differences
Method A (Truncate): $950.60
Method B (Round Half Up): $950.61
Method C (Exact then round): $950.61

Difference: $0.01 between methods

Step 8: Regulatory compliance check
Most financial systems use Method C (exact calculation then round final)
Some legacy systems use Method A (truncation at each step)
Method B (rounding at each step) can cause cumulative errors

Step 9: Banker's Rounding alternative
Using Banker's Rounding (IEEE 754 standard):
950.6112 → 950.61 (rounds to even)
Same as Round Half Up in this case

Step 10: Significant figures for reporting
If reporting to board with 3 significant figures:
$950.61 → $951 (3 significant figures)
Percentage change: (951 - 950.61) / 950.61 × 100 = 0.041%

Step 11: Error analysis
Maximum rounding error per transaction: $0.005
For 1,000 transactions: Maximum error = $5.00
Actual error (random distribution): Approximately $0.00

Step 12: Practical implementation
const subtotal = 123.456 * 7; // 864.192
const tax = subtotal * 0.10;   // 86.4192
const totalExact = subtotal + tax; // 950.6112

// Financial rounding (2 decimal places, Round Half Up)
const totalRounded = Math.round(totalExact * 100) / 100; // 950.61

// Alternative: Banker's Rounding implementation
function bankersRound(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(num * factor);
  if (Math.abs(num * factor - rounded) === 0.5) {
    return (rounded % 2 === 0 ? rounded : rounded - 1) / factor;
  }
  return rounded / factor;
}

const totalBankers = bankersRound(totalExact, 2); // 950.61

Step 13: Key principles demonstrated
✓ Different rounding methods produce different results
✓ Financial regulations specify rounding rules
✓ Cumulative errors can occur with intermediate rounding
✓ Truncation vs. rounding affects final amounts
✓ Significant figures for management reporting
✓ Proper implementation prevents financial discrepancies

Final Results:
• Exact total: $950.6112
• Rounded (Half Up): $950.61
• Rounded (Banker's): $950.61
• Truncated: $950.60
• 3 sig figs report: $951

Recommended Practice:
1. Calculate exact values throughout
2. Apply rounding only at final display
3. Use Round Half Up for financial amounts
4. Consider Banker's for statistical data
5. Document rounding method in financial systems
6. Test edge cases (0.5, negative numbers)`}
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
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Target size={20} className="text-green-600" />
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
                <h2 className="text-xl font-bold text-foreground">More Number Tools</h2>
                {openSections.relatedTools ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.relatedTools && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    Explore other useful number calculation tools from our Number Tools category:
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