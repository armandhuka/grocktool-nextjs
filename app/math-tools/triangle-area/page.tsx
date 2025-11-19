'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Triangle, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
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
      formula = "Heron's Formula: Area = √(s(s-a)(s-b)(s-c))";
      calculation = `s = (${a} + ${b} + ${c}) / 2 = ${s}\nArea = √(${s} × ${s-a} × ${s-b} × ${s-c}) = ${area.toFixed(4)}`;
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
      <div className="pt-20 pb-8 px-4 sm:pt-24 sm:pb-12 sm:px-6 lg:pt-28">
        <div className="max-w-lg mx-auto lg:max-w-2xl">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                Triangle Area Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate triangle area using base & height or Heron's formula
              </p>
            </motion.div>
          </div>

          {/* Main Tool Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
          >
            <div className="space-y-6">
              {/* Method Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Triangle size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Calculation Method
                  </label>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMethod('base-height')}
                    className={`p-3 rounded-lg border transition-all ${
                      method === 'base-height' 
                        ? 'bg-accent text-accent-foreground border-accent' 
                        : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                    }`}
                  >
                    <div className="text-sm font-medium">Base & Height</div>
                  </button>
                  <button
                    onClick={() => setMethod('three-sides')}
                    className={`p-3 rounded-lg border transition-all ${
                      method === 'three-sides' 
                        ? 'bg-accent text-accent-foreground border-accent' 
                        : 'bg-secondary text-secondary-foreground border-border hover:bg-secondary/80'
                    }`}
                  >
                    <div className="text-sm font-medium">Three Sides</div>
                  </button>
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                {method === 'base-height' ? (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Base Length
                      </label>
                      <input
                        type="number"
                        value={base}
                        onChange={(e) => setBase(e.target.value)}
                        placeholder="e.g., 10"
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Height
                      </label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g., 8"
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                        min="0"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Side A
                      </label>
                      <input
                        type="number"
                        value={sideA}
                        onChange={(e) => setSideA(e.target.value)}
                        placeholder="e.g., 5"
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Side B
                      </label>
                      <input
                        type="number"
                        value={sideB}
                        onChange={(e) => setSideB(e.target.value)}
                        placeholder="e.g., 6"
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                        min="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground">
                        Side C
                      </label>
                      <input
                        type="number"
                        value={sideC}
                        onChange={(e) => setSideC(e.target.value)}
                        placeholder="e.g., 7"
                        className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                        step="any"
                        min="0"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateTriangle}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Triangle size={16} className="sm:w-4 sm:h-4" />
                  Calculate Area
                </button>
                <button
                  onClick={reset}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-lg sm:rounded-xl hover:bg-secondary/80 transition-colors text-sm sm:text-base"
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
              className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 mb-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Calculation Results</h3>
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
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Area</div>
                    <div className="text-2xl font-bold text-foreground">{result.area.toFixed(4)}</div>
                    <div className="text-xs text-muted-foreground mt-1">square units</div>
                  </div>
                  {!isNaN(result.perimeter) && (
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Perimeter</div>
                      <div className="text-2xl font-bold text-foreground">{result.perimeter}</div>
                      <div className="text-xs text-muted-foreground mt-1">units</div>
                    </div>
                  )}
                </div>

                {/* Formula Display */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Formula Used:</div>
                  <div className="text-sm text-muted-foreground">{result.formula}</div>
                </div>

                {/* Calculation Steps */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Calculation Steps:</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                      {result.calculation}
                    </pre>
                  </div>
                </div>

                {/* Method Info */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Method</div>
                    <div className="font-semibold text-foreground capitalize">
                      {method === 'base-height' ? 'Base & Height' : 'Three Sides'}
                    </div>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Formula Type</div>
                    <div className="font-semibold text-foreground">
                      {method === 'base-height' ? 'Standard' : "Heron's"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card rounded-xl sm:rounded-2xl border border-border p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Triangle Area Calculation Works</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Triangle area can be calculated using different methods depending on the available information. 
                The most common methods are base-height formula and Heron's formula for three known sides.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Choose calculation method based on available measurements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter the required measurements in the input fields</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Area" to compute the results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View area, perimeter (if applicable), and calculation steps</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy results for your records or calculations</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Base & Height Method:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Formula:</strong> Area = ½ × base × height</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Requires base length and perpendicular height</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Works for all triangle types</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Most intuitive method for right triangles</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Heron's Formula (Three Sides):</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Formula:</strong> Area = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>Requires all three side lengths</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>Works for any triangle type (scalene, isosceles, equilateral)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>Automatically calculates perimeter as well</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Examples:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Right Triangle:</strong> Base=3, Height=4 → Area=6</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Equilateral:</strong> Sides=5,5,5 → Area≈10.83</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Scalene:</strong> Sides=7,8,9 → Area≈26.83</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Isosceles:</strong> Sides=6,6,8 → Area=17.89</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Real-World Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Construction:</strong> Roof area, land surveying</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Engineering:</strong> Structural design, force calculations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Design:</strong> Graphic design, 3D modeling</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Education:</strong> Geometry problems, mathematical proofs</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Triangle Properties:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Sum of any two sides must be greater than the third side</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Area is always measured in square units</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Height must be perpendicular to the base</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Heron's formula works for all valid triangles</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}