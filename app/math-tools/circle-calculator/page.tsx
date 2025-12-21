'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Circle, RotateCcw, Copy, ArrowLeft, Calculator, Hash, PieChart, Grid, Zap, Target, Triangle, BarChart, ChevronUp, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function CircleCalculatorPage() {
  const [radius, setRadius] = useState('');
  const [result, setResult] = useState<{
    area: number;
    circumference: number;
    diameter: number;
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
    { name: 'Triangle Area Calculator', path: '/math-tools/triangle-area', icon: Triangle },
    { name: 'Logarithm Calculator', path: '/math-tools/exponent-log', icon: BarChart }
  ];

  const faqData = [
    {
      question: "What is π (pi) and why is it important in circle calculations?",
      answer: "π (pi) is a mathematical constant approximately equal to 3.14159, representing the ratio of a circle's circumference to its diameter. This ratio is constant for all circles regardless of size, making π fundamental to circle geometry. In calculations, π appears in area (A = πr²) and circumference (C = 2πr) formulas. Our calculator uses JavaScript's Math.PI constant with 15-17 decimal places of precision for accurate results."
    },
    {
      question: "How do I calculate circle area if I only know the diameter?",
      answer: "If you know the diameter (D), first find the radius by dividing diameter by 2 (r = D/2). Then calculate area using A = πr² = π(D/2)² = (πD²)/4. For example, with diameter 10: radius = 5, area = π × 5² = 25π ≈ 78.54. You can also use the direct formula A = (πD²)/4 = (π × 10²)/4 = 100π/4 = 25π ≈ 78.54."
    },
    {
      question: "What's the relationship between circumference and diameter?",
      answer: "Circumference and diameter have a constant proportional relationship: circumference = π × diameter, or C = πD. This means circumference is always approximately 3.14159 times the diameter. Conversely, diameter = circumference ÷ π. This constant ratio π is what makes circles mathematically unique among shapes and is used in countless scientific and engineering applications."
    },
    {
      question: "How accurate are the circle calculations?",
      answer: "Our calculator uses JavaScript's built-in Math.PI constant which provides 15-17 decimal places of precision (approximately 3.141592653589793). Calculations are performed with double-precision floating-point arithmetic, providing accuracy suitable for most practical applications including engineering, construction, and scientific calculations. Results are displayed with 4 decimal places by default but maintain higher internal precision."
    },
    {
      question: "What are some real-world applications of circle calculations?",
      answer: "Circle calculations are essential in engineering (pipe and tank design), construction (circular foundations), manufacturing (gear and wheel design), science (planetary orbits and wave propagation), everyday life (pizza sizes and clock faces), and technology (disk storage and circular displays). Understanding circle geometry enables accurate material estimation, space planning, and design optimization across numerous fields."
    }
  ];

  const calculateCircle = () => {
    const r = parseFloat(radius);
    if (isNaN(r) || r <= 0) {
      setResult(null);
      return;
    }

    const area = Math.PI * r * r;
    const circumference = 2 * Math.PI * r;
    const diameter = 2 * r;

    setResult({ area, circumference, diameter });
  };

  const reset = () => {
    setRadius('');
    setResult(null);
  };

  const copyResult = async () => {
    if (result) {
      const text = `Area: ${result.area.toFixed(4)}, Circumference: ${result.circumference.toFixed(4)}, Diameter: ${result.diameter}`;
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <title>Circle Calculator | Calculate Area, Circumference, Diameter | ToolNest</title>
      <meta name="description" content="Free online circle calculator. Calculate area, circumference, diameter, and radius of circles with precise π calculations. Perfect for geometry, engineering, and construction applications." />
      <meta name="keywords" content="circle calculator, circle area calculator, circumference calculator, diameter calculator, pi calculator, geometry calculator, engineering mathematics, construction math" />
      <meta property="og:title" content="Circle Calculator | Calculate Area, Circumference, Diameter" />
      <meta property="og:description" content="Free online circle calculator. Calculate area, circumference, diameter, and radius of circles with precise π calculations." />
      <link rel="canonical" href="https://grocktool.com/math-tools/circle-calculator" />

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
                <Circle size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Geometry • Engineering • Mathematics</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Circle Calculator
                <span className="block text-lg sm:text-xl font-normal text-muted-foreground mt-2">
                  Calculate Area, Circumference, Diameter • Precise π Calculations • Geometry Tool
                </span>
              </h1>
              
              <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 rounded-lg">
                  <Circle size={14} className="text-blue-600" />
                  <span className="text-xs sm:text-sm text-foreground">Circle Calculations</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 rounded-lg">
                  <Calculator size={14} className="text-purple-600" />
                  <span className="text-xs sm:text-sm text-foreground">Area & Circumference</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg">
                  <Target size={14} className="text-green-600" />
                  <span className="text-xs sm:text-sm text-foreground">Diameter & Radius</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 rounded-lg">
                  <Zap size={14} className="text-amber-600" />
                  <span className="text-xs sm:text-sm text-foreground">Precise π</span>
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
                  <div className="text-xs text-muted-foreground">Quick Example Circles:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => setRadius('1')}
                      className="px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      Unit Circle (r=1)
                    </button>
                    <button
                      onClick={() => setRadius('5')}
                      className="px-3 py-2 bg-purple-500/10 text-purple-600 rounded-lg hover:bg-purple-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      Radius 5 (Area≈78.54)
                    </button>
                    <button
                      onClick={() => setRadius('10')}
                      className="px-3 py-2 bg-green-500/10 text-green-600 rounded-lg hover:bg-green-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      Radius 10 (Area≈314.16)
                    </button>
                    <button
                      onClick={() => setRadius('2.5')}
                      className="px-3 py-2 bg-amber-500/10 text-amber-600 rounded-lg hover:bg-amber-500/20 transition-colors text-xs flex items-center gap-2 justify-center"
                    >
                      <Zap size={12} />
                      Radius 2.5 (Area≈19.63)
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
                      <Circle size={20} className="text-foreground" />
                      <label className="block text-sm font-medium text-foreground">
                        Circle Calculator
                      </label>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Zap size={12} />
                      <span>Geometry mathematics</span>
                    </div>
                  </div>

                  {/* Input Field */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Enter Circle Radius
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        placeholder="e.g., 5, 7.5, 10.2"
                        className="w-full p-3 pl-10 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                        min="0"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Circle size={16} className="text-muted-foreground" />
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="bg-blue-500 text-white rounded-full p-1">
                          <Zap size={10} />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      Radius is the distance from the center to any point on the circle
                    </p>
                  </div>

                  {/* Common Radii */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Common Circle Radii
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((r) => (
                        <button
                          key={r}
                          onClick={() => setRadius(r.toString())}
                          className="px-2 py-1.5 text-xs bg-blue-500/10 text-blue-600 rounded border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
                        >
                          r = {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={calculateCircle}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base font-medium shadow-md hover:shadow-lg"
                    >
                      <Circle size={16} className="sm:w-4 sm:h-4" />
                      Calculate Circle Properties
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
                    <h3 className="text-lg font-semibold text-foreground">Circle Calculation Results</h3>
                    <button
                      onClick={copyResult}
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Copy size={16} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Main Results Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 p-4 rounded-lg border border-blue-500/20 text-center hover:from-blue-500/20 hover:to-blue-600/20 transition-all">
                        <div className="text-sm text-muted-foreground mb-1">Area (A)</div>
                        <div className="text-xl font-bold text-foreground font-mono">{result.area.toFixed(4)}</div>
                        <div className="text-xs text-muted-foreground mt-1">square units</div>
                        <div className="text-xs text-blue-600 mt-1">A = πr²</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 p-4 rounded-lg border border-green-500/20 text-center hover:from-green-500/20 hover:to-green-600/20 transition-all">
                        <div className="text-sm text-muted-foreground mb-1">Circumference (C)</div>
                        <div className="text-xl font-bold text-foreground font-mono">{result.circumference.toFixed(4)}</div>
                        <div className="text-xs text-muted-foreground mt-1">linear units</div>
                        <div className="text-xs text-green-600 mt-1">C = 2πr</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 p-4 rounded-lg border border-purple-500/20 text-center hover:from-purple-500/20 hover:to-purple-600/20 transition-all">
                        <div className="text-sm text-muted-foreground mb-1">Diameter (D)</div>
                        <div className="text-xl font-bold text-foreground font-mono">{result.diameter}</div>
                        <div className="text-xs text-muted-foreground mt-1">linear units</div>
                        <div className="text-xs text-purple-600 mt-1">D = 2r</div>
                      </div>
                    </div>

                    {/* Formula Display */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 p-4 rounded-lg border border-amber-500/20">
                      <h4 className="text-sm font-medium text-foreground mb-2">Calculation Details:</h4>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2"></div>
                          <span><strong>Area Formula:</strong> A = πr² = π × {radius}² = {Math.PI.toFixed(6)} × {parseFloat(radius) * parseFloat(radius)} = {result.area.toFixed(4)}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2"></div>
                          <span><strong>Circumference Formula:</strong> C = 2πr = 2 × π × {radius} = 2 × {Math.PI.toFixed(6)} × {radius} = {result.circumference.toFixed(4)}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-amber-500 rounded-full mt-2"></div>
                          <span><strong>Diameter Formula:</strong> D = 2r = 2 × {radius} = {result.diameter}</span>
                        </div>
                      </div>
                    </div>

                    {/* Circle Properties */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 p-4 rounded-lg border border-blue-500/20">
                        <div className="text-sm text-muted-foreground">Radius (r)</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          {radius} units
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          Input value, distance from center to circumference
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-500/5 to-purple-600/5 p-4 rounded-lg border border-purple-500/20">
                        <div className="text-sm text-muted-foreground">π Value Used</div>
                        <div className="text-lg font-semibold text-foreground font-mono text-center">
                          {Math.PI.toFixed(6)}
                        </div>
                        <div className="text-xs text-muted-foreground text-center mt-1">
                          15+ decimal precision internally
                        </div>
                      </div>
                    </div>

                    {/* Relationship Visualization */}
                    <div className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                      <h4 className="text-sm font-medium text-foreground mb-2">Circle Relationships:</h4>
                      <div className="text-xs text-muted-foreground grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div className="flex items-center justify-between p-2 bg-card/50 rounded">
                          <span className="font-semibold text-foreground">C ÷ D</span>
                          <span className="font-mono">= {result.circumference / result.diameter}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-card/50 rounded">
                          <span className="font-semibold text-foreground">A ÷ r²</span>
                          <span className="font-mono">= {result.area / (parseFloat(radius) * parseFloat(radius))}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-card/50 rounded">
                          <span className="font-semibold text-foreground">C ÷ A</span>
                          <span className="font-mono">= {result.circumference / result.area}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-card/50 rounded">
                          <span className="font-semibold text-foreground">D ÷ C</span>
                          <span className="font-mono">= {result.diameter / result.circumference}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Circle Guide Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Circle size={18} className="text-blue-600" />
                  Circle Geometry Complete Guide
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  {/* Circle Properties */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-500/10 p-2 rounded-lg">
                        <Circle size={16} className="text-blue-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Circle Properties</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Constant π:</strong> Ratio of circumference to diameter, approximately 3.14159</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Symmetry:</strong> Infinitely many lines of symmetry through center</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Center Point:</strong> All points equidistant from center (radius)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Perfect Shape:</strong> Maximum area for given perimeter (isoperimetric inequality)</span>
                      </div>
                    </div>
                  </div>

                  {/* Mathematical Relationships */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-purple-500/10 p-2 rounded-lg">
                        <Calculator size={16} className="text-purple-600" />
                      </div>
                      <h4 className="text-sm font-medium text-foreground">Key Formulas</h4>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Area:</strong> A = πr² = (πD²)/4</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Circumference:</strong> C = 2πr = πD</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Diameter:</strong> D = 2r = C/π</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-accent rounded-full"></div>
                        <span><strong>Radius:</strong> r = D/2 = C/(2π) = √(A/π)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-sm font-medium text-foreground mb-2">Common Circle Measurements</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-muted-foreground">
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-blue-600">Unit Circle</span>
                      <span className="font-mono">r=1, A=π, C=2π</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-green-600">Standard Pizza</span>
                      <span className="font-mono">r=6", A≈113.1 in²</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-purple-600">Car Tire</span>
                      <span className="font-mono">r=13", C≈81.68"</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-card/50 rounded">
                      <span className="font-semibold text-amber-600">Earth (approx)</span>
                      <span className="font-mono">r=3963 mi, C≈24901 mi</span>
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
                    <Circle size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Circle Calculator - Comprehensive Geometry Tool</h2>
                </div>
                {openSections.whatItDoes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.whatItDoes && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground mb-4">
                    This Circle Calculator is a comprehensive geometry tool that calculates all essential circle measurements including area, circumference, diameter, and radius relationships with precise π calculations. Using the fundamental mathematical constant π (pi) with 15+ decimal place precision, it provides accurate results suitable for engineering, construction, academic, and everyday applications. The calculator demonstrates the constant proportional relationships inherent in circle geometry, showing how area grows with the square of the radius while circumference increases linearly. Beyond basic calculations, it explains the mathematical formulas, provides step-by-step computation details, and offers practical context for interpreting results in real-world scenarios such as construction projects, manufacturing specifications, and scientific applications.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Circle size={18} className="text-blue-600" />
                        <h3 className="font-semibold text-foreground">Complete Calculations</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Computes area, circumference, and diameter from radius with precise π calculations using 15+ decimal place accuracy for engineering-grade results.</p>
                    </div>
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={18} className="text-purple-600" />
                        <h3 className="font-semibold text-foreground">Mathematical Relationships</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Shows proportional relationships between circle measurements and demonstrates constant π ratio between circumference and diameter.</p>
                    </div>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target size={18} className="text-green-600" />
                        <h3 className="font-semibold text-foreground">Practical Applications</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Provides real-world context for calculations in construction, engineering, manufacturing, and everyday scenarios with practical examples and interpretations.</p>
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
                    <Target size={20} className="text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">Circle Calculation Applications & Use Cases</h2>
                </div>
                {openSections.useCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.useCases && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏗️ Engineering & Construction</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Pipe & Duct Design</strong>: Calculating cross-sectional areas for fluid dynamics, determining material requirements, and optimizing flow capacity in plumbing, HVAC, and industrial piping systems</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Structural Engineering</strong>: Designing circular columns, arches, and domes with accurate load-bearing calculations, determining concrete volumes, and optimizing structural efficiency</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Tank & Container Design</strong>: Calculating storage capacities for cylindrical tanks, silos, and containers, determining material requirements, and optimizing space utilization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Road & Civil Engineering</strong>: Designing circular intersections (roundabouts), calculating curvature requirements, and determining paving material quantities for circular features</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">🏭 Manufacturing & Design</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Mechanical Component Design</strong>: Calculating gear tooth dimensions, bearing specifications, and rotational parameters for machinery, automotive, and industrial equipment</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Product Development</strong>: Designing circular products (plates, wheels, lenses) with precise area and circumference specifications for manufacturing and material estimation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Packaging Design</strong>: Calculating material requirements for cylindrical packaging, determining label dimensions, and optimizing space efficiency in shipping and storage</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Tool & Die Making</strong>: Creating precise circular cutters, dies, and molds with accurate diameter and circumference specifications for manufacturing processes</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">📊 Education & Scientific Research</h3>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Mathematics Education</strong>: Teaching fundamental geometry concepts, demonstrating π relationships, and providing practical applications for circle formulas in classroom settings</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Physics & Astronomy</strong>: Calculating planetary orbits, circular motion parameters, and wave propagation characteristics in scientific research and experimentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Biology & Medicine</strong>: Measuring circular biological structures (cells, blood vessels, bacterial colonies) and calculating growth patterns in medical research</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-accent mt-0.5 flex-shrink-0" />
                          <span><strong>Geography & Environmental Science</strong>: Calculating circular land areas, impact zones, and coverage patterns for environmental studies and geographic analysis</span>
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
                    <Circle size={20} className="text-amber-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">How to Use Circle Calculator - Complete Guide</h2>
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
                            <div className="font-medium text-foreground">Enter Radius</div>
                            <div className="text-sm text-muted-foreground">Input the circle's radius (distance from center to edge). Use quick examples or common values for testing.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                          <div>
                            <div className="font-medium text-foreground">Calculate Properties</div>
                            <div className="text-sm text-muted-foreground">Click "Calculate Circle Properties" to compute area, circumference, and diameter using precise π calculations.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                          <div>
                            <div className="font-medium text-foreground">Review Results</div>
                            <div className="text-sm text-muted-foreground">Examine area, circumference, diameter, mathematical relationships, and calculation formulas.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">4</div>
                          <div>
                            <div className="font-medium text-foreground">Apply & Document</div>
                            <div className="text-sm text-muted-foreground">Copy results for reports, use in further calculations, or apply to practical projects and designs.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Advanced Calculation Tips</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Zap size={12} className="text-accent" />
                          </div>
                          <span><strong>Check π Relationships</strong>: Verify that circumference ÷ diameter equals π (approximately 3.14159) as a mathematical consistency check</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Target size={12} className="text-accent" />
                          </div>
                          <span><strong>Scale Comparisons</strong>: Compare how area scales with radius squared while circumference scales linearly with radius</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Calculator size={12} className="text-accent" />
                          </div>
                          <span><strong>Unit Consistency</strong>: Maintain consistent units throughout calculations (all inches, all centimeters, etc.) for accurate results</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Circle size={12} className="text-accent" />
                          </div>
                          <span><strong>Real-World Context</strong>: Interpret results in practical terms (material coverage, space requirements, cost estimates) for project planning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-accent/20 p-1 rounded mt-0.5">
                            <Copy size={12} className="text-accent" />
                          </div>
                          <span><strong>Document Precisely</strong>: Copy and save calculations with proper units and context for engineering documentation and project records</span>
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
                  <h2 className="text-xl font-bold text-foreground">Circle Calculation Examples & Applications</h2>
                </div>
                {openSections.examples ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              
              {openSections.examples && (
                <div className="px-6 pb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-3">Common Circle Calculation Examples</h3>
                      <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                          <div className="overflow-hidden border border-border rounded-lg">
                            <table className="min-w-full divide-y divide-border">
                              <thead className="bg-secondary/20">
                                <tr>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Circle Description</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Radius</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Area</th>
                                  <th className="px-4 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Circumference</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border">
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Unit Circle</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">3.1416</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">6.2832</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Small Pizza</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">6 inches</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">113.10 in²</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">37.70 inches</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Car Tire</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">13 inches</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">530.93 in²</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">81.68 inches</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Large Clock</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">12 inches</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">452.39 in²</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">75.40 inches</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">Manhole Cover</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">1.5 feet</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">7.07 ft²</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">9.42 feet</td>
                                </tr>
                                <tr>
                                  <td className="px-4 py-3 text-sm text-blue-600 font-mono font-bold">CD/DVD</td>
                                  <td className="px-4 py-3 text-sm font-mono text-foreground">6 cm</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">113.10 cm²</td>
                                  <td className="px-4 py-3 text-sm font-mono text-green-600">37.70 cm</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Detailed Example: Pizza Area Calculation & Comparison</h3>
                      <div className="bg-secondary/20 p-4 rounded-lg border border-border overflow-x-auto">
                        <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Example: Complete analysis of pizza sizes for value comparison

Scenario: Comparing 12-inch vs 16-inch pizzas for party planning

Step 1: Calculate 12-inch pizza (radius = 6 inches)
Radius (r₁) = 6 inches
Area (A₁) = πr₁² = π × 6² = π × 36 ≈ 113.097 in²
Circumference (C₁) = 2πr₁ = 2π × 6 = 12π ≈ 37.699 inches
Diameter (D₁) = 2r₁ = 12 inches

Step 2: Calculate 16-inch pizza (radius = 8 inches)
Radius (r₂) = 8 inches
Area (A₂) = πr₂² = π × 8² = π × 64 ≈ 201.062 in²
Circumference (C₂) = 2πr₂ = 2π × 8 = 16π ≈ 50.265 inches
Diameter (D₂) = 2r₂ = 16 inches

Step 3: Comparative analysis
Area Comparison:
A₂ ÷ A₁ = 201.062 ÷ 113.097 ≈ 1.778
The 16-inch pizza has 1.778 times more area than the 12-inch pizza

Circumference Comparison:
C₂ ÷ C₁ = 50.265 ÷ 37.699 ≈ 1.333
The 16-inch pizza has 1.333 times more crust (circumference)

Step 4: Price comparison (example pricing)
Assume: 12-inch pizza = $15, 16-inch pizza = $20
Price per square inch:
12-inch: $15 ÷ 113.097 ≈ $0.1326 per in²
16-inch: $20 ÷ 201.062 ≈ $0.0995 per in²

Value analysis:
16-inch pizza provides 33.4% more area per dollar
(0.1326 ÷ 0.0995 ≈ 1.334, or 33.4% better value)

Step 5: Serving capacity estimation
Typical serving = 15 square inches of pizza
12-inch pizza: 113.097 ÷ 15 ≈ 7.54 servings
16-inch pizza: 201.062 ÷ 15 ≈ 13.40 servings

Serving increase: 13.40 ÷ 7.54 ≈ 1.777 (77.7% more servings)

Step 6: Material requirements
Crust (circumference) per serving:
12-inch: 37.699 ÷ 7.54 ≈ 5.00 inches crust per serving
16-inch: 50.265 ÷ 13.40 ≈ 3.75 inches crust per serving

Crust efficiency: 16-inch pizza uses 25% less crust per serving

Step 7: Baking considerations
Area to circumference ratio:
12-inch: 113.097 ÷ 37.699 ≈ 3.00
16-inch: 201.062 ÷ 50.265 ≈ 4.00
Higher ratio indicates more interior area relative to crust

Step 8: Practical implications
For party planning:
• 12-inch pizza serves ~7-8 people
• 16-inch pizza serves ~13-14 people
• 16-inch offers better value per square inch
• 16-inch requires less crust per serving
• Two 12-inch pizzas (total area 226.194 in²) vs one 16-inch (201.062 in²):
  Two 12-inch provide 12.5% more area but cost $30 vs $20 (50% more cost)

Step 9: Mathematical insights
• Area scales with r²: (8/6)² = (4/3)² = 16/9 ≈ 1.778
• Circumference scales with r: 8/6 = 4/3 ≈ 1.333
• This explains why larger pizzas offer better value: area grows faster than price typically increases

Step 10: General formula for pizza value comparison
Value Ratio = (Price₁/Price₂) × (r₂²/r₁²)
Where r₁, r₂ are radii, Price₁, Price₂ are prices

For our example:
Value Ratio = ($15/$20) × (8²/6²) = 0.75 × (64/36) = 0.75 × 1.778 = 1.334
16-inch pizza provides 33.4% better value per square inch

Step 11: Real-world application
Pizza shop pricing strategy:
• Small (12"): $15 → $0.133/in²
• Medium (14"): $18 → $0.117/in² (12.0% better value than small)
• Large (16"): $20 → $0.100/in² (33.4% better value than small)
• X-Large (18"): $23 → $0.090/in² (47.8% better value than small)

Step 12: Consumer decision framework
Based on area-value analysis:
1. Calculate price per square inch for each size
2. Consider serving requirements
3. Account for crust preferences
4. Evaluate storage/transport constraints
5. Make optimal choice based on needs and value

Final Recommendation:
For the example prices, the 16-inch pizza offers the best combination of 
value (33.4% better than 12-inch), serving capacity (77.7% more servings), 
and crust efficiency (25% less crust per serving). Unless serving fewer than 
8 people or having storage constraints, the 16-inch pizza represents the 
optimal choice for both value and practicality.`}
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
                    <Circle size={20} className="text-blue-600" />
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