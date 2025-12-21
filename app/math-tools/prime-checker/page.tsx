'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, RotateCcw, CheckCircle, XCircle, ArrowLeft, ChevronUp, ChevronDown, Calculator, Hash, FileText, TrendingUp, Zap, Target, PieChart, BarChart, Square, Circle, Triangle, Divide, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function PrimeCheckerPage() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ isPrime: boolean; factors: number[]; sqrt: number } | null>(null);
  const [knownPrimes, setKnownPrimes] = useState<number[]>([]);
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
    { name: 'Factorial Calculator', path: '/math-tools/factorial', icon: PieChart },
    { name: 'Multiplication Tables', path: '/math-tools/multiplication-table', icon: TrendingUp },
    { name: 'Quadratic Equation Solver', path: '/math-tools/quadratic-solver', icon: Zap },
    { name: 'Percentage Change Calculator', path: '/math-tools/percentage-change', icon: Target },
    { name: 'Triangle Area Calculator', path: '/math-tools/triangle-area', icon: Triangle },
    { name: 'Circle Area Calculator', path: '/math-tools/circle-calculator', icon: Circle },
    { name: 'Logarithm Calculator', path: '/math-tools/exponent-log', icon: BarChart },
    { name: 'Statistics Calculator', path: '/math-tools/statistics-calculator', icon: Hash }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What makes a number prime?",
      answer: "A prime number is a natural number greater than 1 that has exactly two distinct positive divisors: 1 and itself. This means it cannot be formed by multiplying two smaller natural numbers. For example, 5 is prime because the only ways to write it as a product are 1 × 5 or 5 × 1. The number 1 is not prime because it has only one divisor."
    },
    {
      question: "Why is 2 considered a prime number?",
      answer: "2 is prime because it meets all the criteria: it's greater than 1, and its only divisors are 1 and 2. It's unique as the only even prime number because every other even number is divisible by 2 and therefore has at least three divisors (1, 2, and itself). This special property makes 2 fundamental in number theory."
    },
    {
      question: "What is the largest known prime number?",
      answer: "The largest known prime number as of 2023 is 2^82,589,933 − 1, a Mersenne prime with 24,862,048 digits. This number was discovered in December 2018 through the Great Internet Mersenne Prime Search (GIMPS). Prime numbers of this magnitude are used in cryptography and computational mathematics."
    },
    {
      question: "How does the prime checker algorithm work?",
      answer: "Our algorithm first checks if the number is less than 2 (not prime), then checks if it's 2 (prime), then if it's even (not prime if greater than 2). For odd numbers, it tests divisibility by odd numbers up to the square root of the number. This optimized approach significantly reduces computation time for large numbers."
    },
    {
      question: "What are twin primes and other prime types?",
      answer: "Twin primes are pairs of primes that differ by 2 (e.g., 3 and 5, 11 and 13). Other types include Mersenne primes (2^p - 1), Fermat primes (2^(2^n) + 1), and Sophie Germain primes (p where 2p + 1 is also prime). These special primes have unique mathematical properties and applications."
    }
  ];

  // Predefined prime numbers for quick testing
  const samplePrimes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
    73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151
  ];

  // Predefined composite numbers for quick testing
  const sampleComposites = [
    4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30,
    32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52
  ];

  useEffect(() => {
    document.title = 'Prime Number Checker | Check If a Number Is Prime with Factorization | ToolNest';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online Prime Number Checker tool. Check if a number is prime or composite, find all factors, and learn about prime number properties with detailed mathematical analysis.');
    }
  }, []);

  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const getFactors = (num: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        factors.push(i);
        if (i !== num / i) {
          factors.push(num / i);
        }
      }
    }
    return factors.sort((a, b) => a - b);
  };

  const checkPrime = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 1) {
      setResult(null);
      return;
    }

    const prime = isPrime(num);
    const factors = getFactors(num);
    const sqrt = Math.sqrt(num);
    
    setResult({ 
      isPrime: prime, 
      factors,
      sqrt
    });

    // Generate known primes up to the number
    const primes = [];
    for (let i = 2; i <= num; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    setKnownPrimes(primes.slice(-20)); // Keep last 20 primes
  };

  const reset = () => {
    setNumber('');
    setResult(null);
    setKnownPrimes([]);
  };

  // Prime factorization function
  const primeFactorization = (num: number): { prime: number; exponent: number }[] => {
    if (num < 2) return [];
    
    const factors: { prime: number; exponent: number }[] = [];
    let temp = num;
    
    // Check divisibility by 2
    if (temp % 2 === 0) {
      let exponent = 0;
      while (temp % 2 === 0) {
        temp /= 2;
        exponent++;
      }
      factors.push({ prime: 2, exponent });
    }
    
    // Check odd divisors
    for (let i = 3; i <= Math.sqrt(temp); i += 2) {
      if (temp % i === 0) {
        let exponent = 0;
        while (temp % i === 0) {
          temp /= i;
          exponent++;
        }
        factors.push({ prime: i, exponent });
      }
    }
    
    // If anything remains, it's prime
    if (temp > 1) {
      factors.push({ prime: temp, exponent: 1 });
    }
    
    return factors;
  };

  // Check for special prime types
  const checkSpecialPrime = (num: number): string[] => {
    const specialTypes: string[] = [];
    
    if (num === 2) specialTypes.push('Only Even Prime');
    if (isPrime(num) && isPrime(num + 2)) specialTypes.push('Twin Prime (part of pair)');
    if (isPrime(num) && isPrime(num - 2)) specialTypes.push('Twin Prime (part of pair)');
    if (num > 2 && isPrime(num) && isPrime(2 * num + 1)) specialTypes.push('Sophie Germain Prime');
    
    // Check for Mersenne prime (2^p - 1)
    let p = 2;
    while (Math.pow(2, p) - 1 <= num) {
      if (Math.pow(2, p) - 1 === num && isPrime(num)) {
        specialTypes.push('Mersenne Prime');
        break;
      }
      p++;
    }
    
    return specialTypes;
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      
      <title>Prime Number Checker | Check If a Number Is Prime with Factorization | GrockTool.com</title>
      <meta name="description" content="Free online Prime Number Checker tool. Check if a number is prime or composite, find all factors, prime factorization, and learn about prime number properties with detailed mathematical analysis." />
      <meta name="keywords" content="prime number checker, prime number, is prime, prime calculator, number theory, factorization, prime factorization, mathematics, cryptography, composite numbers" />
      <meta property="og:title" content="Prime Number Checker | Check If a Number Is Prime with Factorization" />
      <meta property="og:description" content="Free online Prime Number Checker tool. Check if a number is prime or composite, find all factors, and learn about prime number properties." />
      <link rel="canonical" href="https://grocktool.com/math-tools/prime-checker" />
     

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
                <CheckCircle size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-600">Number Theory • Factorization • Mathematical Analysis</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Prime Number Checker
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Check If a Number Is Prime • Find All Factors • Prime Factorization • Mathematical Properties
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Prime Detection</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Divide size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Factorization</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Search size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Mathematical Analysis</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Hash size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Number Theory</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Calculator & Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Test Numbers Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="text-xs text-muted-foreground">Quick Test Numbers:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setNumber('97')}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      97 (Prime)
                    </button>
                    <button
                      onClick={() => setNumber('100')}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      100 (Composite)
                    </button>
                    <button
                      onClick={() => setNumber('7919')}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      7919 (Large Prime)
                    </button>
                    <button
                      onClick={() => setNumber('2')}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      2 (Even Prime)
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
                      <Search size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Prime Number Checker
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-green-600">
                      <Zap size={12} />
                      <span>Mathematical analysis</span>
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Enter Any Positive Integer
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="e.g., 17, 97, 100, 7919"
                        className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        min="1"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Hash size={16} className="text-muted-foreground" />
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-green-500 text-white rounded-full p-1">
                          <Zap size={10} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter any positive integer greater than 1 to check if it's prime
                    </p>
                  </div>

                  {/* Quick Sample Buttons */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Quick Prime Samples
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {samplePrimes.slice(0, 8).map((prime) => (
                        <button
                          key={prime}
                          onClick={() => setNumber(prime.toString())}
                          className="px-2 py-1 text-xs bg-green-500/10 text-green-600 rounded border border-green-500/20 hover:bg-green-500/20 transition-colors"
                        >
                          {prime}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sampleComposites.slice(0, 8).map((composite) => (
                        <button
                          key={composite}
                          onClick={() => setNumber(composite.toString())}
                          className="px-2 py-1 text-xs bg-blue-500/10 text-blue-600 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          {composite}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={checkPrime}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-green-700 hover:to-blue-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Search size={16} className="sm:w-4 sm:h-4" />
                      Check Prime & Factorize
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
                    {/* Prime Status */}
                    <div className={`p-6 rounded-lg border ${
                      result.isPrime 
                        ? 'bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20' 
                        : 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20'
                    }`}>
                      <div className="flex items-center gap-4">
                        {result.isPrime ? (
                          <div className="bg-green-500/20 p-3 rounded-full">
                            <CheckCircle size={28} className="text-green-600" />
                          </div>
                        ) : (
                          <div className="bg-blue-500/20 p-3 rounded-full">
                            <XCircle size={28} className="text-blue-600" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-foreground">
                            {number} is {result.isPrime ? 'a PRIME Number' : 'a COMPOSITE Number'}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {result.isPrime 
                              ? `✓ ${number} has exactly 2 factors: 1 and itself`
                              : `✗ ${number} has ${result.factors.length} factors`
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Factors Count</div>
                          <div className={`text-2xl font-bold ${result.isPrime ? 'text-green-600' : 'text-blue-600'}`}>
                            {result.factors.length}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special Prime Types */}
                    {result.isPrime && (
                      <div className="p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/20">
                        <h4 className="text-sm font-medium text-foreground mb-2">Special Prime Properties:</h4>
                        <div className="flex flex-wrap gap-2">
                          {checkSpecialPrime(parseInt(number)).map((type, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-xs bg-amber-500/20 text-amber-600 rounded-full border border-amber-500/30"
                            >
                              {type}
                            </span>
                          ))}
                          {checkSpecialPrime(parseInt(number)).length === 0 && (
                            <span className="text-sm text-muted-foreground">Standard prime number</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Prime Factorization */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground">Prime Factorization</h3>
                      <div className="p-4 bg-gradient-to-r from-secondary/20 to-secondary/10 rounded-lg border border-border">
                        <div className="text-center">
                          <span className="text-xl font-mono text-foreground">{number}</span>
                          <span className="mx-3 text-muted-foreground">=</span>
                          <span className="text-xl font-mono text-foreground">
                            {primeFactorization(parseInt(number)).map((factor, index, array) => (
                              <span key={factor.prime}>
                                {factor.prime}
                                {factor.exponent > 1 && <sup>{factor.exponent}</sup>}
                                {index < array.length - 1 && ' × '}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Factors Display */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-foreground">
                          All Factors of {number}
                        </h3>
                        <div className="text-sm text-muted-foreground">
                          Total: {result.factors.length} factor{result.factors.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {result.factors.map((factor, index) => (
                          <div
                            key={index}
                            className="relative group"
                          >
                            <span
                              className={`px-3 py-2 rounded-lg text-sm font-medium ${
                                factor === 1 || factor === parseInt(number)
                                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm'
                                  : isPrime(factor)
                                  ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-600 border border-green-500/30'
                                  : 'bg-secondary text-secondary-foreground'
                              }`}
                            >
                              {factor}
                            </span>
                            {isPrime(factor) && factor !== 1 && factor !== parseInt(number) && (
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-foreground text-background px-2 py-1 rounded text-xs whitespace-nowrap">
                                Prime factor
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mathematical Properties */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-purple-500/5 to-purple-600/5 rounded-lg border border-purple-500/20">
                        <div className="text-sm text-muted-foreground">Square Root</div>
                        <div className="text-lg font-semibold text-foreground font-mono">
                          √{number} ≈ {result.sqrt.toFixed(6)}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">Tested divisibility up to this value</div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Number Type</div>
                        <div className="text-lg font-semibold text-foreground">
                          {result.isPrime ? 'Prime' : 'Composite'}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {result.isPrime 
                            ? 'Exactly 2 divisors' 
                            : `${result.factors.length} divisors`
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Prime Numbers Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-600" />
                  Prime Numbers Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Prime Properties */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <CheckCircle size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Prime Number Properties</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Exactly 2 divisors:</strong> 1 and the number itself</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Greater than 1:</strong> 1 is not prime (only one divisor)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Infinite:</strong> Euclid proved primes are infinite</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Fundamental Theorem:</strong> Every integer has unique prime factorization</span>
                      </div>
                    </div>
                  </div>

                  {/* Special Prime Types */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Target size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Special Prime Numbers</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Twin Primes:</strong> Pairs differing by 2 (3 & 5, 11 & 13)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Mersenne Primes:</strong> 2^p - 1 form (3, 7, 31, 127)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Sophie Germain:</strong> p where 2p + 1 is also prime</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Even Prime:</strong> 2 (only even prime number)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Prime Numbers</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">First 10 Primes</span>
                      <span className="font-mono">2, 3, 5, 7, 11, 13, 17, 19, 23, 29</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Large Primes</span>
                      <span className="font-mono">7919, 104729, 1299709</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Twin Primes</span>
                      <span className="font-mono">(3,5), (11,13), (17,19), (29,31)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Mersenne Primes</span>
                      <span className="font-mono">3, 7, 31, 127, 8191</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - History & Info (Removed as requested) */}
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
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Prime Number Checker - Features & Mathematical Analysis</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Prime Number Checker provides comprehensive mathematical analysis of any positive integer, determining whether it's prime or composite with detailed factorization and mathematical properties. The tool uses optimized algorithms to check divisibility up to the square root of the number, significantly improving performance for large numbers. Beyond simple prime detection, it provides complete factorization, prime factorization (showing the number as a product of prime powers), identification of special prime types (twin primes, Mersenne primes, Sophie Germain primes), and detailed mathematical properties. This makes it an invaluable resource for students, mathematicians, computer scientists, and anyone interested in number theory and mathematical analysis.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Prime Detection</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Advanced algorithms determine primality with mathematical precision, handling numbers up to JavaScript's maximum safe integer with optimized divisibility testing up to the square root.</p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Divide size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Complete Factorization</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Provides all factors of the number, prime factorization showing the number as a product of prime powers, and identifies prime factors versus composite factors in the results.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Mathematical Analysis</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Identifies special prime types (twin primes, Mersenne primes, Sophie Germain primes), calculates square root for algorithmic verification, and provides detailed mathematical properties and explanations.</p>
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
                    <CheckCircle size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Prime Number Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔐 Cryptography & Security Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>RSA Encryption</strong>: Using large prime numbers (typically 1024-bit or 2048-bit) to generate public and private keys for secure data transmission and digital signatures</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>SSL/TLS Certificates</strong>: Prime numbers in cryptographic protocols that secure internet communications, online banking, and e-commerce transactions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Digital Signatures</strong>: Prime-based algorithms for verifying the authenticity and integrity of digital documents and software</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Cryptographic Hash Functions</strong>: Prime numbers in algorithms like SHA (Secure Hash Algorithm) for data integrity and password storage</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💻 Computer Science & Programming</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Hash Tables & Data Structures</strong>: Using prime numbers for hash function modulo operations to minimize collisions and optimize data retrieval</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Random Number Generation</strong>: Prime numbers in pseudorandom number generators and cryptographic random number algorithms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Algorithm Optimization</strong>: Prime-based algorithms for efficient computation, including the Fast Fourier Transform and number theory algorithms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Error Detection & Correction</strong>: Prime numbers in checksum algorithms and error-correcting codes for data integrity</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🧮 Mathematics & Education</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Number Theory Research</strong>: Studying prime distribution (Prime Number Theorem), twin prime conjecture, and Goldbach's conjecture in pure mathematics</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Mathematical Education</strong>: Teaching fundamental concepts of divisibility, factorization, and number properties in school mathematics curriculum</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Competitive Programming</strong>: Prime number problems in coding competitions, algorithm challenges, and mathematical programming contests</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Scientific Computing</strong>: Prime numbers in numerical analysis, computational mathematics, and scientific simulations</span>
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
                    <Search size={20} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Prime Number Checker - Complete Guide</h2>
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
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Your Number</div>
                            <div className="text-sm text-muted-foreground">Input any positive integer greater than 1. Use quick samples or test numbers like 97 (prime) or 100 (composite).</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Check Prime Status</div>
                            <div className="text-sm text-muted-foreground">Click "Check Prime & Factorize" to analyze the number. The algorithm tests divisibility up to the square root.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Review Results</div>
                            <div className="text-sm text-muted-foreground">Examine prime/composite status, all factors, prime factorization, and special mathematical properties.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Analyze & Learn</div>
                            <div className="text-sm text-muted-foreground">Study the factorization, understand prime properties, and explore mathematical concepts through examples.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Prime Analysis Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span><strong>Use Quick Samples</strong>: Test with known primes (97, 7919) and composites (100, 144) to understand different number types</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <CheckCircle size={12} className="text-accent" />
                          </div>
                          <span><strong>Check Special Properties</strong>: Look for twin primes, Mersenne primes, and Sophie Germain primes in the results analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Divide size={12} className="text-accent" />
                          </div>
                          <span><strong>Study Factorization</strong>: Examine prime factorization to understand how numbers are built from prime building blocks</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Hash size={12} className="text-accent" />
                          </div>
                          <span><strong>Explore Number Patterns</strong>: Test consecutive numbers to observe prime distribution and look for patterns in results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-accent" />
                          </div>
                          <span><strong>Verify Mathematical Properties</strong>: Check that prime numbers have exactly 2 factors and composite numbers have more</span>
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
                  <h2 className="text-xl font-bold text-foreground">Prime Number Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Prime Number Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Number</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Prime Status</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Prime Factorization</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Factors Count</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Special Properties</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">2</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-medium">Prime</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2</td>
                                  <td className="px-4 py-3 text-sm text-foreground">2</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Only even prime</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">17</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-medium">Prime</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">17</td>
                                  <td className="px-4 py-3 text-sm text-foreground">2</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">-</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">97</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-medium">Prime</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">97</td>
                                  <td className="px-4 py-3 text-sm text-foreground">2</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Two-digit prime</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">100</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Composite</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2² × 5²</td>
                                  <td className="px-4 py-3 text-sm text-foreground">9</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Perfect square</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">7919</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-medium">Prime</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">7919</td>
                                  <td className="px-4 py-3 text-sm text-foreground">2</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">1000th prime</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">144</td>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-medium">Composite</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2⁴ × 3²</td>
                                  <td className="px-4 py-3 text-sm text-foreground">15</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Fibonacci, square</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">1</td>
                                  <td className="px-4 py-3 text-sm text-red-600 font-medium">Neither</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">-</td>
                                  <td className="px-4 py-3 text-sm text-foreground">1</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Unit number</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Prime Factorization Analysis</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Complete prime analysis of 360 with mathematical verification

Step 1: Input number
Number to analyze: 360

Step 2: Check if prime
360 is greater than 1 ✓
Check divisibility by 2: 360 ÷ 2 = 180 (divisible) ✗
Conclusion: 360 is COMPOSITE (not prime)

Step 3: Find all factors
Factors are numbers that divide 360 exactly:
1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360
Total factors: 24

Step 4: Prime factorization
Breaking 360 down to prime factors:

Method A: Division method
360 ÷ 2 = 180
180 ÷ 2 = 90
90 ÷ 2 = 45
45 ÷ 3 = 15
15 ÷ 3 = 5
5 ÷ 5 = 1

Result: 360 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5¹

Method B: Factor tree
      360
     /   \\
    2    180
        /   \\
       2    90
           /  \\
          2   45
             /  \\
            3   15
               /  \\
              3    5

Result: Same factorization: 2³ × 3² × 5

Step 5: Mathematical verification
Verify factorization:
2³ = 8
3² = 9
5¹ = 5
8 × 9 × 5 = 72 × 5 = 360 ✓

Step 6: Number of factors formula
For prime factorization: p₁^a × p₂^b × p₃^c
Number of factors = (a+1) × (b+1) × (c+1)
For 360: 2³ × 3² × 5¹
Number of factors = (3+1) × (2+1) × (1+1) = 4 × 3 × 2 = 24 ✓
Matches our count from Step 3.

Step 7: Sum of factors formula
Sum of factors = [(p₁^(a+1)-1)/(p₁-1)] × [(p₂^(b+1)-1)/(p₂-1)] × [(p₃^(c+1)-1)/(p₃-1)]
For 360:
Sum = [(2⁴-1)/(2-1)] × [(3³-1)/(3-1)] × [(5²-1)/(5-1)]
    = [(16-1)/1] × [(27-1)/2] × [(25-1)/4]
    = [15/1] × [26/2] × [24/4]
    = 15 × 13 × 6 = 1170

Verification: 1+2+3+4+5+6+8+9+10+12+15+18+20+24+30+36+40+45+60+72+90+120+180+360 = 1170 ✓

Step 8: Check for perfect number
A perfect number equals the sum of its proper factors (excluding itself).
Proper factors sum = 1170 - 360 = 810
810 ≠ 360, so 360 is not perfect.

Step 9: Check for other properties
• Abundant number: Sum of proper factors (810) > number (360) ✓
• Harshad number: Divisible by sum of its digits (3+6+0=9, 360÷9=40) ✓
• Highly composite: Has more factors than any smaller number ✓
• Practical number: All smaller numbers can be expressed as sums of distinct factors ✓

Step 10: Cryptographic relevance
While 360 itself isn't used in cryptography, understanding its factorization helps understand:
• How large numbers (like RSA keys) are constructed from primes
• Why prime factorization is computationally difficult for large numbers
• The fundamental theorem of arithmetic in action

Step 11: Educational insights
• 360 shows how numbers are built from prime "building blocks"
• Demonstrates relationship between prime factorization and number of factors
• Illustrates mathematical patterns in number theory
• Provides basis for understanding more advanced concepts

Step 12: Algorithm efficiency note
For large numbers like 360, our algorithm:
1. Checks divisibility by 2 (even test)
2. Tests odd divisors up to √360 ≈ 18.97
3. Only needs to test: 3, 5, 7, 9, 11, 13, 15, 17
4. Finds factor 3 on first odd test
Significantly faster than testing all numbers up to 360.

Final Analysis Summary:
Number: 360
Status: Composite
Prime Factorization: 2³ × 3² × 5
Total Factors: 24
Factor Sum: 1170
Properties: Abundant, Harshad, Highly Composite, Practical
Mathematical Significance: Demonstrates fundamental theorem of arithmetic`}
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
                    <CheckCircle size={20} className="text-green-600" />
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