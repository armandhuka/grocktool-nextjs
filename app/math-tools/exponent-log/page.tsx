'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, RotateCcw, Copy, ArrowLeft, ChevronDown, ChevronUp, CheckCircle, Hash, Calculator, PieChart, BarChart, Target, TrendingUp, Divide, Percent,Triangle,Circle } from 'lucide-react';
import Link from 'next/link';

export default function ExponentLog() {
  const [operation, setOperation] = useState('power');
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [number, setNumber] = useState('');
  const [logBase, setLogBase] = useState('10');
  const [result, setResult] = useState<number | null>(null);
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
  { name: 'Multiplication Tables', path: '/math-tools/multiplication-table', icon: TrendingUp },
  { name: 'Quadratic Equation Solver', path: '/math-tools/quadratic-solver', icon: Target },
  { name: 'Percentage Calculator', path: '/math-tools/percentage-change', icon: Percent },
  { name: 'Triangle Area Calculator', path: '/math-tools/triangle-area', icon: Triangle },
  { name: 'Circle Area Calculator', path: '/math-tools/circle-calculator', icon: Circle },
  { name: 'Statistics Calculator', path: '/math-tools/statistics-calculator', icon: BarChart },
  { name: 'Exponent & Logarithm Calculator', path: '/math-tools/exponent-log', icon: Zap }
];

  // FAQ Data
  const faqData = [
    {
      question: "What is the difference between exponential and logarithmic functions?",
      answer: "Exponential and logarithmic functions are mathematical inverses. Exponential functions (a^b) represent repeated multiplication, where a base is raised to an exponent. Logarithmic functions (log_b(n)) answer the question: 'To what power must the base be raised to get this number?' For example, 2^3 = 8 is exponential, while log_2(8) = 3 is logarithmic. They're used together in many mathematical and scientific applications."
    },
    {
      question: "Why is e (2.71828) used as the base for natural logarithms?",
      answer: "The mathematical constant e (approximately 2.71828) is the base of natural logarithms because it arises naturally in calculus and mathematical analysis. It's the unique number where the derivative of e^x is e^x itself, and the integral of 1/x is ln(x). This makes e fundamental in describing continuous growth processes, compound interest, probability theory, and many areas of science and engineering."
    },
    {
      question: "What are the most common logarithm bases and their applications?",
      answer: "The three most common logarithm bases are: 1) Base 10 (common logarithm) - used in scientific notation, Richter scale for earthquakes, and pH calculations. 2) Base e (natural logarithm) - used in calculus, continuous growth models, and probability. 3) Base 2 (binary logarithm) - used in computer science, information theory, and algorithm analysis. Each base has specific mathematical properties that make it suitable for particular applications."
    },
    {
      question: "How accurate is this exponent and logarithm calculator?",
      answer: "Our calculator provides results with 8 decimal places of precision using JavaScript's built-in Math functions, which use double-precision floating-point arithmetic (IEEE 754 standard). For most practical applications, this provides sufficient accuracy. For extremely large or small numbers, there may be limitations due to floating-point representation, but the calculator handles typical educational, scientific, and engineering calculations with high precision."
    },
    {
      question: "Can I calculate negative exponents or fractional exponents?",
      answer: "Yes, this calculator supports negative exponents, fractional exponents, and decimal exponents. Negative exponents represent reciprocal values (a^-b = 1/a^b). Fractional exponents represent roots (a^(1/2) = √a, a^(1/3) = ∛a). Decimal exponents can be entered directly. The calculator also handles square roots as a separate operation for convenience, but all root calculations can be performed using fractional exponents as well."
    }
  ];

  const calculate = () => {
    if (operation === 'power') {
      const b = parseFloat(base);
      const e = parseFloat(exponent);
      if (isNaN(b) || isNaN(e)) {
        setResult(null);
        return;
      }
      setResult(Math.pow(b, e));
    } else if (operation === 'logarithm') {
      const n = parseFloat(number);
      const lb = parseFloat(logBase);
      if (isNaN(n) || isNaN(lb) || n <= 0 || lb <= 0 || lb === 1) {
        setResult(null);
        return;
      }
      
      if (lb === 10) {
        setResult(Math.log10(n));
      } else if (lb === Math.E) {
        setResult(Math.log(n));
      } else {
        setResult(Math.log(n) / Math.log(lb));
      }
    } else if (operation === 'natural-log') {
      const n = parseFloat(number);
      if (isNaN(n) || n <= 0) {
        setResult(null);
        return;
      }
      setResult(Math.log(n));
    } else if (operation === 'square-root') {
      const n = parseFloat(number);
      if (isNaN(n) || n < 0) {
        setResult(null);
        return;
      }
      setResult(Math.sqrt(n));
    }
  };

  const reset = () => {
    setBase('');
    setExponent('');
    setNumber('');
    setLogBase('10');
    setResult(null);
  };

  const copyResult = async () => {
    if (result !== null) {
      try {
        await navigator.clipboard.writeText(result.toString());
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const getOperationDescription = () => {
    switch (operation) {
      case 'power':
        return 'Calculate exponential power (a^b)';
      case 'logarithm':
        return 'Calculate logarithm with custom base';
      case 'natural-log':
        return 'Calculate natural logarithm (base e)';
      case 'square-root':
        return 'Calculate square root (√n)';
      default:
        return '';
    }
  };

  const getFormula = () => {
    switch (operation) {
      case 'power':
        return base && exponent ? `${base}^${exponent} = ${result?.toFixed(8)}` : '';
      case 'logarithm':
        return number && logBase ? `log_${logBase}(${number}) = ${result?.toFixed(8)}` : '';
      case 'natural-log':
        return number ? `ln(${number}) = ${result?.toFixed(8)}` : '';
      case 'square-root':
        return number ? `√${number} = ${result?.toFixed(8)}` : '';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>Exponent & Logarithm Calculator | Power, Log, Natural Log, Square Root | GrockTool.com</title>
      <meta name="description" content="Free online exponent and logarithm calculator. Calculate powers, logarithms with any base, natural logs (ln), square roots, and perform exponential calculations with precision. Essential tool for math, science, and engineering." />
      <meta name="keywords" content="exponent calculator, logarithm calculator, power calculator, natural logarithm, square root calculator, exponential function, log base 10, ln calculator, math calculator, scientific calculator" />
      <meta property="og:title" content="Exponent & Logarithm Calculator | Power, Log, Natural Log, Square Root" />
      <meta property="og:description" content="Free online exponent and logarithm calculator. Calculate powers, logarithms with any base, natural logs, square roots, and perform exponential calculations." />
      <link rel="canonical" href="https://grocktool.com/math-tools/exponent-log" />
      
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
                <Zap size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Exponential Functions • Logarithms • Mathematical Analysis</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Exponent & Logarithm Calculator
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Calculate Powers • Logarithms • Natural Logs • Square Roots • Exponential Functions
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Zap size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Exponentiation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Hash size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Logarithms</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Natural Log</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Divide size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Square Root</span>
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
                      onClick={() => { setOperation('power'); setBase('2'); setExponent('3'); }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      2^3 = 8
                    </button>
                    <button
                      onClick={() => { setOperation('logarithm'); setNumber('100'); setLogBase('10'); }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Hash size={12} />
                      log₁₀(100)
                    </button>
                    <button
                      onClick={() => { setOperation('natural-log'); setNumber('2.71828'); }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <CheckCircle size={12} />
                      ln(2.71828)
                    </button>
                    <button
                      onClick={() => { setOperation('square-root'); setNumber('25'); }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Divide size={12} />
                      √25 = 5
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
                  {/* Operation Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Zap size={20} className="text-foreground" />
                        <label className="block text-sm font-medium text-foreground">
                          Exponent & Logarithm Calculator
                        </label>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-purple-600">
                        <Zap size={12} />
                        <span>Mathematical operations</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setOperation('power')}
                        className={`p-3 rounded-lg border transition-all ${
                          operation === 'power' 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-600' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div className="text-sm font-medium">Power (a^b)</div>
                      </button>
                      <button
                        onClick={() => setOperation('logarithm')}
                        className={`p-3 rounded-lg border transition-all ${
                          operation === 'logarithm' 
                            ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white border-blue-600' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div className="text-sm font-medium">Logarithm</div>
                      </button>
                      <button
                        onClick={() => setOperation('natural-log')}
                        className={`p-3 rounded-lg border transition-all ${
                          operation === 'natural-log' 
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-600' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div className="text-sm font-medium">Natural Log</div>
                      </button>
                      <button
                        onClick={() => setOperation('square-root')}
                        className={`p-3 rounded-lg border transition-all ${
                          operation === 'square-root' 
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border-amber-600' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div className="text-sm font-medium">Square Root</div>
                      </button>
                    </div>
                  </div>

                  {/* Operation Description */}
                  <div className="bg-gradient-to-r from-secondary/30 to-secondary/10 p-3 rounded-lg border border-border">
                    <div className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Zap size={16} />
                      {getOperationDescription()}
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    {operation === 'power' && (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Base (a)
                          </label>
                          <input
                            type="number"
                            value={base}
                            onChange={(e) => setBase(e.target.value)}
                            placeholder="e.g., 2, 10, 2.718"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            step="any"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Hash size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Exponent (b)
                          </label>
                          <input
                            type="number"
                            value={exponent}
                            onChange={(e) => setExponent(e.target.value)}
                            placeholder="e.g., 3, -2, 0.5, 2.5"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            step="any"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Zap size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    )}

                    {operation === 'logarithm' && (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Number (n)
                          </label>
                          <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="e.g., 100, 8, 2.718"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            step="any"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Hash size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Logarithm Base
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {['10', '2.718281828459045', '2', 'Custom'].map((baseValue, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  if (baseValue === 'Custom') {
                                    setLogBase('');
                                  } else {
                                    setLogBase(baseValue === '2.718281828459045' ? Math.E.toString() : baseValue);
                                  }
                                }}
                                className={`p-2 rounded-lg border transition-all text-sm ${
                                  (logBase === '10' && baseValue === '10') ||
                                  (logBase === Math.E.toString() && baseValue === '2.718281828459045') ||
                                  (logBase === '2' && baseValue === '2') ||
                                  (baseValue === 'Custom' && !['10', '2.718281828459045', '2', Math.E.toString()].includes(logBase))
                                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white border-blue-600'
                                    : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                                }`}
                              >
                                {baseValue === '2.718281828459045' ? 'e' : baseValue}
                              </button>
                            ))}
                          </div>
                          {!['10', '2.718281828459045', '2', Math.E.toString()].includes(logBase) && (
                            <input
                              type="number"
                              value={logBase}
                              onChange={(e) => setLogBase(e.target.value)}
                              placeholder="Enter custom base (positive, not 1)"
                              className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center"
                              step="any"
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {(operation === 'natural-log' || operation === 'square-root') && (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Number (n)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder={operation === 'square-root' ? 'e.g., 16, 2.25, 0.25' : 'e.g., 2.718, 10, 0.5'}
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            step="any"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Hash size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={calculate}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Zap size={16} className="sm:w-4 sm:h-4" />
                      Calculate Result
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
              {result !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
                >
                  <div className="space-y-6">
                    {/* Main Result */}
                    <div className={`p-6 rounded-lg border ${
                      operation === 'power' 
                        ? 'bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20' 
                        : operation === 'logarithm'
                        ? 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20'
                        : operation === 'natural-log'
                        ? 'bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20'
                        : 'bg-gradient-to-r from-amber-500/10 to-amber-600/10 border-amber-500/20'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${
                          operation === 'power' 
                            ? 'bg-purple-500/20' 
                            : operation === 'logarithm'
                            ? 'bg-blue-500/20'
                            : operation === 'natural-log'
                            ? 'bg-green-500/20'
                            : 'bg-amber-500/20'
                        }`}>
                          <Zap size={28} className={
                            operation === 'power' 
                              ? 'text-purple-600' 
                              : operation === 'logarithm'
                              ? 'text-blue-600'
                              : operation === 'natural-log'
                              ? 'text-green-600'
                              : 'text-amber-600'
                          } />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground">
                            {getFormula()}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {operation === 'power' ? 'Exponential power calculation' :
                             operation === 'logarithm' ? 'Logarithm with base ' + logBase :
                             operation === 'natural-log' ? 'Natural logarithm (base e)' :
                             'Square root calculation'}
                          </p>
                        </div>
                        <button
                          onClick={copyResult}
                          className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          <Copy size={16} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Operation Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 p-3 rounded-lg border border-border">
                        <div className="text-xs text-muted-foreground">Operation Type</div>
                        <div className="font-semibold text-foreground capitalize">
                          {operation.replace('-', ' ')}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 p-3 rounded-lg border border-border">
                        <div className="text-xs text-muted-foreground">Precision</div>
                        <div className="font-semibold text-foreground">8 decimal places</div>
                      </div>
                    </div>

                    {/* Mathematical Context */}
                    <div className="bg-gradient-to-r from-secondary/5 to-transparent p-4 rounded-lg border border-border">
                      <h4 className="text-sm font-medium text-foreground mb-2">Mathematical Context:</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        {operation === 'power' && (
                          <>
                            <div>• Exponential growth/decay: y = a^b</div>
                            <div>• Compound interest formula: A = P(1 + r)^t</div>
                            <div>• Scientific notation: 6.02 × 10^23</div>
                          </>
                        )}
                        {operation === 'logarithm' && (
                          <>
                            <div>• Logarithmic scale: pH, Richter scale, decibels</div>
                            <div>• Logarithm properties: log(ab) = log(a) + log(b)</div>
                            <div>• Base conversion: log_b(x) = log_k(x) / log_k(b)</div>
                          </>
                        )}
                        {operation === 'natural-log' && (
                          <>
                            <div>• Natural growth processes: population, investments</div>
                            <div>• Calculus derivative: d/dx[ln(x)] = 1/x</div>
                            <div>• Euler's number e ≈ 2.718281828459045</div>
                          </>
                        )}
                        {operation === 'square-root' && (
                          <>
                            <div>• Quadratic formula: x = [-b ± √(b²-4ac)]/2a</div>
                            <div>• Pythagorean theorem: c = √(a² + b²)</div>
                            <div>• Standard deviation: σ = √[Σ(x-μ)²/N]</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mathematical Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Zap size={18} className="text-purple-600" />
                  Exponential & Logarithmic Functions Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Exponential Properties */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <Zap size={16} className="text-purple-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Exponential Properties</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>a^0 = 1:</strong> Any non-zero number to power 0 equals 1</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>a^m × a^n = a^(m+n):</strong> Multiplication rule</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>(a^m)^n = a^(m×n):</strong> Power of a power</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>a^(-n) = 1/a^n:</strong> Negative exponents</span>
                      </div>
                    </div>
                  </div>

                  {/* Logarithm Properties */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Hash size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Logarithm Properties</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>log_b(1) = 0:</strong> Logarithm of 1 is always 0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>log_b(b) = 1:</strong> Logarithm of base to itself is 1</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>log_b(xy) = log_b(x) + log_b(y):</strong> Product rule</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>log_b(x/y) = log_b(x) - log_b(y):</strong> Quotient rule</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Mathematical Constants</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Euler's Number (e)</span>
                      <span className="font-mono">≈ 2.718281828459045</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Square Root of 2</span>
                      <span className="font-mono">≈ 1.414213562373095</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Golden Ratio (φ)</span>
                      <span className="font-mono">≈ 1.618033988749895</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Pi (π)</span>
                      <span className="font-mono">≈ 3.141592653589793</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Info Section (Now in main flow) */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Exponential & Logarithmic Calculations Work</h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>
                    Exponential and logarithmic functions are fundamental mathematical operations that are 
                    inverses of each other, widely used in science, engineering, and finance.
                  </p>
                  <div className="text-xs sm:text-sm space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Select the mathematical operation you want to perform</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Enter the required values in the input fields</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Click "Calculate" to compute the result</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>View the precise result with formula display</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      <span>Copy the result for use in other applications</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Power (Exponentiation):</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Formula:</strong> a^b = a × a × ... (b times)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span><strong>Example:</strong> 2^3 = 2 × 2 × 2 = 8</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span>Used for exponential growth, compound interest, and scientific notation</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Logarithm:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Formula:</strong> log_b(n) = x means b^x = n</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Common Bases:</strong> 10 (common log), e (natural log), 2 (binary log)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span><strong>Example:</strong> log_10(100) = 2 because 10^2 = 100</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Natural Logarithm:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Formula:</strong> ln(n) = log_e(n)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Base e:</strong> Approximately 2.718281828459045</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span><strong>Example:</strong> ln(7.389) ≈ 2 because e^2 ≈ 7.389</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Square Root:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Formula:</strong> √n = x means x^2 = n</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span><strong>Example:</strong> √16 = 4 because 4^2 = 16</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>Special case of exponentiation: √n = n^(1/2)</span>
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
                    <Zap size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Exponent & Logarithm Calculator - Features & Mathematical Analysis</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Exponent & Logarithm Calculator is a comprehensive mathematical tool designed to handle exponential and logarithmic calculations with precision and ease. The calculator performs four essential operations: exponentiation (raising numbers to powers), logarithms with any base, natural logarithms (base e), and square roots. Each calculation is performed with 8 decimal places of accuracy using JavaScript's built-in Math functions, ensuring reliable results for educational, scientific, and engineering applications. The tool provides instant feedback with clear formulas, making it perfect for students learning exponential and logarithmic functions, professionals needing quick calculations, or anyone working with mathematical models that involve exponential growth, logarithmic scales, or root calculations.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Exponentiation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Calculate any number raised to any power, including negative exponents, fractional exponents, and decimal exponents. Perfect for compound interest, population growth models, and scientific notation calculations.</p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Logarithm Calculator</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Compute logarithms with any positive base (except 1). Includes quick access to common bases (10, e, 2) and supports custom bases. Essential for pH calculations, Richter scale, and decibel measurements.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Natural Logarithm</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Calculate natural logarithms (base e) for continuous growth models, calculus applications, and probability calculations. The natural logarithm is fundamental in higher mathematics and scientific research.</p>
                    </div>
                    <div className="bg-amber-500/10 p-4 rounded-lg border border-amber-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Divide size={18} className="text-amber-600" />
                        <h3 className="font-semibold text-foreground">Square Root Calculator</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Find square roots of any non-negative number with high precision. Useful for quadratic equations, Pythagorean theorem applications, standard deviation calculations, and geometric problems.</p>
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
                    <Zap size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Exponential & Logarithmic Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Science & Engineering Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Physics:</strong> Radioactive decay calculations using exponential functions, sound intensity measured in decibels (logarithmic scale), and Richter scale for earthquake magnitude</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Chemistry:</strong> pH calculations using logarithms (pH = -log[H+]), reaction rate constants, and Arrhenius equation for temperature dependence</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Biology:</strong> Population growth models, bacterial reproduction rates, and pharmacokinetics for drug concentration over time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Engineering:</strong> Signal processing, control systems analysis, electrical circuit calculations, and structural load distributions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💼 Finance & Economics Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Compound Interest:</strong> A = P(1 + r/n)^(nt) formula for investment growth, retirement planning, and loan calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Economic Growth:</strong> GDP growth rate calculations, inflation modeling, and economic forecasting using exponential trends</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Stock Market Analysis:</strong> Logarithmic returns for investment performance, volatility calculations, and option pricing models</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Risk Management:</strong> Value at Risk (VaR) calculations, probability distributions, and financial modeling</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💻 Computer Science & Technology</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Algorithm Analysis:</strong> Big O notation for time complexity, logarithmic search algorithms (binary search), and exponential algorithms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Data Compression:</strong> Logarithmic encoding schemes, information theory applications, and entropy calculations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Computer Graphics:</strong> Exponential functions for lighting models, logarithmic depth buffers, and 3D transformations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Cryptography:</strong> Exponential functions in public-key cryptography, discrete logarithm problems, and cryptographic protocols</span>
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
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Zap size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Exponent & Logarithm Calculator - Complete Guide</h2>
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
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Select Operation Type</div>
                            <div className="text-sm text-muted-foreground">Choose between Power (a^b), Logarithm, Natural Log, or Square Root based on your calculation needs.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Required Values</div>
                            <div className="text-sm text-muted-foreground">Input the numbers for your calculation. For power: base and exponent. For logarithm: number and base.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Calculate Results</div>
                            <div className="text-sm text-muted-foreground">Click "Calculate Result" to perform the mathematical operation with 8 decimal place precision.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Review & Copy Results</div>
                            <div className="text-sm text-muted-foreground">Examine the calculated result with formula display. Use the copy button to save the result.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Calculation Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Use Quick Examples:</strong> Test with provided examples like 2^3, log₁₀(100), ln(2.718), √25 to understand different operations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-blue-500/20 p-1 rounded mt-0.5">
                            <Hash size={12} className="text-blue-500" />
                          </div>
                          <span><strong>Understand Limitations:</strong> Logarithms require positive numbers. Square roots require non-negative numbers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-green-500/20 p-1 rounded mt-0.5">
                            <CheckCircle size={12} className="text-green-500" />
                          </div>
                          <span><strong>Explore Mathematical Relationships:</strong> Test inverse relationships like 2^3 = 8 and log₂(8) = 3</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-amber-500/20 p-1 rounded mt-0.5">
                            <Divide size={12} className="text-amber-500" />
                          </div>
                          <span><strong>Check Precision:</strong> Results show 8 decimal places. For scientific work, verify significant figures</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-purple-500/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-purple-500" />
                          </div>
                          <span><strong>Save Common Calculations:</strong> Use the copy function to save frequently used calculations for documentation</span>
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
                  <h2 className="text-xl font-bold text-foreground">Exponential & Logarithm Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Mathematical Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Operation</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Input Values</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Formula</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Result</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Application</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-purple-600">Power</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Base: 2, Exponent: 3</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2^3</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">8.00000000</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Basic exponentiation</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-blue-600">Logarithm</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Number: 100, Base: 10</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">log₁₀(100)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2.00000000</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Common logarithm</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-green-600">Natural Log</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Number: 2.71828</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">ln(2.71828)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">0.99999998</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Natural logarithm</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-amber-600">Square Root</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Number: 25</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">√25</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5.00000000</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Basic root</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-purple-600">Power (Fractional)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Base: 8, Exponent: 1/3</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">8^(1/3)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2.00000000</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Cube root</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-blue-600">Logarithm (Base 2)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Number: 8, Base: 2</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">log₂(8)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">3.00000000</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Binary logarithm</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm font-medium text-purple-600">Power (Negative)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">Base: 2, Exponent: -2</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2^(-2)</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">0.25000000</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Reciprocal power</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Calculation Example: Compound Interest</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Calculate compound interest using exponential functions

Scenario: $1,000 invested at 5% annual interest compounded monthly for 3 years

Step 1: Identify the compound interest formula
A = P(1 + r/n)^(nt)

Where:
A = Final amount
P = Principal amount ($1,000)
r = Annual interest rate (5% = 0.05)
n = Number of times compounded per year (12 for monthly)
t = Number of years (3)

Step 2: Input values into our exponent calculator
We need to calculate: (1 + r/n)^(nt)

First calculate (1 + r/n):
r/n = 0.05/12 = 0.0041666667
1 + r/n = 1.0041666667

Now calculate nt:
n × t = 12 × 3 = 36

Step 3: Use Power Operation
Select "Power (a^b)" operation
Base (a): 1.0041666667
Exponent (b): 36

Step 4: Calculate using our tool
Enter base: 1.0041666667
Enter exponent: 36
Click "Calculate Result"

Result: 1.0041666667^36 = 1.161472231

Step 5: Calculate final amount
A = P × (1 + r/n)^(nt)
A = 1000 × 1.161472231 = $1,161.47

Step 6: Verify with direct formula
Using calculator step-by-step:

Monthly interest rate = 0.05/12 = 0.0041666667
Growth factor per month = 1.0041666667
Number of months = 36

1.0041666667^36 = ?
Using exponent rules: e^(ln(1.0041666667) × 36)
ln(1.0041666667) = 0.004158008
0.004158008 × 36 = 0.149688288
e^0.149688288 = 1.161472231 ✓

Step 7: Compare with simple interest
Simple interest for 3 years at 5%:
I = P × r × t = 1000 × 0.05 × 3 = $150
Total = $1,150

Compound interest earned:
$1,161.47 - $1,000 = $161.47
Difference from simple interest: $11.47 extra

Step 8: Calculate effective annual rate
EAR = (1 + r/n)^n - 1
EAR = (1 + 0.05/12)^12 - 1
Using our calculator:
(1 + 0.05/12) = 1.0041666667
1.0041666667^12 = 1.051161898
EAR = 1.051161898 - 1 = 0.051161898 = 5.116%

Step 9: Logarithmic verification
We can verify using logarithms:
To find how long to double money at 5% compounded monthly:
2 = (1 + 0.05/12)^n
ln(2) = n × ln(1 + 0.05/12)
n = ln(2) / ln(1.0041666667)
Using our calculator:
ln(2) = 0.693147181
ln(1.0041666667) = 0.004158008
n = 0.693147181 / 0.004158008 = 166.7 months = 13.89 years

Step 10: Practical implications
• Monthly compounding yields $11.47 more than annual compounding
• Effective rate is 5.116% vs nominal 5%
• Money doubles in about 13.9 years at this rate
• Demonstrates power of exponential growth in finance`}
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