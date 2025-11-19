'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Circle, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CircleCalculatorPage() {
  const [radius, setRadius] = useState('');
  const [result, setResult] = useState<{
    area: number;
    circumference: number;
    diameter: number;
  } | null>(null);

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
                Circle Calculator
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Calculate area, circumference, and diameter of a circle
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
              {/* Input Field */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Circle size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Enter Radius
                  </label>
                </div>
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  placeholder="e.g., 5"
                  className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                  step="any"
                  min="0"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={calculateCircle}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Circle size={16} className="sm:w-4 sm:h-4" />
                  Calculate Circle
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
                <h3 className="text-lg font-semibold text-foreground">Circle Measurements</h3>
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
                  <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Area</div>
                    <div className="text-xl font-bold text-foreground">{result.area.toFixed(4)}</div>
                    <div className="text-xs text-muted-foreground mt-1">square units</div>
                  </div>
                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Circumference</div>
                    <div className="text-xl font-bold text-foreground">{result.circumference.toFixed(4)}</div>
                    <div className="text-xs text-muted-foreground mt-1">units</div>
                  </div>
                  <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 text-center">
                    <div className="text-sm text-muted-foreground mb-1">Diameter</div>
                    <div className="text-xl font-bold text-foreground">{result.diameter}</div>
                    <div className="text-xs text-muted-foreground mt-1">units</div>
                  </div>
                </div>

                {/* Formula Display */}
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-sm font-medium text-foreground mb-2">Formulas Used:</div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div><strong>Area:</strong> π × r² = π × {radius}² = {result.area.toFixed(4)}</div>
                    <div><strong>Circumference:</strong> 2π × r = 2π × {radius} = {result.circumference.toFixed(4)}</div>
                    <div><strong>Diameter:</strong> 2 × r = 2 × {radius} = {result.diameter}</div>
                  </div>
                </div>

                {/* Circle Properties */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">Radius</div>
                    <div className="font-semibold text-foreground">{radius}</div>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-xs text-muted-foreground">π Value Used</div>
                    <div className="font-semibold text-foreground">{Math.PI.toFixed(6)}</div>
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Circle Calculations Work</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Circle calculations are based on fundamental geometric formulas that relate the radius 
                to other important measurements like area, circumference, and diameter.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter the radius of your circle</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Calculate Circle" to compute all measurements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View area, circumference, and diameter results</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>See the formulas and calculations used</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy results for your records or further calculations</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Circle Formulas:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Area (A):</strong> A = π × r²</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Circumference (C):</strong> C = 2 × π × r</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Diameter (D):</strong> D = 2 × r</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Radius (r):</strong> r = D / 2 = C / (2π) = √(A/π)</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Examples:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Radius 1:</strong> Area=3.1416, Circumference=6.2832, Diameter=2</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Radius 5:</strong> Area=78.5398, Circumference=31.4159, Diameter=10</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Radius 10:</strong> Area=314.1593, Circumference=62.8319, Diameter=20</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Unit Circle:</strong> Radius=1, Area=π, Circumference=2π</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Mathematical Constants:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>π (Pi):</strong> Approximately 3.141592653589793</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>2π:</strong> Approximately 6.283185307179586</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>π²:</strong> Approximately 9.869604401089358</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span>π is the ratio of circumference to diameter for any circle</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Real-World Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Engineering:</strong> Pipe diameters, wheel rotations, gear design</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Construction:</strong> Circular foundations, arch design, tanks</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Science:</strong> Planetary orbits, wave propagation, lenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Daily Life:</strong> Pizza sizes, clock faces, round tables</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Circle Properties:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>All points on a circle are equidistant from the center</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Diameter is the longest chord of a circle</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Circumference is the perimeter of the circle</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  <span>Area represents the space enclosed by the circle</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}