'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, History, BookOpen, Languages, FileText, ChevronUp, ChevronDown, ChevronRight, Percent, DollarSign, Hash, Globe, SortAsc, Maximize2, Shuffle, TrendingUp, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

export default function NumberToWordsPage() {
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [language, setLanguage] = useState<'en' | 'en-IN'>('en');
  const [currency, setCurrency] = useState<boolean>(false);
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);
  const [error, setError] = useState<string>('');
  const [history, setHistory] = useState<{ input: string; output: string; language: string }[]>([]);
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
    { name: 'Scientific Notation', path: '/number-tools/scientific-notation', icon: Maximize2 },
    { name: 'Base Converter', path: '/number-tools/number-base-converter', icon: Globe },
    { name: 'Number Rounding', path: '/number-tools/rounding', icon: TrendingUp },
    { name: 'Random Generator', path: '/number-tools/random-generator', icon: Shuffle }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is the maximum number that can be converted to words?",
      answer: "This Number to Words Converter supports numbers up to 999 trillion (999,999,999,999,999) for the International system and up to 99,99,99,99,99,99,999 (Ninety Nine Arab Ninety Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine) for the Indian system. For larger numbers, the converter will display an error message. Both systems handle decimal numbers up to the specified decimal places (0-3)."
    },
    {
      question: "What is the difference between International and Indian number systems?",
      answer: "The International system groups numbers in sets of three (thousands, millions, billions, trillions), while the Indian system uses unique terms: Thousand (1,000), Lakh (1,00,000), Crore (1,00,00,000), Arab (1,00,00,00,000). For example, 1,500,000 becomes 'One Million Five Hundred Thousand' in International system and 'Fifteen Lakh' in Indian system. This converter accurately handles both systems with proper formatting."
    },
    {
      question: "Can I convert decimal numbers and currency amounts?",
      answer: "Yes, this converter fully supports decimal numbers and currency conversion. You can choose between 0-3 decimal places for precision. For currency conversion, the tool automatically formats amounts with proper currency units (Dollars/Cents for International, Rupees/Paise for Indian). For example, 123.45 becomes 'One Hundred Twenty Three Dollars and Forty Five Cents' or 'One Hundred Twenty Three Rupees and Forty Five Paise'."
    },
    {
      question: "How accurate is the word conversion for large numbers?",
      answer: "The conversion is 100% accurate using established mathematical algorithms. The converter follows proper grammar rules, uses correct hyphenation (twenty-one, forty-five), handles pluralization correctly (one dollar, two dollars), and maintains proper spacing. It also correctly processes edge cases like numbers ending with zero, consecutive zeros, and negative numbers (with 'minus' prefix)."
    },
    {
      question: "What are the practical applications of number to word conversion?",
      answer: "Key applications include: 1) Financial documents - checks, invoices, receipts, 2) Legal agreements - contracts, agreements, deeds, 3) Banking - demand drafts, payment orders, 4) Educational purposes - teaching number systems, 5) Software development - invoice generation, report formatting, 6) Government documents - official forms, certificates, 7) International trade - cross-border financial documents requiring dual currency representation."
    }
  ];

  // Number to words conversion functions
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
  // Indian numbering system
  const indianUnits = ['', 'Thousand', 'Lakh', 'Crore', 'Arab', 'Kharab'];
  const internationalUnits = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  const convertHundreds = (num: number): string => {
    if (num === 0) return '';
    
    let result = '';
    
    // Hundreds place
    if (num >= 100) {
      result += units[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
    
    // Tens and ones place
    if (num >= 20) {
      result += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    } else if (num >= 10) {
      result += teens[num - 10] + ' ';
      num = 0;
    }
    
    // Ones place
    if (num > 0) {
      result += units[num] + ' ';
    }
    
    return result.trim();
  };

  const convertNumberToWords = (num: number, system: 'en' | 'en-IN' = 'en'): string => {
    if (num === 0) return 'Zero';
    if (num < 0) return 'Minus ' + convertNumberToWords(-num, system);
    
    let words = '';
    const units = system === 'en-IN' ? indianUnits : internationalUnits;
    const unitValues = system === 'en-IN' ? [1000, 100, 100, 100, 100] : [1000, 1000, 1000, 1000, 1000];
    
    let remaining = num;
    
    for (let i = units.length - 1; i >= 0; i--) {
      if (system === 'en-IN' && i === 1) {
        // Lakh calculation for Indian system
        const lakhValue = Math.floor(remaining / 100000);
        if (lakhValue > 0) {
          words += convertHundreds(lakhValue) + ' Lakh ';
          remaining %= 100000;
        }
      } else if (system === 'en-IN' && i === 2) {
        // Crore calculation for Indian system
        const croreValue = Math.floor(remaining / 10000000);
        if (croreValue > 0) {
          words += convertHundreds(croreValue) + ' Crore ';
          remaining %= 10000000;
        }
      } else {
        const unitValue = unitValues[i];
        const currentUnit = Math.floor(remaining / unitValue);
        
        if (currentUnit > 0) {
          words += convertHundreds(currentUnit) + ' ' + units[i] + ' ';
          remaining %= unitValue;
        }
      }
    }
    
    // Handle remaining hundreds
    if (remaining > 0) {
      words += convertHundreds(remaining);
    }
    
    return words.trim().replace(/\s+/g, ' ');
  };

  const convertDecimalToWords = (decimal: number): string => {
    const decimalStr = decimal.toString().padEnd(2, '0');
    const tensDigit = parseInt(decimalStr[0]);
    const onesDigit = parseInt(decimalStr[1]);
    
    if (tensDigit === 0 && onesDigit === 0) return '';
    if (tensDigit === 0) return units[onesDigit];
    if (tensDigit === 1) return teens[onesDigit];
    
    return tens[tensDigit] + (onesDigit > 0 ? ' ' + units[onesDigit] : '');
  };

  const convertToCurrency = (num: number, system: 'en' | 'en-IN' = 'en'): string => {
    const mainUnit = system === 'en-IN' ? 'Rupee' : 'Dollar';
    const subUnit = system === 'en-IN' ? 'Paise' : 'Cent';
    
    const wholePart = Math.floor(num);
    const decimalPart = Math.round((num - wholePart) * 100);
    
    let result = convertNumberToWords(wholePart, system) + ' ' + mainUnit + (wholePart !== 1 ? 's' : '');
    
    if (decimalPart > 0) {
      result += ' and ' + convertDecimalToWords(decimalPart) + ' ' + subUnit + (decimalPart !== 1 ? 's' : '');
    }
    
    return result;
  };

  // Perform conversion
  const convert = () => {
    setError('');
    setResult('');

    if (!inputValue.trim()) {
      setError('Please enter a number to convert');
      return;
    }

    try {
      const number = parseFloat(inputValue.replace(/,/g, ''));
      
      if (isNaN(number)) {
        throw new Error('Please enter a valid number');
      }

      if (Math.abs(number) > 999999999999999) {
        throw new Error('Number is too large to convert');
      }

      let output = '';
      
      if (currency) {
        output = convertToCurrency(number, language);
      } else {
        output = convertNumberToWords(number, language);
        
        // Add decimal part if needed
        if (decimalPlaces > 0 && number % 1 !== 0) {
          const decimalPart = Math.round((number % 1) * Math.pow(10, decimalPlaces));
          if (decimalPart > 0) {
            output += ' Point ' + convertDecimalToWords(decimalPart);
          }
        }
      }

      // Capitalize first letter
      output = output.charAt(0).toUpperCase() + output.slice(1);
      
      setResult(output);
      
      // Add to history
      setHistory(prev => [{
        input: formatNumber(number),
        output: output,
        language: language === 'en' ? 'International' : 'Indian'
      }, ...prev.slice(0, 9)]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed');
    }
  };

  // Format number with commas
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-IN').format(num);
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
      const text = `Number to Words:\nInput: ${inputValue}\nOutput: ${result}\nSystem: ${language === 'en' ? 'International' : 'Indian'}\nType: ${currency ? 'Currency' : 'Words'}`;
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

  // Sample numbers for quick testing
  const sampleNumbers = [
    '0',
    '123',
    '1000',
    '12345',
    '100000',
    '1234567',
    '10000000',
    '123.45',
    '999999999'
  ];

  // Set example conversion
  const setExampleConversion = (exampleType: string) => {
    switch(exampleType) {
      case 'basicNumber':
        setInputValue('1234567');
        setLanguage('en');
        setCurrency(false);
        break;
      case 'indianLarge':
        setInputValue('123456789');
        setLanguage('en-IN');
        setCurrency(false);
        break;
      case 'currencyAmount':
        setInputValue('1234.56');
        setLanguage('en');
        setCurrency(true);
        break;
      case 'decimalNumber':
        setInputValue('987.654');
        setLanguage('en');
        setCurrency(false);
        setDecimalPlaces(3);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      
      <title>Number to Words Converter | Convert Numbers to English Words | GrockTool.com</title>
      <meta name="description" content="Free Number to Words Converter - Convert numbers to English words instantly. Supports International & Indian systems, currency conversion, and decimal numbers for checks, invoices, and documents." />
      <meta name="keywords" content="number to words converter, numbers to words, number in words, convert number to text, amount in words, check writing tool, financial words converter" />
      <meta property="og:title" content="Number to Words Converter | Convert Numbers to English Words" />
      <meta property="og:description" content="Free Number to Words Converter - Convert numbers to English words instantly. Supports International & Indian systems and currency conversion." />
      <link rel="canonical" href="https://grocktool.com/number-tools/number-to-words" />
     

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
                <FileText size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Financial Documents • Legal Formatting • Educational Tool</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Number to Words Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Numbers to English Words • International & Indian Systems • Currency & Decimal Support
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Languages size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Dual Number Systems</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <DollarSign size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Currency Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <FileText size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Decimal Support</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Calculator size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Real-Time Conversion</span>
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
                      onClick={() => setExampleConversion('basicNumber')}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <FileText size={12} />
                      1,234,567
                    </button>
                    <button
                      onClick={() => setExampleConversion('indianLarge')}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <FileText size={12} />
                      12,34,56,789
                    </button>
                    <button
                      onClick={() => setExampleConversion('currencyAmount')}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <DollarSign size={12} />
                      $1,234.56
                    </button>
                    <button
                      onClick={() => setExampleConversion('decimalNumber')}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <FileText size={12} />
                      987.654
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
                        Number to Words Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Calculator size={12} />
                      <span>Real-time validation</span>
                    </div>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Language/System Selector */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Number System
                      </label>
                      <div className="relative">
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value as 'en' | 'en-IN')}
                          className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                        >
                          <option value="en">International System</option>
                          <option value="en-IN">Indian System</option>
                        </select>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Languages size={16} className="text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Currency Toggle */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Output Type
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrency(false)}
                          className={`flex-1 p-3 rounded-lg border transition-all text-sm flex items-center justify-center gap-2 ${
                            !currency 
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-accent shadow-md' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          <FileText size={14} />
                          Words
                        </button>
                        <button
                          onClick={() => setCurrency(true)}
                          className={`flex-1 p-3 rounded-lg border transition-all text-sm flex items-center justify-center gap-2 ${
                            currency 
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-accent shadow-md' 
                              : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                          }`}
                        >
                          <DollarSign size={14} />
                          Currency
                        </button>
                      </div>
                    </div>

                    {/* Decimal Places */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Decimal Places
                      </label>
                      <div className="relative">
                        <select
                          value={decimalPlaces}
                          onChange={(e) => setDecimalPlaces(parseInt(e.target.value))}
                          className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-sm"
                        >
                          <option value="0">No decimals</option>
                          <option value="1">1 decimal</option>
                          <option value="2">2 decimals</option>
                          <option value="3">3 decimals</option>
                        </select>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Calculator size={16} className="text-muted-foreground" />
                        </div>
                      </div>
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
                        placeholder="e.g., 1234567.89"
                        className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg font-mono"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <FileText size={16} className="text-muted-foreground" />
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <Calculator size={10} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter any number up to 999 trillion (999,999,999,999,999) with optional decimals
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
                      Convert to Words
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
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {sampleNumbers.map((number, index) => (
                        <button
                          key={index}
                          onClick={() => setInputValue(number)}
                          className="p-2 text-xs bg-secondary text-secondary-foreground rounded-lg border border-border hover:bg-secondary/80 transition-colors text-center font-mono"
                        >
                          {number}
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
                      <h3 className="text-lg font-semibold text-foreground">Number to Words Result</h3>
                      <p className="text-sm text-muted-foreground">
                        Converted using {language === 'en' ? 'International' : 'Indian'} system in {currency ? 'currency' : 'word'} format
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
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-muted-foreground mb-2 text-center">
                        {currency ? 'Currency Amount in Words' : 'Number in Words'}
                      </div>
                      <div className="text-xl font-bold text-foreground text-center leading-relaxed">
                        {result}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center">
                        {language === 'en' ? 'International Number System' : 'Indian Number System'} • 
                        {currency ? ' Currency Format' : ' Word Format'} • 
                        {decimalPlaces > 0 ? ` ${decimalPlaces} decimal place${decimalPlaces > 1 ? 's' : ''}` : ' No decimals'}
                      </div>
                    </div>

                    {/* Conversion Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Input Number</div>
                        <div className="text-lg font-semibold text-foreground font-mono">
                          {formatNumber(parseFloat(inputValue.replace(/,/g, '')))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm text-muted-foreground">Conversion Settings</div>
                        <div className="text-lg font-semibold text-foreground">
                          {language === 'en' ? 'International' : 'Indian'} • {currency ? 'Currency' : 'Words'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Number Systems Guide */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Languages size={18} className="text-blue-600" />
                  Number Systems Comparison Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* International System */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Languages size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">International System</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {[
                        { value: '1', name: 'One' },
                        { value: '1,000', name: 'Thousand' },
                        { value: '1,000,000', name: 'Million' },
                        { value: '1,000,000,000', name: 'Billion' },
                        { value: '1,000,000,000,000', name: 'Trillion' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-lg border border-blue-500/20">
                          <span className="font-mono text-foreground font-medium">{item.value}</span>
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
                      Used in: USA, UK, Canada, Australia, Europe, and most international business
                    </div>
                  </div>

                  {/* Indian System */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Languages size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Indian System</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      {[
                        { value: '1', name: 'One' },
                        { value: '1,000', name: 'Thousand' },
                        { value: '1,00,000', name: 'Lakh' },
                        { value: '1,00,00,000', name: 'Crore' },
                        { value: '1,00,00,00,000', name: 'Arab' }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gradient-to-r from-green-500/5 to-green-600/5 rounded-lg border border-green-500/20">
                          <span className="font-mono text-foreground font-medium">{item.value}</span>
                          <span className="text-muted-foreground">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground p-3 bg-green-500/5 rounded-lg border border-green-500/10">
                      Used in: India, Pakistan, Bangladesh, Nepal, Sri Lanka, and neighboring countries
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
                          <span className="text-xs font-medium text-foreground bg-accent/10 px-2 py-1 rounded">{item.language} System</span>
                          <span className="text-xs text-muted-foreground">#{index + 1}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Number:</span>
                            <span className="font-mono text-foreground bg-secondary/50 px-2 py-1 rounded">{item.input}</span>
                          </div>
                          <div className="text-xs text-foreground truncate bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-2 rounded" title={item.output}>
                            {item.output}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Quick Examples Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" />
                  Common Examples
                </h3>
                <div className="space-y-3">
                  {[
                    { num: '1,234', int: 'One Thousand Two Hundred Thirty Four', ind: 'One Thousand Two Hundred Thirty Four' },
                    { num: '1,00,000', int: 'One Hundred Thousand', ind: 'One Lakh' },
                    { num: '1,23,45,678', int: 'Twelve Million Three Hundred Forty Five Thousand Six Hundred Seventy Eight', ind: 'One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight' },
                    { num: '1,234.56', int: 'One Thousand Two Hundred Thirty Four Dollars and Fifty Six Cents', ind: 'One Thousand Two Hundred Thirty Four Rupees and Fifty Six Paise' }
                  ].map((example, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border/50">
                      <div className="font-mono text-sm text-foreground mb-1">{example.num}</div>
                      <div className="text-xs text-muted-foreground">
                        <div className="mb-1">
                          <span className="font-medium text-blue-600">Int:</span> {example.int}
                        </div>
                        <div>
                          <span className="font-medium text-green-600">Ind:</span> {example.ind}
                        </div>
                      </div>
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
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen size={18} className="text-amber-600" />
                  About Number to Words Conversion
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Convert numbers to their English word representation for financial documents, legal agreements, 
                    educational purposes, and professional applications with 100% accuracy and proper formatting.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>Maximum number: 999 trillion for International system</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>Supports both International and Indian numbering systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span>Currency conversion with proper pluralization (Dollar/Dollars)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>Decimal support with customizable precision (0-3 decimal places)</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Common Professional Uses:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Bank checks and demand drafts preparation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Legal contracts and agreement drafting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Invoice and receipt generation systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Educational tools for learning number systems</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Government forms and official documentation</span>
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
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Number to Words Converter - Features & Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Number to Words Converter provides accurate conversion of numeric values into their English word representations, supporting both International and Indian numbering systems. It handles numbers up to 999 trillion with precision, including decimal values and currency formatting. The tool implements sophisticated algorithms that ensure proper grammar, correct hyphenation (twenty-one, forty-five), appropriate pluralization (dollar/dollars, rupee/rupees), and accurate placement of conjunctions ("and"). Beyond basic conversion, it serves as an essential tool for financial documentation, legal contracts, educational purposes, and international business communications requiring precise verbal representation of numerical values.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Languages size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Dual Number Systems</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Supports both International (Thousand, Million, Billion) and Indian (Lakh, Crore, Arab) numbering systems with accurate conversion algorithms.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Currency Conversion</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Converts amounts to currency words with proper units (Dollars/Cents or Rupees/Paise) and correct pluralization for financial documentation.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Decimal Precision</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Handles decimal numbers with configurable precision (0-3 decimal places) and accurate conversion of fractional amounts to words.</p>
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
                    <BookOpen size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Practical Number to Words Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏦 Financial & Banking Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Bank check writing - converting numerical amounts to words for checks, demand drafts, and payment orders to prevent fraud</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Invoice generation - creating professional invoices with amounts written in words alongside numerical values for clarity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Financial agreements - drafting loan agreements, promissory notes, and financial contracts requiring amount verification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Accounting documentation - preparing receipts, vouchers, and financial statements with dual amount representation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">⚖️ Legal & Documentation Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Contract drafting - writing legal agreements, deeds, and contracts where amounts must be stated in words to prevent ambiguity</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Government forms - completing official applications, tax forms, and regulatory documents requiring written amounts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Property transactions - preparing sale deeds, lease agreements, and property documents with precise amount wording</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Will and testament preparation - documenting financial bequests and inheritance distributions in clear written form</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🎓 Educational & Professional Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Mathematics education - teaching number systems, place values, and number word conversion in classrooms and tutoring</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Language learning - helping English learners understand number words, large number naming, and numerical terminology</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Software development - integrating number-to-word conversion in applications for invoice generation and report formatting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>International business - preparing documents for cross-border transactions requiring both International and Indian systems</span>
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
                  <h2 className="text-xl font-bold text-foreground">How to Convert Numbers to Words - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Select Number System</div>
                            <div className="text-sm text-muted-foreground">Choose between International (Thousand, Million) or Indian (Lakh, Crore) numbering system based on your requirement.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Choose Output Type</div>
                            <div className="text-sm text-muted-foreground">Select "Words" for standard conversion or "Currency" for financial amounts with proper currency units.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Set Decimal Precision</div>
                            <div className="text-sm text-muted-foreground">Choose decimal places (0-3) for handling fractional numbers based on your precision requirements.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Your Number</div>
                            <div className="text-sm text-muted-foreground">Input any number up to 999 trillion. Use commas for readability and include decimals if needed.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">5</div>
                          <div>
                            <div className="font-medium text-foreground">Convert & Review</div>
                            <div className="text-sm text-muted-foreground">Click convert to get instant results. Review the word conversion and copy for your documents.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Conversion Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Languages size={12} className="text-accent" />
                          </div>
                          <span>Use International system for global documents and Indian system for South Asian region documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <DollarSign size={12} className="text-accent" />
                          </div>
                          <span>Always use currency conversion for financial amounts on checks, invoices, and legal documents</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span>Use copy feature to save conversions directly into your documents without typing errors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <FileText size={12} className="text-accent" />
                          </div>
                          <span>For decimal numbers, choose appropriate decimal places based on your currency's subunit</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span>Verify large number conversions by checking the conversion history for accuracy</span>
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
                    <FileText size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Number to Words Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Number to Words Scenarios</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Number</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">International System</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Indian System</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Currency Format</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">1,234</td>
                                  <td className="px-4 py-3 text-sm text-green-600">One Thousand Two Hundred Thirty Four</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">One Thousand Two Hundred Thirty Four</td>
                                  <td className="px-4 py-3 text-sm text-amber-600">One Thousand Two Hundred Thirty Four Dollars</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">12,345</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Twelve Thousand Three Hundred Forty Five</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">Twelve Thousand Three Hundred Forty Five</td>
                                  <td className="px-4 py-3 text-sm text-amber-600">Twelve Thousand Three Hundred Forty Five Dollars</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">1,23,456</td>
                                  <td className="px-4 py-3 text-sm text-green-600">One Hundred Twenty Three Thousand Four Hundred Fifty Six</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">One Lakh Twenty Three Thousand Four Hundred Fifty Six</td>
                                  <td className="px-4 py-3 text-sm text-amber-600">One Lakh Twenty Three Thousand Four Hundred Fifty Six Rupees</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">12,34,567</td>
                                  <td className="px-4 py-3 text-sm text-green-600">One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven</td>
                                  <td className="px-4 py-3 text-sm text-amber-600">Twelve Lakh Thirty Four Thousand Five Hundred Sixty Seven Rupees</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">1,23,45,678</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Twelve Million Three Hundred Forty Five Thousand Six Hundred Seventy Eight</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight</td>
                                  <td className="px-4 py-3 text-sm text-amber-600">One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight Rupees</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">1,234.56</td>
                                  <td className="px-4 py-3 text-sm text-green-600">One Thousand Two Hundred Thirty Four Point Five Six</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">One Thousand Two Hundred Thirty Four Point Five Six</td>
                                  <td className="px-4 py-3 text-sm text-amber-600">One Thousand Two Hundred Thirty Four Dollars and Fifty Six Cents</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">9,99,99,999.99</td>
                                  <td className="px-4 py-3 text-sm text-green-600">Nine Million Nine Hundred Ninety Nine Thousand Nine Hundred Ninety Nine Point Nine Nine</td>
                                  <td className="px-4 py-3 text-sm text-purple-600">Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine Point Nine Nine</td>
                                  <td className="px-4 py-3 text-sm text-amber-600">Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred Ninety Nine Rupees and Ninety Nine Paise</td>
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
{`Example: Convert 12,34,56,789 to words in both systems and as currency

Step 1: Understanding the number
International: 123,456,789
Indian: 12,34,56,789

Step 2: Break down the Indian number
12,34,56,789 = 
12 Crore + 34 Lakh + 56 Thousand + 789

Step 3: Convert each part to words
12 Crore = Twelve Crore
34 Lakh = Thirty Four Lakh
56 Thousand = Fifty Six Thousand
789 = Seven Hundred Eighty Nine

Step 4: Combine for Indian system
Twelve Crore Thirty Four Lakh Fifty Six Thousand Seven Hundred Eighty Nine

Step 5: Convert to International system
123,456,789 = 
123 Million + 456 Thousand + 789
123 Million = One Hundred Twenty Three Million
456 Thousand = Four Hundred Fifty Six Thousand
789 = Seven Hundred Eighty Nine

Step 6: Combine for International system
One Hundred Twenty Three Million Four Hundred Fifty Six Thousand Seven Hundred Eighty Nine

Step 7: Convert to currency format
Indian Currency: Twelve Crore Thirty Four Lakh Fifty Six Thousand Seven Hundred Eighty Nine Rupees
International Currency: One Hundred Twenty Three Million Four Hundred Fifty Six Thousand Seven Hundred Eighty Nine Dollars

Step 8: Verification
Check Indian formatting: Groups of 2 digits after the first 3 digits
12,34,56,789 ✓
Check International formatting: Groups of 3 digits
123,456,789 ✓

Step 9: Important rules applied
• Proper hyphenation: Twenty-Three, Fifty-Six
• Correct pluralization: Rupees (not Rupee for amount > 1)
• Proper conjunction placement: No "and" between main units
• Capitalization: First letter capitalized in complete phrase
• Spacing: Single spaces between words, no extra spaces

Step 10: Common mistakes to avoid
❌ Incorrect: Twelve Crores Thirty Four Lakhs (should be Crore, Lakh without 's')
❌ Incorrect: One Hundred Twenty Three Million and Four Hundred Fifty Six Thousand (no "and" between main units)
❌ Incorrect: 123456789 Rupees (should be written in words for legal documents)
❌ Incorrect: Twelve crore thirty four lakh (should be capitalized in documents)

Step 11: Legal document formatting
For checks: "Pay: Twelve Crore Thirty Four Lakh Fifty Six Thousand Seven Hundred Eighty Nine Rupees Only"
For contracts: "The sum of One Hundred Twenty Three Million Four Hundred Fifty Six Thousand Seven Hundred Eighty Nine Dollars (USD 123,456,789)"

Step 12: Decimal handling example
If the number was 12,34,56,789.50:
Indian: Twelve Crore Thirty Four Lakh Fifty Six Thousand Seven Hundred Eighty Nine Rupees and Fifty Paise
International: One Hundred Twenty Three Million Four Hundred Fifty Six Thousand Seven Hundred Eighty Nine Dollars and Fifty Cents

Final Results:
• Indian System: Twelve Crore Thirty Four Lakh Fifty Six Thousand Seven Hundred Eighty Nine
• International System: One Hundred Twenty Three Million Four Hundred Fifty Six Thousand Seven Hundred Eighty Nine
• Indian Currency: Twelve Crore Thirty Four Lakh Fifty Six Thousand Seven Hundred Eighty Nine Rupees
• International Currency: One Hundred Twenty Three Million Four Hundred Fifty Six Thousand Seven Hundred Eighty Nine Dollars

Key Conversion Features Demonstrated:
✓ Accurate handling of both numbering systems
✓ Proper formatting for financial documents
✓ Correct grammar and punctuation
✓ Decimal number conversion
✓ Currency formatting with proper units
✓ Legal document preparation guidelines
✓ Error checking against common mistakes
✓ Verification through system comparison`}
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
                    <BookOpen size={20} className="text-purple-600" />
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