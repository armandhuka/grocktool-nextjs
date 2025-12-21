'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft, Hash, PieChart, Grid, Zap, Target, Triangle, Circle, BarChart, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function QuadraticSolver() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState<{
    discriminant: number;
    roots: { x1: string; x2: string };
    nature: string;
    steps: string[];
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

  const relatedTools = [
    { name: 'Advanced Calculator', path: '/math-tools/basic-calculator', icon: Calculator },
    { name: 'Prime Number Checker', path: '/math-tools/prime-checker', icon: PieChart },
    { name: 'Factorial Calculator', path: '/math-tools/factorial', icon: Hash },
    { name: 'Multiplication Tables', path: '/math-tools/multiplication-table', icon: Grid },
    { name: 'Percentage Change Calculator', path: '/math-tools/percentage-change', icon: Target },
    { name: 'Triangle Area Calculator', path: '/math-tools/triangle-area', icon: Triangle },
    { name: 'Circle Area Calculator', path: '/math-tools/circle-calculator', icon: Circle },
    { name: 'Logarithm Calculator', path: '/math-tools/exponent-log', icon: BarChart }
  ];

  const faqData = [
    {
      question: "What is the quadratic formula and how does it work?",
      answer: "The quadratic formula x = [-b ± √(b² - 4ac)] / 2a provides the roots of any quadratic equation ax² + bx + c = 0. It's derived from completing the square method and works by calculating the discriminant (b² - 4ac) first, then applying the formula. The ± symbol gives two possible solutions, representing where the parabola crosses the x-axis. This formula works for all real and complex coefficients, making it a universal solution method for quadratic equations."
    },
    {
      question: "How does the discriminant determine the nature of roots?",
      answer: "The discriminant Δ = b² - 4ac determines root characteristics: Δ > 0 gives two distinct real roots (parabola crosses x-axis twice), Δ = 0 gives one repeated real root (parabola touches x-axis at vertex), Δ < 0 gives two complex conjugate roots (parabola doesn't intersect x-axis). The discriminant also indicates whether the quadratic can be factored over real numbers and provides information about the parabola's position relative to the x-axis."
    },
    {
      question: "What are the different methods to solve quadratic equations?",
      answer: "Quadratic equations can be solved using: 1) Quadratic formula (universal method), 2) Factoring (when equation factors nicely), 3) Completing the square (algebraic method that derives the formula), 4) Graphing (finding x-intercepts visually), and 5) Using the square root property (for equations without bx term). This tool uses the quadratic formula method as it works for all cases including those with complex roots."
    },
    {
      question: "What are complex roots and when do they occur?",
      answer: "Complex roots occur when the discriminant is negative (Δ < 0), resulting in square roots of negative numbers. These roots come in conjugate pairs a ± bi, where i = √(-1). Complex roots represent cases where the parabola doesn't intersect the x-axis in real coordinate space. They're essential in advanced mathematics, physics, and engineering for analyzing oscillatory systems, electrical circuits, and wave phenomena."
    },
    {
      question: "Why are quadratic equations important in real-world applications?",
      answer: "Quadratic equations model numerous real-world phenomena including projectile motion (height vs time), area optimization problems, profit maximization in economics, structural engineering calculations, signal processing in electronics, and geometric relationships. Their parabolic graphs represent many natural and artificial systems, making them fundamental in science, engineering, economics, and computer graphics."
    }
  ];

  const solveQuadratic = () => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    const numC = parseFloat(c);

    if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
      setResult(null);
      return;
    }

    if (numA === 0) {
      setResult({
        discriminant: 0,
        roots: { x1: 'Not a quadratic equation (a ≠ 0)', x2: '' },
        nature: 'Linear equation',
        steps: ['Since a = 0, this is not a quadratic equation']
      });
      return;
    }

    const discriminant = numB * numB - 4 * numA * numC;
    const steps = [
      `Given: ${numA}x² + ${numB}x + ${numC} = 0`,
      `Discriminant (Δ) = b² - 4ac`,
      `Δ = (${numB})² - 4(${numA})(${numC})`,
      `Δ = ${numB * numB} - ${4 * numA * numC}`,
      `Δ = ${discriminant}`
    ];

    let roots: { x1: string; x2: string };
    let nature: string;

    if (discriminant > 0) {
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const x1 = (-numB + sqrtDiscriminant) / (2 * numA);
      const x2 = (-numB - sqrtDiscriminant) / (2 * numA);
      roots = { 
        x1: x1.toFixed(4), 
        x2: x2.toFixed(4) 
      };
      nature = 'Two distinct real roots';
      steps.push(`x = (-b ± √Δ) / 2a`);
      steps.push(`x₁ = (${-numB} + √${discriminant}) / ${2 * numA} = ${x1.toFixed(4)}`);
      steps.push(`x₂ = (${-numB} - √${discriminant}) / ${2 * numA} = ${x2.toFixed(4)}`);
    } else if (discriminant === 0) {
      const x = -numB / (2 * numA);
      roots = { 
        x1: x.toFixed(4), 
        x2: 'Same as x₁' 
      };
      nature = 'One repeated real root';
      steps.push(`x = -b / 2a = ${-numB} / ${2 * numA} = ${x.toFixed(4)}`);
    } else {
      const realPart = -numB / (2 * numA);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * numA);
      roots = { 
        x1: `${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`, 
        x2: `${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i` 
      };
      nature = 'Two complex conjugate roots';
      steps.push(`x = (-b ± √Δ) / 2a where Δ < 0`);
      steps.push(`x₁ = ${realPart.toFixed(4)} + ${imaginaryPart.toFixed(4)}i`);
      steps.push(`x₂ = ${realPart.toFixed(4)} - ${imaginaryPart.toFixed(4)}i`);
    }

    setResult({ discriminant, roots, nature, steps });
  };

  const reset = () => {
    setA('');
    setB('');
    setC('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `x₁ = ${result.roots.x1}, x₂ = ${result.roots.x2}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>Quadratic Equation Solver | Solve ax² + bx + c = 0 | ToolNest</title>
      <meta name="description" content="Free online quadratic equation solver. Solve ax² + bx + c = 0 equations with step-by-step solutions, discriminant analysis, and root classification. Perfect for mathematics, physics, and engineering calculations." />
      <meta name="keywords" content="quadratic equation solver, quadratic formula calculator, solve quadratic equations, discriminant calculator, polynomial roots, algebra calculator, mathematics, physics, engineering" />
      <meta property="og:title" content="Quadratic Equation Solver | Solve ax² + bx + c = 0" />
      <meta property="og:description" content="Free online quadratic equation solver. Solve ax² + bx + c = 0 equations with step-by-step solutions and discriminant analysis." />
      <link rel="canonical" href="https://grocktool.com/math-tools/quadratic-solver" />

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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-2 rounded-full mb-4 border border-purple-500/20">
                <Calculator size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Algebra • Mathematics • Engineering</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Quadratic Equation Solver
                <span className="block text-lg sm:text-xl font-normal text-muted-foreground mt-2">
                  Solve ax² + bx + c = 0 • Step-by-Step Solutions • Discriminant Analysis
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Calculator size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Quadratic Formula</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Hash size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Discriminant Analysis</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Zap size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Step-by-Step</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Target size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Root Classification</span>
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
                  <div className="text-xs text-muted-foreground">Quick Example Equations:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setA('1');
                        setB('-5');
                        setC('6');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      x² - 5x + 6 = 0 (Real Roots)
                    </button>
                    <button
                      onClick={() => {
                        setA('1');
                        setB('-4');
                        setC('4');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      x² - 4x + 4 = 0 (Repeated Root)
                    </button>
                    <button
                      onClick={() => {
                        setA('1');
                        setB('2');
                        setC('5');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      x² + 2x + 5 = 0 (Complex Roots)
                    </button>
                    <button
                      onClick={() => {
                        setA('2');
                        setB('-7');
                        setC('3');
                      }}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      2x² - 7x + 3 = 0 (Fractional Roots)
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
                        Quadratic Equation Solver
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-600">
                      <Zap size={12} />
                      <span>Algebraic computation</span>
                    </div>
                  </div>

                  {/* Equation Display */}
                  <div className="text-center p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                    <div className="text-lg font-mono text-foreground font-semibold">
                      ax² + bx + c = 0
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Standard quadratic equation form
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Coefficient a (x² term)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={a}
                            onChange={(e) => setA(e.target.value)}
                            placeholder="e.g., 1, 2, -3"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            step="any"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Hash size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Coefficient of x² (must be non-zero for quadratic equation)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Coefficient b (x term)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={b}
                            onChange={(e) => setB(e.target.value)}
                            placeholder="e.g., -3, 0, 5"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            step="any"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Hash size={16} className="text-muted-foreground" />
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Coefficient of x (can be zero)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-foreground">
                          Coefficient c (constant)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={c}
                            onChange={(e) => setC(e.target.value)}
                            placeholder="e.g., 2, -4, 0"
                            className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                            step="any"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <Hash size={16} className="text-muted-foreground" />
                          </div>
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <div className="bg-purple-500 text-white rounded-full p-1">
                              <Zap size={10} />
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                          Constant term (can be zero)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Common Forms */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Common Quadratic Forms
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { a: 1, b: 0, c: -4, label: 'x²=4' },
                        { a: 1, b: -3, c: 2, label: 'x²-3x+2' },
                        { a: 2, b: -4, c: 2, label: '2x²-4x+2' },
                        { a: 1, b: 1, c: 1, label: 'x²+x+1' }
                      ].map((form, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setA(form.a.toString());
                            setB(form.b.toString());
                            setC(form.c.toString());
                          }}
                          className="px-2 py-1.5 text-xs bg-blue-500/10 text-blue-600 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          {form.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={solveQuadratic}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Calculator size={16} className="sm:w-4 sm:h-4" />
                      Solve Quadratic Equation
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
                    <h3 className="text-lg font-semibold text-foreground">Quadratic Equation Solution</h3>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Nature and Discriminant */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg border ${
                        result.discriminant > 0 
                          ? 'bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20' 
                          : result.discriminant === 0 
                          ? 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20'
                          : 'bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-500/20'
                      }`}>
                        <div className="text-sm text-muted-foreground mb-1">Nature of Roots</div>
                        <div className="font-semibold text-foreground">{result.nature}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {result.discriminant > 0 
                            ? 'Parabola crosses x-axis at two points'
                            : result.discriminant === 0 
                            ? 'Parabola touches x-axis at vertex'
                            : 'Parabola does not intersect x-axis'
                          }
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground mb-1">Discriminant (Δ)</div>
                        <div className="font-semibold text-foreground font-mono">{result.discriminant}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Δ = b² - 4ac = {parseFloat(b) * parseFloat(b)} - 4×{a}×{c}
                        </div>
                      </div>
                    </div>

                    {/* Roots Display */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-medium text-foreground">Equation Roots:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4 rounded-lg border border-purple-500/20 text-center hover:from-purple-500/20 hover:to-blue-500/20 transition-all">
                          <div className="text-sm text-muted-foreground mb-1">Root 1 (x₁)</div>
                          <div className="text-lg font-bold text-foreground font-mono break-all">{result.roots.x1}</div>
                          <div className="text-xs text-muted-foreground mt-1">First solution</div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-4 rounded-lg border border-purple-500/20 text-center hover:from-purple-500/20 hover:to-blue-500/20 transition-all">
                          <div className="text-sm text-muted-foreground mb-1">Root 2 (x₂)</div>
                          <div className="text-lg font-bold text-foreground font-mono break-all">{result.roots.x2}</div>
                          <div className="text-xs text-muted-foreground mt-1">Second solution</div>
                        </div>
                      </div>
                    </div>

                    {/* Mathematical Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm text-muted-foreground">Sum of Roots</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          x₁ + x₂ = -b/a = {(-parseFloat(b)/parseFloat(a)).toFixed(4)}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          Vieta's formula: sum = -b/a
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Product of Roots</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          x₁ × x₂ = c/a = {(parseFloat(c)/parseFloat(a)).toFixed(4)}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          Vieta's formula: product = c/a
                        </div>
                      </div>
                    </div>

                    {/* Steps Display */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground">Step-by-Step Solution:</h4>
                        <div className="text-xs text-muted-foreground">{result.steps.length} steps</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg space-y-3">
                        {result.steps.map((step, index) => (
                          <div key={index} className="text-sm font-mono text-foreground p-2 bg-card/50 rounded">
                            <span className="text-xs text-muted-foreground mr-2">Step {index + 1}:</span>
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quadratic Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calculator size={18} className="text-purple-600" />
                  Quadratic Equations Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Quadratic Properties */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <Calculator size={16} className="text-purple-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Quadratic Properties</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Standard Form:</strong> ax² + bx + c = 0 where a ≠ 0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Graph:</strong> Parabola opening upward (a{'<'}0) or downward (a&lt;0)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Vertex:</strong> x = -b/(2a), y = f(-b/(2a))</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Axis of Symmetry:</strong> Vertical line x = -b/(2a)</span>
                      </div>
                    </div>
                  </div>

                  {/* Solution Methods */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Zap size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Solution Methods</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Quadratic Formula:</strong> Universal method for all cases</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Factoring:</strong> When equation factors nicely over integers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Completing Square:</strong> Algebraic method deriving the formula</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Graphing:</strong> Finding x-intercepts visually</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Discriminant Classification</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-green-600">Δ {'<'} 0</span>
                      <span className="font-mono">Two real distinct roots</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-blue-600">Δ = 0</span>
                      <span className="font-mono">One repeated real root</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-purple-600">Δ {'<'} 0</span>
                      <span className="font-mono">Two complex conjugate roots</span>
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
                  <div className="bg-purple-500/10 p-2 rounded-lg">
                    <Calculator size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Quadratic Equation Solver - Advanced Algebraic Tool</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Quadratic Equation Solver is a comprehensive mathematical tool that solves equations of the form ax² + bx + c = 0 using the quadratic formula method. It provides complete solutions including real, repeated, and complex roots with step-by-step calculations. The tool automatically computes the discriminant to classify roots and determine the nature of solutions, offering insights into parabola behavior relative to the x-axis. Beyond basic solving, it calculates Vieta's formulas for sum and product of roots, provides vertex coordinates, and explains the mathematical significance of each result. This makes it invaluable for students learning algebra, teachers creating instructional materials, engineers solving real-world problems, and anyone needing to solve quadratic equations accurately and efficiently.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Complete Solution</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Solves quadratic equations for all cases: real distinct roots, repeated roots, and complex conjugate roots with precise decimal or exact representations.</p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Hash size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Discriminant Analysis</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Calculates and interprets the discriminant to classify root types and determine parabola behavior relative to the x-axis with detailed explanations.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Educational Features</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Provides step-by-step solutions, Vieta's formulas for root relationships, vertex calculations, and comprehensive mathematical context for learning.</p>
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
                    <Target size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Quadratic Equation Applications & Use Cases</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🚀 Physics & Engineering Applications</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Projectile Motion</strong>: Calculating time of flight, maximum height, and range of objects under gravity (h = -½gt² + v₀t + h₀)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Structural Engineering</strong>: Analyzing stress distribution, beam deflection calculations, and optimization of structural components</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Electrical Engineering</strong>: Solving RLC circuit equations, calculating resonance frequencies, and analyzing AC circuit behavior</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Mechanical Systems</strong>: Modeling spring-mass systems, calculating natural frequencies, and analyzing damping coefficients</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📈 Economics & Business Analysis</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Profit Maximization</strong>: Finding optimal production levels where marginal revenue equals marginal cost using quadratic profit functions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Break-Even Analysis</strong>: Determining production quantities where total revenue equals total cost (TR = TC quadratic equations)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Economic Forecasting</strong>: Modeling quadratic trends in economic data, growth patterns, and market saturation curves</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Investment Analysis</strong>: Calculating optimal portfolio allocations and risk-return tradeoffs using quadratic utility functions</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💻 Computer Science & Technology</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Computer Graphics</strong>: Calculating intersections in ray tracing, bezier curve computations, and 3D rendering algorithms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Algorithm Analysis</strong>: Solving recurrence relations, analyzing algorithm complexity, and optimization problem solutions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Signal Processing</strong>: Digital filter design, Fourier analysis, and solving characteristic equations in system analysis</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Machine Learning</strong>: Quadratic programming in support vector machines, optimization in neural networks, and curve fitting</span>
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
                    <Calculator size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Quadratic Solver - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Enter Coefficients</div>
                            <div className="text-sm text-muted-foreground">Input a, b, and c values from your quadratic equation ax² + bx + c = 0. Use quick examples for testing.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Solve Equation</div>
                            <div className="text-sm text-muted-foreground">Click "Solve Quadratic Equation" to compute roots using the quadratic formula with precision calculations.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Analyze Results</div>
                            <div className="text-sm text-muted-foreground">Review roots, discriminant classification, nature of solutions, and Vieta's formulas for relationships.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Study Steps</div>
                            <div className="text-sm text-muted-foreground">Examine step-by-step solution process to understand the quadratic formula application and calculations.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Advanced Analysis Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span><strong>Test Discriminant Cases</strong>: Try equations with Δ{'<'}0, Δ=0, and Δ&lt;0 to understand all root types and parabola behaviors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-accent" />
                          </div>
                          <span><strong>Verify Vieta's Formulas</strong>: Check that sum of roots equals -b/a and product equals c/a for mathematical consistency</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span><strong>Explore Symmetry</strong>: Notice that complex roots always come in conjugate pairs a±bi when discriminant is negative</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Hash size={12} className="text-accent" />
                          </div>
                          <span><strong>Check Special Cases</strong>: Test a=1,b=0,c=-4 (difference of squares) and a=1,b=0,c=4 (complex roots from negatives)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span><strong>Use Results</strong>: Copy roots for further calculations, graphing, or inclusion in reports and academic work</span>
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
                    <Calculator size={20} className="text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Quadratic Equation Examples & Solutions</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Quadratic Equation Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Equation</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Discriminant</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Roots</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Nature</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">x² - 5x + 6 = 0</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">1</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">x=2, x=3</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Two real distinct roots</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">x² - 4x + 4 = 0</td>
                                  <td className="px-4 py-3 text-sm font-mono text-blue-600">0</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">x=2 (repeated)</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">One repeated real root</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">x² + 2x + 5 = 0</td>
                                  <td className="px-4 py-3 text-sm font-mono text-purple-600">-16</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">-1 ± 2i</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Complex conjugate roots</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">2x² - 7x + 3 = 0</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">25</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">x=3, x=0.5</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Two real distinct roots</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">x² - 9 = 0</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">36</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">x=3, x=-3</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Difference of squares</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-purple-600 font-mono font-bold">x² + 4 = 0</td>
                                  <td className="px-4 py-3 text-sm font-mono text-purple-600">-16</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">±2i</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Pure imaginary roots</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Complete Solution of x² - 5x + 6 = 0</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Complete solution of x² - 5x + 6 = 0 with mathematical verification

Step 1: Identify coefficients
Given equation: x² - 5x + 6 = 0
Coefficients: a = 1, b = -5, c = 6

Step 2: Write quadratic formula
Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a

Step 3: Calculate discriminant (Δ)
Δ = b² - 4ac
Δ = (-5)² - 4(1)(6)
Δ = 25 - 24
Δ = 1

Step 4: Interpret discriminant
Since Δ = 1 > 0:
• Equation has two distinct real roots
• Parabola crosses x-axis at two points
• Roots are rational numbers

Step 5: Apply quadratic formula
x = [-(-5) ± √1] / (2 × 1)
x = [5 ± 1] / 2

Step 6: Calculate both roots
First root (using +):
x₁ = (5 + 1) / 2 = 6 / 2 = 3

Second root (using -):
x₂ = (5 - 1) / 2 = 4 / 2 = 2

Step 7: Verify solution mathematically
Check x = 3:
(3)² - 5(3) + 6 = 9 - 15 + 6 = 0 ✓

Check x = 2:
(2)² - 5(2) + 6 = 4 - 10 + 6 = 0 ✓

Step 8: Verify Vieta's formulas
Vieta's formula for sum of roots: x₁ + x₂ = -b/a
3 + 2 = 5
-b/a = -(-5)/1 = 5 ✓

Vieta's formula for product of roots: x₁ × x₂ = c/a
3 × 2 = 6
c/a = 6/1 = 6 ✓

Step 9: Factor verification
Original equation: x² - 5x + 6 = 0
Factored form: (x - 3)(x - 2) = 0
Expanding: (x - 3)(x - 2) = x² - 2x - 3x + 6 = x² - 5x + 6 ✓

Step 10: Graphical interpretation
• Parabola opens upward (a = 1 > 0)
• Vertex at x = -b/(2a) = 5/2 = 2.5
• Vertex y-value: (2.5)² - 5(2.5) + 6 = -0.25
• Roots at x = 2 and x = 3 are x-intercepts
• Axis of symmetry: x = 2.5

Step 11: Alternative solution method (factoring)
x² - 5x + 6 = 0
Find two numbers that multiply to 6 and add to -5: -2 and -3
Therefore: (x - 2)(x - 3) = 0
x - 2 = 0 → x = 2
x - 3 = 0 → x = 3

Step 12: Completing the square method
x² - 5x + 6 = 0
x² - 5x = -6
x² - 5x + (5/2)² = -6 + (5/2)²
(x - 5/2)² = -6 + 25/4 = -24/4 + 25/4 = 1/4
x - 5/2 = ±√(1/4) = ±1/2
x = 5/2 ± 1/2 = 2 or 3

Step 13: Check consistency across methods
• Quadratic formula: x = 2, 3
• Factoring: x = 2, 3
• Completing square: x = 2, 3
All methods yield consistent results ✓

Step 14: Practical application example
This equation could represent:
• Projectile hitting ground at t=2 and t=3 seconds
• Profit reaching zero at production levels 2 and 3 thousand units
• Area of rectangle with perimeter 10 and area 6: dimensions 2×3

Step 15: Educational insights
• Demonstrates all three solution methods
• Shows verification using Vieta's formulas
• Illustrates graphical interpretation
• Provides multiple verification approaches

Final Solution:
Equation: x² - 5x + 6 = 0
Discriminant: Δ = 1
Nature: Two distinct real rational roots
Roots: x = 2, x = 3
Sum of roots: 5
Product of roots: 6
Factored form: (x - 2)(x - 3) = 0
Vertex: (2.5, -0.25)
Graph: Upward-opening parabola crossing x-axis at x=2 and x=3`}
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
                    <Calculator size={20} className="text-purple-600" />
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