'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, ChevronUp, ChevronDown, ChevronRight, Percent, DollarSign, Hash, Globe, SortAsc, FileText, Maximize2, Shuffle, TrendingUp, BookOpen, Divide, Asterisk, Target, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

const LCMHCFCalculator = () => {
  const [numbers, setNumbers] = useState('');
  const [result, setResult] = useState<{ lcm: number; hcf: number; factors: number[][] } | null>(null);
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
    { name: 'Number to Words', path: '/number-tools/number-to-words', icon: FileText },
    { name: 'Scientific Notation', path: '/number-tools/scientific-notation', icon: Maximize2 },
    { name: 'Base Converter', path: '/number-tools/number-base-converter', icon: Globe },
    { name: 'Number Rounding', path: '/number-tools/rounding', icon: TrendingUp },
    { name: 'Random Generator', path: '/number-tools/random-generator', icon: Shuffle }
  ];

  // FAQ Data
  const faqData = [
    {
      question: "What is the difference between LCM and HCF?",
      answer: "LCM (Least Common Multiple) is the smallest number that is a multiple of all given numbers, while HCF (Highest Common Factor) is the largest number that divides all given numbers without remainder. For example, for numbers 12 and 18: LCM is 36 (smallest number divisible by both), HCF is 6 (largest number dividing both). LCM is used when finding common denominators, while HCF simplifies fractions."
    },
    {
      question: "How many numbers can I calculate LCM and HCF for?",
      answer: "This calculator can handle multiple numbers simultaneously. You can enter any number of positive integers separated by commas. There's no strict limit, but for practical purposes and performance, it's recommended to enter reasonable numbers (typically 2-10 numbers). The calculator uses efficient algorithms to compute results instantly regardless of the number of inputs."
    },
    {
      question: "What is the mathematical formula for calculating LCM and HCF?",
      answer: "For two numbers a and b: LCM(a,b) = (a × b) / HCF(a,b). For multiple numbers, the process is iterative: LCM = LCM(LCM(a,b), c) and so on. HCF (also called GCD) uses the Euclidean algorithm: HCF(a,b) = HCF(b, a mod b) until remainder is zero. This calculator implements both methods efficiently, showing prime factorization for better understanding."
    },
    {
      question: "Can I calculate LCM and HCF for decimal or negative numbers?",
      answer: "This calculator is designed for positive integers only. LCM and HCF are mathematically defined only for positive integers. For negative numbers, you can convert them to positive as LCM/HCF of positive and negative numbers are the same in absolute value. Decimal numbers should be converted to integers by multiplying by appropriate power of 10 before calculation."
    },
    {
      question: "What are some real-world applications of LCM and HCF?",
      answer: "LCM is used in: 1) Finding when events repeat (bus schedules, planetary alignments), 2) Adding fractions with different denominators, 3) Electronics for signal synchronization. HCF is used in: 1) Simplifying fractions to lowest terms, 2) Distributing items into equal groups, 3) Cryptography algorithms, 4) Tiling floors with square tiles of maximum size, 5) Reducing ratios to simplest form."
    }
  ];

  useEffect(() => {
    document.title = 'LCM & HCF Calculator - GrockTool';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Calculate LCM and HCF of multiple numbers with GrockTool\'s free calculator.');
    }
  }, []);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  const getPrimeFactors = (num: number): number[] => {
    const factors: number[] = [];
    let divisor = 2;

    while (num > 1) {
      while (num % divisor === 0) {
        factors.push(divisor);
        num /= divisor;
      }
      divisor++;
    }

    return factors;
  };

  const calculate = () => {
    const numArray = numbers.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n) && n > 0);

    if (numArray.length < 2) {
      setResult(null);
      return;
    }

    let currentLcm = numArray[0];
    let currentHcf = numArray[0];

    for (let i = 1; i < numArray.length; i++) {
      currentLcm = lcm(currentLcm, numArray[i]);
      currentHcf = gcd(currentHcf, numArray[i]);
    }

    const factors = numArray.map(getPrimeFactors);

    setResult({ lcm: currentLcm, hcf: currentHcf, factors });
  };

  const reset = () => {
    setNumbers('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `Numbers: ${numbers}\nLCM: ${result.lcm}\nHCF: ${result.hcf}\nPrime Factors: ${result.factors.map((f, i) => `Number ${i + 1}: ${f.join(' × ')}`).join('\n')}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Set example calculations
  const setExampleCalculation = (exampleType: string) => {
    switch (exampleType) {
      case 'basic':
        setNumbers('12, 18');
        break;
      case 'threeNumbers':
        setNumbers('15, 20, 25');
        break;
      case 'primeNumbers':
        setNumbers('7, 11, 13');
        break;
      case 'largeNumbers':
        setNumbers('48, 72, 96');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">

      <title>LCM & HCF Calculator | Find Least Common Multiple & Highest Common Factor | GrockTool.com</title>
      <meta name="description" content="Free LCM & HCF Calculator - Calculate Least Common Multiple and Highest Common Factor of multiple numbers instantly. Get prime factorization and step-by-step solutions." />
      <meta name="keywords" content="LCM calculator, HCF calculator, GCD calculator, least common multiple, highest common factor, greatest common divisor, prime factorization calculator" />
      <meta property="og:title" content="LCM & HCF Calculator | Find Least Common Multiple & Highest Common Factor" />
      <meta property="og:description" content="Free LCM & HCF Calculator - Calculate Least Common Multiple and Highest Common Factor of multiple numbers instantly with prime factorization." />
      <link rel="canonical" href="https://grocktool.com/number-tools/lcm-hcf-calculator" />


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
                <SortAsc size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Mathematical Calculation • Prime Factorization • Real-Time Results</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                LCM & HCF Calculator
                <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-muted-foreground mt-2">
                  Calculate Least Common Multiple & Highest Common Factor • Multiple Numbers • Prime Factorization
                </span>
              </h1>

              <div className="flex flex-wrap justify-center gap-4 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Asterisk size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">LCM Calculation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Divide size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">HCF/GCD Calculation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Target size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Prime Factorization</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Calculator size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Multiple Numbers</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Input */}
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setExampleCalculation('basic')}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Calculator size={12} />
                      12, 18
                    </button>
                    <button
                      onClick={() => setExampleCalculation('threeNumbers')}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Calculator size={12} />
                      15, 20, 25
                    </button>
                    <button
                      onClick={() => setExampleCalculation('primeNumbers')}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Calculator size={12} />
                      7, 11, 13
                    </button>
                    <button
                      onClick={() => setExampleCalculation('largeNumbers')}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Calculator size={12} />
                      48, 72, 96
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Input Card */}
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
                        Enter Numbers for LCM & HCF Calculation
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Calculator size={12} />
                      <span>Real-time calculation</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={numbers}
                          onChange={(e) => setNumbers(e.target.value)}
                          placeholder="e.g., 12, 18, 24"
                          className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground placeholder:text-muted-foreground"
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                          <SortAsc size={16} className="text-muted-foreground" />
                        </div>
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="bg-blue-500 text-white rounded-full p-1">
                            <Calculator size={10} />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter at least 2 positive numbers separated by commas. Example: 12, 18, 24
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={calculate}
                        disabled={!numbers}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Calculator size={16} className="sm:w-4 sm:h-4" />
                        Calculate LCM & HCF
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
                      <h3 className="text-lg font-semibold text-foreground">LCM & HCF Calculation Results</h3>
                      <p className="text-sm text-muted-foreground">
                        For numbers: {numbers}
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
                    {/* LCM & HCF Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 p-6 rounded-lg border border-blue-500/20 text-center">
                        <div className="text-sm text-muted-foreground mb-2 flex items-center justify-center gap-2">
                          <Asterisk size={14} />
                          Least Common Multiple
                        </div>
                        <div className="text-3xl font-bold text-foreground">
                          {result.lcm.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">LCM of all given numbers</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 p-6 rounded-lg border border-green-500/20 text-center">
                        <div className="text-sm text-muted-foreground mb-2 flex items-center justify-center gap-2">
                          <Divide size={14} />
                          Highest Common Factor
                        </div>
                        <div className="text-3xl font-bold text-foreground">
                          {result.hcf.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">HCF/GCD of all given numbers</div>
                      </div>
                    </div>

                    {/* Prime Factorization */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Target size={16} className="text-purple-600" />
                        Prime Factorization Breakdown
                      </h4>
                      <div className="bg-gradient-to-r from-secondary/20 to-secondary/10 p-4 rounded-lg border border-border">
                        <div className="space-y-3">
                          {numbers.split(',').map((num, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-card/50 rounded border border-border/50">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground text-sm">{num.trim()}:</span>
                                <span className="text-xs text-muted-foreground">=</span>
                              </div>
                              <div className="flex-1">
                                <div className="text-sm text-muted-foreground font-mono">
                                  {result.factors?.[index]?.length
                                    ? result.factors[index].join(' × ')
                                    : 'Prime Number'}
                                </div>
                              </div>
                              <div className="text-xs text-green-600">
                                {result.factors[index].length === 1 ? 'Prime' : 'Composite'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Relationship Visualization */}
                    <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/20">
                      <h4 className="text-sm font-medium text-foreground mb-2">Mathematical Relationship</h4>
                      <div className="text-xs text-muted-foreground">
                        For two numbers a and b: <span className="font-mono font-bold">LCM(a,b) × HCF(a,b) = a × b</span>
                        <br />
                        <span className="text-green-600 font-medium">This fundamental relationship always holds true for any two positive integers.</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Info & Guide */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-600" />
                  LCM & HCF Quick Guide
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Asterisk size={16} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">LCM (Least Common Multiple)</h4>
                        <p className="text-xs text-muted-foreground">Smallest number divisible by all given numbers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Divide size={16} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm">HCF (Highest Common Factor)</h4>
                        <p className="text-xs text-muted-foreground">Largest number dividing all given numbers</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                    <h5 className="text-xs font-medium text-foreground mb-2">Calculation Methods:</h5>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Prime Factorization Method</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Euclidean Algorithm (for HCF)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Division Method</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span>Listing Multiples/Factors</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm space-y-2 pt-2">
                    <div className="font-medium text-foreground">Key Properties:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>LCM of prime numbers = product of those numbers</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>HCF of co-prime numbers = 1</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>LCM ≥ each given number ≥ HCF</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                      <span>LCM × HCF = Product of numbers (for two numbers)</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Applications Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Target size={18} className="text-green-600" />
                  Real-World Applications
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <div className="text-xs sm:text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>LCM: Adding fractions with different denominators</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                      <span>LCM: Finding when repeating events coincide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>HCF: Simplifying fractions to lowest terms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      <span>HCF: Distributing items into equal groups</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span>Both: Cryptography and computer algorithms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      <span>Both: Tiling and packaging optimization</span>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm space-y-2 pt-3">
                    <div className="font-medium text-foreground">Example Scenarios:</div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Bus A arrives every 15 minutes, Bus B every 20 minutes - when do they arrive together? (LCM = 60 min)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-accent rounded-full"></div>
                      <span>Distribute 12 apples and 18 oranges equally among children (HCF = 6 children)</span>
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
                    <SortAsc size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">LCM & HCF Calculator - Features & Mathematical Benefits</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This LCM & HCF Calculator provides instant, accurate calculations for finding the Least Common Multiple (LCM) and Highest Common Factor (HCF) of multiple numbers. Using advanced mathematical algorithms including prime factorization and the Euclidean algorithm, it efficiently computes results for any number of positive integers. The tool goes beyond basic calculation by displaying detailed prime factorization for each input number, helping users understand the mathematical process behind LCM and HCF determination. With support for multiple numbers, real-time validation, and educational breakdowns, this calculator is essential for students, teachers, and professionals working with number theory, fractions, or mathematical problem-solving.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Asterisk size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Accurate LCM Calculation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Computes Least Common Multiple using prime factorization and iterative methods for any number of inputs with mathematical precision.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Divide size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Efficient HCF Determination</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Calculates Highest Common Factor using the Euclidean algorithm, providing optimized solutions for multiple numbers simultaneously.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Prime Factorization</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Shows complete prime factorization for each input number, helping users understand the mathematical foundation of LCM and HCF calculations.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Practical LCM & HCF Applications</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📚 Academic & Educational Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Mathematics classrooms teaching number theory, fractions, and divisibility rules to students of all levels</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Homework assistance for solving complex LCM and HCF problems involving multiple numbers and large integers</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Exam preparation for competitive tests, entrance exams, and standardized mathematics assessments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Curriculum development and lesson planning for mathematics teachers and educational institutions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🔢 Mathematical & Computational Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Fraction operations - adding, subtracting, and comparing fractions with different denominators using LCM</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Algebraic expression simplification - reducing rational expressions to simplest form using HCF</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Cryptography algorithms - RSA and other encryption methods that rely on number theory concepts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Computer science applications - scheduling algorithms, memory allocation, and optimization problems</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏢 Professional & Real-World Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Engineering projects - finding optimal gear ratios, circuit timing, and synchronization in mechanical systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Construction and architecture - determining tile sizes, material cutting plans, and modular design layouts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Manufacturing and production - optimizing batch sizes, packaging configurations, and inventory management</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span>Event planning - coordinating schedules, recurring meetings, and timeline synchronization across multiple factors</span>
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
                  <h2 className="text-xl font-bold text-foreground">How to Calculate LCM & HCF - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Enter Your Numbers</div>
                            <div className="text-sm text-muted-foreground">Input at least 2 positive integers separated by commas. Use quick examples for common scenarios.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Click Calculate</div>
                            <div className="text-sm text-muted-foreground">Press the calculate button to compute both LCM and HCF using optimized mathematical algorithms.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Review Results</div>
                            <div className="text-sm text-muted-foreground">Examine LCM and HCF values along with detailed prime factorization for each input number.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Save & Analyze</div>
                            <div className="text-sm text-muted-foreground">Copy results for documentation or analyze the mathematical relationships between numbers.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Pro Calculation Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Asterisk size={12} className="text-accent" />
                          </div>
                          <span>For prime numbers, LCM is their product and HCF is 1 (if different primes)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Divide size={12} className="text-accent" />
                          </div>
                          <span>For consecutive numbers, HCF is always 1 (they are co-prime)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span>Use copy feature to save calculations for academic work or professional documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-accent" />
                          </div>
                          <span>Study prime factorization to understand the mathematical foundation of results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span>For large numbers, the calculator uses efficient algorithms that manual calculation cannot match</span>
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
                  <h2 className="text-xl font-bold text-foreground">LCM & HCF Calculation Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common LCM & HCF Scenarios</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Numbers</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">LCM</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">HCF</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Prime Factorization</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Explanation</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">12, 18</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">36</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">6</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">12=2×2×3, 18=2×3×3</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">LCM: 2×2×3×3=36, HCF: 2×3=6</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">15, 20, 25</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">300</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">5</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">15=3×5, 20=2×2×5, 25=5×5</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Common factor 5, LCM includes all factors</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">7, 11, 13</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">1001</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">1</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">7, 11, 13 are prime</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Prime numbers: LCM=product, HCF=1</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">48, 72, 96</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">288</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">24</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">48=2×2×2×2×3, 72=2×2×2×3×3, 96=2×2×2×2×2×3</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">All divisible by 24, LCM includes max prime powers</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono">8, 9, 21</td>
                                  <td className="px-4 py-3 text-sm text-green-600 font-mono font-bold">504</td>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">1</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">8=2×2×2, 9=3×3, 21=3×7</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Co-prime numbers: HCF=1, LCM=product of distinct primes</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Calculation Example</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {`Example: Calculate LCM and HCF for numbers 12, 18, and 24

Step 1: Prime Factorization
12 = 2 × 2 × 3 = 2² × 3¹
18 = 2 × 3 × 3 = 2¹ × 3²
24 = 2 × 2 × 2 × 3 = 2³ × 3¹

Step 2: Calculate LCM
For LCM, take the highest power of each prime factor:
Prime 2: Highest power = 2³ (from 24)
Prime 3: Highest power = 3² (from 18)
LCM = 2³ × 3² = 8 × 9 = 72

Step 3: Calculate HCF
For HCF, take the lowest power of each common prime factor:
Prime 2: Lowest power = 2¹ (common to all)
Prime 3: Lowest power = 3¹ (common to all)
HCF = 2¹ × 3¹ = 2 × 3 = 6

Step 4: Verification
Check: LCM should be divisible by all numbers
72 ÷ 12 = 6 ✓
72 ÷ 18 = 4 ✓
72 ÷ 24 = 3 ✓

Check: HCF should divide all numbers
12 ÷ 6 = 2 ✓
18 ÷ 6 = 3 ✓
24 ÷ 6 = 4 ✓

Step 5: Alternative Method - Euclidean Algorithm for HCF
HCF(12, 18) = 6
Then HCF(6, 24) = 6
Therefore HCF(12, 18, 24) = 6

Step 6: Relationship Check
For two numbers at a time:
12 × 18 = 216, LCM(12,18) × HCF(12,18) = 36 × 6 = 216 ✓
18 × 24 = 432, LCM(18,24) × HCF(18,24) = 72 × 6 = 432 ✓

Step 7: Real-World Application
Scenario: Three buses depart from a station at intervals of 12, 18, and 24 minutes.
They first depart together at time 0.
When will they next depart together?
Answer: LCM(12,18,24) = 72 minutes
So they will next depart together after 1 hour 12 minutes.

Step 8: Mathematical Insights
• The numbers share common factors 2 and 3
• 6 is the largest number dividing all three
• 72 is the smallest number divisible by all three
• Prime factorization reveals the structure of the numbers

Step 9: Common Mistakes to Avoid
❌ Taking all prime factors instead of highest powers for LCM
❌ Taking highest powers instead of lowest for HCF
❌ Forgetting to include primes that appear in some numbers
❌ Not verifying results with divisibility checks

Final Results:
• Numbers: 12, 18, 24
• Prime Factorization: 
  12 = 2² × 3¹
  18 = 2¹ × 3²
  24 = 2³ × 3¹
• LCM (Least Common Multiple): 72
• HCF (Highest Common Factor): 6
• Verification: All checks passed
• Application: Buses meet every 72 minutes`}
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
};

export default LCMHCFCalculator;