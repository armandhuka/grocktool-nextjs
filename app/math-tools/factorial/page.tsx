'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, RotateCcw, Copy, ArrowLeft, Calculator, PieChart, TrendingUp, Zap, Target, Triangle, Circle, BarChart, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Factorial() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<{ factorial: string; steps: string[] } | null>(null);
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
    { name: 'Multiplication Tables', path: '/math-tools/multiplication-table', icon: TrendingUp },
    { name: 'Quadratic Equation Solver', path: '/math-tools/quadratic-solver', icon: Zap },
    { name: 'Percentage Change Calculator', path: '/math-tools/percentage-change', icon: Target },
    { name: 'Triangle Area Calculator', path: '/math-tools/triangle-area', icon: Triangle },
    { name: 'Circle Area Calculator', path: '/math-tools/circle-calculator', icon: Circle },
    { name: 'Logarithm Calculator', path: '/math-tools/exponent-log', icon: BarChart }
  ];

  const faqData = [
    {
      question: "Why is 0 factorial equal to 1?",
      answer: "The value of 0! = 1 is defined by mathematical convention for consistency in combinatorial formulas and mathematical equations. This definition preserves the fundamental properties of factorials, such as the recurrence relation n! = n × (n-1)!, which would break if 0! were anything else. It also aligns with the number of ways to arrange zero objects, which is exactly one way."
    },
    {
      question: "What is the largest factorial I can calculate with this tool?",
      answer: "This factorial calculator can compute factorials up to 170! (170 factorial). Beyond this point, the values exceed JavaScript's maximum safe integer range. The result for 170! is approximately 7.26 × 10^306, which demonstrates the rapid growth rate of factorial functions in mathematics and computer science."
    },
    {
      question: "How are factorials used in probability and statistics?",
      answer: "Factorials are fundamental in probability and statistics for calculating permutations and combinations. They're used in formulas for binomial coefficients (n choose k = n!/(k!(n-k)!)), probability distributions (like binomial and Poisson distributions), and statistical sampling methods. Factorials help determine the number of possible arrangements and selections in various scenarios."
    },
    {
      question: "What's the difference between permutations and combinations?",
      answer: "Permutations consider order and use the formula nPr = n!/(n-r)! for arranging r items from n total. Combinations ignore order and use nCr = n!/(r!(n-r)!) for selecting r items from n total. Factorials provide the mathematical foundation for both concepts, enabling precise calculations in combinatorial mathematics."
    },
    {
      question: "Why do factorials grow so quickly?",
      answer: "Factorials exhibit super-exponential growth because each multiplication adds a factor that increases with n. For example, 10! = 3.6 million, 20! ≈ 2.4 quintillion, and 50! ≈ 3.04 × 10^64. This rapid growth makes factorials computationally challenging for large numbers and demonstrates why they're used in algorithms and complexity analysis in computer science."
    }
  ];

  const calculateFactorial = (n: number): { factorial: bigint; steps: string[] } => {
    if (n === 0 || n === 1) {
      return { factorial: BigInt(1), steps: [`${n}! = 1`] };
    }

    let factorial = BigInt(1);
    const steps: string[] = [];
    const factors: number[] = [];

    for (let i = 1; i <= n; i++) {
      factorial *= BigInt(i);
      factors.push(i);
    }

    steps.push(`${n}! = ${factors.join(' × ')}`);
    steps.push(`${n}! = ${factorial.toString()}`);

    return { factorial, steps };
  };

  const calculate = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) {
      setResult(null);
      return;
    }

    if (num > 170) {
      setResult({
        factorial: 'Number too large (max: 170)',
        steps: ['Factorial of numbers greater than 170 results in infinity']
      });
      return;
    }

    const { factorial, steps } = calculateFactorial(num);
    setResult({ factorial: factorial.toString(), steps });
  };

  const reset = () => {
    setNumber('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result?.factorial) {
      try {
        await navigator.clipboard.writeText(result.factorial);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>Factorial Calculator | Calculate n! with Steps & Examples | ToolNest</title>
      <meta name="description" content="Free online factorial calculator. Compute n! for any number up to 170 with detailed step-by-step solutions. Perfect for mathematics, probability, and combinatorics calculations." />
      <meta name="keywords" content="factorial calculator, n factorial, factorial calculation, permutations, combinations, probability, statistics, mathematics, combinatorics, big numbers" />
      <meta property="og:title" content="Factorial Calculator | Calculate n! with Steps & Examples" />
      <meta property="og:description" content="Free online factorial calculator. Compute n! for any number up to 170 with detailed step-by-step solutions." />
      <link rel="canonical" href="https://grocktool.com/math-tools/factorial" />

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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 rounded-full mb-4 border border-blue-500/20">
                <Hash size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Combinatorics • Probability • Mathematics</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Factorial Calculator
                <span className="block text-lg sm:text-xl font-normal text-muted-foreground mt-2">
                  Calculate n! • Step-by-Step Solutions • Combinatorial Mathematics
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Hash size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Factorial Calculation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <PieChart size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Step-by-Step</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <TrendingUp size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Combinatorics</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Target size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Probability</span>
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
                      onClick={() => setNumber('5')}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      5! = 120
                    </button>
                    <button
                      onClick={() => setNumber('7')}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      7! = 5,040
                    </button>
                    <button
                      onClick={() => setNumber('10')}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      10! = 3.6M
                    </button>
                    <button
                      onClick={() => setNumber('0')}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      0! = 1
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
                      <Hash size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Factorial Calculator
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Zap size={12} />
                      <span>Combinatorial mathematics</span>
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Enter Any Non-Negative Integer (0-170)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="e.g., 5, 10, 50"
                        className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        min="0"
                        max="170"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Hash size={16} className="text-muted-foreground" />
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <Zap size={10} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Enter any non-negative integer between 0 and 170 to calculate its factorial
                    </p>
                  </div>

                  {/* Common Factorials */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Common Factorial Values
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button
                          key={num}
                          onClick={() => setNumber(num.toString())}
                          className="px-2 py-1.5 text-xs bg-blue-500/10 text-blue-600 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          {num}!
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={calculate}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Hash size={16} className="sm:w-4 sm:h-4" />
                      Calculate Factorial
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
                    <h3 className="text-lg font-semibold text-foreground">Factorial Calculation Result</h3>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Main Result Display */}
                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-lg border border-blue-500/20">
                      <div className="text-sm text-muted-foreground mb-2">Factorial Result</div>
                      <div className="text-2xl font-bold text-foreground font-mono break-all text-center">
                        {number}! = {result.factorial}
                      </div>
                      <div className="text-xs text-muted-foreground text-center mt-2">
                        {result.factorial.length > 20 ? `(${result.factorial.length} digits)` : ''}
                      </div>
                    </div>

                    {/* Steps Display */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground">Step-by-Step Calculation:</h4>
                      <div className="bg-muted p-4 rounded-lg space-y-3">
                        {result.steps.map((step, index) => (
                          <div key={index} className="text-sm font-mono text-foreground p-2 bg-card/50 rounded">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mathematical Properties */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Input Number</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          n = {number}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/5 to-purple-600/5 p-4 rounded-lg border border-purple-500/20">
                        <div className="text-sm text-muted-foreground">Notation</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          {number}!
                        </div>
                      </div>
                    </div>

                    {/* Growth Information */}
                    {parseInt(number) > 5 && (
                      <div className="p-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-lg border border-amber-500/20">
                        <h4 className="text-sm font-medium text-foreground mb-2">Factorial Growth Rate:</h4>
                        <div className="text-xs text-muted-foreground">
                          Factorials grow super-exponentially. {number}! has approximately {Math.floor(Math.log10(parseInt(result.factorial)))} digits. 
                          This demonstrates why factorials are used in combinatorial explosion problems and algorithm complexity analysis.
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Factorial Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Hash size={18} className="text-blue-600" />
                  Factorial Mathematics Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Factorial Properties */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Hash size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Factorial Properties</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>0! = 1:</strong> Mathematical definition for consistency in formulas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>1! = 1:</strong> Base case of factorial function</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>n! = n × (n-1)!:</strong> Recursive definition of factorial</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Super-exponential growth:</strong> Factorials grow faster than exponential functions</span>
                      </div>
                    </div>
                  </div>

                  {/* Applications */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <PieChart size={16} className="text-purple-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Key Applications</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Permutations:</strong> nPr = n!/(n-r)! for ordered arrangements</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Combinations:</strong> nCr = n!/(r!(n-r)!) for selections</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Probability:</strong> Calculating probabilities in complex scenarios</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Algorithm Analysis:</strong> Complexity analysis in computer science</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Factorial Values</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">0! - 5!</span>
                      <span className="font-mono">1, 1, 2, 6, 24, 120</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">6! - 10!</span>
                      <span className="font-mono">720, 5040, 40320, 362880, 3628800</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Large Factorials</span>
                      <span className="font-mono">20! ≈ 2.43×10^18, 50! ≈ 3.04×10^64</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-foreground">Max in Tool</span>
                      <span className="font-mono">170! ≈ 7.26×10^306</span>
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
                    <Hash size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Factorial Calculator - Mathematical Analysis Tool</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Factorial Calculator is a comprehensive mathematical tool designed to compute factorial values (n!) for any non-negative integer up to 170. Factorials are fundamental mathematical operations used extensively in combinatorics, probability theory, statistics, and computer science. The calculator not only provides the final result but also displays detailed step-by-step multiplication processes, helping users understand how factorials are computed. With support for BigInt precision, it accurately handles extremely large numbers that would overflow standard integer calculations. The tool is invaluable for students learning combinatorial mathematics, researchers analyzing permutations and combinations, programmers working with algorithm complexity, and anyone needing to calculate factorial values for practical applications.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Precise Calculation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Uses BigInt arithmetic for accurate computation of large factorial values up to 170!, preventing overflow errors and ensuring mathematical precision.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <PieChart size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Step-by-Step Solution</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Shows the complete multiplication sequence, helping users understand the factorial calculation process and verify mathematical results.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Educational Value</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Provides mathematical context, applications in combinatorics and probability, and helps users grasp factorial growth patterns and properties.</p>
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
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <PieChart size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Factorial Applications & Use Cases</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Combinatorics & Probability</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Permutation Calculations</strong>: Determining the number of ways to arrange n distinct objects (n! permutations)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Combination Formulas</strong>: Calculating binomial coefficients for n choose k selections in probability problems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Probability Distributions</strong>: Computing factorial values in binomial, Poisson, and hypergeometric probability distributions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Statistical Sampling</strong>: Analyzing permutations with repetitions and sampling without replacement scenarios</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💻 Computer Science & Programming</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Algorithm Analysis</strong>: Analyzing factorial time complexity O(n!) in combinatorial algorithms and brute-force solutions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Recursive Programming</strong>: Implementing factorial functions as classic examples of recursive algorithms and stack usage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Combinatorial Optimization</strong>: Solving traveling salesman problems and other NP-hard combinatorial optimization challenges</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Data Structure Analysis</strong>: Calculating possible permutations in tree structures and search algorithm possibilities</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🎓 Education & Research</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Mathematics Curriculum</strong>: Teaching fundamental combinatorial concepts in high school and college mathematics courses</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Research Mathematics</strong>: Computing factorial values in number theory, algebraic combinatorics, and special function analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Competitive Programming</strong>: Solving factorial-related problems in coding competitions and algorithm challenges</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Scientific Computing</strong>: Calculating factorial values in Taylor series expansions and mathematical approximations</span>
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
                    <Hash size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Factorial Calculator - Complete Guide</h2>
                </div>
                {openSections.howToUse ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.howToUse && (
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Simple 3-Step Process</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Your Number</div>
                            <div className="text-sm text-muted-foreground">Input any non-negative integer between 0 and 170. Use quick samples like 5!, 10!, or test edge cases like 0! and 1!.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Calculate Factorial</div>
                            <div className="text-sm text-muted-foreground">Click "Calculate Factorial" to compute n!. The tool uses optimized algorithms for precise computation even for large numbers.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Analyze Results</div>
                            <div className="text-sm text-muted-foreground">Review the factorial value, step-by-step calculation, mathematical properties, and applications information.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Advanced Usage Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span><strong>Test Growth Patterns</strong>: Calculate sequential factorials (5!, 6!, 7!) to observe super-exponential growth rates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <PieChart size={12} className="text-accent" />
                          </div>
                          <span><strong>Study Step-by-Step</strong>: Examine the multiplication sequence to understand how factorials accumulate</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <TrendingUp size={12} className="text-accent" />
                          </div>
                          <span><strong>Compare Values</strong>: Compare factorial sizes with exponential functions to appreciate growth differences</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-accent" />
                          </div>
                          <span><strong>Practical Applications</strong>: Use results in permutation/combination formulas for real-world probability problems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Hash size={12} className="text-accent" />
                          </div>
                          <span><strong>Educational Exploration</strong>: Test the 0! = 1 case to understand mathematical conventions and definitions</span>
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
                  <div className="bg-green-500/10 p-2 rounded-lg">
                    <Hash size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Factorial Calculation Examples</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Factorial Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">n</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">n! (Factorial)</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Step-by-Step Multiplication</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Applications</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">0</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">0! = 1 (by definition)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Base case in combinatorial formulas</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">1</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">1! = 1</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Single item arrangements</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">5</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">120</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">5×4×3×2×1 = 120</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">5 items have 120 permutations</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">7</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">5,040</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">7×6×5×4×3×2×1 = 5,040</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Days in factorial seconds ≈ 1.4 hours</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">10</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">3,628,800</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">10×9×8×7×6×5×4×3×2×1</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">10! seconds ≈ 42 days</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">20</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">2.43×10¹⁸</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">20×19×18×...×2×1</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Massive combinatorial possibilities</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: 5! Calculation</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Complete calculation of 5! with mathematical verification

Step 1: Input number
Number to analyze: 5

Step 2: Apply factorial definition
5! = 5 × 4 × 3 × 2 × 1

Step 3: Step-by-step multiplication
Start with: 1 (initial value)
Multiply by 5: 1 × 5 = 5
Multiply by 4: 5 × 4 = 20
Multiply by 3: 20 × 3 = 60
Multiply by 2: 60 × 2 = 120
Multiply by 1: 120 × 1 = 120

Step 4: Mathematical verification
Using the recursive definition:
5! = 5 × 4!
4! = 4 × 3! = 4 × 6 = 24
Therefore: 5! = 5 × 24 = 120 ✓

Alternative grouping verification:
5! = (5×4) × (3×2) × 1
    = 20 × 6 × 1
    = 120 ✓

Step 5: Application in permutations
Number of ways to arrange 5 distinct items = 5! = 120
Example: Arranging books A, B, C, D, E on a shelf has 120 possible orders.

Step 6: Application in combinations
Number of ways to choose 2 items from 5 = C(5,2) = 5!/(2!3!)
C(5,2) = 120/(2×6) = 120/12 = 10 possible combinations.

Step 7: Growth pattern observation
Compare with nearby factorials:
4! = 24
5! = 120 (5 times larger than 4!)
6! = 720 (6 times larger than 5!)
This demonstrates the multiplicative growth pattern.

Step 8: Real-world interpretation
5! seconds = 120 seconds = 2 minutes
5! minutes = 120 minutes = 2 hours
5! hours = 120 hours = 5 days

Step 9: Algorithm analysis perspective
A brute-force algorithm checking all permutations of 5 items
would have time complexity O(5!) = O(120) operations.

Step 10: Educational significance
5! is commonly used in introductory combinatorics because:
• Small enough to compute manually
• Large enough to demonstrate factorial growth
• Useful in basic permutation/combination problems
• Forms building block for understanding larger factorials

Final Result:
5! = 120
Verified by multiple calculation methods
Applications: 120 permutations, 10 combinations (choose 2 from 5)
Growth factor: 5 times larger than 4!`}
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
                    <Hash size={20} className="text-blue-600" />
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