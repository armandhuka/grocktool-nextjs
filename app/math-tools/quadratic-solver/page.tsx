'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RotateCcw, Copy, ArrowLeft } from 'lucide-react';
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
      nature = 'Two complex roots';
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
                Quadratic Equation Solver
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Solve quadratic equations of the form ax² + bx + c = 0
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
              {/* Equation Display */}
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-lg font-mono text-foreground font-semibold">
                  ax² + bx + c = 0
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Standard quadratic equation form
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calculator size={20} className="text-foreground" />
                  <label className="block text-sm font-medium text-foreground">
                    Enter Coefficients
                  </label>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Coefficient a (x² term)
                    </label>
                    <input
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="e.g., 1"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Coefficient b (x term)
                    </label>
                    <input
                      type="number"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="e.g., -3"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Coefficient c (constant)
                    </label>
                    <input
                      type="number"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      placeholder="e.g., 2"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-ring text-foreground text-center text-lg"
                      step="any"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={solveQuadratic}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg sm:rounded-xl hover:bg-accent/80 transition-colors text-sm sm:text-base"
                >
                  <Calculator size={16} className="sm:w-4 sm:h-4" />
                  Solve Equation
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
                <h3 className="text-lg font-semibold text-foreground">Solution Results</h3>
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
                      ? 'bg-green-500/10 border-green-500/20' 
                      : result.discriminant === 0 
                      ? 'bg-blue-500/10 border-blue-500/20'
                      : 'bg-purple-500/10 border-purple-500/20'
                  }`}>
                    <div className="text-sm text-muted-foreground mb-1">Nature of Roots</div>
                    <div className="font-semibold text-foreground">{result.nature}</div>
                  </div>
                  <div className="bg-secondary/20 p-4 rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground mb-1">Discriminant (Δ)</div>
                    <div className="font-semibold text-foreground">{result.discriminant}</div>
                  </div>
                </div>

                {/* Roots Display */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground">Roots:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Root 1 (x₁)</div>
                      <div className="text-lg font-bold text-foreground font-mono">{result.roots.x1}</div>
                    </div>
                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 text-center">
                      <div className="text-sm text-muted-foreground mb-1">Root 2 (x₂)</div>
                      <div className="text-lg font-bold text-foreground font-mono">{result.roots.x2}</div>
                    </div>
                  </div>
                </div>

                {/* Steps Display */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">Solution Steps:</h4>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    {result.steps.map((step, index) => (
                      <div key={index} className="text-sm font-mono text-foreground">
                        {step}
                      </div>
                    ))}
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
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">How Quadratic Equations Work</h3>
            <div className="space-y-2 text-muted-foreground text-sm">
              <p>
                Quadratic equations are second-degree polynomial equations that can be solved using 
                the quadratic formula, which provides the roots based on the discriminant value.
              </p>
              <div className="text-xs sm:text-sm space-y-1 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Enter coefficients a, b, and c from your equation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Click "Solve Equation" to calculate the roots</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>View the nature of roots based on discriminant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>See step-by-step solution process</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <span>Copy roots for use in other applications</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Quadratic Formula:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span className="font-mono"><strong>x = [-b ± √(b² - 4ac)] / 2a</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Discriminant (Δ) = b² - 4ac</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span>Determines the nature of the roots</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Roots Classification:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>Δ &gt; 0:</strong> Two distinct real roots</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>Δ = 0:</strong> One repeated real root</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>Δ &lt; 0:</strong> Two complex conjugate roots</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Common Examples:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  <span><strong>x² - 5x + 6 = 0:</strong> Roots at x=2, x=3 (Δ=1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                  <span><strong>x² - 4x + 4 = 0:</strong> Root at x=2 (Δ=0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                  <span><strong>x² + 2x + 5 = 0:</strong> Complex roots (Δ=-16)</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-2 pt-3">
                <div className="font-medium text-foreground">Real-World Applications:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Physics:</strong> Projectile motion and trajectories</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Engineering:</strong> Structural analysis and optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Economics:</strong> Profit maximization and break-even analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                  <span><strong>Computer Graphics:</strong> Curve fitting and 3D modeling</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}