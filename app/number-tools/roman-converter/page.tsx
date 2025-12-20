'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, History, Info, BookOpen, ChevronUp, ChevronDown, ChevronRight, Hash, Percent, DollarSign, TrendingUp, Globe, SortAsc, FileText, Maximize2, Shuffle, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

export default function RomanNumberConverterPage() {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [conversionType, setConversionType] = useState<'toRoman' | 'fromRoman'>('toRoman');
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<{ input: string; output: string; type: string }[]>([]);
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
    { name: 'LCM/HCF Calculator', path: '/number-tools/lcm-hcf-calculator', icon: SortAsc },
    { name: 'Number to Words', path: '/number-tools/number-to-words', icon: FileText },
    { name: 'Scientific Notation', path: '/number-tools/scientific-notation', icon: Maximize2 },
    { name: 'Base Converter', path: '/number-tools/number-base-converter', icon: Globe },
    { name: 'Number Rounding', path: '/number-tools/rounding', icon: TrendingUp },
    { name: 'Random Generator', path: '/number-tools/random-generator', icon: Shuffle }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What are Roman numerals and how do they work?",
      answer: "Roman numerals are a numeral system originating from ancient Rome, using combinations of letters from the Latin alphabet (I, V, X, L, C, D, M) to represent numbers. The system uses additive and subtractive principles: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Numbers are formed by combining these symbols, with smaller values placed before larger ones indicating subtraction (IV=4, IX=9), and after indicating addition (VI=6, XI=11)."
    },
    {
      question: "Why is 3999 the maximum number for Roman numerals?",
      answer: "The maximum number typically represented in standard Roman numeral notation is 3999 (MMMCMXCIX). This limitation exists because there's no standard symbol for numbers 4000 and above in classical Roman numerals. While extensions exist (like using a bar over numerals to indicate multiplication by 1000), most modern applications and this converter stick to the conventional system up to 3999 for simplicity and historical accuracy."
    },
    {
      question: "Can Roman numerals represent zero or decimal numbers?",
      answer: "No, Roman numerals cannot represent zero or decimal numbers. The ancient Roman numeral system had no concept of zero, and fractions were represented differently using special symbols. Roman numerals are strictly for whole positive integers. This converter only handles whole numbers from 1 to 3999 when converting to Roman numerals, and valid Roman numeral sequences when converting to numbers."
    },
    {
      question: "What are the common rules for writing Roman numerals?",
      answer: "Key rules include: 1) Numerals must be written from largest to smallest (e.g., XVI=16, not XIVI), 2) I, X, C can be repeated up to 3 times (e.g., III=3, XXX=30, but not IIII for 4), 3) V, L, D cannot be repeated, 4) Subtraction only allowed with I before V or X, X before L or C, C before D or M, 5) Only one smaller numeral can precede a larger one (e.g., IV=4, but not IIV for 3)."
    },
    {
      question: "Where are Roman numerals still used today?",
      answer: "Roman numerals are still widely used in: 1) Clock and watch faces, 2) Book volumes, chapters, and page numbers, 3) Movie production years and sequel numbering, 4) Monarch and Pope names (e.g., King Henry VIII, Pope John Paul II), 5) Monument inscriptions and building cornerstones, 6) Sporting events (Super Bowl LVII), 7) Musical chord notation, and 8) Outlines and lists in formal documents."
    }
  ];

  // Roman numeral values
  const romanNumerals = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  // Convert number to Roman numeral
  const numberToRoman = (num: number): string => {
    if (num <= 0 || num > 3999) {
      throw new Error('Number must be between 1 and 3999');
    }

    let result = '';
    let remaining = num;

    for (const { value, numeral } of romanNumerals) {
      while (remaining >= value) {
        result += numeral;
        remaining -= value;
      }
    }

    return result;
  };

  // Convert Roman numeral to number
  const romanToNumber = (roman: string): number => {
    const validRomanRegex = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;
    
    if (!validRomanRegex.test(roman)) {
      throw new Error('Invalid Roman numeral');
    }

    let result = 0;
    let i = 0;
    const upperRoman = roman.toUpperCase();

    while (i < upperRoman.length) {
      const currentChar = upperRoman[i];
      const nextChar = upperRoman[i + 1];
      let found = false;

      // Check for two-character numerals first
      for (const { value, numeral } of romanNumerals) {
        if (numeral.length === 2 && currentChar + nextChar === numeral) {
          result += value;
          i += 2;
          found = true;
          break;
        }
      }

      if (found) continue;

      // Check for single-character numerals
      for (const { value, numeral } of romanNumerals) {
        if (numeral.length === 1 && currentChar === numeral) {
          result += value;
          i += 1;
          found = true;
          break;
        }
      }

      if (!found) {
        throw new Error('Invalid Roman numeral sequence');
      }
    }

    return result;
  };

  // Perform conversion
  const convert = () => {
    setError('');
    setResult('');

    if (!inputValue.trim()) {
      setError('Please enter a value to convert');
      return;
    }

    try {
      let output = '';
      
      if (conversionType === 'toRoman') {
        const number = parseInt(inputValue);
        if (isNaN(number)) {
          throw new Error('Please enter a valid number');
        }
        output = numberToRoman(number);
        
        // Add to history
        setHistory(prev => [{
          input: inputValue,
          output: output,
          type: 'Number to Roman'
        }, ...prev.slice(0, 9)]); // Keep last 10 items
      } else {
        output = romanToNumber(inputValue.toUpperCase()).toString();
        
        // Add to history
        setHistory(prev => [{
          input: inputValue.toUpperCase(),
          output: output,
          type: 'Roman to Number'
        }, ...prev.slice(0, 9)]);
      }

      setResult(output);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  // Clear all fields
  const clearFields = () => {
    setInputValue('');
    setResult('');
    setError('');
  };

  // Copy result to clipboard
  const copyResult = async () => {
    if (result) {
      const text = `${conversionType === 'toRoman' ? 'Number to Roman' : 'Roman to Number'}:\nInput: ${inputValue}\nOutput: ${result}`;
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

  // Sample conversions for quick testing
  const sampleConversions = [
    { number: '2024', roman: 'MMXXIV' },
    { number: '1000', roman: 'M' },
    { number: '499', roman: 'CDXCIX' },
    { number: '88', roman: 'LXXXVIII' },
    { number: '14', roman: 'XIV' },
    { number: '3999', roman: 'MMMCMXCIX' },
    { number: '666', roman: 'DCLXVI' },
    { number: '49', roman: 'XLIX' }
  ];

  // Roman numeral rules
  const romanRules = [
    { numeral: 'I', value: '1' },
    { numeral: 'IV', value: '4' },
    { numeral: 'V', value: '5' },
    { numeral: 'IX', value: '9' },
    { numeral: 'X', value: '10' },
    { numeral: 'XL', value: '40' },
    { numeral: 'L', value: '50' },
    { numeral: 'XC', value: '90' },
    { numeral: 'C', value: '100' },
    { numeral: 'CD', value: '400' },
    { numeral: 'D', value: '500' },
    { numeral: 'CM', value: '900' },
    { numeral: 'M', value: '1000' }
  ];

  // Set example conversion
  const setExampleConversion = (exampleType: string) => {
    switch(exampleType) {
      case 'currentYear':
        setInputValue('2024');
        setConversionType('toRoman');
        break;
      case 'century':
        setInputValue('C');
        setConversionType('fromRoman');
        break;
      case 'largeNumber':
        setInputValue('3999');
        setConversionType('toRoman');
        break;
      case 'subtractive':
        setInputValue('XLIX');
        setConversionType('fromRoman');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      
      <title>Roman Number Converter | Convert Roman Numerals to Numbers | GrockTool.com</title>
      <meta name="description" content="Free Roman Numeral Converter - Convert between Roman numerals and Arabic numbers instantly. Supports numbers 1-3999 with validation, history tracking, and educational guide." />
      <meta name="keywords" content="roman numeral converter, roman to number, number to roman, roman numerals calculator, ancient number converter, roman numeral translator" />
      <meta property="og:title" content="Roman Number Converter | Convert Roman Numerals to Numbers" />
      <meta property="og:description" content="Free Roman Numeral Converter - Convert between Roman numerals and Arabic numbers instantly. Supports numbers 1-3999 with validation and history tracking." />
      <link rel="canonical" href="https://grocktool.com/number-tools/roman-converter" />
     

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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-2 rounded-full mb-4 border border-amber-500/20">
                <Hash size={16} className="text-amber-600" />
                <span className="text-sm font-medium text-amber-600">Ancient Number System • Two-Way Conversion • Educational Tool</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Roman Number Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Roman Numerals to Arabic Numbers & Vice Versa • Complete Guide with Examples
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Hash size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Two-Way Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <History size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Conversion History</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <BookOpen size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Educational Guide</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Calculator size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Real-Time Validation</span>
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
                  <div className="text-xs text-muted-foreground">Quick Example Conversions:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setExampleConversion('currentYear')}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Hash size={12} />
                      2024 → Roman
                    </button>
                    <button
                      onClick={() => setExampleConversion('century')}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Hash size={12} />
                      C → Number
                    </button>
                    <button
                      onClick={() => setExampleConversion('largeNumber')}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Hash size={12} />
                      3999 → Roman
                    </button>
                    <button
                      onClick={() => setExampleConversion('subtractive')}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Hash size={12} />
                      XLIX → Number
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Converter Card */}
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
                        Roman Numeral Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Calculator size={12} />
                      <span>Real-time validation</span>
                    </div>
                  </div>

                  {/* Conversion Type Selector */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setConversionType('toRoman')}
                      className={`p-3 rounded-lg border transition-all ${
                        conversionType === 'toRoman' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-accent shadow-md' 
                          : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-center text-sm font-medium">
                        <Calculator size={16} />
                        Number → Roman
                      </div>
                    </button>
                    <button
                      onClick={() => setConversionType('fromRoman')}
                      className={`p-3 rounded-lg border transition-all ${
                        conversionType === 'fromRoman' 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-accent shadow-md' 
                          : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 justify-center text-sm font-medium">
                        <Calculator size={16} />
                        Roman → Number
                      </div>
                    </button>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      {conversionType === 'toRoman' ? 'Enter Number (1-3999)' : 'Enter Roman Numeral'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={conversionType === 'toRoman' ? 'e.g., 2024' : 'e.g., MMXXIV'}
                        className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg font-mono"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Hash size={16} className="text-muted-foreground" />
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <Hash size={10} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {conversionType === 'toRoman' 
                        ? 'Enter a number between 1 and 3999' 
                        : 'Enter valid Roman numerals (I, V, X, L, C, D, M) - case insensitive'
                      }
                    </p>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                      <p className="text-destructive text-sm text-center font-medium">{error}</p>
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
                      Convert Now
                    </button>
                    <button
                      onClick={clearFields}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base font-medium"
                    >
                      <RotateCcw size={16} className="sm:w-4 sm:h-4" />
                      Clear All
                    </button>
                  </div>

                  {/* Quick Samples */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Quick Samples
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {sampleConversions.map((sample, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (conversionType === 'toRoman') {
                              setInputValue(sample.number);
                            } else {
                              setInputValue(sample.roman);
                            }
                          }}
                          className="p-2 text-xs bg-secondary text-secondary-foreground rounded-lg border border-border hover:bg-secondary/80 transition-colors text-center font-mono"
                        >
                          {conversionType === 'toRoman' ? sample.number : sample.roman}
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
                      <h3 className="text-lg font-semibold text-foreground">Conversion Result</h3>
                      <p className="text-sm text-muted-foreground">
                        {conversionType === 'toRoman' 
                          ? `Arabic to Roman Numeral Conversion` 
                          : `Roman to Arabic Number Conversion`
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

                  <div className="space-y-4">
                    {/* Main Result Display */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-2">
                        {conversionType === 'toRoman' ? 'Roman Numeral' : 'Arabic Number'}
                      </div>
                      <div className="text-3xl font-bold text-foreground font-mono">
                        {result}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {conversionType === 'toRoman' 
                          ? `${inputValue} in Roman numerals` 
                          : `${inputValue.toUpperCase()} in Arabic numbers`
                        }
                      </div>
                    </div>

                    {/* Conversion Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Input Value</div>
                        <div className="text-lg font-semibold text-foreground font-mono">{inputValue}</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm text-muted-foreground">Converted Result</div>
                        <div className="text-lg font-semibold text-foreground font-mono">{result}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Roman Numerals Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-amber-600" />
                  Roman Numerals Complete Guide
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-4">
                  {romanRules.map((rule, index) => (
                    <div key={index} className="text-center p-3 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/20">
                      <div className="text-xl font-bold text-foreground font-mono">{rule.numeral}</div>
                      <div className="text-xs text-muted-foreground mt-1">= {rule.value}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Essential Roman Numeral Rules:</h4>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Numerals must be written from largest to smallest (e.g., XVI=16, not XIVI)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>I, X, C can be repeated up to 3 times (III=3, XXX=30, CCC=300)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>V, L, D cannot be repeated - only appear once in a number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Subtraction only with I before V or X, X before L or C, C before D or M</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Only one smaller numeral can precede a larger one (IV=4, not IIV for 3)</span>
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
                    Conversion History
                  </h3>
                  {history.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors hover:bg-secondary/50 rounded px-2 py-1"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {history.length === 0 ? (
                  <div className="text-center py-8">
                    <History size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No conversion history yet</p>
                    <p className="text-xs text-muted-foreground mt-1">Start converting to see history here</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {history.map((item, index) => (
                      <div key={index} className="p-3 bg-gradient-to-r from-secondary/30 to-secondary/10 rounded-lg border border-border">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-foreground bg-accent/10 px-2 py-1 rounded">{item.type}</span>
                          <span className="text-xs text-muted-foreground">#{index + 1}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Input:</span>
                            <span className="font-mono text-foreground bg-secondary/50 px-2 py-1 rounded">{item.input}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Output:</span>
                            <span className="font-mono text-foreground font-semibold bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-2 py-1 rounded">{item.output}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Info size={18} className="text-purple-600" />
                  About Roman Numerals
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Roman numerals originated in ancient Rome around 500 BC and were used throughout the Roman Empire. 
                    This numeral system remained the standard in Europe until the late Middle Ages when Arabic numerals gradually replaced it.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>Maximum number in standard system: 3999 (MMMCMXCIX)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>No concept of zero - system starts from I (1)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>Case insensitive in modern usage (IV = iv = Iv)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>Combines additive and subtractive principles</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Common Modern Uses:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Clock and watch faces (I-XII)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Book volumes, chapters, and page numbers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Movie production years and sequel numbering</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Monument inscriptions and building cornerstones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Monarch and Pope names (Henry VIII, Pope John Paul II)</span>
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
                  <div className="bg-amber-500/10 p-2 rounded-lg">
                    <Hash size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Roman Numeral Converter - Features & Historical Significance</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Roman Numeral Converter provides accurate two-way conversion between Arabic numbers (1,2,3...) and Roman numerals (I, II, III...). It supports the complete classical Roman numeral system from 1 to 3999, following authentic ancient Roman conventions with proper validation of numeral sequences. The tool implements precise algorithms that respect historical rules including additive notation (VI = 5 + 1 = 6), subtractive notation (IV = 5 - 1 = 4), and the correct ordering of symbols from largest to smallest. Beyond basic conversion, it serves as an educational resource explaining the history, rules, and modern applications of this ancient numbering system that shaped Western mathematics for centuries.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Two-Way Conversion</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Convert Arabic numbers to Roman numerals and vice versa with 100% accuracy following historical rules and conventions.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <History size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Smart Validation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Advanced validation ensures only correct Roman numeral sequences are accepted, with helpful error messages for invalid inputs.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Educational Resource</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Complete guide to Roman numeral rules, history, and modern applications, making it perfect for students and history enthusiasts.</p>
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
                    <Info size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Practical Roman Numeral Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📚 Educational & Academic Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Mathematics classrooms teaching ancient number systems and historical mathematics concepts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>History students studying ancient Rome, Roman Empire, and classical civilizations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Archaeology research involving ancient inscriptions, artifacts, and historical documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Latin language studies and classical literature analysis requiring numeral translation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏛️ Historical & Cultural Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Reading dates on historical buildings, monuments, and architectural landmarks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Understanding movie copyright years and film production dates in opening credits</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Deciphering book publication dates, volume numbers, and chapter numbering systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Interpreting clock and watch faces that use Roman numerals for time display</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🎭 Modern Professional Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Publishing industry for book volumes, prefaces, and appendix numbering conventions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Legal documents using Roman numerals for sections, clauses, and formal outlines</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Film and television production for sequel numbering and episode identification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Academic papers and theses requiring traditional outline formatting with Roman numerals</span>
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
                    <BookOpen size={20} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Roman Numeral Converter - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Select Conversion Type</div>
                            <div className="text-sm text-muted-foreground">Choose between "Number → Roman" to convert Arabic numbers or "Roman → Number" to decode Roman numerals.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Your Value</div>
                            <div className="text-sm text-muted-foreground">Input either an Arabic number (1-3999) or a valid Roman numeral sequence. Use quick samples for common values.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Click Convert</div>
                            <div className="text-sm text-muted-foreground">Press the convert button to instantly get accurate conversion results with validation for correctness.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Review & Save Results</div>
                            <div className="text-sm text-muted-foreground">View conversion results, copy to clipboard, and check history for previous conversions.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Tips for Roman Numerals</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Hash size={12} className="text-accent" />
                          </div>
                          <span>Roman numerals are case-insensitive - IV, iv, and Iv all represent 4</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <History size={12} className="text-accent" />
                          </div>
                          <span>Numbers above 3999 require special notation (bar over numerals)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span>Use copy feature to save conversions for academic work or documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <BookOpen size={12} className="text-accent" />
                          </div>
                          <span>Refer to the Roman numeral guide for proper symbol combinations and rules</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span>For subtractive notation, remember only I before V/X, X before L/C, C before D/M</span>
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
                  <h2 className="text-xl font-bold text-foreground">Roman Numeral Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Roman Numeral Conversions</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Arabic Number</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Roman Numeral</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Explanation</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">1</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">I</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Basic unit, can be repeated up to 3 times (I, II, III)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">4</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">IV</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Subtractive notation: I (1) before V (5) = 5 - 1 = 4</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">9</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">IX</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Subtractive notation: I (1) before X (10) = 10 - 1 = 9</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">49</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">XLIX</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">40 (XL) + 9 (IX) = 49. Note: Not IL (invalid)</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">88</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">LXXXVIII</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">50 (L) + 10+10+10 (XXX) + 5 (V) + 1+1+1 (III) = 88</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">499</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">CDXCIX</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">400 (CD) + 90 (XC) + 9 (IX) = 499. Complex but correct</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">2024</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">MMXXIV</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">1000+1000 (MM) + 10+10 (XX) + 4 (IV) = 2024</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">3999</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">MMMCMXCIX</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Maximum standard Roman numeral: 3000 (MMM) + 900 (CM) + 90 (XC) + 9 (IX)</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Conversion Example</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Convert 1776 to Roman numerals and verify by converting back

Step 1: Break down the number 1776
1776 = 1000 + 700 + 70 + 6
      = 1000 + (500 + 200) + (50 + 20) + (5 + 1)

Step 2: Convert each part to Roman numerals
1000 = M
700  = 500 + 200 = D + CC = DCC (not 500+100+100 = DCC)
70   = 50 + 20 = L + XX = LXX
6    = 5 + 1 = V + I = VI (not 4+2, since 4 would be IV)

Step 3: Combine from largest to smallest
M + DCC + LXX + VI = MDCCLXXVI

Step 4: Verify by converting MDCCLXXVI back to number
M = 1000
D = 500
C = 100
C = 100  (Total so far: 1000+500+100+100 = 1700)
L = 50
X = 10
X = 10   (Total: 1700+50+10+10 = 1770)
V = 5
I = 1    (Final: 1770+5+1 = 1776 ✓)

Step 5: Check common errors to avoid
❌ Incorrect: MDCCLXVI (missing X, would be 1766)
❌ Incorrect: MDCCLXXIV (IV=4, would be 1774)
❌ Incorrect: MDCCLXXVII (VII=7, would be 1777)
✅ Correct: MDCCLXXVI (VI=6, equals 1776)

Step 6: Historical significance
1776 = MDCCLXXVI is famous as the year of American Declaration of Independence
This exact Roman numeral appears on the base of the Statue of Liberty and many historical documents

Key Conversion Principles Demonstrated:
✓ Proper breakdown into thousands, hundreds, tens, units
✓ Correct additive notation (DCC = 500+100+100 = 700)
✓ Proper ordering from largest to smallest (M, D, C, C, L, X, X, V, I)
✓ Verification through reverse conversion
✓ Historical context and real-world application
✓ Error checking against common mistakes

Common Mistakes to Avoid:
1. Using subtractive notation incorrectly (e.g., XD for 490 instead of CDXC)
2. Repeating V, L, D (only I, X, C can repeat)
3. Placing smaller numerals incorrectly before larger ones
4. Exceeding repetition limits (IIII instead of IV for 4)
5. Mixing case incorrectly (though modern usage is case-insensitive)

Final Result: 1776 = MDCCLXXVI
This conversion follows all classical Roman numeral rules and can be verified through historical documents.`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </article>

            {/* Frequently Asked Questions - Dropdown */}
            <article className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
              <button
                onClick={() => toggleSection('faqs')}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Info size={20} className="text-purple-600" />
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

            {/* Related Tools Section - Dropdown */}
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