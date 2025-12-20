'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, History, Binary, Hash, Code, Cpu, ChevronUp, ChevronDown, Percent, DollarSign, FileText, Globe, SortAsc, Shuffle, TrendingUp, Zap, Maximize2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function BaseConverterPage() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromBase, setFromBase] = useState<number>(10);
  const [toBase, setToBase] = useState<number>(2);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<{ input: string; fromBase: number; toBase: number; result: string }[]>([]);
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const [conversionSteps, setConversionSteps] = useState<string[]>([]);
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
    { name: 'Number Rounding', path: '/number-tools/rounding', icon: TrendingUp },
    { name: 'Random Generator', path: '/number-tools/random-generator', icon: Shuffle }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is base conversion and why is it important?",
      answer: "Base conversion is the process of changing a number from one numeral system (base) to another. It's crucial in computer science because computers use binary (base 2), while programmers often work with hexadecimal (base 16) for memory addresses and debugging. Different bases are used in various computing applications, from low-level programming to data encoding and cryptography."
    },
    {
      question: "What are the most commonly used number bases?",
      answer: "The most common bases are: Binary (base 2) for computer logic and digital circuits, Decimal (base 10) for everyday mathematics, Octal (base 8) for Unix file permissions, Hexadecimal (base 16) for programming and memory addressing, Base32 and Base64 for data encoding in web applications and email systems."
    },
    {
      question: "How does the base converter handle invalid input?",
      answer: "The converter validates input against the selected source base's character set. For example, base 2 only accepts '0' and '1', base 16 accepts '0-9' and 'A-F', and base 36 accepts '0-9' and 'A-Z'. Invalid characters trigger an error message showing the valid character set for the selected base."
    },
    {
      question: "What is the maximum base supported by this converter?",
      answer: "This converter supports bases from 2 to 36. Base 36 includes digits 0-9 and letters A-Z. While mathematically any base is possible, practical limitations exist for character representation. Bases beyond 36 require special character sets that aren't standardized across systems."
    },
    {
      question: "Can I convert directly between non-decimal bases?",
      answer: "Yes! The converter can convert directly between any two bases (like binary to hexadecimal). The conversion typically goes through decimal as an intermediate step for mathematical accuracy, but our step-by-step breakdown shows the complete process clearly."
    }
  ];

  useEffect(() => {
    document.title = 'Base Converter - Convert Numbers Between Binary, Decimal, Hexadecimal | ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online Base Converter tool. Convert numbers between binary, decimal, hexadecimal, octal, base32, base64 and other numeral systems instantly with step-by-step explanations.');
    }
  }, []);

  // Common bases with labels
  const commonBases = [
    { value: 2, label: 'Binary (2)', icon: <Binary size={16} /> },
    { value: 8, label: 'Octal (8)', icon: <Hash size={16} /> },
    { value: 10, label: 'Decimal (10)', icon: <Calculator size={16} /> },
    { value: 16, label: 'Hexadecimal (16)', icon: <Code size={16} /> },
    { value: 32, label: 'Base32 (32)', icon: <Cpu size={16} /> },
    { value: 64, label: 'Base64 (64)', icon: <Cpu size={16} /> }
  ];

  // All supported bases (2-36)
  const allBases = Array.from({ length: 35 }, (_, i) => i + 2);

  // Character sets for different bases
  const getCharSet = (base: number): string => {
    if (base <= 10) return '0123456789'.slice(0, base);
    if (base <= 36) return '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, base);
    return '';
  };

  // Validate input for given base
  const validateInput = (value: string, base: number): boolean => {
    if (!value) return false;
    
    const charSet = getCharSet(base);
    const validChars = new Set(charSet);
    
    return value.toUpperCase().split('').every(char => validChars.has(char));
  };

  // Convert from any base to decimal
  const toDecimal = (value: string, base: number): number => {
    const charSet = getCharSet(base);
    let decimal = 0;
    
    for (let i = 0; i < value.length; i++) {
      const char = value[value.length - 1 - i].toUpperCase();
      const digitValue = charSet.indexOf(char);
      decimal += digitValue * Math.pow(base, i);
    }
    
    return decimal;
  };

  // Convert from decimal to any base
  const fromDecimal = (decimal: number, base: number): string => {
    if (decimal === 0) return '0';
    
    const charSet = getCharSet(base);
    let result = '';
    let num = decimal;
    
    while (num > 0) {
      const remainder = num % base;
      result = charSet[remainder] + result;
      num = Math.floor(num / base);
    }
    
    return result;
  };

  // Generate conversion steps
  const generateSteps = (value: string, fromBase: number, toBase: number): string[] => {
    const steps: string[] = [];
    
    if (fromBase === toBase) {
      steps.push(`Same base conversion: ${value} (base ${fromBase}) = ${value} (base ${toBase})`);
      return steps;
    }

    if (fromBase !== 10) {
      const decimalValue = toDecimal(value, fromBase);
      steps.push(`Convert from base ${fromBase} to decimal:`);
      steps.push(`${value} (base ${fromBase}) = ${decimalValue} (base 10)`);
      
      if (toBase === 10) {
        return steps;
      }
      
      const result = fromDecimal(decimalValue, toBase);
      steps.push(`Convert from decimal to base ${toBase}:`);
      steps.push(`${decimalValue} (base 10) = ${result} (base ${toBase})`);
    } else {
      const decimalValue = parseInt(value, 10);
      const result = fromDecimal(decimalValue, toBase);
      steps.push(`Convert from decimal to base ${toBase}:`);
      steps.push(`${value} (base 10) = ${result} (base ${toBase})`);
    }
    
    return steps;
  };

  // Perform conversion
  const convert = () => {
    setError('');
    setResult('');
    setConversionSteps([]);

    if (!inputValue.trim()) {
      setError('Please enter a value to convert');
      return;
    }

    if (!validateInput(inputValue, fromBase)) {
      setError(`Invalid input for base ${fromBase}. Valid characters: ${getCharSet(fromBase)}`);
      return;
    }

    try {
      let convertedValue = '';
      
      if (fromBase === toBase) {
        convertedValue = inputValue.toUpperCase();
      } else if (fromBase === 10) {
        const decimalValue = parseInt(inputValue, 10);
        convertedValue = fromDecimal(decimalValue, toBase);
      } else if (toBase === 10) {
        convertedValue = toDecimal(inputValue, fromBase).toString();
      } else {
        // Convert via decimal
        const decimalValue = toDecimal(inputValue, fromBase);
        convertedValue = fromDecimal(decimalValue, toBase);
      }

      setResult(convertedValue.toUpperCase());
      
      // Generate and set conversion steps
      const steps = generateSteps(inputValue, fromBase, toBase);
      setConversionSteps(steps);

      // Add to history
      setHistory(prev => [{
        input: inputValue,
        fromBase,
        toBase,
        result: convertedValue.toUpperCase()
      }, ...prev.slice(0, 9)]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  // Clear all fields
  const clearFields = () => {
    setInputValue('');
    setResult('');
    setError('');
    setConversionSteps([]);
  };

  // Copy result to clipboard
  const copyResult = async () => {
    if (result) {
      const text = `Base Conversion:\nInput: ${inputValue} (base ${fromBase})\nOutput: ${result} (base ${toBase})`;
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

  // Swap bases
  const swapBases = () => {
    setFromBase(toBase);
    setToBase(fromBase);
    setInputValue(result);
    setResult('');
    setConversionSteps([]);
  };

  // Common conversions for quick testing
  const commonConversions = [
    { input: '255', fromBase: 10, toBase: 16, label: '255 → HEX' },
    { input: 'FF', fromBase: 16, toBase: 10, label: 'FF → DEC' },
    { input: '1010', fromBase: 2, toBase: 10, label: '1010 → DEC' },
    { input: '10', fromBase: 10, toBase: 2, label: '10 → BIN' },
    { input: '777', fromBase: 8, toBase: 10, label: '777 → DEC' },
    { input: '100', fromBase: 10, toBase: 8, label: '100 → OCT' }
  ];

  // Sample values for different bases
  const sampleValues = {
    2: ['1010', '11011', '11111111', '1001'],
    8: ['12', '77', '123', '777'],
    10: ['10', '255', '1000', '4096'],
    16: ['A', 'FF', '1F4', '1000'],
    32: ['10', 'VV', '100'],
    64: ['AQ', 'Qg']
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      
      <title>Base Converter | Binary, Decimal, Hexadecimal Converter | GrockTool.com</title>
      <meta name="description" content="Free online Base Converter tool. Convert numbers between binary, decimal, hexadecimal, octal, base32, base64 and other numeral systems (base 2 to 36) instantly with step-by-step explanations." />
      <meta name="keywords" content="base converter, binary converter, hexadecimal converter, decimal to binary, binary to decimal, number base converter, octal converter, base 2 to base 10" />
      <meta property="og:title" content="Base Converter | Binary, Decimal, Hexadecimal Converter" />
      <meta property="og:description" content="Free online Base Converter tool. Convert numbers between binary, decimal, hexadecimal, octal, base32, base64 and other numeral systems instantly." />
      <link rel="canonical" href="https://grocktool.com/number-tools/number-base-converter" />
     

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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                <Cpu size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Number Systems • Computer Science • Programming</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Base Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Numbers Between Binary, Decimal, Hexadecimal & More • Supports Base 2 to 36
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Binary size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Binary (Base 2)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Calculator size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Decimal (Base 10)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Code size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Hexadecimal (Base 16)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Cpu size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Base 2 to 36</span>
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
                  <div className="text-xs text-muted-foreground">Quick Base Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setInputValue('255');
                        setFromBase(10);
                        setToBase(16);
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      255 (DEC) → HEX
                    </button>
                    <button
                      onClick={() => {
                        setInputValue('10101101');
                        setFromBase(2);
                        setToBase(10);
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      10101101 (BIN) → DEC
                    </button>
                    <button
                      onClick={() => {
                        setInputValue('FF');
                        setFromBase(16);
                        setToBase(2);
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      FF (HEX) → BINARY
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
                        Base Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Zap size={12} />
                      <span>Real-time conversion</span>
                    </div>
                  </div>

                  {/* Base Selection Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* From Base */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          From Base
                        </label>
                        
                        {/* Common Bases */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                          {commonBases.map((base) => (
                            <button
                              key={base.value}
                              onClick={() => setFromBase(base.value)}
                              className={`p-2 rounded-lg border transition-all text-xs ${
                                fromBase === base.value 
                                  ? 'bg-accent text-accent-foreground border-accent' 
                                  : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                              }`}
                            >
                              <div className="flex items-center gap-1 justify-center">
                                {base.icon}
                                {base.value}
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* All Bases Select */}
                        <select
                          value={fromBase}
                          onChange={(e) => setFromBase(parseInt(e.target.value))}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                        >
                          {allBases.map((base) => (
                            <option key={base} value={base}>
                              Base {base} ({getCharSet(base)})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Input Field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Input Value (Base {fromBase})
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={`Enter value in base ${fromBase}`}
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg font-mono"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Cpu size={16} className="text-muted-foreground" />
                          </div>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="bg-blue-500 text-white rounded-full p-1">
                              <Zap size={10} />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Valid characters: {getCharSet(fromBase)}
                        </p>
                      </div>
                    </div>

                    {/* To Base */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          To Base
                        </label>
                        
                        {/* Common Bases */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                          {commonBases.map((base) => (
                            <button
                              key={base.value}
                              onClick={() => setToBase(base.value)}
                              className={`p-2 rounded-lg border transition-all text-xs ${
                                toBase === base.value 
                                  ? 'bg-accent text-accent-foreground border-accent' 
                                  : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                              }`}
                            >
                              <div className="flex items-center gap-1 justify-center">
                                {base.icon}
                                {base.value}
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* All Bases Select */}
                        <select
                          value={toBase}
                          onChange={(e) => setToBase(parseInt(e.target.value))}
                          className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                        >
                          {allBases.map((base) => (
                            <option key={base} value={base}>
                              Base {base} ({getCharSet(base)})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Swap Button */}
                      <button
                        onClick={swapBases}
                        className="w-full p-3 bg-secondary text-secondary-foreground rounded-lg border border-border hover:bg-secondary/80 transition-colors text-sm flex items-center justify-center gap-2"
                      >
                        <Cpu size={14} />
                        ↕ Swap Bases
                      </button>
                    </div>
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
                      onClick={convert}
                      disabled={!inputValue.trim()}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Calculator size={16} className="sm:w-4 sm:h-4" />
                      Convert Base
                    </button>
                    <button
                      onClick={clearFields}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base font-medium"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Clear All
                    </button>
                  </div>

                  {/* Quick Conversions */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Quick Conversions
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {commonConversions.map((conv, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputValue(conv.input);
                            setFromBase(conv.fromBase);
                            setToBase(conv.toBase);
                          }}
                          className="p-2 text-xs bg-secondary text-secondary-foreground rounded border border-border hover:bg-secondary/80 transition-colors text-center"
                        >
                          {conv.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sample Values */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Sample Values (Base {fromBase})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(sampleValues[fromBase as keyof typeof sampleValues] || []).map((value, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(value)}
                          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded border border-border hover:bg-secondary/80 transition-colors"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
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
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Base Conversion Results</h3>
                      <p className="text-sm text-muted-foreground">
                        Converted from base {fromBase} to base {toBase}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowSteps(!showSteps)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors text-xs hover:bg-secondary/50 rounded-lg"
                      >
                        {showSteps ? 'Hide Steps' : 'Show Steps'}
                      </button>
                      <button
                        onClick={copyResult}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded-lg"
                        title="Copy results"
                      >
                        <Copy size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Main Result Display */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-muted-foreground mb-2 text-center">
                        Base {toBase} Result
                      </div>
                      <div className="text-3xl font-bold text-foreground text-center font-mono break-all">
                        {result}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center">
                        Original: {inputValue} (base {fromBase}) • Valid characters: {getCharSet(toBase)}
                      </div>
                    </div>

                    {/* Conversion Steps */}
                    {showSteps && conversionSteps.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-foreground">Step-by-Step Conversion</h4>
                        <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 p-4 rounded-lg border border-border">
                          <div className="space-y-3 text-sm">
                            {conversionSteps.map((step, index) => (
                              <div key={index} className="font-mono text-foreground p-2 bg-card/50 rounded">
                                {step}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Conversion Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Input</div>
                        <div className="text-lg font-semibold text-foreground font-mono">
                          {inputValue} <span className="text-muted-foreground">(base {fromBase})</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Character set: {getCharSet(fromBase)}</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/5 to-purple-600/5 p-4 rounded-lg border border-purple-500/20">
                        <div className="text-sm text-muted-foreground">Output</div>
                        <div className="text-lg font-semibold text-foreground font-mono">
                          {result} <span className="text-muted-foreground">(base {toBase})</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Character set: {getCharSet(toBase)}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Base Systems Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Cpu size={18} className="text-green-600" />
                  Number Systems Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Common Base Systems */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Binary size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Common Base Systems</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Binary (Base 2)</strong>: Uses 0 and 1. Foundation of all digital computing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Octal (Base 8)</strong>: Uses 0-7. Used in Unix file permissions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Decimal (Base 10)</strong>: Uses 0-9. Standard for human mathematics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Hexadecimal (Base 16)</strong>: Uses 0-9 and A-F. Standard in programming</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Base32/Base64</strong>: Data encoding for web and email systems</span>
                      </div>
                    </div>
                  </div>

                  {/* Character Sets */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <Code size={16} className="text-purple-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Character Sets by Base</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Base 2</strong>: 0, 1</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Base 10</strong>: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Base 16</strong>: 0-9, A, B, C, D, E, F</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Base 32</strong>: 0-9, A-V (excluding I, L, O, U)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Base 36</strong>: 0-9, A-Z (maximum base with alphanumeric)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Base Conversion Examples</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">255 (DEC)</span>
                      <span className="font-mono">FF (HEX)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">10101101 (BIN)</span>
                      <span className="font-mono">173 (DEC)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">777 (OCT)</span>
                      <span className="font-mono">511 (DEC)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">FF (HEX)</span>
                      <span className="font-mono">11111111 (BIN)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Info & Examples */}
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
                    <History size={18} className="text-blue-600" />
                    Conversion History
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
                    <p className="text-sm text-muted-foreground">No conversion history yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Your recent conversions will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {history.map((item, index) => (
                      <div key={index} className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-foreground">
                            Base {item.fromBase} → Base {item.toBase}
                          </span>
                          <span className="text-xs text-muted-foreground bg-card px-2 py-1 rounded">{index + 1}</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Input:</span>
                            <span className="font-mono text-foreground">{item.input}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Output:</span>
                            <span className="font-mono text-foreground font-semibold text-blue-600">{item.result}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Quick Reference */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Cpu size={16} className="text-green-600" />
                  Hexadecimal Quick Reference
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded text-center border border-blue-500/20">
                      <div className="font-mono text-foreground font-bold">A</div>
                      <div className="text-xs text-muted-foreground">= 10 (DEC)</div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded text-center border border-blue-500/20">
                      <div className="font-mono text-foreground font-bold">F</div>
                      <div className="text-xs text-muted-foreground">= 15 (DEC)</div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded text-center border border-purple-500/20">
                      <div className="font-mono text-foreground font-bold">10</div>
                      <div className="text-xs text-muted-foreground">= 16 (DEC)</div>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded text-center border border-purple-500/20">
                      <div className="font-mono text-foreground font-bold">FF</div>
                      <div className="text-xs text-muted-foreground">= 255 (DEC)</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                    <h5 className="text-xs font-medium text-foreground mb-1">Quick Tip:</h5>
                    <p className="text-xs text-muted-foreground">
                      Each hexadecimal digit represents 4 binary bits. FF (HEX) = 11111111 (BIN) = 255 (DEC)
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Real-World Examples */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Code size={18} className="text-amber-600" />
                  Real-World Applications
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="text-xs sm:text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Computer Programming</strong>: Memory addresses in hexadecimal (0x7FFF)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Digital Electronics</strong>: Binary for logic gates and circuits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Web Development</strong>: Base64 for image data URLs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Network Administration</strong>: IPv6 addresses in hexadecimal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span><strong>Cryptography</strong>: Different bases for encoding keys</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Why Base Conversion Matters:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Essential for low-level programming and debugging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Required for understanding computer architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Critical for data encoding and transmission</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Fundamental in digital electronics and circuit design</span>
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
                    <Cpu size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Base Converter - Features & Technical Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Base Converter is a comprehensive tool for converting numbers between different numeral systems (bases), supporting conversions from base 2 (binary) through base 36. It provides accurate, real-time conversions between commonly used bases like binary, octal, decimal, hexadecimal, base32, and base64, along with detailed step-by-step explanations of the conversion process. The tool is designed for programmers, computer science students, digital engineers, and anyone working with different number systems in computing, mathematics, or electronics. Beyond basic conversion, it includes input validation for each base's character set, conversion history tracking, and educational explanations about how different number systems work and their practical applications in technology.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Wide Base Support</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Supports conversions between bases 2 through 36, covering all standard numeral systems used in computing, programming, and mathematics with proper character set validation.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Code size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Step-by-Step Explanations</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Provides detailed conversion steps showing the mathematical process, making it an excellent educational resource for understanding how base conversion works algorithmically.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <History size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Professional Features</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Includes conversion history, quick base swapping, sample values for each base, error validation, and copy functionality for seamless workflow in professional environments.</p>
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
                    <Cpu size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Base Conversion Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💻 Programming & Software Development</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Memory Addressing</strong>: Converting between decimal and hexadecimal memory addresses (0x7FFF → 32767) for low-level programming and debugging</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Bitwise Operations</strong>: Understanding binary representations for bit masks, flags, and bit manipulation in programming languages</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Color Codes</strong>: Converting between decimal RGB values and hexadecimal color codes used in web design (#FF0000 → 255,0,0)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Network Programming</strong>: Working with IPv6 addresses in hexadecimal format and converting to binary for subnet calculations</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔧 Computer Science & Digital Electronics</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Digital Circuit Design</strong>: Converting between binary and hexadecimal for representing logic gate outputs and digital signals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Microprocessor Programming</strong>: Working with assembly language instructions that use hexadecimal opcodes and binary machine code</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Data Storage</strong>: Understanding binary representations for file sizes, memory capacities, and data encoding schemes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Error Detection</strong>: Converting between bases for checksum calculations, parity bits, and error-correcting codes</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🌐 Web Development & Data Processing</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Data Encoding</strong>: Converting binary data to Base64 for embedding images in HTML/CSS or transmitting data via APIs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>URL Encoding</strong>: Working with percent-encoded characters that use hexadecimal values (%20 → space character)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Database Management</strong>: Converting between different number representations for data storage optimization and query processing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Security Applications</strong>: Converting encryption keys between different bases for cryptographic algorithms and security protocols</span>
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
                  <h2 className="text-xl font-bold text-foreground">How to Use Base Converter - Complete Guide</h2>
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
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Select Source Base</div>
                            <div className="text-sm text-muted-foreground">Choose the base of your input number from common bases (Binary, Decimal, Hexadecimal) or select any base from 2 to 36.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Your Number</div>
                            <div className="text-sm text-muted-foreground">Input the number in the selected base. Use quick conversion buttons or sample values for common conversions.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Select Target Base</div>
                            <div className="text-sm text-muted-foreground">Choose the base you want to convert to. Use the swap button to quickly exchange source and target bases.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Convert</div>
                            <div className="text-sm text-muted-foreground">Click the convert button to perform the base conversion. The tool validates input and shows errors for invalid characters.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
                          <div>
                            <div className="font-medium text-foreground">Review & Use Results</div>
                            <div className="text-sm text-muted-foreground">Examine the converted result, view step-by-step explanation, copy to clipboard, or check conversion history.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Base Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Binary size={12} className="text-accent" />
                          </div>
                          <span><strong>Use Quick Conversions</strong>: Try pre-configured conversions like 255→HEX or FF→DEC for common programming values</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Code size={12} className="text-accent" />
                          </div>
                          <span><strong>Check Character Sets</strong>: Each base has specific valid characters. Base 2: 0-1, Base 16: 0-9,A-F, Base 36: 0-9,A-Z</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <History size={12} className="text-accent" />
                          </div>
                          <span><strong>Utilize History</strong>: Track your recent conversions for reference or to continue working with previous results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span><strong>Copy Formatted Results</strong>: Copy results with both input and output information for documentation or sharing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Cpu size={12} className="text-accent" />
                          </div>
                          <span><strong>Learn from Steps</strong>: Enable step-by-step explanation to understand the mathematical conversion process</span>
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
                  <h2 className="text-xl font-bold text-foreground">Base Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Base Conversion Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Input (Base)</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Output (Base)</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Mathematical Process</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Practical Use</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">10101101 (Base 2)</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">173 (Base 10)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">1×2⁷ + 0×2⁶ + 1×2⁵ + 0×2⁴ + 1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 128+0+32+0+8+4+0+1 = 173</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Binary to decimal conversion for understanding bit values</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">255 (Base 10)</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">FF (Base 16)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">255 ÷ 16 = 15 remainder 15 → F (15) units, F (15) sixteens = FF</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">RGB color values to hexadecimal for web design</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">777 (Base 8)</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">511 (Base 10)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">7×8² + 7×8¹ + 7×8⁰ = 7×64 + 7×8 + 7×1 = 448 + 56 + 7 = 511</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Unix file permission representation (rwxrwxrwx)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">FF (Base 16)</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">11111111 (Base 2)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">F=15=1111 (binary), F=15=1111 (binary) → 1111 1111 = 11111111</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Memory addresses to binary for bit manipulation</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">1000 (Base 10)</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">3E8 (Base 16)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">1000 ÷ 16 = 62 remainder 8 → 8 units, 62÷16=3 remainder 14 → E (14) sixteens, 3 two-hundred-fifty-sixes = 3E8</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Decimal values to hex for programming constants</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">Hello (Base64-like)</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">SGVsbG8= (Base64)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Each character converted to 6-bit binary, regrouped to 8-bit bytes, then to ASCII</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Text encoding for data transmission and storage</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Conversion Example: Binary to Hexadecimal</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Convert binary number 110101101 to hexadecimal

Step 1: Understand the bases
Binary: Base 2 (characters: 0,1)
Hexadecimal: Base 16 (characters: 0-9, A-F)

Step 2: Group binary digits
Hexadecimal uses 4 binary digits per hex digit
110101101 → Group from right: 1 1010 1101
Add leading zero: 0001 1010 1101

Step 3: Convert each 4-bit group to hex
0001 (binary) = 1 (hexadecimal)
1010 (binary) = A (hexadecimal) [10 decimal = A hex]
1101 (binary) = D (hexadecimal) [13 decimal = D hex]

Step 4: Combine hex digits
1 A D = 1AD (hexadecimal)

Step 5: Verify through decimal
Binary 110101101 to decimal:
1×2⁸ + 1×2⁷ + 0×2⁶ + 1×2⁵ + 0×2⁴ + 1×2³ + 1×2² + 0×2¹ + 1×2⁰
= 256 + 128 + 0 + 32 + 0 + 8 + 4 + 0 + 1 = 429 (decimal)

Hexadecimal 1AD to decimal:
1×16² + A×16¹ + D×16⁰
= 1×256 + 10×16 + 13×1
= 256 + 160 + 13 = 429 (decimal) ✓

Step 6: Practical application
Binary 110101101 could represent:
- A memory address in computer hardware
- A color value in certain graphics systems
- A configuration setting in digital electronics
- A cryptographic key fragment

Step 7: Alternative verification
Convert binary to decimal first:
110101101 (binary) = 429 (decimal)

Convert decimal to hexadecimal:
429 ÷ 16 = 26 remainder 13 (D)
26 ÷ 16 = 1 remainder 10 (A)
1 ÷ 16 = 0 remainder 1
Result: 1 A D = 1AD ✓

Step 8: Character set validation
Binary input: 110101101 → All characters are 0 or 1 ✓
Hexadecimal output: 1AD → All characters are 0-9,A-F ✓

Step 9: Significant programming application
In C/C++ programming, this would be represented as:
Binary: 0b110101101
Hexadecimal: 0x1AD
Decimal: 429

All three representations refer to the same value in memory.

Final Result:
Binary: 110101101
Hexadecimal: 1AD
Decimal: 429

Key Conversion Principles:
✓ Group binary in 4-bit chunks for hex conversion
✓ Pad with leading zeros if necessary
✓ Remember hex digits: A=10, B=11, C=12, D=13, E=14, F=15
✓ Verify through decimal intermediate conversion
✓ Check character set validity for each base`}
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
                    <Cpu size={20} className="text-blue-600" />
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

// Helper function to describe base uses
function getBaseUses(base: number): string {
  switch (base) {
    case 2: return 'Computers, binary logic';
    case 8: return 'Unix permissions, shorthand';
    case 10: return 'Everyday mathematics';
    case 16: return 'Programming, memory addresses';
    case 32: return 'Data encoding, URLs';
    case 64: return 'Data encoding, emails';
    default: return 'Specialized applications';
  }
}