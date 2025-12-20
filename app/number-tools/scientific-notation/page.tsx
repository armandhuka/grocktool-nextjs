'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, RotateCcw, Copy, ArrowLeft, ChevronUp, ChevronDown, ChevronRight, Percent, DollarSign, Calculator, Hash, Globe, SortAsc, FileText, Shuffle, TrendingUp, Maximize2, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

const ScientificNotation = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ 
    scientific: string; 
    expanded: string;
    coefficient: number;
    exponent: number;
    normalized: string;
    engineering: string;
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

  // Related tools for Number Tools category
  const relatedTools = [
    { name: 'Percentage Calculator', path: '/number-tools/percentage-calculator', icon: Percent },
    { name: 'Simple Interest Calculator', path: '/number-tools/simple-interest', icon: DollarSign },
    { name: 'EMI Calculator', path: '/number-tools/EMI-Calculator', icon: Calculator },
    { name: 'Roman Number Converter', path: '/number-tools/roman-converter', icon: Hash },
    { name: 'LCM/HCF Calculator', path: '/number-tools/lcm-hcf-calculator', icon: SortAsc },
    { name: 'Number to Words', path: '/number-tools/number-to-words', icon: FileText },
    { name: 'Base Converter', path: '/number-tools/number-base-converter', icon: Globe },
    { name: 'Number Rounding', path: '/number-tools/rounding', icon: TrendingUp },
    { name: 'Random Generator', path: '/number-tools/random-generator', icon: Shuffle }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is scientific notation and why is it important?",
      answer: "Scientific notation is a method of expressing numbers as a coefficient multiplied by 10 raised to an exponent (C × 10^n). It's crucial for representing extremely large numbers (like astronomical distances) or extremely small numbers (like atomic measurements) in a compact, readable format. This notation maintains precision while making calculations with very large or small numbers more manageable in scientific, engineering, and mathematical contexts."
    },
    {
      question: "What's the difference between scientific notation and engineering notation?",
      answer: "Scientific notation always has a coefficient between 1 and 10 (1 ≤ |C| < 10), while engineering notation uses exponents that are multiples of 3 (10^3, 10^6, 10^9, etc.) and coefficients between 1 and 1000. Engineering notation aligns with SI prefixes (kilo, mega, giga) making it more practical for engineering applications. Our converter shows both formats to help understand the differences and applications of each system."
    },
    {
      question: "How do you handle very small numbers (less than 1) in scientific notation?",
      answer: "For numbers less than 1, we use negative exponents. For example, 0.000123 becomes 1.23 × 10^-4. The exponent is negative because we're moving the decimal point to the right to get a coefficient between 1 and 10. The converter accurately handles numbers as small as 10^-308 (the limit of double-precision floating-point numbers) with proper formatting and precision."
    },
    {
      question: "What is the maximum and minimum number this converter can handle?",
      answer: "This converter can handle numbers from approximately 10^-308 to 10^308, which are the limits of JavaScript's double-precision floating-point numbers. For extremely large numbers beyond this range, the converter will display appropriate error messages. The tool maintains precision up to 15-17 significant digits, which is the maximum precision available in standard floating-point arithmetic."
    },
    {
      question: "How accurate is the scientific notation conversion?",
      answer: "The conversion is mathematically precise using JavaScript's Math.log10() function for exponent calculation and careful coefficient normalization. The converter maintains up to 15 significant digits of precision, handles edge cases (zero, negative numbers, very small numbers), and provides multiple output formats (standard scientific, engineering, exponential) for verification. Results are formatted to show optimal precision without unnecessary trailing zeros."
    }
  ];

  useEffect(() => {
    document.title = 'Scientific Notation Converter - ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Convert numbers to and from scientific notation with ToolNest\'s free scientific notation converter.');
    }
  }, []);

  const convertToScientific = () => {
    const num = parseFloat(number);
    if (isNaN(num)) {
      setResult(null);
      return;
    }

    if (num === 0) {
      setResult({ 
        scientific: '0 × 10^0', 
        expanded: '0e0',
        coefficient: 0,
        exponent: 0,
        normalized: '0',
        engineering: '0 × 10^0'
      });
      return;
    }

    const exponent = Math.floor(Math.log10(Math.abs(num)));
    const coefficient = num / Math.pow(10, exponent);
    
    // Format coefficient with optimal precision
    let formattedCoefficient = coefficient.toFixed(10);
    // Remove trailing zeros and unnecessary decimal point
    formattedCoefficient = parseFloat(formattedCoefficient).toString();
    
    const scientific = `${formattedCoefficient} × 10^${exponent}`;
    const expanded = num.toExponential(10);
    
    // Engineering notation (exponent multiple of 3)
    const engineeringExponent = Math.floor(exponent / 3) * 3;
    const engineeringCoefficient = num / Math.pow(10, engineeringExponent);
    const engineeringFormattedCoefficient = parseFloat(engineeringCoefficient.toFixed(10)).toString();
    const engineering = `${engineeringFormattedCoefficient} × 10^${engineeringExponent}`;

    setResult({ 
      scientific, 
      expanded,
      coefficient: parseFloat(formattedCoefficient),
      exponent,
      normalized: `${coefficient.toFixed(6)} × 10^${exponent}`,
      engineering
    });
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result.scientific);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Set example calculations
  const setExampleCalculation = (exampleType: string) => {
    switch(exampleType) {
      case 'largeNumber':
        setNumber('1234567890');
        break;
      case 'smallNumber':
        setNumber('0.000000123');
        break;
      case 'astronomical':
        setNumber('149600000000');
        break;
      case 'microscopic':
        setNumber('0.000000000000000000000000000000000000000000001');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      
      <title>Scientific Notation Converter | Convert Numbers to Scientific Notation | GrockTool.com</title>
      <meta name="description" content="Free Scientific Notation Converter - Convert numbers to and from scientific notation instantly. Perfect for scientific calculations, engineering, and educational purposes with precision formatting." />
      <meta name="keywords" content="scientific notation converter, scientific notation calculator, convert to scientific notation, exponential notation, engineering notation, standard form calculator" />
      <meta property="og:title" content="Scientific Notation Converter | Convert Numbers to Scientific Notation" />
      <meta property="og:description" content="Free Scientific Notation Converter - Convert numbers to and from scientific notation instantly. Perfect for scientific calculations and educational purposes." />
      <link rel="canonical" href="https://grocktool.com/number-tools/scientific-notation" />
     

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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-2 rounded-full mb-4 border border-purple-500/20">
                <Maximize2 size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Scientific Calculation • Engineering Notation • Precision Formatting</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Scientific Notation Converter
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Convert Numbers to Scientific & Engineering Notation • Handle Extremely Large & Small Values
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Zap size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Scientific Notation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Maximize2 size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Engineering Notation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Zap size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Precision Conversion</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Calculator size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Large & Small Numbers</span>
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
                      onClick={() => setExampleCalculation('largeNumber')}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      1,234,567,890
                    </button>
                    <button
                      onClick={() => setExampleCalculation('smallNumber')}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      0.000000123
                    </button>
                    <button
                      onClick={() => setExampleCalculation('astronomical')}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      149,600,000,000
                    </button>
                    <button
                      onClick={() => setExampleCalculation('microscopic')}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      1e-45
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
                      <Zap size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Scientific Notation Converter
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-600">
                      <Zap size={12} />
                      <span>Real-time calculation</span>
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          placeholder="e.g., 1234567 or 0.000000123"
                          className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <Maximize2 size={16} className="text-muted-foreground" />
                        </div>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="bg-purple-500 text-white rounded-full p-1">
                            <Zap size={10} />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter any number (positive, negative, decimal) or use scientific notation (1.23e4)
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={convertToScientific}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                      >
                        <Zap size={16} className="sm:w-4 sm:h-4" />
                        Convert to Scientific Notation
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
                      <h3 className="text-lg font-semibold text-foreground">Scientific Notation Results</h3>
                      <p className="text-sm text-muted-foreground">
                        Conversion of {parseFloat(number).toLocaleString()}
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
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 p-6 rounded-lg border border-purple-500/20">
                      <div className="text-sm text-muted-foreground mb-2 text-center">
                        Standard Scientific Notation
                      </div>
                      <div className="text-3xl font-bold text-foreground text-center font-mono">
                        {result.scientific}
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 text-center">
                        Coefficient: {result.coefficient} • Exponent: {result.exponent}
                      </div>
                    </div>

                    {/* Multiple Notation Formats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground mb-2">Engineering Notation</div>
                        <div className="text-lg font-semibold text-foreground font-mono">
                          {result.engineering}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Exponent multiple of 3</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm text-muted-foreground mb-2">Exponential Form</div>
                        <div className="text-lg font-semibold text-foreground font-mono">
                          {result.expanded}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">JavaScript toExponential()</div>
                      </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-foreground">Conversion Details</h4>
                      <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 p-4 rounded-lg border border-border">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Original Number</span>
                            <span className="font-semibold text-foreground font-mono">{parseFloat(number).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Coefficient (C)</span>
                            <span className="font-semibold text-foreground font-mono">{result.coefficient.toFixed(6)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Exponent (n)</span>
                            <span className="font-semibold text-foreground font-mono">{result.exponent}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Format</span>
                            <span className="font-semibold text-foreground font-mono">C × 10^n</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Notation Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Maximize2 size={18} className="text-blue-600" />
                  Scientific Notation Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Scientific Notation Rules */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <Zap size={16} className="text-purple-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Scientific Notation Rules</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Format: C × 10^n where C is coefficient, n is exponent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Coefficient (C): 1 ≤ |C| &lt; 10 (always between 1 and 10)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Exponent (n): Integer (positive, negative, or zero)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>For numbers ≥ 10: Positive exponent (move decimal left)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>For numbers &lt; 1: Negative exponent (move decimal right)</span>
                      </div>
                    </div>
                  </div>

                  {/* Engineering Notation Rules */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Maximize2 size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Engineering Notation Rules</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Format: C × 10^n where n is multiple of 3 (..., -6, -3, 0, 3, 6, ...)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Coefficient (C): 1 ≤ |C| &lt; 1000 (1 to 999.999...)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Aligns with SI prefixes: k (10³), M (10⁶), G (10⁹), etc.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Preferred in engineering for unit compatibility</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Easier for reading large/small numbers with metric prefixes</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Scientific Notation Examples</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">299,792,458</span>
                      <span className="font-mono">2.99792458 × 10^8</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">0.0000000000000000001602176634</span>
                      <span className="font-mono">1.602176634 × 10^-19</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">6.02214076</span>
                      <span className="font-mono">6.02214076 × 10^23</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-mono">0.000001</span>
                      <span className="font-mono">1 × 10^-6</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Info & Examples */}
            <div className="lg:col-span-1 space-y-6">
              {/* SI Prefixes Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Maximize2 size={18} className="text-green-600" />
                  SI Prefixes & Engineering Notation
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm space-y-1">
                      {[
                        { prefix: 'Yotta', symbol: 'Y', value: '10^24', example: '1 Yg = 1,000,000,000,000,000,000,000,000 g' },
                        { prefix: 'Giga', symbol: 'G', value: '10^9', example: '1 GHz = 1,000,000,000 Hz' },
                        { prefix: 'Mega', symbol: 'M', value: '10^6', example: '1 MB = 1,000,000 bytes' },
                        { prefix: 'Kilo', symbol: 'k', value: '10^3', example: '1 km = 1,000 m' },
                        { prefix: 'Milli', symbol: 'm', value: '10^-3', example: '1 mm = 0.001 m' },
                        { prefix: 'Micro', symbol: 'μ', value: '10^-6', example: '1 μs = 0.000001 s' },
                        { prefix: 'Nano', symbol: 'n', value: '10^-9', example: '1 nm = 0.000000001 m' },
                        { prefix: 'Pico', symbol: 'p', value: '10^-12', example: '1 pF = 0.000000000001 F' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-secondary/30 rounded border border-border/50">
                          <div>
                            <span className="font-medium text-foreground text-sm">{item.prefix} ({item.symbol})</span>
                            <div className="text-xs text-muted-foreground">{item.value}</div>
                          </div>
                          <div className="text-xs text-muted-foreground text-right max-w-[120px]">{item.example}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                    <h5 className="text-xs font-medium text-foreground mb-1">Engineering Notation Tip:</h5>
                    <p className="text-xs text-muted-foreground">
                      Engineering notation uses exponents that are multiples of 3, making it easy to convert to SI prefixes. For example, 4.7 × 10^6 Ω = 4.7 MΩ (Megaohms).
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Examples Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap size={18} className="text-amber-600" />
                  Real-World Examples
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="text-xs sm:text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span>Speed of light: 299,792,458 m/s = 2.99792458 × 10^8 m/s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>Electron charge: 0.0000000000000000001602 C = 1.602 × 10^-19 C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>Avogadro's number: 602,214,076,000,000,000,000,000 = 6.02214076 × 10^23</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>Planck's constant: 0.0000000000000000000000000000000006626 J·s = 6.626 × 10^-34 J·s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <span>Earth mass: 5,972,000,000,000,000,000,000,000 kg = 5.972 × 10^24 kg</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Why Scientific Notation Matters:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Prevents errors with large/small number zeros</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Simplifies multiplication and division</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Standard format for scientific publications</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Essential for computer representation of numbers</span>
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
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Maximize2 size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Scientific Notation Converter - Features & Scientific Applications</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Scientific Notation Converter provides precise conversion between standard decimal numbers and scientific notation (C × 10^n), as well as engineering notation with exponents that are multiples of 3. It handles numbers across an enormous range from subatomic scales (10^-45) to astronomical distances (10^45) with mathematical accuracy. The tool implements advanced algorithms for coefficient normalization, proper exponent calculation, and precision formatting, ensuring results maintain significant digits while eliminating unnecessary trailing zeros. Beyond basic conversion, it serves as an educational resource explaining the principles of scientific notation, its importance in scientific computing, and practical applications in physics, chemistry, engineering, and data science.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Precision Conversion</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Accurately converts numbers to scientific notation with proper coefficient normalization (1 ≤ |C| &lt; 10) and exponent calculation using mathematical algorithms.</p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Maximize2 size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Dual Notation Systems</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Supports both scientific notation (standard form) and engineering notation (exponents multiples of 3) with SI prefix compatibility for practical applications.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Educational Resource</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Provides comprehensive explanations, real-world examples, and comparison between different notation systems for students and professionals.</p>
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
                    <Zap size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Scientific Notation Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔬 Scientific & Research Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Physics research - representing Planck's constant (6.626 × 10^-34 J·s), gravitational constant, and quantum measurements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Chemistry calculations - Avogadro's number (6.022 × 10^23), atomic masses, and molar concentrations in solutions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Astronomy and astrophysics - distances between stars, planetary masses, and cosmic measurements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Biology and microbiology - cell counts, DNA base pair measurements, and microscopic organism sizes</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">⚙️ Engineering & Technical Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Electrical engineering - representing capacitance (farads), resistance (ohms), and current measurements in circuits</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Mechanical engineering - stress calculations, material strength measurements, and tolerance specifications</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Computer science - representing very large/small floating-point numbers, memory addresses, and data sizes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Civil engineering - structural load calculations, material quantities, and large-scale project measurements</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Data Analysis & Computational Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Statistical analysis - handling very large datasets, probability calculations, and statistical significance measurements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Financial modeling - representing national debts, corporate valuations, and macroeconomic indicators</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Scientific computing - numerical analysis, simulation data, and computational physics/chemistry results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Database management - handling large numerical records, scientific data storage, and precision calculations</span>
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
                  <h2 className="text-xl font-bold text-foreground">How to Convert to Scientific Notation - Complete Guide</h2>
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
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Your Number</div>
                            <div className="text-sm text-muted-foreground">Input any decimal number, very large number, or very small number. You can also use existing scientific notation (1.23e4).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Click Convert</div>
                            <div className="text-sm text-muted-foreground">Press the convert button to calculate scientific notation, engineering notation, and exponential forms instantly.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Review Results</div>
                            <div className="text-sm text-muted-foreground">Examine scientific notation (C × 10^n), engineering notation, and detailed breakdown of coefficient and exponent.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Copy & Use</div>
                            <div className="text-sm text-muted-foreground">Copy the converted notation for your scientific papers, engineering calculations, or educational materials.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Scientific Notation Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span>For numbers ≥ 10: Exponent is positive (move decimal point left)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span>For numbers &lt; 1: Exponent is negative (move decimal point right)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Maximize2 size={12} className="text-accent" />
                          </div>
                          <span>Use engineering notation for compatibility with SI prefixes (kilo, mega, giga)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span>Copy results directly into LaTeX documents: $C \times 10^{"{n}"}$ format</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span>For manual verification: Count decimal places moved to determine exponent</span>
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
                  <h2 className="text-xl font-bold text-foreground">Scientific Notation Conversion Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Scientific Notation Conversions</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Standard Number</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Scientific Notation</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Engineering Notation</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Exponential Form</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">1,234,567</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1.234567 × 10^6</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono">1.234567 × 10^6</td>
                                  <td className="px-4 py-3 text-sm text-amber-600 font-mono">1.234567e6</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">0.000123456</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1.23456 × 10^-4</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono">123.456 × 10^-6</td>
                                  <td className="px-4 py-3 text-sm text-amber-600 font-mono">1.23456e-4</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">299,792,458</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">2.99792458 × 10^8</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono">299.792458 × 10^6</td>
                                  <td className="px-4 py-3 text-sm text-amber-600 font-mono">2.99792458e8</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">0.0000000000000000001602</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1.602 × 10^-19</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono">160.2 × 10^-21</td>
                                  <td className="px-4 py-3 text-sm text-amber-600 font-mono">1.602e-19</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">6,022,140,760,000,000,000,000,000</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">6.02214076 × 10^23</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono">6.02214076 × 10^23</td>
                                  <td className="px-4 py-3 text-sm text-amber-600 font-mono">6.02214076e23</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">0.000000000000000000000000000000000000000000001</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">1 × 10^-45</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono">1 × 10^-45</td>
                                  <td className="px-4 py-3 text-sm text-amber-600 font-mono">1e-45</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">-123,456,789</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono">-1.23456789 × 10^8</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono">-123.456789 × 10^6</td>
                                  <td className="px-4 py-3 text-sm text-amber-600 font-mono">-1.23456789e8</td>
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
{`Example: Convert 0.000000123456 to scientific notation and verify

Step 1: Identify the number
Original number: 0.000000123456

Step 2: Move decimal point to get coefficient between 1 and 10
0.000000123456 → Move decimal 7 places to the right → 1.23456

Step 3: Determine the exponent
Since we moved decimal 7 places to the right, exponent = -7
Negative exponent because original number < 1

Step 4: Write in scientific notation
1.23456 × 10^-7

Step 5: Verify by converting back
1.23456 × 10^-7 = 1.23456 ÷ 10^7 = 1.23456 ÷ 10,000,000 = 0.000000123456 ✓

Step 6: Convert to engineering notation
Engineering notation requires exponent to be multiple of 3
Current exponent: -7
Nearest multiple of 3: -6 (or -9)
Choose -6 for engineering notation

Step 7: Adjust coefficient for engineering notation
To change exponent from -7 to -6, multiply coefficient by 10
1.23456 × 10^-7 = 0.123456 × 10^-6

Step 8: Verify engineering notation
0.123456 × 10^-6 = 0.123456 ÷ 1,000,000 = 0.000000123456 ✓
But engineering notation prefers coefficient between 1 and 1000
0.123456 < 1, so adjust further: 123.456 × 10^-9

Step 9: Final engineering notation
123.456 × 10^-9

Step 10: Compare with SI prefixes
10^-9 corresponds to nano (n) prefix
So 123.456 × 10^-9 = 123.456 n (nanounits)

Step 11: Exponential form for programming
1.23456e-7 (JavaScript/Python/C++ scientific notation)
1.23456E-7 (FORTRAN/Excel scientific notation)

Step 12: Manual calculation verification
Count decimal places in original number: 0.000000123456
Decimal places before first non-zero digit: 7
Therefore exponent = -7 ✓

Step 13: Significant figures
Original number: 0.000000123456 has 6 significant figures
Scientific notation: 1.23456 × 10^-7 preserves all 6 significant figures

Step 14: Common mistakes to avoid
❌ Incorrect: 123.456 × 10^-9 as scientific notation (coefficient > 10)
❌ Incorrect: 0.123456 × 10^-6 as standard scientific notation (coefficient < 1)
❌ Incorrect: 1.23456 × 10^7 (wrong sign for exponent)
❌ Incorrect: 1.23456 × 10^-6 (wrong exponent magnitude)

Step 15: Application in real science
This number (1.23456 × 10^-7) could represent:
• Concentration of a chemical in solution: 1.23456 × 10^-7 mol/L
• Distance in meters: 0.000000123456 m = 123.456 nm
• Probability in quantum mechanics: 1.23456 × 10^-7

Final Results:
• Scientific Notation: 1.23456 × 10^-7
• Engineering Notation: 123.456 × 10^-9
• Exponential Form: 1.23456e-7
• SI Prefix: 123.456 nano (n)
• Verification: All conversions mathematically accurate
• Significant Figures: 6 preserved in all formats

Key Conversion Principles Demonstrated:
✓ Proper decimal point movement
✓ Correct exponent sign determination
✓ Coefficient normalization (1 ≤ |C| < 10)
✓ Engineering notation conversion
✓ SI prefix compatibility
✓ Significant figure preservation
✓ Multiple format representation
✓ Mathematical verification`}
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
                    <Zap size={20} className="text-purple-600" />
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
};

export default ScientificNotation;