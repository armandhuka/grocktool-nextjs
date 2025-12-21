'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Triangle, RotateCcw, Copy, ArrowLeft, Calculator, Hash, PieChart, Grid, Zap, Target, Circle, BarChart, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function TriangleArea() {
  const [method, setMethod] = useState('base-height');
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');
  const [result, setResult] = useState<{
    area: number;
    perimeter: number;
    formula: string;
    calculation: string;
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
    { name: 'Quadratic Equation Solver', path: '/math-tools/quadratic-solver', icon: Zap },
    { name: 'Percentage Change Calculator', path: '/math-tools/percentage-change', icon: Target },
    { name: 'Circle Area Calculator', path: '/math-tools/circle-calculator', icon: Circle },
    { name: 'Logarithm Calculator', path: '/math-tools/exponent-log', icon: BarChart }
  ];

  const faqData = [
    {
      question: "What's the difference between base-height and Heron's formula methods?",
      answer: "The base-height method (Area = ½ × base × height) requires knowing one side and its perpendicular height. Heron's formula (Area = √[s(s-a)(s-b)(s-c)]) uses all three sides without needing height. Base-height is simpler and works well for right triangles, while Heron's formula is versatile for any triangle type when all sides are known but height is unknown or difficult to measure."
    },
    {
      question: "How do I know if my triangle measurements are valid?",
      answer: "For a triangle to be valid, it must satisfy the triangle inequality theorem: the sum of any two sides must be greater than the third side. Check: a + b > c, a + c > b, and b + c > a. Our calculator automatically validates measurements and provides clear error messages for invalid triangles. All sides must also be positive numbers greater than zero."
    },
    {
      question: "What are the different types of triangles and their area formulas?",
      answer: "Common triangle types include: 1) Right triangle (Area = ½ × base × height), 2) Equilateral (Area = (√3/4) × side²), 3) Isosceles (can use base-height or Heron's formula), and 4) Scalene (typically uses Heron's formula). This calculator handles all types through either method, with Heron's formula being universal for any triangle with known sides."
    },
    {
      question: "Why is triangle area measured in square units?",
      answer: "Area represents two-dimensional space coverage, measured by multiplying two lengths (base and height). Since length × length = length², the result is in square units. For triangles, the ½ factor accounts for the triangular shape being half of a corresponding rectangle with the same base and height dimensions."
    },
    {
      question: "What practical applications does triangle area calculation have?",
      answer: "Triangle area calculations are essential in architecture (roof design), construction (land surveying), engineering (structural analysis), computer graphics (3D modeling), navigation (triangulation), physics (force distribution), and geography (land area measurement). The simplicity of triangles makes them fundamental building blocks for complex shape analysis and design."
    }
  ];

  const calculateTriangle = () => {
    let area: number;
    let perimeter: number;
    let formula: string;
    let calculation: string;

    if (method === 'base-height') {
      const b = parseFloat(base);
      const h = parseFloat(height);
      
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
        setResult(null);
        return;
      }

      area = (b * h) / 2;
      perimeter = NaN;
      formula = 'Area = ½ × base × height';
      calculation = `Area = ½ × ${b} × ${h} = ${area}`;
    } else {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);
      const c = parseFloat(sideC);
      
      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
        setResult(null);
        return;
      }

      // Check if triangle is valid
      if (a + b <= c || a + c <= b || b + c <= a) {
        setResult(null);
        return;
      }

      // Heron's formula
      const s = (a + b + c) / 2;
      area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
      perimeter = a + b + c;
      formula = "Heron's Formula: Area = √[s(s-a)(s-b)(s-c)]";
      calculation = `s = (${a} + ${b} + ${c}) / 2 = ${s}\nArea = √[${s} × (${s}-${a}) × (${s}-${b}) × (${s}-${c})] = ${area.toFixed(4)}`;
    }

    setResult({ area, perimeter, formula, calculation });
  };

  const reset = () => {
    setBase('');
    setHeight('');
    setSideA('');
    setSideB('');
    setSideC('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `Area: ${result.area.toFixed(4)}${!isNaN(result.perimeter) ? `, Perimeter: ${result.perimeter}` : ''}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>Triangle Area Calculator | Calculate Area & Perimeter | ToolNest</title>
      <meta name="description" content="Free online triangle area calculator. Calculate area using base-height or Heron's formula with perimeter calculation. Perfect for geometry, construction, and engineering applications." />
      <meta name="keywords" content="triangle area calculator, triangle area formula, Heron's formula calculator, geometry calculator, area of triangle, perimeter calculator, construction math, engineering mathematics" />
      <meta property="og:title" content="Triangle Area Calculator | Calculate Area & Perimeter" />
      <meta property="og:description" content="Free online triangle area calculator. Calculate area using base-height or Heron's formula with perimeter calculation." />
      <link rel="canonical" href="https://grocktool.com/math-tools/triangle-area" />

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
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-green-500/10 px-4 py-2 rounded-full mb-4 border border-orange-500/20">
                <Triangle size={16} className="text-orange-600" />
                <span className="text-sm font-medium text-orange-600">Geometry • Construction • Engineering</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Triangle Area Calculator
                <span className="block text-lg sm:text-xl font-normal text-muted-foreground mt-2">
                  Calculate Area & Perimeter • Base-Height or Heron's Formula • Geometry Tool
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 rounded-lg">
                  <Triangle size={14} className="text-orange-600" />
                  <span className="text-xs sm:text-sm text-foreground">Area Calculation</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Calculator size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Two Methods</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Target size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Perimeter Included</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Zap size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Geometry Tool</span>
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
                  <div className="text-xs text-muted-foreground">Quick Example Triangles:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setMethod('base-height');
                        setBase('10');
                        setHeight('8');
                      }}
                      className="px-3 py-2 bg-orange-500/10 text-orange-600 rounded-lg hover:bg-orange-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      Base=10, Height=8 (Area=40)
                    </button>
                    <button
                      onClick={() => {
                        setMethod('three-sides');
                        setSideA('3');
                        setSideB('4');
                        setSideC('5');
                      }}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      Sides: 3,4,5 (Area=6)
                    </button>
                    <button
                      onClick={() => {
                        setMethod('three-sides');
                        setSideA('5');
                        setSideB('5');
                        setSideC('5');
                      }}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      Equilateral: 5,5,5 (Area≈10.83)
                    </button>
                    <button
                      onClick={() => {
                        setMethod('three-sides');
                        setSideA('7');
                        setSideB('8');
                        setSideC('9');
                      }}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      Scalene: 7,8,9 (Area≈26.83)
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
                      <Triangle size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Triangle Area Calculator
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-orange-600">
                      <Zap size={12} />
                      <span>Geometry mathematics</span>
                    </div>
                  </div>

                  {/* Method Selection */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setMethod('base-height')}
                        className={`p-4 rounded-lg border transition-all ${
                          method === 'base-height' 
                            ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-600 border-orange-500/30 shadow-sm' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div className="text-sm font-medium text-center">Base & Height</div>
                        <div className="text-xs text-muted-foreground text-center mt-1">Area = ½ × b × h</div>
                      </button>
                      <button
                        onClick={() => setMethod('three-sides')}
                        className={`p-4 rounded-lg border transition-all ${
                          method === 'three-sides' 
                            ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-600 border-green-500/30 shadow-sm' 
                            : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                        }`}
                      >
                        <div className="text-sm font-medium text-center">Three Sides</div>
                        <div className="text-xs text-muted-foreground text-center mt-1">Heron's Formula</div>
                      </button>
                    </div>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    {method === 'base-height' ? (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Base Length (b)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={base}
                              onChange={(e) => setBase(e.target.value)}
                              placeholder="e.g., 10, 15.5, 20"
                              className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                              step="any"
                              min="0"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <Hash size={16} className="text-muted-foreground" />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            Length of the triangle's base
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Height (h)
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={height}
                              onChange={(e) => setHeight(e.target.value)}
                              placeholder="e.g., 8, 12, 15.2"
                              className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                              step="any"
                              min="0"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <Triangle size={16} className="text-muted-foreground" />
                            </div>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <div className="bg-orange-500 text-white rounded-full p-1">
                                <Zap size={10} />
                              </div>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            Perpendicular height from base to opposite vertex
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Side A
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={sideA}
                              onChange={(e) => setSideA(e.target.value)}
                              placeholder="e.g., 5, 7.5, 10"
                              className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                              step="any"
                              min="0"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <Hash size={16} className="text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Side B
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={sideB}
                              onChange={(e) => setSideB(e.target.value)}
                              placeholder="e.g., 6, 8, 12.3"
                              className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                              step="any"
                              min="0"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <Hash size={16} className="text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-foreground">
                            Side C
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              value={sideC}
                              onChange={(e) => setSideC(e.target.value)}
                              placeholder="e.g., 7, 9, 15.7"
                              className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                              step="any"
                              min="0"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                              <Hash size={16} className="text-muted-foreground" />
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            All sides must satisfy triangle inequality theorem
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Common Triangles */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Common Triangle Types
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {method === 'base-height' ? (
                        <>
                          {[
                            { base: 10, height: 8, label: 'Right' },
                            { base: 12, height: 9, label: 'Isosceles' },
                            { base: 15, height: 10, label: 'Scalene' },
                            { base: 8, height: 6.93, label: 'Equilateral' }
                          ].map((triangle, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setBase(triangle.base.toString());
                                setHeight(triangle.height.toString());
                              }}
                              className="px-2 py-1.5 text-xs bg-orange-500/10 text-orange-600 rounded border border-orange-500/20 hover:bg-orange-500/20 transition-colors"
                            >
                              {triangle.label}
                            </button>
                          ))}
                        </>
                      ) : (
                        <>
                          {[
                            { a: 3, b: 4, c: 5, label: 'Right' },
                            { a: 5, b: 5, c: 6, label: 'Isosceles' },
                            { a: 7, b: 8, c: 9, label: 'Scalene' },
                            { a: 6, b: 6, c: 6, label: 'Equilateral' }
                          ].map((triangle, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSideA(triangle.a.toString());
                                setSideB(triangle.b.toString());
                                setSideC(triangle.c.toString());
                              }}
                              className="px-2 py-1.5 text-xs bg-green-500/10 text-green-600 rounded border border-green-500/20 hover:bg-green-500/20 transition-colors"
                            >
                              {triangle.label}
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={calculateTriangle}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-green-600 text-white rounded-lg sm:rounded-xl hover:from-orange-700 hover:to-green-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Triangle size={16} className="sm:w-4 sm:h-4" />
                      Calculate Triangle Area
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
                    <h3 className="text-lg font-semibold text-foreground">Triangle Calculation Results</h3>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Main Results */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-orange-500/10 to-green-500/10 p-4 rounded-lg border border-orange-500/20 text-center hover:from-orange-500/20 hover:to-green-500/20 transition-all">
                        <div className="text-sm text-muted-foreground mb-1">Area</div>
                        <div className="text-2xl font-bold text-foreground">{result.area.toFixed(4)}</div>
                        <div className="text-xs text-muted-foreground mt-1">square units</div>
                      </div>
                      {!isNaN(result.perimeter) && (
                        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-lg border border-blue-500/20 text-center hover:from-blue-500/20 hover:to-blue-600/20 transition-all">
                          <div className="text-sm text-muted-foreground mb-1">Perimeter</div>
                          <div className="text-2xl font-bold text-foreground">{result.perimeter}</div>
                          <div className="text-xs text-muted-foreground mt-1">units</div>
                        </div>
                      )}
                    </div>

                    {/* Formula Display */}
                    <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 p-4 rounded-lg border border-orange-500/20">
                      <div className="text-sm font-medium text-foreground mb-2">Formula Used:</div>
                      <div className="text-sm text-muted-foreground font-mono">{result.formula}</div>
                    </div>

                    {/* Calculation Steps */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground">Calculation Steps:</h4>
                        <div className="text-xs text-muted-foreground">Step-by-step solution</div>
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                          {result.calculation}
                        </pre>
                      </div>
                    </div>

                    {/* Triangle Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-green-500/5 to-green-600/5 p-4 rounded-lg border border-green-500/20">
                        <div className="text-sm text-muted-foreground">Calculation Method</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          {method === 'base-height' ? 'Base × Height ÷ 2' : "Heron's Formula"}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          {method === 'base-height' ? 'Standard triangle area formula' : 'Area from three sides'}
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Triangle Type</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          {method === 'base-height' ? 'Height Given' : 'Sides Given'}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          {method === 'base-height' ? 'Requires base and perpendicular height' : 'Requires all three side lengths'}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Triangle Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Triangle size={18} className="text-orange-600" />
                  Triangle Geometry Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Triangle Properties */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-orange-500/10 p-2 rounded-lg">
                        <Triangle size={16} className="text-orange-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Triangle Properties</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Angle Sum:</strong> Interior angles sum to 180° (π radians)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Triangle Inequality:</strong> Any two sides sum {">"} third side</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Area Formula:</strong> Area = ½ × base × height</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Perimeter:</strong> Sum of all three sides</span>
                      </div>
                    </div>
                  </div>

                  {/* Triangle Types */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500/10 p-2 rounded-lg">
                        <Target size={16} className="text-green-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Common Triangle Types</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Right Triangle:</strong> One 90° angle, a² + b² = c² (Pythagorean)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Equilateral:</strong> All sides equal, all angles 60°</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Isosceles:</strong> Two equal sides and two equal angles</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Scalene:</strong> All sides and angles different</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-orange-500/10 to-green-500/10 rounded-lg border border-orange-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Area Calculation Methods</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-orange-600">Base-Height</span>
                      <span className="font-mono">Area = ½ × b × h</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-green-600">Heron's Formula</span>
                      <span className="font-mono">√[s(s-a)(s-b)(s-c)]</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-blue-600">Right Triangle</span>
                      <span className="font-mono">Area = ½ × leg₁ × leg₂</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-purple-600">Equilateral</span>
                      <span className="font-mono">Area = (√3/4) × side²</span>
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
                  <div className="bg-orange-500/10 p-2 rounded-lg">
                    <Triangle size={20} className="text-orange-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Triangle Area Calculator - Geometry Calculation Tool</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Triangle Area Calculator is a comprehensive geometry tool that calculates the area and perimeter of triangles using two different methods: the standard base-height formula and Heron's formula for triangles with three known sides. The calculator provides accurate area calculations for all triangle types including right triangles, equilateral triangles, isosceles triangles, and scalene triangles. It automatically validates input measurements using the triangle inequality theorem and provides detailed step-by-step calculations showing the exact mathematical process. Beyond basic area calculation, the tool also computes perimeter when using Heron's formula and offers educational explanations of geometric principles, making it invaluable for students, teachers, engineers, architects, and anyone needing precise triangle area calculations for practical applications.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Triangle size={18} className="text-orange-600" />
                        <h3 className="font-semibold text-foreground">Dual Calculation Methods</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Supports both base-height formula (Area = ½ × b × h) and Heron's formula for triangles with three known sides, accommodating different measurement scenarios.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Automatic Validation</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Validates triangle measurements using the triangle inequality theorem and ensures all inputs are positive numbers, preventing mathematical errors in calculations.</p>
                    </div>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Educational Features</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Provides step-by-step calculations, formula explanations, triangle type identification, and practical application examples for learning geometry concepts.</p>
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
                  <h2 className="text-xl font-bold text-foreground">Triangle Area Applications & Use Cases</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏗️ Construction & Architecture</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Roof Design & Calculation</strong>: Determining gable roof areas, calculating roofing material requirements, and designing triangular roof sections for residential and commercial buildings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Land Surveying & Plot Division</strong>: Calculating area of triangular land parcels, dividing properties into triangular sections, and determining plot boundaries for legal documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Structural Engineering</strong>: Analyzing triangular truss systems in bridges and buildings, calculating load distribution in triangular supports, and designing triangular bracing elements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Flooring & Tiling Projects</strong>: Calculating material requirements for triangular floor sections, determining tile cutting patterns, and estimating covering materials for triangular spaces</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📐 Mathematics & Education</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Geometry Instruction</strong>: Teaching area calculation concepts in middle school, high school, and college mathematics courses with interactive examples and verification</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Homework Assistance</strong>: Helping students solve triangle area problems, checking homework answers, and providing step-by-step solutions for learning reinforcement</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Test Preparation</strong>: Practicing for standardized tests (SAT, ACT, GRE) that include geometry problems involving triangle area calculations and perimeter determinations</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Mathematical Proofs</strong>: Verifying Heron's formula applications, demonstrating geometric principles, and exploring relationships between different area calculation methods</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">💻 Computer Graphics & Design</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>3D Modeling & Rendering</strong>: Calculating surface areas of triangular mesh elements in 3D models, optimizing polygon counts, and determining texture mapping requirements</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Game Development</strong>: Determining collision detection areas, calculating visible surface areas in game environments, and optimizing triangular mesh structures</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Graphic Design</strong>: Creating triangular design elements, calculating coverage areas for design projects, and determining proportions in triangular compositions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>CAD & Technical Drawing</strong>: Verifying dimensions in technical drawings, calculating material requirements from CAD designs, and ensuring geometric accuracy in plans</span>
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
                    <Triangle size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Triangle Area Calculator - Complete Guide</h2>
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
                          <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                          <div>
                            <div className="font-medium text-foreground">Choose Calculation Method</div>
                            <div className="text-sm text-muted-foreground">Select between "Base & Height" method or "Three Sides" (Heron's formula) based on available measurements.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Enter Measurements</div>
                            <div className="text-sm text-muted-foreground">Input triangle dimensions - either base and height or all three side lengths using consistent units.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Calculate Area</div>
                            <div className="text-sm text-muted-foreground">Click "Calculate Triangle Area" to compute area and perimeter (if using Heron's formula) with validation.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Analyze Results</div>
                            <div className="text-sm text-muted-foreground">Review area, perimeter, calculation steps, and formula used. Copy results for documentation.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Measurement Tips & Best Practices</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span><strong>Consistent Units</strong>: Use the same units for all measurements (inches, centimeters, feet, meters) for accurate results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-accent" />
                          </div>
                          <span><strong>Height Measurement</strong>: Ensure height is perpendicular to the base, not slanted or measured along a side</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Triangle size={12} className="text-accent" />
                          </div>
                          <span><strong>Triangle Validation</strong>: With three sides, ensure triangle inequality holds (sum of any two sides {">"} third side)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span><strong>Precision Matters</strong>: For construction and engineering, use precise measurements to multiple decimal places</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span><strong>Document Results</strong>: Copy and save calculations for project records, reports, or further analysis</span>
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
                  <h2 className="text-xl font-bold text-foreground">Triangle Area Examples & Calculations</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Triangle Area Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Triangle Type</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Measurements</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Area</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Method</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-mono font-bold">Right Triangle</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">b=3, h=4</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">6.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Base-Height</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-mono font-bold">3-4-5 Triangle</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">a=3, b=4, c=5</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">6.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Heron's Formula</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-mono font-bold">Equilateral</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">sides=5,5,5</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">10.8253</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Heron's Formula</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-mono font-bold">Isosceles</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">b=6, h=4</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">12.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Base-Height</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-mono font-bold">Scalene</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">a=7, b=8, c=9</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">26.8328</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Heron's Formula</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-orange-600 font-mono font-bold">Large Triangle</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">b=20, h=15</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">150.00</td>
                                  <td className="px-4 py-3 text-sm text-muted-foreground">Base-Height</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Right Triangle 3-4-5 Calculation</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Complete calculation of 3-4-5 right triangle area using both methods

Method 1: Base-Height Method (Given: Base=3, Height=4)

Step 1: Identify measurements
Base (b) = 3 units
Height (h) = 4 units
Note: Height must be perpendicular to base, which is true for right triangle

Step 2: Apply area formula
Area = ½ × base × height
Area = ½ × 3 × 4

Step 3: Calculate step by step
½ × 3 = 1.5
1.5 × 4 = 6

Step 4: Verify with geometric reasoning
A right triangle with legs 3 and 4 forms a rectangle of dimensions 3×4
Area of rectangle = 3 × 4 = 12
Triangle is half of rectangle: 12 ÷ 2 = 6 ✓

Step 5: Practical interpretation
A triangle with base 3 units and height 4 units covers 6 square units of area

Method 2: Heron's Formula (Given: a=3, b=4, c=5)

Step 1: Verify triangle validity
Check triangle inequality theorem:
3 + 4 = 7 > 5 ✓
3 + 5 = 8 > 4 ✓
4 + 5 = 9 > 3 ✓
Triangle is valid

Step 2: Calculate semi-perimeter (s)
s = (a + b + c) / 2
s = (3 + 4 + 5) / 2
s = 12 / 2 = 6

Step 3: Apply Heron's formula
Area = √[s(s-a)(s-b)(s-c)]
Area = √[6 × (6-3) × (6-4) × (6-5)]
Area = √[6 × 3 × 2 × 1]

Step 4: Calculate step by step
6 × 3 = 18
18 × 2 = 36
36 × 1 = 36
√36 = 6

Step 5: Verify Pythagorean theorem
For right triangle: a² + b² = c²
3² + 4² = 9 + 16 = 25
5² = 25 ✓

Step 6: Calculate perimeter
Perimeter = a + b + c = 3 + 4 + 5 = 12 units

Step 7: Geometric verification
Using base-height method: Area = ½ × 3 × 4 = 6 ✓
Using Heron's formula: Area = 6 ✓
Both methods yield consistent result

Step 8: Triangle properties analysis
• Type: Right triangle (3-4-5 Pythagorean triple)
• Angles: Approximately 36.87°, 53.13°, 90°
• Area to perimeter ratio: 6/12 = 0.5
• Compactness: Relatively compact shape for given perimeter

Step 9: Real-world scaling example
If units are meters:
• Area = 6 square meters
• Perimeter = 12 meters
• Material needed to cover: 6 m² of fabric/paint
• Fencing needed: 12 meters

If units are feet:
• Area = 6 square feet
• Perimeter = 12 feet
• Tile coverage: 6 tiles of 1×1 foot each
• Trim needed: 12 linear feet

Step 10: Educational insights
• Demonstrates consistency between different area calculation methods
• Shows that Heron's formula works for right triangles
• Illustrates geometric relationship between triangle and rectangle
• Provides practical unit interpretation

Step 11: Construction application
For a triangular garden plot with sides 3m, 4m, 5m:
• Area = 6 m² (enough for approximately 24 small plants)
• Fencing required = 12 meters
• Soil needed (10cm depth): 6 m² × 0.1 m = 0.6 m³
• Cost estimation based on area and perimeter

Step 12: Mathematical significance
• 3-4-5 triangle is the smallest Pythagorean triple
• Demonstrates fundamental geometric relationships
• Used historically in construction for right angles
• Basis for trigonometry ratios

Final Summary:
3-4-5 Right Triangle:
• Base-Height Method: Area = ½ × 3 × 4 = 6
• Heron's Formula: Area = √[6×3×2×1] = 6
• Perimeter: 3 + 4 + 5 = 12
• Verification: Both methods consistent, Pythagorean theorem holds
• Applications: Construction, education, practical measurements`}
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
                  <div className="bg-orange-500/10 p-2 rounded-lg">
                    <Triangle size={20} className="text-orange-600" />
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